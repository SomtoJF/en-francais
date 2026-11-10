const IDENTIFY_QUESTIONS = [
  { sentence: 'Je visite Paris.', answer: 'COD', question: 'Je visite quoi ?', explanation: 'Paris receives the action directly: visiter quelqu’un/un lieu takes a COD, with no à.', translation: 'I visit Paris.' },
  { sentence: 'Elle parle à son frère.', answer: 'COI', question: 'Elle parle à qui ?', explanation: 'Son frère is linked by à: parler à quelqu’un takes a COI.', translation: 'She speaks to her brother.' },
  { sentence: 'Nous appelons le médecin.', answer: 'COD', question: 'Nous appelons qui ?', explanation: 'Appeler quelqu’un takes a direct object: no à.', translation: 'We call the doctor.' },
  { sentence: 'Tu réponds à la professeure.', answer: 'COI', question: 'Tu réponds à qui ?', explanation: 'Répondre à quelqu’un always uses à, so the object is indirect.', translation: 'You answer the teacher.' },
  { sentence: 'Il écrit une lettre à sa mère.', answer: 'COI', question: 'Il écrit à qui ?', explanation: 'Sa mère is the recipient introduced by à. Une lettre is the COD.', translation: 'He writes a letter to his mother.' },
  { sentence: 'On rend visite à nos voisins.', answer: 'COI', question: 'On rend visite à qui ?', explanation: 'Rendre visite à quelqu’un is a fixed COI pattern, unlike visiter quelqu’un.', translation: 'We visit our neighbors.' },
  { sentence: 'Vous envoyez le colis à Léa.', answer: 'COI', question: 'Vous envoyez à qui ?', explanation: 'Léa is the indirect recipient; le colis is the COD.', translation: 'You send the parcel to Léa.' },
  { sentence: 'Je regarde ce film.', answer: 'COD', question: 'Je regarde quoi ?', explanation: 'Regarder takes its object directly: regarder quelque chose, not regarder à quelque chose.', translation: 'I watch this film.' },
];

const PRONOUN_QUESTIONS = [
  { sentence: 'Je parle à Marie. → Je ___ parle.', options: ['la', 'lui', 'leur'], answer: 'lui', filled: 'Je lui parle.', translation: 'I speak to her.', rule: 'Marie is a singular person after à, so use the COI pronoun lui.' },
  { sentence: 'Nous appelons Paul. → Nous ___ appelons.', options: ['lui', 'le', 'leur'], answer: 'le', filled: 'Nous l’appelons.', translation: 'We call him.', rule: 'Appeler takes a COD, so Paul becomes le (elided to l’ before a vowel).' },
  { sentence: 'Elle écrit à ses parents. → Elle ___ écrit.', options: ['les', 'leur', 'lui'], answer: 'leur', filled: 'Elle leur écrit.', translation: 'She writes to them.', rule: 'Ses parents are plural people after à, so use leur.' },
  { sentence: 'Tu visites tes cousins. → Tu ___ visites.', options: ['leur', 'les', 'lui'], answer: 'les', filled: 'Tu les visites.', translation: 'You visit them.', rule: 'Visiter takes a COD, so plural tes cousins becomes les.' },
  { sentence: 'Il donne le livre à moi. → Il ___ donne le livre.', options: ['me', 'le', 'lui'], answer: 'me', filled: 'Il me donne le livre.', translation: 'He gives me the book.', rule: 'The recipient à moi becomes the COI pronoun me.' },
  { sentence: 'Vous envoyez des photos à nous. → Vous ___ envoyez des photos.', options: ['nous', 'les', 'leur'], answer: 'nous', filled: 'Vous nous envoyez des photos.', translation: 'You send us photos.', rule: 'The recipient à nous becomes nous.' },
  { sentence: 'Je pense à ce problème. → J’___ pense.', options: ['en', 'y', 'lui'], answer: 'y', filled: 'J’y pense.', translation: 'I think about it.', rule: 'Y replaces à + a thing or idea; lui/leur replace à + people.' },
  { sentence: 'Elle achète du pain. → Elle ___ achète.', options: ['y', 'en', 'le'], answer: 'en', filled: 'Elle en achète.', translation: 'She buys some.', rule: 'En replaces a quantity or de + thing, here du pain.' },
];

