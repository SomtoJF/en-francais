// Conjugation lesson: MC quiz + type-in quiz + irregular IR drill with localStorage progress.

const STORAGE_KEY = 'conjugaison-progress';
const ROUND_SIZE = { mc: 6, type: 6, irregular: 6 };

// ---------- Progress storage ----------

function defaultProgress() {
  return {
    mc: { best: null, last: null, rounds: 0 },
    type: { best: null, last: null, rounds: 0 },
    irregular: { best: null, last: null, rounds: 0 },
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

function recordRound(quiz, correct, total) {
  const progress = loadProgress();
  const pct = Math.round((correct / total) * 100);
  const entry = progress[quiz];
  entry.last = pct;
  entry.best = entry.best === null ? pct : Math.max(entry.best, pct);
  entry.rounds += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  renderProgress(quiz);
}

function renderProgress(quiz) {
  const entry = loadProgress()[quiz];
  const el = document.getElementById(`progress-${quiz}`);
  if (entry.rounds === 0) {
    el.innerText = 'No rounds completed yet.';
  } else {
    el.innerText = `Last: ${entry.last}% • Best: ${entry.best}% • Rounds played: ${entry.rounds}`;
  }
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  ['mc', 'type', 'irregular'].forEach(renderProgress);
}

// ---------- Tabs ----------

function switchTab(tabId) {
  ['mc', 'type', 'irregular'].forEach((t) => {
    document.getElementById('section-' + t).classList.add('hidden');
    const tabBtn = document.getElementById('tab-' + t);
    tabBtn.classList.remove('border-indigo-600', 'text-indigo-600');
    tabBtn.classList.add('border-transparent', 'text-slate-500');
  });

  document.getElementById('section-' + tabId).classList.remove('hidden');
  const activeTab = document.getElementById('tab-' + tabId);
  activeTab.classList.add('border-indigo-600', 'text-indigo-600');
  activeTab.classList.remove('border-transparent', 'text-slate-500');
}

// ---------- Shared helpers ----------

const roundState = {
  mc: { items: [], answered: {}, correct: 0 },
  type: { items: [], answered: {}, correct: 0 },
  irregular: { items: [], answered: {}, correct: 0 },
};

function sample(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
}

const REFERENCE_TABLES = {
  parler: 'je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent',
  finir: 'je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent',
  vendre: 'je vends, tu vends, il vend, nous vendons, vous vendez, ils vendent',
  dormir: 'je dors, tu dors, il dort, nous dormons, vous dormez, ils dorment',
  venir: 'je viens, tu viens, il vient, nous venons, vous venez, ils viennent',
  ouvrir: "j'ouvre, tu ouvres, il ouvre, nous ouvrons, vous ouvrez, ils ouvrent",
};

function speakTable(verb) {
  speak(REFERENCE_TABLES[verb]);
}

function subjectPhrase(pronoun, form) {
  return pronoun.endsWith("'") ? `${pronoun}${form}` : `${pronoun} ${form}`;
}

function maybeFinishRound(quiz) {
  const state = roundState[quiz];
  if (Object.keys(state.answered).length === state.items.length) {
    recordRound(quiz, state.correct, state.items.length);
    const banner = document.getElementById(`round-done-${quiz}`);
    banner.innerText = `🏁 Round complete: ${state.correct}/${state.items.length} correct on first try. Hit "New Round" to play again!`;
    banner.classList.remove('hidden');
  }
}

// Fisher-Yates over answer + distractors so the correct button isn't always first.
function shuffledOptions(q) {
  return sample([q.answer, ...q.distractors], q.distractors.length + 1);
}

// ---------- MC quiz (regular ER/IR/RE) ----------

function newMcRound() {
  roundState.mc = { items: sample(MC_QUESTIONS, ROUND_SIZE.mc), answered: {}, correct: 0 };
  document.getElementById('round-done-mc').classList.add('hidden');
  const container = document.getElementById('mc-questions');
  container.innerHTML = '';
  roundState.mc.items.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const buttons = shuffledOptions(q)
      .map(
        (opt) => `
        <button onclick="checkMc(${i}, '${opt}')" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium font-mono transition">
          ${opt}
        </button>`
      )
      .join('');
    block.innerHTML = `
      <p class="font-medium text-slate-800">${i + 1}. ${q.pronoun} ______ <span class="text-indigo-600 font-mono">(${q.infinitive})</span> <span class="text-xs text-slate-400">— ${q.gloss}</span></p>
      <div class="flex flex-wrap gap-3">${buttons}</div>
      <p id="mc-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(block);
  });
}

function checkMc(i, choice) {
  const state = roundState.mc;
  const q = state.items[i];
  const feedback = document.getElementById(`mc-feedback-${i}`);
  feedback.classList.remove('hidden');

  const firstTry = !(i in state.answered);
  if (choice === q.answer) {
    if (firstTry) {
      state.answered[i] = true;
      state.correct += 1;
    }
    feedback.innerText = `✅ Correct! ${subjectPhrase(q.pronoun, q.answer)}.`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
    speak(subjectPhrase(q.pronoun, q.answer));
  } else {
    if (firstTry) state.answered[i] = false;
    feedback.innerText = '❌ Not quite. Chop the infinitive ending, then match the ending to the subject — check the tables above.';
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }
  maybeFinishRound('mc');
}

// ---------- Type quiz (regular ER/IR/RE) ----------

function newTypeRound() {
  roundState.type = { items: sample(TYPE_QUESTIONS, ROUND_SIZE.type), answered: {}, correct: 0 };
  document.getElementById('round-done-type').classList.add('hidden');
  const container = document.getElementById('type-questions');
  container.innerHTML = '';
  roundState.type.items.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    block.innerHTML = `
      <p class="font-medium text-slate-800">${i + 1}. ${q.pronoun} ______ <span class="text-purple-600 font-mono">(${q.infinitive})</span> <span class="text-xs text-slate-400">— ${q.gloss}, ${q.group} verb</span></p>
      <div class="flex gap-3">
        <input id="type-input-${i}" type="text" autocomplete="off" spellcheck="false" onkeydown="if(event.key==='Enter')checkType(${i})" class="border border-slate-300 rounded px-3 py-2 text-sm font-mono w-48 focus:outline-none focus:border-purple-500" placeholder="type the form…">
        <button onclick="checkType(${i})" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition">Check</button>
      </div>
      <p id="type-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(block);
  });
}

