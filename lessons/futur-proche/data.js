const TABS = [
  { id: 'build', label: 'Build it' },
  { id: 'order', label: 'Negation & pronouns' },
  { id: 'translate', label: 'Translate' },
];

const QUESTION_BANKS = {
  build: [
    { prompt: 'Je ___ partir.', options: ['vais', 'vas', 'va'], answer: 0, explanation: 'Je vais is the present tense of aller for je.' },
    { prompt: 'Tu ___ étudier ce soir.', options: ['vas', 'va', 'allez'], answer: 0, explanation: 'Tu takes vas.' },
    { prompt: 'Elle ___ prendre le bus.', options: ['va', 'vont', 'vais'], answer: 0, explanation: 'Elle takes va.' },
    { prompt: 'Nous ___ visiter Lyon.', options: ['allons', 'allez', 'vont'], answer: 0, explanation: 'Nous takes allons.' },
    { prompt: 'Vous ___ finir bientôt.', options: ['allez', 'allons', 'vas'], answer: 0, explanation: 'Vous takes allez.' },
    { prompt: 'Ils ___ jouer dehors.', options: ['vont', 'va', 'vont à'], answer: 0, explanation: 'Ils takes vont, followed directly by the infinitive jouer.' },
    { prompt: 'Nous allons ___ un film.', options: ['regarder', 'regardons', 'regardé'], answer: 0, explanation: 'The second verb stays in the infinitive: regarder.' },
    { prompt: 'Je vais ___ mes amis.', options: ['voir', 'vois', 'vu'], answer: 0, explanation: 'Use the infinitive after vais: voir.' },
  ],
  order: [
    { prompt: 'She is not going to leave.', options: ['Elle ne va pas partir.', 'Elle va ne pas partir.', 'Elle ne partir va pas.'], answer: 0, explanation: 'Ne and pas surround the conjugated aller: ne va pas + infinitive.' },
    { prompt: 'We are not going to eat here.', options: ['Nous n’allons pas manger ici.', 'Nous allons ne pas mangeons ici.', 'Nous ne mangerons pas ici.'], answer: 0, explanation: 'Negation surrounds allons; manger remains an infinitive.' },
    { prompt: 'I am going to do it.', options: ['Je vais le faire.', 'Je le vais faire.', 'Je vais faire le.'], answer: 0, explanation: 'The object pronoun goes directly before the infinitive: le faire.' },
    { prompt: 'He is going to call her.', options: ['Il va l’appeler.', 'Il la va appeler.', 'Il va appeler lui.'], answer: 0, explanation: 'La elides to l’ before appeler and sits before the infinitive.' },
    { prompt: 'Are you going to finish?', options: ['Est-ce que tu vas finir ?', 'Est-ce que tu va finis ?', 'Vas tu finir est-ce que ?'], answer: 0, explanation: 'Use vas with tu, then the infinitive finir.' },
    { prompt: 'They are going to buy some.', options: ['Ils vont en acheter.', 'Ils en vont acheter.', 'Ils vont acheter en.'], answer: 0, explanation: 'En goes directly before the infinitive acheter.' },
    { prompt: 'You are not going to tell it to him.', options: ['Tu ne vas pas le lui dire.', 'Tu ne lui vas pas le dire.', 'Tu vas ne pas lui le dire.'], answer: 0, explanation: 'Negation surrounds vas. Both pronouns go before dire, with COD le before COI lui.' },
    { prompt: 'She is going to arrive soon.', options: ['Elle va bientôt arriver.', 'Elle bientôt va arrive.', 'Elle va bientôt arrivée.'], answer: 0, explanation: 'The infinitive is arriver; bientôt can appear between aller and the infinitive.' },
  ],
  translate: [
    { prompt: 'I am going to read tonight.', options: ['Je vais lire ce soir.', 'Je lisais ce soir.', 'Je lirai hier soir.'], answer: 0, explanation: 'Futur proche is present aller + infinitive: vais lire.' },
    { prompt: 'They are going to see the doctor.', options: ['Ils vont voir le médecin.', 'Ils voient le médecin.', 'Ils vont vus le médecin.'], answer: 0, explanation: 'Vont is the present tense of aller for ils; voir remains infinitive.' },
    { prompt: 'We are going to choose a hotel.', options: ['Nous allons choisir un hôtel.', 'Nous allons choisissons un hôtel.', 'Nous choisirons allons un hôtel.'], answer: 0, explanation: 'The infinitive choisir follows allons.' },
    { prompt: 'She is going to send it to me.', options: ['Elle va me l’envoyer.', 'Elle va m’envoyé le.', 'Elle me va l’envoyer.'], answer: 0, explanation: 'Both pronouns sit before envoyer; me becomes m’ before l’envoyer.' },
    { prompt: 'I am not going to buy it.', options: ['Je ne vais pas l’acheter.', 'Je ne l’vais pas acheter.', 'Je vais ne pas l’achète.'], answer: 0, explanation: 'Ne … pas surrounds vais; l’ goes before infinitive acheter.' },
    { prompt: 'Are you going to come tomorrow?', options: ['Est-ce que vous allez venir demain ?', 'Est-ce que vous venez allez demain ?', 'Vous allez venu demain ?'], answer: 0, explanation: 'Allez is followed by infinitive venir.' },
  ],
};
