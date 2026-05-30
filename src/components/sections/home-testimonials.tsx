"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const FEATURED = {
  text: "Voilà 4 ans que je confie ma chienne Ness et mon chat Sherlock à l'équipe Petcheri en toute confiance et sérénité. Étant régulièrement en déplacement, c'est un vrai luxe de pouvoir compter sur un service aussi fiable et flexible. Un immense merci à la team et mention spéciale à Gaetan qui s'occupe à merveille de mes deux bébés.",
  author: "Aurélie",
  role: "maman de Ness & Sherlock",
  initials: "A",
};

const SIDE_REVIEWS = [
  {
    text: "Très bon service ! On nous a aidés à trouver à la fois un promeneur anglophone et un dog-sitter. Nous les utiliserons à nouveau !",
    author: "Luke B.",
    role: "papa de Tusk",
    initials: "L",
  },
  {
    text: "Ils envoient des photos et des vidéos quotidiennement pendant notre absence. Dexter est désormais véritablement excité lorsqu'il voit sa sitter.",
    author: "Rudy M.",
    role: "papa de Dexter",
    initials: "R",
  },
  {
    text: "Personnel très attentif et attentionné. Expérimenté, réactif, et tellement facile. Une joie absolue de les avoir dans nos vies.",
    author: "Mariela L.",
    role: "maman de Cali",
    initials: "M",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[--color-or] text-[--color-or]" />
      ))}
    </div>
  );
}

function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) {
  const cls =
    size === "sm"
      ? "w-8 h-8 text-xs"
      : "w-11 h-11 text-sm";
  return (
    <div
      className={`${cls} rounded-full bg-[--color-creme] border border-[--color-border] flex items-center justify-center font-semibold text-[--color-chocolat] shrink-0`}
    >
      {initials}
    </div>
  );
}

export function HomeTestimonials() {
  return (
    <section className="section-padding bg-[--color-ivoire]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-3 block">
              Vos avis
            </span>
            <h2
              className="text-[--color-chocolat] font-normal"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                lineHeight: 1.15,
              }}
            >
              Ils nous confient ce qu&apos;ils ont<br className="hidden sm:block" /> de plus précieux.
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <Stars />
            <span
              className="text-[--color-chocolat] font-semibold text-lg"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              4,9
            </span>
            <span className="text-sm text-[--color-muted-foreground]">/ 5</span>
          </div>
        </div>

        {/* Featured left + 3 stacked right */}
        <div className="grid lg:grid-cols-2 gap-5 items-stretch">

          {/* Featured */}
          <motion.div
            className="card-base p-8 flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Stars />
            <p
              className="text-[--color-chocolat] leading-relaxed italic flex-1"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              }}
            >
              &ldquo;{FEATURED.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-[--color-border]">
              <Avatar initials={FEATURED.initials} />
              <div>
                <p className="text-sm font-semibold text-[--color-chocolat]">{FEATURED.author}</p>
                <p className="text-xs text-[--color-muted-foreground]">{FEATURED.role}</p>
              </div>
            </div>
          </motion.div>

          {/* 3 stacked */}
          <div className="flex flex-col gap-4">
            {SIDE_REVIEWS.map((item, i) => (
              <motion.div
                key={i}
                className="card-base p-5 flex flex-col gap-3 flex-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <p className="text-sm text-[--color-chocolat] leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5 mt-auto">
                  <Avatar initials={item.initials} size="sm" />
                  <div className="leading-none">
                    <span className="text-xs font-semibold text-[--color-chocolat]">{item.author}</span>
                    <span className="text-xs text-[--color-muted-foreground]"> · {item.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
