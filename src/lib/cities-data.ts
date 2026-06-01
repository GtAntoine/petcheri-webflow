import type { ZoneServices } from "./zones-data";

export interface CityData {
  slug:       string;  // "lyon" — utilisé dans l'URL
  name:       string;  // "Lyon" — affiché
  department: string;  // "69" — pour SEO
  postalCode: string;  // "69001"
  lat:        number;
  lng:        number;
  services:   ZoneServices;
}

export const CITIES: CityData[] = [
  { slug: "lyon",      name: "Lyon",      department: "69", postalCode: "69001", lat: 45.764, lng: 4.836,  services: { garde: 9,  promenade: 7, toilettage: 4, comportement: 3, transport: 5, visites: 6 } },
  { slug: "marseille", name: "Marseille", department: "13", postalCode: "13001", lat: 43.296, lng: 5.370,  services: { garde: 7,  promenade: 5, toilettage: 3, comportement: 2, transport: 4, visites: 4 } },
  { slug: "bordeaux",  name: "Bordeaux",  department: "33", postalCode: "33000", lat: 44.837, lng: -0.579, services: { garde: 6,  promenade: 5, toilettage: 3, comportement: 2, transport: 3, visites: 4 } },
  { slug: "toulouse",  name: "Toulouse",  department: "31", postalCode: "31000", lat: 43.605, lng: 1.444,  services: { garde: 6,  promenade: 5, toilettage: 3, comportement: 2, transport: 3, visites: 4 } },
  { slug: "lille",     name: "Lille",     department: "59", postalCode: "59000", lat: 50.633, lng: 3.058,  services: { garde: 5,  promenade: 4, toilettage: 2, comportement: 1, transport: 3, visites: 3 } },
  { slug: "nantes",    name: "Nantes",    department: "44", postalCode: "44000", lat: 47.218, lng: -1.554, services: { garde: 5,  promenade: 4, toilettage: 2, comportement: 1, transport: 3, visites: 3 } },
];

export function getCity(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function totalCitySitters(c: CityData): number {
  return Math.max(c.services.garde, c.services.promenade, c.services.toilettage);
}
