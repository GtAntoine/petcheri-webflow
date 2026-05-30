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
  title: "Comportement & Éducation",
  description:
    "Éducation positive, bilan comportemental, rééducation pour chiens et chats — par des comportementalistes certifiés. Assurance AXA incluse.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const DOG_SOLUTIONS = [
  {
    emoji: "🧠",
    title: "Troubles du comportement",
    desc: "Votre animal présente un comportement problématique ? Nos éducateurs et comportementalistes professionnels vous aident à mieux comprendre ce que votre animal essaie d'exprimer.",
    image: ILLUSTRATIONS.dogDay,
  },
  {
    emoji: "🐾",
    title: "Arrivée d'un chiot",
    desc: "Accueillir un nouvel animal peut soulever beaucoup de questions. Un professionnel vous aidera à préparer son arrivée et assurer une cohabitation harmonieuse.",
    image: PHOTOS.moodboard2,
  },
  {
    emoji: "👥",
    title: "Leçon en groupe",
    desc: "Idéales pour socialiser votre animal, les leçons en groupe allient théorie et pratique via des méthodes positives. Activités de communication entre chiens et humains.",
    image: PHOTOS.chouchouteur1,
  },
  {
    emoji: "🌳",
    title: "Promenade éducative",
    desc: "Aider votre chien à mieux appréhender son environnement et ses imprévus. Promenades en forêt ou en ville selon les défis à relever.",
    image: PHOTOS.moodboard5,
  },
] as const;

const CAT_ISSUES = [
  "Agressivité & comportements défensifs",
  "Miaulements intempestifs",
  "Déjections hors de la litière",
  "Anxiété & stress chronique",
  "Problèmes de cohabitation",
  "Marquage urinaire",
];

const WHY_US = [
  {
    title: "Une approche positive et bienveillante",
    desc: "Nos comportementalistes privilégient des méthodes respectueuses du bien-être animal — sans contrainte ni punition.",
  },
  {
    title: "Un suivi personnalisé",
    desc: "Chaque animal est unique. Nos experts établissent un plan d'action adapté à votre situation spécifique.",
  },
  {
    title: "Des professionnels diplômés",
    desc: "Nos comportementalistes et éducateurs sont sélectionnés pour leur formation, leur professionnalisme et leur douceur.",
  },
  {
    title: "Service assuré",
    desc: "Chaque intervention est couverte par notre assurance professionnelle pour votre tranquillité d'esprit.",
  },
] as const;

export default async function ComportementEducationPage({
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
        badge="🎓 Comportement & Éducation"
        title={
          <>
            Fini les{" "}
            <span className="text-accent">humeurs de chien&nbsp;!</span>
          </>
        }
        subtitle="Se faire accompagner par un professionnel n'est pas un échec — c'est un investissement pour offrir sérénité et complicité entre votre animal et vous."
        ctas={[
          { label: "Réserver une séance", href: "https://app.petcheri.com", external: true, primary: true },
          { label: "Nos services chien", href: "/services-chien" },
        ]}
        image={ILLUSTRATIONS.dogDay}
        imageAlt="Éducateur avec un chien"
        trustBadges={["Comportementalistes certifiés", "Éducation positive", "Assurance AXA incluse"]}
        variant="warm"
      />

      {/* Dog solutions */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Nos solutions paw-sitives pour chiens 🐕"
            title="Par quelle problématique êtes-vous concerné·e ?"
            subtitle="Que vous souhaitiez aider votre chien à faire face à un trouble du comportement, éduquer votre chiot ou le socialiser — nous avons la solution adaptée."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {DOG_SOLUTIONS.map((sol) => (
              <div key={sol.title} className="card-base overflow-hidden flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-40 aspect-video sm:aspect-auto shrink-0 overflow-hidden bg-[--color-creme]">
                  <Image
                    src={sol.image}
                    alt={sol.title}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sol.emoji}</span>
                    <h3 className="text-h3 text-[--color-chocolat]">{sol.title}</h3>
                  </div>
                  <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{sol.desc}</p>
                </div>
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
              Réserver une séance
            </a>
          </div>
        </div>
      </section>

      {/* Cat section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src={ILLUSTRATIONS.catSitting}
                alt="Comportementaliste félin"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeader
                label="Nos solutions pawsitives pour chats 🐱"
                title="Les comportementalistes félins existent pour ça"
                subtitle="Agressivité, miaulements, déjections hors litière… les chats expriment leur stress à leur façon. Nos spécialistes identifient les causes et instaurent une harmonie bénéfique pour tout le foyer."
                align="left"
                className="mb-8"
              />
              <div className="grid grid-cols-2 gap-3">
                {CAT_ISSUES.map((issue) => (
                  <div key={issue} className="flex items-center gap-2 text-sm text-[--color-muted-foreground]">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#E8705A" }} />
                    {issue}
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
                  Réserver une séance comportement chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Petcheri */}
      <section className="section-padding bg-[--color-creme]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Pourquoi choisir Petcheri ?"
            title="Une approche positive et sur-mesure"
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <div key={item.title} className="card-base p-6 flex flex-col gap-3">
                <h3 className="text-h3 text-[--color-chocolat]">{item.title}</h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Prêt à retrouver la sérénité avec votre animal ?"
        subtitle="Un simple conditionnement peut faire la différence dans la communication avec votre compagnon."
        primaryCta={{ label: "Réserver une séance", href: "https://app.petcheri.com", external: true }}
        secondaryCta={{ label: "Tous nos services", href: "/nos-services" }}
      />

      <Footer />
    </>
  );
}
