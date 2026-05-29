"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TrophyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TrophyIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const CUP_VARIANTS: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: [0, -3, 0, -1.5, 0],
    rotate: [0, -4, 4, -2, 0],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const SHINE_VARIANTS: Variants = {
  normal: { opacity: 0, pathLength: 0 },
  animate: {
    opacity: [0, 1, 0],
    pathLength: [0, 1, 1],
    transition: { duration: 0.5, delay: 0.15, ease: "easeOut" },
  },
};

const TrophyIcon = forwardRef<TrophyIconHandle, TrophyIconProps>(
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
        if (isControlledRef.current) onMouseEnter?.(e);
        else controls.start("animate");
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) onMouseLeave?.(e);
        else controls.start("normal");
      },
      [controls, onMouseLeave]
    );

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg
          fill="none"
          height={size}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          viewBox="0 0 24 24"
          width={size}
        >
          <motion.g animate={controls} initial="normal" variants={CUP_VARIANTS} style={{ transformOrigin: "12px 10px" }}>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            <motion.path
              animate={controls}
              initial="normal"
              variants={SHINE_VARIANTS}
              d="M9 6 Q12 4 15 6"
              strokeWidth={strokeWidth * 0.8}
              opacity={0.6}
            />
          </motion.g>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M4 22h16" />
        </svg>
      </div>
    );
  }
);

TrophyIcon.displayName = "TrophyIcon";
export default TrophyIcon;
