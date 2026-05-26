"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { BreathingCircle } from "@/components/BreathingCircle";
import { ProgressDots } from "@/components/ProgressDots";
import { SoftButton } from "@/components/SoftButton";
import { NoriAvatar } from "@/components/NoriAvatar";
import { ambiences } from "@/data/ambiences";
import { audio as audioMedia } from "@/data/media";

interface GuideSessionProps {
  ambienceId?: string;
  intentionId?: string;
  onComplete: () => void;
  /** Si fourni, bypass l'API et utilise directement ces étapes. */
  predefinedSteps?: string[];
  showNori?: boolean;
}

export function GuideSession({
  ambienceId,
  intentionId,
  onComplete,
  predefinedSteps,
  showNori = true,
}: GuideSessionProps) {
  const [steps, setSteps] = useState<string[]>(predefinedSteps ?? []);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(!predefinedSteps);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ambience = ambiences.find((a) => a.id === ambienceId);

  // Fetch steps only when no predefined steps
  useEffect(() => {
    if (predefinedSteps) return;
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ambience: ambienceId ?? "ocean",
            intention: intentionId ?? "breathe",
            durationMinutes: 5,
          }),
        });
        if (!res.ok) throw new Error("API error");
        const data = (await res.json()) as { steps: string[] };
        if (!cancelled && Array.isArray(data.steps) && data.steps.length > 0) {
          setSteps(data.steps);
        }
      } catch {
        if (!cancelled) setSteps(["Respirez doucement...", "Prenez ce moment pour vous..."]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [ambienceId, intentionId, predefinedSteps]);

  // Audio
  useEffect(() => {
    if (!ambience) return;
    const src = audioMedia[ambience.audioId]?.local ?? "";
    if (!src) return;
    const el = new Audio(src);
    el.loop = true;
    el.volume = 0.3;
    audioRef.current = el;
    return () => { el.pause(); el.src = ""; audioRef.current = null; };
  }, [ambience]);

  function toggleSound() {
    const el = audioRef.current;
    if (!el) return;
    if (soundEnabled) { el.pause(); setSoundEnabled(false); }
    else { el.play().catch(() => {}); setSoundEnabled(true); }
  }

  function handleNext() {
    if (current < steps.length - 1) setCurrent((p) => p + 1);
    else onComplete();
  }

  const circleColor = ambience?.particleColor ?? "rgba(126,200,200,0.7)";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-white">
        <NoriAvatar size="sm" animate />
        <motion.div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-12 text-white relative">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <ProgressDots total={steps.length} current={current} />
        <button
          onClick={toggleSound}
          className="glass rounded-full p-2.5 text-white/70 hover:text-white transition-colors"
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>
      </div>

      {/* Step text */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-xs mx-auto"
          >
            <p
              className="font-display text-xl leading-relaxed text-white"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.2)" }}
            >
              {steps[current]?.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {i === 0
                    ? line
                    : <span className="text-white/65 text-base font-sans font-light">{line}</span>}
                </span>
              ))}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Breathing circle */}
        <BreathingCircle color={circleColor} size={170} />
      </div>

      {/* Bottom */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <SoftButton size="lg" onClick={handleNext} fullWidth className="max-w-xs">
          {current === steps.length - 1 ? "Terminer" : "Continuer"}
        </SoftButton>
        <p className="text-white/30 text-xs">{current + 1} / {steps.length}</p>
      </div>

      {/* Nori corner (discret) */}
      {showNori && (
        <motion.div
          className="fixed bottom-6 right-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <NoriAvatar size="sm" animate />
        </motion.div>
      )}
    </div>
  );
}
