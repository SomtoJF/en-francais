const STORAGE_KEY = 'passe-recent-progress';
const ROUND_SIZE = 5;
const roundState = {};

function defaultProgress() {
  return Object.fromEntries(TABS.map(({ id }) => [id, { best: null, last: null, rounds: 0 }]));
}

function loadProgress() {
  try { return { ...defaultProgress(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
  catch { return defaultProgress(); }
}

function renderProgress(tab) {
  const p = loadProgress()[tab];
  document.getElementById(`progress-${tab}`).textContent = p.rounds
    ? `Last: ${p.last}% • Best: ${p.best}% • Rounds: ${p.rounds}` : 'No rounds completed yet.';
}

function sample(items, count) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function finishRound(tab) {
  const state = roundState[tab];
  if (Object.keys(state.answered).length !== state.items.length || state.recorded) return;
  state.recorded = true;
  const progress = loadProgress();
  const score = Math.round(state.correct / state.items.length * 100);
  const entry = progress[tab];
  entry.last = score; entry.best = entry.best === null ? score : Math.max(entry.best, score); entry.rounds += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  renderProgress(tab);
  const done = document.getElementById(`done-${tab}`);
  done.textContent = `🏁 ${state.correct}/${state.items.length} correct on first try.`;
  done.classList.remove('hidden');
}

function newRound(tab) {
  roundState[tab] = { items: sample(QUESTION_BANKS[tab], ROUND_SIZE), answered: {}, correct: 0, recorded: false };
  document.getElementById(`done-${tab}`).classList.add('hidden');
  const container = document.getElementById(`cards-${tab}`);
  container.innerHTML = '';
  roundState[tab].items.forEach((question, i) => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const buttons = question.options.map((option, j) => `<button onclick="checkAnswer('${tab}', ${i}, ${j})" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-3 py-2 rounded text-sm font-medium">${option}</button>`).join('');
    card.innerHTML = `<p class="font-medium">${i + 1}. ${question.prompt}</p><div class="flex flex-wrap gap-2">${buttons}</div><p id="feedback-${tab}-${i}" class="hidden text-sm font-medium"></p>`;
    container.appendChild(card);
  });
}

function checkAnswer(tab, i, choice) {
  const state = roundState[tab];
  const question = state.items[i];
  const correct = choice === question.answer;
  if (!(i in state.answered)) { state.answered[i] = correct; if (correct) state.correct++; }
  const feedback = document.getElementById(`feedback-${tab}-${i}`);
  feedback.className = `text-sm font-medium ${correct ? 'text-emerald-600' : 'text-red-600'}`;
  feedback.textContent = `${correct ? '✅ Correct. ' : '❌ Not quite. '}${question.explanation}`;
  finishRound(tab);
}

function switchTab(activeId) {
  TABS.forEach(({ id }) => {
    document.getElementById(`section-${id}`).classList.toggle('hidden', id !== activeId);
    document.getElementById(`tab-${id}`).classList.toggle('tab-active', id === activeId);
  });
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  TABS.forEach(({ id }) => renderProgress(id));
}

function build() {
  const tabs = document.getElementById('tabs');
  const sections = document.getElementById('sections');
  TABS.forEach(({ id, label }, i) => {
    const tab = document.createElement('button');
    tab.id = `tab-${id}`; tab.className = 'flex-1 min-w-[120px] py-3 px-3 border-b-2 border-transparent text-sm font-semibold';
    tab.textContent = label; tab.onclick = () => switchTab(id); tabs.appendChild(tab);
    const section = document.createElement('section');
    section.id = `section-${id}`; section.className = `bg-white p-5 rounded-b-xl border border-t-0 space-y-4 ${i ? 'hidden' : ''}`;
    section.innerHTML = `<div class="flex flex-wrap justify-between gap-3"><div><h2 class="text-xl font-bold">${label}</h2><p id="progress-${id}" class="text-xs text-slate-500"></p></div><button id="new-${id}" class="bg-indigo-600 text-white px-3 py-2 rounded text-sm">🔄 New round</button></div><p id="done-${id}" class="hidden text-sm font-semibold text-indigo-700 bg-indigo-50 p-3 rounded"></p><div id="cards-${id}" class="space-y-4"></div>`;
    sections.appendChild(section);
    document.getElementById(`new-${id}`).onclick = () => newRound(id);
    newRound(id); renderProgress(id);
  });
  switchTab(TABS[0].id);
}

build();
