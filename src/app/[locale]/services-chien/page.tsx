import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { HomeProcess } from "@/components/sections/home-process";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ICONS, PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("services_chien.meta_title"),
    description: t("services_chien.meta_description"),
    alternates: buildAlternates("/services-chien", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const DOG_SERVICES = [
  {
    icon: ICONS.dog,
    title: "Garde de jour",
    desc: "Des gardes à la journée personnalisées selon les besoins de votre chien et les vôtres.",
    href: "/garde-chien" as const,
  },
  {
    icon: ICONS.ctSleep,
    title: "Garde de nuit & pension",
    desc: "Des gardes sur-mesure lorsque vous partez en vacances — chez vous ou en pension familiale.",
    href: "/garde-nuit" as const,
  },
  {
    icon: ICONS.walking,
    title: "Promenade",
    desc: "Promenade en forêt ou en ville, en groupe ou en solo selon les besoins de votre toutou.",
    href: "/nos-services" as const,
  },
  {
    icon: ICONS.ctGrooming,
    title: "Toilettage",
    desc: "Toilettage en salon ou à domicile pour un pelage impeccable et un chien heureux.",
    href: "/toilettage" as const,
  },
  {
    icon: ICONS.education,
    title: "Comportement & Éducation",
    desc: "Des comportementalistes et éducateurs spécialistes en éducation positive.",
    href: "/comportement-education" as const,
  },
  {
    icon: ICONS.care,
    title: "Bien-être & soins",
    desc: "Permettez à votre toutou de bénéficier de méthodes d'experts du bien-être animalier.",
    href: "/nos-services" as const,
  },
  {
    icon: ICONS.ctTransport,
    title: "Transport animalier",
    desc: "Vos trajets et voyages tout-confort avec des chauffeurs agréés et un maximum de sécurité.",
    href: "/transport" as const,
  },
  {
    icon: ICONS.travel,
    title: "Voyage, administratif & autres",
    desc: "Vous partez avec votre chien ? Besoin d'aide administrative ? Nous avons la solution.",
    href: "/nos-services" as const,
  },
] as const;

export default async function ServicesChienPage({
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

      <PageHero
        badge={t("services_chien.hero_badge")}
        title={
          <>
            {t("services_chien.hero_title")}{" "}
            <span className="text-accent">{t("services_chien.hero_title_accent")}</span>
          </>
        }
        subtitle={t("services_chien.hero_subtitle")}
        ctas={[
          {
            label: "Faire chouchouter mon chien",
            href: "https://app.petcheri.com",
            external: true,
            primary: true,
          },
          { label: "Voir nos formules garde", href: "/garde-chien" },
        ]}
        image={PHOTOS.moodboard2}
        imageAlt="Chouchouteur avec un chien"
        trustBadges={["Chouchouteurs certifiés", "Assurance AXA incluse", "Sans engagement"]}
        variant="warm"
      />

      {/* Services grid */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Des services personnalisés"
            title="Selon vos besoins et ceux de votre toutou"
            subtitle="Nous vous trouvons une solution au poil — quel que soit le service recherché."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOG_SERVICES.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group card-base p-6 flex flex-col gap-3 hover:shadow-[--shadow-card-hover] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[--color-creme] flex items-center justify-center">
                  <Image src={svc.icon} alt={svc.title} width={26} height={26} />
                </div>
                <h3 className="text-h3 text-[--color-chocolat] group-hover:text-[#E8705A] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">
                  {svc.desc}
                </p>
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold mt-1"
                  style={{ color: "#E8705A" }}
                >
                  Voir plus <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reused process section */}
      <HomeProcess />

      <CtaBanner
        title="Prêt à gâter votre toutou ?"
        subtitle="Notre équipe identifie le chouchouteur certifié le plus adapté à votre chien et à votre situation."
        primaryCta={{
          label: "Faire chouchouter mon chien",
          href: "https://app.petcheri.com",
          external: true,
        }}
        secondaryCta={{ label: "Tous nos services", href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
