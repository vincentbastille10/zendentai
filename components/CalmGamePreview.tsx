"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoftButton } from "@/components/SoftButton";

// ── Leaf SVG (inline, no external asset) ─────────────────────────────────────

function LeafIcon({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36 64 C36 64 8 48 8 26 C8 14 20 8 36 8 C52 8 64 14 64 26 C64 48 36 64 36 64Z"
        fill="rgba(110,231,183,0.55)"
        stroke="rgba(110,231,183,0.8)"
        strokeWidth="1.5"
      />
      <path
        d="M36 64 C36 64 36 36 36 8"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M36 30 C28 26 20 28 16 24"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M36 42 C44 38 52 40 56 36"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="8" fill="rgba(251,191,36,0.85)" />
      {[0,1,2,3,4,5,6,7].map((i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = 28 + Math.cos(angle) * 16;
        const cy = 28 + Math.sin(angle) * 16;
        return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="5" fill="rgba(196,181,253,0.7)"
          transform={`rotate(${i * 45}, ${cx}, ${cy})`} />;
      })}
    </svg>
  );
}

// ── Particle burst on blow ────────────────────────────────────────────────────

function BlowParticles({ id }: { id: number }) {
  const particles = [0, 1, 2, 3, 4];
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {particles.map((p) => {
        const angle = (p / particles.length) * 2 * Math.PI;
        const tx = Math.cos(angle) * 40;
        const ty = Math.sin(angle) * 40;
        return (
          <motion.div
            key={`${id}-${p}`}
            className="absolute rounded-full bg-teal-300/60"
            style={{ width: 8, height: 8 }}
            initial={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 0.3, x: tx, y: ty }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface CalmGameProps {
  onDone: () => void;
}

const MAX_BLOWS = 5;

export function CalmGamePreview({ onDone }: CalmGameProps) {
  const [blows, setBlows] = useState(0);
  const [particleKey, setParticleKey] = useState<number | null>(null);
  const [blowing, setBlowing] = useState(false);
  const [done, setDone] = useState(false);

  // Leaf drifts right as blows increase (0 → centre, 5 → right edge)
  const leafX = (blows / MAX_BLOWS) * 58; // percentage shift from center

  function blow() {
    if (blowing || done) return;
    setBlowing(true);
    const next = blows + 1;
    setParticleKey(Date.now());

    setTimeout(() => {
      setBlows(next);
      setBlowing(false);
      if (next >= MAX_BLOWS) {
        setTimeout(() => setDone(true), 600);
      }
    }, 400);
  }

  function restart() {
    setDone(false);
    setBlows(0);
    setParticleKey(null);
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-14 text-white">
      {/* Header */}
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="header"
            className="text-center mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display text-2xl text-white mb-2">
              Soufflez doucement la feuille
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
              Appuyez quand vous soufflez lentement.
              <br />
              Il n'y a rien à réussir. Laissez simplement la feuille avancer.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="done-header"
            className="text-center mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display text-2xl text-white mb-2">
              {"C'est très bien."}
            </p>
            <p className="text-white/65 text-sm leading-relaxed max-w-xs mx-auto">
              Votre respiration a déjà ralenti un peu.
              <br />
              Gardez cette sensation pendant l'attente.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game area */}
      <div className="relative flex-1 flex flex-col items-center justify-center" style={{ minHeight: 280 }}>

        {/* Flower bloom on completion */}
        <AnimatePresence>
          {done && (
            <motion.div
              className="absolute flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <FlowerIcon />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Leaf */}
        {!done && (
          <div className="relative w-full flex justify-center" style={{ height: 120 }}>
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                x: `${leafX}vw`,
                y: [0, -8, 0],
              }}
              transition={{
                x: { duration: 0.5, ease: "easeOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformOrigin: "center" }}
            >
              <LeafIcon size={72} />
              {particleKey !== null && <BlowParticles id={particleKey} />}
            </motion.div>
          </div>
        )}

        {/* Progress dots */}
        {!done && (
          <div className="flex gap-3 mt-8">
            {Array.from({ length: MAX_BLOWS }).map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{ width: 10, height: 10 }}
                animate={{
                  background:
                    i < blows
                      ? "rgba(110,231,183,0.85)"
                      : "rgba(255,255,255,0.2)",
                  scale: i === blows - 1 ? [1, 1.4, 1] : 1,
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col items-center gap-4 mt-6">
        {!done ? (
          <motion.button
            onClick={blow}
            disabled={blowing}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-xs rounded-2xl py-5 text-lg font-bold disabled:opacity-50 transition-opacity"
            style={{
              background: "#5ED6C8",
              color: "#031d2c",
              boxShadow:
                "0 0 0 1.5px rgba(94,214,200,0.5), 0 10px 36px rgba(94,214,200,0.28)",
            }}
          >
            {blowing ? "…" : "Je souffle doucement"}
          </motion.button>
        ) : (
          <div className="flex gap-3 w-full max-w-xs">
            <SoftButton size="sm" onClick={restart} variant="ghost" fullWidth>
              Refaire
            </SoftButton>
            <SoftButton size="sm" onClick={onDone} fullWidth>
              Revenir à Nori
            </SoftButton>
          </div>
        )}
      </div>
    </div>
  );
}
