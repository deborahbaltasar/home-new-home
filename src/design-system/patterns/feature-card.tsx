import { Badge } from "@/design-system/primitives/badge";
import { Card } from "@/design-system/primitives/card";
import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes } from "react";

type FeatureCardProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  title: string;
  description: string;
};

export function FeatureCard({
  className,
  description,
  label,
  title,
  ...props
}: FeatureCardProps) {
  return (
    <Card className={cn("space-y-4", className)} {...props}>
      {label ? <Badge variant="accent">{label}</Badge> : null}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm leading-6 text-muted">{description}</p>
      </div>
    </Card>
  );
}
