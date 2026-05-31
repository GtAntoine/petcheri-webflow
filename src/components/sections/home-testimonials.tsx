"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SITE_STATS } from "@/lib/site-stats";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BASE = "https://cdn.prod.website-files.com/66672b13a367b9ed2f297248/";

const REVIEWS = [
  {
    photo: BASE + "66a625282547398bee45a17a_Tests%20DA-48.png",
    text: "Voilà 4 ans que je confie ma chienne Ness et mon chat Sherlock à l'équipe Petcheri en toute confiance et sérénité. Étant régulièrement en déplacement, c'est un vrai luxe de pouvoir compter sur un service aussi fiable et flexible. Un immense merci à la team et mention spéciale à Gaetan qui s'occupe à merveille de mes deux bébés.",
    author: "Aurélie",
    pet: "maman de Ness & Sherlock",
  },
  {
    photo: BASE + "66e1b61ff710d5b5023d6d46_image22.jpg",
    text: "Très bon service ! On nous a aidés à trouver à la fois un promeneur anglophone et un dog-sitter. Nous les utiliserons à nouveau !",
    author: "Luke Bauer",
    pet: "papa de Tusk",
  },
  {
    photo: BASE + "66e1b6fee21bfc0c3de52aca_image19.png",
    text: "Ils envoient des photos et vidéos quotidiennement. Dexter est véritablement excité lorsqu'il voit Inés ou Julie. Nous voyageons beaucoup et Petcheri a toujours trouvé les meilleures personnes.",
    author: "Rudy Martinez",
    pet: "papa de Dexter",
  },
  {
    photo: BASE + "66e1b70296f22149e285433a_image21.png",
    text: "Personnel très attentif et attentionné. Nous avons utilisé l'équipe à plusieurs reprises et pensons toujours que c'est le meilleur choix. Expérimenté, réactif, solidaire et facile. Une joie absolue de les avoir dans nos vies.",
    author: "Mariela Lopez",
    pet: "maman de Cali",
  },
  {
    photo: BASE + "66e1b65fcaf9d6d1d7059d90_image32.jpg",
    text: "Je le recommande vivement surtout aux étrangers et aux nouveaux arrivants en France. L'équipe est d'une aide précieuse et s'assure que tout se passe parfaitement.",
    author: "Jordan Go",
    pet: "papa de Barkley",
  },
  {
    photo: BASE + "66e1b6fe9e9f5e797d5b5e1c_image2.jpg",
    text: "Mon chat de 6 ans est très affectueux. Une collègue m'a recommandé Petcheri et nous étions heureux de recevoir quotidiennement des nouvelles de notre Lilou. Lilou ne stressait plus lorsque nous sortions.",
    author: "Delfy Góchez",
    pet: "maman de Lily & Lilas",
  },
  {
    photo: BASE + "66e1b70296f22149e285433a_image21.png",
    text: "Nous faisons entièrement confiance à l'équipe de Petcheri pour prendre soin de notre chiot bien-aimé, Henry. Ils sont gentils, attentifs, professionnels et attentionnés. Je ne saurais trop recommander Petcheri !",
    author: "Jennifer O'Donnell",
    pet: "maman de Henry",
  },
  {
    photo: BASE + "66e1b70296f22149e285432c_image13.jpg",
    text: "Une équipe excellente, attentionnée et dévouée. Mélanie et son équipe ont fait bien plus que leurs tâches pour nous accueillir en cas d'urgence. Nous leur en serons toujours reconnaissants.",
    author: "Niala Ramtahal-Sooklal",
    pet: "maman de Lizzie & Nash",
  },
  {
    photo: BASE + "66e1b6fe9749887d63b40cea_image27.jpg",
    text: "C'était formidable de travailler avec l'équipe de Petcheri. En tant que non-francophone, ils ont rendu très facile la recherche de soins pour mes chiots. J'ai essayé Rover sans succès — je n'ai pas l'intention d'y retourner !",
    author: "Greg Liebergen",
    pet: "papa de Nelson & Jordy",
  },
  {
    photo: BASE + "66e1b6ff915ce2792a33c1a2_image29.jpg",
    text: "Très facile à organiser. La baby-sitter était très agréable et gentille avec mon chien extrêmement âgé, qui appréciait vraiment la compagnie. La gardienne était à l'heure et très professionnelle.",
    author: "Heather Jones",
    pet: "maman de Chipie",
  },
  {
    photo: BASE + "66e1b6ff10f71e4eb6d0fad3_image26.jpg",
    text: "Nous sommes très reconnaissants d'avoir trouvé Petcheri ! Nous les avons beaucoup utilisés lors d'une visite d'un mois à Paris. L'équipe est d'excellents communicateurs et très fiables.",
    author: "Michelle Vespa",
    pet: "maman de Rooney",
  },
  {
    photo: BASE + "66e1b6fec0b7960a6d64c80b_image12.jpg",
    text: "We recently moved to Paris and the Petcheri team took good care of our baby while we got settled. They helped us find a boarding service and arranged transport for our dog from the airport.",
    author: "Brian Decouto",
    pet: "papa de Nia",
  },
  {
    photo: BASE + "66e1b6fe525f8da1ef3833be_image16.jpg",
    text: "Service de qualité, je recommande. L'équipe est réactive, professionnelle et vraiment passionnée par les animaux.",
    author: "Michael Delmas",
    pet: "papa de Skander",
  },
  {
    photo: BASE + "66e1b6fe8fbe4454ba7290a6_image20.jpg",
    text: "Our pamperer Ines went to great lengths to ensure the comfort and care of our dogs. She and Melanie almost instinctually looked after Lando as though he was their own — we are eternally grateful.",
    author: "David Reichley",
    pet: "papa de Lando & Leia",
  },
  {
    photo: BASE + "66e1b6fee21bfc0c3de52aca_image19.png",
    text: "Petcheri est incroyable ! Mes 2 petits chiots ont adoré les promenades, la garderie et même les séjours le week-end. Mélanie et sa super équipe se soucient vraiment de chaque chien !",
    author: "Elaine Milton",
    pet: "maman de Bc Enjoué",
  },
] as const;

