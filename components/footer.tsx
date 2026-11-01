import Link from "next/link";
import React from "react";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@drhilaryokello",
    icon: FaYoutube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/drhilaryokello/",
    icon: FaInstagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@drhilary_okello",
    icon: FaTiktok,
  },
  { label: "X", href: "https://twitter.com/DrHilaryOkello", icon: FaXTwitter },
];

const linkClass =
  "rounded text-ink/70 transition-colors hover:text-[#391314] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#391314]";

export default function Footer() {
  return (
    <footer className="text-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 border-t border-ink/15 px-4 py-8 text-sm sm:px-8 lg:flex-row lg:justify-between 2xl:max-w-[1440px]">
        <p className="order-2 text-ink/50 lg:order-none">
          &copy; {new Date().getFullYear()} Dr. Hilary Okello. All rights
          reserved.
        </p>

        <nav aria-label="Social media" className="order-1 lg:order-none">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  aria-label={`Dr. Hilary Okello on ${label} (opens in a new tab)`}
                  className={`${linkClass} inline-flex items-center gap-2`}
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:order-none">
          <Link className={linkClass} href="/privacy">
            Privacy policy
          </Link>
          <a
            className={linkClass}
            href="https://www.kayetickets.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Powered by KayeTickets
          </a>
        </div>
      </div>
    </footer>
  );
}
