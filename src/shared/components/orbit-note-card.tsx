"use client";

import { motion } from "framer-motion";

type OrbitNoteCardProps = {
  index: string;
  title: string;
  description: string;
  dark?: boolean;
  className?: string;
};

export function OrbitNoteCard({
  className = "",
  dark = false,
  description,
  index,
  title
}: OrbitNoteCardProps) {
  return (
    <motion.div
      whileHover={{
        rotate: dark ? 3 : -3,
        y: dark ? -4 : -6,
        scale: 1.03
      }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      style={{ transformOrigin: "28px 26px" }}
      className={[
        "relative rounded-[1.5rem] border p-4",
        dark
          ? "border-slate-900/12 bg-white/90 text-slate-900 shadow-[0_14px_40px_rgba(20,34,56,0.12)] dark:border-white/10 dark:bg-slate-950 dark:text-slate-50 dark:shadow-[0_18px_48px_rgba(20,34,56,0.18)]"
          : "border-slate-900/12 bg-white/90 shadow-[0_14px_40px_rgba(20,34,56,0.12)] dark:border-white/10 dark:bg-slate-950/70",
        className
      ].join(" ")}
    >
      <motion.div
        className="absolute left-3 top-3 h-10 w-10 rounded-full border border-primary/20"
        initial={{ rotate: 0, scale: 0.92, opacity: 0 }}
        whileHover={{ rotate: dark ? -180 : 180, scale: 1.08, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative">
        <p
          className={[
            "text-xs font-semibold uppercase tracking-[0.18em]",
            dark ? "text-accent" : "text-primary"
          ].join(" ")}
        >
          {index}
        </p>
        <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</p>
        <p className={["mt-2 text-sm", dark ? "text-slate-300" : "text-slate-600 dark:text-slate-300"].join(" ")}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
