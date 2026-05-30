import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedCardHorizontal } from "@/components/ui/animated-card-horizontal";
import { routing } from "@/i18n/routing";
import { ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import SparklesIcon from "@/components/icons/sparkles-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import UsersIcon from "@/components/icons/users-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import GraduationCapIcon from "@/components/icons/graduation-cap-icon";
import HeartIcon from "@/components/icons/heart-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("devenir_petsitter.meta_title"),
    description: t("devenir_petsitter.meta_description"),
    alternates: buildAlternates("/devenir-petsitter", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const AVANTAGES = [
  {
    Icon: SparklesIcon,
    title: "Liberté totale",
    desc: "Vous choisissez vos disponibilités, vos services et votre zone géographique. Petcheri s'adapte à votre rythme de vie.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Assurance professionnelle",
    desc: "Chaque prestation est couverte par notre assurance AXA à hauteur de 9 000 000 €. Vous exercez en toute sérénité.",
  },
  {
    Icon: UsersIcon,
    title: "Une communauté soudée",
    desc: "400 chouchouteurs en France, des vétérinaires partenaires, des comportementalistes — un réseau d'entraide unique.",
  },
  {
    Icon: GraduationCapIcon,
    title: "Formation & accompagnement",
    desc: "Accès à des modules de formation, webinaires et ressources exclusives pour monter en compétences en continu.",
  },
  {
    Icon: TrophyIcon,
    title: "Visibilité & réputation",
    desc: "Profitez de la notoriété Petcheri (Purina, Pépites du Tech, Gala, Europe 1) pour développer votre activité.",
  },
  {
    Icon: HeartHandshakeIcon,
    title: "Un suivi personnalisé",
    desc: "Un concierge dédié vous accompagne au quotidien — de la mise en relation au suivi qualité, vous n'êtes jamais seul.",
  },
] as const;

const PROFILS = [
  {
    Icon: PawPrintIcon,
    title: "Passionnés des animaux",
    desc: "Votre amour des animaux n'est pas qu'un hobby — c'est une vocation. On cherche des gens comme vous.",
  },
  {
    Icon: GraduationCapIcon,
    title: "Professionnels du secteur",
    desc: "Auxiliaires vétérinaires, soigneurs animaliers, comportementalistes, éducateurs — vos diplômes sont un atout majeur.",
  },
  {
    Icon: HeartIcon,
    title: "Profils en reconversion",
    desc: "Vous souhaitez faire de votre passion un métier ? Nous accompagnons les reconversions avec formation et suivi.",
  },
] as const;

const ETAPES = [
  {
    num: "01",
    title: "Candidature en ligne",
    desc: "Remplissez le formulaire en quelques minutes — expérience, disponibilités, services souhaités. Pas de CV requis.",
  },
  {
    num: "02",
    title: "Entretien avec notre équipe",
    desc: "Un échange humain avec un membre de l'équipe Petcheri et un comportementaliste partenaire pour mieux vous connaître.",
  },
  {
    num: "03",
    title: "Validation & onboarding",
    desc: "Test de compétences, vérification des références, signature de la charte qualité. Bienvenue dans la famille Petcheri.",
  },
  {
    num: "04",
    title: "Vos premières missions",
    desc: "Votre profil est en ligne et visible par des milliers de propriétaires. Les demandes arrivent, vous choisissez.",
  },
] as const;

export default async function DevenirPetsitterPage({
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
        badge={t("devenir_petsitter.hero_badge")}
        title={
          <>
            Faites de votre passion{" "}
            <span className="text-accent">un vrai métier</span>
          </>
        }
        subtitle="Vous aimez les animaux autant que nous ? Rejoignez les 400 chouchouteurs qui font confiance à Petcheri pour exercer en toute liberté, avec une assurance professionnelle et l'appui d'une équipe exigeante."
        ctas={[
          { label: "Candidater maintenant", href: "https://forms.gle/petcheri", external: true, primary: true },
          { label: "En savoir plus", href: "#avantages" },
        ]}
        image={ILLUSTRATIONS.heroPetsitter}
        imageAlt="Chouchouteur Petcheri avec un chien"
        trustBadges={["400+ chouchouteurs", "Assurance AXA incluse", "Formation continue"]}
        variant="warm"
      />

      {/* Stats strip */}
      <section className="py-10 bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "400+",  label: "chouchouteurs en France" },
              { value: "80%",   label: "de professionnels certifiés" },
              { value: "4,9/5", label: "de satisfaction moyenne" },
              { value: "9M€",   label: "d'assurance professionnelle" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="font-normal leading-none"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", color: "#E8705A" }}
                >
                  {value}
                </span>
                <span className="text-sm text-[--color-muted-foreground]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Pourquoi Petcheri ?"
            title="Ce que vous gagnez en rejoignant le réseau"
            subtitle="Petcheri n'est pas une simple plateforme de mise en relation. C'est un réseau premium avec des standards élevés — et des avantages à la hauteur."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AVANTAGES.map(({ Icon, title, desc }) => (
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

      {/* Profils recherchés */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Qui cherchons-nous ?"
                title="Des gens qui aiment vraiment les animaux"
                subtitle="Notre processus de sélection est rigoureux parce que nos clients confient ce qu'ils ont de plus précieux. Voici les profils que nous cherchons."
                align="left"
                className="mb-8"
              />
              <div className="flex flex-col gap-4">
                {PROFILS.map(({ Icon, title, desc }) => (
                  <AnimatedCardHorizontal key={title} Icon={Icon}>
                    <h3
                      className="text-[--color-chocolat] font-medium"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)" }}
                    >
                      {title}
                    </h3>
                    <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
                  </AnimatedCardHorizontal>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[PHOTOS.chouchouteur2, PHOTOS.chouchouteur5, PHOTOS.chouchouteur6, PHOTOS.chouchouteur7].map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={src} alt="Chouchouteur Petcheri" fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Comment ça marche ?"
            title="De la candidature à votre première mission"
            subtitle="Un processus clair, humain et rapide. De votre candidature à vos premières missions : comptez moins de deux semaines."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ETAPES.map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col gap-4">
                <span
                  className="font-normal text-[--color-or]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1 }}
                >
                  {num}
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

      {/* Témoignage chouchouteur */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-h-[520px]">
              <Image
                src={PHOTOS.chouchouteur9}
                alt="Chouchouteur Petcheri"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div
                className="absolute -bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(to top, rgba(44,24,16,0.85) 0%, transparent 100%)" }}
              >
                <p className="text-white/90 text-sm italic leading-relaxed">
                  &ldquo;Rejoindre Petcheri, c&apos;est la meilleure décision que j&apos;ai prise pour ma reconversion.
                  J&apos;ai des clients fidèles, une assurance sérieuse et une équipe qui répond toujours présente.&rdquo;
                </p>
                <p className="text-white/60 text-xs mt-2">— Camille R., chouchouteuse depuis 2022, Paris</p>
              </div>
            </div>
            <div>
              <SectionHeader
                label="Ils ont sauté le pas"
                title="Ce que disent nos chouchouteurs"
                subtitle="400 chouchouteurs ont choisi Petcheri pour exercer leur passion. Voici ce qu'ils en pensent après quelques mois."
                align="left"
                className="mb-8"
              />
              <div className="space-y-4">
                {[
                  { quote: "En 6 mois j'ai constitué une clientèle fidèle. La réputation de Petcheri ouvre des portes.", author: "Lucas M.", detail: "Auxiliaire vétérinaire, Lyon" },
                  { quote: "Le processus de candidature est exigeant, mais c'est exactement ce qui donne de la valeur au label.", author: "Fatima B.", detail: "Comportementaliste certifiée, Bordeaux" },
                  { quote: "Je travaille à mon rythme, je choisis mes clients. Je n'ai jamais autant aimé mon métier.", author: "Julien K.", detail: "Dog-sitter professionnel, Marseille" },
                ].map(({ quote, author, detail }) => (
                  <div key={author} className="p-5 rounded-xl bg-[--color-ivoire] border border-[--color-border]">
                    <p className="text-sm text-[--color-chocolat] italic leading-relaxed mb-3">&ldquo;{quote}&rdquo;</p>
                    <div>
                      <p className="text-xs font-semibold text-[--color-chocolat]">{author}</p>
                      <p className="text-xs text-[--color-muted-foreground]">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Prêt à rejoindre les meilleurs chouchouteurs de France ?"
        subtitle="La candidature prend 5 minutes. Le reste, c'est nous qui nous en occupons."
        primaryCta={{ label: "Candidater maintenant", href: "https://forms.gle/petcheri", external: true }}
        secondaryCta={{ label: "Nous contacter", href: "/contact" }}
      />

      <Footer />
    </>
  );
}
