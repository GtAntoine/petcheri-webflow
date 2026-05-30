import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { HomeProcess } from "@/components/sections/home-process";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import SparklesIcon from "@/components/icons/sparkles-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import type { ComponentType } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("garde_chien.meta_title"),
    description: t("garde_chien.meta_description"),
    alternates: buildAlternates("/garde-chien", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const GARDE_OPTIONS: ReadonlyArray<{
  Icon: ComponentType<{ ref?: React.Ref<IconHandle>; size?: number; color?: string }>;
  title: string;
  desc: string;
  image: string;
  details: readonly string[];
  href: "/garde-journee" | "/garde-nuit" | "/garde-chien";
  cta: string;
}> = [
  {
    Icon: SparklesIcon,
    title: "Garde de jour",
    desc: "Une journée ou quelques heures d'absence ? On chouchoute votre toutou selon ses besoins et les vôtres !",
    image: ILLUSTRATIONS.dogDay,
    details: ["À domicile ou chez le chouchouteur", "Rapport photo en temps réel", "Assurance AXA incluse"],
    href: "/garde-journee",
    cta: "Réserver une garde de jour",
  },
  {
    Icon: PawPrintIcon,
    title: "Garde de nuit",
    desc: "Quelques jours de vacances en vue ? Nous lui préparons un séjour de wouf avec le chouchouteur de ses rêves !",
    image: ILLUSTRATIONS.gardeNuit,
    details: ["Hébergement chez le chouchouteur", "Suivi quotidien par message", "Assurance AXA incluse"],
    href: "/garde-nuit",
    cta: "Réserver une garde de nuit",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Garde à domicile",
    desc: "Votre chien est plus à l'aise chez lui ? Nous lui trouvons un chouchouteur de confiance pour le dorloter chez vous.",
    image: PHOTOS.chouchouteur1,
    details: ["Chouchouteur vient chez vous", "Routine habituelle respectée", "Assurance AXA incluse"],
    href: "/garde-chien",
    cta: "Réserver une garde à domicile",
  },
  {
    Icon: HeartHandshakeIcon,
    title: "Pension familiale",
    desc: "Votre toutou rêve d'une colo entre copains ? Faites-lui passer un séjour au vert dans une pension familiale !",
    image: PHOTOS.moodboard2,
    details: ["Ambiance familiale garantie", "Socialisation avec d'autres chiens", "Assurance AXA incluse"],
    href: "/garde-nuit",
    cta: "Réserver une pension",
  },
];

export default async function GardeChienPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("garde_chien.hero_badge")}
        title={
          <>
            {t("garde_chien.hero_title")}{" "}
            <span className="text-accent">{t("garde_chien.hero_title_accent")}</span>
          </>
        }
        subtitle={t("garde_chien.hero_subtitle")}
        ctas={[
          {
            label: "Recevoir un devis personnalisé",
            href: "https://app.petcheri.com",
            external: true,
            primary: true,
          },
          { label: "Voir tous les services chien", href: "/services-chien" },
        ]}
        image={PHOTOS.chouchouteur2}
        imageAlt="Chouchouteur avec un chien"
        trustBadges={["Chouchouteurs certifiés", "Assurance AXA incluse", "Rapport photo inclus"]}
        variant="warm"
      />

      {/* Garde options */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="De quoi a-t-il besoin ?"
            title="3 formules selon vos préférences"
            subtitle="Dites-nous tout sur lui et sur vous — nous vous proposerons une solution de garde 100% sur-mesure."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {GARDE_OPTIONS.map((opt) => (
              <div key={opt.title} className="card-base overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[--color-creme]">
                  <Image
                    src={opt.image}
                    alt={opt.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Icon badge */}
                  <span className="absolute top-3 left-3 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
                    <opt.Icon size={20} color="#E8705A" />
                  </span>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <h3 className="text-h3 text-[--color-chocolat]">{opt.title}</h3>
                  <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                    {opt.desc}
                  </p>
                  <ul className="space-y-1.5 mt-1">
                    {opt.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-[--color-muted-foreground]">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#E8705A" }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={opt.href}
                    className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: "#E8705A" }}
                  >
                    {opt.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="py-10 bg-[--color-chocolat]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { num: "400+", label: "Chouchouteurs certifiés" },
              { num: "4,9/5", label: "Note moyenne clients" },
              { num: "100%", label: "Assurés AXA" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold mb-1" style={{ color: "#E8705A" }}>{stat.num}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reused process section */}
      <HomeProcess />

      <CtaBanner
        title="Trouvez le gardien idéal pour votre chien"
        subtitle="En quelques minutes, nous identifions le chouchouteur certifié le plus adapté à votre animal."
        primaryCta={{
          label: "Recevoir un devis",
          href: "https://app.petcheri.com",
          external: true,
        }}
        secondaryCta={{ label: "Tous les services chien", href: "/services-chien" }}
      />

      <Footer />
    </>
  );
}
