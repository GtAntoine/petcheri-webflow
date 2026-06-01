"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ScissorsIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ScissorsIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// The two blades pivot around their crossing point ≈ (12, 12)
// Top blade opens up (rotate -), bottom blade opens down (rotate +) — snipping motion
const TOP_BLADE_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -20, 0, -10, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const BOTTOM_BLADE_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 20, 0, 10, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const ScissorsIcon = forwardRef<ScissorsIconHandle, ScissorsIconProps>(
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
          {/* Top blade: handle (6,6) → blade tip (20,20); pivot ≈ (12,12) */}
          <motion.g
            animate={controls}
            initial="normal"
            variants={TOP_BLADE_VARIANTS}
            style={{ transformOrigin: "12px 12px" }}
          >
            <circle cx="6" cy="6" r="3" />
            <line x1="8.12" y1="8.12" x2="20" y2="20" />
          </motion.g>

          {/* Bottom blade: handle (6,18) → blade tip (20,4); pivot ≈ (12,12) */}
          <motion.g
            animate={controls}
            initial="normal"
            variants={BOTTOM_BLADE_VARIANTS}
            style={{ transformOrigin: "12px 12px" }}
          >
            <circle cx="6" cy="18" r="3" />
            <line x1="8.12" y1="15.88" x2="20" y2="4" />
          </motion.g>
        </svg>
      </div>
    );
  },
);

ScissorsIcon.displayName = "ScissorsIcon";
export default ScissorsIcon;
