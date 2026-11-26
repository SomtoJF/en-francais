const TABS = [
  { id: 'build', label: 'Build it' },
  { id: 'past', label: 'Earlier past' },
  { id: 'translate', label: 'Translate' },
];

const QUESTION_BANKS = {
  build: [
    { prompt: 'Je ___ de rentrer.', options: ['viens', 'vient', 'venons'], answer: 0, explanation: 'Je takes viens.' },
    { prompt: 'Tu ___ de déjeuner.', options: ['viens', 'vient', 'venez'], answer: 0, explanation: 'Tu takes viens.' },
    { prompt: 'Elle ___ de téléphoner.', options: ['vient', 'viens', 'viennent'], answer: 0, explanation: 'Elle takes vient.' },
    { prompt: 'Nous ___ de commencer.', options: ['venons', 'venez', 'viennent'], answer: 0, explanation: 'Nous takes venons.' },
    { prompt: 'Vous ___ de recevoir un message.', options: ['venez', 'venons', 'vient'], answer: 0, explanation: 'Vous takes venez.' },
    { prompt: 'Ils ___ de partir.', options: ['viennent', 'venez', 'vient'], answer: 0, explanation: 'Ils takes viennent.' },
    { prompt: 'Il vient ___ arriver.', options: ['d’', 'de', 'à'], answer: 0, explanation: 'Use d’ before arriver, which begins with a vowel sound.' },
    { prompt: 'Nous venons de ___.', options: ['finir', 'finissons', 'fini'], answer: 0, explanation: 'The action verb stays in the infinitive: finir.' },
  ],
  past: [
    { prompt: 'She had just left when I called.', options: ['Elle venait de partir quand j’ai appelé.', 'Elle vient de partir quand j’appelle.', 'Elle était de partir quand j’ai appelé.'], answer: 0, explanation: 'Imperfect venait de + infinitive gives the recent-past action from a past viewpoint.' },
    { prompt: 'They had just arrived.', options: ['Ils venaient d’arriver.', 'Ils viennent d’arriver.', 'Ils étaient d’arriver.'], answer: 0, explanation: 'Use the imperfect venaient plus d’arriver for “had just arrived.”' },
    { prompt: 'When we got there, the film had just started.', options: ['Quand nous sommes arrivés, le film venait de commencer.', 'Quand nous arrivons, le film vient de commencer.', 'Quand nous étions arrivés, le film vient commencer.'], answer: 0, explanation: 'Venait de commencer is the recent past viewed from another past event.' },
    { prompt: 'He had just finished his work.', options: ['Il venait de terminer son travail.', 'Il vient de terminer son travail.', 'Il venait terminer son travail.'], answer: 0, explanation: 'Venait de + infinitive means “had just” in this past context.' },
    { prompt: 'I had just seen her.', options: ['Je venais de la voir.', 'Je viens de la voir.', 'Je venais de lui voir.'], answer: 0, explanation: 'Venais is imperfect venir; la is the direct object pronoun before infinitive voir.' },
    { prompt: 'You had just bought it.', options: ['Tu venais de l’acheter.', 'Tu viens de l’acheté.', 'Tu venais l’acheter de.'], answer: 0, explanation: 'Use venais de + infinitive acheter; l’ goes before the infinitive.' },
    { prompt: 'They had just called us.', options: ['Ils venaient de nous appeler.', 'Ils venaient nous de appeler.', 'Ils viennent de nous appelés.'], answer: 0, explanation: 'The pronoun nous goes before the infinitive appeler.' },
    { prompt: 'We had just gone out when it started raining.', options: ['Nous venions de sortir quand il a commencé à pleuvoir.', 'Nous venons de sortir quand il commence à pleuvoir.', 'Nous venions sortir quand il a commencé pleuvoir.'], answer: 0, explanation: 'Venions de sortir is the recent past from a past viewpoint; sortir stays infinitive.' },
  ],
  translate: [
    { prompt: 'I have just eaten.', options: ['Je viens de manger.', 'Je venais de manger.', 'Je viens manger.'], answer: 0, explanation: 'Present venir de + infinitive describes something that has just happened.' },
    { prompt: 'She has just arrived.', options: ['Elle vient d’arriver.', 'Elle vient de arrivée.', 'Elle venait arriver.'], answer: 0, explanation: 'Use d’ before arriver, and keep arriver in the infinitive.' },
    { prompt: 'We have just finished the lesson.', options: ['Nous venons de finir la leçon.', 'Nous venons finis la leçon.', 'Nous venions de finir la leçon.'], answer: 0, explanation: 'Venons de + infinitive finir describes a very recent action.' },
    { prompt: 'He has just called me.', options: ['Il vient de m’appeler.', 'Il vient me appelé.', 'Il venait m’appeler de.'], answer: 0, explanation: 'Me becomes m’ before appeler and goes directly before the infinitive.' },
    { prompt: 'They had just left when I arrived.', options: ['Ils venaient de partir quand je suis arrivé.', 'Ils viennent de partir quand je suis arrivé.', 'Ils venaient partir quand je viens d’arriver.'], answer: 0, explanation: 'Imperfect venaient de + infinitive sets the recent past before another past event.' },
    { prompt: 'You have just received a letter.', options: ['Vous venez de recevoir une lettre.', 'Vous venez recevoir une lettre.', 'Vous veniez de recevoir une lettre.'], answer: 0, explanation: 'Present venez de + infinitive expresses a recent action.' },
  ],
};
