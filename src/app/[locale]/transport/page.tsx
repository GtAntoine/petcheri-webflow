import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("transport.meta_title"),
    description: t("transport.meta_description"),
    alternates: buildAlternates("/transport", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const DESTINATIONS = [
  {
    title: "Vétérinaire",
    desc: "Consultation, urgence ou suivi postopératoire — votre animal est conduit et récupéré par un chouchouteur qui connaît les établissements partenaires.",
  },
  {
    title: "Toiletteur",
    desc: "Plus besoin de vous libérer pour emmener votre animal chez le toiletteur. On s'en charge, aller et retour.",
  },
  {
    title: "Famille & proches",
    desc: "Votre animal passe le week-end chez des amis ou la famille ? On assure le trajet dans les deux sens, en toute sérénité.",
  },
  {
    title: "Pension & hébergement",
    desc: "Aller déposer et récupérer votre animal dans une pension ou chez un chouchouteur — sans que vous ayez à vous déplacer.",
  },
  {
    title: "Déménagement",
    desc: "Un déménagement est toujours une source de stress pour votre animal. Nos transporteurs adaptent le trajet à son rythme.",
  },
  {
    title: "Sur mesure",
    desc: "Toute demande de transport non listée ici peut être gérée par notre conciergerie — contactez-nous pour en discuter.",
  },
] as const;

const GARANTIES = [
  "Véhicules adaptés et sécurisés pour chaque espèce",
  "Chouchouteurs certifiés et formés au transport animalier",
  "Assurance professionnelle AXA 9 000 000 €",
  "Rapport photo avant et après le trajet",
  "Suivi en temps réel disponible sur demande",
  "Disponible 7j/7, y compris week-ends et jours fériés",
];

export default async function TransportPage({
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
        badge={t("transport.hero_badge")}
        title={
          <>
            {t("transport.hero_title")}{" "}
            <span className="text-accent">{t("transport.hero_title_accent")}</span>
          </>
        }
        subtitle={t("transport.hero_subtitle")}
        ctas={[
          { label: "Réserver un transport", href: "https://app.petcheri.com", external: true, primary: true },
          { label: "Nos autres services", href: "/nos-services" },
        ]}
        trustBadges={["Chauffeurs certifiés", "Assurance AXA incluse", "Chiens, chats & NAC"]}
        variant="warm"
      />

      {/* Destinations */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Où on emmène votre animal"
            title="Toutes les destinations, un seul interlocuteur"
            subtitle="De la consultation vétérinaire au déménagement, nos chouchouteurs s'occupent du trajet pour que vous n'ayez pas à le faire."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DESTINATIONS.map((d) => (
              <div key={d.title} className="card-base p-6 flex flex-col gap-3">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)" }}
                >
                  {d.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://app.petcheri.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
              style={{ background: "#E8705A" }}
            >
              Réserver un transport
            </a>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.moodboard2}
                alt="Transport animalier Petcheri"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div>
              <SectionHeader
                label="Nos garanties"
                title="Le transport aussi, c'est un métier"
                subtitle="Un trajet stressant peut impacter votre animal pendant des heures. Nos chouchouteurs-transporteurs sont formés pour que l'expérience soit aussi douce que possible."
                align="left"
                className="mb-8"
              />
              <ul className="space-y-4">
                {GARANTIES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "#E8705A" }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-[--color-muted-foreground] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Votre animal mérite un trajet aussi doux que la destination"
        subtitle="Réservez un transport en quelques minutes. Nos chauffeurs animaliers sont disponibles 7j/7 dans toute la France."
        primaryCta={{ label: "Réserver un transport", href: "https://app.petcheri.com", external: true }}
        secondaryCta={{ label: "Tous nos services", href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
