import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { AnimatedCard } from "@/components/ui/animated-card";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { BOOKING_URL } from "@/lib/site-stats";
import HeartIcon from "@/components/icons/heart-icon";
import HandHeartIcon from "@/components/icons/hand-heart-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import TruckIcon from "@/components/icons/truck-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("bien_etre.meta_title"),
    description: t("bien_etre.meta_description"),
    alternates: buildAlternates("/bien-etre", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BienEtrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const SOINS = [
    { title: t("bien_etre.soin_massage_title"), desc: t("bien_etre.soin_massage_desc") },
    { title: t("bien_etre.soin_osteo_title"), desc: t("bien_etre.soin_osteo_desc") },
    { title: t("bien_etre.soin_reiki_title"), desc: t("bien_etre.soin_reiki_desc") },
    { title: t("bien_etre.soin_naturo_title"), desc: t("bien_etre.soin_naturo_desc") },
    { title: t("bien_etre.soin_algues_title"), desc: t("bien_etre.soin_algues_desc") },
    { title: t("bien_etre.soin_hydro_title"), desc: t("bien_etre.soin_hydro_desc") },
    { title: t("bien_etre.soin_thalasso_title"), desc: t("bien_etre.soin_thalasso_desc") },
    { title: t("bien_etre.soin_proprio_title"), desc: t("bien_etre.soin_proprio_desc") },
  ];

  const WHEN_ITEMS = [
    { Icon: HeartIcon,         label: t("bien_etre.when_1_label"), desc: t("bien_etre.when_1_desc") },
    { Icon: HandHeartIcon,     label: t("bien_etre.when_2_label"), desc: t("bien_etre.when_2_desc") },
    { Icon: ShieldCheckIcon,   label: t("bien_etre.when_3_label"), desc: t("bien_etre.when_3_desc") },
    { Icon: PawPrintIcon,      label: t("bien_etre.when_4_label"), desc: t("bien_etre.when_4_desc") },
    { Icon: HeartHandshakeIcon,label: t("bien_etre.when_5_label"), desc: t("bien_etre.when_5_desc") },
    { Icon: TrophyIcon,        label: t("bien_etre.when_6_label"), desc: t("bien_etre.when_6_desc") },
    { Icon: TruckIcon,         label: t("bien_etre.when_7_label"), desc: t("bien_etre.when_7_desc") },
    { Icon: SparklesIcon,      label: t("bien_etre.when_8_label"), desc: t("bien_etre.when_8_desc") },
  ];

  const PILLS = [
    t("bien_etre.pill_1"),
    t("bien_etre.pill_2"),
    t("bien_etre.pill_3"),
    t("bien_etre.pill_4"),
    t("bien_etre.pill_5"),
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("bien_etre.hero_badge")}
        title={
          <>
            {t("bien_etre.hero_title")}{" "}
            <span className="text-accent">{t("bien_etre.hero_title_accent")}</span>
          </>
        }
        subtitle={t("bien_etre.hero_subtitle")}
        ctas={[
          { label: t("bien_etre.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("bien_etre.hero_cta_secondary"), href: "/nos-services" },
        ]}
        trustBadges={[t("bien_etre.trust_1"), t("bien_etre.trust_2"), t("bien_etre.trust_3")]}
        variant="warm"
      />

      {/* Soins grid */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("bien_etre.soins_label")}
            title={t("bien_etre.soins_title")}
            subtitle={t("bien_etre.soins_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SOINS.map((soin) => (
              <div
                key={soin.title}
                className="card-base p-6 flex flex-col gap-3"
              >
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)" }}
                >
                  {soin.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{soin.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
              style={{ background: "#E8705A" }}
            >
              {t("bien_etre.soin_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* Quand y penser */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("bien_etre.when_label")}
            title={t("bien_etre.when_title")}
            subtitle={t("bien_etre.when_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {WHEN_ITEMS.map(({ Icon, label, desc }) => (
              <AnimatedCard key={label} Icon={Icon} className="p-5 flex flex-col gap-2">
                <p
                  className="text-[--color-chocolat] font-medium leading-snug"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1rem" }}
                >
                  {label}
                </p>
                <p className="text-xs text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </AnimatedCard>
            ))}
          </div>

        </div>
      </section>

      {/* Sélection des praticiens */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionHeader
            label={t("bien_etre.selection_label")}
            title={t("bien_etre.selection_title")}
            subtitle={t("bien_etre.selection_subtitle")}
            className="mb-8"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {PILLS.map((label) => (
              <span
                key={label}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-[--color-chocolat] border border-[--color-border]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("bien_etre.banner_title")}
        subtitle={t("bien_etre.banner_subtitle")}
        primaryCta={{ label: t("bien_etre.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("bien_etre.banner_secondary"), href: "/comportement-education" }}
      />

      <Footer />
    </>
  );
}
