"use client";

import { motion } from "framer-motion";
import { ambiences, type Ambience } from "@/data/ambiences";

interface AmbienceSelectorProps {
  onSelect: (id: string) => void;
  /** Si fourni, affiche uniquement les ambiances dont l'id est dans cette liste. */
  limitIds?: string[];
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function AmbienceCard({ ambience, onSelect }: { ambience: Ambience; onSelect: () => void }) {
  return (
    <motion.button
      variants={cardAnim}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
      onClick={onSelect}
      className="relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer text-left w-full"
      style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15)" }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: ambience.gradient }}
      />

      {/* Shimmer overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Glass content area */}
      <div className="absolute inset-x-0 bottom-0 glass rounded-b-3xl p-4">
        <div className="text-xl mb-1">{ambience.emoji}</div>
        <p className="text-white font-semibold text-sm leading-tight mb-0.5">{ambience.name}</p>
        <p className="text-white/70 text-xs leading-snug line-clamp-2">{ambience.description}</p>
      </div>

      {/* Tap highlight */}
      <motion.div
        className="absolute inset-0 bg-white/0 rounded-3xl"
        whileTap={{ background: "rgba(255,255,255,0.06)" }}
        transition={{ duration: 0.15 }}
      />
    </motion.button>
  );
}

export function AmbienceSelector({ onSelect, limitIds }: AmbienceSelectorProps) {
  const visible = limitIds ? ambiences.filter((a) => limitIds.includes(a.id)) : ambiences;
  const isCalmSelect = !!limitIds;

  return (
    <div className="flex flex-col px-5 pb-10 text-white">
      {/* Header — masqué en mode calm-select (géré par page.tsx) */}
      {!isCalmSelect && (
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl font-light text-white">
            Choisissez votre
            <br />
            <span className="italic">ambiance</span>
          </h2>
        </motion.div>
      )}

      {/* Cards grid */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {visible.map((ambience) => (
          <AmbienceCard
            key={ambience.id}
            ambience={ambience}
            onSelect={() => onSelect(ambience.id)}
          />
        ))}
      </motion.div>
    </div>
  );
}
