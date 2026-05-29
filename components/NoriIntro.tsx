"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Scene data – deterministic (no hydration mismatch) ────────────────────────

const STARS = [
  { x: 7,  y: 4,  s: 1.4, d: 3.4, dl: 0.0 },
  { x: 19, y: 2,  s: 1.0, d: 4.2, dl: 0.9 },
  { x: 34, y: 7,  s: 0.8, d: 3.8, dl: 1.6 },
  { x: 52, y: 3,  s: 1.3, d: 4.6, dl: 0.4 },
  { x: 66, y: 9,  s: 1.0, d: 3.5, dl: 2.2 },
  { x: 78, y: 5,  s: 1.5, d: 4.1, dl: 1.3 },
  { x: 90, y: 8,  s: 0.8, d: 3.7, dl: 0.7 },
  { x: 12, y: 17, s: 1.0, d: 4.8, dl: 1.9 },
  { x: 29, y: 19, s: 1.2, d: 3.2, dl: 0.5 },
  { x: 59, y: 14, s: 0.8, d: 4.0, dl: 2.5 },
  { x: 83, y: 21, s: 1.0, d: 3.9, dl: 1.0 },
  { x: 44, y: 24, s: 1.2, d: 4.4, dl: 0.2 },
  { x: 71, y: 16, s: 0.7, d: 3.6, dl: 1.7 },
  { x: 95, y: 13, s: 1.1, d: 4.7, dl: 0.8 },
];

const GLINTS = [
  { x: 10, y: 58.5, w: 48, dl: 0.0 },
  { x: 28, y: 59.0, w: 32, dl: 1.8 },
  { x: 48, y: 58.2, w: 56, dl: 3.4 },
  { x: 68, y: 58.8, w: 40, dl: 1.1 },
  { x: 84, y: 58.5, w: 36, dl: 2.7 },
];

// Nori phrases – scripted, no LLM
const PHRASES = [
  { text: "Bonjour, je suis Nori.", at: 800 },
  { text: "Je vais rester avec vous quelques minutes, avant votre rendez-vous.", at: 2300 },
  { text: "On commence simplement par respirer ensemble ?", at: 4000 },
];
const CHOICES_AT = 5600;

// ─────────────────────────────────────────────────────────────────────────────

type NoriIntroProps = { onStart: () => void };

