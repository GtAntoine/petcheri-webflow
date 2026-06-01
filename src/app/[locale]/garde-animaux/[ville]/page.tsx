import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { HomeProcess } from "@/components/sections/home-process";
import { GuaranteesSection } from "@/components/sections/guarantees-section";
import { AnimatedCardHorizontal } from "@/components/ui/animated-card-horizontal";
import { routing } from "@/i18n/routing";
import { CITIES, getCity, totalCitySitters } from "@/lib/cities-data";
import { BOOKING_URL } from "@/lib/site-stats";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import SearchIcon from "@/components/icons/search-icon";
import HomeIcon from "@/components/icons/home-icon";
import FootprintsIcon from "@/components/icons/footprints-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import ScissorsIcon from "@/components/icons/scissors-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import TruckIcon from "@/components/icons/truck-icon";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://petcheri.com";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; ville: string }>;
}): Promise<Metadata> {
  const { locale, ville } = await params;
  const city = getCity(ville);
  if (!city) return {};

  const t = await getTranslations({ locale, namespace: "pages" });
  const slug = `/garde-animaux/${ville}`;
  const canonical = locale === "fr" ? `${BASE_URL}${slug}` : `${BASE_URL}/en${slug}`;

  return {
    title:       t("garde_ville.meta_title",       { city: city.name }),
    description: t("garde_ville.meta_description", { city: city.name, sitters: totalCitySitters(city) }),
    alternates: {
      canonical,
      languages: {
        fr: `${BASE_URL}${slug}`,
        en: `${BASE_URL}/en${slug}`,
        "x-default": `${BASE_URL}${slug}`,
      },
    },
  };
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CITIES.map((c) => ({ locale, ville: c.slug }))
  );
}

