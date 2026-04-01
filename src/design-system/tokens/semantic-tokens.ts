export const semanticTokens = {
  color: {
    light: {
      surface: "#f5f7fb",
      surfaceMuted: "#e8edf5",
      foreground: "#112033",
      muted: "#5d6b82",
      border: "rgba(20, 34, 56, 0.1)",
      primary: "#2563eb",
      primaryForeground: "#f7fbff",
      accent: "#ff8a3d",
      accentForeground: "#1f2937"
    },
    dark: {
      surface: "#0d1523",
      surfaceMuted: "#121d30",
      foreground: "#ecf2ff",
      muted: "#98a7c1",
      border: "rgba(214, 222, 235, 0.12)",
      primary: "#5ea2ff",
      primaryForeground: "#08111f",
      accent: "#ff9150",
      accentForeground: "#101827"
    }
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem"
  },
  radius: {
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem"
  }
} as const;

