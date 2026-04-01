import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

type SheetProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    side?: "bottom" | "right";
  }
>;

export function Sheet({ children, className, side = "bottom", ...props }: SheetProps) {
  return (
    <div
      className={cn(
        "border border-border bg-surface shadow-panel backdrop-blur",
        side === "bottom"
          ? "rounded-t-[2rem] px-5 pb-6 pt-4"
          : "rounded-l-[2rem] px-5 py-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
