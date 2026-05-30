import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { routing } from "@/i18n/routing";
import { BlogListing } from "./_components/blog-listing";

export const metadata: Metadata = {
  title: "Blog — Petcheri",
  description:
    "Conseils, guides et inspirations pour les propriétaires d'animaux : santé, comportement, voyage, lifestyle et bien plus.",
};

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

      {/* Hero */}
      <section
        className="pt-28 pb-16 px-6"
        style={{ background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium text-[--color-chocolat] shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            18 articles & guides
          </div>
          <h1 className="text-display text-[--color-chocolat] mb-5 leading-[1.1]">
            Le blog{" "}
            <span style={{ color: "#E8705A" }}>Petcheri</span>
          </h1>
          <p className="text-lead">
            Conseils d&apos;experts, guides pratiques et inspirations pour le bien-être de votre animal — par notre équipe de vétérinaires, comportementalistes et passionnés.
          </p>
        </div>
      </section>

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
