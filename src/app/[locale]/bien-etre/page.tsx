import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { AnimatedCard } from "@/components/ui/animated-card";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import HeartIcon from "@/components/icons/heart-icon";
import HandHeartIcon from "@/components/icons/hand-heart-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import PawPrintIcon from "@/components/icons/paw-print-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import TrophyIcon from "@/components/icons/trophy-icon";
import TruckIcon from "@/components/icons/truck-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("bien_etre.meta_title"),
    description: t("bien_etre.meta_description"),
    alternates: buildAlternates("/bien-etre", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SOINS = [
  {
    title: "Massage",
    desc: "Par des techniques précises et bienveillantes, le massage favorise l'équilibre physique et émotionnel de votre animal. Idéal pour les animaux stressés, douloureux ou en convalescence.",
  },
  {
    title: "Ostéopathie",
    desc: "Médecine douce qui sollicite les capacités naturelles d'auto-guérison du corps. Applicable à tous les vertébrés — chiens, chats, lapins, chevaux — pour soulager tensions et douleurs.",
  },
  {
    title: "Reiki",
    desc: "Technique de soin énergétique par imposition des mains, visant à réduire le stress et les douleurs émotionnelles. Particulièrement bénéfique pour les animaux anxieux ou traumatisés.",
  },
  {
    title: "Naturopathie",
    desc: "Approche naturelle et non invasive : aromathérapie, homéopathie, phytothérapie, compléments alimentaires. Un accompagnement global pour la vitalité et la prévention.",
  },
  {
    title: "Bains d'algues",
    desc: "Soins marins riches en minéraux favorisant la détente musculaire, la circulation et la régénération cutanée. Un vrai spa pour votre compagnon.",
  },
  {
    title: "Hydrothérapie",
    desc: "Soins par l'eau pour réduire les douleurs, renforcer la musculature et favoriser la récupération après blessure ou chirurgie. Recommandé par nos vétérinaires partenaires.",
  },
  {
    title: "Thalassothérapie",
    desc: "Enveloppements à l'argile de la Mer Morte pour la régénération cutanée et l'apport en minéraux essentiels. Un soin complet pour le pelage et la peau.",
  },
  {
    title: "Proprioception",
    desc: "Séances de conscience corporelle renforçant les muscles profonds et l'équilibre. Idéal en prévention, en rééducation ou pour les chiens de sport.",
  },
] as const;

export default async function BienEtrePage({
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
        badge={t("bien_etre.hero_badge")}
        title={
          <>
            {t("bien_etre.hero_title")}{" "}
            <span className="text-accent">{t("bien_etre.hero_title_accent")}</span>
          </>
        }
        subtitle={t("bien_etre.hero_subtitle")}
        ctas={[
          { label: "Trouver un praticien", href: "https://app.petcheri.com", external: true, primary: true },
          { label: "Tous nos services", href: "/nos-services" },
        ]}
        trustBadges={["Praticiens certifiés", "Sélectionnés par nos vétérinaires", "À domicile ou en salon"]}
        variant="warm"
      />

      {/* Soins grid */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Nos soins"
            title="Des méthodes alternatives, des résultats concrets"
            subtitle="Chaque soin est dispensé par un praticien certifié, validé par notre comité de vétérinaires et comportementalistes partenaires."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SOINS.map((soin) => (
              <div
                key={soin.title}
                className="card-base p-6 flex flex-col gap-3"
              >
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)" }}
                >
                  {soin.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{soin.desc}</p>
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
              Trouver un praticien bien-être
            </a>
          </div>
        </div>
      </section>

      {/* Quand y penser */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Quand y penser ?"
            title="Votre animal vous parle. Il suffit d'écouter."
            subtitle="Les soins de bien-être ne sont pas réservés aux animaux malades. Ils font partie d'une approche préventive et bienveillante du soin animal."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {([
              { Icon: HeartIcon,         label: "Anxiété & peurs",        desc: "Comportements régressifs, phobie, hyperactivité" },
              { Icon: HandHeartIcon,     label: "Douleurs articulaires",   desc: "Tensions musculaires, raideurs, inconfort chronique" },
              { Icon: ShieldCheckIcon,   label: "Post-opératoire",         desc: "Récupération après chirurgie ou blessure" },
              { Icon: PawPrintIcon,      label: "Nouvel animal ou bébé",   desc: "Transition, cohabitation, adaptation au changement" },
              { Icon: HeartHandshakeIcon,label: "Vieillissement",          desc: "Mobilité réduite, confort du senior" },
              { Icon: TrophyIcon,        label: "Animaux de sport",        desc: "Prévention, récupération, performance" },
              { Icon: TruckIcon,         label: "Voyages & déménagements", desc: "Stress du transport, nouvel environnement" },
              { Icon: SparklesIcon,      label: "Bien-être au quotidien",  desc: "Maintien de l'équilibre physique et émotionnel" },
            ] as const).map(({ Icon, label, desc }) => (
              <AnimatedCard key={label} Icon={Icon} className="p-5 flex flex-col gap-2">
                <p
                  className="text-[--color-chocolat] font-medium leading-snug"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1rem" }}
                >
                  {label}
                </p>
                <p className="text-xs text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </AnimatedCard>
            ))}
          </div>

        </div>
      </section>

      {/* Sélection des praticiens */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionHeader
            label="Notre exigence"
            title="Pas n'importe qui ne touche à votre animal"
            subtitle="Chaque praticien bien-être est évalué par notre comité vétérinaire avant d'intégrer le réseau Petcheri. Diplômes, références, entretien comportemental — notre processus de sélection est aussi rigoureux que pour nos chouchouteurs."
            className="mb-8"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {["Diplômes vérifiés", "Entretien vétérinaire", "Expérience terrain", "Assurance professionnelle AXA", "Évaluations régulières"].map((label) => (
              <span
                key={label}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-[--color-chocolat] border border-[--color-border]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Offrez à votre animal le soin qu'il mérite vraiment"
        subtitle="Des praticiens certifiés, une approche bienveillante et des résultats visibles. Réservez une séance bien-être dès aujourd'hui."
        primaryCta={{ label: "Trouver un praticien", href: "https://app.petcheri.com", external: true }}
        secondaryCta={{ label: "Comportement & éducation", href: "/comportement-education" }}
      />

      <Footer />
    </>
  );
}
