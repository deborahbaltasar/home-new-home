import { Card } from "@/design-system/primitives/card";

type PublicSharePageProps = {
  params: Promise<{ token: string }>;
};

export default async function PublicSharePage({ params }: PublicSharePageProps) {
  const { token } = await params;

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <Card className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Public share
        </p>
        <h1 className="text-2xl font-semibold">Share token {token}</h1>
        <p className="text-sm leading-6 text-muted">
          Public reservation and buyer name capture are planned for Phase 8. The route contract is
          already reserved.
        </p>
      </Card>
    </div>
  );
}
