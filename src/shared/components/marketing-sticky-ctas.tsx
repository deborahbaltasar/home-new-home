"use client";

import { Button } from "@/design-system/primitives/button";
import { ArrowRight, LogIn } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const marketingLinks: Record<"roadmap" | "signup" | "home", Route> = {
  roadmap: "/roadmap" as Route,
  signup: "/sign-up" as Route,
  home: "/" as Route
};

export function MarketingStickyCtas() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isRoadmapPage = pathname === "/roadmap";

  useEffect(() => {
    if (isRoadmapPage) {
      setVisible(true);
      return;
    }

    const target = document.getElementById("marketing-hero-ctas");

    if (!target) {
      setVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.15
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isRoadmapPage]);

  return (
    <>
      <Link
        href={marketingLinks.signup}
        aria-label="Enter"
        title="Enter"
        className={[
          "flex h-10 w-10 items-center justify-center rounded-pill text-white transition md:hidden",
          visible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        ].join(" ")}
      >
        <LogIn className="h-5 w-5" />
      </Link>

      <div
        className={[
          "hidden items-center gap-2 transition duration-300 md:flex",
          visible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        ].join(" ")}
      >
        <Link href={marketingLinks.signup}>
          <Button size="sm">
            Start planning
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Button>
        </Link>
        <Link href={isRoadmapPage ? marketingLinks.home : marketingLinks.roadmap}>
          <Button size="sm" variant="outline">
            {isRoadmapPage ? "Back to landing" : "Explore roadmap"}
          </Button>
        </Link>
      </div>
    </>
  );
}
