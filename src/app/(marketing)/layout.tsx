import { Coffee, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { MarketingAmbientOrbs } from "@/shared/components/marketing-ambient-orbs";
import { MarketingStickyCtas } from "@/shared/components/marketing-sticky-ctas";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import type { ReactNode } from "react";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <MarketingAmbientOrbs />
      <header className="sticky top-0 z-20 border-b border-border/60 bg-surface/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted sm:text-sm">
              Home New Home
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MarketingStickyCtas />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="relative z-10">{children}</div>
      <footer className="relative z-10 border-t border-border/60 bg-surface/40 backdrop-blur">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-4 text-xs text-muted sm:grid-cols-3 sm:items-center sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground sm:text-left">
            Baltz Group
          </div>
          <div className="flex items-center justify-start gap-2 text-foreground sm:justify-center">
            <span className="text-muted">© 2026</span>
            <span className="text-muted">•</span>
            <span>Developed by Debs</span>
            <span className="text-muted">•</span>
            <button
              type="button"
              aria-label="Buy me a coffee"
              title="Buy me a coffee"
              className="group inline-flex items-center gap-1 text-muted transition hover:text-foreground"
            >
              <span>Buy me a coffee?</span>
              <Coffee className="h-3.5 w-3.5 fill-transparent text-accent transition-colors group-hover:fill-orange-500" />
            </button>
          </div>
          <div className="flex items-center gap-3 sm:justify-end">
            <a
              href="https://github.com/deborahbaltasar"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="mailto:deborahbnogueira.dn@gmail.com"
              aria-label="Email"
              className="transition hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/debbnogueira/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition hover:text-foreground"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/deborah-baltasar/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
