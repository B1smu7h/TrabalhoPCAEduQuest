const xpValue = document.querySelector("#progress-xp");
const answeredValue = document.querySelector("#progress-answered");
const correctValue = document.querySelector("#progress-correct");
const accuracyValue = document.querySelector("#progress-accuracy");
const lastActivityValue = document.querySelector("#last-activity");
const messageTitle = document.querySelector("#progress-message-title");
const messageText = document.querySelector("#progress-message-text");
const subjectList = document.querySelector("#subject-progress-list");
const resetButton = document.querySelector("#reset-progress");
const resetDialog = document.querySelector("#reset-dialog");
const confirmResetButton = document.querySelector("#confirm-reset");
const cancelResetButton = document.querySelector("#cancel-reset");

function formatDate(isoDate) {
  if (!isoDate) return "Nenhuma atividade registrada ainda.";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Nenhuma atividade registrada ainda.";
  return `Última atividade: ${new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(date)}`;
}

function pluralizeAttempts(attempts) {
  return `${attempts} ${attempts === 1 ? "tentativa" : "tentativas"}`;
}

function renderSubjectList(results) {
  subjectList.replaceChildren();

  Object.entries(questionSets).forEach(([key, subject]) => {
    const result = results[key];
    const total = result?.total || subject.questions.length;
    const best = result?.best || 0;
    const percentage = total > 0 ? Math.round((best / total) * 100) : 0;

    const card = document.createElement("article");
    card.className = "subject-progress";

    const head = document.createElement("div");
    head.className = "subject-progress-head";

    const icon = document.createElement("span");
    icon.className = "subject-progress-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = subject.icon;

    const info = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = subject.title;
    const detail = document.createElement("p");
    detail.textContent = result
      ? `${pluralizeAttempts(result.attempts)} · último resultado ${result.last}/${total}`
      : "Ainda não praticado";
    info.append(name, detail);

    const score = document.createElement("strong");
    score.textContent = `${best}/${total}`;

    const track = document.createElement("div");
    track.className = "subject-progress-track";
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-label", `Melhor resultado em ${subject.title}`);
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", String(total));
    track.setAttribute("aria-valuenow", String(best));
    const fill = document.createElement("span");
    fill.style.width = `${percentage}%`;
    track.append(fill);

    const link = document.createElement("a");
    link.className = "card-link";
    link.href = `desafios.html?materia=${key}`;
    link.innerHTML = `${result ? "Praticar novamente" : "Começar agora"} <span aria-hidden="true">→</span>`;

    head.append(icon, info, score);
    card.append(head, track, link);
    subjectList.append(card);
  });
}

function render() {
  const stats = EduQuestStorage.getStats();
  const accuracy = stats.answered > 0
    ? Math.round((stats.correct / stats.answered) * 100)
    : 0;

  xpValue.textContent = `${stats.xp} XP`;
  answeredValue.textContent = stats.answered;
  correctValue.textContent = stats.correct;
  accuracyValue.textContent = `${accuracy}%`;
  lastActivityValue.textContent = formatDate(stats.lastActivity);

  if (stats.answered > 0) {
    messageTitle.textContent = "Você já está construindo sua jornada!";
    messageText.textContent = `Você acertou ${stats.correct} de ${stats.answered} perguntas respondidas. Continue praticando para acumular XP e bater seus melhores resultados.`;
  } else {
    messageTitle.textContent = "Toda jornada começa com uma pergunta.";
    messageText.textContent = "Faça um desafio para registrar suas primeiras conquistas aqui.";
  }

  resetButton.disabled = stats.answered === 0;
  renderSubjectList(stats.results);
}

resetButton.addEventListener("click", () => {
  if (typeof resetDialog.showModal === "function") {
    resetDialog.showModal();
  } else if (window.confirm("Deseja limpar todo o progresso salvo neste navegador?")) {
    EduQuestStorage.reset();
    render();
  }
});

cancelResetButton.addEventListener("click", () => {
  resetDialog.close();
});

confirmResetButton.addEventListener("click", () => {
  EduQuestStorage.reset();
  resetDialog.close();
  render();
});

resetDialog.addEventListener("click", (event) => {
  if (event.target === resetDialog) resetDialog.close();
});

render();
