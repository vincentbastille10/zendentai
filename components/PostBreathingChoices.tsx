"use client";

import { motion } from "framer-motion";
import { NoriAvatar } from "@/components/NoriAvatar";
import { SafetyNote } from "@/components/SafetyNote";

type Choice = "continue" | "calm-image" | "calm-game" | "restart";

interface PostBreathingChoicesProps {
  onChoice: (c: Choice) => void;
}

const choices: { id: Choice; label: string; sub: string }[] = [
  { id: "continue", label: "Continuer doucement", sub: "Encore quelques respirations" },
  { id: "calm-image", label: "Voyager dans une image calme", sub: "Bord de mer, forêt, ciel étoilé" },
  { id: "calm-game", label: "Petit jeu calme", sub: "Cinq bulles à laisser partir" },
  { id: "restart", label: "Recommencer depuis le début", sub: "Revenir à l'accueil" },
];

export function PostBreathingChoices({ onChoice }: PostBreathingChoicesProps) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } },
  };
  const item = {
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="flex flex-col min-h-screen px-5 py-12 text-white">
      {/* Header with Nori */}
      <motion.div
        className="flex flex-col items-center text-center mb-10 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <NoriAvatar size="sm" animate />
        <div>
          <p className="font-display text-2xl text-white mb-1">
            Merci d'avoir pris ce moment.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            Vous pouvez continuer encore un peu,
            <br />
            ou simplement patienter tranquillement.
          </p>
        </div>
      </motion.div>

      {/* Choices */}
      <motion.div
        className="flex flex-col gap-3 flex-1"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {choices.map((c) => (
          <motion.button
            key={c.id}
            variants={item}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoice(c.id)}
            className="glass border border-white/20 rounded-2xl px-5 py-4 text-left hover:bg-white/15 transition-colors cursor-pointer"
          >
            <p className="text-white font-medium text-base">{c.label}</p>
            <p className="text-white/50 text-sm mt-0.5">{c.sub}</p>
          </motion.button>
        ))}
      </motion.div>

      <div className="mt-8">
        <SafetyNote />
      </div>
    </div>
  );
}
