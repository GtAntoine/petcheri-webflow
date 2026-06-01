"use client";

import { useRef } from "react";
import InstagramIcon from "@/components/icons/instagram-icon";
import FacebookIcon  from "@/components/icons/facebook-icon";
import LinkedinIcon  from "@/components/icons/linkedin-icon";
import TwitterXIcon  from "@/components/icons/twitter-x-icon";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/petcheri/",          Icon: InstagramIcon },
  { label: "Facebook",  href: "https://www.facebook.com/petcheri",             Icon: FacebookIcon  },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/petcheri/",    Icon: LinkedinIcon  },
 // { label: "X / Twitter", href: "https://twitter.com/petcheri",               Icon: TwitterXIcon  },
];

export function FooterSocial() {
  // Un ref par icône — l'animation se déclenche au hover de tout le bouton <a>
  const iconRefs = useRef<(IconHandle | null)[]>([]);

  return (
    <div className="flex gap-3">
      {SOCIALS.map(({ label, href, Icon }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-12 h-12 rounded-full border border-[--color-ivoire]/20 flex items-center justify-center text-[--color-ivoire]/60 hover:border-[--color-or] hover:text-[--color-or] transition-colors"
          onMouseEnter={() => iconRefs.current[i]?.startAnimation()}
          onMouseLeave={() => iconRefs.current[i]?.stopAnimation()}
        >
          <Icon
            ref={(el: IconHandle | null) => { iconRefs.current[i] = el; }}
            size={28}
            color="currentColor"
            strokeWidth={1.2}
            className="pointer-events-none"
          />
        </a>
      ))}
    </div>
  );
}
