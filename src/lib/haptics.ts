import type { Vibration } from "web-haptics";

/**
 * Named haptic patterns for Petcheri.
 * Only fires on devices that support the Vibration API (mobile).
 */
export const HAPTIC = {
  /** Ghost / link — imperceptible, just a hint of life */
  ghost: [{ duration: 10, intensity: 0.2 }] satisfies Vibration[],

  /** Subtle click — outline / secondary buttons, nav links */
  click: [{ duration: 15, intensity: 0.35 }] satisfies Vibration[],

  /** Confident tap — primary dark button */
  tap: [{ duration: 25, intensity: 0.6 }] satisfies Vibration[],

  /**
   * Loud buzz — gold "or" CTA ("Réserver", "Démarrer ma demande").
   * Uses the built-in buzz preset: 1000ms at intensity 1.
   */
  buzz: "buzz" as const,

  /**
   * Success — 2 pulses: soft then strong.
   * Use after form send, booking confirmation, etc.
   */
  success: [
    { duration: 30 },
    { delay: 60, duration: 40, intensity: 1 },
  ] satisfies Vibration[],

  /**
   * Error — 4 escalating pulses.
   * Use on form validation failure, network error, etc.
   */
  error: [
    { duration: 40, intensity: 0.7 },
    { delay: 40, duration: 40, intensity: 0.7 },
    { delay: 40, duration: 40, intensity: 0.9 },
    { delay: 40, duration: 50, intensity: 0.6 },
  ] satisfies Vibration[],
} as const;
