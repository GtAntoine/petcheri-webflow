"use client";

/**
 * ChecklistItem — ligne de checklist avec CheckedIcon itshover.
 * L'animation est déclenchée au hover du bloc, pas de l'icône.
 *
 * Usage :
 *   <ul className="space-y-2">
 *     {ITEMS.map((text) => <ChecklistItem key={text} text={text} />)}
 *   </ul>
 */

import { useRef } from "react";
import CheckedIcon, { type CheckedIconHandle } from "@/components/icons/checked-icon";

interface ChecklistItemProps {
  text: string;
}

export function ChecklistItem({ text }: ChecklistItemProps) {
  const iconRef = useRef<CheckedIconHandle>(null);

  return (
    <li
      className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-white/50 hover:bg-white transition-all duration-200 cursor-default"
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <CheckedIcon
        ref={iconRef}
        size={18}
        color="var(--color-rouge-light)"
        strokeWidth={1.75}
        className="shrink-0"
      />
      <span className="text-sm font-medium text-[--color-chocolat]">{text}</span>
    </li>
  );
}
