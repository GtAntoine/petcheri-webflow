/**
 * Promotions mock data — scraped from petcheri.com/nos-bons-plans
 * Replace with DB queries (Promotions table) once connected to petcheri-web-next MySQL.
 *
 * DB model: see petcheri-web-next/database/models/Promotions.ts
 */

export type PromoCategory =
  | "Alimentation"
  | "Santé"
  | "Accessoires"
  | "Assurance"
  | "Compléments";

export interface Promotion {
  id: string;
  slug: string;
  partnerName: string;
  /** Short tagline shown in the card header */
  tagline: string;
  /** Longer description shown in the card body */
  description: string;
  /** The specific deal, e.g. "40% de réduction sur la première commande" */
  offer: string;
  code: string | null;
  logoUrl: string;
  partnerUrl: string;
  category: PromoCategory;
  active: boolean;
}

const LOGO = (name: string) => `/assets/partners/${name}.png`;

export const PROMOTIONS: Promotion[] = [
  {
    id: "elmut",
    slug: "elmut",
    partnerName: "Elmut",
    tagline: "Repas frais livrés à domicile",
    description: "Elmut prépare des repas ultra-sains et frais pour votre chien ou votre chat, livrés directement chez vous.",
    offer: "40% de réduction sur la première commande",
    code: "PETCHERI40",
    logoUrl: LOGO("elmut"),
    partnerUrl: "https://www.elmut.fr/?ae=411&coupon=PETCHERI40",
    category: "Alimentation",
    active: true,
  },
  {
    id: "holistipet",
    slug: "holistipet",
    partnerName: "Holistipet",
    tagline: "Friandises formulées par vétérinaires",
    description: "Des friandises saines qui allient plaisir et santé, développées par un spécialiste du microbiome canin.",
    offer: "15% de réduction",
    code: "PETCHERI15",
    logoUrl: LOGO("holistipet"),
    partnerUrl: "https://www.holistipet.fr",
    category: "Alimentation",
    active: true,
  },
  {
    id: "ziggy",
    slug: "ziggy",
    partnerName: "Ziggy",
    tagline: "Alimentation féline premium",
    description: "Ziggy a été développée avec le Dr Géraldine Blanchard, spécialiste en nutrition vétérinaire. Plus de 60 % de viande, zéro céréale.",
    offer: "12% de réduction",
    code: "PETCHERIMIAOU",
    logoUrl: LOGO("ziggy"),
    partnerUrl: "https://lb.affilae.com/r/?p=60a7c91c90324009bd742eb5&af=122&lp=https%3A%2F%2Fziggyfamily.com%2F",
    category: "Alimentation",
    active: true,
  },
  {
    id: "charly-et-moi",
    slug: "charly-et-moi",
    partnerName: "Charly & moi",
    tagline: "Accessoires stylés made in France",
    description: "Des accessoires écoresponsables et fabriqués en France pour les propriétaires d'animaux qui ne font aucun compromis sur le style.",
    offer: "15% de réduction sur la première commande",
    code: "PETCHERI15",
    logoUrl: LOGO("charly-et-moi"),
    partnerUrl: "https://charlyetmoi.com",
    category: "Accessoires",
    active: true,
  },
  {
    id: "homycat",
    slug: "homycat",
    partnerName: "Homycat",
    tagline: "Mobilier félin design",
    description: "Arbres à chat, griffoirs et couchages pensés pour respecter l'instinct naturel du chat avec une esthétique soignée.",
    offer: "10% de réduction",
    code: "CATCHERI",
    logoUrl: LOGO("homycat"),
    partnerUrl: "https://homycat.com/?ref=DEPLANTE",
    category: "Accessoires",
    active: true,
  },
  {
    id: "babin",
    slug: "babin",
    partnerName: "Bab'In",
    tagline: "Croquettes formulées avec des vétérinaires",
    description: "Une alimentation premium adaptée à chaque stade de vie, élaborée avec des vétérinaires pour une vitalité optimale.",
    offer: "15% de réduction dès 50€ d'achat",
    code: "BABINXPETCHERI",
    logoUrl: LOGO("babin"),
    partnerUrl: "https://www.babin-nutrition.com",
    category: "Alimentation",
    active: true,
  },
  {
    id: "lassie",
    slug: "lassie",
    partnerName: "Lassie",
    tagline: "Assurance animale 100% digitale",
    description: "Jusqu'à 3 000€ de remboursement annuel et 220€ dédiés à la prévention. Entièrement digitale, sans papier.",
    offer: "30€ offerts",
    code: "LASSIECHERI30",
    logoUrl: LOGO("lassie"),
    partnerUrl: "https://fr.lassie.co/",
    category: "Assurance",
    active: true,
  },
  {
    id: "fur-love",
    slug: "fur-love",
    partnerName: "Fur Love",
    tagline: "Soins naturels pour la peau de votre animal",
    description: "Des produits de soin naturels cliniquement testés, spécialement formulés pour les problèmes cutanés comme l'eczéma.",
    offer: "10% de réduction",
    code: "PETCHERI10",
    logoUrl: LOGO("fur-love"),
    partnerUrl: "https://thefurlove.fr",
    category: "Santé",
    active: true,
  },
  {
    id: "kozoo",
    slug: "kozoo",
    partnerName: "Kozoo",
    tagline: "Assurance + téléconsultations illimitées",
    description: "3 000€ de plafond annuel, remboursement en 48h et téléconsultations vétérinaires illimitées. 100% digital.",
    offer: "1 mois offert",
    code: "Petcheri1",
    logoUrl: LOGO("kozoo"),
    partnerUrl: "https://app.kozoo.eu/fr/register?utm_source=display&utm_medium=banner&utm_campaign=partner&utm_id=tout+pour+le+toutou",
    category: "Assurance",
    active: true,
  },
  {
    id: "truffe-moustache",
    slug: "truffe-moustache",
    partnerName: "Truffe & Moustache",
    tagline: "Soins et compléments naturels made in France",
    description: "Des compléments alimentaires et produits de soin naturels pour chiens et chats, fabriqués en France.",
    offer: "15% de réduction",
    code: "TRUFFECHERI15",
    logoUrl: LOGO("truffe-moustache"),
    partnerUrl: "https://www.truffe-moustache.com",
    category: "Compléments",
    active: true,
  },
  {
    id: "canigourmand",
    slug: "canigourmand",
    partnerName: "Canigourmand",
    tagline: "Alimentation carnivore 100% naturelle",
    description: "Spécialiste de l'alimentation carnivore naturelle et des friandises saines pour votre chien.",
    offer: "10% de réduction",
    code: "PETCHERI10",
    logoUrl: LOGO("canigourmand"),
    partnerUrl: "https://www.canigourmand.com",
    category: "Alimentation",
    active: true,
  },
  {
    id: "zamz",
    slug: "zamz",
    partnerName: "ZamZ",
    tagline: "Formulations végétales pour animaux stressés",
    description: "Spécialiste français du chanvre vétérinaire. Formulations à base de plantes pour aider les animaux anxieux ou malades.",
    offer: "10% de réduction",
    code: "PETCHERI",
    logoUrl: LOGO("zamz"),
    partnerUrl: "https://www.zamz.eu",
    category: "Compléments",
    active: true,
  },
  {
    id: "jopy",
    slug: "jopy",
    partnerName: "JOPY",
    tagline: "Alimentation féline naturelle et écoresponsable",
    description: "Une alimentation premium pour chats, naturelle et écoresponsable, sans compromis sur la qualité.",
    offer: "25% de réduction sur la première commande",
    code: "PETCHERI25",
    logoUrl: LOGO("jopy"),
    partnerUrl: "https://jopy.fr",
    category: "Alimentation",
    active: true,
  },
  {
    id: "biovetol",
    slug: "biovetol",
    partnerName: "Biovetol",
    tagline: "Produits biologiques pour tous les animaux",
    description: "Des produits bio pour chiens, chats et NAC, répondant à diverses problématiques de santé.",
    offer: "15% de réduction",
    code: "PETCHERI15",
    logoUrl: LOGO("biovetol"),
    partnerUrl: "https://biovetol.fr/fr/",
    category: "Santé",
    active: true,
  },
  {
    id: "jeannette",
    slug: "jeannette",
    partnerName: "Jeannette",
    tagline: "Accessoires chien audacieux et stylés",
    description: "Laisses léopard, harnais moelleux et accessoires aux designs affirmés pour les chiens qui ont du style.",
    offer: "15% de réduction",
    code: "PETCHERI15",
    logoUrl: LOGO("jeannette"),
    partnerUrl: "https://jeannettedogs.com",
    category: "Accessoires",
    active: true,
  },
];

export const PROMO_CATEGORIES: PromoCategory[] = [
  "Alimentation",
  "Santé",
  "Accessoires",
  "Assurance",
  "Compléments",
];

export function getPromotionById(id: string): Promotion | undefined {
  return PROMOTIONS.find((p) => p.id === id);
}

export function getPromotionsByIds(ids: string[]): Promotion[] {
  return ids
    .map((id) => getPromotionById(id))
    .filter((p): p is Promotion => p !== undefined);
}

export function getPromotionsByCategory(category: PromoCategory): Promotion[] {
  return PROMOTIONS.filter((p) => p.category === category && p.active);
}

export function getActivePromotions(): Promotion[] {
  return PROMOTIONS.filter((p) => p.active);
}
