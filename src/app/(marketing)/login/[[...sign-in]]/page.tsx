import { SectionShell } from "@/design-system/patterns/section-shell";

export default function LoginPage() {
  return (
    <SectionShell className="py-16">
      <div className="max-w-md rounded-[1.75rem] border border-border bg-surface/80 p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Login</p>
        <h1 className="mt-3 text-3xl font-semibold">Clerk integration starts in Phase 3.</h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          This route is already reserved so the auth flow can be wired without changing the
          navigation structure later.
        </p>
      </div>
    </SectionShell>
  );
}

