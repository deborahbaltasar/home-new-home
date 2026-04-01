import { SectionShell } from "@/design-system/patterns/section-shell";

export default function SignUpPage() {
  return (
    <SectionShell className="py-16">
      <div className="max-w-md rounded-[1.75rem] border border-border bg-surface/80 p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Sign up</p>
        <h1 className="mt-3 text-3xl font-semibold">Account creation placeholder.</h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          The route contract exists now so Clerk screens can be added in Phase 3 without route
          churn.
        </p>
      </div>
    </SectionShell>
  );
}
