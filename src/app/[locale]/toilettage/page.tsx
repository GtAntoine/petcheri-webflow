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
import { BOOKING_URL } from "@/lib/site-stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("toilettage.meta_title"),
    description: t("toilettage.meta_description"),
    alternates: buildAlternates("/toilettage", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ToilettagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const DOG_SERVICES = [
    { title: t("toilettage.dog_soin_title"), desc: t("toilettage.dog_soin_desc") },
    { title: t("toilettage.dog_bain_title"), desc: t("toilettage.dog_bain_desc") },
    { title: t("toilettage.dog_brossage_title"), desc: t("toilettage.dog_brossage_desc") },
    { title: t("toilettage.dog_coupe_title"), desc: t("toilettage.dog_coupe_desc") },
    { title: t("toilettage.dog_patticure_title"), desc: t("toilettage.dog_patticure_desc") },
    { title: t("toilettage.dog_tonte_title"), desc: t("toilettage.dog_tonte_desc") },
  ];

  const CAT_SERVICES = [
    { title: t("toilettage.cat_coupe_title"), desc: t("toilettage.cat_coupe_desc") },
    { title: t("toilettage.cat_brossage_title"), desc: t("toilettage.cat_brossage_desc") },
    { title: t("toilettage.cat_tonte_title"), desc: t("toilettage.cat_tonte_desc") },
    { title: t("toilettage.cat_nettoyage_title"), desc: t("toilettage.cat_nettoyage_desc") },
    { title: t("toilettage.cat_yeux_title"), desc: t("toilettage.cat_yeux_desc") },
    { title: t("toilettage.cat_royal_title"), desc: t("toilettage.cat_royal_desc") },
  ];

  const WHY_US = [
    t("toilettage.why_1"),
    t("toilettage.why_2"),
    t("toilettage.why_3"),
    t("toilettage.why_4"),
    t("toilettage.why_5"),
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("toilettage.hero_badge")}
        title={
          <>
            {t("toilettage.hero_title")}{" "}
            <span className="text-accent">{t("toilettage.hero_title_accent")}</span>
          </>
        }
        subtitle={t("toilettage.hero_subtitle")}
        ctas={[
          { label: t("toilettage.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("toilettage.hero_cta_secondary"), href: "/nos-services" },
        ]}
        image={ILLUSTRATIONS.grooming}
        imageAlt={t("toilettage.hero_image_alt")}
        trustBadges={[t("toilettage.trust_1"), t("toilettage.trust_2"), t("toilettage.trust_3")]}
        variant="warm"
      />

      {/* Dog grooming */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("toilettage.dog_label")}
            title={t("toilettage.dog_title")}
            subtitle={t("toilettage.dog_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOG_SERVICES.map((svc) => (
              <div key={svc.title} className="card-base p-6 flex flex-col gap-3">
                <h3 className="text-h3 text-[--color-chocolat]">{svc.title}</h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                  {svc.desc}
                </p>
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
              {t("toilettage.dog_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* Cat grooming */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label={t("toilettage.cat_label")}
                title={t("toilettage.cat_title")}
                subtitle={t("toilettage.cat_subtitle")}
                align="left"
                className="mb-8"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {CAT_SERVICES.map((svc) => (
                  <div key={svc.title} className="card-base p-5 flex flex-col gap-2">
                    <h3 className="text-h3 text-[--color-chocolat] text-base">{svc.title}</h3>
                    <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                      {svc.desc}
                    </p>
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
                  {t("toilettage.cat_btn")}
                </a>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={ILLUSTRATIONS.catSitting}
                alt="Chat prêt pour le toilettage"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Petcheri */}
      <section className="section-padding bg-[--color-chocolat]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] mb-3 block" style={{ color: "#E8705A" }}>
                {t("toilettage.why_label")}
              </span>
              <h2 className="text-h2 text-white mb-8">
                {t("toilettage.why_title")}
              </h2>
              <ul className="space-y-4">
                {WHY_US.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#E8705A" }} />
                    <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.moodboard1}
                alt="Toiletteur Petcheri"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("toilettage.banner_title")}
        subtitle={t("toilettage.banner_subtitle")}
        primaryCta={{ label: t("toilettage.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("toilettage.banner_secondary"), href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
