"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { SITE_STATS } from "@/lib/site-stats";

const STATS = [
  { target: SITE_STATS.familiesServed,   suffix: "+", labelKey: "stats_families"          as const },
  { target: SITE_STATS.sittersCount,     suffix: "+", labelKey: "stats_sitters"            as const },
  { target: SITE_STATS.servicesDone,     suffix: "+", labelKey: "stats_services_done"      as const },
  { target: SITE_STATS.satisfactionRate, suffix: "%", labelKey: "stats_satisfaction_label" as const },
] as const;

/** Format number French-style: 15000 → "15 000", 2347 → "2 347" */
function fmt(n: number): string {
  return n.toLocaleString("fr-FR");
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{fmt(count)}{suffix}</span>;
}

interface StatsCounterProps {
  /**
   * "dark"  : fond chocolat sombre, chiffres corail, labels ivoire atténué
   * "light" : fond transparent (hérite la page), chiffres chocolat, labels muted
   */
  variant?: "dark" | "light";
}

/**
 * StatsCounter — 4 chiffres clés avec animation compteur au scroll.
 * Utilisé sur la home (variant light) et sur /qui-sommes-nous (variant dark).
 */
export function StatsCounter({ variant = "dark" }: StatsCounterProps) {
  const t = useTranslations("home");
  const isDark = variant === "dark";

  return (
    <section
      className="py-16"
      style={isDark ? { background: "linear-gradient(160deg, var(--color-chocolat) 0%, var(--color-chocolat-light) 100%)" } : undefined}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map(({ target, suffix, labelKey }) => (
            <div key={labelKey} className="flex flex-col gap-2">
              <span
                className="font-normal leading-none"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  // dark: rouge-light (#E8705A) on chocolat (#2C1810) → 5.8:1 ✓
                  // light: chocolat (#2C1810) on ivoire (#FAF7F2) → 12.9:1 ✓
                  color: isDark ? "var(--color-rouge-light)" : "var(--color-chocolat)",
                }}
              >
                <CountUp target={target} suffix={suffix} />
              </span>
              <span
                className="text-sm leading-snug"
                // dark: ivoire 65% on chocolat → 7.9:1 ✓
                // light: chocolat-light on ivoire → 7.5:1 ✓
                style={{ color: isDark ? "rgba(250,247,242,0.65)" : "var(--color-chocolat-light)" }}
              >
                {t(labelKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
