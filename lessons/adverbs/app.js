const STORAGE_KEY = 'adverbs-progress';
const USAGE_STORAGE_KEY = 'adverbs-usage-progress';
const ROUND_SIZE = 6;
let roundState = { items: [], answered: {}, correct: 0, recorded: false };
let usageRoundState = { items: [], answered: {}, correct: 0, recorded: false };

function speakFrench(text) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function speakButton(text, label = `Hear ${text}`) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'ml-1 text-indigo-700 hover:text-indigo-900';
  button.textContent = '🔊';
  button.setAttribute('aria-label', label);
  button.onclick = () => speakFrench(text);
  return button;
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { best: null, last: null, rounds: 0 };
  } catch { return { best: null, last: null, rounds: 0 }; }
}

function renderProgress() {
  const p = loadProgress();
  document.getElementById('progress-quiz').innerText = p.rounds
    ? `Last: ${p.last}% • Best: ${p.best}% • Rounds played: ${p.rounds}`
    : 'No rounds completed yet.';
}

function recordRound() {
  if (roundState.recorded) return;
  roundState.recorded = true;
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
  localStorage.removeItem(USAGE_STORAGE_KEY);
  renderProgress();
  renderUsageProgress();
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
  ['categories', 'usage'].forEach((id) => {
    const active = id === tab;
    document.getElementById(`section-${id}`).classList.toggle('hidden', !active);
    const button = document.getElementById(`tab-${id}`);
    button.classList.toggle('border-indigo-600', active);
    button.classList.toggle('text-indigo-600', active);
    button.classList.toggle('border-transparent', !active);
    button.classList.toggle('text-slate-500', !active);
  });
}

function loadUsageProgress() {
  try { return JSON.parse(localStorage.getItem(USAGE_STORAGE_KEY)) || { best: null, last: null, rounds: 0 }; }
  catch { return { best: null, last: null, rounds: 0 }; }
}

function renderUsageProgress() {
  const p = loadUsageProgress();
  document.getElementById('progress-usage').innerText = p.rounds
    ? `Last: ${p.last}% • Best: ${p.best}% • Rounds played: ${p.rounds}`
    : 'No rounds completed yet.';
}

function newUsageRound() {
  const englishToFrench = ADVERB_USAGE_QUESTIONS.filter((question) => question.direction === 'en-fr');
  const frenchToEnglish = ADVERB_USAGE_QUESTIONS.filter((question) => question.direction === 'fr-en');
  usageRoundState = {
    items: [...sample(englishToFrench, 3), ...sample(frenchToEnglish, 3)],
    answered: {}, correct: 0, recorded: false,
  };
  document.getElementById('round-done-usage').classList.add('hidden');
  const container = document.getElementById('usage-questions');
  container.innerHTML = '';
  usageRoundState.items.forEach((question, i) => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const prompt = document.createElement('p');
    prompt.className = 'font-medium text-slate-800';
    prompt.textContent = `${i + 1}. ${question.direction === 'en-fr' ? 'Translate into French' : 'Translate into English'}: ${question.prompt}`;
    if (question.direction === 'fr-en') {
      prompt.appendChild(speakButton(question.prompt));
    }
    card.appendChild(prompt);
    const choices = document.createElement('div');
    choices.className = 'flex flex-wrap gap-2';
    question.options.forEach((option, j) => {
      const answer = document.createElement('button');
      answer.type = 'button'; answer.className = 'bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-3 py-2 rounded text-sm font-medium';
      answer.textContent = option;
      answer.onclick = () => checkUsageAnswer(i, j);
      choices.appendChild(answer);
      if (question.direction === 'en-fr') {
        choices.appendChild(speakButton(option));
      }
    });
    card.appendChild(choices);
    const feedback = document.createElement('p');
    feedback.id = `usage-feedback-${i}`; feedback.className = 'hidden text-sm font-medium';
    card.appendChild(feedback);
    container.appendChild(card);
  });
}

function checkUsageAnswer(i, choice) {
  const question = usageRoundState.items[i];
  const feedback = document.getElementById(`usage-feedback-${i}`);
  const firstTry = !(i in usageRoundState.answered);
  const correct = choice === question.answer;
  if (firstTry) {
    usageRoundState.answered[i] = correct;
    if (correct) usageRoundState.correct += 1;
  }
  feedback.className = `text-sm font-medium ${correct ? 'text-emerald-600' : 'text-red-600'}`;
  feedback.textContent = `${correct ? '✅ Correct. ' : '❌ Not quite. '}${question.note}`;
  if (Object.keys(usageRoundState.answered).length === usageRoundState.items.length && !usageRoundState.recorded) {
    usageRoundState.recorded = true;
    const p = loadUsageProgress();
    const score = Math.round(usageRoundState.correct / usageRoundState.items.length * 100);
    p.last = score; p.best = p.best === null ? score : Math.max(p.best, score); p.rounds += 1;
    localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(p));
    renderUsageProgress();
    const done = document.getElementById('round-done-usage');
    done.textContent = `🏁 Round complete: ${usageRoundState.correct}/${usageRoundState.items.length} correct on first try.`;
    done.classList.remove('hidden');
  }
}

function newRound() {
  roundState = { items: sample(ADVERB_QUESTIONS, ROUND_SIZE), answered: {}, correct: 0, recorded: false };
  document.getElementById('round-done-quiz').classList.add('hidden');
  const container = document.getElementById('quiz-questions');
  container.innerHTML = '';
  roundState.items.forEach((question, i) => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3';
    const prompt = document.createElement('p');
    prompt.className = 'font-medium text-slate-800';
    prompt.textContent = `${i + 1}. ${question.prompt}`;
    if (question.audioPrompt) prompt.appendChild(speakButton(question.audioPrompt));
    card.appendChild(prompt);
    const choices = document.createElement('div');
    choices.className = 'flex flex-wrap gap-2';
    question.options.forEach((option, j) => {
      const answer = document.createElement('button');
      answer.type = 'button'; answer.className = 'bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 px-3 py-2 rounded text-sm font-medium';
      answer.textContent = option; answer.onclick = () => checkAnswer(i, j);
      choices.append(answer, speakButton(option));
    });
    card.appendChild(choices);
    const feedback = document.createElement('p');
    feedback.id = `feedback-${i}`; feedback.className = 'text-sm font-medium hidden';
    card.appendChild(feedback);
    container.appendChild(card);
  });
}

function checkAnswer(i, choice) {
  const question = roundState.items[i];
  const feedback = document.getElementById(`feedback-${i}`);
  const firstTry = !(i in roundState.answered);
  feedback.classList.remove('hidden');

  if (choice === question.answer) {
    if (firstTry) { roundState.answered[i] = true; roundState.correct += 1; }
    feedback.innerText = `✅ Correct. ${question.note}`;
    feedback.className = 'text-sm font-medium text-emerald-600 mt-2';
  } else {
    if (firstTry) roundState.answered[i] = false;
    feedback.innerText = `❌ Not quite. ${question.note}`;
    feedback.className = 'text-sm font-medium text-red-600 mt-2';
  }

  if (Object.keys(roundState.answered).length === roundState.items.length) {
    recordRound();
    const banner = document.getElementById('round-done-quiz');
    banner.innerText = `🏁 Round complete: ${roundState.correct}/${roundState.items.length} correct on first try. Hit “New Round” to play again!`;
    banner.classList.remove('hidden');
  }
}

newRound();
renderProgress();
newUsageRound();
renderUsageProgress();
