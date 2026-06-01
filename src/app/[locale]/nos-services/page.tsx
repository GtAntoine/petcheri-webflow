import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ICONS, ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/site-stats";
import { HomeNewsletter } from "@/components/sections/home-newsletter";
import { HomeBlog } from "@/components/sections/home-blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("nos_services.meta_title"),
    description: t("nos_services.meta_description"),
    alternates: buildAlternates("/nos-services", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function NosServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const ANIMAL_CATEGORIES = [
    { icon: ICONS.dog, title: t("nos_services.cat_chiens_title"), desc: t("nos_services.cat_chiens_desc"), href: "/services-chien" as const, cta: t("nos_services.cat_chiens_cta") },
    { icon: ICONS.ctCat, title: t("nos_services.cat_chats_title"), desc: t("nos_services.cat_chats_desc"), href: "/services-chat" as const, cta: t("nos_services.cat_chats_cta") },
    { icon: ICONS.nac, title: t("nos_services.cat_nac_title"), desc: t("nos_services.cat_nac_desc"), href: "/services-nac" as const, cta: t("nos_services.cat_nac_cta") },
  ];

  const SERVICE_CATEGORIES = [
    {
      title: t("nos_services.svc_garde_title"),
      desc: t("nos_services.svc_garde_desc"),
      items: [t("nos_services.svc_garde_i1"), t("nos_services.svc_garde_i2"), t("nos_services.svc_garde_i3"), t("nos_services.svc_garde_i4")],
      href: "/garde-chien" as const,
      image: ILLUSTRATIONS.gardeNuit,
    },
    {
      title: t("nos_services.svc_toilettage_title"),
      desc: t("nos_services.svc_toilettage_desc"),
      items: [t("nos_services.svc_toilettage_i1"), t("nos_services.svc_toilettage_i2"), t("nos_services.svc_toilettage_i3"), t("nos_services.svc_toilettage_i4")],
      href: "/toilettage" as const,
      image: ILLUSTRATIONS.grooming,
    },
    {
      title: t("nos_services.svc_comport_title"),
      desc: t("nos_services.svc_comport_desc"),
      items: [t("nos_services.svc_comport_i1"), t("nos_services.svc_comport_i2"), t("nos_services.svc_comport_i3"), t("nos_services.svc_comport_i4")],
      href: "/comportement-education" as const,
      image: ILLUSTRATIONS.dogDay,
    },
    {
      title: t("nos_services.svc_bienetre_title"),
      desc: t("nos_services.svc_bienetre_desc"),
      items: [t("nos_services.svc_bienetre_i1"), t("nos_services.svc_bienetre_i2"), t("nos_services.svc_bienetre_i3"), t("nos_services.svc_bienetre_i4")],
      href: "/nos-services" as const,
      image: ILLUSTRATIONS.catSitting,
    },
    {
      title: t("nos_services.svc_transport_title"),
      desc: t("nos_services.svc_transport_desc"),
      items: [t("nos_services.svc_transport_i1"), t("nos_services.svc_transport_i2"), t("nos_services.svc_transport_i3")],
      href: "/transport" as const,
      image: PHOTOS.moodboard5,
    },
    {
      title: t("nos_services.svc_autres_title"),
      desc: t("nos_services.svc_autres_desc"),
      items: [t("nos_services.svc_autres_i1"), t("nos_services.svc_autres_i2"), t("nos_services.svc_autres_i3")],
      href: "/contact" as const,
      image: PHOTOS.moodboard6,
    },
  ];

  return (
    <>
      <Navbar />

      <PageHero
        badge={t("nos_services.hero_badge")}
        title={
          <>
            {t("nos_services.hero_title")}{" "}
            <span className="text-accent">{t("nos_services.hero_title_accent")}</span>
          </>
        }
        subtitle={t("nos_services.hero_subtitle")}
        ctas={[
          { label: t("nos_services.hero_cta_primary"), href: BOOKING_URL, external: true, primary: true },
          { label: t("nos_services.hero_cta_secondary"), href: "/contact" },
        ]}
        image={PHOTOS.moodboard5}
        imageAlt={t("nos_services.hero_image_alt")}
        trustBadges={[t("nos_services.trust_1"), t("nos_services.trust_2"), t("nos_services.trust_3")]}
        variant="warm"
      />

      {/* Animal categories */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("nos_services.animals_label")}
            title={t("nos_services.animals_title")}
            subtitle={t("nos_services.animals_subtitle")}
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {ANIMAL_CATEGORIES.map((cat) => (
              <div
                key={cat.href}
                className="card-base p-8 flex flex-col gap-4 hover:shadow-[--shadow-card-hover] transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-[--color-creme] flex items-center justify-center">
                  <Image src={cat.icon} alt={cat.title} width={32} height={32} />
                </div>
                <h3 className="text-h3 text-[--color-chocolat]">{cat.title}</h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">
                  {cat.desc}
                </p>
                <Link
                  href={cat.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold mt-2 transition-all"
                  style={{ color: "#E8705A" }}
                >
                  {cat.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service categories grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={t("nos_services.svc_label")}
            title={t("nos_services.svc_title")}
            subtitle={t("nos_services.svc_subtitle")}
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.title} className="card-base overflow-hidden flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden bg-[--color-creme]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <h3 className="text-h3 text-[--color-chocolat]">{cat.title}</h3>
                  <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                    {cat.desc}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-[--color-muted-foreground]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[--color-or] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={cat.href}
                    className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: "#E8705A" }}
                  >
                    {t("nos_services.svc_learn_more")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeBlog locale={locale} />

      <HomeNewsletter />

      <CtaBanner
        title={t("nos_services.banner_title")}
        subtitle={t("nos_services.banner_subtitle")}
        primaryCta={{ label: t("nos_services.banner_primary"), href: BOOKING_URL, external: true }}
        secondaryCta={{ label: t("nos_services.banner_secondary"), href: "/contact" }}
      />

      <Footer />
    </>
  );
}
