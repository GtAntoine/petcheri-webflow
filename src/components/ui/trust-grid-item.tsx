"use client";

/**
 * TrustGridItem — card 2-colonnes dans la section trust.
 * L'animation itshover se déclenche sur toute la div parente.
 * pointer-events-none sur l'icône pour éviter le double-trigger
 * (l'icône a son propre onHoverStart interne).
 */

import { useRef } from "react";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIconComponent = any;

interface TrustGridItemProps {
  Icon: AnyIconComponent;
  text: string;
}

export function TrustGridItem({ Icon, text }: TrustGridItemProps) {
  const iconRef = useRef<IconHandle>(null);

  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-[--color-border] bg-white/60 p-4 cursor-default"
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <div
        className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "#fde0d4" }}
      >
        <Icon ref={iconRef} size={13} color="#E8705A" className="pointer-events-none" />
      </div>
      <span className="text-sm text-[--color-muted-foreground] leading-snug">{text}</span>
    </div>
  );
}
