import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-border bg-surface/80 p-5 shadow-soft backdrop-blur",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

