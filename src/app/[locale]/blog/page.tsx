import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHeroCentered } from "@/components/sections/page-hero-centered";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { BlogListing } from "./_components/blog-listing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("blog.meta_title"),
    description: t("blog.meta_description"),
    alternates: buildAlternates("/blog", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
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
        badge={t("blog.hero_badge")}
        title={<>{t("blog.hero_title")} <span className="text-accent">{t("blog.hero_title_accent")}</span></>}
        subtitle={t("blog.hero_subtitle")}
      />

      {/* Listing */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <BlogListing locale={locale} />
        </div>
      </section>

      <Footer />
    </>
  );
}
