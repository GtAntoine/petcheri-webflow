import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { HomeProcess } from "@/components/sections/home-process";
import { routing } from "@/i18n/routing";
import { PARIS_ZONES, getZone, totalSitters } from "@/lib/zones-data";
import { BOOKING_URL } from "@/lib/site-stats";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import SearchIcon from "@/components/icons/search-icon";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://petcheri.com";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; arrondissement: string }>;
}): Promise<Metadata> {
  const { locale, arrondissement } = await params;
  const zone = getZone(arrondissement);
  if (!zone) return {};

  const title =
    locale === "fr"
      ? `Garde d'animaux Paris ${zone.arrondissement} — Petcheri`
      : `Pet sitting Paris ${zone.arrondissement} — Petcheri`;

  const description =
    locale === "fr"
      ? `${totalSitters(zone)} prestataires certifiés disponibles dans le ${zone.label} pour la garde de chien, chat et NAC. Service de conciergerie avec assurance AXA incluse.`
      : `${totalSitters(zone)} certified petsitters available in ${zone.label}. Dog, cat and exotic pet care with AXA insurance included.`;

  const slug = `/garde-animaux-paris/${arrondissement}`;
  const canonical =
    locale === "fr"
      ? `${BASE_URL}${slug}`
      : `${BASE_URL}/en${slug}`;

  return {
    title,
    description,
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
    PARIS_ZONES.map((z) => ({ locale, arrondissement: z.arrondissement }))
  );
}

// Revalider toutes les 24h — sera utile quand les données viennent de l'API
export const revalidate = 86400;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GardeAnimauxParisPage({
  params,
}: {
  params: Promise<{ locale: string; arrondissement: string }>;
}) {
  const { locale, arrondissement } = await params;
  setRequestLocale(locale);

  const zone = getZone(arrondissement);
  if (!zone) notFound();

  const t = await getTranslations({ locale, namespace: "pages" });

  // ── Services cards ─────────────────────────────────────────────────────────
  const SERVICE_CARDS = [
    { label: t("garde_paris.svc_garde_label"),        sublabel: t("garde_paris.svc_garde_sublabel"),        count: zone.services.garde,        emoji: "🏠" },
    { label: t("garde_paris.svc_promenade_label"),    sublabel: t("garde_paris.svc_promenade_sublabel"),    count: zone.services.promenade,    emoji: "🦮" },
    { label: t("garde_paris.svc_visites_label"),      sublabel: t("garde_paris.svc_visites_sublabel"),      count: zone.services.visites,      emoji: "🐱" },
    { label: t("garde_paris.svc_toilettage_label"),   sublabel: t("garde_paris.svc_toilettage_sublabel"),   count: zone.services.toilettage,   emoji: "✂️" },
    { label: t("garde_paris.svc_comportement_label"), sublabel: t("garde_paris.svc_comportement_sublabel"), count: zone.services.comportement, emoji: "🎓" },
    { label: t("garde_paris.svc_transport_label"),    sublabel: t("garde_paris.svc_transport_sublabel"),    count: zone.services.transport,    emoji: "🚗" },
  ];

  const GUARANTEES = [
    { Icon: HeartHandshakeIcon, title: t("garde_paris.guarantee_matching_title"),  desc: t("garde_paris.guarantee_matching_desc")  },
    { Icon: SparklesIcon,       title: t("garde_paris.guarantee_certified_title"), desc: t("garde_paris.guarantee_certified_desc") },
    { Icon: ShieldCheckIcon,    title: t("garde_paris.guarantee_insurance_title"), desc: t("garde_paris.guarantee_insurance_desc") },
    { Icon: SearchIcon,         title: t("garde_paris.guarantee_tracking_title"),  desc: t("garde_paris.guarantee_tracking_desc")  },
  ];

  return (
    <>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="pt-28 pb-20 px-6"
        style={{ background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-[--color-muted-foreground] mb-6">
            <span>Paris</span>
            <span>›</span>
            <span className="font-medium text-[--color-chocolat]">{zone.label}</span>
          </nav>

          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-4 block">
            {t("garde_paris.concierge_label")}
          </span>

          <h1
            className="text-[--color-chocolat] mb-5 font-normal"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.15 }}
          >
            {t("garde_paris.hero_title_prefix")}
            <span className="text-accent">{zone.arrondissement}</span>
          </h1>

          <p className="text-lead mb-8 max-w-2xl mx-auto">
            {t("garde_paris.hero_subtitle")}
          </p>

          {/* Stats inline */}
          <div className="flex items-center justify-center flex-wrap gap-8 mb-10">
            <div className="flex flex-col items-center">
              <span
                className="font-normal text-[--color-chocolat]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
              >
                {totalSitters(zone)}+
              </span>
              <span className="text-sm text-[--color-muted-foreground] mt-1">
                {t("garde_paris.stat_sitters_label")}
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
                {t("garde_paris.stat_rating_label")}
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
                {t("garde_paris.stat_match_label")}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
              style={{ background: "#C0432D" }}
            >
              {t("garde_paris.cta_find")}
            </a>
            <a
              href="/nos-services"
              className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-3.5 text-sm font-semibold text-[--color-chocolat] bg-white/70 hover:bg-white transition-all"
              style={{ borderColor: "#E8705A" }}
            >
              {t("garde_paris.cta_see_services")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Services disponibles ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("garde_paris.services_label")}
            title={t("garde_paris.services_title", { arrondissement: zone.arrondissement })}
            subtitle={t("garde_paris.services_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_CARDS.map((svc) => (
              <div key={svc.label} className="card-base p-6 flex items-start gap-4">
                <span className="text-3xl shrink-0 mt-0.5">{svc.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p
                      className="font-medium text-[--color-chocolat]"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem" }}
                    >
                      {svc.label}
                    </p>
                    <span
                      className="text-sm font-semibold shrink-0 px-2.5 py-0.5 rounded-full"
                      style={{ background: "#fde0d4", color: "#C0432D" }}
                    >
                      {svc.count}+
                    </span>
                  </div>
                  <p className="text-xs text-[--color-muted-foreground] mt-0.5">{svc.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Garanties ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("garde_paris.guarantees_label")}
            title={t("garde_paris.guarantees_title")}
            subtitle={t("garde_paris.guarantees_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUARANTEES.map(({ Icon, title, desc }) => (
              <div key={title} className="card-base p-7 flex flex-col items-center gap-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[--color-creme] flex items-center justify-center">
                  <Icon size={22} color="#C0432D" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ───────────────────────────────────────────────── */}
      <HomeProcess />

      {/* ── Autres arrondissements ──────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[--color-muted-foreground] mb-5">
            {t("garde_paris.other_zones_label")}
          </p>
          <div className="flex flex-wrap gap-2">
            {PARIS_ZONES.filter((z) => z.arrondissement !== zone.arrondissement).map((z) => (
              <a
                key={z.arrondissement}
                href={`/garde-animaux-paris/${z.arrondissement}`}
                className="text-sm px-3.5 py-1.5 rounded-full border border-[--color-border] text-[--color-chocolat] hover:border-[#E8705A] hover:text-[#E8705A] transition-colors"
              >
                Paris {z.arrondissement}
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("garde_paris.cta_title", { arrondissement: zone.arrondissement })}
        subtitle={t("garde_paris.cta_subtitle")}
        primaryCta={{
          label:    t("garde_paris.cta_primary"),
          href:     BOOKING_URL,
          external: true,
        }}
        secondaryCta={{
          label: t("garde_paris.cta_secondary"),
          href:  "/qui-sommes-nous",
        }}
      />

      <Footer />
    </>
  );
}
