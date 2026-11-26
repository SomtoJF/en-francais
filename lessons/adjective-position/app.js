const STORAGE_KEY = 'adjective-position-progress';
const TRANSLATION_STORAGE_KEY = 'adjective-position-translation-progress';
const ROUND_SIZE = 6;
let roundState = { items: [], answered: {}, correct: 0 };
let translationRoundState = { items: [], answered: {}, correct: 0, recorded: false };

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved || { best: null, last: null, rounds: 0 };
  } catch { return { best: null, last: null, rounds: 0 }; }
}

function renderProgress() {
  const p = loadProgress();
  document.getElementById('progress-position').innerText = p.rounds ? `Last: ${p.last}% • Best: ${p.best}% • Rounds played: ${p.rounds}` : 'No rounds completed yet.';
}

function recordRound() {
  const p = loadProgress();
  const score = Math.round((roundState.correct / roundState.items.length) * 100);
  p.last = score;
  p.best = p.best === null ? score : Math.max(p.best, score);
  p.rounds += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  renderProgress();
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TRANSLATION_STORAGE_KEY);
  renderProgress();
  renderTranslationProgress();
}

function sample(items, count) {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
}

function newPositionRound() {
  roundState = { items: sample(POSITION_QUESTIONS, ROUND_SIZE), answered: {}, correct: 0 };
  document.getElementById('round-done-position').classList.add('hidden');
  const container = document.getElementById('position-questions');
  container.innerHTML = '';
  roundState.items.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const buttons = q.options.map((option, j) => `<button onclick="checkPosition(${i}, ${j})" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">${option}</button>`).join('');
    card.innerHTML = `<p class="font-medium text-slate-800">${i + 1}. How do you say <strong>“${q.prompt}”</strong>?</p><div class="flex flex-wrap gap-3">${buttons}</div><p id="position-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(card);
  });
}

function checkPosition(i, choice) {
  const q = roundState.items[i];
  const feedback = document.getElementById(`position-feedback-${i}`);
  const firstTry = !(i in roundState.answered);
  feedback.classList.remove('hidden');
  if (q.options[choice] === q.answer) {
    if (firstTry) { roundState.answered[i] = true; roundState.correct += 1; }
    feedback.innerText = `✅ Correct. ${q.note}`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
  } else {
    if (firstTry) roundState.answered[i] = false;
    feedback.innerText = `❌ Try again. ${q.note}`;
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }
  if (Object.keys(roundState.answered).length === roundState.items.length) {
    recordRound();
    const banner = document.getElementById('round-done-position');
    banner.innerText = `🏁 Round complete: ${roundState.correct}/${roundState.items.length} correct on first try. Hit “New Round” to play again!`;
    banner.classList.remove('hidden');
  }
}

function switchTab(tabId) {
  ['position', 'translation'].forEach((id) => {
    const active = tabId === id;
    document.getElementById(`section-${id}`).classList.toggle('hidden', !active);
    const button = document.getElementById(`tab-${id}`);
    button.classList.toggle('border-indigo-600', active);
    button.classList.toggle('text-indigo-600', active);
    button.classList.toggle('border-transparent', !active);
    button.classList.toggle('text-slate-500', !active);
  });
}

function renderTranslationProgress() {
  const p = loadProgressFor(TRANSLATION_STORAGE_KEY);
  document.getElementById('progress-translation').innerText = p.rounds
    ? `Last: ${p.last}% • Best: ${p.best}% • Rounds played: ${p.rounds}`
    : 'No rounds completed yet.';
}

function loadProgressFor(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || { best: null, last: null, rounds: 0 };
  } catch { return { best: null, last: null, rounds: 0 }; }
}

function recordTranslationRound() {
  if (translationRoundState.recorded) return;
  translationRoundState.recorded = true;
  const p = loadProgressFor(TRANSLATION_STORAGE_KEY);
  const score = Math.round((translationRoundState.correct / translationRoundState.items.length) * 100);
  p.last = score;
  p.best = p.best === null ? score : Math.max(p.best, score);
  p.rounds += 1;
  localStorage.setItem(TRANSLATION_STORAGE_KEY, JSON.stringify(p));
  renderTranslationProgress();
}

function newTranslationRound() {
  translationRoundState = { items: sample(TRANSLATION_QUESTIONS, ROUND_SIZE), answered: {}, correct: 0, recorded: false };
  document.getElementById('round-done-translation').classList.add('hidden');
  const container = document.getElementById('translation-questions');
  container.innerHTML = '';
  translationRoundState.items.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const buttons = q.options.map((option, j) => `<button onclick="checkTranslation(${i}, ${j})" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">${option}</button>`).join('');
    card.innerHTML = `<p class="font-medium text-slate-800">${i + 1}. Translate into French: <strong>“${q.prompt}”</strong></p><div class="flex flex-wrap gap-3">${buttons}</div><p id="translation-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(card);
  });
}

function checkTranslation(i, choice) {
  const q = translationRoundState.items[i];
  const feedback = document.getElementById(`translation-feedback-${i}`);
  const firstTry = !(i in translationRoundState.answered);
  feedback.classList.remove('hidden');
  if (choice === q.answer) {
    if (firstTry) { translationRoundState.answered[i] = true; translationRoundState.correct += 1; }
    feedback.innerText = `✅ Correct. ${q.note}`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
  } else {
    if (firstTry) translationRoundState.answered[i] = false;
    feedback.innerText = `❌ Try again. ${q.note}`;
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }
  if (Object.keys(translationRoundState.answered).length === translationRoundState.items.length) {
    recordTranslationRound();
    const banner = document.getElementById('round-done-translation');
    banner.innerText = `🏁 Round complete: ${translationRoundState.correct}/${translationRoundState.items.length} correct on first try. Hit “New Round” to play again!`;
    banner.classList.remove('hidden');
  }
}

newPositionRound();
renderProgress();
newTranslationRound();
renderTranslationProgress();
