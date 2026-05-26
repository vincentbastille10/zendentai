"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface NoriAvatarProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

const sizes = { sm: 48, md: 80, lg: 120 };

function NoriFallback({ px, animate }: { px: number; animate: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: px, height: px }}>
      {/* Halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: px * 1.5,
          height: px * 1.5,
          background: "radial-gradient(circle, rgba(126,200,200,0.25) 0%, transparent 70%)",
        }}
        animate={animate ? { scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Body circle */}
      <motion.div
        className="relative rounded-full glass-strong shadow-zen flex items-center justify-center"
        style={{ width: px, height: px, background: "rgba(255,255,255,0.85)" }}
        animate={animate ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Eyes */}
        <div className="flex gap-[18%] items-center justify-center w-full" style={{ paddingBottom: "8%" }}>
          <div
            className="rounded-full bg-zen-soft"
            style={{ width: px * 0.1, height: px * 0.1 }}
          />
          <div
            className="rounded-full bg-zen-soft"
            style={{ width: px * 0.1, height: px * 0.1 }}
          />
        </div>
        {/* Smile arc via SVG */}
        <svg
          viewBox="0 0 40 20"
          className="absolute"
          style={{ width: px * 0.4, height: px * 0.2, bottom: "28%" }}
        >
          <path
            d="M5 5 Q20 18 35 5"
            fill="none"
            stroke="#6B8FA8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export function NoriAvatar({ size = "md", animate = true, className = "" }: NoriAvatarProps) {
  const px = sizes[size];
  const [imgError, setImgError] = useState(false);

  return (
    <div className={className}>
      {!imgError ? (
        <div className="relative" style={{ width: px, height: px }}>
          {/* Halo behind image */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: -px * 0.25,
              background: "radial-gradient(circle, rgba(126,200,200,0.3) 0%, transparent 70%)",
            }}
            animate={animate ? { scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            style={{ width: px, height: px }}
            animate={animate ? { y: [0, -4, 0] } : {}}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/nori/nori-avatar.png"
              alt="Nori"
              width={px}
              height={px}
              className="rounded-full object-cover shadow-zen"
              onError={() => setImgError(true)}
              priority
            />
          </motion.div>
        </div>
      ) : (
        <NoriFallback px={px} animate={animate} />
      )}
    </div>
  );
}
