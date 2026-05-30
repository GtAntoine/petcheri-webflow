import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { AnimatedCard } from "@/components/ui/animated-card";
import { routing } from "@/i18n/routing";
import { PHOTOS } from "@/lib/assets";
import { Phone } from "lucide-react";
import { AnimatedCardHorizontal } from "@/components/ui/animated-card-horizontal";
import { TrustGridItem } from "@/components/ui/trust-grid-item";
import SparklesIcon from "@/components/icons/sparkles-icon";
import HandHeartIcon from "@/components/icons/hand-heart-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import UnorderedListIcon from "@/components/icons/unordered-list-icon";
import PartyPopperIcon from "@/components/icons/party-popper-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import UsersIcon from "@/components/icons/users-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";

export const metadata: Metadata = {
  title: "Petcheri Luxury Hotels — Conciergerie animalière pour l'hôtellerie de prestige",
  description:
    "Offrez à vos clients voyageant avec un animal une expérience palace à la hauteur de votre établissement. Box de bienvenue, room service animalier, événements sur-mesure — géré par Petcheri, à vos couleurs.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    Icon: SparklesIcon,
    title: "Box de bienvenue sur-mesure",
    desc: "Accueillez vos hôtes et leurs compagnons avec une box pensée dans les moindres détails : gamelle personnalisée aux couleurs de l'hôtel, friandises premium, kit de soins, carte de bienvenue et informations pratiques sur les services disponibles.",
  },
  {
    Icon: HandHeartIcon,
    title: "Room service animalier",
    desc: "Un menu complet de produits et services intégré à votre offre room service, sous votre marque. Snacks haut de gamme, accessoires, réservation de promenades, toilettage, transport — tout est géré opérationnellement par Petcheri, en toute discrétion.",
  },
  {
    Icon: PartyPopperIcon,
    title: "Événements & expériences exclusives",
    desc: "Co-créez des expériences mémorables pour vos clients : Pet Social Club, ateliers bien-être (shiatsu, brushing, massage), rencontres avec éducateurs, comportementalistes et photographes animaliers. Des moments qui font parler.",
  },
] as const;

const DIFFERENTIATORS = [
  {
    Icon: ShieldCheckIcon,
    title: "Assurance professionnelle 9 000 000 €",
    desc: "Chaque intervention de nos chouchouteurs est couverte par une assurance professionnelle de 9 millions d'euros. Votre établissement est protégé, vos clients rassurés.",
  },
  {
    Icon: TrophyIcon,
    title: "Un seul interlocuteur dédié",
    desc: "Un account manager Petcheri vous est attribué dès la signature. Il coordonne l'ensemble des prestations et répond à toute demande urgente de vos équipes en quelques minutes.",
  },
  {
    Icon: UsersIcon,
    title: "Personnel animalier à disposition",
    desc: "Besoin d'un chouchouteur sur place pour un événement, un séjour longue durée ou une clientèle régulière ? Nous assurons la mise à disposition de professionnels certifiés, selon vos plannings.",
  },
  {
    Icon: PawPrintIcon,
    title: "Marque blanche disponible",
    desc: "L'intégralité de nos services peut être proposée sous l'identité de votre établissement. Vos clients vivent une expérience palace cohérente — du check-in au check-out.",
  },
] as const;

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Un brief de 30 minutes",
    desc: "Un échange avec notre équipe pour comprendre votre établissement, votre clientèle et vos standards de service. Nous adaptons chaque détail à votre positionnement.",
  },
  {
    step: "02",
    title: "On conçoit votre offre",
    desc: "Création de votre kit d'accueil sur-mesure, de votre menu de services et de votre protocole d'intervention — aux couleurs de votre hôtel, en moins de deux semaines.",
  },
  {
    step: "03",
    title: "Vos clients profitent",
    desc: "Dès la première réservation incluant un animal, le protocole Petcheri s'active. Simple, discret, impeccable — exactement à la hauteur de ce que votre établissement promet.",
  },
] as const;

const TRUST_ITEMS = [
  { Icon: UsersIcon, text: "Réseau de +400 chouchouteurs certifiés" },
  { Icon: ShieldCheckIcon, text: "Assurance professionnelle AXA 9 000 000 €" },
  { Icon: HeartHandshakeIcon, text: "Disponibilité 7j/7, de 8h à 20h" },
  { Icon: GraduationCapIcon, text: "Mise à disposition de personnel sur site" },
  { Icon: SparklesIcon, text: "Marque blanche disponible sur demande" },
  { Icon: UnorderedListIcon, text: "Reporting mensuel de l'activité animalière" },
];

