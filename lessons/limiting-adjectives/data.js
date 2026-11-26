// Recognition questions cover all seven traditional categories.
const TYPE_QUESTIONS = [
  { sentence: 'Je préfère <strong>ce</strong> gâteau.', word: 'ce', answer: 'Demonstrative', options: ['Demonstrative', 'Possessive', 'Numerical', 'Indefinite'] },
  { sentence: '<strong>Quelle</strong> belle surprise !', word: 'Quelle', answer: 'Exclamative', options: ['Interrogative', 'Exclamative', 'Demonstrative', 'Relative'] },
  { sentence: '<strong>Plusieurs</strong> élèves arrivent.', word: 'Plusieurs', answer: 'Indefinite', options: ['Numerical', 'Indefinite', 'Possessive', 'Demonstrative'] },
  { sentence: '<strong>Quel</strong> bus prenez-vous ?', word: 'Quel', answer: 'Interrogative', options: ['Exclamative', 'Relative', 'Interrogative', 'Indefinite'] },
  { sentence: 'Elle achète <strong>deux</strong> oranges.', word: 'deux', answer: 'Numerical', options: ['Numerical', 'Demonstrative', 'Interrogative', 'Possessive'] },
  { sentence: '<strong>Notre</strong> professeur parle français.', word: 'Notre', answer: 'Possessive', options: ['Indefinite', 'Possessive', 'Relative', 'Exclamative'] },
  { sentence: 'Une copie du contrat, <strong>lequel</strong> contrat a été signé aujourd’hui, vous sera transmise.', word: 'lequel', answer: 'Relative', options: ['Relative', 'Interrogative', 'Demonstrative', 'Numerical'], note: 'Relative adjective is a traditional label for this rare, formal use before a noun.' },
  { sentence: '<strong>Cette</strong> rue est calme.', word: 'Cette', answer: 'Demonstrative', options: ['Possessive', 'Demonstrative', 'Indefinite', 'Numerical'] },
  { sentence: '<strong>Chaque</strong> enfant a un livre.', word: 'Chaque', answer: 'Indefinite', options: ['Interrogative', 'Indefinite', 'Exclamative', 'Numerical'] },
  { sentence: '<strong>Quels</strong> films regardes-tu ?', word: 'Quels', answer: 'Interrogative', options: ['Demonstrative', 'Exclamative', 'Interrogative', 'Possessive'] },
  { sentence: '<strong>Quel</strong> courage !', word: 'Quel', answer: 'Exclamative', options: ['Interrogative', 'Exclamative', 'Relative', 'Indefinite'] },
  { sentence: '<strong>Leurs</strong> enfants jouent dehors.', word: 'Leurs', answer: 'Possessive', options: ['Numerical', 'Indefinite', 'Possessive', 'Demonstrative'] },
  { sentence: 'Il reste <strong>quelques</strong> places.', word: 'quelques', answer: 'Indefinite', options: ['Indefinite', 'Numerical', 'Interrogative', 'Relative'] },
  { sentence: '<strong>Quels</strong> livres as-tu choisis ?', word: 'Quels', answer: 'Interrogative', options: ['Relative', 'Possessive', 'Interrogative', 'Exclamative'] },
];

const FORM_QUESTIONS = [
  { sentence: '______ maison est près du parc.', options: ['Cette', 'Cet', 'Ces'], answer: 'Cette', note: 'Maison is feminine singular, so use cette.' },
  { sentence: '______ amie arrive ce soir.', options: ['Mon', 'Ma', 'Mes'], answer: 'Mon', note: 'Before a feminine singular noun beginning with a vowel, use mon.' },
  { sentence: '______ livres sont à toi ?', options: ['Quel', 'Quelle', 'Quels'], answer: 'Quels', note: 'Quels agrees with the masculine plural noun livres.' },
  { sentence: '______ heure est-il ?', options: ['Quel', 'Quelle', 'Quels'], answer: 'Quelle', note: 'Heure is feminine singular, so quelle agrees with it.' },
  { sentence: 'Nous avons ______ cousins à Lyon.', options: ['trois', 'troisième', 'troisièmes'], answer: 'trois', note: 'Trois is the cardinal number for counting cousins.' },
  { sentence: '______ personne peut participer.', options: ['Chaque', 'Chacun', 'Chacune'], answer: 'Chaque', note: 'Chaque comes before a singular noun.' },
  { sentence: '______ voiture est garée dehors.', options: ['Notre', 'Nos', 'Leurs'], answer: 'Notre', note: 'Notre goes with the singular noun voiture.' },
  { sentence: '______ beaux enfants !', options: ['Quels', 'Quelles', 'Quel'], answer: 'Quels', note: 'Quel is exclamative here. It agrees with masculine plural enfants.' },
  { sentence: 'Une copie du contrat, ______ contrat a été signé hier, vous sera transmise.', options: ['lequel', 'laquelle', 'lesquels'], answer: 'lequel', note: 'Lequel agrees with the masculine singular noun contrat. This relative use is rare and formal.' },
  { sentence: '______ fleurs veux-tu acheter ?', options: ['Quel', 'Quelle', 'Quelles'], answer: 'Quelles', note: 'Quelles agrees with feminine plural fleurs.' },
  { sentence: '______ chaussures sont neuves.', options: ['Ces', 'Ce', 'Cet'], answer: 'Ces', note: 'Ces is the demonstrative form for plural nouns.' },
  { sentence: 'Il y a ______ solutions possibles.', options: ['plusieurs', 'plusieur', 'plusieure'], answer: 'plusieurs', note: 'Plusieurs means several and is invariable.' },
  { sentence: '______ frère et moi, nous partons demain.', options: ['Mon', 'Ma', 'Mes'], answer: 'Mon', note: 'Mon agrees with the masculine singular noun frère.' },
  { sentence: '______ étudiante pose une question.', options: ['Cette', 'Ce', 'Cet'], answer: 'Cette', note: 'Étudiante is feminine singular, so use cette.' },
];
