"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PROMOTIONS,
  PROMO_CATEGORIES,
  type PromoCategory,
} from "@/lib/promotions";
import { PromoCard } from "@/components/ui/promo-card";

const ALL = "Tous";

export function NosBoonsPlansClient() {
  const [active, setActive] = useState<PromoCategory | typeof ALL>(ALL);

  const filtered =
    active === ALL
      ? PROMOTIONS.filter((p) => p.active)
      : PROMOTIONS.filter((p) => p.active && p.category === active);

  return (
    <>
      {/* Category filters */}
      <div className="flex items-center gap-2 flex-wrap justify-center mb-12">
        <button
          onClick={() => setActive(ALL)}
          className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
          style={
            active === ALL
              ? { background: "#E8705A", color: "#fff", boxShadow: "0 2px 8px rgba(232,112,90,0.35)" }
              : { background: "#fff", color: "var(--color-chocolat)", border: "1px solid var(--color-border)" }
          }
        >
          Tous ({PROMOTIONS.filter((p) => p.active).length})
        </button>
        {PROMO_CATEGORIES.map((cat) => {
          const count = PROMOTIONS.filter((p) => p.active && p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
              style={
                active === cat
                  ? { background: "#E8705A", color: "#fff", boxShadow: "0 2px 8px rgba(232,112,90,0.35)" }
                  : { background: "#fff", color: "var(--color-chocolat)", border: "1px solid var(--color-border)" }
              }
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
          Aucun bon plan dans cette catégorie pour le moment.
        </p>
      )}
    </>
  );
}
