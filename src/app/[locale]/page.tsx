import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeStats } from "@/components/sections/home-stats";
import { HomeServices } from "@/components/sections/home-services";
import { HomeProcess } from "@/components/sections/home-process";
import { HomeTestimonials } from "@/components/sections/home-testimonials";
import { HomeNewsletter } from "@/components/sections/home-newsletter";
import { HomePromos } from "@/components/sections/home-promos";
import { PressLogos } from "@/components/sections/press-logos";
import { StatsCounter } from "@/components/sections/stats-counter";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("home.meta_title"),
    description: t("home.meta_description"),
    alternates: buildAlternates("/", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <StatsCounter variant="light" />
        <PressLogos />
        <HomeServices />
        <HomeProcess />
        <HomeTestimonials />
        <HomePromos />
        <HomeNewsletter />
      </main>
      <Footer />
    </>
  );
}
