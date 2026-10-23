const xp = Number(localStorage.getItem("eduquest-xp") || 0);
const answered = Number(localStorage.getItem("eduquest-answered") || 0);
const correct = Number(localStorage.getItem("eduquest-correct") || 0);

document.querySelector("#progress-xp").textContent = `${xp} XP`;
document.querySelector("#progress-answered").textContent = answered;
document.querySelector("#progress-correct").textContent = correct;

if (answered > 0) {
  document.querySelector("#progress-message-title").textContent = "Você já está construindo sua jornada!";
  document.querySelector("#progress-message-text").textContent = `Você acertou ${correct} de ${answered} perguntas respondidas. Continue praticando para acumular XP.`;
}