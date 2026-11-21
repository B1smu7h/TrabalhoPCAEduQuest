// Persistência local do EduQuest.
// Mantém as chaves antigas para preservar o progresso já salvo no navegador.

const EDUQUEST_KEYS = {
  xp: "eduquest-xp",
  answered: "eduquest-answered",
  correct: "eduquest-correct",
  results: "eduquest-results",
  lastActivity: "eduquest-last-activity"
};

function eduquestReadNumber(key) {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function eduquestReadResults() {
  try {
    const data = JSON.parse(localStorage.getItem(EDUQUEST_KEYS.results) || "{}");
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch (error) {
    return {};
  }
}

const EduQuestStorage = {
  getStats() {
    return {
      xp: eduquestReadNumber(EDUQUEST_KEYS.xp),
      answered: eduquestReadNumber(EDUQUEST_KEYS.answered),
      correct: eduquestReadNumber(EDUQUEST_KEYS.correct),
      results: eduquestReadResults(),
      lastActivity: localStorage.getItem(EDUQUEST_KEYS.lastActivity) || null
    };
  },

  saveAnswer(isCorrect, points = 10) {
    const answered = eduquestReadNumber(EDUQUEST_KEYS.answered) + 1;
    localStorage.setItem(EDUQUEST_KEYS.answered, String(answered));

    if (isCorrect) {
      localStorage.setItem(EDUQUEST_KEYS.correct, String(eduquestReadNumber(EDUQUEST_KEYS.correct) + 1));
      localStorage.setItem(EDUQUEST_KEYS.xp, String(eduquestReadNumber(EDUQUEST_KEYS.xp) + points));
    }

    localStorage.setItem(EDUQUEST_KEYS.lastActivity, new Date().toISOString());
  },

  saveResult(subjectKey, correct, total) {
    const results = eduquestReadResults();
    const previous = results[subjectKey] || {};
    const now = new Date().toISOString();

    results[subjectKey] = {
      best: Math.max(Number(previous.best) || 0, correct),
      last: correct,
      attempts: (Number(previous.attempts) || 0) + 1,
      total,
      lastPlayed: now
    };

    localStorage.setItem(EDUQUEST_KEYS.results, JSON.stringify(results));
    localStorage.setItem(EDUQUEST_KEYS.lastActivity, now);
    return results[subjectKey];
  },

  reset() {
    Object.values(EDUQUEST_KEYS).forEach((key) => localStorage.removeItem(key));
  }
};
