"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Goldman } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { FaWhatsapp, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Mic,
  PartyPopper,
  Phone,
  Send,
  Users,
} from "lucide-react";

import Partners from "@/components/partners";
import { supabase } from "@/lib/supabase";
import { COUNTRIES } from "@/lib/countries";
import { BOOKING_AUDIENCE_SIZES, BOOKING_EVENT_TYPES } from "@/lib/booking";
import { submitBookingRequest } from "@/app/actions/public-forms";

const goldman = Goldman({ weight: "700", subsets: ["latin"], display: "swap" });

// Used until the admin fills in Booking details (Admin → Booking).
const DEFAULT_WHATSAPP = "256784704143";
const ALT_WHATSAPP = "256752734280";

type BookingInfo = {
  email: string;
  phone: string;
  whatsapp: string;
  note: string;
};

const digits = (value: string) => value.replace(/\D/g, "");

// "256784704143" → "+256 784 704143", matching how the numbers were shown.
function formatNumber(raw: string): string {
  const d = digits(raw);

  return d.length === 12
    ? `+${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`
    : `+${d}`;
}

const waLink = (number: string, text?: string) =>
  `https://wa.me/${digits(number)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

const EVENT_TYPES = [
  {
    icon: Briefcase,
    title: "Corporate events",
    text: "From keynote-style sets to high-energy entertainment that keeps the room engaged.",
  },
  {
    icon: PartyPopper,
    title: "Private functions",
    text: "Perfect for weddings, birthdays, and intimate celebrations with a polished edge.",
  },
  {
    icon: Mic,
    title: "Festivals & tours",
    text: "Built for large stages, audiences, and unforgettable headline moments.",
  },
];

// 2027 tour stops, for the scrolling band under the hero.
const TOUR_CITIES = [
  "Kampala",
  "Nairobi",
  "Juba",
  "Dar es Salaam",
  "Lilongwe",
  "Harare",
  "Bulawayo",
  "Johannesburg",
  "Cape Town",
  "Gaborone",
  "Windhoek",
  "Ezulwini",
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
];

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://instagram.com/drhilaryokello",
    label: "Instagram",
  },
  { icon: FaXTwitter, href: "https://twitter.com/drhilaryokello", label: "X" },
  {
    icon: FaYoutube,
    href: "https://youtube.com/@drhilaryokello",
    label: "YouTube",
  },
  {
    icon: FaTiktok,
    href: "https://tiktok.com/@drhilaryokello",
    label: "TikTok",
  },
];

const fieldClass =
  "h-12 w-full min-w-0 rounded-xl border border-transparent bg-ink/[0.035] px-4 text-base text-ink placeholder:text-ink/35 outline-none transition focus:border-yellow-500/60 focus:bg-white focus:ring-4 focus:ring-yellow-500/10";
const labelClass =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-ink/55";

export default function BookingPage() {
  const rootRef = useRef<HTMLElement>(null);
  const [info, setInfo] = useState<BookingInfo | null>(null);

  useEffect(() => {
    supabase
      .from("booking_info")
      .select("email, phone, whatsapp, note")
      .limit(1)
      .maybeSingle()
      .then(
        ({ data }) => data && setInfo(data as BookingInfo),
        () => {},
      );
  }, []);

  const primary = digits(info?.whatsapp ?? "") || DEFAULT_WHATSAPP;
  const lines = Array.from(new Set([primary, DEFAULT_WHATSAPP, ALT_WHATSAPP]));
  const email = info?.email.trim();
  const phone = info?.phone.trim();
  const note = info?.note.trim();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (ctx) => {
          const { motion, finePointer } = ctx.conditions as {
            motion: boolean;
            finePointer: boolean;
          };

          if (!motion) return;
          const q = gsap.utils.selector(rootRef);

          // ── Hero intro: headline letters rise out of masks ──
          const title = SplitText.create(q("[data-hero-title]"), {
            type: "words,chars",
            mask: "words",
          });

          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from(title.chars, {
              yPercent: 115,
              rotation: 6,
              duration: 0.9,
              stagger: 0.025,
              ease: "power4.out",
            })
            .from(
              q("[data-hero-item]"),
              { autoAlpha: 0, y: 28, duration: 0.7, stagger: 0.09 },
              0.2,
            )
            .from(
              q("[data-hero-photo]"),
              {
                autoAlpha: 0,
                scale: 0.92,
                rotation: (i) => (i === 0 ? 2 : -8),
                duration: 0.9,
                stagger: 0.15,
                ease: "back.out(1.4)",
              },
              0.15,
            )
            .from(
              q("[data-hero-float]"),
              {
                autoAlpha: 0,
                y: 20,
                scale: 0.8,
                duration: 0.6,
                ease: "back.out(2)",
              },
              0.8,
            );

          // Gentle drift on the floating badge.
          gsap.to(q("[data-hero-float]"), {
            y: -8,
            duration: 2.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.5,
          });

          // Photos separate as the hero scrolls away.
          const zone = q("[data-hero-zone]")[0] as HTMLElement;

          gsap.to(q("[data-hero-photo]"), {
            y: (i) => (i === 0 ? 40 : -70),
            ease: "none",
            scrollTrigger: {
              trigger: zone,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          // ── Tour band: endless loop that surges and leans with scroll ──
          const marquee = q("[data-marquee]")[0];
          const loop = gsap.to(marquee, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
          });
          const lean = gsap.quickTo(marquee, "skewX", {
            duration: 0.4,
            ease: "power3.out",
          });

          ScrollTrigger.create({
            trigger: marquee,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const v = self.getVelocity();

              loop.timeScale(1 + Math.min(Math.abs(v) / 250, 6));
              lean(gsap.utils.clamp(-8, 8, -v / 250));
              gsap.to(loop, {
                timeScale: 1,
                duration: 1.2,
                ease: "power2.out",
                overwrite: true,
                delay: 0.1,
              });
            },
            onLeave: () => lean(0),
            onLeaveBack: () => lean(0),
          });

          // ── Section headings: words rise as they scroll in ──
          q("[data-split]").forEach((heading) => {
            const split = SplitText.create(heading, {
              type: "words",
              mask: "words",
            });

            gsap.from(split.words, {
              yPercent: 110,
              duration: 0.8,
              stagger: 0.07,
              ease: "power4.out",
              scrollTrigger: { trigger: heading, start: "top 88%", once: true },
            });
          });

          // Event-type rules draw in left → right.
          ScrollTrigger.batch(q("[data-rule]"), {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.from(batch, {
                scaleX: 0,
                transformOrigin: "0% 50%",
                duration: 1.1,
                stagger: 0.12,
                ease: "power3.inOut",
              }),
          });

          // Everything else reveals as it scrolls in.
          ScrollTrigger.batch(q("[data-reveal]"), {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.from(batch, {
                autoAlpha: 0,
                y: 36,
                duration: 0.75,
                stagger: 0.1,
                ease: "power3.out",
              }),
          });

          // Form fields cascade in after the card.
          const fields = q("[data-form-grid] > *");

          if (fields.length) {
            gsap.from(fields, {
              autoAlpha: 0,
              y: 18,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
              delay: 0.25,
              scrollTrigger: {
                trigger: fields[0],
                start: "top 90%",
                once: true,
              },
            });
          }

          // CTA photo drifts slower than the page.
          gsap.fromTo(
            q("[data-parallax]"),
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: q("[data-parallax-wrap]")[0],
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );

          if (!finePointer) return;

          // ── Desktop: hero layers follow the cursor at different depths ──
          const layers = (q("[data-depth]") as HTMLElement[]).map((el) => ({
            depth: Number(el.dataset.depth),
            x: gsap.quickTo(el, "xPercent", {
              duration: 0.8,
              ease: "power3.out",
            }),
            y: gsap.quickTo(el, "yPercent", {
              duration: 0.8,
              ease: "power3.out",
            }),
          }));
          const onZoneMove = (e: PointerEvent) => {
            const r = zone.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;

            layers.forEach((l) => {
              l.x(-px * l.depth * 1.6);
              l.y(-py * l.depth * 1.6);
            });
          };
          const onZoneLeave = () =>
            layers.forEach((l) => {
              l.x(0);
              l.y(0);
            });

          zone.addEventListener("pointermove", onZoneMove);
          zone.addEventListener("pointerleave", onZoneLeave);

          // ── Desktop: magnetic buttons ──
          const magnets = (q("[data-magnetic]") as HTMLElement[]).map((el) => {
            const x = gsap.quickTo(el, "x", {
              duration: 0.4,
              ease: "power3.out",
            });
            const y = gsap.quickTo(el, "y", {
              duration: 0.4,
              ease: "power3.out",
            });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();

              x((e.clientX - (r.left + r.width / 2)) * 0.3);
              y((e.clientY - (r.top + r.height / 2)) * 0.4);
            };
            const leave = () =>
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.4)",
              });

            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);

            return () => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            };
          });

          return () => {
            zone.removeEventListener("pointermove", onZoneMove);
            zone.removeEventListener("pointerleave", onZoneLeave);
            magnets.forEach((off) => off());
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="w-full bg-cream text-left text-ink">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[url('/texture-tile.webp')] bg-[length:360px_auto] bg-repeat opacity-[0.07] [mask-image:linear-gradient(to_bottom,black,transparent)] md:bg-[length:560px_auto]"
        />

        <div
          data-hero-zone
          className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24"
        >
          <div>
            <span
              data-hero-item
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-600"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-500/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500" />
              </span>
              Now booking 2027 dates
              <span aria-hidden="true" className="h-px w-10 bg-yellow-500/40" />
            </span>

            <h1
              data-hero-title
              className={`${goldman.className} mt-6 text-[2.75rem] leading-[0.98] tracking-tight text-[#391314] sm:text-6xl lg:text-[5.25rem]`}
            >
              Book{" "}
              <span className="block text-yellow-500">Dr. Hilary Okello</span>
            </h1>

            <p
              data-hero-item
              className="mt-6 max-w-lg text-lg leading-relaxed text-ink/65"
            >
              Uganda&apos;s top stand-up comedian is available for corporate
              events, private functions, festivals, and international tours.
            </p>

            <div
              data-hero-item
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <a
                data-magnetic
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#391314] px-8 text-base font-bold text-cream transition-colors hover:bg-yellow-500"
                href={waLink(
                  primary,
                  "Hi, I'd like to book Dr. Hilary Okello for an event.",
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                Book on WhatsApp
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a
                data-magnetic
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-bold text-ink ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-cream hover:ring-ink"
                href="#enquiry"
              >
                Plan your event
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Photo collage */}
          <div className="relative mx-auto w-full max-w-xl pb-10 pl-6 sm:pb-14 sm:pl-10">
            <div
              data-hero-photo
              className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(57,19,20,0.45)]"
              data-depth="1"
            >
              <Image
                fill
                priority
                alt="Dr. Hilary Okello on stage in front of a packed theatre"
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 560px"
                src="/booking/on-stage.avif"
              />
            </div>
            <div
              data-hero-photo
              className="absolute bottom-0 left-0 aspect-[3/2] w-[44%] -rotate-3 overflow-hidden rounded-2xl ring-[6px] ring-cream shadow-[0_24px_48px_-20px_rgba(57,19,20,0.5)]"
              data-depth="3"
            >
              <Image
                fill
                alt="Audience laughing at a Dr. Hilary Okello show"
                className="object-cover"
                sizes="(max-width: 1024px) 45vw, 280px"
                src="/booking/laughing-crowd.avif"
              />
            </div>
            <div
              data-hero-float
              className="absolute -top-4 right-2 flex items-center gap-3 rounded-full bg-white/85 py-2 pl-2 pr-5 shadow-[0_16px_40px_-16px_rgba(57,19,20,0.35)] ring-1 ring-ink/5 backdrop-blur-md sm:right-6"
              data-depth="4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <Clock className="h-5 w-5 text-green-600" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-ink">
                  Quick replies
                </span>
                <span className="block text-xs text-ink/55">
                  Within 24 hours
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tour cities band ── */}
      <div
        aria-label="2027 tour cities"
        className="overflow-hidden bg-[#391314] py-5 text-cream sm:py-6"
        role="region"
      >
        <div data-marquee className="flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className={`${goldman.className} flex shrink-0 items-center text-xl uppercase tracking-wide sm:text-2xl`}
            >
              {TOUR_CITIES.map((city) => (
                <li key={city} className="flex items-center">
                  <span className="px-6 sm:px-8">{city}</span>
                  <span aria-hidden="true" className="text-[#f5a25d]">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ── Event types ── */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28">
        <div
          data-reveal
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
              What we book
            </p>
            <h2
              data-split
              className={`${goldman.className} mt-3 text-4xl leading-tight tracking-tight text-[#391314] sm:text-5xl`}
            >
              Built for every stage
            </h2>
          </div>
          <p className="max-w-sm text-ink/60">
            Comedy tailored to your audience, your occasion and the room.
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-8">
          {EVENT_TYPES.map(({ icon: Icon, title, text }, i) => (
            <div key={title} data-reveal className="group relative pt-8">
              <span
                data-rule
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-ink/15"
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-yellow-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <span
                  className={`${goldman.className} text-sm tracking-widest text-yellow-500`}
                >
                  0{i + 1}
                </span>
                <Icon className="h-5 w-5 text-ink/30 transition-colors duration-300 group-hover:text-yellow-500" />
              </div>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink/60">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Enquiry ── */}
      <div
        className="scroll-mt-24 border-t border-ink/10 py-20 sm:py-28"
        id="enquiry"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
              Book with ease
            </p>
            <h2
              data-split
              className={`${goldman.className} mt-3 text-4xl leading-tight tracking-tight text-[#391314] sm:text-5xl`}
            >
              Plan your <span className="text-yellow-500">booking</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/60">
              Tell us about your event and we&apos;ll get back to you within 24
              hours. Every request goes straight to our booking team.
            </p>

            {note && (
              <p className="mt-6 whitespace-pre-line rounded-2xl border-l-4 border-yellow-500 bg-yellow-500/5 px-5 py-4 text-ink/80">
                {note}
              </p>
            )}

            <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {lines.map((number, i) => (
                <ContactRow
                  key={number}
                  href={waLink(number)}
                  icon={<FaWhatsapp className="h-5 w-5 text-green-600" />}
                  iconBg="bg-green-500/10"
                  label={i === 0 ? "WhatsApp" : "WhatsApp (alternative)"}
                  value={formatNumber(number)}
                />
              ))}
              {phone && (
                <ContactRow
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  icon={<Phone className="h-5 w-5 text-yellow-600" />}
                  iconBg="bg-yellow-500/10"
                  label="Call"
                  value={phone}
                />
              )}
              {email && (
                <ContactRow
                  href={`mailto:${email}`}
                  icon={<Mail className="h-5 w-5 text-yellow-600" />}
                  iconBg="bg-yellow-500/10"
                  label="Email"
                  value={email}
                />
              )}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink/50">
                Follow along
              </span>
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 ring-1 ring-ink/15 transition-colors hover:bg-[#391314] hover:text-cream hover:ring-[#391314]"
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div data-reveal>
            <EnquiryForm whatsapp={primary} />
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="px-4 py-16 sm:px-8 sm:py-24">
        <div
          data-parallax-wrap
          data-reveal
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]"
        >
          <div data-parallax className="absolute -inset-y-[10%] inset-x-0">
            <Image
              fill
              alt=""
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1152px"
              src="/booking/full-house.avif"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#391314]/95 via-[#391314]/80 to-[#391314]/35 sm:bg-gradient-to-r sm:to-[#391314]/40" />
          <div className="relative px-6 py-14 sm:px-12 sm:py-20 lg:max-w-2xl">
            <h2
              data-split
              className={`${goldman.className} text-3xl leading-tight text-cream sm:text-5xl`}
            >
              Let&apos;s make your event{" "}
              <span className="text-[#f5a25d]">legendary</span>
            </h2>
            <p className="mt-4 text-lg text-cream/80">
              Don&apos;t settle for ordinary entertainment. Book Dr. Hilary
              Okello and give your guests an experience they&apos;ll never
              forget.
            </p>
            <a
              data-magnetic
              className="group mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-cream px-8 text-base font-bold text-[#391314] transition-colors hover:bg-white"
              href={waLink(
                primary,
                "Hi, I'd like to book Dr. Hilary Okello for an event.",
              )}
              rel="noopener noreferrer"
              target="_blank"
            >
              Start the conversation
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Partners ── */}
      <div className="pb-20 pt-4 sm:pb-28">
        <Partners />
      </div>
    </section>
  );
}

function ContactRow({
  href,
  icon,
  iconBg,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
}) {
  const external = href.startsWith("http");

  return (
    <a
      className="group flex items-center gap-4 py-4 transition-colors"
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45">
          {label}
        </span>
        <span className="block truncate text-lg font-bold text-ink transition-colors group-hover:text-yellow-600">
          {value}
        </span>
      </span>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-yellow-500" />
    </a>
  );
}

// Saves the enquiry to the admin dashboard; the server action then sends the
// client a WhatsApp confirmation.
function EnquiryForm({ whatsapp }: { whatsapp: string }) {
  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    phoneCountry: "Uganda",
    phone: "",
    eventType: BOOKING_EVENT_TYPES[0],
    date: "",
    location: "",
    audience: "",
    details: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<{ whatsappSent: boolean } | null>(null);
  // Bumped on every failed submit so the same message shakes again.
  const [errorKey, setErrorKey] = useState(0);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const reduceMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(
    () => {
      if (!error || !errorRef.current || reduceMotion()) return;
      gsap.fromTo(
        errorRef.current,
        { x: 0 },
        {
          keyframes: { x: [0, -10, 9, -7, 5, -2, 0] },
          duration: 0.5,
          ease: "power1.out",
        },
      );
    },
    { dependencies: [errorKey] },
  );

  useGSAP(
    () => {
      const el = successRef.current;

      if (!sent || !el || reduceMotion()) return;
      gsap
        .timeline()
        .from(el, { autoAlpha: 0, y: 24, duration: 0.5, ease: "power3.out" })
        .from(
          el.querySelector("[data-success-icon]"),
          { scale: 0, rotation: -90, duration: 0.7, ease: "back.out(2.5)" },
          0.1,
        )
        .from(
          el.querySelectorAll("[data-success-text]"),
          { autoAlpha: 0, y: 12, duration: 0.45, stagger: 0.08 },
          0.35,
        );
    },
    { dependencies: [sent] },
  );

  const fail = (message: string) => {
    setError(message);
    setErrorKey((k) => k + 1);
  };

  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (form.name.trim().length < 2) {
      fail("Please enter your name.");

      return;
    }
    if (form.phone.replace(/\D/g, "").length < 6) {
      fail("Please enter your WhatsApp number.");

      return;
    }
    if (form.email.trim() && !/.+@.+\..+/.test(form.email.trim())) {
      fail("Please enter a valid email address, or leave it blank.");

      return;
    }
    if (form.location.trim().length < 2) {
      fail("Please tell us where the event is.");

      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const result = await submitBookingRequest(form);

      if (result.ok) setSent({ whatsappSent: result.whatsappSent });
      else fail(result.error);
    } catch {
      fail("We couldn't send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        ref={successRef}
        className="flex flex-col items-center rounded-[2rem] bg-white p-8 text-center shadow-[0_40px_100px_-40px_rgba(57,19,20,0.3)] ring-1 ring-ink/5 sm:p-12"
        role="status"
      >
        <span
          data-success-icon
          className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30"
        >
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>
        <h3
          data-success-text
          className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl"
        >
          Booking request sent!
        </h3>
        <p data-success-text className="mt-3 max-w-sm text-ink/65">
          Thanks, {form.name.trim().split(/\s+/)[0]}.{" "}
          {sent.whatsappSent
            ? "We've sent a confirmation to your WhatsApp and our team will get back to you within 24 hours."
            : "Our team has received your request and will get back to you within 24 hours."}
        </p>
        <a
          data-success-text
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink/5 px-6 py-3 font-bold text-ink ring-1 ring-ink/10 transition-colors hover:bg-ink/10"
          href={waLink(
            whatsapp,
            `Hi, I've just sent a booking request on the website (${form.eventType}, ${form.location.trim()}).`,
          )}
          rel="noopener noreferrer"
          target="_blank"
        >
          Chat with us on WhatsApp
          <FaWhatsapp className="h-5 w-5 text-green-600" />
        </a>
      </div>
    );
  }

  return (
    <form
      noValidate
      aria-label="Booking enquiry"
      className="rounded-[2rem] bg-white p-6 shadow-[0_40px_100px_-40px_rgba(57,19,20,0.3)] ring-1 ring-ink/5 sm:p-10"
      onSubmit={onSubmit}
    >
      <div data-form-grid className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Your name</span>
          <input
            autoComplete="name"
            className={fieldClass}
            placeholder="e.g. Jane Akello"
            value={form.name}
            onChange={set("name")}
          />
        </label>
        <label className="block">
          <span className={labelClass}>
            Organisation{" "}
            <span className="font-normal text-ink/45">(optional)</span>
          </span>
          <input
            autoComplete="organization"
            className={fieldClass}
            placeholder="Company or host"
            value={form.organisation}
            onChange={set("organisation")}
          />
        </label>

        <div className="flex gap-3 sm:col-span-2">
          <label className="block w-28 shrink-0">
            <span className={labelClass}>Country code</span>
            <span className="relative block">
              <select
                className={`${fieldClass} appearance-none pr-9`}
                value={form.phoneCountry}
                onChange={set("phoneCountry")}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.iso2} title={c.name} value={c.name}>
                    {c.dialCode}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            </span>
          </label>
          <label className="block min-w-0 flex-1">
            <span className={labelClass}>WhatsApp number</span>
            <span className="relative block">
              <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
              <input
                autoComplete="tel-national"
                className={`${fieldClass} pl-11`}
                inputMode="tel"
                placeholder="772123456"
                type="tel"
                value={form.phone}
                onChange={set("phone")}
              />
            </span>
          </label>
        </div>

        <label className="block sm:col-span-2">
          <span className={labelClass}>
            Email <span className="font-normal text-ink/45">(optional)</span>
          </span>
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              autoComplete="email"
              className={`${fieldClass} pl-11`}
              placeholder="jane@company.com"
              type="email"
              value={form.email}
              onChange={set("email")}
            />
          </span>
        </label>

        <label className="block">
          <span className={labelClass}>Event type</span>
          <span className="relative block">
            <select
              className={`${fieldClass} appearance-none pr-10`}
              value={form.eventType}
              onChange={set("eventType")}
            >
              {BOOKING_EVENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          </span>
        </label>
        <label className="block">
          <span className={labelClass}>Event date</span>
          <span className="relative block">
            <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              className={`${fieldClass} pl-11`}
              min={new Date().toISOString().slice(0, 10)}
              type="date"
              value={form.date}
              onChange={set("date")}
            />
          </span>
        </label>

        <label className="block">
          <span className={labelClass}>City &amp; country</span>
          <span className="relative block">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              className={`${fieldClass} pl-11`}
              placeholder="e.g. Kampala, Uganda"
              value={form.location}
              onChange={set("location")}
            />
          </span>
        </label>
        <label className="block">
          <span className={labelClass}>Expected audience</span>
          <span className="relative block">
            <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <select
              className={`${fieldClass} appearance-none pl-11 pr-10`}
              value={form.audience}
              onChange={set("audience")}
            >
              <option value="">Not sure yet</option>
              {BOOKING_AUDIENCE_SIZES.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          </span>
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>
            Anything else?{" "}
            <span className="font-normal text-ink/45">(optional)</span>
          </span>
          <textarea
            className={`${fieldClass} h-28 resize-none py-3`}
            placeholder="Venue, set length, budget, theme…"
            value={form.details}
            onChange={set("details")}
          />
        </label>
      </div>

      {error && (
        <p
          ref={errorRef}
          aria-live="polite"
          className="mt-5 rounded-xl bg-red/10 px-4 py-3 text-sm font-medium text-red-dark"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#391314] px-8 text-base font-bold text-cream transition-colors hover:bg-yellow-500 disabled:cursor-wait disabled:opacity-80"
        disabled={submitting}
        type="submit"
      >
        {submitting ? (
          <>
            Sending request…
            <Loader2 className="h-5 w-5 animate-spin" />
          </>
        ) : (
          <>
            Send booking request
            <Send className="h-5 w-5" />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-ink/45">
        We&apos;ll reply on WhatsApp and only use your details for this booking.{" "}
        <Link
          className="underline underline-offset-2 hover:text-ink"
          href="/privacy"
        >
          Privacy policy
        </Link>
      </p>
    </form>
  );
}
