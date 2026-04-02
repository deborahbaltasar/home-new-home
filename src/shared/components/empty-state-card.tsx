import type { ReactNode } from "react";

import { Badge } from "@/design-system/primitives/badge";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";

type EmptyStateCardProps = {
  badge?: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  secondary?: ReactNode;
};

export function EmptyStateCard({
  badge,
  title,
  description,
  actionHref,
  actionLabel,
  secondary
}: EmptyStateCardProps) {
  return (
    <Card className="space-y-4" tone="subtle">
      {badge ? <Badge variant="neutral">{badge}</Badge> : null}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="max-w-2xl text-sm leading-6 text-muted">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {actionHref && actionLabel ? (
          <a href={actionHref}>
            <Button type="button">{actionLabel}</Button>
          </a>
        ) : null}
        {secondary}
      </div>
    </Card>
  );
}
