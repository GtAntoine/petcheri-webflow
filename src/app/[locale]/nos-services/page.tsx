import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ICONS, ILLUSTRATIONS, PHOTOS } from "@/lib/assets";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Garde, toilettage, comportement, transport et bien-être — tous nos services pour chiens, chats et NAC partout en France.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const ANIMAL_CATEGORIES = [
  {
    icon: ICONS.dog,
    title: "Services pour chiens",
    desc: "Dogsitting, promenade, toilettage, comportement et éducation, massage, ostéopathie…",
    href: "/services-chien" as const,
    cta: "Voir les services chien",
  },
  {
    icon: ICONS.ctCat,
    title: "Services pour chats",
    desc: "Catsitting et visites, comportement, toilettage, massage, ostéopathie…",
    href: "/services-chat" as const,
    cta: "Voir les services chat",
  },
  {
    icon: ICONS.nac,
    title: "Services pour NAC",
    desc: "Visite, garde, soins spécifiques, transport, aide administrative…",
    href: "/services-nac" as const,
    cta: "Voir les services NAC",
  },
] as const;

const SERVICE_CATEGORIES = [
  {
    title: "Garde sur-mesure",
    desc: "Garde de chiens à la journée ou sur plusieurs jours, visites et garde de chats et NAC, pension familiale.",
    items: ["Garde de jour", "Garde de nuit", "Garde à domicile", "Pension familiale"],
    href: "/garde-chien" as const,
    image: ILLUSTRATIONS.gardeNuit,
  },
  {
    title: "Toilettage",
    desc: "À domicile ou en salon, laissez votre animal se faire pomponner en toute détente par nos toiletteurs professionnels.",
    items: ["Toilettage chien", "Toilettage chat", "Coupe des griffes", "Spa canin"],
    href: "/toilettage" as const,
    image: ILLUSTRATIONS.grooming,
  },
  {
    title: "Comportement & Éducation",
    desc: "Des comportementalistes et experts en éducation positive pour une relation harmonieuse.",
    items: ["Bilan comportemental", "Éducation positive", "Comportement canin", "Comportement félin"],
    href: "/comportement-education" as const,
    image: ILLUSTRATIONS.dogDay,
  },
  {
    title: "Bien-être & soins",
    desc: "L'expertise de nos professionnels au service du bien-être de votre animal.",
    items: ["Massage", "Ostéopathie", "Aromathérapie", "Naturopathie"],
    href: "/nos-services" as const,
    image: ILLUSTRATIONS.catSitting,
  },
  {
    title: "Transport animalier",
    desc: "Vos trajets tout-confort avec des chauffeurs agréés et un maximum de sécurité.",
    items: ["Taxi animalier", "Livraison à domicile", "Transport longue distance"],
    href: "/transport" as const,
    image: PHOTOS.moodboard5,
  },
  {
    title: "Autres services",
    desc: "Votre demande ne figure pas sur cette liste ? Nous avons quand même la solution.",
    items: ["Démarches administratives", "Aménagement pet-friendly", "Sur devis"],
    href: "/contact" as const,
    image: PHOTOS.moodboard6,
  },
] as const;

export default async function NosServicesPage({
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
        badge="Disponible 7j/7 partout en France"
        title="Services personnalisés pour votre animal"
        subtitle="Quelque soit le besoin de votre animal, nous avons la solution adaptée, réalisée par des experts sélectionnés, partout en France."
        ctas={[
          { label: "Réserver", href: "https://app.petcheri.com", external: true, primary: true },
          { label: "Nous contacter", href: "/contact" },
        ]}
        image={PHOTOS.moodboard5}
        imageAlt="Chouchouteur Petcheri avec un animal"
        trustBadges={["Chouchouteurs vérifiés", "Assurance AXA incluse", "Sans engagement"]}
        variant="warm"
      />

      {/* Animal categories */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Pour des animaux heureux 🤎"
            title="Chiens, chats et NAC sont les bienvenus"
            subtitle="Sélectionnez l'espèce de votre compagnon pour découvrir les services adaptés."
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {ANIMAL_CATEGORIES.map((cat) => (
              <div
                key={cat.href}
                className="card-base p-8 flex flex-col gap-4 hover:shadow-[--shadow-card-hover] transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-[--color-creme] flex items-center justify-center">
                  <Image src={cat.icon} alt={cat.title} width={32} height={32} />
                </div>
                <h3 className="text-h3 text-[--color-chocolat]">{cat.title}</h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed flex-1">
                  {cat.desc}
                </p>
                <Link
                  href={cat.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold mt-2 transition-all"
                  style={{ color: "#E8705A" }}
                >
                  {cat.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service categories grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Nos prestations"
            title="Garde sur-mesure, toilettage, éducation et plus"
            subtitle="Chaque animal est unique — c'est pour cela que chez Petcheri, nous trouvons le service qui lui convient le mieux."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.title} className="card-base overflow-hidden flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden bg-[--color-creme]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <h3 className="text-h3 text-[--color-chocolat]">{cat.title}</h3>
                  <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                    {cat.desc}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-[--color-muted-foreground]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[--color-or] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={cat.href}
                    className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: "#E8705A" }}
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Prêt à chouchouter votre animal ?"
        subtitle="Dites-nous tout sur lui et nous vous proposerons une solution 100 % sur-mesure."
        primaryCta={{ label: "Trouver mon chouchouteur", href: "https://app.petcheri.com", external: true }}
        secondaryCta={{ label: "Nous contacter", href: "/contact" }}
      />

      <Footer />
    </>
  );
}
