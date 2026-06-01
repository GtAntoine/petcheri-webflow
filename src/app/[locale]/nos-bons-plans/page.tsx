import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHeroCentered } from "@/components/sections/page-hero-centered";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { NosBoonsPlansClient } from "./_components/nos-bons-plans-client";
import HeartIcon from "@/components/icons/heart-icon";
import { HomeBlog } from "@/components/sections/home-blog";
import { HomeNewsletter } from "@/components/sections/home-newsletter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("nos_bons_plans.meta_title"),
    description: t("nos_bons_plans.meta_description"),
    alternates: buildAlternates("/nos-bons-plans", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function NosBonsPlansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  return (
    <>
      <Navbar />

      <PageHeroCentered
        badge={t("nos_bons_plans.hero_badge")}
        title={
          <>
            {t("nos_bons_plans.hero_title")}{" "}
            <span className="text-accent italic">{t("nos_bons_plans.hero_title_accent")}</span>
            {t("nos_bons_plans.hero_title_end")}

          </>
        }
        subtitle={
          <span className="flex items-center justify-center gap-2">
            {t("nos_bons_plans.hero_subtitle")}
            <HeartIcon size={20} color="var(--color-rouge-light)" strokeWidth={2} />
          </span>
        }
      />

      {/* Listing */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <NosBoonsPlansClient />
        </div>
      </section>

      <HomeBlog locale={locale} />
      <HomeNewsletter />

      <Footer />
    </>
  );
}