const PLACEMENT_QUESTIONS = [
  { prompt: 'Je regarde le film.', answer: 'Je le regarde.', choices: ['Je regarde-le.', 'Je le regarde.', 'Je lui regarde.'], translation: 'I watch the film.', rule: 'A normal object pronoun comes before the conjugated verb.' },
  { prompt: 'Je ne parle pas à Paul.', answer: 'Je ne lui parle pas.', choices: ['Je ne parle lui pas.', 'Je ne lui parle pas.', 'Je lui ne parle pas.'], translation: 'I do not speak to Paul.', rule: 'In negation, ne + pronoun + verb + pas.' },
  { prompt: 'Elle a envoyé la lettre.', answer: 'Elle l’a envoyée.', choices: ['Elle a l’envoyée.', 'Elle l’a envoyée.', 'Elle lui a envoyée.'], translation: 'She sent it.', rule: 'The pronoun comes before avoir; la lettre becomes l’.' },
  { prompt: 'Nous parlerons à nos amis.', answer: 'Nous leur parlerons.', choices: ['Nous parlerons leur.', 'Nous les parlerons.', 'Nous leur parlerons.'], translation: 'We will speak to our friends.', rule: 'COI pronouns come before the future verb: leur parlerons.' },
  { prompt: 'Tu écrivais à ta sœur.', answer: 'Tu lui écrivais.', choices: ['Tu l’écrivais.', 'Tu lui écrivais.', 'Tu écrivais-lui.'], translation: 'You used to write to your sister.', rule: 'Écrire à une person uses lui, placed before the imperfect verb.' },
  { prompt: 'Il donnerait le cadeau à Léa.', answer: 'Il le lui donnerait.', choices: ['Il lui le donnerait.', 'Il le lui donnerait.', 'Il le donnerait lui.'], translation: 'He would give the gift to Léa.', rule: 'Order is COD le before COI lui: le lui donnerait.' },
  { prompt: 'Je vais appeler Marie.', answer: 'Je vais l’appeler.', choices: ['Je l’appelle vais.', 'Je vais lui appeler.', 'Je vais l’appeler.'], translation: 'I am going to call Marie.', rule: 'With an infinitive, the pronoun goes immediately before the infinitive; appeler is COD.' },
  { prompt: 'Elle donne les clés à Paul.', answer: 'Elle les lui donne.', choices: ['Elle lui les donne.', 'Elle les lui donne.', 'Elle les donne lui.'], translation: 'She gives him the keys.', rule: 'Standard order: COD les before COI lui.' },
];

const MIXED_QUESTIONS = [
  { sentence: 'Nous ne leur répondrons pas demain.', answer: 'COI + negation', options: ['COD + negation', 'COI + negation', 'COD + future'], explanation: 'Leur answers à qui ? and sits between ne and the future verb.', translation: 'We will not answer them tomorrow.' },
  { sentence: 'Il n’en achète jamais.', answer: 'en + negation', options: ['y + negation', 'en + negation', 'lui + negation'], explanation: 'En replaces a quantity or de + thing: de pain, for example.', translation: 'He never buys any.' },
  { sentence: 'Je vais le lui expliquer.', answer: 'COD + COI', options: ['COI + COD', 'COD + COI', 'COI only'], explanation: 'Le is the thing explained; lui is the person it is explained to. COD comes first.', translation: 'I am going to explain it to him.' },
  { sentence: 'Elle ne les visitait pas.', answer: 'COD + imparfait', options: ['COD + imparfait', 'COI + imparfait', 'COD + passé composé'], explanation: 'Visiter someone takes a COD: les; -ait marks the imperfect.', translation: 'She was not visiting them.' },
  { sentence: 'Tu lui aurais écrit.', answer: 'COI + conditionnel passé', options: ['COD + futur', 'COI + conditionnel passé', 'COD + imparfait'], explanation: 'Écrire à someone takes lui; aurais écrit is the conditional perfect.', translation: 'You would have written to him/her.' },
  { sentence: 'On leur envoie le document.', answer: 'COI + present', options: ['COD + present', 'COI + present', 'Y + present'], explanation: 'Le destinataire is introduced by à, so leur replaces à eux/elles.', translation: 'We send them the document.' },
];

