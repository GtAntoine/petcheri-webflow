import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { SITE_STATS, CALLBACK_URL } from "@/lib/site-stats";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { AnimatedCardHorizontal } from "@/components/ui/animated-card-horizontal";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import PartyPopperIcon from "@/components/icons/party-popper-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("entreprises.meta_title"),
    description: t("entreprises.meta_description"),
    alternates: buildAlternates("/entreprises", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function EntreprisesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const SERVICES = [
    { Icon: PawPrintIcon,     title: t("entreprises.svc_surmesure_title"), desc: t("entreprises.svc_surmesure_desc") },
    { Icon: TrophyIcon,       title: t("entreprises.svc_cse_title"),       desc: t("entreprises.svc_cse_desc") },
    { Icon: PartyPopperIcon,  title: t("entreprises.svc_events_title"),    desc: t("entreprises.svc_events_desc") },
    { Icon: GraduationCapIcon,title: t("entreprises.svc_ateliers_title"),  desc: t("entreprises.svc_ateliers_desc") },
  ];

  return (
    <>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <PageHero
        badge={t("entreprises.hero_badge")}
        title={t("entreprises.hero_title")}
        subtitle={t("entreprises.hero_subtitle")}
        ctas={[
          { label: t("entreprises.hero_cta_primary"), href: "/contact", primary: true },
          { label: t("entreprises.hero_cta_tel"), href: CALLBACK_URL, external: true },
        ]}
        image={ILLUSTRATIONS.about}
        imageAlt={t("entreprises.image_alt")}
        variant="warm"
      />

      {/* ── Stats strip ─────────────────────────────────────────────────────── */}
      <section className="py-10 bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 text-center">
            {[
              { value: t("entreprises.stat_1_value"),                                    label: t("entreprises.stat_1_label") },
              { value: `${SITE_STATS.sittersNetwork}+`,                                  label: t("entreprises.stat_2_label") },
              { value: `${SITE_STATS.googleRating.toLocaleString("fr-FR")}/5`,           label: t("entreprises.stat_3_label") },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="font-normal leading-none"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--color-rouge-light)" }}
                >
                  {value}
                </span>
                <span className="text-sm text-[--color-muted-foreground]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ce que nous proposons ───────────────────────────────────────────── */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("entreprises.svcs_label")}
            title={t("entreprises.svcs_title")}
            subtitle={t("entreprises.svcs_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map(({ Icon, title, desc }) => (
              <AnimatedCardHorizontal key={title} Icon={Icon} iconSize={22} iconStrokeWidth={1.5}>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </AnimatedCardHorizontal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
      <CtaBanner
        title={t("entreprises.banner_title")}
        subtitle={t("entreprises.banner_subtitle")}
        primaryCta={{ label: t("entreprises.banner_primary"), href: "/contact" }}
        secondaryCta={{ label: t("entreprises.banner_secondary"), href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
