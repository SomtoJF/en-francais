// App logic: renders randomized rounds from data.js, tracks scores in localStorage.

const STORAGE_KEY = 'circonflexe-progress';
const ROUND_SIZE = { ghost: 4, meaning: 5 };

// ---------- Progress storage ----------

function defaultProgress() {
  return {
    ghost: { best: null, last: null, rounds: 0 },
    meaning: { best: null, last: null, rounds: 0 },
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw);
    return { ...defaultProgress(), ...parsed };
  } catch {
    return defaultProgress();
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function recordRound(tab, correct, total) {
  const progress = loadProgress();
  const pct = Math.round((correct / total) * 100);
  const entry = progress[tab];
  entry.last = pct;
  entry.best = entry.best === null ? pct : Math.max(entry.best, pct);
  entry.rounds += 1;
  saveProgress(progress);
  renderProgress(tab);
}

function renderProgress(tab) {
  const entry = loadProgress()[tab];
  const el = document.getElementById(`progress-${tab}`);
  if (entry.rounds === 0) {
    el.innerText = 'No rounds completed yet.';
  } else {
    el.innerText = `Last: ${entry.last}% • Best: ${entry.best}% • Rounds played: ${entry.rounds}`;
  }
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  renderProgress('ghost');
  renderProgress('meaning');
}

// ---------- Round state ----------

const roundState = {
  ghost: { items: [], answered: {}, correct: 0 },
  meaning: { items: [], answered: {}, correct: 0 },
};

function sample(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function maybeFinishRound(tab) {
  const state = roundState[tab];
  if (Object.keys(state.answered).length === state.items.length) {
    recordRound(tab, state.correct, state.items.length);
    const banner = document.getElementById(`round-done-${tab}`);
    banner.innerText = `🏁 Round complete: ${state.correct}/${state.items.length} correct on first try. Hit "New Round" to play again!`;
    banner.classList.remove('hidden');
  }
}

// ---------- Ghost S tab ----------

function newGhostRound() {
  roundState.ghost = { items: sample(GHOST_WORDS, ROUND_SIZE.ghost), answered: {}, correct: 0 };
  document.getElementById('round-done-ghost').classList.add('hidden');
  const container = document.getElementById('ghost-cards');
  container.innerHTML = '';
  roundState.ghost.items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'p-4 border border-slate-100 rounded-lg bg-slate-50 space-y-3';
    card.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="text-2xl font-bold text-indigo-600">${item.fr}</span>
        <span class="text-xs font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">${item.syllables}</span>
      </div>
      <p class="text-xs text-slate-500">Hint: ${item.hint}</p>
      <div class="flex gap-2">
        <input type="text" id="ghost-${i}" placeholder="Type English word..." class="w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none">
        <button onclick="checkGhost(${i})" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium transition">Check</button>
      </div>
      <p id="ghost-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(card);
  });
}

function checkGhost(i) {
  const state = roundState.ghost;
  const item = state.items[i];
  const input = document.getElementById(`ghost-${i}`).value.trim().toLowerCase();
  const feedback = document.getElementById(`ghost-feedback-${i}`);
  feedback.classList.remove('hidden');

  const firstTry = !(i in state.answered);
  if (item.answers.includes(input)) {
    if (firstTry) {
      state.answered[i] = true;
      state.correct += 1;
    }
    feedback.innerText = `🎉 Excéllo! You found the ghost S: ${item.answers[0].toUpperCase()}.`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
    maybeFinishRound('ghost');
  } else {
    if (firstTry) state.answered[i] = false;
    feedback.innerText = '❌ Try again! Think of an English word similar to the French spelling.';
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
    maybeFinishRound('ghost');
  }
}

// ---------- Meaning tab ----------