// Group into pages of 4 (1 featured + 3 side)
const PAGE_SIZE = 4;
const PAGES = Array.from(
  { length: Math.ceil(REVIEWS.length / PAGE_SIZE) },
  (_, i) => REVIEWS.slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE) as unknown as typeof REVIEWS[number][]
);

// ─── Animation ────────────────────────────────────────────────────────────────

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Stars({ size = "sm" }: { size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${cls} fill-amber-400 text-amber-400`} />
      ))}
    </div>
  );
}

function Avatar({ src, alt, size }: { src: string; alt: string; size: "lg" | "sm" }) {
  const dim = size === "lg" ? "w-14 h-14" : "w-10 h-10";
  const ring = size === "lg" ? "ring-4" : "ring-2";
  const px   = size === "lg" ? "64px" : "40px";
  return (
    <div className={`relative ${dim} rounded-full overflow-hidden ${ring} ring-white shadow-md shrink-0`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes={px} />
    </div>
  );
}

// ─── HomeTestimonials ─────────────────────────────────────────────────────────

export function HomeTestimonials() {
  const t = useTranslations("home");
  const [page, setPage]       = useState(0);
  const [direction, setDir]   = useState(1);
  const total = PAGES.length;

  const go = (idx: number, dir: number) => {
    setDir(dir);
    setPage(((idx % total) + total) % total);
  };
  const prev = () => go(page - 1, -1);
  const next = () => go(page + 1, 1);

  const [featured, ...side] = PAGES[page];

  return (
    <section className="section-padding bg-[--color-ivoire]">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-3 block">
              {t("testimonials_label")}
            </span>
            <h2
              className="text-[--color-chocolat] font-normal max-w-lg"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                lineHeight: 1.15,
              }}
            >
              {t("testimonials_title")}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <Stars size="md" />
            <span
              className="text-[--color-chocolat] font-semibold text-lg ml-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {SITE_STATS.googleRating.toLocaleString("fr-FR")}
            </span>
            <span className="text-sm text-[--color-muted-foreground]">/ 5</span>
          </div>
        </div>

        {/* ── Slider ──────────────────────────────────────────────────────── */}
        <div className="overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
              className="grid lg:grid-cols-[58fr_42fr] gap-4 items-stretch"
            >
              {/* Featured card */}
              <div className="card-base flex flex-col md:flex-row overflow-hidden min-h-[340px]">
                {/* Large photo */}
                <div className="relative md:w-[38%] min-h-[220px] md:min-h-full shrink-0">
                  <Image
                    src={featured.photo}
                    alt={featured.author}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>
                {/* Text */}
                <div className="p-8 md:p-10 flex flex-col gap-6 flex-1">
                  <Stars size="md" />
                  <p
                    className="text-[--color-chocolat] italic leading-relaxed flex-1"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                    }}
                  >
                    &ldquo;{featured.text}&rdquo;
                  </p>
                  <div className="pt-5 border-t border-[--color-border]">
                    <p className="text-sm font-bold text-[--color-chocolat]">{featured.author}</p>
                    <p className="text-xs text-[--color-muted-foreground] mt-0.5">{featured.pet}</p>
                  </div>
                </div>
              </div>

              {/* Side cards */}
              <div className="flex flex-col gap-4">
                {side.map((r, i) => (
                  <div
                    key={`${page}-${i}`}
                    className="card-base px-5 py-4 flex flex-col gap-3 flex-1"
                  >
                    <p
                      className="text-[--color-chocolat] text-sm leading-relaxed italic line-clamp-4 flex-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t border-[--color-border] mt-auto">
                      <Avatar src={r.photo} alt={r.pet} size="sm" />
                      <div>
                        <p className="text-xs font-bold text-[--color-chocolat]">{r.author}</p>
                        <p className="text-[10px] text-[--color-muted-foreground] mt-0.5">{r.pet}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Controls ────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-6">

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label={t("testimonials_aria_prev")}
              className="w-9 h-9 rounded-full border border-[--color-border] flex items-center justify-center hover:border-[--color-chocolat] hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[--color-chocolat]" />
            </button>
            <button
              onClick={next}
              aria-label={t("testimonials_aria_next")}
              className="w-9 h-9 rounded-full border border-[--color-border] flex items-center justify-center hover:border-[--color-chocolat] hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-[--color-chocolat]" />
            </button>
          </div>

          {/* Dots — w-11 h-11 for 44px touch target, visual dot inside */}
          <div className="flex items-center">
            {PAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i >= page ? 1 : -1)}
                aria-label={`Page ${i + 1}`}
                className="w-11 h-11 flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`rounded-full transition-all duration-300 block ${
                    i === page
                      ? "w-6 h-2.5 bg-[--color-chocolat]"
                      : "w-2.5 h-2.5 bg-[--color-border] hover:bg-[--color-muted-foreground]"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Counter */}
          <span className="text-xs text-[--color-muted-foreground] tabular-nums">
            {page + 1}&thinsp;/&thinsp;{total}
          </span>
        </div>

      </div>
    </section>
  );
}
