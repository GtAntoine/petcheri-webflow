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
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Toilettage",
  description:
    "Toilettage à domicile ou en salon pour chiens et chats — bain, coupe, griffes, spa. Toiletteurs professionnels sélectionnés par Petcheri, assurance AXA.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const DOG_SERVICES = [
  {
    title: "Soin complet",
    desc: "Coupe alliée à des traitements professionnels et des produits de soin rigoureusement sélectionnés pour leur qualité.",
  },
  {
    title: "Bain & brossage",
    desc: "Un bon bain et un brossage — votre chien en ressortira métamorphosé, impeccable de la truffe aux coussinets.",
  },
  {
    title: "Brossage",
    desc: "Brosse spéciale pour éliminer les poils morts et pénétrer le sous-poil pour un pelage d'une brillance « on fleek ».",
  },
  {
    title: "Coupe",
    desc: "De la coupe la plus classique à la plus excentrique — le savoir-faire de nos toiletteurs met en valeur votre toutou.",
  },
  {
    title: "Patt'icure",
    desc: "Couper et limer les griffes, essentiel pour la santé et le confort de votre boule de poils.",
  },
  {
    title: "Tonte par zone",
    desc: "Pour les zones spécifiques nécessitant une coupe ou les chiens aux poils longs sujets aux bourres.",
  },
] as const;

const CAT_SERVICES = [
  {
    title: "Coupe délicate",
    desc: "Coupe précise pour garantir le confort de votre chat et éviter les griffures accidentelles.",
  },
  {
    title: "Brossage approfondi",
    desc: "Élimine les poils morts, démêle les nœuds et maintient le pelage doux, brillant et en bonne santé.",
  },
  {
    title: "Tonte par zone",
    desc: "Coupe ciblée pour les zones à problèmes — idéale pour les poils longs ou autour de zones sensibles.",
  },
  {
    title: "Nettoyage du pelage",
    desc: "Élimine les impuretés et rafraîchit le pelage tout en respectant la peau sensible de votre chat.",
  },
  {
    title: "Nettoyage yeux & oreilles",
    desc: "Soin minutieux pour prévenir les infections et maintenir une bonne hygiène de votre félin.",
  },
  {
    title: "Soin royal",
    desc: "Le soin le plus complet : traitements professionnels et produits soigneusement sélectionnés pour leur qualité.",
  },
] as const;

const WHY_US = [
  "Des produits de haute qualité",
  "Toiletteurs sélectionnés pour leur professionnalisme et leur douceur",
  "Large éventail d'options selon les besoins de votre animal",
  "Service couvert par une assurance professionnelle",
  "À domicile ou en salon selon votre préférence",
];

export default async function ToilettagePage({
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
        badge="✂️ Toilettage professionnel"
        title={
          <>
            Votre animal a besoin d&apos;un petit{" "}
            <span style={{ color: "#E8705A" }}>glow up&nbsp;?</span>
          </>
        }
        subtitle="Petcheri vous propose des soins de toilettage à domicile ou en salon. Nous sélectionnons nos toiletteurs pour leur professionnalisme, leur douceur et leur patience."
        ctas={[
          { label: "Trouver un toiletteur", href: "https://app.petcheri.com", external: true, primary: true },
          { label: "Voir nos services", href: "/nos-services" },
        ]}
        image={ILLUSTRATIONS.grooming}
        imageAlt="Toilettage d'un animal"
        trustBadges={["Toiletteurs certifiés", "Assurance AXA incluse", "À domicile ou en salon"]}
        variant="warm"
      />

      {/* Dog grooming */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Toilettage pour chiens"
            title="Impeccable de la truffe aux coussinets"
            subtitle="Tous les chiens qui croquent la vie à pleins crocs ont besoin d'être lavés régulièrement. Offrez à votre toutou le bain et les soins qu'il mérite !"
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOG_SERVICES.map((svc) => (
              <div key={svc.title} className="card-base p-6 flex flex-col gap-3">
                <h3 className="text-h3 text-[--color-chocolat]">{svc.title}</h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                  {svc.desc}
                </p>
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
              Réserver un toilettage chien
            </a>
          </div>
        </div>
      </section>

      {/* Cat grooming */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Toilettage pour chats"
                title="Pour faire ressortir tout leur panache"
                subtitle="Les chats ont beau être de très bons toiletteurs, ils ont parfois besoin de l'aide d'un professionnel. À domicile ou en salon 100 % cat-friendly."
                align="left"
                className="mb-8"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {CAT_SERVICES.map((svc) => (
                  <div key={svc.title} className="card-base p-5 flex flex-col gap-2">
                    <h3 className="text-h3 text-[--color-chocolat] text-base">{svc.title}</h3>
                    <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="https://app.petcheri.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
                  style={{ background: "#E8705A" }}
                >
                  Réserver un toilettage chat
                </a>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={ILLUSTRATIONS.catSitting}
                alt="Chat prêt pour le toilettage"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Petcheri */}
      <section className="section-padding bg-[--color-chocolat]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] mb-3 block" style={{ color: "#E8705A" }}>
                Pourquoi choisir Petcheri ?
              </span>
              <h2 className="text-h2 text-white mb-8">
                Des soins de qualité pour un animal épanoui
              </h2>
              <ul className="space-y-4">
                {WHY_US.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#E8705A" }} />
                    <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.moodboard1}
                alt="Toiletteur Petcheri"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Offrez à votre animal les soins qu'il mérite"
        subtitle="Nos toiletteurs professionnels se déplacent chez vous ou vous accueillent en salon — à vous de choisir."
        primaryCta={{ label: "Trouver un toiletteur", href: "https://app.petcheri.com", external: true }}
        secondaryCta={{ label: "Tous nos services", href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
