"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(nextTheme)}
      className="group relative inline-flex h-10 w-[4.5rem] items-center rounded-pill border border-border-strong bg-surface/85 p-1 shadow-soft backdrop-blur transition hover:border-primary/30 hover:shadow-glow"
    >
      <motion.span
        className="absolute inset-y-1 left-1 w-8 rounded-pill bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(220,231,247,0.9))] shadow-soft dark:bg-[linear-gradient(180deg,rgba(17,31,49,0.95),rgba(33,51,76,0.95))]"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
      />

      <span className="relative z-10 flex w-full items-center justify-between px-1">
        <motion.span
          animate={{
            scale: isDark ? 0.92 : 1,
            rotate: isDark ? -20 : 0,
            opacity: isDark ? 0.55 : 1
          }}
          transition={{ duration: 0.22 }}
          className="flex h-6 w-6 items-center justify-center"
        >
          <Sun className="h-4 w-4 text-accent" strokeWidth={2.2} />
        </motion.span>

        <motion.span
          animate={{
            scale: isDark ? 1 : 0.92,
            rotate: isDark ? 0 : 20,
            opacity: isDark ? 1 : 0.55
          }}
          transition={{ duration: 0.22 }}
          className="flex h-6 w-6 items-center justify-center"
        >
          <Moon className="h-4 w-4 text-primary" strokeWidth={2.2} />
        </motion.span>
      </span>
    </button>
  );
}
