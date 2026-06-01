"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  PROMOTIONS,
  PROMO_CATEGORIES,
  type PromoCategory,
} from "@/lib/promotions";
import { PromoCard } from "@/components/ui/promo-card";
import { CategoryPills } from "@/components/ui/category-pills";

export function NosBoonsPlansClient() {
  const t = useTranslations("pages");
  const ALL = t("nos_bons_plans.filter_all");
  const [active, setActive] = useState<PromoCategory | string>(ALL);

  const filtered =
    active === ALL
      ? PROMOTIONS.filter((p) => p.active)
      : PROMOTIONS.filter((p) => p.active && p.category === active);

  return (
    <>
      {/* Category filters */}
      <CategoryPills
        items={[
          { label: ALL, count: PROMOTIONS.filter((p) => p.active).length },
          ...PROMO_CATEGORIES.map((cat) => ({
            label: cat,
            count: PROMOTIONS.filter((p) => p.active && p.category === cat).length,
          })),
        ]}
        active={active}
        onChange={(label) => setActive(label as PromoCategory | string)}
        className="mb-12"
      />

      {/* Grid */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {filtered.map((promo, i) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <PromoCard promo={promo} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center py-16 text-[--color-muted-foreground]">
          {t("nos_bons_plans.empty")}
        </p>
      )}
    </>
  );
}
