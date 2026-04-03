"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/cn";

type PlatformBreadcrumbProps = {
  houses: Array<{
    id: string;
    name: string;
  }>;
};

type BreadcrumbItem = {
  href: string;
  label: string;
  current?: boolean;
};

const segmentLabel: Record<string, string> = {
  app: "Overview",
  houses: "Houses",
  items: "Items",
  rooms: "Rooms",
  decisions: "Decisions",
  settings: "Settings",
  profile: "Profile",
  public: "Public",
  share: "Shared house"
};

function formatSegmentLabel(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function PlatformBreadcrumb({ houses }: PlatformBreadcrumbProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length || segments[0] !== "app") {
    return null;
  }

  const items: BreadcrumbItem[] = [{ href: "/app", label: "Overview" }];
  let href = "/app";

  for (let index = 1; index < segments.length; index += 1) {
    const segment = segments[index];
    href += `/${segment}`;

    let label = segmentLabel[segment] ?? formatSegmentLabel(segment);

    if (segments[index - 1] === "houses") {
      label = houses.find((house) => house.id === segment)?.name ?? "House";
    }

    if (segments[index - 1] === "share" && segments[index - 2] === "public") {
      label = "Invite";
    }

    items.push({
      href,
      label
    });
  }

  const normalizedItems = items.map((item, index) => ({
    ...item,
    current: index === items.length - 1
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-5 overflow-x-auto">
      <ol className="flex min-w-0 items-center gap-2 text-sm text-muted">
        {normalizedItems.map((item) => (
          <li key={item.href} className="flex min-w-0 items-center gap-2">
            {item.current ? (
              <span className="truncate font-semibold text-foreground">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "truncate transition hover:text-foreground",
                  item.href === "/app" ? "text-foreground/90" : "text-muted"
                )}
              >
                {item.label}
              </Link>
            )}
            {!item.current ? <ChevronRight className="h-4 w-4 shrink-0 text-muted/70" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
