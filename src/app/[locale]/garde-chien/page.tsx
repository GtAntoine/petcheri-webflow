import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SITE_STATS, BOOKING_URL } from "@/lib/site-stats";
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

export default async function GardeChienPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const GARDE_OPTIONS: Array<{
    Icon: ComponentType<{ ref?: React.Ref<IconHandle>; size?: number; color?: string }>;
    title: string;
    desc: string;
    image: string;
    details: string[];
    href: "/garde-journee" | "/garde-nuit" | "/garde-chien";
    cta: string;
  }> = [
    {
      Icon: SparklesIcon,
      title: t("garde_chien.opt_jour_title"),
      desc: t("garde_chien.opt_jour_desc"),
      image: ILLUSTRATIONS.dogDay,
      details: [t("garde_chien.opt_jour_d1"), t("garde_chien.opt_jour_d2"), t("garde_chien.opt_jour_d3")],
      href: "/garde-journee",
      cta: t("garde_chien.opt_jour_cta"),
    },
    {
      Icon: PawPrintIcon,
      title: t("garde_chien.opt_nuit_title"),
      desc: t("garde_chien.opt_nuit_desc"),
      image: ILLUSTRATIONS.gardeNuit,
      details: [t("garde_chien.opt_nuit_d1"), t("garde_chien.opt_nuit_d2"), t("garde_chien.opt_nuit_d3")],
      href: "/garde-nuit",
      cta: t("garde_chien.opt_nuit_cta"),
    },
    {
      Icon: ShieldCheckIcon,
      title: t("garde_chien.opt_dom_title"),
      desc: t("garde_chien.opt_dom_desc"),
      image: PHOTOS.chouchouteur1,
      details: [t("garde_chien.opt_dom_d1"), t("garde_chien.opt_dom_d2"), t("garde_chien.opt_dom_d3")],
      href: "/garde-chien",
      cta: t("garde_chien.opt_dom_cta"),
    },
    {
      Icon: HeartHandshakeIcon,
      title: t("garde_chien.opt_pension_title"),
      desc: t("garde_chien.opt_pension_desc"),
      image: PHOTOS.moodboard2,
      details: [t("garde_chien.opt_pension_d1"), t("garde_chien.opt_pension_d2"), t("garde_chien.opt_pension_d3")],
      href: "/garde-nuit",
      cta: t("garde_chien.opt_pension_cta"),
    },
  ];

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
            label: t("garde_chien.hero_cta_primary"),
            href: BOOKING_URL,
            external: true,
            primary: true,
          },
          { label: t("garde_chien.hero_cta_secondary"), href: "/services-chien" },
        ]}
        image={PHOTOS.chouchouteur2}
        imageAlt={t("garde_chien.hero_image_alt")}
        trustBadges={[t("garde_chien.trust_1"), t("garde_chien.trust_2"), t("garde_chien.trust_3")]}
        variant="warm"
      />

      {/* Garde options */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("garde_chien.options_label")}
            title={t("garde_chien.options_title")}
            subtitle={t("garde_chien.options_subtitle")}
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
              { num: "400+", label: t("garde_chien.stats_1_label") },
              { num: `${SITE_STATS.googleRating.toLocaleString("fr-FR")}/5`, label: t("garde_chien.stats_2_label") },
              { num: "100%", label: t("garde_chien.stats_3_label") },
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
        title={t("garde_chien.banner_title")}
        subtitle={t("garde_chien.banner_subtitle")}
        primaryCta={{ label: t("garde_chien.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("garde_chien.banner_secondary"), href: "/services-chien" }}
      />

      <Footer />
    </>
  );
}
