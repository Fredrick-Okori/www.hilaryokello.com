"use client";

import { useRef } from "react";
import Image from "next/image";
import { Goldman } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

const goldman = Goldman({ weight: "700", subsets: ["latin"], display: "swap" });

// Logos in public/partners/clean are trimmed, transparent copies; white or
// boxed originals are recoloured to the site's maroon so they read on cream.
// `website` is optional: partners without one show as a plain logo tile.
const partners: {
  name: string;
  logo: string;
  size: string;
  website?: string;
}[] = [
  {
    name: "Kayetickets",
    logo: "/partners/clean/kayetickets.webp",
    // Optical size: wide wordmarks shorter, compact marks taller.
    size: "h-9 sm:h-11",
    website: "https://www.kayetickets.com",
  },
  {
    name: "Laughing MarabouStork Comedy Club",
    logo: "/partners/clean/laughing-maraboustork.webp",
    size: "h-16 sm:h-20",
    website: "https://laughingmaraboustork.com/",
  },
  {
    name: "Roke Telkom",
    logo: "/partners/clean/roke.webp",
    size: "h-8 sm:h-10",
    website: "https://www.roketelkom.co.ug/",
  },
  {
    name: "Uganda Comedians Association",
    logo: "/partners/clean/uca.webp",
    size: "h-9 sm:h-11",
    website: "https://www.ugandacomedians.com",
  },
  {
    name: "The JICO League",
    logo: "/partners/clean/jico.webp",
    size: "h-16 sm:h-20",
    website: "https://x.com/JicoLeague",
  },
  {
    name: "Modern Tiles",
    logo: "/partners/clean/modern-tiles.webp",
    size: "h-12 sm:h-14",
  },
  {
    name: "Suit Republic Kampala",
    logo: "/partners/clean/suit-republic.webp",
    size: "h-8 sm:h-10",
  },
  {
    name: "Uganda Waragi",
    logo: "/partners/clean/uganda-waragi.webp",
    size: "h-12 sm:h-14",
  },
];

const TILE_CLASS =
  "group relative flex h-32 items-center justify-center px-6 sm:h-40 sm:px-8";

function PartnerTile({
  name,
  website,
  children,
}: {
  name: string;
  website?: string;
  children: React.ReactNode;
}) {
  if (!website) return <div className={TILE_CLASS}>{children}</div>;

  return (
    <a
      aria-label={`${name} (opens in a new tab)`}
      className={TILE_CLASS}
      href={website}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export default function Partners() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(rootRef);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 85%",
              once: true,
            },
          })
          .from(q("[data-partners-head] > *"), {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          })
          .from(
            q("[data-partners-rule]"),
            {
              scaleX: 0,
              transformOrigin: "0% 50%",
              duration: 1,
              ease: "power3.inOut",
            },
            0.1,
          )
          .from(
            q("[data-partner-logo]"),
            {
              autoAlpha: 0,
              y: 20,
              scale: 0.9,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.8)",
            },
            0.3,
          );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="partners-heading"
      className="mx-auto max-w-7xl px-4 sm:px-8"
    >
      <div
        data-partners-head
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
            In good company
          </p>
          <h2
            className={`${goldman.className} mt-3 text-4xl leading-tight tracking-tight text-[#391314] sm:text-5xl`}
            id="partners-heading"
          >
            Our Partners
          </h2>
        </div>
        <p className="max-w-sm text-ink/60">
          The brands, venues and organisations that help bring the laughs to
          life.
        </p>
      </div>

      <div className="relative mt-10 sm:mt-14">
        <span
          data-partners-rule
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-ink/15"
        />
        <ul className="grid grid-cols-2 gap-px bg-ink/10 pb-px md:grid-cols-4">
          {partners.map((partner, i) => (
            <li
              key={partner.name}
              className={`bg-cream ${
                // Odd count: the last logo spans the row on phones.
                partners.length % 2 === 1 && i === partners.length - 1
                  ? "col-span-2 md:col-span-1"
                  : ""
              }`}
            >
              <PartnerTile name={partner.name} website={partner.website}>
                <span
                  data-partner-logo
                  className={`relative block w-full max-w-[190px] ${partner.size}`}
                >
                  <Image
                    fill
                    alt={`${partner.name} logo`}
                    className="object-contain transition duration-500 group-hover:scale-105 [@media(hover:hover)]:opacity-70 [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:grayscale-0"
                    sizes="180px"
                    src={partner.logo}
                  />
                </span>
                {partner.website && (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="absolute right-3 top-3 h-4 w-4 -translate-x-1 translate-y-1 text-yellow-500 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                )}
              </PartnerTile>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
