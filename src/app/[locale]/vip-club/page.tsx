import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { PHOTOS } from "@/lib/assets";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import PartyPopperIcon from "@/components/icons/party-popper-icon";
import HandHeartIcon from "@/components/icons/hand-heart-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import { AnimatedCard } from "@/components/ui/animated-card";

export const metadata: Metadata = {
  title: "Le VIP Club — Very Important Pet",
  description:
    "Le Very Important Pet Club by Petcheri : événements exclusifs, ateliers bien-être animal, cadeaux personnalisés et rencontres entre membres passionnés.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BENEFITS = [
  {
    Icon: GraduationCapIcon,
    title: "Ateliers & tables rondes",
    desc: "Des sessions animées par des spécialistes du comportement animal, des vétérinaires et des experts du bien-être — pour mieux comprendre et accompagner votre compagnon.",
  },
  {
    Icon: PartyPopperIcon,
    title: "Invitations exclusives",
    desc: "Accès prioritaire à tous nos événements privés : soirées membres, avant-premières, rencontres VIP avec des experts du secteur animalier.",
  },
  {
    Icon: HandHeartIcon,
    title: "Cadeaux personnalisés & surprises",
    desc: "Votre animal est unique — nos attentions aussi. Coffrets personnalisés, surprises d'anniversaire pour votre animal et sélections exclusives de produits premium.",
  },
  {
    Icon: PawPrintIcon,
    title: "Rencontres régulières entre membres",
    desc: "Rejoignez une communauté de propriétaires passionnés. Des rencontres organisées régulièrement pour échanger, partager et créer des liens autour de l'amour des animaux.",
  },
  {
    Icon: HeartHandshakeIcon,
    title: "Interventions associatives",
    desc: "Des représentants d'associations engagées pour le bien-être animal interviennent lors de nos événements pour sensibiliser et agir ensemble.",
  },
] as const;

export default async function VipClubPage({
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
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium text-[--color-chocolat] shadow-sm mb-6">
                <span className="text-base">👑</span>
                Very Important Pet
              </div>
              <h1
                className="text-[--color-chocolat] mb-6 font-normal"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}
              >
                Le{" "}
                <span className="text-accent">VIP Club</span>
                <br />
                <span className="text-[--color-muted-foreground]" style={{ fontSize: "0.65em" }}>
                  Very Important Pet
                </span>
              </h1>
              <p className="text-lead mb-8">
                Le Very Important Pet Club by Petcheri a pour mission de promouvoir le bien-être
                animal à travers des événements exclusifs, ateliers et rencontres avec des experts
                du secteur.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
                style={{ background: "#E8705A" }}
              >
                En savoir plus
              </a>
            </div>

            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={PHOTOS.vipInvitation}
                  alt="VIP Club Petcheri"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-5 -left-5 card-base px-5 py-4 flex items-center gap-3"
              >
                <span className="text-2xl">🐾</span>
                <div>
                  <p className="text-sm font-semibold text-[--color-chocolat]">Communauté bienveillante</p>
                  <p className="text-xs text-[--color-muted-foreground]">Membres passionnés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Des avantages de wouf"
            title="Ce que vous offre le VIP Club"
            subtitle="Rejoignez une communauté bienveillante et offrez à votre animal le privilège de faire partie d'une expérience unique."
            className="mb-12"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.slice(0, 3).map(({ Icon, title, desc }) => (
              <AnimatedCard key={title} Icon={Icon} className="p-7 flex flex-col gap-4">
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

          <div className="grid sm:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
            {BENEFITS.slice(3).map(({ Icon, title, desc }) => (
              <AnimatedCard key={title} Icon={Icon} className="p-7 flex flex-col gap-4">
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

      {/* L'esprit du club */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Notre mission"
                title="Promouvoir le bien-être animal ensemble"
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 text-sm text-[--color-muted-foreground] leading-relaxed">
                <p>
                  Le VIP Club est né d&apos;une conviction simple : les propriétaires d&apos;animaux
                  méritent une communauté à la hauteur de leur engagement envers leurs compagnons.
                </p>
                <p>
                  Plus qu&apos;un programme d&apos;avantages, c&apos;est un espace de partage où
                  experts, associations et passionnés se retrouvent pour faire avancer la cause du
                  bien-être animal.
                </p>
                <p>
                  Rejoignez dès aujourd&apos;hui le Very Important Pet Club et offrez à votre animal
                  le privilège de faire partie d&apos;une communauté bienveillante.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
                  style={{ background: "#E8705A" }}
                >
                  Rejoindre le VIP Club
                </a>
                <a
                  href="/nos-services"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-[--color-chocolat] border border-[--color-border] hover:border-[--color-chocolat] transition-colors bg-white"
                >
                  Voir nos services
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                PHOTOS.moodboard1,
                PHOTOS.moodboard2,
                PHOTOS.moodboard5,
                PHOTOS.moodboard6,
              ].map((src, i) => (
                <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 ? "aspect-square" : i === 1 ? "aspect-[3/4]" : i === 2 ? "aspect-[3/4]" : "aspect-square"}`}>
                  <Image
                    src={src}
                    alt="VIP Club Petcheri"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Prêt à rejoindre le Very Important Pet Club ?"
        subtitle="Contactez-nous pour en savoir plus sur les modalités d'adhésion et les prochains événements."
        primaryCta={{ label: "Nous contacter", href: "/contact" }}
        secondaryCta={{ label: "Découvrir Petcheri", href: "/qui-sommes-nous" }}
      />

      <Footer />
    </>
  );
}
