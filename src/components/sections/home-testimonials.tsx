"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Petcheri a trouvé la personne parfaite pour notre golden en moins de 24h. Suivi impeccable, photos régulières — on partait serein. Je ne ferai jamais autrement.",
    author: "Marie-Laure D.",
    pet: "Propriétaire de Sirius, Golden Retriever",
    rating: 5,
  },
  {
    text: "Ce qui m'a séduit, c'est le niveau d'exigence. Les chouchouteurs sont vraiment certifiés, l'assurance est réelle, et l'équipe répond en quelques minutes. Du vrai sur-mesure.",
    author: "Thomas A.",
    pet: "Propriétaire de Luna, Siberian Husky",
    rating: 5,
  },
  {
    text: "Mon chat est casanier et stressé. La chouchouteuse a pris le temps de le rencontrer avant, de comprendre ses habitudes. Il était parfaitement à l'aise à notre retour.",
    author: "Sophie C.",
    pet: "Propriétaire de Mochi, British Shorthair",
    rating: 5,
  },
];

export function HomeTestimonials() {
  const t = useTranslations("home");

  return (
    <section className="section-padding bg-[--color-ivoire]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Témoignages"
          title={t("testimonials_title")}
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={i}
              className="card-base p-7 flex flex-col gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Quote className="w-8 h-8 text-[--color-or]/40" />

              <p className="text-[--color-chocolat] leading-relaxed italic text-sm flex-1">
                "{item.text}"
              </p>

              {/* Rating */}
              <div className="flex gap-0.5">
                {[...Array(item.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[--color-or] text-[--color-or]" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-10 h-10 rounded-full bg-[--color-creme] border border-[--color-border] flex items-center justify-center text-sm font-semibold text-[--color-chocolat]">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[--color-chocolat]">{item.author}</p>
                  <p className="text-xs text-[--color-muted-foreground]">{item.pet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
