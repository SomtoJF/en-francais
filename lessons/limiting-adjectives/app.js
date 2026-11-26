const STORAGE_KEY = 'limiting-adjectives-progress';
const ROUND_SIZE = 6;
const QUESTION_BANKS = { identify: TYPE_QUESTIONS, form: FORM_QUESTIONS };
const roundState = {
  identify: { items: [], answered: {}, correct: 0 },
  form: { items: [], answered: {}, correct: 0 },
};

function defaultProgress() {
  return {
    identify: { best: null, last: null, rounds: 0 },
    form: { best: null, last: null, rounds: 0 },
  };
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultProgress(), ...saved };
  } catch { return defaultProgress(); }
}

function renderProgress(tab) {
  const p = loadProgress()[tab];
  document.getElementById(`progress-${tab}`).innerText = p.rounds
    ? `Last: ${p.last}% • Best: ${p.best}% • Rounds played: ${p.rounds}`
    : 'No rounds completed yet.';
}

function recordRound(tab) {
  const progress = loadProgress();
  const score = Math.round((roundState[tab].correct / roundState[tab].items.length) * 100);
  const entry = progress[tab];
  entry.last = score;
  entry.best = entry.best === null ? score : Math.max(entry.best, score);
  entry.rounds += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  renderProgress(tab);
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  renderProgress('identify');
  renderProgress('form');
}

function sample(items, count) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function switchTab(tab) {
  ['identify', 'form'].forEach((id) => {
    document.getElementById(`section-${id}`).classList.toggle('hidden', id !== tab);
    const button = document.getElementById(`tab-${id}`);
    button.classList.toggle('border-indigo-600', id === tab);
    button.classList.toggle('text-indigo-600', id === tab);
    button.classList.toggle('border-transparent', id !== tab);
    button.classList.toggle('text-slate-500', id !== tab);
  });
}

function newRound(tab) {
  roundState[tab] = { items: sample(QUESTION_BANKS[tab], ROUND_SIZE), answered: {}, correct: 0 };
  document.getElementById(`round-done-${tab}`).classList.add('hidden');
  const container = document.getElementById(`${tab}-questions`);
  container.innerHTML = '';

  roundState[tab].items.forEach((question, i) => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const prompt = tab === 'identify'
      ? `What type is <strong>${question.word}</strong> in: ${question.sentence}`
      : question.sentence.replace('______', '<span class="bg-yellow-100 px-1 font-mono">______</span>');
    const buttons = question.options.map((option, j) => `
      <button onclick="checkAnswer('${tab}', ${i}, ${j})" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">${option}</button>`).join('');
    card.innerHTML = `<p class="font-medium text-slate-800">${i + 1}. ${prompt}</p><div class="flex flex-wrap gap-3">${buttons}</div><p id="${tab}-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(card);
  });
}

function checkAnswer(tab, i, choiceIndex) {
  const state = roundState[tab];
  const question = state.items[i];
  const choice = question.options[choiceIndex];
  const feedback = document.getElementById(`${tab}-feedback-${i}`);
  const firstTry = !(i in state.answered);
  feedback.classList.remove('hidden');

  if (choice === question.answer) {
    if (firstTry) { state.answered[i] = true; state.correct += 1; }
    feedback.innerText = `✅ Correct. ${question.note || ''}`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
  } else {
    if (firstTry) state.answered[i] = false;
    feedback.innerText = `❌ Not quite. ${question.note || `The correct answer is ${question.answer}.`}`;
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }

  if (Object.keys(state.answered).length === state.items.length) {
    recordRound(tab);
    const banner = document.getElementById(`round-done-${tab}`);
    banner.innerText = `🏁 Round complete: ${state.correct}/${state.items.length} correct on first try. Hit “New Round” to play again!`;
    banner.classList.remove('hidden');
  }
}

newRound('identify');
newRound('form');
renderProgress('identify');
renderProgress('form');
