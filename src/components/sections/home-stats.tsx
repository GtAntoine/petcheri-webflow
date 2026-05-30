"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import UsersIcon from "@/components/icons/users-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import FlameIcon from "@/components/icons/flame-icon";

type IconHandle = { startAnimation: () => void; stopAnimation: () => void };
const ICON_COLOR = "var(--color-or)";

export function HomeStats() {
  const t = useTranslations("home");
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // One ref per icon — typed as the common handle shape all itshover icons share
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconRefs = useRef<Array<IconHandle | null>>([]);

  const STATS = [
    { Icon: UsersIcon,       value: "400+", key: "stats_providers"    as const },
    { Icon: SparklesIcon,    value: "98%",  key: "stats_satisfaction" as const },
    { Icon: ShieldCheckIcon, value: "AXA",  key: "stats_insurance"    as const },
    { Icon: FlameIcon,       value: "2×",   label: "Prix de l'innovation" },
  ] as const;

  return (
    <section className="py-14 bg-[--color-creme]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[--color-border]">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center px-4 py-2 cursor-default"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => iconRefs.current[i]?.startAnimation()}
              onMouseLeave={() => iconRefs.current[i]?.stopAnimation()}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <stat.Icon
                ref={(el: any) => { iconRefs.current[i] = el; }}
                size={22}
                color={ICON_COLOR}
                strokeWidth={1.6}
                className="mb-3"
              />
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
          ))}
        </div>
      </div>
    </section>
  );
}
