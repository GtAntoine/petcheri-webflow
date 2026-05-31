import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
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
    title: t("services_nac.meta_title"),
    description: t("services_nac.meta_description"),
    alternates: buildAlternates("/services-nac", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ServicesNacPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const ANIMAUX = [
    t("services_nac.species_lapins"),
    t("services_nac.species_rongeurs"),
    t("services_nac.species_reptiles"),
    t("services_nac.species_oiseaux"),
    t("services_nac.species_poissons"),
    t("services_nac.species_herissons"),
    t("services_nac.species_autres"),
  ];

  const SERVICES = [
    { title: t("services_nac.svc_visite_title"), desc: t("services_nac.svc_visite_desc") },
    { title: t("services_nac.svc_garde_dom_title"), desc: t("services_nac.svc_garde_dom_desc") },
    { title: t("services_nac.svc_garde_chez_title"), desc: t("services_nac.svc_garde_chez_desc") },
    { title: t("services_nac.svc_transport_title"), desc: t("services_nac.svc_transport_desc") },
    { title: t("services_nac.svc_soins_title"), desc: t("services_nac.svc_soins_desc") },
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("services_nac.hero_badge")}
        title={
          <>
            {t("services_nac.hero_title")}{" "}
            <span className="text-accent">{t("services_nac.hero_title_accent")}</span>
          </>
        }
        subtitle={t("services_nac.hero_subtitle")}
        ctas={[
          { label: t("services_nac.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("services_nac.hero_cta_secondary"), href: "/nos-services" },
        ]}
        trustBadges={[t("services_nac.trust_1"), t("services_nac.trust_2"), t("services_nac.trust_3")]}
        variant="warm"
      />

      {/* Animaux — text-only pills */}
      <section className="py-10 bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {ANIMAUX.map((label) => (
              <span
                key={label}
                className="px-4 py-2 rounded-full text-sm font-medium text-[--color-chocolat] bg-white border border-[--color-border]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("services_nac.svcs_label")}
            title={t("services_nac.svcs_title")}
            subtitle={t("services_nac.svcs_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="card-base p-7 flex flex-col gap-3">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{svc.desc}</p>
              </div>
            ))}
            {/* CTA card */}
            <div
              className="p-7 flex flex-col gap-4 rounded-2xl items-start justify-end"
              style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
            >
              <p
                className="text-[--color-chocolat] font-medium"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem" }}
              >
                {t("services_nac.cta_card_title")}
              </p>
              <p className="text-sm text-[--color-muted-foreground]">
                {t("services_nac.cta_card_desc")}
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: "#E8705A" }}
              >
                {t("services_nac.cta_card_link")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("services_nac.banner_title")}
        subtitle={t("services_nac.banner_subtitle")}
        primaryCta={{ label: t("services_nac.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("services_nac.banner_secondary"), href: "/services-chat" }}
      />

      <Footer />
    </>
  );
}
