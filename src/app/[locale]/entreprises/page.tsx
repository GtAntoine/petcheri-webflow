import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { SITE_STATS } from "@/lib/site-stats";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { CheckCircle, Building2, Users, ShieldCheck, Headphones } from "lucide-react";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import TruckIcon from "@/components/icons/truck-icon";
import HeartIcon from "@/components/icons/heart-icon";
import UnorderedListIcon from "@/components/icons/unordered-list-icon";
import { AnimatedCard } from "@/components/ui/animated-card";
import { buildAlternates } from "@/lib/seo";

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

  const BENEFITS = [
    { Icon: Users,      title: t("entreprises.ben_users_title"),      desc: t("entreprises.ben_users_desc") },
    { Icon: ShieldCheck,title: t("entreprises.ben_shield_title"),     desc: t("entreprises.ben_shield_desc") },
    { Icon: Building2,  title: t("entreprises.ben_building_title"),   desc: t("entreprises.ben_building_desc") },
    { Icon: Headphones, title: t("entreprises.ben_headphones_title"), desc: t("entreprises.ben_headphones_desc") },
  ];

  const SERVICES = [
    { Icon: PawPrintIcon,       title: t("entreprises.svc_garde_title"),      desc: t("entreprises.svc_garde_desc") },
    { Icon: SparklesIcon,       title: t("entreprises.svc_toilettage_title"), desc: t("entreprises.svc_toilettage_desc") },
    { Icon: GraduationCapIcon,  title: t("entreprises.svc_comport_title"),    desc: t("entreprises.svc_comport_desc") },
    { Icon: TruckIcon,          title: t("entreprises.svc_transport_title"),  desc: t("entreprises.svc_transport_desc") },
    { Icon: HeartIcon,          title: t("entreprises.svc_pension_title"),    desc: t("entreprises.svc_pension_desc") },
    { Icon: UnorderedListIcon,  title: t("entreprises.svc_suivi_title"),      desc: t("entreprises.svc_suivi_desc") },
  ];

  const HOW_IT_WORKS = [
    { step: "01", title: t("entreprises.step_1_title"), desc: t("entreprises.step_1_desc") },
    { step: "02", title: t("entreprises.step_2_title"), desc: t("entreprises.step_2_desc") },
    { step: "03", title: t("entreprises.step_3_title"), desc: t("entreprises.step_3_desc") },
  ];

  const TRUST_ITEMS = [
    t("entreprises.check_1"),
    t("entreprises.check_2"),
    t("entreprises.check_3"),
    t("entreprises.check_4"),
    t("entreprises.check_5"),
    t("entreprises.check_6"),
  ];

  const SECTORS = [
    t("entreprises.sector_1"),
    t("entreprises.sector_2"),
    t("entreprises.sector_3"),
    t("entreprises.sector_4"),
    t("entreprises.sector_5"),
    t("entreprises.sector_6"),
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("entreprises.hero_badge")}
        title={
          <>
            {t("entreprises.hero_title")}{" "}
            <span className="text-accent">{t("entreprises.hero_title_accent")}</span>
          </>
        }
        subtitle={t("entreprises.hero_subtitle")}
        ctas={[
          { label: t("entreprises.hero_cta_primary"), href: "/contact", primary: true },
          { label: t("entreprises.hero_cta_secondary"), href: "/nos-services" },
        ]}
        image={ILLUSTRATIONS.about}
        imageAlt={t("entreprises.image_alt")}
        trustBadges={[t("entreprises.trust_1"), t("entreprises.trust_2"), t("entreprises.trust_3")]}
        variant="warm"
      />

      {/* Stats strip */}
      <section className="py-10 bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: t("entreprises.stat_1_value"), label: t("entreprises.stat_1_label") },
              { value: t("entreprises.stat_2_value"), label: t("entreprises.stat_2_label") },
              { value: t("entreprises.stat_3_value"), label: t("entreprises.stat_3_label") },
              { value: `${SITE_STATS.googleRating.toLocaleString("fr-FR")}/5`, label: t("entreprises.stat_4_label") },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="font-normal leading-none"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#E8705A" }}
                >
                  {value}
                </span>
                <span className="text-sm text-[--color-muted-foreground]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("entreprises.why_label")}
            title={t("entreprises.why_title")}
            subtitle={t("entreprises.why_subtitle")}
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {BENEFITS.map(({ Icon, title, desc }) => (
              <div key={title} className="card-base p-8 flex gap-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "#fde0d4" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#E8705A" }} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-[--color-chocolat] font-medium"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services included */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("entreprises.svcs_label")}
            title={t("entreprises.svcs_title")}
            subtitle={t("entreprises.svcs_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc) => (
              <AnimatedCard key={svc.title} Icon={svc.Icon} className="p-6 flex flex-col gap-4">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 1.5vw, 1.3rem)" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{svc.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("entreprises.how_label")}
            title={t("entreprises.how_title")}
            subtitle={t("entreprises.how_subtitle")}
            className="mb-14"
          />
          <div className="grid sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-4">
                <span
                  className="font-normal text-[--color-or]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1 }}
                >
                  {step}
                </span>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + visual */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label={t("entreprises.trust_section_label")}
                title={t("entreprises.trust_section_title")}
                subtitle={t("entreprises.trust_section_subtitle")}
                align="left"
                className="mb-10"
              />

              {/* Sectors */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-[--color-chocolat] mb-3 uppercase tracking-wider">{t("entreprises.sectors_label")}</p>
                <div className="flex flex-wrap gap-2">
                  {SECTORS.map((s) => (
                    <span
                      key={s}
                      className="text-sm px-4 py-1.5 rounded-full bg-white border border-[--color-border] text-[--color-muted-foreground]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-3">
                {TRUST_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[--color-muted-foreground]">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#E8705A" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={PHOTOS.moodboard6}
                  alt={t("entreprises.image_alt")}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              {/* Floating card */}
              <div
                className="absolute -bottom-6 -left-6 card-base p-5 max-w-[220px]"
                style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[--color-chocolat] mb-1">
                  {t("entreprises.card_label")}
                </p>
                <p
                  className="font-normal text-[--color-chocolat]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", lineHeight: 1 }}
                >
                  +38%
                </p>
                <p className="text-xs text-[--color-muted-foreground] mt-1">
                  {t("entreprises.card_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
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
