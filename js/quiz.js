const questionSets = {
  matematica: {
    title: "Matemática",
    description: "Use o raciocínio e resolva estas questões.",
    questions: [
      { text: "Quanto é 7 × 8?", options: ["54", "56", "64", "48"], answer: 1, explanation: "7 × 8 = 56." },
      { text: "Qual é o resultado de 15 + 27?", options: ["32", "40", "42", "ке"], answer: 2, explanation: "15 + 27 = 42." },
      { text: "Um quadrado tem lados de 4 cm. Qual é seu perímetro?", options: ["8 cm", "12 cm", "16 cm", "20 cm"], answer: 2, explanation: "O perímetro é a soma dos quatro lados: 4 × 4 = 16 cm." }
    ]
  },
  ciencias: {
    title: "Ciências",
    description: "Explore conceitos básicos sobre a natureza.",
    questions: [
      { text: "Qual planeta é conhecido como Planeta Vermelho?", options: ["Vênus", "Marte", "Júpiter", "Mercúrio"], answer: 1, explanation: "Marte recebe esse apelido por causa da aparência avermelhada de sua superfície." },
      { text: "Qual órgão bombeia o sangue pelo corpo?", options: ["Pulmão", "Estômago", "Coração", "Rim"], answer: 2, explanation: "O coração bombeia o sangue pelo sistema circulatório." },
      { text: "Em condições comuns, a água congela a que temperatura?", options: ["0 °C", "10 °C", "50 °C", "100 °C"], answer: 0, explanation: "A água pura congela a 0 °C sob pressão atmosférica padrão." }
    ]
  },
  historia: {
    title: "História",
    description: "Relembre acontecimentos e períodos históricos.",
    questions: [
      { text: "Em que ano ocorreu a Independência do Brasil?", options: ["1500", "1822", "1889", "1922"], answer: 1, explanation: "A Independência do Brasil foi proclamada em 1822." },
      { text: "Qual civilização construiu as pirâmides de Gizé?", options: ["Romana", "Egípcia", "Inca", "Grega"], answer: 1, explanation: "As pirâmides de Gizé foram construídas no Antigo Egito." },
      { text: "A chegada dos portugueses ao território que hoje é o Brasil ocorreu em:", options: ["1492", "1500", "1600", "1822"], answer: 1, explanation: "A chegada da expedição portuguesa é tradicionalmente datada de 1500." }
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const subjectKey = params.get("materia") || "matematica";
const subject = questionSets[subjectKey] || questionSets.matematica;
const storageKey = "eduquest-xp";

let currentQuestion = 0;
let correctAnswers = 0;
let answered = false;

const title = document.querySelector("#quiz-title");
const description = document.querySelector("#quiz-description");
const questionCount = document.querySelector("#question-count");
const scoreLabel = document.querySelector("#quiz-score");
const progressFill = document.querySelector("#progress-fill");
const questionText = document.querySelector("#question-text");
const optionsContainer = document.querySelector("#answer-options");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const xpTotal = document.querySelector("#xp-total");

title.innerHTML = `Desafio <span>${subject.title}</span>`;
description.textContent = subject.description;

function readXP() {
  return Number(localStorage.getItem(storageKey) || 0);
}

function showXP() {
  xpTotal.textContent = `${readXP()} XP`;
}

function renderQuestion() {
  const question = subject.questions[currentQuestion];
  answered = false;
  questionCount.textContent = `Pergunta ${currentQuestion + 1} de ${subject.questions.length}`;
  scoreLabel.textContent = `Acertos: ${correctAnswers}`;
  progressFill.style.width = `${(currentQuestion / subject.questions.length) * 100}%`;
  questionText.textContent = question.text;
  feedback.textContent = "";
  feedback.className = "quiz-feedback";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === subject.questions.length - 1 ? "Ver resultado →" : "Próxima pergunta →";
  optionsContainer.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index, button));
    optionsContainer.append(button);
  });
}

function chooseAnswer(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;
  const question = subject.questions[currentQuestion];
  const optionButtons = [...optionsContainer.querySelectorAll("button")];
  optionButtons.forEach(button => button.disabled = true);

  if (selectedIndex === question.answer) {
    correctAnswers++;
    localStorage.setItem(storageKey, String(readXP() + 10));
    selectedButton.classList.add("answer-correct");
    feedback.textContent = `Acertou! +10 XP. ${question.explanation}`;
    feedback.classList.add("feedback-correct");
    showXP();
  } else {
    selectedButton.classList.add("answer-wrong");
    optionButtons[question.answer].classList.add("answer-correct");
    feedback.textContent = `Quase! ${question.explanation}`;
    feedback.classList.add("feedback-wrong");
  }

  scoreLabel.textContent = `Acertos: ${correctAnswers}`;
  progressFill.style.width = `${((currentQuestion + 1) / subject.questions.length) * 100}%`;
  nextButton.disabled = false;
}

function showResults() {
  questionCount.textContent = "Missão concluída";
  progressFill.style.width = "100%";
  questionText.textContent = `Você acertou ${correctAnswers} de ${subject.questions.length}!`;
  optionsContainer.replaceChildren();
  feedback.className = "quiz-feedback feedback-correct";
  feedback.textContent = correctAnswers === subject.questions.length
    ? "Mandou muito bem! Você concluiu todas as questões."
    : "Boa prática! Você pode tentar novamente e aprender com o feedback.";
  nextButton.textContent = "Tentar novamente ↻";
  nextButton.disabled = false;
  nextButton.onclick = () => {
    currentQuestion = 0;
    correctAnswers = 0;
    nextButton.onclick = null;
    renderQuestion();
  };
}

nextButton.addEventListener("click", () => {
  if (currentQuestion < subject.questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
});

showXP();
renderQuestion();
