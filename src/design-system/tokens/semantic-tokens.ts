export const brandPalette = {
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    300: "#93c5fd",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    900: "#0f172a"
  },
  sand: {
    50: "#fcfbf8",
    100: "#f5f1e8",
    200: "#e7dfd1",
    400: "#a09283",
    700: "#4b4035",
    900: "#241d18"
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    400: "#94a3b8",
    600: "#475569",
    800: "#1e293b",
    950: "#020617"
  },
  orange: {
    100: "#ffedd5",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316"
  }
} as const;

export const roomColorPalette = [
  "sky",
  "blue",
  "teal",
  "emerald",
  "amber",
  "orange",
  "rose"
] as const;

export const semanticTokens = {
  color: {
    light: {
      canvas: "#f3f5f9",
      surface: "#fbfcfe",
      surfaceMuted: "#eef2f8",
      surfaceStrong: "#dde6f3",
      foreground: "#142238",
      muted: "#5d6b82",
      border: "rgba(20, 34, 56, 0.1)",
      borderStrong: "rgba(20, 34, 56, 0.18)",
      primary: "#2563eb",
      primaryForeground: "#f8fbff",
      accent: "#fb923c",
      accentForeground: "#25180e",
      success: "#0f9f6e",
      warning: "#d97706",
      danger: "#dc2626",
      info: "#0ea5e9",
      ring: "rgba(37, 99, 235, 0.28)"
    },
    dark: {
      canvas: "#09111d",
      surface: "#0f1828",
      surfaceMuted: "#132034",
      surfaceStrong: "#1b2b43",
      foreground: "#edf4ff",
      muted: "#9dafcb",
      border: "rgba(214, 222, 235, 0.12)",
      borderStrong: "rgba(214, 222, 235, 0.2)",
      primary: "#68a8ff",
      primaryForeground: "#08111f",
      accent: "#ff9a5c",
      accentForeground: "#1b130d",
      success: "#3ac996",
      warning: "#ffbf47",
      danger: "#ff7a7a",
      info: "#5cc8ff",
      ring: "rgba(104, 168, 255, 0.35)"
    }
  },
  typography: {
    family: {
      sans: "var(--font-sans)",
      display: "var(--font-display)"
    },
    size: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.5rem",
      "5xl": "3.5rem"
    },
    lineHeight: {
      tight: 1.05,
      snug: 1.2,
      normal: 1.55
    }
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem"
  },
  radius: {
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    pill: "999px"
  },
  shadow: {
    soft: "0 10px 40px rgba(22, 34, 55, 0.08)",
    panel: "0 24px 80px rgba(16, 24, 40, 0.14)",
    glow: "0 0 0 1px rgba(255,255,255,0.03), 0 20px 65px rgba(37, 99, 235, 0.14)"
  },
  motion: {
    duration: {
      fast: 0.18,
      normal: 0.28,
      slow: 0.45
    },
    easing: {
      emphasized: [0.22, 1, 0.36, 1]
    }
  }
} as const;

