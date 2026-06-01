/**
 * Centralized asset paths — all images are local in /public/assets/
 * Use these constants throughout the codebase instead of raw strings.
 */

const A = "/assets";

/** Official V4 illustrated service icons (downloaded from petcheri.com CDN) */
export const SERVICE_ICONS = {
  dog:        `${A}/icons/service-dog.svg`,
  catNac:     `${A}/icons/service-cat-nac.svg`,
  walking:    `${A}/icons/service-walking.svg`,
  bath:       `${A}/icons/service-bath.svg`,
  education:  `${A}/icons/service-education.svg`,
  care:       `${A}/icons/service-care.svg`,
  transport:  `${A}/icons/service-transport.svg`,
  travel:     `${A}/icons/service-travel.svg`,
} as const;

export const ICONS = {
  dog:          `${A}/icons/dog.svg`,
  cat:          `${A}/icons/ct-cat.svg`,
  nac:          `${A}/icons/nac.svg`,
  walking:      `${A}/icons/walking.svg`,
  walking2:     `${A}/icons/walking2.svg`,
  bath:         `${A}/icons/bath.svg`,
  education:    `${A}/icons/education.svg`,
  care:         `${A}/icons/care.svg`,
  transport:    `${A}/icons/transport.svg`,
  travel:       `${A}/icons/travel.svg`,
  sleep:        `${A}/icons/sleep.svg`,
  others:       `${A}/icons/others.svg`,
  // Concierge (CT) variants
  ctCat:        `${A}/icons/ct-cat.svg`,
  ctEducation:  `${A}/icons/ct-education.svg`,
  ctSleep:      `${A}/icons/ct-sleep.svg`,
  ctGrooming:   `${A}/icons/ct-grooming.svg`,
  ctTransport:  `${A}/icons/ct-transport.svg`,
} as const;

export const PRESS = {
  gala:          `${A}/press/gala.png`,
  envoyeSpecial: `${A}/press/envoye-special.jpg`,
  europe1:       `${A}/press/europe1.png`,
  marieClaire:   `${A}/press/marie-claire.png`,
  luxuryPlace:   `${A}/press/luxury-place.png`,
} as const;

export const AWARDS = {
  pepitesTech: `${A}/awards/pepites-tech.svg`,
  purina:      `${A}/awards/purina.png`,
} as const;

export const PHOTOS = {
  // Chouchouteurs / lifestyle
  chouchouteur1:  `${A}/photos/chouchouteur-1.jpg`,
  chouchouteur2:  `${A}/photos/chouchouteur-2.jpg`,
  chouchouteur3:  `${A}/photos/chouchouteur-3.png`,
  chouchouteur4:  `${A}/photos/chouchouteur-4.png`,
  chouchouteur5:  `${A}/photos/chouchouteur-5.png`,
  chouchouteur6:  `${A}/photos/chouchouteur-6.jpg`,
  chouchouteur7:  `${A}/photos/chouchouteur-7.jpg`,
  chouchouteur8:  `${A}/photos/chouchouteur-8.jpg`,
  chouchouteur9:  `${A}/photos/chouchouteur-9.jpg`,
  chouchouteur10: `${A}/photos/chouchouteur-10.jpg`,
  chouchouteur11: `${A}/photos/chouchouteur-11.jpg`,
  chouchouteur12: `${A}/photos/chouchouteur-12.jpg`,
  chouchouteur13: `${A}/photos/chouchouteur-13.jpg`,
  // Team (qui-sommes-nous)
  team2:         `${A}/photos/team-2.png`,
  team3:         `${A}/photos/team-3.png`,
  team4:         `${A}/photos/team-4.png`,
  // Mood board (lifestyle shots)
  moodboard1:    `${A}/photos/moodboard-1.png`,
  moodboard2:    `${A}/photos/moodboard-2.png`,
  moodboard5:    `${A}/photos/moodboard-5.png`,
  moodboard6:    `${A}/photos/moodboard-6.png`,
  // Luxury hotels
  luxuryHero:    `${A}/photos/luxury-hero.png`,
  luxury3:       `${A}/photos/luxury-3.png`,
  luxury4:       `${A}/photos/luxury-4.png`,
  // VIP Club
  vipInvitation: `${A}/photos/vip-invitation.png`,
} as const;

export const ILLUSTRATIONS = {
  catSitting:      `${A}/illustrations/cat-sitting.png`,
  dogDay:          `${A}/illustrations/dog-day.png`,
  about:           `${A}/illustrations/about.png`,
  grooming:        `${A}/illustrations/grooming.png`,
  gardeNuit:       `${A}/illustrations/garde-nuit.png`,
  heroAbout:       `${A}/illustrations/hero-about.png`,
  heroPetsitter:   `${A}/illustrations/hero-petsitter.png`,
  planning:        `${A}/illustrations/planning.svg`,
  surveillance:    `${A}/illustrations/surveillance.svg`,
  photos:          `${A}/illustrations/photos.svg`,
  assurance:       `${A}/illustrations/assurance.svg`,
  veterinaire:     `${A}/illustrations/veterinaire.svg`,
  socialisation:   `${A}/illustrations/socialisation.svg`,
  seedling:        `${A}/illustrations/seedling.png`,
  blogCover1:      `${A}/illustrations/blog-cover-1.png`,
  blogCover5:      `${A}/illustrations/blog-cover-5.png`,
  blogCover7:      `${A}/illustrations/blog-cover-7.png`,
  blogCover8:      `${A}/illustrations/blog-cover-8.png`,
} as const;

export const UI = {
  logo:           `${A}/ui/logo.png`,
  flagFr:         `${A}/ui/flag-fr.avif`,
  flagEn:         `${A}/ui/flag-en.jpg`,
  avisGoogle:     `${A}/ui/avis-google.svg`,
  brandWatermark: `${A}/ui/brand-watermark.svg`,
} as const;
