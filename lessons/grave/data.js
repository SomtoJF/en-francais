// Exercise bank for the accent grave lesson.

// Homograph quiz: à/ù sound identical to a/u — the accent only separates meanings.
const HOMOGRAPH_QUESTIONS = [
  {
    sentence: 'Il ______ un chien.',
    options: [
      { word: 'a', gloss: 'has (verb avoir)', correct: true },
      { word: 'à', gloss: 'to/at', correct: false },
    ],
  },
  {
    sentence: 'Je vais ______ Paris demain.',
    options: [
      { word: 'a', gloss: 'has (verb avoir)', correct: false },
      { word: 'à', gloss: 'to/at', correct: true },
    ],
  },
  {
    sentence: 'Il y ______ trois pommes sur la table.',
    options: [
      { word: 'a', gloss: 'has (verb avoir)', correct: true },
      { word: 'à', gloss: 'to/at', correct: false },
    ],
  },
  {
    sentence: 'Tu veux du thé ______ du café ?',
    options: [
      { word: 'ou', gloss: 'or', correct: true },
      { word: 'où', gloss: 'where', correct: false },
    ],
  },
  {
    sentence: '______ habites-tu ?',
    options: [
      { word: 'ou', gloss: 'or', correct: false },
      { word: 'où', gloss: 'where', correct: true },
    ],
  },
  {
    sentence: "C'est la ville ______ je suis né.",
    options: [
      { word: 'ou', gloss: 'or', correct: false },
      { word: 'où', gloss: 'where', correct: true },
    ],
  },
  {
    sentence: '______ voiture est rouge.',
    options: [
      { word: 'La', gloss: 'the (article)', correct: true },
      { word: 'Là', gloss: 'there', correct: false },
    ],
  },
  {
    sentence: 'Pose le sac ______, près de la porte.',
    options: [
      { word: 'la', gloss: 'the (article)', correct: false },
      { word: 'là', gloss: 'there', correct: true },
    ],
  },
  {
    sentence: "C'est ______ que j'habite.",
    options: [
      { word: 'la', gloss: 'the (article)', correct: false },
      { word: 'là', gloss: 'there', correct: true },
    ],
  },
];

// Direction quiz: è (grave, "air") vs é (aigu, "ay") — pick the right accent.
const DIRECTION_WORDS = [
  { display: 'm_re', word: 'mère', answer: 'è', gloss: 'mother' },
  { display: 'p_re', word: 'père', answer: 'è', gloss: 'father' },
  { display: 'fr_re', word: 'frère', answer: 'è', gloss: 'brother' },
  { display: 'tr_s', word: 'très', answer: 'è', gloss: 'very' },
  { display: 'cr_me', word: 'crème', answer: 'è', gloss: 'cream' },
  { display: 'pr_s', word: 'près', answer: 'è', gloss: 'near' },
  { display: 'apr_s', word: 'après', answer: 'è', gloss: 'after' },
  { display: 'succ_s', word: 'succès', answer: 'è', gloss: 'success' },
  { display: 'caf_', word: 'café', answer: 'é', gloss: 'coffee' },
  { display: 'v_lo', word: 'vélo', answer: 'é', gloss: 'bicycle' },
  { display: '_cole', word: 'école', answer: 'é', gloss: 'school' },
  { display: 'th_', word: 'thé', answer: 'é', gloss: 'tea' },
  { display: 'march_', word: 'marché', answer: 'é', gloss: 'market' },
  { display: 'cin_ma', word: 'cinéma', answer: 'é', gloss: 'cinema' },
];
