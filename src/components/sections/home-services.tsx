"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "./section-header";
import { Button } from "@/components/ui/button";
import { SERVICE_ICONS } from "@/lib/assets";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

// Service items — static data, labels translated via t()
const SERVICE_ITEMS = [
  { href: "/garde-chien"            as const, icon: SERVICE_ICONS.dog,       titleKey: "service_dogsitting_title"   as const, descKey: "service_dogsitting_desc"   as const },
  { href: "/garde-chat"             as const, icon: SERVICE_ICONS.catNac,    titleKey: "service_visite_chat_title"  as const, descKey: "service_visite_chat_desc"  as const },
  { href: "/services-chien"         as const, icon: SERVICE_ICONS.walking,   titleKey: "service_promenade_title"    as const, descKey: "service_promenade_desc"    as const },
  { href: "/toilettage"             as const, icon: SERVICE_ICONS.bath,      titleKey: "service_toilettage_title"   as const, descKey: "service_toilettage_desc"   as const },
  { href: "/comportement-education" as const, icon: SERVICE_ICONS.education, titleKey: "service_comportement_title" as const, descKey: "service_comportement_desc" as const },
  { href: "/bien-etre"              as const, icon: SERVICE_ICONS.care,      titleKey: "service_bienetre_title"     as const, descKey: "service_bienetre_desc"     as const },
  { href: "/transport"              as const, icon: SERVICE_ICONS.transport, titleKey: "service_transport_title"    as const, descKey: "service_transport_desc"    as const },
  { href: "/services-nac"           as const, icon: SERVICE_ICONS.travel,    titleKey: "service_autres_title"       as const, descKey: "service_autres_desc"       as const },
] as const;

export function HomeServices() {
  const t = useTranslations("home");

  return (
    <section className="section-padding bg-[--color-ivoire]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title={t("services_title")}
          subtitle={t("services_subtitle")}
          className="mb-16"
        />

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SERVICE_ITEMS.map((service) => (
            <motion.div key={service.href} variants={itemVariants}>
              <Link href={service.href} className="group block h-full">
                <div className="card-base overflow-hidden h-full flex flex-col">

                  {/* Icon area */}
                  <div
                    className="flex items-center justify-center px-8 pt-8 pb-6"
                    style={{ background: "linear-gradient(135deg, #FFF9F0 0%, #FFF0E8 100%)" }}
                  >
                    <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={service.icon}
                        alt={t(service.titleKey)}
                        fill
                        className="object-contain"
                        sizes="96px"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-2">
                    <h3
                      className="text-[--color-chocolat] font-medium group-hover:text-[--color-rouge] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
                    >
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">
                      {t(service.descKey)}
                    </p>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[--color-rouge-light] mt-2 group-hover:gap-2.5 transition-all">
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
