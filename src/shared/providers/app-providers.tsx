"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { semanticTokens } from "@/design-system/tokens/semantic-tokens";

type AppProvidersProps = {
  children: ReactNode;
};

function ClerkThemeProvider({ children }: AppProvidersProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const colors = isDark ? semanticTokens.color.dark : semanticTokens.color.light;

  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        baseTheme: "clerk",
        variables: {
          colorPrimary: colors.primary,
          colorBackground: colors.surface,
          colorInput: colors.surfaceMuted,
          colorInputForeground: colors.foreground,
          colorText: colors.foreground,
          colorTextSecondary: colors.muted,
          colorNeutral: colors.borderStrong,
          colorBorder: colors.borderStrong,
          colorRing: colors.ring,
          colorDanger: colors.danger,
          colorSuccess: colors.success,
          fontFamily: semanticTokens.typography.family.sans,
          fontFamilyButtons: semanticTokens.typography.family.sans,
          borderRadius: semanticTokens.radius.md
        },
        elements: {
          socialButtonsBlockButton:
            "text-foreground dark:text-foreground hover:text-foreground dark:hover:text-foreground",
          socialButtonsBlockButtonText:
            "text-foreground dark:text-foreground opacity-100",
          formButtonPrimary: "text-primary-foreground"
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkThemeProvider>{children}</ClerkThemeProvider>
    </ThemeProvider>
  );
}
