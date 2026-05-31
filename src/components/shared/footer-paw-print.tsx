"use client";

/**
 * FooterPawPrint — wrapper client pour PawPrintIcon dans le footer.
 *
 * motion.svg (framer-motion) génère des attributs différents côté serveur
 * et côté client, provoquant un mismatch d'hydratation qui fait disparaître
 * le composant. La garde `mounted` garantit un rendu purement client-side,
 * ce qui élimine le mismatch sans nécessiter de dynamic import dans le footer
 * (qui est un server component).
 */

import { useRef, useState, useEffect } from "react";
import PawPrintIcon from "@/components/icons/paw-print-icon";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export function FooterPawPrint() {
  const iconRef = useRef<IconHandle>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder de même taille pour éviter le layout shift
    return <span className="inline-block" style={{ width: 13, height: 13 }} />;
  }

  return (
    <span
      className="inline-flex"
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <PawPrintIcon
        ref={iconRef}
        size={13}
        color="var(--color-or)"
        className="pointer-events-none"
      />
    </span>
  );
}