function checkType(i) {
  const state = roundState.type;
  const q = state.items[i];
  const guess = document.getElementById(`type-input-${i}`).value.trim().toLowerCase();
  if (!guess) return;
  const feedback = document.getElementById(`type-feedback-${i}`);
  feedback.classList.remove('hidden');

  const firstTry = !(i in state.answered);
  if (guess === q.answer) {
    if (firstTry) {
      state.answered[i] = true;
      state.correct += 1;
    }
    feedback.innerText = `✅ Correct! ${subjectPhrase(q.pronoun, q.answer)}.`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
    speak(subjectPhrase(q.pronoun, q.answer));
  } else {
    if (firstTry) state.answered[i] = false;
    feedback.innerText = `❌ Not quite. It's a regular ${q.group} verb — stem "${q.answer.slice(0, q.infinitive.length - 2)}…" plus the ${q.pronoun} ending. Answer: ${q.answer}.`;
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }
  maybeFinishRound('type');
}

// ---------- Irregular IR drill ----------

function newIrregularRound() {
  roundState.irregular = { items: sample(IRREGULAR_QUESTIONS, ROUND_SIZE.irregular), answered: {}, correct: 0 };
  document.getElementById('round-done-irregular').classList.add('hidden');
  const container = document.getElementById('irregular-questions');
  container.innerHTML = '';
  roundState.irregular.items.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const buttons = shuffledOptions(q)
      .map(
        (opt) => `
        <button onclick="checkIrregular(${i}, '${opt}')" class="bg-white border border-slate-200 hover:border-rose-500 hover:bg-rose-50 px-4 py-2 rounded text-sm font-medium font-mono transition">
          ${opt}
        </button>`
      )
      .join('');
    block.innerHTML = `
      <p class="font-medium text-slate-800">${i + 1}. ${q.pronoun} ______ <span class="text-rose-600 font-mono">(${q.infinitive})</span> <span class="text-xs text-slate-400">— ${q.gloss}</span></p>
      <div class="flex flex-wrap gap-3">${buttons}</div>
      <p id="irregular-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(block);
  });
}

function checkIrregular(i, choice) {
  const state = roundState.irregular;
  const q = state.items[i];
  const feedback = document.getElementById(`irregular-feedback-${i}`);
  feedback.classList.remove('hidden');

  const firstTry = !(i in state.answered);
  if (choice === q.answer) {
    if (firstTry) {
      state.answered[i] = true;
      state.correct += 1;
    }
    feedback.innerText = `✅ Correct! ${subjectPhrase(q.pronoun, q.answer)}. ${q.note}`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
    speak(subjectPhrase(q.pronoun, q.answer));
  } else {
    if (firstTry) state.answered[i] = false;
    feedback.innerText = `❌ Not quite. ${q.note}`;
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }
  maybeFinishRound('irregular');
}

// ---------- Init ----------

newMcRound();
newTypeRound();
newIrregularRound();
renderProgress('mc');
renderProgress('type');
renderProgress('irregular');
