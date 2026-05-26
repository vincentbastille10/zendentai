"use client";

import { motion } from "framer-motion";
import { NoriAvatar } from "@/components/NoriAvatar";
import { SoftButton } from "@/components/SoftButton";
import type { NoriReply } from "@/lib/nori-engine";

interface NoriLiveReplyProps {
  reply: NoriReply;
  onCta: () => void;
  loading?: boolean;
}

export function NoriLiveReply({ reply, onCta, loading = false }: NoriLiveReplyProps) {
  const lines = reply.text.split("\n").filter(Boolean);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <NoriAvatar size="md" animate />
        <motion.div
          className="flex gap-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-7 py-16 text-white">
      <motion.div
        className="flex flex-col items-center w-full max-w-sm gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Avatar small */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <NoriAvatar size="sm" animate />
        </motion.div>

        {/* Reply bubble */}
        <div className="glass-strong rounded-3xl px-6 py-5 w-full space-y-2">
          {lines.map((l, i) => (
            <motion.p
              key={i}
              className={i === 0 ? "text-white font-medium text-base leading-snug" : "text-white/70 text-sm leading-relaxed"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.55 }}
            >
              {l}
            </motion.p>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <SoftButton size="lg" onClick={onCta} fullWidth>
            {reply.cta}
          </SoftButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
