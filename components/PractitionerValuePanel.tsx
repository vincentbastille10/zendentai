"use client";

import { motion } from "framer-motion";
import { SoftButton } from "@/components/SoftButton";

const BENEFITS = [
  "Aide à réduire la tension avant le soin",
  "Rassure les patients anxieux",
  "Améliore l'image du cabinet",
  "Aucun compte à créer",
  "Aucun téléchargement requis",
  "Utilisable sur smartphone",
  "Expérience douce et professionnelle",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

interface PractitionerValuePanelProps {
  onBack: () => void;
}

export function PractitionerValuePanel({ onBack }: PractitionerValuePanelProps) {
  return (
    <div className="flex flex-col min-h-screen px-5 py-12 text-white">

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Nori glyph */}
        <div
          className="mx-auto mb-5 flex items-center justify-center rounded-full"
          style={{
            width: 56, height: 56,
            background: "radial-gradient(circle, rgba(94,214,200,0.3) 0%, transparent 70%)",
            border: "1px solid rgba(94,214,200,0.35)",
          }}
        >
          <span style={{ fontSize: 24 }}>🌿</span>
        </div>

        <p
          className="text-[11px] uppercase tracking-[0.3em] mb-3"
          style={{ color: "rgba(94,214,200,0.55)" }}
        >
          Pour le cabinet
        </p>
        <h2
          className="text-white mb-4"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: 30,
            lineHeight: 1.35,
          }}
        >
          Ce que Zendentai apporte à votre cabinet
        </h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
          Zendentai aide à transformer l'attente en moment d'accueil.
          Un patient rassuré arrive souvent plus calme, plus disponible
          et plus facile à accompagner.
        </p>
      </motion.div>

      {/* Benefits grid */}
      <motion.div
        className="grid grid-cols-2 gap-3 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {BENEFITS.map((b) => (
          <motion.div
            key={b}
            variants={item}
            className="glass border border-white/15 rounded-2xl px-4 py-3 flex items-start gap-2"
          >
            <span className="text-teal-400 mt-0.5 text-sm flex-shrink-0">✓</span>
            <p className="text-white/80 text-xs leading-5">{b}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        className="text-center text-[11px] leading-relaxed text-white/35 mb-8 max-w-xs mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Zendentai peut contribuer à réduire l'appréhension avant un soin.
        Il ne remplace pas l'accompagnement de l'équipe soignante.
      </motion.p>

      {/* CTA + Back */}
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        <a
          href="https://zendania-landing.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-2xl py-[17px] text-center text-[17px] font-extrabold tracking-[0.01em] block"
          style={{
            background: "#5ED6C8",
            color: "#031d2c",
            boxShadow:
              "0 0 0 1.5px rgba(94,214,200,0.5), 0 10px 42px rgba(94,214,200,0.28)",
          }}
        >
          Découvrir Zendania
        </a>

        <SoftButton onClick={onBack} variant="ghost" fullWidth>
          Revenir à l'expérience patient
        </SoftButton>
      </motion.div>

    </div>
  );
}
