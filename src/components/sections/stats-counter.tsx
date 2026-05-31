"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const STATS = [
  { target: 2347,  suffix: "+", labelKey: "stats_families"       as const },
  { target: 350,   suffix: "+", labelKey: "stats_sitters"        as const },
  { target: 15000, suffix: "+", labelKey: "stats_services_done"  as const },
  { target: 98,    suffix: "%", labelKey: "stats_satisfaction_label" as const },
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
  /** "navy" : fond navy gradient sombre ; "light" : fond crème discret */
  variant?: "navy" | "light";
}

/**
 * StatsCounter — 4 chiffres clés avec animation compteur au scroll.
 * Utilisé sur la home (variant light) et sur /qui-sommes-nous (variant navy).
 */
export function StatsCounter({ variant = "navy" }: StatsCounterProps) {
  const t = useTranslations("home");
  const isNavy = variant === "navy";

  return (
    <section
      className="py-16"
      style={
        isNavy
          ? { background: "linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-light) 100%)" }
          : { background: "var(--color-creme)" }
      }
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
                  // Light variant: chocolat (#2C1810) on cream → 12.9:1 ✓
                  // Navy variant: #E8705A on navy → 5.8:1 ✓
                  color: isNavy ? "#E8705A" : "var(--color-chocolat)",
                }}
              >
                <CountUp target={target} suffix={suffix} />
              </span>
              <span
                className="text-sm leading-snug"
                // Light variant: chocolat-light (#4A2E22) on cream → 7.5:1 ✓
                // Navy variant: white/65% on navy → 7.9:1 ✓
                style={{ color: isNavy ? "rgba(255,255,255,0.65)" : "var(--color-chocolat-light)" }}
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
