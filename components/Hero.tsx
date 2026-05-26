"use client";

import { motion } from "framer-motion";
import { SoftButton } from "@/components/SoftButton";

interface HeroProps {
  onStart: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 text-white">
      {/* Central orb */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer halo */}
        <motion.div
          className="rounded-full border border-white/10"
          style={{ width: 340, height: 340 }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(126,200,200,0.35) 0%, rgba(168,197,218,0.15) 50%, transparent 75%)",
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Second ring */}
        <motion.div
          className="absolute rounded-full border border-white/8"
          style={{ inset: -40 }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-xs mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.div variants={item} className="mb-8">
          <span className="inline-block glass rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.18em] uppercase text-white/80">
            Votre espace de calme
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={item}
          className="font-display text-4xl leading-tight mb-4 text-white"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.2)" }}
        >
          Prenez quelques minutes
          <br />
          <span className="italic font-light">pour vous</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={item}
          className="text-white/70 text-base leading-relaxed mb-12 font-light"
        >
          Un moment de calme
          <br />
          avant votre rendez-vous
        </motion.p>

        {/* CTA */}
        <motion.div variants={item}>
          <SoftButton size="lg" onClick={onStart} className="glow-soft">
            Commencer
          </SoftButton>
        </motion.div>
      </motion.div>

      {/* Bottom hint */}
      <motion.p
        className="absolute bottom-10 text-white/35 text-xs tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        ZenDentAI
      </motion.p>
    </div>
  );
}
