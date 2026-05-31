"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { Link } from "@/i18n/navigation";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  { qKey: "q1", aKey: "a1" },
  { qKey: "q2", aKey: "a2" },
  { qKey: "q3", aKey: "a3" },
  { qKey: "q4", aKey: "a4" },
  { qKey: "q5", aKey: "a5" },
  { qKey: "q6", aKey: "a6" },
] as const;

// ─── HomeFaq ──────────────────────────────────────────────────────────────────

export function HomeFaq() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-3xl mx-auto px-6">

        <SectionHeader
          label={t("label")}
          title={t("title")}
          className="mb-12"
        />

        <div className="divide-y divide-[--color-border]">
          {FAQ_ITEMS.map(({ qKey, aKey }, i) => {
            const isOpen = openIndex === i;
            const isLast = i === FAQ_ITEMS.length - 1;

            return (
              <div key={qKey} className="py-5">
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full text-left gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base font-semibold text-[--color-chocolat] group-hover:text-[--color-or] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {t(qKey)}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                      isOpen
                        ? "border-[--color-chocolat] bg-[--color-chocolat] text-white"
                        : "border-[--color-border] text-[--color-chocolat] group-hover:border-[--color-chocolat]"
                    }`}
                  >
                    {isOpen
                      ? <Minus className="w-3.5 h-3.5" />
                      : <Plus  className="w-3.5 h-3.5" />
                    }
                  </span>
                </button>

                {/* Answer — CSS grid-rows accordion */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 300ms ease",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-[--color-muted-foreground] leading-relaxed pt-3 pb-1">
                      {t(aKey)}
                    </p>
                    {isLast && (
                      <Link
                        href="/assurance"
                        className="inline-block text-sm font-medium text-[--color-or] hover:underline mt-1"
                      >
                        {t("a6_insurance_link")}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
