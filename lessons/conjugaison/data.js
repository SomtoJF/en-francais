// Exercise bank for the verb conjugation lesson (ER / IR / RE + irregular IR).

// MC quiz: pick the correctly conjugated present-tense form.
const MC_QUESTIONS = [
  { pronoun: 'Je', infinitive: 'parler', gloss: 'to speak', answer: 'parle', distractors: ['parles', 'parlons', 'parlez'] },
  { pronoun: 'Tu', infinitive: 'aimer', gloss: 'to like/love', answer: 'aimes', distractors: ['aime', 'aiment', 'aimez'] },
  { pronoun: 'Elle', infinitive: 'regarder', gloss: 'to watch', answer: 'regarde', distractors: ['regardes', 'regardent', 'regardez'] },
  { pronoun: 'Nous', infinitive: 'écouter', gloss: 'to listen', answer: 'écoutons', distractors: ['écoutez', 'écoutent', 'écoute'] },
  { pronoun: 'Vous', infinitive: 'travailler', gloss: 'to work', answer: 'travaillez', distractors: ['travaillons', 'travaillent', 'travailles'] },
  { pronoun: 'Ils', infinitive: 'jouer', gloss: 'to play', answer: 'jouent', distractors: ['jouont', 'jouez', 'joue'] },
  { pronoun: 'Je', infinitive: 'finir', gloss: 'to finish', answer: 'finis', distractors: ['finit', 'finie', 'finisse'] },
  { pronoun: 'Tu', infinitive: 'choisir', gloss: 'to choose', answer: 'choisis', distractors: ['choisit', 'choisez', 'choise'] },
  { pronoun: 'Il', infinitive: 'réussir', gloss: 'to succeed', answer: 'réussit', distractors: ['réussis', 'réussient', 'réusse'] },
  { pronoun: 'Nous', infinitive: 'finir', gloss: 'to finish', answer: 'finissons', distractors: ['finons', 'finissez', 'finirons'] },
  { pronoun: 'Vous', infinitive: 'grandir', gloss: 'to grow', answer: 'grandissez', distractors: ['grandez', 'grandissons', 'grandissent'] },
  { pronoun: 'Elles', infinitive: 'remplir', gloss: 'to fill', answer: 'remplissent', distractors: ['remplent', 'remplissez', 'remplit'] },
  { pronoun: 'Je', infinitive: 'vendre', gloss: 'to sell', answer: 'vends', distractors: ['vend', 'vende', 'vendons'] },
  { pronoun: 'Il', infinitive: 'attendre', gloss: 'to wait', answer: 'attend', distractors: ['attends', 'attende', 'attendt'] },
  { pronoun: 'Nous', infinitive: 'perdre', gloss: 'to lose', answer: 'perdons', distractors: ['perdissons', 'perdez', 'perdent'] },
  { pronoun: 'Vous', infinitive: 'répondre', gloss: 'to answer', answer: 'répondez', distractors: ['répondissez', 'répondons', 'réponds'] },
  { pronoun: 'Ils', infinitive: 'entendre', gloss: 'to hear', answer: 'entendent', distractors: ['entendissent', 'entendont', 'entend'] },
  { pronoun: 'Tu', infinitive: 'rendre', gloss: 'to give back', answer: 'rends', distractors: ['rend', 'rendes', 'rendis'] },
];

// Type quiz: type the conjugated present-tense form yourself.
const TYPE_QUESTIONS = [
  { pronoun: 'je', infinitive: 'chanter', gloss: 'to sing', group: 'ER', answer: 'chante' },
  { pronoun: 'tu', infinitive: 'parler', gloss: 'to speak', group: 'ER', answer: 'parles' },
  { pronoun: 'elle', infinitive: 'jouer', gloss: 'to play', group: 'ER', answer: 'joue' },
  { pronoun: 'nous', infinitive: 'aimer', gloss: 'to like/love', group: 'ER', answer: 'aimons' },
  { pronoun: 'vous', infinitive: 'regarder', gloss: 'to watch', group: 'ER', answer: 'regardez' },
  { pronoun: 'ils', infinitive: 'travailler', gloss: 'to work', group: 'ER', answer: 'travaillent' },
  { pronoun: 'je', infinitive: 'choisir', gloss: 'to choose', group: 'IR', answer: 'choisis' },
  { pronoun: 'tu', infinitive: 'finir', gloss: 'to finish', group: 'IR', answer: 'finis' },
  { pronoun: 'il', infinitive: 'grandir', gloss: 'to grow', group: 'IR', answer: 'grandit' },
  { pronoun: 'nous', infinitive: 'réussir', gloss: 'to succeed', group: 'IR', answer: 'réussissons' },
  { pronoun: 'vous', infinitive: 'finir', gloss: 'to finish', group: 'IR', answer: 'finissez' },
  { pronoun: 'elles', infinitive: 'choisir', gloss: 'to choose', group: 'IR', answer: 'choisissent' },
  { pronoun: 'je', infinitive: 'attendre', gloss: 'to wait', group: 'RE', answer: 'attends' },
  { pronoun: 'tu', infinitive: 'vendre', gloss: 'to sell', group: 'RE', answer: 'vends' },
  { pronoun: 'il', infinitive: 'répondre', gloss: 'to answer', group: 'RE', answer: 'répond' },
  { pronoun: 'nous', infinitive: 'entendre', gloss: 'to hear', group: 'RE', answer: 'entendons' },
  { pronoun: 'vous', infinitive: 'perdre', gloss: 'to lose', group: 'RE', answer: 'perdez' },
  { pronoun: 'ils', infinitive: 'rendre', gloss: 'to give back', group: 'RE', answer: 'rendent' },
];

