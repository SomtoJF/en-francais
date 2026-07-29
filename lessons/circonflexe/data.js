// Exercise bank for the accent circonflexe lesson.

const GHOST_WORDS = [
  { fr: 'la forêt', syllables: 'for-ê-t', hint: "Add 's' after 'ê' → fores...", answers: ['forest'] },
  { fr: "l'hôpital", syllables: 'hô-pi-tal', hint: "Add 's' after 'ô' → hospi...", answers: ['hospital'] },
  { fr: 'la fête', syllables: 'fê-te', hint: "Add 's' after 'ê' → fes... (think celebrations)", answers: ['feast', 'festival'] },
  { fr: 'le château', syllables: 'châ-teau', hint: "Add 's' after 'â' → chas... (think old fortresses)", answers: ['castle'] },
  { fr: "l'île", syllables: 'î-le', hint: "Add 's' after 'î' → is... (land surrounded by water)", answers: ['isle', 'island'] },
  { fr: 'la pâte', syllables: 'pâ-te', hint: "Add 's' after 'â' → pas... (dough / sticky mix)", answers: ['paste', 'pasta'] },
  { fr: 'la côte', syllables: 'cô-te', hint: "Add 's' after 'ô' → cos... (where land meets sea)", answers: ['coast'] },
  { fr: 'la bête', syllables: 'bê-te', hint: "Add 's' after 'ê' → bes... (an animal)", answers: ['beast'] },
  { fr: 'la hâte', syllables: 'hâ-te', hint: "Add 's' after 'â' → has... (being in a hurry)", answers: ['haste'] },
  { fr: 'la croûte', syllables: 'croû-te', hint: "Add 's' after 'û' → crus... (outside of bread)", answers: ['crust'] },
  { fr: "l'arrêt", syllables: 'ar-rê-t', hint: "Add 's' after 'ê' → arres... (police stop someone)", answers: ['arrest'] },
  { fr: 'la tempête', syllables: 'tem-pê-te', hint: "Add 's' after 'ê' → tempes... (violent weather)", answers: ['tempest'] },
  { fr: 'honnête', syllables: 'hon-nê-te', hint: "Add 's' after 'ê' → hones... (truthful)", answers: ['honest'] },
  { fr: "l'intérêt", syllables: 'in-té-rê-t', hint: "Add 's' after 'ê' → interes...", answers: ['interest'] },
  { fr: 'le maître', syllables: 'maî-tre', hint: "Add 's' after 'î' → mas... (the boss/teacher)", answers: ['master'] },
  { fr: 'la conquête', syllables: 'con-quê-te', hint: "Add 's' after 'ê' → conques... (taking territory)", answers: ['conquest'] },
  { fr: "l'hôte", syllables: 'hô-te', hint: "Add 's' after 'ô' → hos... (welcomes guests)", answers: ['host'] },
  { fr: 'le goût', syllables: 'goû-t', hint: "Add 's' after 'û' → gus... (flavour, think 'gusto')", answers: ['gusto', 'gust'] },
];

const MEANING_QUESTIONS = [
  {
    sentence: 'Je pose mon sac ______ la table.',
    translation: 'I put my bag ______ the table.',
    options: [
      { word: 'sur', gloss: 'on/above', correct: true },
      { word: 'sûr', gloss: 'sure/certain', correct: false },
    ],
  },
  {
    sentence: "Es-tu absolument ______ de l'heure du départ ?",
    translation: 'Are you absolutely ______ of the departure time?',
    options: [
      { word: 'sur', gloss: 'on/above', correct: false },
      { word: 'sûr', gloss: 'sure/certain', correct: true },
    ],
  },
  {
    sentence: 'Les pêches sont très sucrées car elles sont bien ______.',
    translation: 'The peaches are very sweet because they are nice and ______.',
    options: [
      { word: 'murs', gloss: 'walls', correct: false },
      { word: 'mûrs', gloss: 'ripe/mature', correct: true },
    ],
  },
  {
    sentence: 'Les ______ de la maison sont peints en blanc.',
    translation: 'The ______ of the house are painted white.',
    options: [
      { word: 'murs', gloss: 'walls', correct: true },
      { word: 'mûrs', gloss: 'ripe/mature', correct: false },
    ],
  },
  {
    sentence: "Je bois un verre ______ vin rouge.",
    translation: 'I drink a glass ______ red wine.',
    options: [
      { word: 'du', gloss: 'some/of the', correct: true },
      { word: 'dû', gloss: 'owed/had to', correct: false },
    ],
  },
  {
    sentence: "Il a ______ partir avant la fin du film.",
    translation: 'He ______ leave before the end of the movie.',
    options: [
      { word: 'du', gloss: 'some/of the', correct: false },
      { word: 'dû', gloss: 'owed/had to', correct: true },
    ],
  },
  {
    sentence: 'Il y a une ______ de café sur ta chemise.',
    translation: 'There is a coffee ______ on your shirt.',
    options: [
      { word: 'tache', gloss: 'stain/spot', correct: true },
      { word: 'tâche', gloss: 'task/chore', correct: false },
    ],
  },
  {
    sentence: "Ma ______ principale aujourd'hui est de ranger le bureau.",
    translation: 'My main ______ today is to tidy the desk.',
    options: [
      { word: 'tache', gloss: 'stain/spot', correct: false },
      { word: 'tâche', gloss: 'task/chore', correct: true },
    ],
  },
  {
    sentence: 'Cette ______ femme apprend le piano.',
    translation: 'This ______ woman is learning the piano.',
    options: [
      { word: 'jeune', gloss: 'young', correct: true },
      { word: 'jeûne', gloss: 'fast (no food)', correct: false },
    ],
  },
  {
    sentence: 'Pendant le ramadan, le ______ dure du lever au coucher du soleil.',
    translation: 'During Ramadan, the ______ lasts from sunrise to sunset.',
    options: [
      { word: 'jeune', gloss: 'young', correct: false },
      { word: 'jeûne', gloss: 'fast (no food)', correct: true },
    ],
  },
];
