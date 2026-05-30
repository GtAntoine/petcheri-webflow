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

  return (
    <>
      <Navbar />

      <PageHeroCentered
        badge="18 articles & guides"
        title={<>Le blog <span className="text-accent">Petcheri</span></>}
        subtitle="Conseils d'experts, guides pratiques et inspirations pour le bien-être de votre animal — par notre équipe de vétérinaires, comportementalistes et passionnés."
      />

      {/* Listing */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <BlogListing />
        </div>
      </section>

      <Footer />
    </>
  );
}
