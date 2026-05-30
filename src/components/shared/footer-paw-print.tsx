"use client";

/**
 * FooterPawPrint — wrapper client pour PawPrintIcon dans le footer.
 * Nécessaire car le footer est un server component et motion.svg
 * (utilisé par PawPrintIcon) doit être hydraté côté client.
 * pointer-events-none sur l'icône pour éviter le double-trigger avec
 * son onHoverStart interne.
 */

import { useRef } from "react";
import PawPrintIcon from "@/components/icons/paw-print-icon";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export function FooterPawPrint() {
  const iconRef = useRef<IconHandle>(null);

  return (
    <span
      className="inline-flex"
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <PawPrintIcon
        ref={iconRef}
        size={13}
        color="rgba(250,247,242,0.4)"
        className="pointer-events-none"
      />
    </span>
  );
}
