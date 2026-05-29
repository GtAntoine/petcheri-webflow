"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { ClipboardList, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const PETCHERI_APP = "https://app.petcheri.com";

const STEPS = [
  {
    icon: ClipboardList,
    num: "01",
    titleKey: "process_step1_title" as const,
    descKey: "process_step1_desc" as const,
  },
  {
    icon: Search,
    num: "02",
    titleKey: "process_step2_title" as const,
    descKey: "process_step2_desc" as const,
  },
  {
    icon: Heart,
    num: "03",
    titleKey: "process_step3_title" as const,
    descKey: "process_step3_desc" as const,
  },
];

export function HomeProcess() {
  const t = useTranslations("home");

  return (
    <section className="section-padding bg-[--color-creme]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Notre méthode"
          title={t("process_title")}
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-[--color-or]/30" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Icon circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-white border border-[--color-border] shadow-[--shadow-card] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[--color-or]" />
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
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Button variant="or" size="lg" asChild>
            <a href={PETCHERI_APP} target="_blank" rel="noopener noreferrer">
              Démarrer ma demande
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
