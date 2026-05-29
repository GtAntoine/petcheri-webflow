import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { routing } from "@/i18n/routing";

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
      <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-h1 text-[--color-chocolat] mb-4">Nos bons plans</h1>
        <p className="text-lead">Page en cours de construction.</p>
      </main>
      <Footer />
    </>
  );
}
