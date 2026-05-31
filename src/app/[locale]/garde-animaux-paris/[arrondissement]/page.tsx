import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeader } from "@/components/sections/section-header";
import { HomeProcess } from "@/components/sections/home-process";
import { routing } from "@/i18n/routing";
import { PARIS_ZONES, getZone, totalSitters } from "@/lib/zones-data";
import { BOOKING_URL } from "@/lib/site-stats";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import HeartHandshakeIcon from "@/components/icons/heart-handshake-icon";
import SparklesIcon from "@/components/icons/sparkles-icon";
import SearchIcon from "@/components/icons/search-icon";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://petcheri.com";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; arrondissement: string }>;
}): Promise<Metadata> {
  const { locale, arrondissement } = await params;
  const zone = getZone(arrondissement);
  if (!zone) return {};

  const title =
    locale === "fr"
      ? `Garde d'animaux Paris ${zone.arrondissement} — Petcheri`
      : `Pet sitting Paris ${zone.arrondissement} — Petcheri`;

  const description =
    locale === "fr"
      ? `${totalSitters(zone)} prestataires certifiés disponibles dans le ${zone.label} pour la garde de chien, chat et NAC. Service de conciergerie avec assurance AXA incluse.`
      : `${totalSitters(zone)} certified petsitters available in ${zone.label}. Dog, cat and exotic pet care with AXA insurance included.`;

  const slug = `/garde-animaux-paris/${arrondissement}`;
  const canonical =
    locale === "fr"
      ? `${BASE_URL}${slug}`
      : `${BASE_URL}/en${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fr: `${BASE_URL}${slug}`,
        en: `${BASE_URL}/en${slug}`,
        "x-default": `${BASE_URL}${slug}`,
      },
    },
  };
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PARIS_ZONES.map((z) => ({ locale, arrondissement: z.arrondissement }))
  );
}

// Revalider toutes les 24h — sera utile quand les données viennent de l'API
export const revalidate = 86400;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GardeAnimauxParisPage({
  params,
}: {
  params: Promise<{ locale: string; arrondissement: string }>;
}) {
  const { locale, arrondissement } = await params;
  setRequestLocale(locale);

  const zone = getZone(arrondissement);
  if (!zone) notFound();

  const isFr = locale === "fr";
  const t = await getTranslations({ locale, namespace: "pages" });

  // ── Libellés selon locale ───────────────────────────────────────────────────
  const headingTitle = isFr
    ? `Garde d'animaux à ${zone.label}`
    : `Pet care in ${zone.label}`;

  const headingAccent = isFr ? zone.arrondissement : zone.arrondissement;

  const heroSubtitle = isFr
    ? `Des prestataires certifiés, sélectionnés à la main par notre équipe de conciergerie. Assurance AXA incluse, suivi photos quotidien, disponible 7j/7.`
    : `Hand-picked certified petsitters in your neighbourhood. AXA insurance included, daily photo updates, available 7 days a week.`;

  // ── Services cards ─────────────────────────────────────────────────────────
  const SERVICE_CARDS = [
    {
      label:    isFr ? "Garde à domicile" : "Home sitting",
      sublabel: isFr ? "Jour & nuit" : "Day & night",
      count:    zone.services.garde,
      emoji:    "🏠",
    },
    {
      label:    isFr ? "Promenade" : "Dog walking",
      sublabel: isFr ? "Ville & forêt" : "City & forest",
      count:    zone.services.promenade,
      emoji:    "🦮",
    },
    {
      label:    isFr ? "Visites chat / NAC" : "Cat & exotic pet visits",
      sublabel: isFr ? "À votre domicile" : "At your home",
      count:    zone.services.visites,
      emoji:    "🐱",
    },
    {
      label:    isFr ? "Toilettage" : "Grooming",
      sublabel: isFr ? "À domicile" : "At home",
      count:    zone.services.toilettage,
      emoji:    "✂️",
    },
    {
      label:    isFr ? "Comportement & éducation" : "Training & behaviour",
      sublabel: isFr ? "Chiens & chats" : "Dogs & cats",
      count:    zone.services.comportement,
      emoji:    "🎓",
    },
    {
      label:    isFr ? "Transport" : "Pet transport",
      sublabel: isFr ? "Vétérinaire & voyages" : "Vet & travel",
      count:    zone.services.transport,
      emoji:    "🚗",
    },
  ];

  const GUARANTEES = [
    {
      Icon:  HeartHandshakeIcon,
      title: isFr ? "Matching humain" : "Human matching",
      desc:  isFr
        ? "Notre équipe choisit le prestataire pour vous — pas un algorithme. Chaque match est réfléchi en fonction de votre animal."
        : "Our team selects the right sitter for you — not an algorithm. Every match is carefully considered.",
    },
    {
      Icon:  SparklesIcon,
      title: isFr ? "Prestataires certifiés" : "Certified petsitters",
      desc:  isFr
        ? "Entretien individuel, vérification des références, période supervisée. 0 profil auto-déclaré dans notre réseau."
        : "Individual interview, reference checks, supervised trial. No self-declared profiles in our network.",
    },
    {
      Icon:  ShieldCheckIcon,
      title: isFr ? "Assurance AXA incluse" : "AXA insurance included",
      desc:  isFr
        ? "Chaque prestation est couverte par notre assurance AXA. Pas d'option à cocher, pas de surprise."
        : "Every service is covered by our AXA insurance. No optional add-ons, no surprises.",
    },
    {
      Icon:  SearchIcon,
      title: isFr ? "Suivi transparent" : "Transparent follow-up",
      desc:  isFr
        ? "Photos quotidiennes, compte-rendu de sortie, WhatsApp 7j/7. Vous savez ce qui se passe, en temps réel."
        : "Daily photos, activity reports, WhatsApp 7/7. You always know what's happening in real time.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="pt-28 pb-20 px-6"
        style={{ background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-[--color-muted-foreground] mb-6">
            <span>Paris</span>
            <span>›</span>
            <span className="font-medium text-[--color-chocolat]">{zone.label}</span>
          </nav>

          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-4 block">
            {isFr ? "Conciergerie animalière" : "Pet concierge service"}
          </span>

          <h1
            className="text-[--color-chocolat] mb-5 font-normal"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.15 }}
          >
            {isFr ? "Garde d'animaux à Paris " : "Pet care in Paris "}
            <span className="text-accent">{headingAccent}</span>
          </h1>

          <p className="text-lead mb-8 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>

          {/* Stats inline */}
          <div className="flex items-center justify-center flex-wrap gap-8 mb-10">
            <div className="flex flex-col items-center">
              <span
                className="font-normal text-[--color-chocolat]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
              >
                {totalSitters(zone)}+
              </span>
              <span className="text-sm text-[--color-muted-foreground] mt-1">
                {isFr ? "prestataires dans votre zone" : "sitters in your area"}
              </span>
            </div>
            <div className="w-px h-10 bg-[--color-border] hidden sm:block" />
            <div className="flex flex-col items-center">
              <span
                className="font-normal text-[--color-chocolat]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
              >
                4,9/5
              </span>
              <span className="text-sm text-[--color-muted-foreground] mt-1">
                {isFr ? "note moyenne Google" : "Google rating"}
              </span>
            </div>
            <div className="w-px h-10 bg-[--color-border] hidden sm:block" />
            <div className="flex flex-col items-center">
              <span
                className="font-normal text-[--color-chocolat]"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
              >
                24h
              </span>
              <span className="text-sm text-[--color-muted-foreground] mt-1">
                {isFr ? "délai de match moyen" : "average match time"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
              style={{ background: "#C0432D" }}
            >
              {isFr ? "Trouver mon prestataire" : "Find my petsitter"}
            </a>
            <a
              href="/nos-services"
              className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-3.5 text-sm font-semibold text-[--color-chocolat] bg-white/70 hover:bg-white transition-all"
              style={{ borderColor: "#E8705A" }}
            >
              {isFr ? "Voir nos services" : "See our services"}
            </a>
          </div>
        </div>
      </section>

      {/* ── Services disponibles ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={isFr ? "Services disponibles" : "Available services"}
            title={isFr ? `Ce que nous proposons dans le ${zone.arrondissement}` : `What we offer in ${zone.arrondissement}`}
            subtitle={
              isFr
                ? "Tous les prestataires sont certifiés par notre équipe. Les chiffres sont mis à jour régulièrement."
                : "All sitters are certified by our team. Numbers are updated regularly."
            }
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_CARDS.map((svc) => (
              <div key={svc.label} className="card-base p-6 flex items-start gap-4">
                <span className="text-3xl shrink-0 mt-0.5">{svc.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p
                      className="font-medium text-[--color-chocolat]"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem" }}
                    >
                      {svc.label}
                    </p>
                    <span
                      className="text-sm font-semibold shrink-0 px-2.5 py-0.5 rounded-full"
                      style={{ background: "#fde0d4", color: "#C0432D" }}
                    >
                      {svc.count}+
                    </span>
                  </div>
                  <p className="text-xs text-[--color-muted-foreground] mt-0.5">{svc.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Garanties ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label={isFr ? "Nos engagements" : "Our commitments"}
            title={isFr ? "Pourquoi choisir Petcheri ?" : "Why choose Petcheri?"}
            subtitle={
              isFr
                ? "Ce qui nous différencie des plateformes de mise en relation classiques."
                : "What sets us apart from standard pet-sitting platforms."
            }
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUARANTEES.map(({ Icon, title, desc }) => (
              <div key={title} className="card-base p-7 flex flex-col items-center gap-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[--color-creme] flex items-center justify-center">
                  <Icon size={22} color="#C0432D" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-[--color-chocolat] font-medium"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ───────────────────────────────────────────────── */}
      <HomeProcess />

      {/* ── Autres arrondissements ──────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[--color-muted-foreground] mb-5">
            {isFr ? "Nous intervenons aussi dans" : "We also operate in"}
          </p>
          <div className="flex flex-wrap gap-2">
            {PARIS_ZONES.filter((z) => z.arrondissement !== zone.arrondissement).map((z) => (
              <a
                key={z.arrondissement}
                href={`/garde-animaux-paris/${z.arrondissement}`}
                className="text-sm px-3.5 py-1.5 rounded-full border border-[--color-border] text-[--color-chocolat] hover:border-[#E8705A] hover:text-[#E8705A] transition-colors"
              >
                Paris {z.arrondissement}
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={
          isFr
            ? `Vous cherchez un prestataire dans le ${zone.arrondissement} ?`
            : `Looking for a petsitter in ${zone.arrondissement}?`
        }
        subtitle={
          isFr
            ? "Décrivez votre animal et vos dates — notre équipe trouve la perle rare pour vous en moins de 24h."
            : "Tell us about your pet and dates — our team will find the perfect match in under 24 hours."
        }
        primaryCta={{
          label: isFr ? "Faire une demande" : "Make a request",
          href:  BOOKING_URL,
          external: true,
        }}
        secondaryCta={{
          label: isFr ? "En savoir plus" : "Learn more",
          href:  "/qui-sommes-nous",
        }}
      />

      <Footer />
    </>
  );
}
