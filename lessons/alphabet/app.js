// Renders the letter grid from data.js and speaks letters via fr-FR TTS.

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  } else {
    alert(`Read this out loud: ${text}`);
  }
}

function playLetter(i) {
  speak(LETTERS[i].letter);
}

function playAll() {
  speak(LETTERS.map((l) => l.letter).join(', '));
}

function renderLetters() {
  const container = document.getElementById('letter-grid');
  LETTERS.forEach((l, i) => {
    const card = document.createElement('div');
    card.className = 'p-4 border border-slate-100 rounded-lg bg-slate-50 space-y-2 text-center';
    card.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="text-3xl font-extrabold text-indigo-600">${l.letter}</span>
        <span class="text-xs font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">${l.ipa}</span>
      </div>
      <p class="text-lg font-semibold text-slate-800 text-left">${l.name}</p>
      <p class="text-xs text-slate-500 text-left">${l.hint}</p>
      <button onclick="playLetter(${i})" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-3 rounded text-sm font-medium transition">🔊 Listen</button>`;
    container.appendChild(card);
  });
}

renderLetters();
