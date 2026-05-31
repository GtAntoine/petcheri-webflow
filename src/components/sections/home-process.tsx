"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./section-header";
import { Button } from "@/components/ui/button";
import UnorderedListIcon from "@/components/icons/unordered-list-icon";
import MagnifierIcon from "@/components/icons/magnifier-icon";
import HeartIcon from "@/components/icons/heart-icon";

const PETCHERI_APP = "https://app.petcheri.com";

type IconHandle = { startAnimation: () => void; stopAnimation: () => void };

const STEPS = [
  {
    Icon: UnorderedListIcon,
    num: "01",
    titleKey: "process_step1_title" as const,
    descKey:  "process_step1_desc"  as const,
  },
  {
    Icon: MagnifierIcon,
    num: "02",
    titleKey: "process_step2_title" as const,
    descKey:  "process_step2_desc"  as const,
  },
  {
    Icon: HeartIcon,
    num: "03",
    titleKey: "process_step3_title" as const,
    descKey:  "process_step3_desc"  as const,
  },
];

export function HomeProcess() {
  const t = useTranslations("home");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconRefs = useRef<Array<IconHandle | null>>([]);

  return (
    <section className="section-padding bg-[--color-creme]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label={t("process_label")}
          title={t("process_title")}
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-[--color-or]/30" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="flex flex-col items-center text-center cursor-default"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => iconRefs.current[i]?.startAnimation()}
              onMouseLeave={() => iconRefs.current[i]?.stopAnimation()}
            >
              {/* Icon circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-white border border-[--color-border] shadow-[--shadow-card] flex items-center justify-center">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <step.Icon
                    ref={(el: any) => { iconRefs.current[i] = el; }}
                    size={32}
                    color="var(--color-or)"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[--color-or] text-[--color-chocolat] text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
              </div>

              <h3 className="text-h3 text-[--color-chocolat] mb-3">
                {t(step.titleKey)}
              </h3>
              <p className="text-sm text-[--color-muted-foreground] leading-relaxed max-w-xs">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button variant="or" size="lg" asChild>
            <a href={PETCHERI_APP} target="_blank" rel="noopener noreferrer">
              {t("process_cta")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
