import { Badge } from "@/design-system/primitives/badge";
import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes } from "react";

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  className,
  description,
  eyebrow,
  title,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {eyebrow ? <Badge variant="primary">{eyebrow}</Badge> : null}
      <div className="space-y-2">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-muted sm:text-base">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