const TRANSLATION_QUESTIONS = [
  { direction: 'fr-en', prompt: 'Je parle à ma sœur.', answer: 'I speak to my sister.', french: 'Je parle à ma sœur.', hint: 'parler à + person' },
  { direction: 'en-fr', prompt: 'I call the doctor.', answer: 'J’appelle le médecin.', french: 'J’appelle le médecin.', hint: 'appeler + COD' },
  { direction: 'fr-en', prompt: 'Nous ne visitons pas le musée.', answer: 'We are not visiting the museum.', french: 'Nous ne visitons pas le musée.', hint: 'visiter + COD' },
  { direction: 'en-fr', prompt: 'She wrote to them yesterday.', answer: 'Elle leur a écrit hier.', french: 'Elle leur a écrit hier.', hint: 'écrire à + people' },
  { direction: 'fr-en', prompt: 'Tu lui répondras demain.', answer: 'You will answer him/her tomorrow.', french: 'Tu lui répondras demain.', hint: 'répondre à + person' },
  { direction: 'en-fr', prompt: 'We would give it to Léa.', answer: 'Nous le lui donnerions.', french: 'Nous le lui donnerions.', hint: 'COD before COI' },
  { direction: 'fr-en', prompt: 'Il ne m’enverra pas le contrat.', answer: 'He will not send me the contract.', french: 'Il ne m’enverra pas le contrat.', hint: 'envoyer quelque chose à quelqu’un' },
  { direction: 'en-fr', prompt: 'I am going to explain it to her.', answer: 'Je vais le lui expliquer.', french: 'Je vais le lui expliquer.', hint: 'pronouns before infinitive' },
  { direction: 'fr-en', prompt: 'Vous rendiez visite à vos voisins.', answer: 'You were visiting your neighbors.', french: 'Vous rendiez visite à vos voisins.', hint: 'rendre visite à' },
  { direction: 'en-fr', prompt: 'They do not think about it.', answer: 'Ils n’y pensent pas.', french: 'Ils n’y pensent pas.', hint: 'penser à + thing → y' },
  { direction: 'fr-en', prompt: 'Elle en achète souvent.', answer: 'She often buys some.', french: 'Elle en achète souvent.', hint: 'en = quantity/de' },
  { direction: 'en-fr', prompt: 'You used to watch them.', answer: 'Tu les regardais.', french: 'Tu les regardais.', hint: 'regarder + COD' },
  { direction: 'fr-en', prompt: 'Je ne lui téléphone jamais.', answer: 'I never call him/her.', french: 'Je ne lui téléphone jamais.', hint: 'téléphoner à' },
  { direction: 'en-fr', prompt: 'He sent us the photos.', answer: 'Il nous a envoyé les photos.', french: 'Il nous a envoyé les photos.', hint: 'recipient = nous' },
  { direction: 'fr-en', prompt: 'On les appellera ce soir.', answer: 'We will call them tonight.', french: 'On les appellera ce soir.', hint: 'appeler + COD' },
  { direction: 'en-fr', prompt: 'She would not answer me.', answer: 'Elle ne me répondrait pas.', french: 'Elle ne me répondrait pas.', hint: 'répondre à + person' },
  { direction: 'fr-en', prompt: 'Il faut le lui donner.', answer: 'We must give it to him/her.', french: 'Il faut le lui donner.', hint: 'before infinitive' },
  { direction: 'en-fr', prompt: 'I visited them last summer.', answer: 'Je les ai visités l’été dernier.', french: 'Je les ai visités l’été dernier.', hint: 'visiter + COD' },
  { direction: 'fr-en', prompt: 'Nous ne leur écrivions plus.', answer: 'We no longer wrote to them.', french: 'Nous ne leur écrivions plus.', hint: 'ne ... plus + leur' },
  { direction: 'en-fr', prompt: 'You will send it to me.', answer: 'Tu me l’enverras.', french: 'Tu me l’enverras.', hint: 'me before l’' },
  { direction: 'fr-en', prompt: 'Elle appelle sa mère.', answer: 'She calls her mother.', french: 'Elle appelle sa mère.', hint: 'appeler, no à' },
  { direction: 'en-fr', prompt: 'We are thinking about it.', answer: 'Nous y pensons.', french: 'Nous y pensons.', hint: 'penser à + thing' },
  { direction: 'fr-en', prompt: 'Je leur aurais répondu.', answer: 'I would have answered them.', french: 'Je leur aurais répondu.', hint: 'répondre à + people' },
  { direction: 'en-fr', prompt: 'He is going to visit Paris.', answer: 'Il va visiter Paris.', french: 'Il va visiter Paris.', hint: 'visiter a place directly' },
  { direction: 'fr-en', prompt: 'Tu ne me le donneras pas.', answer: 'You will not give it to me.', french: 'Tu ne me le donneras pas.', hint: 'me → le → verb' },
  { direction: 'en-fr', prompt: 'They used to call us.', answer: 'Ils nous appelaient.', french: 'Ils nous appelaient.', hint: 'appeler + COD' },
  { direction: 'fr-en', prompt: 'Elle lui rend visite chaque dimanche.', answer: 'She visits him/her every Sunday.', french: 'Elle lui rend visite chaque dimanche.', hint: 'rendre visite à' },
  { direction: 'en-fr', prompt: 'I did not buy any.', answer: 'Je n’en ai pas acheté.', french: 'Je n’en ai pas acheté.', hint: 'en + passé composé' },
  { direction: 'fr-en', prompt: 'Vous les lui montrerez.', answer: 'You will show them to him/her.', french: 'Vous les lui montrerez.', hint: 'COD les before COI lui' },
  { direction: 'en-fr', prompt: 'She could not answer them.', answer: 'Elle ne pouvait pas leur répondre.', french: 'Elle ne pouvait pas leur répondre.', hint: 'modal + infinitive' },
];
