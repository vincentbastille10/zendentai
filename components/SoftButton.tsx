"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SoftButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/30 shadow-zen",
  secondary:
    "bg-white/70 backdrop-blur-md border border-white/80 text-zen-dark hover:bg-white/90 shadow-card",
  ghost:
    "bg-transparent border border-white/30 text-white/80 hover:bg-white/10",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm rounded-2xl",
  md: "px-8 py-4 text-base rounded-2xl",
  lg: "px-10 py-5 text-lg rounded-3xl",
};

export function SoftButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  fullWidth = false,
}: SoftButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={[
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        "font-sans font-medium tracking-wide transition-colors duration-200 cursor-pointer select-none",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </motion.button>
  );
}
