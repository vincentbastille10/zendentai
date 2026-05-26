"use client";

import { motion } from "framer-motion";

interface ProgressDotsProps {
  total: number;
  current: number;
  color?: string;
}

export function ProgressDots({ total, current, color = "white" }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 24 : 6,
            opacity: i === current ? 1 : i < current ? 0.5 : 0.25,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{ backgroundColor: color }}
          className="h-1.5 rounded-full"
        />
      ))}
    </div>
  );
}
