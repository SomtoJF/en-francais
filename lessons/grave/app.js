// Accent grave lesson: homograph quiz + è vs é direction quiz with localStorage progress.

const STORAGE_KEY = 'grave-progress';
const ROUND_SIZE = { homograph: 5, direction: 6 };

// ---------- Progress storage ----------

function defaultProgress() {
  return {
    homograph: { best: null, last: null, rounds: 0 },
    direction: { best: null, last: null, rounds: 0 },
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
  renderProgress('homograph');
  renderProgress('direction');
}

// ---------- Tabs ----------

function switchTab(tabId) {
  ['homograph', 'direction'].forEach((t) => {
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
  homograph: { items: [], answered: {}, correct: 0 },
  direction: { items: [], answered: {}, correct: 0 },
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

function maybeFinishRound(quiz) {
  const state = roundState[quiz];
  if (Object.keys(state.answered).length === state.items.length) {
    recordRound(quiz, state.correct, state.items.length);
    const banner = document.getElementById(`round-done-${quiz}`);
    banner.innerText = `🏁 Round complete: ${state.correct}/${state.items.length} correct on first try. Hit "New Round" to play again!`;
    banner.classList.remove('hidden');
  }
}

// ---------- Homograph quiz (a/à, ou/où, la/là) ----------

function newHomographRound() {
  roundState.homograph = { items: sample(HOMOGRAPH_QUESTIONS, ROUND_SIZE.homograph), answered: {}, correct: 0 };
  document.getElementById('round-done-homograph').classList.add('hidden');
  const container = document.getElementById('homograph-questions');
  container.innerHTML = '';
  roundState.homograph.items.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const sentence = q.sentence.replace('______', '<span class="bg-yellow-100 px-1 font-mono">______</span>');
    const buttons = q.options
      .map(
        (opt, j) => `
        <button onclick="checkHomograph(${i}, ${j})" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">
          ${opt.word} <span class="text-xs text-slate-400 block">(${opt.gloss})</span>
        </button>`
      )
      .join('');
    block.innerHTML = `
      <p class="font-medium text-slate-800">${i + 1}. ${sentence}</p>
      <div class="flex gap-4">${buttons}</div>
      <p id="homograph-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(block);
  });
}

function checkHomograph(i, j) {
  const state = roundState.homograph;
  const opt = state.items[i].options[j];
  const feedback = document.getElementById(`homograph-feedback-${i}`);
  feedback.classList.remove('hidden');

  const firstTry = !(i in state.answered);
  if (opt.correct) {
    if (firstTry) {
      state.answered[i] = true;
      state.correct += 1;
    }
    feedback.innerText = `✅ Correct! "${opt.word}" fits — same sound either way, but only this spelling has the right meaning.`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
  } else {
    if (firstTry) state.answered[i] = false;
    feedback.innerText = '❌ Oops! Remember: the sound is identical — ask which MEANING the sentence needs.';
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }
  maybeFinishRound('homograph');
}

// ---------- Direction quiz (è vs é) ----------

function playWord(i) {
  speak(roundState.direction.items[i].word);
}

function newDirectionRound() {
  roundState.direction = { items: sample(DIRECTION_WORDS, ROUND_SIZE.direction), answered: {}, correct: 0 };
  document.getElementById('round-done-direction').classList.add('hidden');
  const container = document.getElementById('direction-questions');
  container.innerHTML = '';
  roundState.direction.items.forEach((item, i) => {
    const block = document.createElement('div');
    block.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    block.innerHTML = `
      <div class="flex justify-between items-center">
        <p class="font-medium text-slate-800">${i + 1}. <span class="text-2xl font-bold text-indigo-600 font-mono">${item.display}</span> <span class="text-xs text-slate-400">(${item.gloss})</span></p>
        <button onclick="playWord(${i})" class="text-sm bg-slate-200 hover:bg-indigo-100 hover:text-indigo-700 px-3 py-1.5 rounded font-medium transition">🔊 Hear it</button>
      </div>
      <div class="flex gap-4">
        <button onclick="checkDirection(${i}, 'è')" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">
          è <span class="text-xs text-slate-400 block">grave — "air" ↘</span>
        </button>
        <button onclick="checkDirection(${i}, 'é')" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">
          é <span class="text-xs text-slate-400 block">aigu — "ay" ↗</span>
        </button>
      </div>
      <p id="direction-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(block);
  });
}

function checkDirection(i, choice) {
  const state = roundState.direction;
  const item = state.items[i];
  const feedback = document.getElementById(`direction-feedback-${i}`);
  feedback.classList.remove('hidden');

  const firstTry = !(i in state.answered);
  if (choice === item.answer) {
    if (firstTry) {
      state.answered[i] = true;
      state.correct += 1;
    }
    feedback.innerText = `✅ Correct! ${item.word} — ${item.answer} sounds like "${item.answer === 'è' ? 'air' : 'ay'}".`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
  } else {
    if (firstTry) state.answered[i] = false;
    feedback.innerText = '❌ Not quite. Grave ↘ falls to an open "air"; aigu ↗ rises to a closed "ay". Hit 🔊 and listen again.';
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }
  maybeFinishRound('direction');
}

// ---------- Init ----------

newHomographRound();
newDirectionRound();
renderProgress('homograph');
renderProgress('direction');
