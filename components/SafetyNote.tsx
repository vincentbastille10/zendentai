"use client";

import { motion } from "framer-motion";

interface SafetyNoteProps {
  className?: string;
}

export function SafetyNote({ className = "" }: SafetyNoteProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className={`text-center text-white/30 text-[11px] leading-relaxed px-6 ${className}`}
    >
      Nori ne remplace pas l'équipe du cabinet.
      <br />
      Pour toute question sur votre soin, adressez-vous à l'accueil ou au praticien.
    </motion.p>
  );
}
