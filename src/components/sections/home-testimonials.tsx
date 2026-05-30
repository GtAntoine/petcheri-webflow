"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
    photo: BASE + "66e1b65fcaf9d6d1d7059d90_image32.jpg",
    text: "Je le recommande vivement surtout aux étrangers et aux nouveaux arrivants en France.",
    author: "Jordan Go",
    pet: "papa de Barkley",
  },
  {
    photo: BASE + "66e1b6fee21bfc0c3de52aca_image19.png",
    text: "Petcheri est incroyable !! Mes 2 petits chiots ont adoré les promenades, la garderie et même les séjours le week-end !!!! Mélanie et sa super équipe se soucient vraiment de chaque chien ! Ils sont merveilleux et je me sens très à l'aise et détendue en leur confiant mes chiens !",
    author: "Elaine Milton",
    pet: "maman de Bc Enjoué",
  },
  {
    photo: BASE + "66e1b70296f22149e285433a_image21.png",
    text: "Personnel très attentif et attentionné. Nous avons utilisé l'équipe à plusieurs reprises et pensons toujours que c'est le meilleur choix. Expérimenté, réactif, solidaire et facile. Une joie absolue de les avoir dans nos vies.",
    author: "Mariela Lopez",
    pet: "maman de Cali",
  },
  {
    photo: BASE + "66e1b6fe915ce2792a33c048_image15.png",
    text: "Nous voyageons beaucoup et Petcheri a toujours, toujours, toujours trouvé les meilleures personnes pour regarder Dexter. Ils nous envoient des CV de baby-sitters potentiels et nous laissent choisir. Ils envoient des photos et des vidéos quotidiennement. Dexter est véritablement excité lorsqu'il voit Inés ou Julie.",
    author: "Rudy Martinez",
    pet: "papa de Dexter",
  },
  {
    photo: BASE + "66e1b70296f22149e285433a_image21.png",
    text: "Nous faisons entièrement confiance à l'équipe de Petcheri pour prendre soin de notre chiot bien-aimé, Henry. Ils sont gentils, attentifs, professionnels et attentionnés. Je sais que Henry est parfaitement pris en charge, que ce soit pour une courte promenade ou un séjour prolongé. Je ne saurais trop recommander Petcheri !",
    author: "Jennifer O'Donnell",
    pet: "maman de Henry",
  },
  {
    photo: BASE + "66e1b70296f22149e285432c_image13.jpg",
    text: "Une équipe excellente, attentionnée et dévouée. Mélanie et son équipe ont fait bien plus que leurs tâches pour nous accueillir en cas d'urgence. Ils se sont arrangés pour récupérer et garder nos deux chiens pendant que nous devions nous absenter pendant une période prolongée. Nous leur en serons toujours reconnaissants.",
    author: "Niala Ramtahal-Sooklal",
    pet: "maman de Lizzie & Nash",
  },
  {
    photo: BASE + "66e1b6fe9749887d63b40cea_image27.jpg",
    text: "C'était formidable de travailler avec l'équipe de Petcheri. En tant que non-francophone, ils ont rendu très facile la recherche de soins pour mes chiots. J'ai essayé Rover sans succès avant qu'un collègue ne me parle de Petcheri — et je n'ai pas l'intention d'utiliser Rover à nouveau !",
    author: "Greg Liebergen",
    pet: "papa de Nelson & Jordy",
  },
  {
    photo: BASE + "66e1b6fe9e9f5e797d5b5e1c_image2.jpg",
    text: "Mon chat de 6 ans est très affectueux. C'était compliqué de trouver des amis prêts à rester pendant la nuit et pour les fêtes de Noël. Une collègue m'a recommandé Petcheri et avec mon mari nous étions heureux de recevoir quotidiennement des nouvelles de notre Lilou. Lilou ne stressait plus lorsque nous sortions.",
    author: "Delfy Góchez",
    pet: "maman de Lily & Lilas",
  },
  {
    photo: BASE + "66e1b6ff915ce2792a33c1a2_image29.jpg",
    text: "Très facile à organiser. La baby-sitter était très agréable et gentille avec mon chien extrêmement âgé, qui appréciait vraiment la compagnie. La gardienne était à l'heure et très professionnelle.",
    author: "Heather Jones",
    pet: "maman de Chipie",
  },
  {
    photo: BASE + "66e1b6ff10f71e4eb6d0fad3_image26.jpg",
    text: "Nous sommes très reconnaissants d'avoir trouvé Petcheri ! Nous les avons beaucoup utilisés lors d'une visite d'un mois à Paris. Nous avions deux gardiens d'animaux différents, tous deux très aimants avec Rooney. L'équipe est d'excellents communicateurs et très fiables.",
    author: "Michelle Vespa",
    pet: "maman de Rooney",
  },
  {
    photo: BASE + "66e1b6fec0b7960a6d64c80b_image12.jpg",
    text: "We recently moved to Paris and the Petcheri team took good care of our baby while we got settled. They helped us find a boarding service and arranged transport for our dog from the airport. I would highly recommend their services.",
    author: "Brian Decouto",
    pet: "papa de Nia",
  },
  {
    photo: BASE + "66e1b6fe525f8da1ef3833be_image16.jpg",
    text: "Service de qualité, je recommande.",
    author: "Michael Delmas",
    pet: "papa de Skander",
  },
  {
    photo: BASE + "66e1b6fe8fbe4454ba7290a6_image20.jpg",
    text: "Our pamperer Ines went to great lengths to ensure the comfort and care of our dogs, taking Lando and Leia to the vet for urgent treatment. She did so without question. Ines and Melanie almost instinctually looked after Lando as though he was their own — we are eternally grateful.",
    author: "David Reichley",
    pet: "papa de Lando & Leia",
  },
] as const;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

