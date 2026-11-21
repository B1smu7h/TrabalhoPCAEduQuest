const params = new URLSearchParams(window.location.search);
const requestedSubject = params.get("materia");
const subjectKey = Object.prototype.hasOwnProperty.call(questionSets, requestedSubject)
  ? requestedSubject
  : "matematica";
const subject = questionSets[subjectKey];
const totalQuestions = subject.questions.length;

let currentQuestion = 0;
let correctAnswers = 0;
let roundXP = 0;
let answered = false;

const title = document.querySelector("#quiz-title");
const description = document.querySelector("#quiz-description");
const tabs = document.querySelector("#subject-tabs");
const xpTotal = document.querySelector("#xp-total");
const questionCount = document.querySelector("#question-count");
const scoreLabel = document.querySelector("#quiz-score");
const progressFill = document.querySelector("#progress-fill");
const questionView = document.querySelector("#question-view");
const questionText = document.querySelector("#question-text");
const optionsContainer = document.querySelector("#answer-options");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const resultView = document.querySelector("#result-view");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");
const resultScore = document.querySelector("#result-score");
const resultXP = document.querySelector("#result-xp");
const resultBest = document.querySelector("#result-best");
const retryButton = document.querySelector("#retry-button");

function showXP() {
  xpTotal.textContent = `${EduQuestStorage.getStats().xp} XP`;
}

function renderTabs() {
  tabs.replaceChildren();
  Object.entries(questionSets).forEach(([key, set]) => {
    const link = document.createElement("a");
    link.className = "subject-tab";
    link.href = `desafios.html?materia=${key}`;
    link.textContent = set.title;

    if (key === subjectKey) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }

    tabs.append(link);
  });
}

function renderQuestion() {
  const question = subject.questions[currentQuestion];
  answered = false;

  questionView.hidden = false;
  resultView.hidden = true;
  questionCount.textContent = `Pergunta ${currentQuestion + 1} de ${totalQuestions}`;
  scoreLabel.textContent = `Acertos: ${correctAnswers}`;
  progressFill.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
  questionText.textContent = question.text;
  feedback.textContent = "";
  feedback.className = "quiz-feedback";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === totalQuestions - 1
    ? "Ver resultado →"
    : "Próxima pergunta →";

  optionsContainer.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    const letter = document.createElement("span");
    const label = document.createElement("span");

    button.type = "button";
    button.className = "answer-option";
    letter.className = "option-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);
    label.className = "option-text";
    label.textContent = option;

    button.append(letter, label);
    button.addEventListener("click", () => chooseAnswer(index, button));
    optionsContainer.append(button);
  });
}

function chooseAnswer(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;

  const question = subject.questions[currentQuestion];
  const isCorrect = selectedIndex === question.answer;
  const optionButtons = [...optionsContainer.querySelectorAll("button")];

  optionButtons.forEach((button) => {
    button.disabled = true;
  });

  EduQuestStorage.saveAnswer(isCorrect);

  if (isCorrect) {
    correctAnswers++;
    roundXP += 10;
    selectedButton.classList.add("answer-correct");
    feedback.textContent = `Acertou! +10 XP. ${question.explanation}`;
    feedback.classList.add("feedback-correct");
  } else {
    selectedButton.classList.add("answer-wrong");
    optionButtons[question.answer].classList.add("answer-correct");
    feedback.textContent = `Quase! A resposta correta é “${question.options[question.answer]}”. ${question.explanation}`;
    feedback.classList.add("feedback-wrong");
  }

  scoreLabel.textContent = `Acertos: ${correctAnswers}`;
  progressFill.style.width = `${((currentQuestion + 1) / totalQuestions) * 100}%`;
  nextButton.disabled = false;
  showXP();
}

function showResults() {
  const result = EduQuestStorage.saveResult(subjectKey, correctAnswers, totalQuestions);
  const perfect = correctAnswers === totalQuestions;
  const good = correctAnswers >= Math.ceil(totalQuestions * 0.6);

  questionView.hidden = true;
  resultView.hidden = false;
  questionCount.textContent = "Resultado da rodada";
  scoreLabel.textContent = `Acertos: ${correctAnswers} de ${totalQuestions}`;
  progressFill.style.width = "100%";

  resultTitle.textContent = perfect
    ? "Perfeito! Você dominou esta jornada."
    : good
      ? "Boa jornada! O progresso apareceu."
      : "Cada tentativa conta. Vamos de novo?";

  resultMessage.textContent = perfect
    ? "Você acertou todas as questões e mostrou domínio do conteúdo. Que tal explorar outra disciplina?"
    : good
      ? "Você está no caminho certo. Revise o feedback das questões e tente superar seu melhor resultado."
      : "O importante é continuar praticando. Releia as explicações e refaça o desafio no seu ritmo.";

  resultScore.textContent = `${correctAnswers}/${totalQuestions}`;
  resultXP.textContent = `${roundXP} XP`;
  resultBest.textContent = `${result.best}/${totalQuestions}`;

  showXP();
  resultView.focus();
}

nextButton.addEventListener("click", () => {
  if (currentQuestion < totalQuestions - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
});

retryButton.addEventListener("click", () => {
  currentQuestion = 0;
  correctAnswers = 0;
  roundXP = 0;
  renderQuestion();
  questionText.scrollIntoView?.({ behavior: "smooth", block: "center" });
});

title.innerHTML = `Desafio <span>${subject.title}</span>`;
description.textContent = subject.description;
document.title = `${subject.title} — Desafios EduQuest`;

renderTabs();
showXP();
renderQuestion();
