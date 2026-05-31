import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { HomeProcess } from "@/components/sections/home-process";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ICONS, PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/site-stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("services_chien.meta_title"),
    description: t("services_chien.meta_description"),
    alternates: buildAlternates("/services-chien", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ServicesChienPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const DOG_SERVICES = [
    { icon: ICONS.dog, title: t("services_chien.svc_garde_jour_title"), desc: t("services_chien.svc_garde_jour_desc"), href: "/garde-chien" as const },
    { icon: ICONS.ctSleep, title: t("services_chien.svc_garde_nuit_title"), desc: t("services_chien.svc_garde_nuit_desc"), href: "/garde-nuit" as const },
    { icon: ICONS.walking, title: t("services_chien.svc_promenade_title"), desc: t("services_chien.svc_promenade_desc"), href: "/nos-services" as const },
    { icon: ICONS.ctGrooming, title: t("services_chien.svc_toilettage_title"), desc: t("services_chien.svc_toilettage_desc"), href: "/toilettage" as const },
    { icon: ICONS.education, title: t("services_chien.svc_comportement_title"), desc: t("services_chien.svc_comportement_desc"), href: "/comportement-education" as const },
    { icon: ICONS.care, title: t("services_chien.svc_bienetre_title"), desc: t("services_chien.svc_bienetre_desc"), href: "/nos-services" as const },
    { icon: ICONS.ctTransport, title: t("services_chien.svc_transport_title"), desc: t("services_chien.svc_transport_desc"), href: "/transport" as const },
    { icon: ICONS.travel, title: t("services_chien.svc_voyage_title"), desc: t("services_chien.svc_voyage_desc"), href: "/nos-services" as const },
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("services_chien.hero_badge")}
        title={
          <>
            {t("services_chien.hero_title")}{" "}
            <span className="text-accent">{t("services_chien.hero_title_accent")}</span>
          </>
        }
        subtitle={t("services_chien.hero_subtitle")}
        ctas={[
          {
            label: t("services_chien.hero_cta_primary"),
            href: BOOKING_URL,
            external: true,
            primary: true,
          },
          { label: t("services_chien.hero_cta_secondary"), href: "/garde-chien" },
        ]}
        image={PHOTOS.moodboard2}
        imageAlt={t("services_chien.hero_image_alt")}
        trustBadges={[t("services_chien.trust_1"), t("services_chien.trust_2"), t("services_chien.trust_3")]}
        variant="warm"
      />

      {/* Services grid */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("services_chien.svcs_label")}
            title={t("services_chien.svcs_title")}
            subtitle={t("services_chien.svcs_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOG_SERVICES.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group card-base p-6 flex flex-col gap-3 hover:shadow-[--shadow-card-hover] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[--color-creme] flex items-center justify-center">
                  <Image src={svc.icon} alt={svc.title} width={26} height={26} />
                </div>
                <h3 className="text-h3 text-[--color-chocolat] group-hover:text-[#E8705A] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">
                  {svc.desc}
                </p>
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold mt-1"
                  style={{ color: "#E8705A" }}
                >
                  {t("services_chien.svc_voir_plus")} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reused process section */}
      <HomeProcess />

      <CtaBanner
        title={t("services_chien.banner_title")}
        subtitle={t("services_chien.banner_subtitle")}
        primaryCta={{ label: t("services_chien.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("services_chien.banner_secondary"), href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
