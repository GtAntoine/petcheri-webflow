/**
 * zones-data.ts — Données de couverture par arrondissement parisien.
 *
 * ⚠️  MOCKUP — données hardcodées en attendant l'endpoint API.
 *
 * À terme : remplacer par un fetch vers :
 *   GET app.petcheri.com/api/public/zones/:postalCode
 *   (voir notes dans memory/project_petcheri.md → section "À faire — endpoint API zones")
 *
 * La requête Sequelize côté app utilise ServicesLocations.address (JSON lat/lng)
 * + ServicesLocations.zone (rayon km) + getDistanceFromLatLonInKm() déjà dispo
 * dans petcheri-web-next/lib/utils/geocoding.utils.ts
 */

export interface ZoneServices {
  garde:       number; // CLIENT_DAY_HOME_CARE + CLIENT_MULTI_DAYS_HOME_CARE + PRO_DAY_HOME_CARE + PRO_MULTI_DAYS_HOME_CARE
  promenade:   number; // WALKS_CITY + WALKS_FOREST
  toilettage:  number; // GROOMING
  comportement:number; // EDUCATION_AND_BEHAVIOR
  transport:   number; // TRANSPORT
  visites:     number; // HOME_VISITS (chats / NAC)
}

export interface ZoneData {
  /** "11e" */
  arrondissement: string;
  /** "75011" */
  postalCode: string;
  /** Libellé long pour les balises SEO */
  label: string;
  /** Centroïde — utilisé pour le calcul distance côté API */
  lat: number;
  lng: number;
  services: ZoneServices;
}

// ─── Données mockup (à brancher sur l'API) ────────────────────────────────────

export const PARIS_ZONES: ZoneData[] = [
  { arrondissement: "1er", postalCode: "75001", label: "Paris 1er arrondissement", lat: 48.860, lng: 2.347, services: { garde: 5,  promenade: 4,  toilettage: 2, comportement: 1, transport: 3, visites: 3 } },
  { arrondissement: "2e",  postalCode: "75002", label: "Paris 2e arrondissement",  lat: 48.867, lng: 2.347, services: { garde: 4,  promenade: 3,  toilettage: 2, comportement: 1, transport: 2, visites: 2 } },
  { arrondissement: "3e",  postalCode: "75003", label: "Paris 3e arrondissement",  lat: 48.862, lng: 2.357, services: { garde: 6,  promenade: 5,  toilettage: 3, comportement: 2, transport: 3, visites: 4 } },
  { arrondissement: "4e",  postalCode: "75004", label: "Paris 4e arrondissement",  lat: 48.854, lng: 2.352, services: { garde: 5,  promenade: 4,  toilettage: 2, comportement: 2, transport: 3, visites: 3 } },
  { arrondissement: "5e",  postalCode: "75005", label: "Paris 5e arrondissement",  lat: 48.848, lng: 2.351, services: { garde: 7,  promenade: 6,  toilettage: 3, comportement: 2, transport: 4, visites: 5 } },
  { arrondissement: "6e",  postalCode: "75006", label: "Paris 6e arrondissement",  lat: 48.850, lng: 2.335, services: { garde: 8,  promenade: 6,  toilettage: 4, comportement: 3, transport: 4, visites: 5 } },
  { arrondissement: "7e",  postalCode: "75007", label: "Paris 7e arrondissement",  lat: 48.856, lng: 2.312, services: { garde: 9,  promenade: 7,  toilettage: 4, comportement: 3, transport: 5, visites: 6 } },
  { arrondissement: "8e",  postalCode: "75008", label: "Paris 8e arrondissement",  lat: 48.875, lng: 2.308, services: { garde: 10, promenade: 8,  toilettage: 5, comportement: 3, transport: 6, visites: 6 } },
  { arrondissement: "9e",  postalCode: "75009", label: "Paris 9e arrondissement",  lat: 48.877, lng: 2.339, services: { garde: 8,  promenade: 7,  toilettage: 4, comportement: 2, transport: 4, visites: 5 } },
  { arrondissement: "10e", postalCode: "75010", label: "Paris 10e arrondissement", lat: 48.876, lng: 2.359, services: { garde: 9,  promenade: 7,  toilettage: 4, comportement: 3, transport: 4, visites: 5 } },
  { arrondissement: "11e", postalCode: "75011", label: "Paris 11e arrondissement", lat: 48.859, lng: 2.379, services: { garde: 11, promenade: 9,  toilettage: 5, comportement: 4, transport: 5, visites: 7 } },
  { arrondissement: "12e", postalCode: "75012", label: "Paris 12e arrondissement", lat: 48.840, lng: 2.389, services: { garde: 8,  promenade: 7,  toilettage: 3, comportement: 2, transport: 4, visites: 5 } },
  { arrondissement: "13e", postalCode: "75013", label: "Paris 13e arrondissement", lat: 48.831, lng: 2.364, services: { garde: 7,  promenade: 6,  toilettage: 3, comportement: 2, transport: 3, visites: 4 } },
  { arrondissement: "14e", postalCode: "75014", label: "Paris 14e arrondissement", lat: 48.832, lng: 2.327, services: { garde: 8,  promenade: 7,  toilettage: 4, comportement: 3, transport: 4, visites: 5 } },
  { arrondissement: "15e", postalCode: "75015", label: "Paris 15e arrondissement", lat: 48.842, lng: 2.297, services: { garde: 10, promenade: 8,  toilettage: 5, comportement: 3, transport: 5, visites: 6 } },
  { arrondissement: "16e", postalCode: "75016", label: "Paris 16e arrondissement", lat: 48.863, lng: 2.270, services: { garde: 12, promenade: 9,  toilettage: 6, comportement: 4, transport: 6, visites: 7 } },
  { arrondissement: "17e", postalCode: "75017", label: "Paris 17e arrondissement", lat: 48.884, lng: 2.314, services: { garde: 9,  promenade: 8,  toilettage: 4, comportement: 3, transport: 4, visites: 5 } },
  { arrondissement: "18e", postalCode: "75018", label: "Paris 18e arrondissement", lat: 48.892, lng: 2.345, services: { garde: 8,  promenade: 7,  toilettage: 3, comportement: 2, transport: 4, visites: 5 } },
  { arrondissement: "19e", postalCode: "75019", label: "Paris 19e arrondissement", lat: 48.883, lng: 2.375, services: { garde: 7,  promenade: 6,  toilettage: 3, comportement: 2, transport: 3, visites: 4 } },
  { arrondissement: "20e", postalCode: "75020", label: "Paris 20e arrondissement", lat: 48.864, lng: 2.401, services: { garde: 7,  promenade: 6,  toilettage: 3, comportement: 2, transport: 3, visites: 4 } },
];

/** Retourne les données d'une zone par arrondissement ("11e") ou code postal ("75011") */
export function getZone(key: string): ZoneData | undefined {
  return PARIS_ZONES.find(
    (z) => z.arrondissement === key || z.postalCode === key
  );
}

/** Total des prestataires actifs dans une zone (tous services confondus) */
export function totalSitters(z: ZoneData): number {
  // Dédupliqué approximatif : un prestataire peut couvrir plusieurs services
  return Math.max(z.services.garde, z.services.promenade, z.services.toilettage);
}
