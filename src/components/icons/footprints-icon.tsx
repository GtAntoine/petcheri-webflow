"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface FootprintsIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FootprintsIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Two paw-print silhouettes stepping alternately — like a walking rhythm
const PAW_A_VARIANTS: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [1, 0.25, 1, 0.25, 1],
    scale:   [1, 0.82, 1, 0.82, 1],
    transition: { duration: 1.1, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] },
  },
};

const PAW_B_VARIANTS: Variants = {
  normal: { opacity: 0.45, scale: 1 },
  animate: {
    opacity: [0.45, 1, 0.25, 1, 0.45],
    scale:   [1,    1, 0.82, 1, 1],
    transition: { duration: 1.1, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] },
  },
};

const FootprintsIcon = forwardRef<FootprintsIconHandle, FootprintsIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, color = "currentColor", strokeWidth = 2, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start("animate");
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start("normal");
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          viewBox="0 0 24 24"
          width={size}
          style={{ overflow: "visible" }}
        >
          {/* Paw A — haut gauche (pied gauche) */}
          <motion.g
            animate={controls}
            initial="normal"
            variants={PAW_A_VARIANTS}
            style={{ transformOrigin: "7px 10px" }}
          >
            <ellipse cx="7" cy="10" rx="2.5" ry="2" />
            <circle cx="4.5"  cy="7"  r="1" />
            <circle cx="7"    cy="6"  r="1" />
            <circle cx="9.5"  cy="7"  r="1" />
          </motion.g>

          {/* Paw B — bas droite (pied droit), démarré à mi-opacity */}
          <motion.g
            animate={controls}
            initial="normal"
            variants={PAW_B_VARIANTS}
            style={{ transformOrigin: "17px 18px", opacity: 0.45 }}
          >
            <ellipse cx="17" cy="18" rx="2.5" ry="2" />
            <circle cx="14.5" cy="15" r="1" />
            <circle cx="17"   cy="14" r="1" />
            <circle cx="19.5" cy="15" r="1" />
          </motion.g>
        </svg>
      </div>
    );
  },
);

FootprintsIcon.displayName = "FootprintsIcon";
export default FootprintsIcon;