function newMeaningRound() {
  roundState.meaning = { items: sample(MEANING_QUESTIONS, ROUND_SIZE.meaning), answered: {}, correct: 0 };
  document.getElementById('round-done-meaning').classList.add('hidden');
  const container = document.getElementById('meaning-questions');
  container.innerHTML = '';
  roundState.meaning.items.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const sentence = q.sentence.replace('______', '<span class="bg-yellow-100 px-1 font-mono">______</span>');
    const buttons = q.options
      .map(
        (opt, j) => `
        <button onclick="checkMeaning(${i}, ${j})" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">
          ${opt.word} <span class="text-xs text-slate-400 block">(${opt.gloss})</span>
        </button>`
      )
      .join('');
    block.innerHTML = `
      <p class="font-medium text-slate-800">${i + 1}. ${sentence}</p>
      <div class="flex gap-4">${buttons}</div>
      <p id="meaning-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(block);
  });
}

function checkMeaning(i, j) {
  const state = roundState.meaning;
  const opt = state.items[i].options[j];
  const feedback = document.getElementById(`meaning-feedback-${i}`);
  feedback.classList.remove('hidden');

  const firstTry = !(i in state.answered);
  if (opt.correct) {
    if (firstTry) {
      state.answered[i] = true;
      state.correct += 1;
    }
    feedback.innerText = `✅ Correct! "${opt.word}" matches the context perfectly.`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
  } else {
    if (firstTry) state.answered[i] = false;
    feedback.innerText = '❌ Oops! Think about whether the word needs the semantic "hat" or not.';
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }
  maybeFinishRound('meaning');
}

// ---------- Tabs / pronunciation (unchanged behavior) ----------

function switchTab(tabId) {
  document.getElementById('section-ghost').classList.add('hidden');
  document.getElementById('section-meaning').classList.add('hidden');
  document.getElementById('section-pronounce').classList.add('hidden');

  ['ghost', 'meaning', 'pronounce'].forEach((t) => {
    const tabBtn = document.getElementById('tab-' + t);
    tabBtn.classList.remove('border-indigo-600', 'text-indigo-600');
    tabBtn.classList.add('border-transparent', 'text-slate-500');
  });

  document.getElementById('section-' + tabId).classList.remove('hidden');
  const activeTab = document.getElementById('tab-' + tabId);
  activeTab.classList.add('border-indigo-600', 'text-indigo-600');
  activeTab.classList.remove('border-transparent', 'text-slate-500');
}

const SOUNDS = {
  'ê': {
    demo: 'fête, crêpe',
    emoji: '😮',
    mouthClass: 'w-24 h-24 rounded-[40%_40%_15%_15%] border-4 border-purple-500 bg-purple-50 transition-all duration-500 flex items-center justify-center text-4xl shadow-inner',
    desc: 'Jaw Dropped / Open Vowel [ɛ]',
    descClass: 'text-purple-600 font-bold',
  },
  'ô': {
    demo: 'côte, hôte',
    emoji: '😗',
    mouthClass: 'w-16 h-16 rounded-full border-4 border-indigo-500 bg-indigo-50 transition-all duration-500 flex items-center justify-center text-4xl shadow-inner',
    desc: 'Rounded Lips / Closed Vowel [o]',
    descClass: 'text-indigo-600 font-bold',
  },
  'â': {
    demo: 'pâte, château',
    emoji: '😲',
    mouthClass: 'w-28 h-28 rounded-full border-4 border-rose-500 bg-rose-50 transition-all duration-500 flex items-center justify-center text-4xl shadow-inner',
    desc: 'Jaw Wide Open / Deep Back Vowel [ɑ]',
    descClass: 'text-rose-600 font-bold',
  },
  'î': {
    demo: 'île, dîner',
    emoji: '😁',
    mouthClass: 'w-28 h-14 rounded-full border-4 border-emerald-500 bg-emerald-50 transition-all duration-500 flex items-center justify-center text-4xl shadow-inner',
    desc: 'Lips Spread in a Smile / Front Vowel [i]',
    descClass: 'text-emerald-600 font-bold',
  },
  'û': {
    demo: 'sûr, flûte',
    emoji: '😙',
    mouthClass: 'w-14 h-14 rounded-full border-4 border-amber-500 bg-amber-50 transition-all duration-500 flex items-center justify-center text-4xl shadow-inner',
    desc: 'Whistle Lips, Tongue Forward / Rounded Front Vowel [y]',
    descClass: 'text-amber-600 font-bold',
  },
};

function playDemo(sound) {
  const text = SOUNDS[sound].demo;
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    window.speechSynthesis.speak(utterance);
  } else {
    alert(`Read this out loud: ${text}`);
  }
}

function simulateMouth(mode) {
  const mouth = document.getElementById('mouth-shape');
  const desc = document.getElementById('mouth-desc');
  const sound = SOUNDS[mode];

  if (sound) {
    mouth.innerText = sound.emoji;
    mouth.className = sound.mouthClass;
    desc.innerText = sound.desc;
    desc.className = sound.descClass;
  } else {
    mouth.innerText = '😐';
    mouth.className = 'w-24 h-24 rounded-full border-4 border-slate-400 bg-white transition-all duration-500 flex items-center justify-center text-4xl';
    desc.innerText = 'Neutral';
    desc.className = 'text-slate-500 font-bold';
  }
}

// ---------- Init ----------

newGhostRound();
newMeaningRound();
renderProgress('ghost');
renderProgress('meaning');
