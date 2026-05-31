import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import HeartIcon from "@/components/icons/heart-icon";
import TruckIcon from "@/components/icons/truck-icon";
import type { ComponentType } from "react";
import { BOOKING_URL } from "@/lib/site-stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("services_chat.meta_title"),
    description: t("services_chat.meta_description"),
    alternates: buildAlternates("/services-chat", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ServicesChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const SERVICES: Array<{
    Icon: ComponentType<{ size?: number; color?: string }>;
    title: string;
    desc: string;
    href: string;
    cta: string;
  }> = [
    { Icon: ShieldCheckIcon, title: t("services_chat.svc_visite_title"), desc: t("services_chat.svc_visite_desc"), href: "/garde-chat", cta: t("services_chat.svc_visite_cta") },
    { Icon: SparklesIcon, title: t("services_chat.svc_toilettage_title"), desc: t("services_chat.svc_toilettage_desc"), href: "/toilettage", cta: t("services_chat.svc_toilettage_cta") },
    { Icon: GraduationCapIcon, title: t("services_chat.svc_comport_title"), desc: t("services_chat.svc_comport_desc"), href: "/comportement-education", cta: t("services_chat.svc_comport_cta") },
    { Icon: HeartIcon, title: t("services_chat.svc_bienetre_title"), desc: t("services_chat.svc_bienetre_desc"), href: "/bien-etre", cta: t("services_chat.svc_bienetre_cta") },
    { Icon: TruckIcon, title: t("services_chat.svc_transport_title"), desc: t("services_chat.svc_transport_desc"), href: "/transport", cta: t("services_chat.svc_transport_cta") },
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("services_chat.hero_badge")}
        title={
          <>
            {t("services_chat.hero_title")}{" "}
            <span className="text-accent">{t("services_chat.hero_title_accent")}</span>
          </>
        }
        subtitle={t("services_chat.hero_subtitle")}
        ctas={[
          { label: t("services_chat.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("services_chat.hero_cta_secondary"), href: "/garde-chat" },
        ]}
        image={ILLUSTRATIONS.catSitting}
        imageAlt={t("services_chat.hero_image_alt")}
        trustBadges={[t("services_chat.trust_1"), t("services_chat.trust_2"), t("services_chat.trust_3")]}
        variant="warm"
      />

      {/* Services grid */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("services_chat.svcs_label")}
            title={t("services_chat.svcs_title")}
            subtitle={t("services_chat.svcs_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="card-base p-7 flex flex-col gap-4">
                <svc.Icon size={28} color="#E8705A" />
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">{svc.desc}</p>
                <Link
                  href={svc.href as Parameters<typeof Link>[0]["href"]}
                  className="flex items-center gap-1.5 text-sm font-semibold mt-auto transition-colors"
                  style={{ color: "#E8705A" }}
                >
                  {svc.cta}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={t("services_chat.banner_title")}
        subtitle={t("services_chat.banner_subtitle")}
        primaryCta={{ label: t("services_chat.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("services_chat.banner_secondary"), href: "/services-nac" }}
      />

      <Footer />
    </>
  );
}
