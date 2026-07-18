// Accent aigu lesson: é vs è direction quiz with localStorage progress.

const STORAGE_KEY = 'aigu-progress';
const ROUND_SIZE = 6;

// ---------- Progress storage ----------

function defaultProgress() {
  return { direction: { best: null, last: null, rounds: 0 } };
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

function recordRound(correct, total) {
  const progress = loadProgress();
  const pct = Math.round((correct / total) * 100);
  const entry = progress.direction;
  entry.last = pct;
  entry.best = entry.best === null ? pct : Math.max(entry.best, pct);
  entry.rounds += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  renderProgress();
}

function renderProgress() {
  const entry = loadProgress().direction;
  const el = document.getElementById('progress-direction');
  if (entry.rounds === 0) {
    el.innerText = 'No rounds completed yet.';
  } else {
    el.innerText = `Last: ${entry.last}% • Best: ${entry.best}% • Rounds played: ${entry.rounds}`;
  }
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  renderProgress();
}

// ---------- Quiz ----------

let roundState = { items: [], answered: {}, correct: 0 };

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

function playWord(i) {
  speak(roundState.items[i].word);
}

function newDirectionRound() {
  roundState = { items: sample(DIRECTION_WORDS, ROUND_SIZE), answered: {}, correct: 0 };
  document.getElementById('round-done-direction').classList.add('hidden');
  const container = document.getElementById('direction-questions');
  container.innerHTML = '';
  roundState.items.forEach((item, i) => {
    const block = document.createElement('div');
    block.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    block.innerHTML = `
      <div class="flex justify-between items-center">
        <p class="font-medium text-slate-800">${i + 1}. <span class="text-2xl font-bold text-indigo-600 font-mono">${item.display}</span> <span class="text-xs text-slate-400">(${item.gloss})</span></p>
        <button onclick="playWord(${i})" class="text-sm bg-slate-200 hover:bg-indigo-100 hover:text-indigo-700 px-3 py-1.5 rounded font-medium transition">🔊 Hear it</button>
      </div>
      <div class="flex gap-4">
        <button onclick="checkDirection(${i}, 'é')" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">
          é <span class="text-xs text-slate-400 block">aigu — "ay" ↗</span>
        </button>
        <button onclick="checkDirection(${i}, 'è')" class="bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">
          è <span class="text-xs text-slate-400 block">grave — "air" ↘</span>
        </button>
      </div>
      <p id="direction-feedback-${i}" class="text-sm font-medium hidden"></p>`;
    container.appendChild(block);
  });
}

function checkDirection(i, choice) {
  const item = roundState.items[i];
  const feedback = document.getElementById(`direction-feedback-${i}`);
  feedback.classList.remove('hidden');

  const firstTry = !(i in roundState.answered);
  if (choice === item.answer) {
    if (firstTry) {
      roundState.answered[i] = true;
      roundState.correct += 1;
    }
    feedback.innerText = `✅ Correct! ${item.word} — ${item.answer} sounds like "${item.answer === 'é' ? 'ay' : 'air'}".`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
  } else {
    if (firstTry) roundState.answered[i] = false;
    feedback.innerText = '❌ Not quite. Aigu ↗ rises to a closed "ay"; grave ↘ falls to an open "air". Hit 🔊 and listen again.';
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }

  if (Object.keys(roundState.answered).length === roundState.items.length) {
    recordRound(roundState.correct, roundState.items.length);
    const banner = document.getElementById('round-done-direction');
    banner.innerText = `🏁 Round complete: ${roundState.correct}/${roundState.items.length} correct on first try. Hit "New Round" to play again!`;
    banner.classList.remove('hidden');
  }
}

// ---------- Init ----------

newDirectionRound();
renderProgress();
