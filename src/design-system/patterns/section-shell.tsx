import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

type SectionShellProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export function SectionShell({
  children,
  className,
  ...props
}: SectionShellProps) {
  return (
    <section
      className={cn("mx-auto w-full max-w-6xl px-4 py-10 sm:px-6", className)}
      {...props}
    >
      {children}
    </section>
  );
}
