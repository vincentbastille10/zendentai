export interface NoriReply {
  text: string;
  nextAction: "start_breathing" | "continue_reply";
  cta: string;
}

const fallback: NoriReply = {
  text: "Merci de me l'avoir dit.\nOn va faire simple et doux.\nJe vous propose de commencer par quelques respirations.",
  nextAction: "start_breathing",
  cta: "Commencer",
};

type Pattern = { keywords: string[] } & NoriReply;

// Normalise accents pour la comparaison
function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

const patterns: Pattern[] = [
  {
    keywords: ["peur", "inquiet", "inquiete", "stresse", "stressée", "anxieux", "anxieuse", "partir", "fuir", "quitter", "fuite"],
    text: "Je comprends. On ne va pas aller trop vite.\nPour l'instant, restons simplement ici quelques secondes.\nJe vous propose de respirer ensemble, tout doucement.",
    nextAction: "start_breathing",
    cta: "Respirer avec Nori",
  },
  {
    keywords: ["douleur", "mal ", " mal", "ça fait", "faire mal", "douloureux", "douloureuse", "avoir mal"],
    text: "Pour les questions sur le soin, l'équipe du cabinet pourra vous répondre précisément.\nIci, je peux rester avec vous pendant l'attente.\nCommençons par détendre un peu le corps.",
    nextAction: "start_breathing",
    cta: "Commencer doucement",
  },
  {
    keywords: ["dentiste", "n'aime pas", "aime pas", "j'aime pas", "cabinet"],
    text: "Vous n'êtes pas le seul à arriver avec cette sensation.\nOn peut rendre ces quelques minutes un peu plus faciles.\nJuste une respiration pour commencer.",
    nextAction: "start_breathing",
    cta: "Essayer une respiration",
  },
  {
    keywords: ["enfant", "fils", "fille", "gamin", "bambin", "petit", "kids", "kid"],
    text: "D'accord. On peut faire très simple.\nComme un petit jeu de souffle, sans pression.\nOn suit Nori et on respire comme un nuage.",
    nextAction: "start_breathing",
    cta: "Lancer le mode doux",
  },
  {
    keywords: ["attendre", "juste attendre", "patienter", "attends", "tranquille", "calme", "moment calme"],
    text: "Très bien.\nOn peut faire ça très simplement.\nJe reste là, et on laisse passer quelques instants tranquillement.",
    nextAction: "start_breathing",
    cta: "Patienter avec Nori",
  },
];

export function getNoriReply(message: string): NoriReply {
  const lower = norm(message);
  for (const p of patterns) {
    if (p.keywords.some((k) => lower.includes(norm(k)))) {
      return { text: p.text, nextAction: p.nextAction, cta: p.cta };
    }
  }
  return fallback;
}
