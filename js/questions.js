// Banco de desafios do EduQuest.
// Cada disciplina possui cinco perguntas de múltipla escolha.
// O índice em "answer" aponta para a alternativa correta (base zero).

const questionSets = {
  matematica: {
    title: "Matemática",
    icon: "∑",
    tag: "Raciocínio",
    description: "Use o raciocínio e resolva estas questões.",
    questions: [
      {
        text: "Quanto é 7 × 8?",
        options: ["54", "56", "64", "48"],
        answer: 1,
        explanation: "7 × 8 = 56."
      },
      {
        text: "Qual é o resultado de 15 + 27?",
        options: ["32", "40", "42", "45"],
        answer: 2,
        explanation: "15 + 27 = 42."
      },
      {
        text: "Um quadrado tem lados de 4 cm. Qual é o seu perímetro?",
        options: ["8 cm", "12 cm", "16 cm", "20 cm"],
        answer: 2,
        explanation: "O perímetro é a soma dos quatro lados: 4 × 4 = 16 cm."
      },
      {
        text: "Qual é o valor de 2³ + 4?",
        options: ["10", "12", "14", "16"],
        answer: 1,
        explanation: "2³ = 8, então 8 + 4 = 12."
      },
      {
        text: "Se 3x = 21, qual é o valor de x?",
        options: ["6", "7", "8", "9"],
        answer: 1,
        explanation: "Dividindo os dois lados por 3, temos x = 21 ÷ 3 = 7."
      }
    ]
  },
  ciencias: {
    title: "Ciências",
    icon: "⚛",
    tag: "Descobertas",
    description: "Explore conceitos básicos sobre a natureza.",
    questions: [
      {
        text: "Qual planeta é conhecido como Planeta Vermelho?",
        options: ["Vênus", "Marte", "Júpiter", "Mercúrio"],
        answer: 1,
        explanation: "Marte recebe esse apelido por causa da aparência avermelhada de sua superfície."
      },
      {
        text: "Qual órgão bombeia o sangue pelo corpo?",
        options: ["Pulmão", "Estômago", "Coração", "Rim"],
        answer: 2,
        explanation: "O coração bombeia o sangue pelo sistema circulatório."
      },
      {
        text: "Em condições comuns, a água congela a que temperatura?",
        options: ["0 °C", "10 °C", "50 °C", "100 °C"],
        answer: 0,
        explanation: "A água pura congela a 0 °C sob pressão atmosférica padrão."
      },
      {
        text: "Qual gás as plantas absorvem durante a fotossíntese?",
        options: ["Oxigênio", "Gás carbônico", "Nitrogênio", "Hidrogênio"],
        answer: 1,
        explanation: "Na fotossíntese, as plantas absorvem gás carbônico e liberam oxigênio."
      },
      {
        text: "Qual é o maior planeta do Sistema Solar?",
        options: ["Terra", "Júpiter", "Saturno", "Netuno"],
        answer: 1,
        explanation: "Júpiter é o maior planeta do Sistema Solar."
      }
    ]
  },
  historia: {
    title: "História",
    icon: "⌛",
    tag: "Passado e presente",
    description: "Relembre acontecimentos e períodos históricos.",
    questions: [
      {
        text: "Em que ano ocorreu a Independência do Brasil?",
        options: ["1500", "1822", "1889", "1922"],
        answer: 1,
        explanation: "A Independência do Brasil foi proclamada em 1822."
      },
      {
        text: "Qual civilização construiu as pirâmides de Gizé?",
        options: ["Romana", "Egípcia", "Inca", "Grega"],
        answer: 1,
        explanation: "As pirâmides de Gizé foram construídas no Antigo Egito."
      },
      {
        text: "A chegada dos portugueses ao território que hoje é o Brasil ocorreu em:",
        options: ["1492", "1500", "1600", "1822"],
        answer: 1,
        explanation: "A chegada da expedição portuguesa é tradicionalmente datada de 1500."
      },
      {
        text: "Em que ano foi proclamada a República no Brasil?",
        options: ["1822", "1888", "1889", "1930"],
        answer: 2,
        explanation: "A Proclamação da República aconteceu em 15 de novembro de 1889."
      },
      {
        text: "Em que ano terminou a Segunda Guerra Mundial?",
        options: ["1939", "1942", "1945", "1950"],
        answer: 2,
        explanation: "A Segunda Guerra Mundial terminou em 1945."
      }
    ]
  }
};
