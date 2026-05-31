import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { PHOTOS } from "@/lib/assets";
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
    title: t("transport.meta_title"),
    description: t("transport.meta_description"),
    alternates: buildAlternates("/transport", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TransportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const DESTINATIONS = [
    { title: t("transport.dest_veto_title"), desc: t("transport.dest_veto_desc") },
    { title: t("transport.dest_toiletteur_title"), desc: t("transport.dest_toiletteur_desc") },
    { title: t("transport.dest_famille_title"), desc: t("transport.dest_famille_desc") },
    { title: t("transport.dest_pension_title"), desc: t("transport.dest_pension_desc") },
    { title: t("transport.dest_demenagement_title"), desc: t("transport.dest_demenagement_desc") },
    { title: t("transport.dest_mesure_title"), desc: t("transport.dest_mesure_desc") },
  ];

  const GARANTIES = [
    t("transport.gar_1"),
    t("transport.gar_2"),
    t("transport.gar_3"),
    t("transport.gar_4"),
    t("transport.gar_5"),
    t("transport.gar_6"),
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("transport.hero_badge")}
        title={
          <>
            {t("transport.hero_title")}{" "}
            <span className="text-accent">{t("transport.hero_title_accent")}</span>
          </>
        }
        subtitle={t("transport.hero_subtitle")}
        ctas={[
          { label: t("transport.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("transport.hero_cta_secondary"), href: "/nos-services" },
        ]}
        trustBadges={[t("transport.trust_1"), t("transport.trust_2"), t("transport.trust_3")]}
        variant="warm"
      />

      {/* Destinations */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("transport.dest_label")}
            title={t("transport.dest_title")}
            subtitle={t("transport.dest_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DESTINATIONS.map((d) => (
              <div key={d.title} className="card-base p-6 flex flex-col gap-3">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)" }}
                >
                  {d.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{d.desc}</p>
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
              {t("transport.dest_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.moodboard2}
                alt="Transport animalier Petcheri"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div>
              <SectionHeader
                label={t("transport.gar_label")}
                title={t("transport.gar_title")}
                subtitle={t("transport.gar_subtitle")}
                align="left"
                className="mb-8"
              />
              <ul className="space-y-4">
                {GARANTIES.map((item) => (
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
        title={t("transport.banner_title")}
        subtitle={t("transport.banner_subtitle")}
        primaryCta={{ label: t("transport.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("transport.banner_secondary"), href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
