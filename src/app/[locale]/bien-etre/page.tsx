import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { PHOTOS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Bien-être & soins pour animaux — Petcheri",
  description:
    "Massage, ostéopathie, reiki, naturopathie, hydrothérapie… Des soins alternatifs pour l'équilibre physique et émotionnel de votre animal, par des praticiens certifiés.",
};

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

  return (
    <>
      <Navbar />

      <PageHero
        badge="💚 Bien-être & soins"
        title={
          <>
            Parce qu&apos;un animal épanoui,{" "}
            <span className="text-accent">ça se voit et ça se sent</span>
          </>
        }
        subtitle="Au-delà de la garde et du toilettage, Petcheri propose des méthodes alternatives pour le bien-être profond de votre animal. Des praticiens certifiés, sélectionnés par nos vétérinaires partenaires, à domicile ou en salon."
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Quand y penser ?"
                title="Votre animal vous parle. Il suffit d'écouter."
                subtitle="Les soins de bien-être ne sont pas réservés aux animaux malades. Ils font partie d'une approche préventive et bienveillante du soin animal."
                align="left"
                className="mb-8"
              />
              <div className="space-y-3">
                {[
                  { situation: "Anxiété, peurs ou comportements régressifs" },
                  { situation: "Douleurs musculaires ou articulaires" },
                  { situation: "Récupération post-opératoire" },
                  { situation: "Arrivée d'un nouvel animal ou d'un bébé" },
                  { situation: "Vieillissement et mobilité réduite" },
                  { situation: "Prévention chez les animaux de sport" },
                  { situation: "Stress lié aux voyages ou déménagements" },
                ].map(({ situation }) => (
                  <div key={situation} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-white text-xs"
                      style={{ background: "var(--color-sauge)" }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-[--color-muted-foreground] leading-relaxed">{situation}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.moodboard2}
                alt="Soin bien-être pour animal"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
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
