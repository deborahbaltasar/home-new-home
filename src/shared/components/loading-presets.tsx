import { SectionShell } from "@/design-system/patterns/section-shell";
import { Card } from "@/design-system/primitives/card";
import { Skeleton } from "@/design-system/primitives/skeleton";

function LoadingHeaderBlock() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-36 rounded-pill" />
      <Skeleton className="h-10 w-full max-w-xl" />
      <Skeleton className="h-4 w-full max-w-2xl" />
    </div>
  );
}

export function MarketingPageLoading() {
  return (
    <SectionShell className="space-y-10 py-10 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div className="space-y-6">
          <LoadingHeaderBlock />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-9 w-28 rounded-pill" />
            <Skeleton className="h-9 w-20 rounded-pill" />
            <Skeleton className="h-9 w-20 rounded-pill" />
            <Skeleton className="h-9 w-16 rounded-pill" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-12 w-44 rounded-pill" />
            <Skeleton className="h-12 w-40 rounded-pill" />
          </div>
        </div>

        <Card tone="emphasis" className="w-full space-y-5 overflow-hidden p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 rounded-pill" />
              <Skeleton className="h-9 w-56" />
            </div>
            <Skeleton className="h-8 w-28 rounded-pill" />
          </div>
          <Skeleton className="h-12 w-64 rounded-pill" />
          <Card tone="subtle" className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-pill" />
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-7 w-28 rounded-pill" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-2xl" />
              ))}
            </div>
          </Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-28 rounded-[1.75rem]" />
            <Skeleton className="h-28 rounded-[1.75rem]" />
          </div>
          <Skeleton className="h-24 rounded-[1.75rem]" />
        </Card>
      </div>
    </SectionShell>
  );
}

export function AuthPageLoading() {
  return (
    <SectionShell className="flex flex-1 items-center justify-center py-10">
      <Card className="w-full max-w-[25rem] space-y-6 p-6 sm:p-8">
        <div className="space-y-3 text-center">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto h-4 w-56" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-11 rounded-pill" />
          <Skeleton className="h-11 rounded-pill" />
        </div>
        <Skeleton className="h-px w-full rounded-none" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-11 w-full rounded-pill" />
        </div>
        <Skeleton className="h-12 w-full rounded-pill" />
        <Skeleton className="mx-auto h-4 w-44" />
      </Card>
    </SectionShell>
  );
}

export function RoadmapPageLoading() {
  return (
    <SectionShell className="space-y-8 py-16">
      <LoadingHeaderBlock />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-20" />
          </Card>
        ))}
      </div>
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-7 w-56" />
              <Skeleton className="h-8 w-28 rounded-pill" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-2 w-full rounded-pill" />
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

export function PlatformDashboardLoading() {
  return (
    <div className="grid gap-4">
      <LoadingHeaderBlock />
      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card className="space-y-5">
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-8 w-28 rounded-pill" />
            <Skeleton className="h-8 w-32 rounded-pill" />
            <Skeleton className="h-8 w-28 rounded-pill" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} tone="subtle" className="space-y-2 p-4">
                <Skeleton className="h-7 w-20 rounded-pill" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </Card>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-11 w-36 rounded-pill" />
            <Skeleton className="h-11 w-36 rounded-pill" />
          </div>
        </Card>
        <Card className="space-y-4" tone="subtle">
          <Skeleton className="h-7 w-32 rounded-pill" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </Card>
      </div>
      <Card className="space-y-4" tone="subtle">
        <Skeleton className="h-7 w-28 rounded-pill" />
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-11 w-40 rounded-pill" />
      </Card>
    </div>
  );
}

export function EmptyStateLoading() {
  return (
    <Card className="space-y-4" tone="subtle">
      <Skeleton className="h-7 w-24 rounded-pill" />
      <Skeleton className="h-8 w-80" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-11 w-36 rounded-pill" />
        <Skeleton className="h-11 w-48 rounded-2xl" />
      </div>
    </Card>
  );
}

export function ProfileLoading() {
  return (
    <div className="grid gap-6">
      <LoadingHeaderBlock />
      <Card className="space-y-4 p-3">
        <Skeleton className="h-[32rem] w-full rounded-[1.5rem]" />
      </Card>
    </div>
  );
}

export function PublicShareLoading() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <Card className="space-y-3">
        <Skeleton className="h-5 w-28 rounded-pill" />
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </Card>
    </div>
  );
}

export function ItemsPageLoading() {
  return (
    <div className="grid gap-4">
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-8 w-24 rounded-pill" />
          <Skeleton className="h-8 w-28 rounded-pill" />
          <Skeleton className="h-8 w-32 rounded-pill" />
        </div>
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-4 w-full max-w-3xl" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} tone="subtle" className="space-y-2 p-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="space-y-4">
          <Skeleton className="h-7 w-28 rounded-pill" />
          <Skeleton className="h-8 w-56" />
          <div className="grid gap-3">
            <Skeleton className="h-11 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-[1.5rem]" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Skeleton className="h-11 w-full rounded-2xl" />
              <Skeleton className="h-11 w-full rounded-2xl" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-11 w-full rounded-2xl" />
              <Skeleton className="h-11 w-full rounded-2xl" />
              <Skeleton className="h-11 w-full rounded-2xl" />
            </div>
            <Skeleton className="h-11 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-[1.5rem]" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-11 w-32 rounded-pill" />
              <Skeleton className="h-11 w-56 rounded-pill" />
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-7 w-20 rounded-pill" />
              <Skeleton className="h-8 w-72" />
            </div>
            <Skeleton className="h-10 w-28 rounded-pill" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-24 rounded-pill" />
            ))}
          </div>
          <div className="grid gap-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <Card key={index} tone="subtle" className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-20 rounded-pill" />
                      <Skeleton className="h-8 w-28 rounded-pill" />
                      <Skeleton className="h-8 w-24 rounded-pill" />
                    </div>
                    <Skeleton className="h-8 w-40" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-24 rounded-pill" />
                  <Skeleton className="h-8 w-24 rounded-pill" />
                  <Skeleton className="h-8 w-16 rounded-pill" />
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
