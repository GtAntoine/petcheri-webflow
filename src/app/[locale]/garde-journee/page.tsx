import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("garde_journee.meta_title"),
    description: t("garde_journee.meta_description"),
    alternates: buildAlternates("/garde-journee", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const FORMULES = [
  {
    title: "Visite express",
    duration: "1h",
    desc: "Un chouchouteur passe chez vous pour nourrir votre chien, jouer avec lui et lui faire faire une sortie. Idéal pour briser les longues heures seul.",
    includes: ["Nourrissage", "Sortie courte", "Rapport photo"],
  },
  {
    title: "Demi-journée",
    duration: "4h",
    desc: "Garde chez vous ou chez le chouchouteur le matin ou l'après-midi. Parfait pour les journées un peu chargées sans être une absence complète.",
    includes: ["Nourrissage", "Promenade", "Jeux & câlins", "Rapport photo"],
  },
  {
    title: "Journée complète",
    duration: "8h+",
    desc: "Votre chien est accueilli toute la journée dans un cadre familial et chaleureux. Il rentre le soir heureux et fatigué — vous aussi !",
    includes: ["Nourrissage", "Promenades", "Socialisation", "Rapport photo", "Mises à jour en temps réel"],
  },
] as const;

const INCLUS = [
  "Rapport de sortie avec photos à chaque visite",
  "Chouchouteurs sélectionnés et certifiés",
  "Assurance professionnelle AXA 9 000 000 €",
  "Suivi par nos concierges et vétérinaires partenaires",
  "Réservation et paiement sécurisés via l'app Petcheri",
];

export default async function GardeJourneePage({
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
        badge={t("garde_journee.hero_badge")}
        title={
          <>
            {t("garde_journee.hero_title")}{" "}
            <span className="text-accent">{t("garde_journee.hero_title_accent")}</span>
          </>
        }
        subtitle={t("garde_journee.hero_subtitle")}
        ctas={[
          { label: "Trouver un chouchouteur", href: "https://app.petcheri.com", external: true, primary: true },
          { label: "Nos autres services", href: "/nos-services" },
        ]}
        image={ILLUSTRATIONS.dogDay}
        imageAlt="Chien gardé à la journée"
        trustBadges={["Chouchouteurs certifiés", "Assurance AXA incluse", "Rapport photo inclus"]}
        variant="warm"
      />

      {/* Formules */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Nos formules"
            title="À la carte, selon vos besoins"
            subtitle="Que vous partiez une heure ou toute la journée, on a la formule qui colle. Sans engagement, réservable en quelques clics."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {FORMULES.map((f) => (
              <div key={f.title} className="card-base p-7 flex flex-col gap-4">
                <div className="flex items-end justify-between">
                  <h3
                    className="text-[--color-chocolat] font-medium"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                  >
                    {f.title}
                  </h3>
                  <span
                    className="text-sm font-semibold px-3 py-0.5 rounded-full"
                    style={{ background: "#fde0d4", color: "#E8705A" }}
                  >
                    {f.duration}
                  </span>
                </div>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{f.desc}</p>
                <ul className="mt-auto space-y-1.5">
                  {f.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[--color-muted-foreground]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#E8705A" }} />
                      {item}
                    </li>
                  ))}
                </ul>
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
              Réserver une garde de journée
            </a>
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.moodboard5}
                alt="Chouchouteur avec chien"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div>
              <SectionHeader
                label="Ce qui est inclus"
                title="Un service transparent de A à Z"
                subtitle="Chaque prestation suit un protocole strict que nos concierges supervisent personnellement."
                align="left"
                className="mb-8"
              />
              <ul className="space-y-4">
                {INCLUS.map((item) => (
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
        title="Votre chien mérite la meilleure journée possible"
        subtitle="Nos chouchouteurs sont disponibles 7j/7 dans toute la France. Trouvez le vôtre en quelques minutes."
        primaryCta={{ label: "Trouver un chouchouteur", href: "https://app.petcheri.com", external: true }}
        secondaryCta={{ label: "Garde de nuit aussi", href: "/garde-nuit" }}
      />

      <Footer />
    </>
  );
}
