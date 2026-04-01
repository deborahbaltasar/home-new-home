import { semanticTokens } from "@/design-system/tokens/semantic-tokens";

export const themeContract = {
  defaultTheme: "system",
  supportedThemes: ["light", "dark", "system"] as const,
  tokens: semanticTokens
};

export type SupportedTheme = (typeof themeContract.supportedThemes)[number];

