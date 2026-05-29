"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Users, Star, Award } from "lucide-react";

const STATS = [
  { icon: Users, value: "400+", key: "stats_providers" as const },
  { icon: Star, value: "98%", key: "stats_satisfaction" as const },
  { icon: ShieldCheck, value: "AXA", key: "stats_insurance" as const },
  { icon: Award, value: "2×", label: "Prix de l'innovation" },
] as const;

export function HomeStats() {
  const t = useTranslations("home");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-14 bg-[--color-creme]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[--color-border]">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center px-4 py-2"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Icon className="w-5 h-5 text-[--color-or] mb-3" />
                <span
                  className="font-normal mb-1"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.875rem", color: "#2C1810" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-[--color-muted-foreground] leading-snug">
                  {"key" in stat ? t(stat.key) : stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
