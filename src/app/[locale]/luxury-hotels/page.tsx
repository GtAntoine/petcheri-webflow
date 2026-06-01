import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { SITE_STATS } from "@/lib/site-stats";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { AnimatedCard } from "@/components/ui/animated-card";
import { routing } from "@/i18n/routing";
import { PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import { Phone } from "lucide-react";
import { AnimatedCardHorizontal } from "@/components/ui/animated-card-horizontal";
import { TrustGridItem } from "@/components/ui/trust-grid-item";
import SparklesIcon from "@/components/icons/sparkles-icon";
import HandHeartIcon from "@/components/icons/hand-heart-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import UnorderedListIcon from "@/components/icons/unordered-list-icon";
import PartyPopperIcon from "@/components/icons/party-popper-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import UsersIcon from "@/components/icons/users-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("luxury_hotels.meta_title"),
    description: t("luxury_hotels.meta_description"),
    alternates: buildAlternates("/luxury-hotels", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LuxuryHotelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const SERVICES = [
    { Icon: SparklesIcon,     title: t("luxury_hotels.svc_1_title"), desc: t("luxury_hotels.svc_1_desc") },
    { Icon: HandHeartIcon,    title: t("luxury_hotels.svc_2_title"), desc: t("luxury_hotels.svc_2_desc") },
    { Icon: PartyPopperIcon,  title: t("luxury_hotels.svc_3_title"), desc: t("luxury_hotels.svc_3_desc") },
  ];

  const DIFFERENTIATORS = [
    { Icon: ShieldCheckIcon,    title: t("luxury_hotels.diff_1_title"), desc: t("luxury_hotels.diff_1_desc") },
    { Icon: TrophyIcon,         title: t("luxury_hotels.diff_2_title"), desc: t("luxury_hotels.diff_2_desc") },
    { Icon: UsersIcon,          title: t("luxury_hotels.diff_3_title"), desc: t("luxury_hotels.diff_3_desc") },
    { Icon: PawPrintIcon,       title: t("luxury_hotels.diff_4_title"), desc: t("luxury_hotels.diff_4_desc") },
  ];

  const HOW_IT_WORKS = [
    { step: "01", title: t("luxury_hotels.how_1_title"), desc: t("luxury_hotels.how_1_desc") },
    { step: "02", title: t("luxury_hotels.how_2_title"), desc: t("luxury_hotels.how_2_desc") },
    { step: "03", title: t("luxury_hotels.how_3_title"), desc: t("luxury_hotels.how_3_desc") },
  ];

  const TRUST_ITEMS = [
    { Icon: UsersIcon,          text: t("luxury_hotels.check_1", { sittersNetwork: SITE_STATS.sittersNetwork }) },
    { Icon: ShieldCheckIcon,    text: t("luxury_hotels.check_2") },
    { Icon: HeartHandshakeIcon, text: t("luxury_hotels.check_3") },
    { Icon: GraduationCapIcon,  text: t("luxury_hotels.check_4") },
    { Icon: SparklesIcon,       text: t("luxury_hotels.check_5") },
    { Icon: UnorderedListIcon,  text: t("luxury_hotels.check_6") },
  ];

  const HOTEL_TYPES = [
    t("luxury_hotels.hotel_1"),
    t("luxury_hotels.hotel_2"),
    t("luxury_hotels.hotel_3"),
    t("luxury_hotels.hotel_4"),
    t("luxury_hotels.hotel_5"),
    t("luxury_hotels.hotel_6"),
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("luxury_hotels.hero_badge")}
        title={
          <>
            {t("luxury_hotels.hero_title")}{" "} <br />
            <span className="text-accent">{t("luxury_hotels.hero_title_accent")}</span>
            {" "}  <br />{t("luxury_hotels.hero_title_suffix")}
          </>
        }
        subtitle={t("luxury_hotels.hero_subtitle")}
        ctas={[
          { label: t("luxury_hotels.hero_cta_primary"), href: "/contact", primary: true },
          { label: t("luxury_hotels.hero_cta_secondary"), href: "#services" },
        ]}
        image={PHOTOS.luxuryHero}
        imageAlt={t("luxury_hotels.hero_image_alt")}
        trustBadges={[t("luxury_hotels.trust_1"), t("luxury_hotels.trust_2"), t("luxury_hotels.trust_3")]}
        variant="warm"
      />

      {/* Stats strip */}
      <section className="py-10 bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: t("luxury_hotels.stat_1_value"), label: t("luxury_hotels.stat_1_label") },
              { value: t("luxury_hotels.stat_2_value"), label: t("luxury_hotels.stat_2_label") },
              { value: t("luxury_hotels.stat_3_value", { sittersNetwork: SITE_STATS.sittersNetwork }), label: t("luxury_hotels.stat_3_label") },
              { value: t("luxury_hotels.stat_4_value"), label: t("luxury_hotels.stat_4_label") },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="font-normal leading-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                    color: "#E8705A",
                  }}
                >
                  {value}
                </span>
                <span className="text-sm text-[--color-muted-foreground]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("luxury_hotels.svcs_label")}
            title={t("luxury_hotels.svcs_title")}
            subtitle={t("luxury_hotels.svcs_subtitle")}
            className="mb-14"
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <AnimatedCard key={svc.title} Icon={svc.Icon} className="p-8 flex flex-col gap-4">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                  }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{svc.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Petcheri */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("luxury_hotels.why_label")}
            title={t("luxury_hotels.why_title")}
            subtitle={t("luxury_hotels.why_subtitle")}
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {DIFFERENTIATORS.map(({ Icon, title, desc }) => (
              <AnimatedCardHorizontal key={title} Icon={Icon}>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)",
                  }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </AnimatedCardHorizontal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("luxury_hotels.how_label")}
            title={t("luxury_hotels.how_title")}
            subtitle={t("luxury_hotels.how_subtitle")}
            className="mb-14"
          />
          <div className="grid sm:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-4">
                <span
                  className="font-normal text-[--color-or]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    lineHeight: 1,
                  }}
                >
                  {step}
                </span>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                  }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + photo */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label={t("luxury_hotels.trust_section_label")}
                title={t("luxury_hotels.trust_section_title")}
                subtitle={t("luxury_hotels.trust_section_subtitle")}
                align="left"
                className="mb-10"
              />

              {/* Hotel types */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-[--color-chocolat] mb-3 uppercase tracking-wider">
                  {t("luxury_hotels.hotel_types_label")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {HOTEL_TYPES.map((type) => (
                    <span
                      key={type}
                      className="text-sm px-4 py-1.5 rounded-full bg-white border border-[--color-border] text-[--color-muted-foreground]"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust grid */}
              <div className="grid grid-cols-2 gap-3">
                {TRUST_ITEMS.map(({ Icon, text }) => (
                  <TrustGridItem key={text} Icon={Icon} text={text} />
                ))}
              </div>
            </div>

            {/* Photo collage */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={PHOTOS.luxury3}
                  alt="Conciergerie animalière hôtel de luxe"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              {/* Secondary photo inset */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={PHOTOS.luxury4}
                  alt="Accueil animal en hôtel"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              {/* Floating card */}
              <div
                className="absolute -top-6 -left-6 card-base p-5 max-w-[210px]"
                style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[--color-chocolat] mb-1">
                  {t("luxury_hotels.card_label")}
                </p>
                <p
                  className="font-normal text-[--color-chocolat]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", lineHeight: 1 }}
                >
                  {SITE_STATS.googleRating.toLocaleString("fr-FR")} / 5
                </p>
                <p className="text-xs text-[--color-muted-foreground] mt-1">
                  {t("luxury_hotels.card_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-12 bg-white border-y border-[--color-border]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-[--color-muted-foreground] mb-2 uppercase tracking-wider font-medium">
            {t("luxury_hotels.contact_strip_label")}
          </p>
          <a
            href="tel:+33185089730"
            className="inline-flex items-center gap-2 text-[--color-chocolat] font-semibold hover:text-[#E8705A] transition-colors"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}
          >
            <Phone className="w-5 h-5" />
            01 85 08 97 30
          </a>
          <p className="text-xs text-[--color-muted-foreground] mt-1">{t("luxury_hotels.contact_strip_hours")}</p>
        </div>
      </section>

      <CtaBanner
        title={t("luxury_hotels.banner_title")}
        subtitle={t("luxury_hotels.banner_subtitle")}
        primaryCta={{ label: t("luxury_hotels.banner_primary"), href: "/contact" }}
        secondaryCta={{ label: t("luxury_hotels.banner_secondary"), href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
