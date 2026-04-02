"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { motionPresets } from "@/design-system/motion/presets";
import { cn } from "@/shared/lib/cn";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "popIn";
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp"
}: RevealProps) {
  const preset = motionPresets[variant];

  return (
    <motion.div
      initial={preset.initial}
      whileInView={preset.animate}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ ...preset.transition, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