const HOTEL_TYPES = [
  "Palaces & 5 étoiles",
  "Hôtels boutique",
  "Maisons de maître",
  "Résidences de prestige",
  "Lodges & domaines",
  "Hôtels de charme",
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function LuxuryHotelsPage({
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
        badge="🏨 Petcheri pour l'hôtellerie de luxe"
        title={
          <>
            Faites de chaque séjour{" "} <br />
            <span style={{ color: "#E8705A" }}>une expérience inoubliable</span>
            {" "}  <br />même pour leurs animaux
          </>
        }
        subtitle="Vos clients voyagent avec leurs compagnons et attendent le même niveau d'excellence pour eux. Petcheri accompagne les établissements de prestige avec une conciergerie animalière clé en main, à la hauteur de vos exigences."
        ctas={[
          { label: "Nous contacter", href: "/contact", primary: true },
          { label: "Découvrir les services", href: "#services" },
        ]}
        image={PHOTOS.luxuryHero}
        imageAlt="Petcheri Luxury Hotels — conciergerie animalière de prestige"
        trustBadges={["Clé en main", "Marque blanche disponible", "Assurance 9M€ incluse"]}
        variant="warm"
      />

      {/* Stats strip */}
      <section className="py-10 bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "1 sur 3", label: "voyageurs emmène son animal en vacances" },
              { value: "9 000 000 €", label: "d'assurance professionnelle incluse" },
              { value: "+400", label: "chouchouteurs certifiés disponibles" },
              { value: "2 sem.", label: "pour déployer votre offre sur-mesure" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="font-normal leading-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                    color: "#E8705A",
                  }}
                >
                  {value}
                </span>
                <span className="text-sm text-[--color-muted-foreground]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Ce que nous proposons"
            title="Un service complet, à vos couleurs"
            subtitle="Trois piliers pour transformer chaque séjour avec animal en expérience palace — intégralement opérés par Petcheri, sous votre identité si vous le souhaitez."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <AnimatedCard key={svc.title} Icon={svc.Icon} className="p-8 flex flex-col gap-4">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                  }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{svc.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Petcheri */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Pourquoi Petcheri ?"
            title="Ce qui nous distingue dans l'hôtellerie haut de gamme"
            subtitle="Nous ne sommes pas une plateforme généraliste. Petcheri est une conciergerie animalière premium, construite pour répondre aux standards de l'hôtellerie de luxe."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {DIFFERENTIATORS.map(({ Icon, title, desc }) => (
              <AnimatedCardHorizontal key={title} Icon={Icon}>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)",
                  }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </AnimatedCardHorizontal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Comment ça marche ?"
            title="Opérationnel en deux semaines"
            subtitle="De notre premier échange à l'accueil du premier client avec animal — un déploiement rapide, sans friction pour vos équipes."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-4">
                <span
                  className="font-normal text-[--color-or]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    lineHeight: 1,
                  }}
                >
                  {step}
                </span>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                  }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + photo */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Des établissements qui nous font confiance"
                title="Une solution éprouvée par les hôtels les plus exigeants"
                subtitle="De Paris à la Côte d'Azur, nos partenaires hôteliers apprécient la rigueur, la discrétion et l'impact sur la satisfaction de leurs clients."
                align="left"
                className="mb-10"
              />

              {/* Hotel types */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-[--color-chocolat] mb-3 uppercase tracking-wider">
                  Établissements partenaires
                </p>
                <div className="flex flex-wrap gap-2">
                  {HOTEL_TYPES.map((type) => (
                    <span
                      key={type}
                      className="text-sm px-4 py-1.5 rounded-full bg-white border border-[--color-border] text-[--color-muted-foreground]"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust grid */}
              <div className="grid grid-cols-2 gap-3">
                {TRUST_ITEMS.map(({ Icon, text }) => (
                  <TrustGridItem key={text} Icon={Icon} text={text} />
                ))}
              </div>
            </div>

            {/* Photo collage */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={PHOTOS.luxury3}
                  alt="Conciergerie animalière hôtel de luxe"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              {/* Secondary photo inset */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={PHOTOS.luxury4}
                  alt="Accueil animal en hôtel"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              {/* Floating card */}
              <div
                className="absolute -top-6 -left-6 card-base p-5 max-w-[210px]"
                style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[--color-chocolat] mb-1">
                  Satisfaction client
                </p>
                <p
                  className="font-normal text-[--color-chocolat]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", lineHeight: 1 }}
                >
                  4,9 / 5
                </p>
                <p className="text-xs text-[--color-muted-foreground] mt-1">
                  note moyenne sur nos interventions en hôtel
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-12 bg-white border-y border-[--color-border]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-[--color-muted-foreground] mb-2 uppercase tracking-wider font-medium">
            Une question ? Notre équipe vous répond
          </p>
          <a
            href="tel:+33185089730"
            className="inline-flex items-center gap-2 text-[--color-chocolat] font-semibold hover:text-[#E8705A] transition-colors"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}
          >
            <Phone className="w-5 h-5" />
            01 85 08 97 30
          </a>
          <p className="text-xs text-[--color-muted-foreground] mt-1">Disponible du lundi au dimanche, 9h – 18h</p>
        </div>
      </section>

      <CtaBanner
        title="Offrez l'expérience palace à vos clients — et à leurs animaux"
        subtitle="Parlez-nous de votre établissement. En 30 minutes, nous vous montrons ce que Petcheri peut apporter à votre offre pet-friendly."
        primaryCta={{ label: "Demander un rendez-vous", href: "/contact" }}
        secondaryCta={{ label: "Retour aux services", href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
