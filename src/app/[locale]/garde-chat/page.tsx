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

export const metadata: Metadata = {
  title: "Visite & Garde de chats — Petcheri",
  description:
    "Visites à domicile, garde chez vous ou chez un chouchouteur pour votre chat. Services personnalisés selon ses habitudes — assurance AXA, photos incluses.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const FORMULES = [
  {
    title: "Visite à domicile",
    desc: "Un chouchouteur passe chez vous chaque jour pour nourrir votre chat, nettoyer la litière, jouer et le câliner. Votre félin reste dans son univers — son espace, ses habitudes, ses repères.",
    ideal: "Idéal pour les chats casaniers ou anxieux",
  },
  {
    title: "Garde à votre domicile",
    desc: "Un chouchouteur s'installe chez vous pour toute la durée de votre absence. Présence, câlins et soins non-stop pour les chats qui ont besoin de compagnie prolongée.",
    ideal: "Idéal pour les chats très sociaux",
  },
  {
    title: "Garde chez le chouchouteur",
    desc: "Votre chat est accueilli dans un foyer cat-friendly — espace dédié, jouets et attention personnalisée. Pour les félins qui s'adaptent bien aux nouveaux environnements.",
    ideal: "Idéal pour les absences longues",
  },
  {
    title: "Pension 5 étoiles",
    desc: "Nos partenaires pension offrent des espaces dédiés, des couchages confortables, des jouets et une présence humaine quasi-permanente. Le palace pour votre minou.",
    ideal: "Idéal pour un séjour premium",
  },
] as const;

const INCLUS = [
  "Nourrissage selon les habitudes de votre chat",
  "Nettoyage de la litière à chaque visite",
  "Rapport photo ou vidéo quotidien",
  "Jeux, câlins et stimulation",
  "Arrosage des plantes & relevé du courrier en option",
  "Accès à un vétérinaire partenaire si nécessaire",
];

export default async function GardeChatPage({
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
        badge="🐱 Garde de chats"
        title={
          <>
            Chouchoutés comme ils l&apos;exigent —{" "}
            <span className="text-accent">pas un poil de moins</span>
          </>
        }
        subtitle="Votre chat a ses habitudes, ses exigences et son caractère bien trempé. Nos chouchouteurs spécialisés félins s'adaptent à lui — pas l'inverse. Visite à domicile, garde chez vous ou en famille d'accueil."
        ctas={[
          { label: "Trouver un chouchouteur", href: "https://app.petcheri.com", external: true, primary: true },
          { label: "Nos services chat", href: "/services-chat" },
        ]}
        image={ILLUSTRATIONS.catSitting}
        imageAlt="Chat gardé par Petcheri"
        trustBadges={["Spécialistes félins", "Assurance AXA incluse", "Photos quotidiennes"]}
        variant="warm"
      />

      {/* Formules */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Nos formules"
            title="Selon son caractère et vos besoins"
            subtitle="Certains chats tolèrent à peine qu'on déplace leur coussin. D'autres sautent sur les genoux du premier inconnu venu. On a une solution pour les deux."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {FORMULES.map((f) => (
              <div key={f.title} className="card-base p-7 flex flex-col gap-3">
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{f.desc}</p>
                <span
                  className="text-xs font-semibold mt-auto px-3 py-1 rounded-full self-start"
                  style={{ background: "#fde0d4", color: "#E8705A" }}
                >
                  {f.ideal}
                </span>
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
              Trouver un chouchouteur pour mon chat
            </a>
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Ce qui est inclus"
                title="Tout ce dont votre chat a besoin"
                subtitle="Chaque visite ou garde suit un protocole précis. Rien n'est laissé au hasard — surtout pas l'heure du repas."
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
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS.chouchouteur3}
                alt="Chouchouteur spécialisé chats Petcheri"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Votre chat mérite la meilleure des gardes"
        subtitle="Des chouchouteurs spécialisés félins, sélectionnés par nos comportementalistes. Partez serein."
        primaryCta={{ label: "Trouver un chouchouteur", href: "https://app.petcheri.com", external: true }}
        secondaryCta={{ label: "Tous nos services chat", href: "/services-chat" }}
      />

      <Footer />
    </>
  );
}
