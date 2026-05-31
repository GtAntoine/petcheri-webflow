import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import { CheckCircle } from "lucide-react";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import UsersIcon from "@/components/icons/users-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import { BOOKING_URL } from "@/lib/site-stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("comportement_education.meta_title"),
    description: t("comportement_education.meta_description"),
    alternates: buildAlternates("/comportement-education", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ComportementEducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const DOG_SOLUTIONS = [
    { Icon: GraduationCapIcon, title: t("comportement_education.sol_troubles_title"), desc: t("comportement_education.sol_troubles_desc"), image: ILLUSTRATIONS.dogDay },
    { Icon: PawPrintIcon, title: t("comportement_education.sol_chiot_title"), desc: t("comportement_education.sol_chiot_desc"), image: PHOTOS.moodboard2 },
    { Icon: UsersIcon, title: t("comportement_education.sol_groupe_title"), desc: t("comportement_education.sol_groupe_desc"), image: PHOTOS.chouchouteur1 },
    { Icon: SparklesIcon, title: t("comportement_education.sol_promenade_title"), desc: t("comportement_education.sol_promenade_desc"), image: PHOTOS.moodboard5 },
  ];

  const CAT_ISSUES = [
    t("comportement_education.cat_issue_1"),
    t("comportement_education.cat_issue_2"),
    t("comportement_education.cat_issue_3"),
    t("comportement_education.cat_issue_4"),
    t("comportement_education.cat_issue_5"),
    t("comportement_education.cat_issue_6"),
  ];

  const WHY_US = [
    { title: t("comportement_education.why_1_title"), desc: t("comportement_education.why_1_desc") },
    { title: t("comportement_education.why_2_title"), desc: t("comportement_education.why_2_desc") },
    { title: t("comportement_education.why_3_title"), desc: t("comportement_education.why_3_desc") },
    { title: t("comportement_education.why_4_title"), desc: t("comportement_education.why_4_desc") },
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("comportement_education.hero_badge")}
        title={
          <>
            {t("comportement_education.hero_title")}{" "}
            <span className="text-accent">{t("comportement_education.hero_title_accent")}</span>
          </>
        }
        subtitle={t("comportement_education.hero_subtitle")}
        ctas={[
          { label: t("comportement_education.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("comportement_education.hero_cta_secondary"), href: "/services-chien" },
        ]}
        image={ILLUSTRATIONS.dogDay}
        imageAlt={t("comportement_education.hero_image_alt")}
        trustBadges={[t("comportement_education.trust_1"), t("comportement_education.trust_2"), t("comportement_education.trust_3")]}
        variant="warm"
      />

      {/* Dog solutions */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("comportement_education.dog_label")}
            title={t("comportement_education.dog_title")}
            subtitle={t("comportement_education.dog_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {DOG_SOLUTIONS.map((sol) => (
              <div key={sol.title} className="card-base overflow-hidden flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-40 aspect-video sm:aspect-auto shrink-0 overflow-hidden bg-[--color-creme]">
                  <Image
                    src={sol.image}
                    alt={sol.title}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <sol.Icon size={18} color="#E8705A" />
                    <h3 className="text-h3 text-[--color-chocolat]">{sol.title}</h3>
                  </div>
                  <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{sol.desc}</p>
                </div>
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
              {t("comportement_education.dog_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* Cat section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src={ILLUSTRATIONS.catSitting}
                alt="Comportementaliste félin"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeader
                label={t("comportement_education.cat_label")}
                title={t("comportement_education.cat_title")}
                subtitle={t("comportement_education.cat_subtitle")}
                align="left"
                className="mb-8"
              />
              <div className="grid grid-cols-2 gap-3">
                {CAT_ISSUES.map((issue) => (
                  <div key={issue} className="flex items-center gap-2 text-sm text-[--color-muted-foreground]">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#E8705A" }} />
                    {issue}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
                  style={{ background: "#E8705A" }}
                >
                  {t("comportement_education.cat_btn")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Petcheri */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("comportement_education.why_label")}
            title={t("comportement_education.why_title")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <div key={item.title} className="card-base p-6 flex flex-col gap-3">
                <h3 className="text-h3 text-[--color-chocolat]">{item.title}</h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("comportement_education.banner_title")}
        subtitle={t("comportement_education.banner_subtitle")}
        primaryCta={{ label: t("comportement_education.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("comportement_education.banner_secondary"), href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
