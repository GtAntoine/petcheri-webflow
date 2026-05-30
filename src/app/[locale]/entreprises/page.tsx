import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { CheckCircle, Building2, Users, ShieldCheck, Headphones } from "lucide-react";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import TruckIcon from "@/components/icons/truck-icon";
import HeartIcon from "@/components/icons/heart-icon";
import UnorderedListIcon from "@/components/icons/unordered-list-icon";
import { AnimatedCard } from "@/components/ui/animated-card";

export const metadata: Metadata = {
  title: "Petcheri pour les Entreprises",
  description:
    "Offrez à vos collaborateurs un service de conciergerie animalière premium. Avantage salarié innovant, RH différenciant, assurance AXA incluse.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BENEFITS = [
  {
    Icon: Users,
    title: "Avantage salarié différenciant",
    desc: "Fidélisez vos talents en offrant un service premium dédié au bien-être de leurs animaux. Un bénéfice concret et mémorable qui fait la différence lors du recrutement.",
  },
  {
    Icon: ShieldCheck,
    title: "Zéro risque, 100 % assuré",
    desc: "Chaque prestation est couverte par notre assurance professionnelle AXA. Vous offrez tranquillité d'esprit à vos collaborateurs sans aucune responsabilité supplémentaire.",
  },
  {
    Icon: Building2,
    title: "Tarifs négociés pour les équipes",
    desc: "Accès préférentiel à notre réseau de chouchouteurs vérifiés. Tarifs dégressifs selon la taille de votre entreprise et vos besoins spécifiques.",
  },
  {
    Icon: Headphones,
    title: "Account manager dédié",
    desc: "Un interlocuteur unique pour gérer l'accès de vos collaborateurs, le suivi des prestations et toute demande particulière. Simple et efficace.",
  },
] as const;

const SERVICES = [
  {
    Icon: PawPrintIcon,
    title: "Garde & promenades",
    desc: "Garde à domicile, pension, promenades quotidiennes — vos collaborateurs choisissent la formule qui leur convient.",
  },
  {
    Icon: SparklesIcon,
    title: "Toilettage",
    desc: "Bain, coupe, soins — disponibles à domicile ou en salon proche du bureau, selon les préférences.",
  },
  {
    Icon: GraduationCapIcon,
    title: "Comportement & éducation",
    desc: "Séances avec comportementalistes certifiés pour accompagner l'éducation et le bien-être des animaux.",
  },
  {
    Icon: TruckIcon,
    title: "Transport",
    desc: "Déplacements chez le vétérinaire, en pension ou sur tout trajet — avec des conducteurs formés.",
  },
  {
    Icon: HeartIcon,
    title: "Pension & hébergement",
    desc: "Des familles d'accueil ou pensions vérifiées pour les périodes de déplacements professionnels.",
  },
  {
    Icon: UnorderedListIcon,
    title: "Suivi personnalisé",
    desc: "Photos, rapports de sortie, compte-rendu de séances — tout est communiqué en temps réel via l'app.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "On s'appelle",
    desc: "Un échange de 30 minutes pour comprendre vos besoins, la taille de votre équipe et définir l'offre la plus adaptée.",
  },
  {
    step: "02",
    title: "On configure votre espace",
    desc: "Nous créons votre espace entreprise sur l'app Petcheri en moins de 48h. Vos collaborateurs reçoivent leurs accès par email.",
  },
  {
    step: "03",
    title: "Vos équipes profitent",
    desc: "Chaque collaborateur réserve ses prestations en totale autonomie. Vous gardez la main sur les budgets et le reporting.",
  },
] as const;

const TRUST_ITEMS = [
  "Réseau de +400 chouchouteurs vérifiés",
  "Assurance professionnelle AXA incluse",
  "App disponible 7j/7, 24h/24",
  "4,9 / 5 de satisfaction client",
  "Facturation mensuelle simplifiée",
  "Reporting RH disponible sur demande",
];

const SECTORS = ["Start-ups & scale-ups", "Cabinets conseil", "Agences créatives", "ESN & Tech", "Cabinets RH", "PME & ETI"];

