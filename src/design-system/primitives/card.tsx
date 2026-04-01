import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

type CardTone = "default" | "emphasis" | "subtle";

type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    tone?: CardTone;
  }
>;

const tones: Record<CardTone, string> = {
  default: "bg-surface/88 border-border shadow-soft",
  emphasis:
    "border-primary/20 bg-[linear-gradient(180deg,rgba(37,99,235,0.14),rgba(255,255,255,0.04))] shadow-glow",
  subtle: "bg-surface-muted/70 border-border/60 shadow-none"
};

export function Card({
  children,
  className,
  tone = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border p-5 backdrop-blur",
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

