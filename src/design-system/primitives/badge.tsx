import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

type BadgeVariant = "primary" | "accent" | "neutral" | "success" | "warning";

type BadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
  }
>;

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary/12 text-primary",
  accent: "bg-accent/16 text-accent-foreground",
  neutral: "bg-surface-strong text-foreground",
  success: "bg-success/12 text-success",
  warning: "bg-warning/12 text-warning"
};

export function Badge({
  children,
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

