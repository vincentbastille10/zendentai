"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { ambiences } from "@/data/ambiences";

interface AmbientBackgroundProps {
  ambienceId: string | null;
}

function useParticles(count: number, isStars: boolean) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: isStars ? 1 + Math.random() * 2 : 2 + Math.random() * 5,
        duration: isStars ? 3 + Math.random() * 4 : 10 + Math.random() * 16,
        delay: Math.random() * 8,
        opacity: isStars ? 0.4 + Math.random() * 0.6 : 0.1 + Math.random() * 0.25,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count]
  );
}

const defaultGradient =
  "linear-gradient(145deg, #071B2C 0%, #0B2E45 35%, #0F4C5C 70%, #061824 100%)";

export function AmbientBackground({ ambienceId }: AmbientBackgroundProps) {
  const ambience = ambiences.find((a) => a.id === ambienceId);
  const isSpace = ambienceId === "space";
  const particles = useParticles(isSpace ? 60 : 20, isSpace);

  const gradient = ambience?.gradientDark ?? defaultGradient;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={ambienceId ?? "default"}
          className="absolute inset-0"
          style={{ background: gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Ambient blobs */}
      {!isSpace && (
        <div className="absolute inset-0 overflow-hidden">
          {[
            { x: "8%", y: "12%", size: 480, delay: 0, dur: 14 },
            { x: "62%", y: "5%", size: 380, delay: 3, dur: 18 },
            { x: "75%", y: "55%", size: 340, delay: 6, dur: 12 },
            { x: "15%", y: "65%", size: 420, delay: 1.5, dur: 16 },
          ].map((blob, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: blob.x,
                top: blob.y,
                width: blob.size,
                height: blob.size,
                background: ambience
                  ? `radial-gradient(circle, ${ambience.particleColor} 0%, transparent 70%)`
                  : "radial-gradient(circle, rgba(126,200,200,0.2) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
              transition={{
                duration: blob.dur,
                delay: blob.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Stars for space ambience */}
      {isSpace && (
        <div className="absolute inset-0">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{ opacity: [p.opacity, p.opacity * 0.2, p.opacity] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Floating particles for non-space ambiences */}
      {!isSpace && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                bottom: "-10px",
                width: p.size,
                height: p.size,
                background: ambience ? ambience.particleColor : "rgba(126,200,200,0.6)",
              }}
              animate={{ y: [0, -(600 + Math.random() * 300)], opacity: [0, p.opacity, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
