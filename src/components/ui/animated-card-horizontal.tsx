"use client";

/**
 * AnimatedCardHorizontal — même logique qu'AnimatedCard (itshover icon animée
 * au hover de la card entière) mais en layout horizontal : icône à gauche,
 * contenu à droite.
 *
 * Usage:
 *   <AnimatedCardHorizontal Icon={ShieldCheckIcon}>
 *     <h3>Titre</h3>
 *     <p>Description</p>
 *   </AnimatedCardHorizontal>
 */

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIconComponent = any;

interface AnimatedCardHorizontalProps {
  Icon: AnyIconComponent;
  iconColor?: string;
  iconSize?: number;
  iconBg?: string;
  className?: string;
  children: ReactNode;
}

export function AnimatedCardHorizontal({
  Icon,
  iconColor = "#E8705A",
  iconSize = 20,
  iconBg = "#fde0d4",
  className,
  children,
}: AnimatedCardHorizontalProps) {
  const iconRef = useRef<IconHandle>(null);

  return (
    <div
      className={cn("card-base p-8 flex gap-5", className)}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: iconBg }}
      >
        <Icon ref={iconRef} size={iconSize} color={iconColor} />
      </div>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}
