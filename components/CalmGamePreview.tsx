"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoftButton } from "@/components/SoftButton";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dur: number;
}

// Positions déterministes pour éviter les problèmes d'hydratation SSR
const INITIAL_BUBBLES: Bubble[] = [
  { id: 0, x: 12, y: 22, size: 82, color: "rgba(126,200,200,0.45)", dur: 5.2 },
  { id: 1, x: 56, y: 14, size: 66, color: "rgba(168,197,218,0.45)", dur: 7.1 },
  { id: 2, x: 28, y: 54, size: 94, color: "rgba(196,181,253,0.40)", dur: 6.0 },
  { id: 3, x: 66, y: 44, size: 72, color: "rgba(110,231,183,0.45)", dur: 8.3 },
  { id: 4, x: 20, y: 72, size: 60, color: "rgba(251,191,36,0.35)", dur: 5.7 },
];

interface CalmGameProps {
  onDone: () => void;
}

export function CalmGamePreview({ onDone }: CalmGameProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>(INITIAL_BUBBLES);
  const [done, setDone] = useState(false);

  function pop(id: number) {
    const next = bubbles.filter((b) => b.id !== id);
    setBubbles(next);
    if (next.length === 0) {
      setTimeout(() => setDone(true), 700);
    }
  }

  function restart() {
    setDone(false);
    setBubbles(INITIAL_BUBBLES);
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-14 text-white">
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-white/70 text-sm">
          Appuyez sur chaque bulle pour la laisser partir.
        </p>
      </motion.div>

      {/* Game area */}
      <div className="relative flex-1" style={{ minHeight: 380 }}>
        <AnimatePresence>
          {bubbles.map((b) => (
            <motion.button
              key={b.id}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -12, 0],
              }}
              exit={{ opacity: 0, scale: 0, filter: "blur(12px)" }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { type: "spring", stiffness: 280, damping: 20 },
                y: { duration: b.dur, repeat: Infinity, ease: "easeInOut" },
                exit: { duration: 0.5, ease: "easeOut" },
              }}
              onClick={() => pop(b.id)}
              style={{
                position: "absolute",
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.size,
                height: b.size,
                background: `radial-gradient(circle, ${b.color} 0%, transparent 100%)`,
                border: `1px solid ${b.color.replace("0.", "0.6")}`,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          ))}
        </AnimatePresence>

        {/* Completion message */}
        <AnimatePresence>
          {done && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-2xl text-white">
                C'est très bien.
              </p>
              <p className="text-white/65 text-sm">
                On peut recommencer si vous voulez.
              </p>
              <div className="flex gap-3">
                <SoftButton size="sm" onClick={restart} variant="ghost">
                  Recommencer
                </SoftButton>
                <SoftButton size="sm" onClick={onDone}>
                  Continuer
                </SoftButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
