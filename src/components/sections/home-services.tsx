"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "./section-header";
import { Button } from "@/components/ui/button";
import { PHOTOS, ILLUSTRATIONS } from "@/lib/assets";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Service image/href pairs — static data, labels translated via t()
const SERVICE_ITEMS = [
  { href: "/garde-chien"           as const, image: PHOTOS.moodboard2,        titleKey: "service_garde_domicile_title" as const, descKey: "service_garde_domicile_desc" as const, tagKey: "service_garde_domicile_tag" as const },
  { href: "/garde-nuit"            as const, image: ILLUSTRATIONS.gardeNuit,  titleKey: "service_garde_nuit_title"    as const, descKey: "service_garde_nuit_desc"    as const, tagKey: "service_garde_nuit_tag"    as const },
  { href: "/garde-chat"            as const, image: ILLUSTRATIONS.catSitting, titleKey: "service_visite_chat_title"   as const, descKey: "service_visite_chat_desc"   as const, tagKey: "service_visite_chat_tag"   as const },
  { href: "/comportement-education"as const, image: ILLUSTRATIONS.dogDay,     titleKey: "service_comportement_title"  as const, descKey: "service_comportement_desc"  as const, tagKey: "service_comportement_tag"  as const },
  { href: "/toilettage"            as const, image: ILLUSTRATIONS.grooming,   titleKey: "service_toilettage_title"    as const, descKey: "service_toilettage_desc"    as const, tagKey: "service_toilettage_tag"    as const },
  { href: "/transport"             as const, image: PHOTOS.moodboard5,        titleKey: "service_transport_title"     as const, descKey: "service_transport_desc"     as const, tagKey: "service_transport_tag"     as const },
] as const;

export function HomeServices() {
  const t = useTranslations("home");

  return (
    <section className="section-padding bg-[--color-ivoire]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label={t("services_label")}
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
          {SERVICE_ITEMS.map((service) => (
            <motion.div key={service.href} variants={itemVariants}>
              <Link href={service.href} className="group block h-full">
                <div className="card-base overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[--color-creme]">
                    <Image
                      src={service.image}
                      alt={t(service.titleKey)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-[--color-chocolat] px-3 py-1 rounded-full">
                      {t(service.tagKey)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-2">
                    <h3 className="text-h3 text-[--color-chocolat] group-hover:text-[--color-or] transition-colors">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">
                      {t(service.descKey)}
                    </p>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[--color-or] mt-2 group-hover:gap-2.5 transition-all">
                      {t("services_learn_more")}
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
            <Link href="/nos-services">{t("services_cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
