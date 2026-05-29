export type IntentionId = "breathe" | "center" | "accompanied" | "wait";

// ── Nori breathing — étapes canoniques (multi-ligne : titre \n sous-texte) ───

export const noriBreathingSteps: string[] = [
  "Posez les deux pieds au sol.\nRelâchez les épaules doucement.",
  "Inspirez lentement par le nez.\nLaissez l'air descendre vers le ventre.",
  "Soufflez lentement par la bouche.\nUn peu plus longtemps que l'inspiration.",
  "Desserrez doucement la mâchoire.\nVotre visage peut se relâcher.",
  "Encore une fois, sans effort.\nVous n'avez rien à réussir.",
  "Vous n'êtes pas seul.\nL'équipe est là pour vous accompagner.",
  "Une étape à la fois.\nRevenez simplement à cette respiration.",
  "Voilà. Encore un peu d'espace.\nVous pouvez attendre plus sereinement.",
];

// ── Scripts locaux par intention ──────────────────────────────────────────────

export const scripts: Record<IntentionId, string[]> = {
  breathe: [
    "Installez-vous doucement...\nSentez le poids de votre corps s'abandonner au siège.",
    "Posez vos mains sur vos genoux, paumes vers le ciel.\nRelâchez les épaules, desserrez doucement la mâchoire.",
    "Inspirez lentement par le nez en comptant jusqu'à quatre...\nLaissez l'air descendre profondément dans votre ventre.",
    "Expirez par la bouche, lentement, sur six secondes...\nImagez une vague qui se retire doucement.",
    "À chaque souffle, un peu plus de douceur entre en vous.\nÀ chaque expiration, ce qui est inutile s'en va.",
    "Vous respirez exactement comme il le faut.\nIl n'y a rien d'autre à faire que d'être ici.",
    "Ce moment vous appartient.\nVous avez bien pris soin de vous.",
  ],
  center: [
    "Fermez doucement les yeux quelques instants.\nPrenez conscience de l'espace autour de vous.",
    "Sentez les points de contact avec le monde :\nvos pieds sur le sol, votre dos contre le siège.",
    "Ramenez doucement votre attention ici,\ndans cette pièce, dans ce moment précis.",
    "Vous n'avez rien d'autre à faire que d'être présent.\nC'est suffisant. C'est même beaucoup.",
    "Observez vos pensées comme des nuages qui passent\ndans un ciel bleu et tranquille.",
    "Vous n'êtes pas vos pensées.\nVous êtes le ciel qui les accueille.",
    "Vous êtes ancré, présent, serein.\nPrêt pour ce qui vient.",
  ],
  accompanied: [
    "Bienvenue...\nJe suis là, avec vous, dans ce moment.",
    "Vous n'êtes pas seul.\nChaque personne ici a fait le choix de prendre soin d'elle.",
    "Ce rendez-vous est un acte de bienveillance envers vous-même.\nVous avez pris ce rendez-vous. C'est déjà courageux.",
    "Votre équipe soignante est là pour vous accompagner\navec attention et douceur.",
    "Accordez-vous la permission d'être exactement\nlà où vous êtes. C'est parfait.",
    "Vous avez toutes les ressources en vous.\nVous l'avez toujours su, quelque part.",
    "Tout se passera bien.\nVous êtes entre de bonnes mains — les leurs et les vôtres.",
  ],
  wait: [
    "Ce moment d'attente est une parenthèse rare.\nOffrez-la vous sans culpabilité.",
    "Posez les épaules.\nRelâchez la mâchoire. Desserrez doucement les mains.",
    "Vous n'avez nulle part où aller pour l'instant.\nC'est une liberté précieuse.",
    "Le temps qui passe est votre allié.\nChaque minute vous rapproche doucement du soin.",
    "Regardez autour de vous avec bienveillance.\nChaque personne ici a son propre chemin.",
    "Vous avez fait le choix de prendre soin de vous.\nC'est déjà un acte de beauté.",
    "Dans quelques instants, votre rendez-vous commencera.\nVous êtes prêt. Tout va bien.",
  ],
};

export function getLocalScript(intentionId: string): string[] {
  const key = intentionId as IntentionId;
  return scripts[key] ?? scripts.breathe;
}
