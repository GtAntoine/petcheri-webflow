"use client";

/**
 * Haptics engine — works on both Android AND iOS.
 *
 * Android  → navigator.vibrate() (Web Vibration API)
 * iOS      → <input type="checkbox" switch> trick (requires iOS 17.4+)
 *             The element must NOT be display:none — web-haptics has this bug.
 *             We position it off-screen with opacity:0 instead.
 * Desktop  → silently ignored
 */

import type { Vibration } from "web-haptics";

// ─── Platform detection ───────────────────────────────────────────────────────

const canVibrate =
  typeof navigator !== "undefined" &&
  typeof (navigator as Navigator & { vibrate?: unknown }).vibrate === "function";

// iOS Safari never has navigator.vibrate; detect via UA + no vibrate
const isIOS =
  typeof navigator !== "undefined" &&
  /iphone|ipad|ipod/i.test(navigator.userAgent) &&
  !canVibrate;

// ─── iOS checkbox (Taptic Engine trigger) ────────────────────────────────────

let iosCheckbox: HTMLInputElement | null = null;

function getIOSCheckbox(): HTMLInputElement | null {
  if (typeof document === "undefined") return null;
  if (iosCheckbox) return iosCheckbox;

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.setAttribute("switch", ""); // iOS 17.4+ proprietary attribute
  cb.id = "__petcheri_haptic";
  // Off-screen, NOT display:none — display:none breaks iOS haptic on .click()
  cb.style.cssText =
    "position:fixed;top:-9999px;left:-9999px;opacity:0;pointer-events:none;";
  document.body.appendChild(cb);
  iosCheckbox = cb;
  return cb;
}

/** Fire the iOS Taptic Engine once — must be called synchronously inside a user gesture */
function iosTap(cb: HTMLInputElement) {
  cb.click();
}

// ─── PWM intensity simulation (mirrors web-haptics logic) ────────────────────

const PWM = 20; // ms per cycle

function buildVibratePattern(
  vibrations: Vibration[],
  defaultIntensity = 0.5,
): number[] {
  const out: number[] = [];
  for (const vib of vibrations) {
    const intensity = Math.max(0, Math.min(1, vib.intensity ?? defaultIntensity));
    const delay = vib.delay ?? 0;

    if (delay > 0) {
      if (out.length > 0 && out.length % 2 === 0) out[out.length - 1]! += delay;
      else { if (out.length === 0) out.push(0); out.push(delay); }
    }

    if (intensity >= 1) {
      out.push(vib.duration);
    } else if (intensity <= 0) {
      if (out.length > 0 && out.length % 2 === 0) out[out.length - 1]! += vib.duration;
      else { out.push(0); out.push(vib.duration); }
    } else {
      const on = Math.max(1, Math.round(PWM * intensity));
      const off = PWM - on;
      let rem = vib.duration;
      while (rem >= PWM) { out.push(on); out.push(off); rem -= PWM; }
      if (rem > 0) {
        const remOn = Math.max(1, Math.round(rem * intensity));
        out.push(remOn);
        if (rem - remOn > 0) out.push(rem - remOn);
      }
    }
  }
  return out;
}

// ─── Built-in presets ─────────────────────────────────────────────────────────

const PRESETS: Record<string, Vibration[]> = {
  buzz:    [{ duration: 1000, intensity: 1 }],
  success: [{ duration: 50 }, { delay: 50, duration: 50 }],
  nudge:   [{ duration: 80, intensity: 0.8 }, { delay: 80, duration: 50, intensity: 0.3 }],
  error:   [
    { duration: 50, intensity: 0.75 },
    { delay: 50, duration: 50, intensity: 0.75 },
    { delay: 50, duration: 50, intensity: 0.75 },
  ],
};

// ─── Main trigger ─────────────────────────────────────────────────────────────

export type HapticInput = string | number | Vibration[];

/**
 * Trigger haptic feedback.
 * Call synchronously inside a user-gesture handler (onClick / onTouchEnd).
 */
export function triggerHaptic(input: HapticInput): void {
  // Resolve input → Vibration[]
  let vibrations: Vibration[];

  if (typeof input === "string") {
    vibrations = PRESETS[input] ?? [];
  } else if (typeof input === "number") {
    vibrations = [{ duration: input }];
  } else {
    vibrations = input;
  }

  if (vibrations.length === 0) return;

  // ── Android path ──────────────────────────────────────────────────────────
  if (canVibrate) {
    const pattern = buildVibratePattern(vibrations);
    (navigator as Navigator & { vibrate: (p: number[]) => void }).vibrate(pattern);
    return;
  }

  // ── iOS path ─────────────────────────────────────────────────────────────
  if (isIOS) {
    const cb = getIOSCheckbox();
    if (!cb) return;

    // First tap synchronously (must stay in user-gesture context)
    iosTap(cb);

    // Subsequent vibrations fired via setTimeout (best effort)
    let cumMs = vibrations[0]!.duration;
    for (let i = 1; i < vibrations.length; i++) {
      const delay = (vibrations[i]!.delay ?? 0) + cumMs;
      const dur = vibrations[i]!.duration;
      cumMs += delay + dur;
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      setTimeout(() => { iosTap(cb); }, delay);
    }
  }
}
