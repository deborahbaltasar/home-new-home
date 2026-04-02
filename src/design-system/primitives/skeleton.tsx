import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[1rem] bg-surface-strong/85 dark:bg-surface-strong/70",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
