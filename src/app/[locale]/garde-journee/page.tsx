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
import { BOOKING_URL } from "@/lib/site-stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("garde_journee.meta_title"),
    description: t("garde_journee.meta_description"),
    alternates: buildAlternates("/garde-journee", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function GardeJourneePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const FORMULES = [
    {
      title: t("garde_journee.form_express_title"),
      duration: t("garde_journee.form_express_duration"),
      desc: t("garde_journee.form_express_desc"),
      includes: [t("garde_journee.form_express_i1"), t("garde_journee.form_express_i2"), t("garde_journee.form_express_i3")],
    },
    {
      title: t("garde_journee.form_demijournee_title"),
      duration: t("garde_journee.form_demijournee_duration"),
      desc: t("garde_journee.form_demijournee_desc"),
      includes: [t("garde_journee.form_demijournee_i1"), t("garde_journee.form_demijournee_i2"), t("garde_journee.form_demijournee_i3"), t("garde_journee.form_demijournee_i4")],
    },
    {
      title: t("garde_journee.form_journee_title"),
      duration: t("garde_journee.form_journee_duration"),
      desc: t("garde_journee.form_journee_desc"),
      includes: [t("garde_journee.form_journee_i1"), t("garde_journee.form_journee_i2"), t("garde_journee.form_journee_i3"), t("garde_journee.form_journee_i4"), t("garde_journee.form_journee_i5")],
    },
  ];

  const INCLUS = [
    t("garde_journee.inclus_1"),
    t("garde_journee.inclus_2"),
    t("garde_journee.inclus_3"),
    t("garde_journee.inclus_4"),
    t("garde_journee.inclus_5"),
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("garde_journee.hero_badge")}
        title={
          <>
            {t("garde_journee.hero_title")}{" "}
            <span className="text-accent">{t("garde_journee.hero_title_accent")}</span>
          </>
        }
        subtitle={t("garde_journee.hero_subtitle")}
        ctas={[
          { label: t("garde_journee.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("garde_journee.hero_cta_secondary"), href: "/nos-services" },
        ]}
        image={ILLUSTRATIONS.dogDay}
        imageAlt={t("garde_journee.hero_image_alt")}
        trustBadges={[t("garde_journee.trust_1"), t("garde_journee.trust_2"), t("garde_journee.trust_3")]}
        variant="warm"
      />

      {/* Formules */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("garde_journee.formules_label")}
            title={t("garde_journee.formules_title")}
            subtitle={t("garde_journee.formules_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {FORMULES.map((f) => (
              <div key={f.title} className="card-base p-7 flex flex-col gap-4">
                <div className="flex items-end justify-between">
                  <h3
                    className="text-[--color-chocolat] font-medium"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                  >
                    {f.title}
                  </h3>
                  <span
                    className="text-sm font-semibold px-3 py-0.5 rounded-full"
                    style={{ background: "#fde0d4", color: "#E8705A" }}
                  >
                    {f.duration}
                  </span>
                </div>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{f.desc}</p>
                <ul className="mt-auto space-y-1.5">
                  {f.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[--color-muted-foreground]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#E8705A" }} />
                      {item}
                    </li>
                  ))}
                </ul>
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
              {t("garde_journee.form_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.moodboard5}
                alt="Chouchouteur avec chien"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div>
              <SectionHeader
                label={t("garde_journee.inclus_label")}
                title={t("garde_journee.inclus_title")}
                subtitle={t("garde_journee.inclus_subtitle")}
                align="left"
                className="mb-8"
              />
              <ul className="space-y-4">
                {INCLUS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "#E8705A" }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-[--color-muted-foreground] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("garde_journee.banner_title")}
        subtitle={t("garde_journee.banner_subtitle")}
        primaryCta={{ label: t("garde_journee.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("garde_journee.banner_secondary"), href: "/garde-nuit" }}
      />

      <Footer />
    </>
  );
}