export default async function EntreprisesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />

      <PageHero
        badge="🏢 Petcheri for Business"
        title={
          <>
            Le bien-être animal,{" "}
            <span style={{ color: "#E8705A" }}>votre meilleur avantage salarié</span>
          </>
        }
        subtitle="En France, 1 salarié sur 2 possède un animal de compagnie. Offrez-leur un service de conciergerie animalière premium — un avantage concret qui fidélise, recrute et réduit le stress au travail."
        ctas={[
          { label: "Demander un devis", href: "/contact", primary: true },
          { label: "Voir nos services", href: "/nos-services" },
        ]}
        image={ILLUSTRATIONS.about}
        imageAlt="Petcheri pour les entreprises"
        trustBadges={["Facturation entreprise", "Assurance AXA incluse", "Onboarding en 48h"]}
        variant="warm"
      />

      {/* Stats strip */}
      <section className="py-10 bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "1 sur 2", label: "salariés français ont un animal" },
              { value: "+400", label: "chouchouteurs vérifiés" },
              { value: "48h", label: "pour onboarder vos équipes" },
              { value: "4,9/5", label: "de satisfaction client" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="font-normal leading-none"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#E8705A" }}
                >
                  {value}
                </span>
                <span className="text-sm text-[--color-muted-foreground]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Pourquoi choisir Petcheri ?"
            title="Un investissement RH à fort retour"
            subtitle="Les entreprises qui intègrent Petcheri comme avantage salarié observent une hausse de l'engagement et une réduction du stress lié à la garde d'animaux."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {BENEFITS.map(({ Icon, title, desc }) => (
              <div key={title} className="card-base p-8 flex gap-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "#fde0d4" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#E8705A" }} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-[--color-chocolat] font-medium"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services included */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Ce qui est inclus"
            title="Tous les services Petcheri pour vos collaborateurs"
            subtitle="Vos équipes accèdent à l'intégralité du catalogue Petcheri — avec les tarifs négociés de votre contrat entreprise."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc) => (
              <AnimatedCard key={svc.title} Icon={svc.Icon} className="p-6 flex flex-col gap-4">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 1.5vw, 1.3rem)" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{svc.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Comment ça marche ?"
            title="Un onboarding en 3 étapes"
            subtitle="De la signature du contrat à la première réservation de votre collaborateur — moins de 48 heures."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-4">
                <span
                  className="font-normal text-[--color-or]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1 }}
                >
                  {step}
                </span>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + visual */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Ils nous font confiance"
                title="Une solution éprouvée par des centaines d'entreprises"
                subtitle="De la startup à l'ETI, nos partenaires entreprises apprécient la simplicité, la fiabilité et l'impact concret sur le bien-être de leurs équipes."
                align="left"
                className="mb-10"
              />

              {/* Sectors */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-[--color-chocolat] mb-3 uppercase tracking-wider">Secteurs partenaires</p>
                <div className="flex flex-wrap gap-2">
                  {SECTORS.map((s) => (
                    <span
                      key={s}
                      className="text-sm px-4 py-1.5 rounded-full bg-white border border-[--color-border] text-[--color-muted-foreground]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-3">
                {TRUST_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[--color-muted-foreground]">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#E8705A" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={PHOTOS.moodboard6}
                  alt="Petcheri en entreprise"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              {/* Floating card */}
              <div
                className="absolute -bottom-6 -left-6 card-base p-5 max-w-[220px]"
                style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[--color-chocolat] mb-1">
                  Satisfaction RH
                </p>
                <p
                  className="font-normal text-[--color-chocolat]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", lineHeight: 1 }}
                >
                  +38%
                </p>
                <p className="text-xs text-[--color-muted-foreground] mt-1">
                  d'engagement collaborateur moyen
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <CtaBanner
        title="Intégrez Petcheri comme avantage salarié"
        subtitle="Parlez-nous de votre entreprise — nous construisons ensemble l'offre la plus adaptée à votre équipe."
        primaryCta={{ label: "Demander un devis", href: "/contact" }}
        secondaryCta={{ label: "Découvrir nos services", href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
