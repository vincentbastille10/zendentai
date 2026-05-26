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

// Water shimmer glints on horizon
const GLINTS = [
  { x: 10, y: 58.5, w: 48, dl: 0.0 },
  { x: 28, y: 59.0, w: 32, dl: 1.8 },
  { x: 48, y: 58.2, w: 56, dl: 3.4 },
  { x: 68, y: 58.8, w: 40, dl: 1.1 },
  { x: 84, y: 58.5, w: 36, dl: 2.7 },
];

// Nori's phrases – each one appears naturally after the last
const PHRASES = [
  { text: "Bonjour, je suis Nori.", at: 1100 },
  { text: "Je vais rester avec vous quelques minutes.", at: 2800 },
  { text: "On commence simplement par respirer ensemble ?", at: 4600 },
  { text: "Ça marche presque tout le temps 🙂", at: 6400 },
];
const BUTTON_AT = 8200;

// ─────────────────────────────────────────────────────────────────────────────

type NoriIntroProps = { onStart: () => void };

export default function NoriIntro({ onStart }: NoriIntroProps) {
  const [shown, setShown] = useState<Set<number>>(new Set());
  const [showCta, setShowCta] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [noriReply, setNoriReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timers = PHRASES.map((p, i) =>
      setTimeout(() => setShown((prev) => new Set([...prev, i])), p.at)
    );
    const cta = setTimeout(() => setShowCta(true), BUTTON_AT);
    return () => { timers.forEach(clearTimeout); clearTimeout(cta); };
  }, []);

  async function sendMessage() {
    const text = message.trim();
    if (!text || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/nori-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setNoriReply(
        data?.text ?? "Je vous entends.\n\nOn commence par respirer ensemble."
      );
      setMessage("");
      setShowCta(true);
    } catch {
      setNoriReply("Je vous entends.\n\nOn commence par respirer ensemble.");
      setShowCta(true);
    } finally {
      setLoading(false);
    }
  }

  const ctaVisible = showCta || !!noriReply;

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

      {/* Nuages lumineux – blobs atmosphériques */}
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

      {/* Lune – source de lumière douce */}
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

      {/* Ligne d'horizon + reflet de lune sur l'eau */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "58%" }}
      >
        {/* Ligne horizon */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(94,214,200,0.15) 20%, rgba(255,210,140,0.25) 55%, rgba(94,214,200,0.12) 80%, transparent 100%)",
          }}
        />
        {/* Reflet de lune */}
        <div
          style={{
            position: "absolute",
            top: "2px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 24,
            background:
              "radial-gradient(ellipse, rgba(255,240,180,0.25) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* Miroitements de l'eau */}
      {GLINTS.map((g, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            width: g.w,
            height: 3,
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 100%)",
            filter: "blur(1.5px)",
            borderRadius: 4,
          }}
          animate={{ opacity: [0, 0.9, 0], scaleX: [0.4, 1.6, 0.4] }}
          transition={{ duration: 3.5, delay: g.dl, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Vignette basse – assure lisibilité du texte */}
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

        {/* Zone Nori – occupe le haut de l'écran */}
        <div className="flex items-center justify-center" style={{ flex: "0 0 44%", paddingTop: "3vh" }}>
          <div className="relative">

            {/* Aura externe – très douce */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: -52,
                background:
                  "radial-gradient(circle, rgba(94,214,200,0.16) 0%, transparent 68%)",
                filter: "blur(20px)",
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Anneau tenu */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: -14, border: "1px solid rgba(94,214,200,0.22)" }}
              animate={{ scale: [1, 1.07, 1], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />

            {/* Avatar – flottant */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  width: 180,
                  height: 180,
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
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Reflet interne */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, transparent 45%)",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Zone texte + actions – ancré en bas */}
        <div
          className="flex flex-col"
          style={{
            flex: "0 0 56%",
            paddingBottom: "max(1.75rem, env(safe-area-inset-bottom, 1.75rem))",
          }}
        >

          {/* Badge ZenDentAI */}
          <motion.p
            className="text-center text-[10px] uppercase tracking-[0.42em] mb-5"
            style={{ color: "rgba(94,214,200,0.48)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.4 }}
          >
            ZenDentAI · Nori
          </motion.p>

          {/* Réponse Nori après message utilisateur */}
          {noriReply && (
            <motion.div
              className="mb-5 rounded-2xl px-5 py-4"
              style={{
                background: "rgba(94,214,200,0.09)",
                border: "1px solid rgba(94,214,200,0.2)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-white/88 text-[16px] leading-[1.58] whitespace-pre-line">
                {noriReply}
              </p>
            </motion.div>
          )}

          {/* Phrases progressives */}
          {!noriReply && (
            <div className="flex-1 flex flex-col justify-end gap-[10px] mb-7">
              {PHRASES.map((p, i) => (
                <AnimatePresence key={i}>
                  {shown.has(i) && (
                    <motion.p
                      initial={{ opacity: 0, y: 9 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                      className="text-white font-semibold"
                      style={{
                        fontSize: 21,
                        lineHeight: 1.32,
                        textShadow: "0 2px 20px rgba(0,0,0,0.65)",
                      }}
                    >
                      {p.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              ))}
            </div>
          )}

          {noriReply && <div className="flex-1" />}

          {/* Bouton principal – n'apparaît qu'après toutes les phrases */}
          <AnimatePresence>
            {ctaVisible && (
              <motion.button
                type="button"
                onClick={onStart}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-2xl py-[17px] text-[17px] font-extrabold tracking-[0.01em] mb-3"
                style={{
                  background: "#5ED6C8",
                  color: "#031d2c",
                  boxShadow:
                    "0 0 0 1.5px rgba(94,214,200,0.5), 0 10px 42px rgba(94,214,200,0.32), 0 3px 12px rgba(0,0,0,0.35)",
                }}
              >
                Respirer avec Nori
              </motion.button>
            )}
          </AnimatePresence>

          {/* Lien chat – très discret */}
          <AnimatePresence>
            {ctaVisible && !chatOpen && (
              <motion.button
                type="button"
                onClick={() => setChatOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-full py-3 text-sm font-medium rounded-2xl mb-1"
                style={{ color: "rgba(207,231,234,0.5)" }}
              >
                Parler un instant avec Nori
              </motion.button>
            )}
          </AnimatePresence>

          {/* Zone chat */}
          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-3 mb-1"
              >
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez quelques mots à Nori…"
                  rows={3}
                  className="w-full resize-none rounded-2xl px-4 py-4 text-white text-[15px] outline-none leading-relaxed"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.13)",
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={loading || !message.trim()}
                    className="rounded-2xl py-3 text-sm font-bold disabled:opacity-45"
                    style={{ background: "rgba(248,250,252,0.92)", color: "#082030" }}
                  >
                    {loading ? "Nori répond…" : "Envoyer"}
                  </button>
                  <button
                    type="button"
                    onClick={onStart}
                    className="rounded-2xl py-3 text-sm font-semibold text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    Respirer
                  </button>
                </div>
              </motion.div>
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