// Revalider toutes les 24h
export const revalidate = 86400;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GardeAnimauxVillePage({
  params,
}: {
  params: Promise<{ locale: string; ville: string }>;
}) {
  const { locale, ville } = await params;
  setRequestLocale(locale);

  const city = getCity(ville);
  if (!city) notFound();

  const t = await getTranslations({ locale, namespace: "pages" });

  // ── Services cards ─────────────────────────────────────────────────────────
  const SERVICE_CARDS = [
    { label: t("garde_ville.svc_garde_label"),        sublabel: t("garde_ville.svc_garde_sublabel"),        count: city.services.garde,        Icon: HomeIcon },
    { label: t("garde_ville.svc_promenade_label"),    sublabel: t("garde_ville.svc_promenade_sublabel"),    count: city.services.promenade,    Icon: FootprintsIcon },
    { label: t("garde_ville.svc_visites_label"),      sublabel: t("garde_ville.svc_visites_sublabel"),      count: city.services.visites,      Icon: PawPrintIcon },
    { label: t("garde_ville.svc_toilettage_label"),   sublabel: t("garde_ville.svc_toilettage_sublabel"),   count: city.services.toilettage,   Icon: ScissorsIcon },
    { label: t("garde_ville.svc_comportement_label"), sublabel: t("garde_ville.svc_comportement_sublabel"), count: city.services.comportement, Icon: GraduationCapIcon },
    { label: t("garde_ville.svc_transport_label"),    sublabel: t("garde_ville.svc_transport_sublabel"),    count: city.services.transport,    Icon: TruckIcon },
  ];

  const GUARANTEES = [
    { Icon: HeartHandshakeIcon, title: t("garde_ville.guarantee_matching_title"),  desc: t("garde_ville.guarantee_matching_desc")  },
    { Icon: SparklesIcon,       title: t("garde_ville.guarantee_certified_title"), desc: t("garde_ville.guarantee_certified_desc") },
    { Icon: ShieldCheckIcon,    title: t("garde_ville.guarantee_insurance_title"), desc: t("garde_ville.guarantee_insurance_desc") },
    { Icon: SearchIcon,         title: t("garde_ville.guarantee_tracking_title"),  desc: t("garde_ville.guarantee_tracking_desc")  },
  ];

  return (
    <>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="pt-28 pb-20 px-6"
        style={{ background: "var(--gradient-about-hero)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-[--color-muted-foreground] mb-6">
            <span>France</span>
            <span>›</span>
            <span className="font-medium text-[--color-chocolat]">{city.name}</span>
          </nav>

          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-4 block">
            {t("garde_ville.concierge_label")}
          </span>

          <h1
            className="text-[--color-chocolat] mb-5 font-normal"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.15 }}
          >
            {t("garde_ville.hero_title_prefix")}
            <span className="text-accent">{city.name}</span>
          </h1>

          <p className="text-lead mb-8 max-w-2xl mx-auto">
            {t("garde_ville.hero_subtitle")}
          </p>

          {/* Stats inline */}
          <div className="flex items-center justify-center flex-wrap gap-8 mb-10">
            <div className="flex flex-col items-center">
              <span
                className="font-normal text-[--color-chocolat]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
              >
                {totalCitySitters(city)}+
              </span>
              <span className="text-sm text-[--color-muted-foreground] mt-1">
                {t("garde_ville.stat_sitters_label")}
              </span>
            </div>
            <div className="w-px h-10 bg-[--color-border] hidden sm:block" />
            <div className="flex flex-col items-center">
              <span
                className="font-normal text-[--color-chocolat]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
              >
                4,9/5
              </span>
              <span className="text-sm text-[--color-muted-foreground] mt-1">
                {t("garde_ville.stat_rating_label")}
              </span>
            </div>
            <div className="w-px h-10 bg-[--color-border] hidden sm:block" />
            <div className="flex flex-col items-center">
              <span
                className="font-normal text-[--color-chocolat]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
              >
                24h
              </span>
              <span className="text-sm text-[--color-muted-foreground] mt-1">
                {t("garde_ville.stat_match_label")}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
              style={{ background: "var(--color-rouge)" }}
            >
              {t("garde_ville.cta_find")}
            </a>
            <a
              href="/nos-services"
              className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-3.5 text-sm font-semibold text-[--color-chocolat] bg-white/70 hover:bg-white transition-all"
              style={{ borderColor: "var(--color-rouge-light)" }}
            >
              {t("garde_ville.cta_see_services")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Services disponibles ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("garde_ville.services_label")}
            title={t("garde_ville.services_title", { city: city.name })}
            subtitle={t("garde_ville.services_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_CARDS.map((svc) => (
              <AnimatedCardHorizontal
                key={svc.label}
                Icon={svc.Icon}
                iconSize={22}
                iconStrokeWidth={1.5}
                className="p-6 items-start"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p
                    className="font-medium text-[--color-chocolat]"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem" }}
                  >
                    {svc.label}
                  </p>
                  <span
                    className="text-sm font-semibold shrink-0 px-2.5 py-0.5 rounded-full"
                    style={{ background: "var(--color-peach)", color: "var(--color-rouge)" }}
                  >
                    {svc.count}+
                  </span>
                </div>
                <p className="text-xs text-[--color-muted-foreground]">{svc.sublabel}</p>
              </AnimatedCardHorizontal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Garanties ───────────────────────────────────────────────────────── */}
      <GuaranteesSection
        label={t("garde_ville.guarantees_label")}
        title={t("garde_ville.guarantees_title")}
        subtitle={t("garde_ville.guarantees_subtitle")}
        guarantees={GUARANTEES}
      />

      {/* ── Comment ça marche ───────────────────────────────────────────────── */}
      <HomeProcess />


      <CtaBanner
        title={t("garde_ville.cta_title", { city: city.name })}
        subtitle={t("garde_ville.cta_subtitle")}
        primaryCta={{
          label:    t("garde_ville.cta_primary"),
          href:     BOOKING_URL,
          external: true,
        }}
        secondaryCta={{
          label: t("garde_ville.cta_secondary"),
          href:  "/qui-sommes-nous",
        }}
      />

      <Footer />
    </>
  );
}