// Irregular IR quiz: dormir family (drop the stem's last consonant in the singular),
// venir/tenir (stem change + -iennent), ouvrir family (conjugates like an ER verb).
const IRREGULAR_QUESTIONS = [
  { pronoun: 'Je', infinitive: 'dormir', gloss: 'to sleep', answer: 'dors', distractors: ['dormis', 'dorme', 'dormit'], note: 'Dormir family: singular drops the M — dor·s, dor·s, dor·t. Plural keeps it: dormons, dormez, dorment.' },
  { pronoun: 'Il', infinitive: 'dormir', gloss: 'to sleep', answer: 'dort', distractors: ['dormit', 'dors', 'dorme'], note: 'Singular = short stem "dor-" + s/s/t.' },
  { pronoun: 'Nous', infinitive: 'dormir', gloss: 'to sleep', answer: 'dormons', distractors: ['dormissons', 'dorons', 'dormez'], note: 'Plural keeps the full stem "dorm-" — and NO -iss- (that\'s only for finir-type verbs).' },
  { pronoun: 'Tu', infinitive: 'partir', gloss: 'to leave', answer: 'pars', distractors: ['partis', 'part', 'parte'], note: 'Partir family: singular drops the T — par·s, par·s, par·t.' },
  { pronoun: 'Elle', infinitive: 'partir', gloss: 'to leave', answer: 'part', distractors: ['pars', 'partit', 'parte'], note: 'Third-person singular: short stem "par-" + t.' },
  { pronoun: 'Ils', infinitive: 'partir', gloss: 'to leave', answer: 'partent', distractors: ['partissent', 'parent', 'partont'], note: 'Plural keeps the full stem "part-": partons, partez, partent.' },
  { pronoun: 'Je', infinitive: 'sortir', gloss: 'to go out', answer: 'sors', distractors: ['sortis', 'sorte', 'sort'], note: 'Sortir works like partir: sor·s, sor·s, sor·t / sortons, sortez, sortent.' },
  { pronoun: 'Vous', infinitive: 'sortir', gloss: 'to go out', answer: 'sortez', distractors: ['sortissez', 'sorez', 'sortiez'], note: 'Plural keeps the full stem "sort-".' },
  { pronoun: 'Tu', infinitive: 'sentir', gloss: 'to feel/smell', answer: 'sens', distractors: ['sentis', 'sent', 'sente'], note: 'Sentir: singular drops the T — sen·s, sen·s, sen·t.' },
  { pronoun: 'Il', infinitive: 'servir', gloss: 'to serve', answer: 'sert', distractors: ['servit', 'serve', 'sers'], note: 'Servir: singular drops the V — ser·s, ser·s, ser·t / servons, servez, servent.' },
  { pronoun: 'Je', infinitive: 'venir', gloss: 'to come', answer: 'viens', distractors: ['venis', 'vens', 'vienne'], note: 'Venir changes its stem: vien·s, vien·s, vien·t — but nous venons, vous venez, ils viennent.' },
  { pronoun: 'Ils', infinitive: 'venir', gloss: 'to come', answer: 'viennent', distractors: ['venissent', 'venient', 'vienent'], note: 'Third-person plural doubles the N: viennent.' },
  { pronoun: 'Nous', infinitive: 'venir', gloss: 'to come', answer: 'venons', distractors: ['vienons', 'venissons', 'viennons'], note: 'Nous/vous go back to the plain stem: venons, venez.' },
  { pronoun: 'Tu', infinitive: 'tenir', gloss: 'to hold', answer: 'tiens', distractors: ['tenis', 'tens', 'tient'], note: 'Tenir mirrors venir: tien·s, tien·s, tien·t / tenons, tenez, tiennent.' },
  { pronoun: "J'", infinitive: 'ouvrir', gloss: 'to open', answer: 'ouvre', distractors: ['ouvris', 'ouvrit', 'ouvres'], note: 'Ouvrir looks like an IR verb but conjugates like an ER verb: ouvre, ouvres, ouvre, ouvrons, ouvrez, ouvrent.' },
  { pronoun: 'Tu', infinitive: 'offrir', gloss: 'to offer', answer: 'offres', distractors: ['offris', 'offrit', 'offre'], note: 'Offrir behaves like ouvrir — ER endings on an -IR verb: offres, not offris.' },
];
