"use client";

import InstagramIcon from "@/components/icons/instagram-icon";
import FacebookIcon  from "@/components/icons/facebook-icon";
import LinkedinIcon  from "@/components/icons/linkedin-icon";
import TwitterXIcon  from "@/components/icons/twitter-x-icon";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/petcheri/",          Icon: InstagramIcon },
  { label: "Facebook",  href: "https://www.facebook.com/petcheri",             Icon: FacebookIcon  },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/petcheri/",    Icon: LinkedinIcon  },
  { label: "X / Twitter", href: "https://twitter.com/petcheri",               Icon: TwitterXIcon  },
];

export function FooterSocial() {
  return (
    <div className="flex gap-3">
      {SOCIALS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-9 h-9 rounded-full border border-[--color-ivoire]/20 flex items-center justify-center text-[--color-ivoire]/60 hover:border-[--color-or] hover:text-[--color-or] transition-colors"
        >
          <Icon size={16} color="currentColor" strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}
