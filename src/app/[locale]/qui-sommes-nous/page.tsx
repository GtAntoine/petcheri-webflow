import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import TrophyIcon from "@/components/icons/trophy-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import SearchIcon from "@/components/icons/search-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import { AnimatedCard } from "@/components/ui/animated-card";
import { PressLogos } from "@/components/sections/press-logos";
import { StatsCounter } from "@/components/sections/stats-counter";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("qui_sommes_nous.meta_title"),
    description: t("qui_sommes_nous.meta_description"),
    alternates: buildAlternates("/qui-sommes-nous", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const VALUES = [
  {
    Icon: HeartHandshakeIcon,
    title: "Confiance",
    desc: "Chaque chouchouteur est sélectionné après un processus rigoureux contrôlé par des comportementalistes et des vétérinaires.",
  },
  {
    Icon: SparklesIcon,
    title: "Excellence",
    desc: "Nous veillons personnellement à ce que chaque prestation soit effectuée conformément à nos standards de qualité.",
  },
  {
    Icon: SearchIcon,
    title: "Transparence",
    desc: "Photos, rapports de sortie, comptes-rendus en temps réel — vous savez toujours ce que vit votre animal.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Sécurité",
    desc: "Tous nos prestataires bénéficient de notre assurance professionnelle contractée chez AXA pour votre tranquillité.",
  },
] as const;

const AWARDS = [
  {
    title: "Pépites du Tech",
    date: "Octobre 2022",
    desc: "Lauréats du concours Pépites du Tech, récompensant les startups technologiques les plus innovantes de France.",
  },
  {
    title: "1er prix Pet Tech — Purina by Nestlé",
    date: "Novembre 2023",
    desc: "Premier prix du concours Pet Tech organisé par Purina by Nestlé, distinguant les solutions les plus prometteuses pour le bien-être animal.",
  },
] as const;

export default async function QuiSommesNousPage({
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
        className="pt-28 pb-20 px-6"
        style={{ background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-4 block">
                Notre histoire
              </span>
              <h1
                className="text-[--color-chocolat] mb-6 font-normal"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}
              >
                Plus que de la mise en relation,{" "}
                <span className="text-accent">une conciergerie de cœur</span>
              </h1>
              <p className="text-lead mb-8">
                Petcheri est une conciergerie créée par et pour des propriétaires d&apos;animaux,
                dont le but est d&apos;offrir des services personnalisés au plus proche des besoins
                du client et de son animal — en s&apos;appuyant sur 4 valeurs fondamentales :
                Confiance, Excellence, Transparence et Sécurité.
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { value: "400+", label: "chouchouteurs" },
                  { value: "80%", label: "professionnels certifiés" },
                  { value: "4,9/5", label: "satisfaction client" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col">
                    <span
                      className="font-normal text-[--color-chocolat]"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", lineHeight: 1 }}
                    >
                      {value}
                    </span>
                    <span className="text-sm text-[--color-muted-foreground] mt-1">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={ILLUSTRATIONS.heroAbout}
                alt="L'équipe Petcheri"
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notre histoire — Mélanie */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={ILLUSTRATIONS.about}
                  alt="Mélanie, fondatrice de Petcheri"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              {/* Floating quote */}
              <div
                className="absolute -bottom-6 -right-6 card-base p-5 max-w-[240px]"
                style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
              >
                <p className="text-sm font-medium text-[--color-chocolat] leading-relaxed">
                  &ldquo;Créée par des amoureux d&apos;animaux, pour des amoureux d&apos;animaux.&rdquo;
                </p>
                <p className="text-sm text-[--color-muted-foreground] mt-2">— Mélanie, fondatrice</p>
              </div>
            </div>

            <div>
              <SectionHeader
                label="Notre histoire"
                title="L'histoire de Mélanie et Malka"
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 text-sm text-[--color-muted-foreground] leading-relaxed">
                <p>
                  Petcheri, c&apos;est l&apos;histoire de Mélanie, une dog-mum qui a fait tous les
                  mauvais choix pour que vous puissiez faire les bons&nbsp;!
                </p>
                <p>
                  Rentrée en France après des années aux États-Unis, impossible de trouver une
                  solution fiable pour faire garder sa chienne Malka durant ses longues journées au
                  bureau.
                </p>
                <p>
                  Après plusieurs expériences malheureuses, elle décide de créer une conciergerie
                  qui offrirait une qualité de prestation à la hauteur de l&apos;amour que nous
                  portons à nos animaux.
                </p>
                <p className="font-medium text-[--color-chocolat]">
                  Petcheri est né.
                </p>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-[--color-creme]">
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                  &ldquo;Notre objectif est de révolutionner les services pour animaux de compagnie
                  en France non pas quantitativement mais qualitativement&nbsp;: nous avons à cœur
                  de faire évoluer les mentalités en termes de bien-être animal.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 valeurs */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Ce en quoi nous croyons"
            title="4 valeurs fondamentales"
            subtitle="Elles guident chaque recrutement, chaque prestation, chaque décision. Sans compromis."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ Icon, title, desc }) => (
              <AnimatedCard key={title} Icon={Icon} className="p-7 flex flex-col gap-4 text-center items-center">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Nos chouchouteurs */}
      <section className="section-padding" style={{ background: "linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-light) 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] mb-4 block" style={{ color: "#E8705A" }}>
                Notre réseau
              </span>
              <h2
                className="text-white mb-6 font-normal"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.2 }}
              >
                Des chouchouteurs sélectionnés avec le plus grand soin
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Nos chouchouteurs sont sélectionnés après un processus de recrutement très rigoureux
                contrôlé par des comportementalistes et des vétérinaires. Nous testons leurs
                compétences, nous assurons de leur expérience mais aussi de leur amour pour les
                animaux.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { value: "400", label: "prestataires passionnés à travers la France" },
                  { value: "80%", label: "de professionnels certifiés du secteur animalier" },
                  { value: "100%", label: "assurés professionnellement chez AXA" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span
                      className="font-normal"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", color: "#E8705A", lineHeight: 1 }}
                    >
                      {value}
                    </span>
                    <span className="text-white/60 text-xs leading-snug">{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                80% de professionnels certifiés du secteur animalier (soigneurs, auxiliaires
                vétérinaires, comportementalistes…) et 20% de non-professionnels ou en formation
                qui témoignent de plusieurs années d&apos;expérience concluantes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[PHOTOS.chouchouteur1, PHOTOS.chouchouteur2, PHOTOS.chouchouteur3, PHOTOS.chouchouteur4].map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={src} alt={`Chouchouteur Petcheri`} fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Récompenses */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Reconnus par les meilleurs"
            title="Nos récompenses"
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {AWARDS.map(({ title, date, desc }) => (
              <div
                key={title}
                className="card-base p-7 flex flex-col gap-3 text-center items-center"
                style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
              >
                <TrophyIcon size={28} color="#C9A96E" strokeWidth={1.5} />
                <div>
                  <p
                    className="text-[--color-chocolat] font-medium mb-1"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}
                  >
                    {title}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "#E8705A" }}>{date}</p>
                </div>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <StatsCounter variant="navy" />

      {/* Ils parlent de nous */}
      <PressLogos />

      {/* Team photos */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="La team"
            title="Des humains passionnés derrière chaque prestation"
            subtitle="Nous veillons personnellement à ce que chaque prestation soit effectuée conformément à nos valeurs via un suivi très rigoureux par nos concierges mais aussi par nos équipes de vétérinaires et comportementalistes partenaires."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { src: PHOTOS.team2, name: "Team Petcheri" },
              { src: PHOTOS.team3, name: "Team Petcheri" },
              { src: PHOTOS.team4, name: "Team Petcheri" },
            ].map(({ src, name }, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src={src} alt={name} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Vous êtes professionnel ou amoureux des animaux ?"
        subtitle="Rejoignez notre réseau de chouchouteurs et faites ce que vous aimez tout en aidant des propriétaires d'animaux."
        primaryCta={{ label: "Nous rejoindre", href: "/devenir-petsitter" }}
        secondaryCta={{ label: "Nos services", href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
