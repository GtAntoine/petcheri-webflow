import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHeroCentered } from "@/components/sections/page-hero-centered";
import { routing } from "@/i18n/routing";
import { NosBoonsPlansClient } from "./_components/nos-bons-plans-client";

export const metadata: Metadata = {
  title: "Nos bons plans — Petcheri",
  description:
    "Des offres exclusives chez nos partenaires triés sur le volet : alimentation, santé, accessoires, assurance et compléments pour votre animal.",
};

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

  return (
    <>
      <Navbar />

      <PageHeroCentered
        badge="15 offres exclusives"
        title={<>Nos <span style={{ color: "#E8705A" }}>bons plans</span></>}
        subtitle="Des offres exclusives chez nos partenaires triés sur le volet — alimentation premium, soins, accessoires, assurance et compléments pour le bien-être de votre animal."
      />

      {/* Listing */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <NosBoonsPlansClient />
        </div>
      </section>

      <Footer />
    </>
  );
}
