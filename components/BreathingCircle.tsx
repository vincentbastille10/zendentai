"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type Phase = {
  label: string;
  instruction: string;
  duration: number;
  scale: number;
  opacity: number;
};

const phases: Phase[] = [
  { label: "Inspirez", instruction: "Guidez l'air doucement", duration: 4000, scale: 1.35, opacity: 0.9 },
  { label: "Retenez", instruction: "Gardez sereinement", duration: 2000, scale: 1.35, opacity: 1 },
  { label: "Expirez", instruction: "Relâchez tout doucement", duration: 6000, scale: 0.78, opacity: 0.6 },
  { label: "Pausez", instruction: "Bienvenue dans le calme", duration: 1500, scale: 0.78, opacity: 0.45 },
];

interface BreathingCircleProps {
  color?: string;
  size?: number;
}

export function BreathingCircle({ color = "rgba(126,200,200,0.7)", size = 200 }: BreathingCircleProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = phases[phaseIndex];

  useEffect(() => {
    const t = setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
    }, phase.duration);
    return () => clearTimeout(t);
  }, [phaseIndex, phase.duration]);

  const phaseDurSec = phase.duration / 1000;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Circles */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Outer halo ring */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: size + 40,
            height: size + 40,
            borderColor: color.replace("0.7", "0.2"),
          }}
          animate={{ scale: phase.scale, opacity: phase.opacity * 0.5 }}
          transition={{ duration: phaseDurSec, ease: "easeInOut" }}
        />

        {/* Mid ring */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: size + 14,
            height: size + 14,
            borderColor: color.replace("0.7", "0.35"),
            borderWidth: 1.5,
          }}
          animate={{ scale: phase.scale, opacity: phase.opacity * 0.7 }}
          transition={{ duration: phaseDurSec, ease: "easeInOut" }}
        />

        {/* Core circle */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color} 0%, ${color.replace("0.7", "0.35")} 60%, transparent 100%)`,
            boxShadow: `0 0 60px ${color.replace("0.7", "0.4")}, 0 0 120px ${color.replace("0.7", "0.15")}`,
          }}
          animate={{ scale: phase.scale, opacity: phase.opacity }}
          transition={{ duration: phaseDurSec, ease: "easeInOut" }}
        />

        {/* Inner subtle glow */}
        <motion.div
          className="absolute rounded-full bg-white/20"
          style={{ width: size * 0.4, height: size * 0.4 }}
          animate={{ scale: phase.scale * 0.9, opacity: phase.scale > 1 ? 0.6 : 0.2 }}
          transition={{ duration: phaseDurSec, ease: "easeInOut" }}
        />
      </div>

      {/* Label */}
      <div className="text-center h-12 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phaseIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="text-white font-medium text-lg tracking-wide">{phase.label}</p>
            <p className="text-white/55 text-xs mt-0.5">{phase.instruction}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
