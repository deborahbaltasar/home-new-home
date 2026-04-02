"use client";

import { Button } from "@/design-system/primitives/button";
import { ArrowRight, LogIn } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const marketingLinks: Record<"roadmap" | "login" | "home", Route> = {
  roadmap: "/roadmap" as Route,
  login: "/login" as Route,
  home: "/" as Route
};

export function MarketingStickyCtas() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const effectivePathname = mounted ? pathname : "";
  const isRoadmapPage = effectivePathname === "/roadmap";
  const isAuthPage = effectivePathname === "/login" || effectivePathname.startsWith("/sign-up");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (isRoadmapPage || isAuthPage) {
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
  }, [isAuthPage, isRoadmapPage, mounted]);

  return (
    <>
      {!isAuthPage ? (
        <Link
          href={marketingLinks.login}
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
      ) : null}

      <div
        className={[
          "hidden items-center gap-2 transition duration-300 md:flex",
          visible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        ].join(" ")}
      >
        {!isAuthPage ? (
          <Link href={marketingLinks.login}>
            <Button size="sm">
              Start planning
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </Link>
        ) : null}
        <Link href={isRoadmapPage || isAuthPage ? marketingLinks.home : marketingLinks.roadmap}>
          <Button size="sm" variant="outline">
            {isRoadmapPage || isAuthPage ? "Back to landing" : "Explore roadmap"}
          </Button>
        </Link>
      </div>
    </>
  );
}
