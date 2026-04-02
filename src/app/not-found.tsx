import Link from "next/link";
import { SectionShell } from "@/design-system/patterns/section-shell";
import { Button } from "@/design-system/primitives/button";
import { Card } from "@/design-system/primitives/card";

export default function NotFound() {
  return (
    <SectionShell className="flex min-h-[70vh] items-center justify-center py-16">
      <Card className="max-w-lg space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Not found
        </p>
        <h1 className="text-4xl font-semibold">This space does not exist in the house yet.</h1>
        <p className="text-sm leading-6 text-muted">
          The page you tried to reach is not available. Return to the landing or continue into the
          product shell.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/">
            <Button variant="outline">Landing</Button>
          </Link>
          <Link href="/app">
            <Button>App shell</Button>
          </Link>
        </div>
      </Card>
    </SectionShell>
  );
}
