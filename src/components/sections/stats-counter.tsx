"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { target: 2347,  suffix: "+", label: "Familles accompagnées" },
  { target: 350,   suffix: "+", label: "Chouchouteurs vérifiés" },
  { target: 15000, suffix: "+", label: "Prestations réalisées" },
  { target: 98,    suffix: "%", label: "De satisfaction" },
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
          {STATS.map(({ target, suffix, label }) => (
            <div key={label} className="flex flex-col gap-2">
              <span
                className="font-normal leading-none"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  color: "#E8705A",
                }}
              >
                <CountUp target={target} suffix={suffix} />
              </span>
              <span
                className="text-sm leading-snug"
                style={{ color: isNavy ? "rgba(255,255,255,0.65)" : "var(--color-muted-foreground)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
