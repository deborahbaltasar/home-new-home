import { cn } from "@/shared/lib/cn";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ChipProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
  }
>;

export function Chip({
  active = false,
  children,
  className,
  ...props
}: ChipProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center rounded-pill border px-4 text-sm font-medium transition",
        active
          ? "border-primary/30 bg-primary/12 text-primary"
          : "border-border bg-surface text-muted hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

