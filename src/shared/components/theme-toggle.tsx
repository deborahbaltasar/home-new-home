"use client";

import { Button } from "@/design-system/primitives/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button variant="outline" onClick={() => setTheme(nextTheme)}>
      {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  );
}
