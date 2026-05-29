"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "./section-header";
import { Button } from "@/components/ui/button";
import { PHOTOS, ILLUSTRATIONS } from "@/lib/assets";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    href: "/garde-chien" as const,
    title: "Garde à domicile",
    desc: "Votre chien reste dans son environnement. Un chouchouteur certifié vient chez vous.",
    image: PHOTOS.moodboard2,
    tag: "Chien",
  },
  {
    href: "/garde-nuit" as const,
    title: "Garde de nuit",
    desc: "Trois formules selon vos préférences — chez vous, chez le chouchouteur ou en pension.",
    image: ILLUSTRATIONS.gardeNuit,
    tag: "Chien · Chat",
  },
  {
    href: "/garde-chat" as const,
    title: "Visite & Garde de chats",
    desc: "Visites quotidiennes ou hôtel 5 étoiles — votre félin reste dans ses habitudes.",
    image: ILLUSTRATIONS.catSitting,
    tag: "Chat",
  },
  {
    href: "/comportement-education" as const,
    title: "Comportement & Éducation",
    desc: "Éducation positive, rééducation, gestion des peurs — par des comportementalistes certifiés.",
    image: ILLUSTRATIONS.dogDay,
    tag: "Chien · Chat",
  },
  {
    href: "/toilettage" as const,
    title: "Toilettage",
    desc: "Bain, coupe, brushing — pour un animal propre, élégant et heureux.",
    image: ILLUSTRATIONS.grooming,
    tag: "Chien · Chat",
  },
  {
    href: "/transport" as const,
    title: "Transport animalier",
    desc: "Taxi animalier sécurisé pour vos rendez-vous vétérinaires ou vos déplacements.",
    image: PHOTOS.moodboard5,
    tag: "Tous animaux",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function HomeServices() {
  const t = useTranslations("home");

  return (
    <section className="section-padding bg-[--color-ivoire]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Nos prestations"
          title={t("services_title")}
          subtitle={t("services_subtitle")}
          className="mb-16"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SERVICES.map((service) => (
            <motion.div key={service.href} variants={itemVariants}>
              <Link href={service.href} className="group block h-full">
                <div className="card-base overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[--color-creme]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-[--color-chocolat] px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-2">
                    <h3 className="text-h3 text-[--color-chocolat] group-hover:text-[--color-or] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">
                      {service.desc}
                    </p>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[--color-or] mt-2 group-hover:gap-2.5 transition-all">
                      En savoir plus
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/nos-services">Voir tous nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
