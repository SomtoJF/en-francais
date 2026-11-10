const STORAGE_KEY = 'coi-cod-progress';
const ROUND_SIZE = { identify: 4, pronoun: 5, place: 5, mixed: 4, translate: 10 };
const TABS = ['identify', 'pronoun', 'place', 'mixed', 'translate'];
const banks = { identify: IDENTIFY_QUESTIONS, pronoun: PRONOUN_QUESTIONS, place: PLACEMENT_QUESTIONS, mixed: MIXED_QUESTIONS };
const state = Object.fromEntries(TABS.map((tab) => [tab, { items: [], answered: {}, correct: 0 }]));

function defaultProgress() { return Object.fromEntries(TABS.map((tab) => [tab, { best: null, last: null, rounds: 0 }])); }
function loadProgress() { try { return { ...defaultProgress(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { return defaultProgress(); } }
function saveProgress(progress) { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
function renderProgress(tab) {
  const entry = loadProgress()[tab];
  document.getElementById(`progress-${tab}`).innerText = entry.rounds ? `Last: ${entry.last}% • Best: ${entry.best}% • Rounds played: ${entry.rounds}` : 'No rounds completed yet.';
}
function recordRound(tab) {
  const current = state[tab]; const pct = Math.round((current.correct / current.items.length) * 100); const progress = loadProgress();
  progress[tab].last = pct; progress[tab].best = progress[tab].best === null ? pct : Math.max(progress[tab].best, pct); progress[tab].rounds += 1; saveProgress(progress); renderProgress(tab);
}
function maybeFinish(tab) {
  const current = state[tab];
  if (Object.keys(current.answered).length !== current.items.length) return;
  recordRound(tab);
  const banner = document.getElementById(`round-done-${tab}`); banner.innerText = `🏁 Round complete: ${current.correct}/${current.items.length} correct on first try. Hit “New Round” to play again!`; banner.classList.remove('hidden');
}
function sample(items, count) { return [...items].sort(() => Math.random() - 0.5).slice(0, count); }
function startRound(tab, items) { state[tab] = { items, answered: {}, correct: 0 }; document.getElementById(`round-done-${tab}`).classList.add('hidden'); }
function answer(tab, index, correct, feedback) {
  const current = state[tab]; const firstTry = !(index in current.answered);
  if (firstTry) { current.answered[index] = correct; if (correct) current.correct += 1; }
  feedback.className = `feedback ${correct ? 'good' : 'bad'}`; feedback.innerText = (correct ? '✅ Correct. ' : '❌ Not quite. ') + feedback.dataset.text; maybeFinish(tab);
}
function makeCard(className = 'card') { const card = document.createElement('div'); card.className = className; return card; }

function newIdentifyRound() {
  startRound('identify', sample(IDENTIFY_QUESTIONS, ROUND_SIZE.identify)); const container = document.getElementById('identify-cards'); container.innerHTML = '';
  state.identify.items.forEach((q, i) => { const card = makeCard(); card.innerHTML = `<p class="font-medium">${i + 1}. ${q.sentence}</p><p class="text-xs text-slate-500 mt-1">${q.question}</p><div class="flex gap-2 mt-3"><button class="choice" data-answer="COD">COD</button><button class="choice" data-answer="COI">COI</button></div><p id="identify-feedback-${i}" class="feedback hidden"></p>`; card.querySelectorAll('button').forEach((button) => button.onclick = () => { const correct = button.dataset.answer === q.answer; const feedback = document.getElementById(`identify-feedback-${i}`); feedback.dataset.text = `French: ${q.sentence} → English: ${q.translation} Correct type: ${q.answer}. Rule: ${q.explanation}`; answer('identify', i, correct, feedback); }); container.appendChild(card); });
}

function newPronounRound() {
  startRound('pronoun', sample(PRONOUN_QUESTIONS, ROUND_SIZE.pronoun)); const container = document.getElementById('pronoun-cards'); container.innerHTML = '';
  state.pronoun.items.forEach((q, i) => { const card = makeCard(); card.innerHTML = `<p class="font-medium">${i + 1}. ${q.sentence}</p><div class="flex flex-wrap gap-2 mt-3">${q.options.map((option) => `<button class="choice" data-answer="${option}">${option}</button>`).join('')}</div><p id="pronoun-feedback-${i}" class="feedback hidden"></p>`; card.querySelectorAll('button').forEach((button) => button.onclick = () => { const correct = button.dataset.answer === q.answer; const feedback = document.getElementById(`pronoun-feedback-${i}`); feedback.dataset.text = `${q.filled} → ${q.translation} Rule: ${q.rule}`; answer('pronoun', i, correct, feedback); }); container.appendChild(card); });
}

function newPlaceRound() {
  startRound('place', sample(PLACEMENT_QUESTIONS, ROUND_SIZE.place)); const container = document.getElementById('place-cards'); container.innerHTML = '';
  state.place.items.forEach((q, i) => { const card = makeCard(); card.innerHTML = `<p class="font-medium">${i + 1}. ${q.prompt}</p><div class="grid gap-2 mt-3">${q.choices.map((option) => `<button class="choice text-left" data-answer="${option}">${option}</button>`).join('')}</div><p id="place-feedback-${i}" class="feedback hidden"></p>`; card.querySelectorAll('button').forEach((button) => button.onclick = () => { const correct = button.dataset.answer === q.answer; const feedback = document.getElementById(`place-feedback-${i}`); feedback.dataset.text = `${q.answer} → ${q.translation} Rule: ${q.rule}`; answer('place', i, correct, feedback); }); container.appendChild(card); });
}

function newMixedRound() {
  startRound('mixed', sample(MIXED_QUESTIONS, ROUND_SIZE.mixed)); const container = document.getElementById('mixed-cards'); container.innerHTML = '';
  state.mixed.items.forEach((q, i) => { const card = makeCard(); card.innerHTML = `<p class="font-medium">${i + 1}. ${q.sentence}</p><div class="flex flex-wrap gap-2 mt-3">${q.options.map((option) => `<button class="choice text-left" data-answer="${option}">${option}</button>`).join('')}</div><p id="mixed-feedback-${i}" class="feedback hidden"></p>`; card.querySelectorAll('button').forEach((button) => button.onclick = () => { const correct = button.dataset.answer === q.answer; const feedback = document.getElementById(`mixed-feedback-${i}`); feedback.dataset.text = `${q.sentence} → ${q.translation} Rule: ${q.explanation}`; answer('mixed', i, correct, feedback); }); container.appendChild(card); });
}

function normalize(text) { return text.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/[.!?¿¡]/g, '').replace(/\s+/g, ' '); }
function speak(text) { if ('speechSynthesis' in window) { const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'fr-FR'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance); } }
function newTranslateRound() {
  const french = sample(TRANSLATION_QUESTIONS.filter((q) => q.direction === 'fr-en'), 5); const english = sample(TRANSLATION_QUESTIONS.filter((q) => q.direction === 'en-fr'), 5);
  startRound('translate', sample([...french, ...english], 10)); const container = document.getElementById('translate-cards'); container.innerHTML = '';
  state.translate.items.forEach((q, i) => { const card = makeCard(); card.innerHTML = `<div class="translate-head"><p class="font-medium">${i + 1}. ${q.prompt}</p><button class="listen" data-text="${q.french}">🔊 Listen</button></div><div class="translate-controls"><input id="translate-input-${i}" class="answer-input" placeholder="Type your translation…"><button class="check-button" id="translate-check-${i}">Check</button></div><p class="text-xs text-slate-500 mt-2">Hint: ${q.hint}</p><p id="translate-feedback-${i}" class="feedback hidden"></p>`; card.querySelector('.listen').onclick = () => speak(q.french); card.querySelector('button.check-button').onclick = () => { const input = normalize(document.getElementById(`translate-input-${i}`).value); const correct = input === normalize(q.answer); const feedback = document.getElementById(`translate-feedback-${i}`); feedback.dataset.text = `${q.direction === 'fr-en' ? q.french : q.answer} → ${q.direction === 'fr-en' ? q.answer : q.french} Rule focus: ${q.hint}.`; answer('translate', i, correct, feedback); }; container.appendChild(card); });
}

function switchTab(tab) { TABS.forEach((id) => { document.getElementById(`section-${id}`).classList.toggle('hidden', id !== tab); document.getElementById(`tab-${id}`).classList.toggle('active-tab', id === tab); }); }
function resetProgress() { localStorage.removeItem(STORAGE_KEY); TABS.forEach(renderProgress); }

newIdentifyRound(); newPronounRound(); newPlaceRound(); newMixedRound(); newTranslateRound(); TABS.forEach(renderProgress);
