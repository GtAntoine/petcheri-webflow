import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeStats } from "@/components/sections/home-stats";
import { HomeServices } from "@/components/sections/home-services";
import { HomeProcess } from "@/components/sections/home-process";
import { HomeTestimonials } from "@/components/sections/home-testimonials";
import { HomeNewsletter } from "@/components/sections/home-newsletter";
import { routing } from "@/i18n/routing";

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
        <HomeStats />
        <HomeServices />
        <HomeProcess />
        <HomeTestimonials />
        <HomeNewsletter />
      </main>
      <Footer />
    </>
  );
}
