export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  fadeLeft: {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  },
  fadeRight: {
    initial: { opacity: 0, x: -32 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.92, y: 18 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
  },
  popIn: {
    initial: { opacity: 0, scale: 0.84, rotate: -4 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] }
  },
  staggerFast: {
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  }
} as const;
