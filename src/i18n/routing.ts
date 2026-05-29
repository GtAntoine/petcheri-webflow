import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/nos-services": {
      fr: "/nos-services",
      en: "/our-services",
    },
    "/services-chien": {
      fr: "/services-chien",
      en: "/dog-services",
    },
    "/services-chat": {
      fr: "/services-chat",
      en: "/cat-services",
    },
    "/services-nac": {
      fr: "/services-nac",
      en: "/exotic-pet-services",
    },
    "/garde-chien": {
      fr: "/garde-chien",
      en: "/dog-sitting",
    },
    "/garde-journee": {
      fr: "/garde-journee",
      en: "/dog-daycare",
    },
    "/garde-nuit": {
      fr: "/garde-nuit",
      en: "/overnight-care",
    },
    "/garde-chat": {
      fr: "/garde-chat",
      en: "/cat-sitting",
    },
    "/comportement-education": {
      fr: "/comportement-education",
      en: "/behaviour-training",
    },
    "/toilettage": {
      fr: "/toilettage",
      en: "/grooming",
    },
    "/transport": {
      fr: "/transport",
      en: "/transport",
    },
    "/qui-sommes-nous": {
      fr: "/qui-sommes-nous",
      en: "/about-us",
    },
    "/vip-club": {
      fr: "/vip-club",
      en: "/vip-club",
    },
    "/entreprises": {
      fr: "/entreprises",
      en: "/corporate",
    },
    "/luxury-hotels": {
      fr: "/luxury-hotels",
      en: "/luxury-hotels",
    },
    "/devenir-petsitter": {
      fr: "/devenir-petsitter",
      en: "/become-petsitter",
    },
    "/nos-bons-plans": {
      fr: "/nos-bons-plans",
      en: "/partners",
    },
    "/vos-avis": {
      fr: "/vos-avis",
      en: "/reviews",
    },
    "/contact": {
      fr: "/contact",
      en: "/contact",
    },
    "/blog": {
      fr: "/blog",
      en: "/blog",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
