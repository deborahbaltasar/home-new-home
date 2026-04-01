import { semanticTokens } from "@/design-system/tokens/semantic-tokens";
import { designGuidelines } from "@/design-system/themes/design-guidelines";

export const themeContract = {
  defaultTheme: "system",
  supportedThemes: ["light", "dark", "system"] as const,
  tokens: semanticTokens,
  guidelines: designGuidelines
};

export type SupportedTheme = (typeof themeContract.supportedThemes)[number];
