import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { PressLogos } from "@/components/sections/press-logos";
import { routing } from "@/i18n/routing";
import { UI } from "@/lib/assets";
import { buildAlternates } from "@/lib/seo";
import Image from "next/image";
import { Star } from "lucide-react";
import MessageSquareIcon from "@/components/icons/message-square-icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("vos_avis.meta_title"),
    description: t("vos_avis.meta_description"),
    alternates: buildAlternates("/vos-avis", locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const TESTIMONIALS = [
  {
    text: "Petcheri a trouvé la personne parfaite pour notre golden en moins de 24h. Suivi impeccable, photos régulières — on partait serein. Je ne ferai jamais autrement.",
    author: "Marie-Laure D.",
    pet: "Sirius, Golden Retriever",
    service: "Garde à domicile",
    rating: 5,
  },
  {
    text: "Ce qui m'a séduit, c'est le niveau d'exigence. Les chouchouteurs sont vraiment certifiés, l'assurance est réelle, et l'équipe répond en quelques minutes. Du vrai sur-mesure.",
    author: "Thomas A.",
    pet: "Luna, Siberian Husky",
    service: "Garde de nuit",
    rating: 5,
  },
  {
    text: "Mon chat est casanier et stressé. La chouchouteuse a pris le temps de le rencontrer avant, de comprendre ses habitudes. Il était parfaitement à l'aise à notre retour.",
    author: "Sophie C.",
    pet: "Mochi, British Shorthair",
    service: "Garde de chat",
    rating: 5,
  },
  {
    text: "La promenade avec rapport de sortie et photos en temps réel, c'est exactement ce qu'il me fallait. Mon border collie rentre épuisé et heureux. Merci Petcheri !",
    author: "Émilie R.",
    pet: "Pixel, Border Collie",
    service: "Promenade",
    rating: 5,
  },
  {
    text: "Après une opération du genou, notre labrador avait besoin de soins très spécifiques. La chouchouteuse connaissait parfaitement les protocoles post-op. Remarquable.",
    author: "Bertrand L.",
    pet: "Noisette, Labrador",
    service: "Garde post-opératoire",
    rating: 5,
  },
  {
    text: "On a utilisé Petcheri pour le transport de notre lapin nain chez le vétérinaire. Prise en charge douce, retour rapide avec compte-rendu. On recommande sans hésiter.",
    author: "Anaïs M.",
    pet: "Caramel, Lapin nain",
    service: "Transport NAC",
    rating: 5,
  },
  {
    text: "Notre chienne avait des troubles d'anxiété de séparation. En 3 séances avec le comportementaliste Petcheri, elle a retrouvé un équilibre incroyable. Une vraie expertise.",
    author: "Clément V.",
    pet: "Zélie, Beagle",
    service: "Comportement & éducation",
    rating: 5,
  },
  {
    text: "Le toilettage à domicile c'est un luxe dont on ne peut plus se passer ! La toiletteuse est patiente, professionnelle et Cosmo ressort comme un prince.",
    author: "Nathalie B.",
    pet: "Cosmo, Caniche",
    service: "Toilettage",
    rating: 5,
  },
  {
    text: "Je suis très exigeante pour mon chien. Petcheri est le seul service qui a répondu à ce niveau d'exigence — sélection des profils, assurance, suivi. Enfin du sérieux.",
    author: "Isabelle F.",
    pet: "Romeo, Bouledogue français",
    service: "Garde à domicile",
    rating: 5,
  },
] as const;

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[--color-or] text-[--color-or]" />
      ))}
    </div>
  );
}

export default async function VosAvisPage({
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
        className="pt-28 pb-16 px-6"
        style={{ background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-4 block">
            Vos avis
          </span>
          <h1
            className="text-[--color-chocolat] mb-6 font-normal"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}
          >
            Ce que disent les propriétaires{" "}
            <span className="text-accent">qui nous font confiance</span>
          </h1>
          <p className="text-lead mb-10">
            Des centaines de familles font confiance à Petcheri chaque semaine.
            Voici ce qu&apos;elles en pensent — sans filtre.
          </p>

          {/* Google badge */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-[--color-border] shadow-sm">
            <Image src={UI.avisGoogle} alt="Avis Google" width={80} height={28} className="h-7 w-auto" />
            <div className="h-6 w-px bg-[--color-border]" />
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-2">
                <span
                  className="font-normal text-[--color-chocolat]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", lineHeight: 1 }}
                >
                  4,9
                </span>
                <StarRow count={5} />
              </div>
              <span className="text-xs text-[--color-muted-foreground]">Note moyenne Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-[--color-border]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "4,9/5",  label: "note moyenne Google" },
              { value: "2 347+", label: "familles accompagnées" },
              { value: "98%",    label: "de satisfaction client" },
              { value: "15 000+",label: "prestations réalisées" },
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

      {/* Testimonials grid */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Témoignages"
            title="Ils nous ont confié leur animal"
            subtitle="Des gardes, des promenades, du toilettage, du comportement… Chaque témoignage est une histoire de confiance."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="card-base p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <MessageSquareIcon size={22} color="var(--color-or)" className="opacity-50 shrink-0 mt-0.5" />
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: "#fde0d4", color: "#E8705A" }}
                  >
                    {item.service}
                  </span>
                </div>
                <p className="text-[--color-chocolat] leading-relaxed italic text-sm flex-1">
                  &ldquo;{item.text}&rdquo;
                </p>
                <StarRow count={item.rating} />
                <div className="flex items-center gap-3 pt-1 border-t border-[--color-border]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
                    style={{ background: "#C0432D" }}
                  >
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[--color-chocolat]">{item.author}</p>
                    <p className="text-xs text-[--color-muted-foreground]">{item.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laisser un avis */}
      <section className="py-14 bg-white border-y border-[--color-border]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p
            className="text-[--color-chocolat] font-normal mb-3"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            Vous aussi, partagez votre expérience
          </p>
          <p className="text-sm text-[--color-muted-foreground] mb-6 leading-relaxed">
            Votre avis aide d&apos;autres propriétaires à trouver le chouchouteur idéal — et nous aide à maintenir notre niveau d&apos;exigence.
          </p>
          <a
            href="https://g.page/r/petcheri/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
            style={{ background: "#C0432D" }}
          >
            Laisser un avis Google
          </a>
        </div>
      </section>

      {/* Presse */}
      <PressLogos />

      <CtaBanner
        title="Rejoignez les familles qui nous font confiance"
        subtitle="4,9/5 sur Google. Assurance AXA. Chouchouteurs certifiés. Réservez votre première prestation."
        primaryCta={{ label: "Trouver un chouchouteur", href: "https://app.petcheri.com", external: true }}
        secondaryCta={{ label: "Qui sommes-nous ?", href: "/qui-sommes-nous" }}
      />

      <Footer />
    </>
  );
}
