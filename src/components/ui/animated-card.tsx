"use client";

/**
 * AnimatedCard — wrapper that triggers the itshover icon animation
 * when the *entire card* is hovered, not just the icon.
 *
 * Usage:
 *   <AnimatedCard Icon={TruckIcon} className="p-6 flex flex-col gap-4">
 *     <h3>...</h3>
 *     <p>...</p>
 *   </AnimatedCard>
 */

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIconComponent = any;

interface AnimatedCardProps {
  /** Any itshover icon component (forwardRef with startAnimation/stopAnimation) */
  Icon: AnyIconComponent;
  iconColor?: string;
  iconSize?: number;
  iconStrokeWidth?: number;
  /**
   * Si fourni, l'icône est enveloppée dans un cercle coloré (w-12 h-12 rounded-full).
   * Ex: "var(--color-creme)" pour les cartes de garanties.
   */
  iconBg?: string;
  /** Extra classes on the outer div (card-base is already included) */
  className?: string;
  children: ReactNode;
}

export function AnimatedCard({
  Icon,
  iconColor = "var(--color-or)",
  iconSize = 24,
  iconStrokeWidth = 1.5,
  iconBg,
  className,
  children,
}: AnimatedCardProps) {
  const iconRef = useRef<IconHandle>(null);

  return (
    <div
      className={cn("card-base", className)}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      {iconBg ? (
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: iconBg }}
        >
          <Icon
            ref={iconRef}
            size={iconSize}
            color={iconColor}
            strokeWidth={iconStrokeWidth}
          />
        </div>
      ) : (
        <Icon
          ref={iconRef}
          size={iconSize}
          color={iconColor}
          strokeWidth={iconStrokeWidth}
        />
      )}
      {children}
    </div>
  );
}
