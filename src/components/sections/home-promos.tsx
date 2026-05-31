"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Gift } from "lucide-react";
import { PROMOTIONS } from "@/lib/promotions";
import { PromoCard } from "@/components/ui/promo-card";
import { SectionHeader } from "./section-header";

// Promos à mettre en avant sur la homepage — 4 cartes, catégories variées
const FEATURED_IDS = ["elmut", "kozoo", "homycat", "truffe-moustache"];

const featured = FEATURED_IDS.map((id) =>
  PROMOTIONS.find((p) => p.id === id)!
).filter(Boolean);

export function HomePromos() {
  const t = useTranslations("home");

  return (
    <section className="section-padding bg-[--color-creme]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label={t("promos_label")}
          title={t("promos_title")}
          subtitle={t("promos_subtitle")}
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <PromoCard promo={promo} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 text-sm text-[--color-muted-foreground]">
            <Gift className="w-4 h-4 text-[--color-or]" />
            <span>{t("promos_count")}</span>
          </div>
          <Link
            href="/nos-bons-plans"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
            style={{ background: "#E8705A" }}
          >
            {t("promos_cta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
