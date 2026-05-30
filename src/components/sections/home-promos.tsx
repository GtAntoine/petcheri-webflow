"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import { PROMOTIONS } from "@/lib/promotions";
import { PromoCard } from "@/components/ui/promo-card";
import { SectionHeader } from "./section-header";

// Promos à mettre en avant sur la homepage — 1 par catégorie principale
const FEATURED_IDS = ["elmut", "kozoo", "homycat"];

const featured = FEATURED_IDS.map((id) =>
  PROMOTIONS.find((p) => p.id === id)!
).filter(Boolean);

export function HomePromos() {
  return (
    <section className="section-padding bg-[--color-creme]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Nos bons plans"
          title="Des offres exclusives pour vos animaux"
          subtitle="Des réductions négociées chez nos partenaires triés sur le volet — alimentation, santé, accessoires et bien plus."
          className="mb-14"
        />

        <div className="grid md:grid-cols-3 gap-6">
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
            <span>15 offres partenaires disponibles</span>
          </div>
          <Link
            href="/nos-bons-plans"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
            style={{ background: "#E8705A" }}
          >
            Voir tous les bons plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