function Stars({ size = "sm" }: { size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${cls} fill-[--color-or] text-[--color-or]`} />
      ))}
    </div>
  );
}

export function HomeTestimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = REVIEWS.length;

  const go = (idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(((idx % total) + total) % total);
  };
  const prev = () => go(current - 1, -1);
  const next = () => go(current + 1, 1);
  const r = REVIEWS[current];

  return (
    <section className="section-padding bg-[--color-ivoire]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or] mb-3 block">
              Vos avis
            </span>
            <h2
              className="text-[--color-chocolat] font-normal"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                lineHeight: 1.15,
              }}
            >
              Ils nous confient ce qu&apos;ils ont
              <br className="hidden sm:block" /> de plus précieux.
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <Stars />
            <span
              className="text-[--color-chocolat] font-semibold text-lg ml-0.5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              4,9
            </span>
            <span className="text-sm text-[--color-muted-foreground]">/ 5</span>
          </div>
        </div>

        {/* Card */}
        <div className="card-base overflow-hidden">

          {/* Slide area */}
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                className="grid md:grid-cols-[5fr_7fr] min-h-[320px] md:min-h-[360px]"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-[--color-creme]">
                  <Image
                    src={r.photo}
                    alt={r.pet}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                </div>

                {/* Text */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col gap-5 justify-center">
                  <Stars size="md" />
                  <p
                    className="text-[--color-chocolat] italic leading-relaxed flex-1"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(0.95rem, 1.25vw, 1.1rem)",
                    }}
                  >
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="pt-5 border-t border-[--color-border]">
                    <p className="text-sm font-semibold text-[--color-chocolat]">{r.author}</p>
                    <p className="text-xs text-[--color-muted-foreground] mt-0.5">{r.pet}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 px-6 py-4 border-t border-[--color-border]">

            {/* Arrows */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={prev}
                aria-label="Avis précédent"
                className="w-9 h-9 rounded-full border border-[--color-border] flex items-center justify-center hover:border-[--color-chocolat] hover:bg-[--color-creme] transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[--color-chocolat]" />
              </button>
              <button
                onClick={next}
                aria-label="Avis suivant"
                className="w-9 h-9 rounded-full border border-[--color-border] flex items-center justify-center hover:border-[--color-chocolat] hover:bg-[--color-creme] transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-[--color-chocolat]" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-1.5 flex-wrap flex-1">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i >= current ? 1 : -1)}
                  aria-label={`Aller à l'avis ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 h-2 bg-[--color-chocolat]"
                      : "w-2 h-2 bg-[--color-border] hover:bg-[--color-muted-foreground]"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="text-xs text-[--color-muted-foreground] shrink-0 tabular-nums">
              {current + 1}&thinsp;/&thinsp;{total}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