export default function NoriIntro({ onStart }: NoriIntroProps) {
  const [shown, setShown] = useState<Set<number>>(new Set());
  const [showChoices, setShowChoices] = useState(false);
  const [chosen, setChosen] = useState<"apprehension" | null>(null);

  useEffect(() => {
    const timers = PHRASES.map((p, i) =>
      setTimeout(() => setShown((prev) => new Set([...prev, i])), p.at)
    );
    const choiceTimer = setTimeout(() => setShowChoices(true), CHOICES_AT);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(choiceTimer);
    };
  }, []);

  function handleChoice(key: "start" | "apprehension" | "pose") {
    if (key === "start" || key === "pose") {
      setTimeout(onStart, 350);
    } else {
      setChosen("apprehension");
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "#05080e" }}>

      {/* ════════════════════════════════════════════════
          SCÈNE – Nuit sur l'océan, lumière à l'horizon
          ════════════════════════════════════════════════ */}

      {/* Ciel profond */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,#03060c 0%,#07122a 18%,#0c2240 34%,#0f3254 50%,#1a506e 62%,#103042 76%,#06101e 90%,#050810 100%)",
        }}
      />

      {/* Nuages lumineux */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-10%", left: "-18%",
          width: "75vw", height: "75vw",
          maxWidth: 480, maxHeight: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(94,214,200,0.13), transparent 68%)",
          filter: "blur(48px)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "4%", right: "-12%",
          width: "65vw", height: "65vw",
          maxWidth: 420, maxHeight: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(60,120,200,0.14), transparent 68%)",
          filter: "blur(56px)",
        }}
        animate={{ scale: [1, 1.09, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "36%", left: "10%",
          width: "80vw", height: "34vw",
          maxWidth: 500, maxHeight: 220,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(210,130,55,0.07), transparent 70%)",
          filter: "blur(64px)",
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* Étoiles */}
      {STARS.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.s, height: star.s }}
          animate={{ opacity: [0.12, 0.7, 0.12] }}
          transition={{ duration: star.d, delay: star.dl, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Lune */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "7%", right: "16%",
          width: 36, height: 36,
          background: "radial-gradient(circle, rgba(255,248,220,0.92) 30%, rgba(255,245,200,0.3) 65%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(2px)",
          boxShadow: "0 0 40px 12px rgba(255,240,180,0.18)",
        }}
      />

      {/* Horizon + reflet de lune */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "58%" }}
      >
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(94,214,200,0.15) 20%, rgba(255,210,140,0.25) 55%, rgba(94,214,200,0.12) 80%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute", top: "2px",
            left: "50%", transform: "translateX(-50%)",
            width: 80, height: 24,
            background: "radial-gradient(ellipse, rgba(255,240,180,0.25) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* Miroitements eau */}
      {GLINTS.map((g, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${g.x}%`, top: `${g.y}%`,
            width: g.w, height: 3,
            background: "radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 100%)",
            filter: "blur(1.5px)",
            borderRadius: 4,
          }}
          animate={{ opacity: [0, 0.9, 0], scaleX: [0.4, 1.6, 0.4] }}
          transition={{ duration: 3.5, delay: g.dl, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Vignette basse */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "62%",
          background:
            "linear-gradient(0deg, rgba(5,8,14,0.98) 0%, rgba(5,8,14,0.93) 16%, rgba(5,8,14,0.72) 36%, rgba(5,8,14,0.32) 55%, transparent 100%)",
        }}
      />

      {/* ════════════════════════════════════════════════
          CONTENU
          ════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col h-full max-w-[430px] mx-auto px-6">

        {/* Zone Nori – haut de l'écran */}
        <div className="flex items-center justify-center" style={{ flex: "0 0 44%", paddingTop: "3vh" }}>
          <div className="relative">

            {/* Aura externe */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: -52,
                background: "radial-gradient(circle, rgba(94,214,200,0.16) 0%, transparent 68%)",
                filter: "blur(20px)",
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Anneau */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: -14, border: "1px solid rgba(94,214,200,0.22)" }}
              animate={{ scale: [1, 1.07, 1], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />

            {/* Avatar flottant */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  width: 180, height: 180,
                  background:
                    "radial-gradient(circle at 38% 32%, #dcfaf8 0%, #a8e8e5 32%, #6ccece 62%, #4ab8b8 100%)",
                  boxShadow:
                    "0 0 0 2.5px rgba(255,255,255,0.28), 0 0 50px rgba(94,214,200,0.55), 0 28px 72px rgba(0,0,0,0.55)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/nori/nori-avatar.png"
                  alt="Nori"
                  className="absolute inset-0 w-full h-full object-contain p-2"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, transparent 45%)",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Zone texte + actions */}
        <div
          className="flex flex-col"
          style={{
            flex: "0 0 56%",
            paddingBottom: "max(1.75rem, env(safe-area-inset-bottom, 1.75rem))",
          }}
        >
          {/* Badge */}
          <motion.p
            className="text-center text-[10px] uppercase tracking-[0.42em] mb-5"
            style={{ color: "rgba(94,214,200,0.48)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.4 }}
          >
            ZenDentAI · Nori
          </motion.p>

          {/* Phrases progressives */}
          <div className="flex-1 flex flex-col justify-end gap-[10px] mb-6">
            {PHRASES.map((p, i) => (
              <AnimatePresence key={i}>
                {shown.has(i) && (
                  <motion.p
                    initial={{ opacity: 0, y: 9 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 28,
                      lineHeight: 1.38,
                      letterSpacing: "0.01em",
                      textShadow: "0 2px 24px rgba(0,0,0,0.6)",
                    }}
                  >
                    {p.text}
                  </motion.p>
                )}
              </AnimatePresence>
            ))}

            {/* Réassurance si appréhension choisie */}
            <AnimatePresence>
              {chosen === "apprehension" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="rounded-2xl px-5 py-4 mt-2"
                  style={{
                    background: "rgba(94,214,200,0.09)",
                    border: "1px solid rgba(94,214,200,0.2)",
                  }}
                >
                  <p
                    className="text-white/90 whitespace-pre-line"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 22,
                      lineHeight: 1.52,
                    }}
                  >
                    {"C'est fréquent avant un soin.\nVous n'avez rien à réussir ici.\nOn va simplement souffler un peu plus lentement."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Choix scriptés (Betty-style) */}
          <AnimatePresence>
            {showChoices && !chosen && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3 mb-3"
              >
                <button
                  type="button"
                  onClick={() => handleChoice("start")}
                  className="w-full rounded-2xl py-[17px] text-[17px] font-extrabold tracking-[0.01em]"
                  style={{
                    background: "#5ED6C8",
                    color: "#031d2c",
                    boxShadow:
                      "0 0 0 1.5px rgba(94,214,200,0.5), 0 10px 42px rgba(94,214,200,0.32), 0 3px 12px rgba(0,0,0,0.35)",
                  }}
                >
                  Oui, commencer
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice("apprehension")}
                  className="w-full rounded-2xl py-4 text-[15px] font-semibold text-white/80"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)" }}
                >
                  {"J'ai un peu d'appréhension"}
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice("pose")}
                  className="w-full rounded-2xl py-4 text-[15px] font-semibold text-white/80"
                  style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)" }}
                >
                  Je veux juste me poser
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bouton "Commencer" après réassurance */}
          <AnimatePresence>
            {chosen === "apprehension" && (
              <motion.button
                type="button"
                onClick={onStart}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full rounded-2xl py-[17px] text-[17px] font-extrabold tracking-[0.01em] mb-3"
                style={{
                  background: "#5ED6C8",
                  color: "#031d2c",
                  boxShadow:
                    "0 0 0 1.5px rgba(94,214,200,0.5), 0 10px 42px rgba(94,214,200,0.32), 0 3px 12px rgba(0,0,0,0.35)",
                }}
              >
                Commencer la respiration
              </motion.button>
            )}
          </AnimatePresence>

          {/* Note légale */}
          <motion.p
            className="text-center text-[10px] leading-relaxed mt-4"
            style={{ color: "rgba(207,231,234,0.3)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1.8 }}
          >
            Nori ne remplace pas l'équipe du cabinet.
            <br />
            Pour toute question, adressez-vous à l'accueil ou au praticien.
          </motion.p>

        </div>
      </div>
    </div>
  );
}
