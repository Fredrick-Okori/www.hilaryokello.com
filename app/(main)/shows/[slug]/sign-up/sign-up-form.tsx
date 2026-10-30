"use client";

import type { Show } from "@/lib/shows";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BellRing,
  Check,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { COUNTRIES } from "@/lib/countries";
import { submitShowSignUp } from "@/app/actions/public-forms";

const fieldClass =
  "h-12 w-full min-w-0 rounded-xl border border-ink/10 bg-cream/60 text-base text-ink placeholder:text-ink/35 outline-none transition focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10";

const labelClass = "mb-1.5 block text-sm font-semibold text-ink/80";

export default function SignUpForm({ show }: { show: Show }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // Default the dial code to the show's country; most fans are local.
  const [country, setCountry] = useState(
    COUNTRIES.some((c) => c.name === show.country) ? show.country : "Uganda",
  );
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const city = show.city.trim();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (fullName.trim().length < 2) {
      setError("Please enter your full name.");

      return;
    }
    if (!/.+@.+\..+/.test(email.trim())) {
      setError("Please enter a valid email address.");

      return;
    }
    if (phone.replace(/\D/g, "").length < 6) {
      setError("Please enter a valid phone number.");

      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result = await submitShowSignUp({
        slug: show.slug,
        fullName,
        email,
        phoneCountry: country,
        phone,
      });

      if (result.ok) setSubmitted(true);
      else setError(result.error);
    } catch {
      setError("We couldn't save your sign-up. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const shareText = `I just signed up for Dr. Hilary Okello's Hilarious show in ${city}! Join me: https://www.hilaryokello.com/shows/${show.slug}/sign-up`;

    return (
      <div
        className="flex flex-col items-center py-4 text-center"
        role="status"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg shadow-yellow-500/30">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>
        <h2 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">
          You&apos;re on the list!
        </h2>
        <p className="mt-3 max-w-sm text-ink/65">
          We&apos;ll reach out at{" "}
          <span className="font-semibold text-ink">{email.trim()}</span> the
          moment tickets for {city} go on sale.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-bold text-white transition-colors hover:bg-green-600"
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Share on WhatsApp
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink/5 px-6 py-3 font-bold text-ink ring-1 ring-ink/10 transition-colors hover:bg-ink/10"
            href="/#shows"
          >
            See all shows
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
        Be first in line
      </h2>
      <p className="mt-2 text-ink/65">
        Tickets for {city} aren&apos;t on sale yet. Leave your details and
        we&apos;ll tell you the moment they drop.
      </p>

      <ul className="mt-5 space-y-2 text-sm text-ink/75">
        <li className="flex items-center gap-2.5">
          <BellRing className="h-4 w-4 shrink-0 text-yellow-500" />
          Early notice when tickets go on sale
        </li>
        <li className="flex items-center gap-2.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-yellow-500" />
          Only messages about this show, no spam
        </li>
      </ul>

      <form
        noValidate
        aria-label={`Sign up for ${show.title}`}
        className="mt-8 space-y-5"
        onSubmit={onSubmit}
      >
        <label className="block">
          <span className={labelClass}>Full name</span>
          <span className="relative block">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              required
              autoComplete="name"
              className={`${fieldClass} pl-11 pr-4`}
              name="fullName"
              placeholder="e.g. Jane Akello"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </span>
        </label>

        <label className="block">
          <span className={labelClass}>Email</span>
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              required
              autoComplete="email"
              className={`${fieldClass} pl-11 pr-4`}
              name="email"
              placeholder="jane@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
        </label>

        <div className="flex gap-3">
          <label className="block w-28 shrink-0">
            <span className={labelClass}>Country code</span>
            <span className="relative block">
              <select
                className={`${fieldClass} appearance-none pl-4 pr-9`}
                name="countryCode"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
            <span className={labelClass}>Phone number</span>
            <span className="relative block">
              <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
              <input
                required
                autoComplete="tel-national"
                className={`${fieldClass} pl-11 pr-4`}
                inputMode="tel"
                name="phone"
                placeholder="712345678"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </span>
          </label>
        </div>

        {error && (
          <p
            aria-live="polite"
            className="rounded-xl bg-red/10 px-4 py-3 text-sm font-medium text-red-dark"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-yellow-500 px-8 text-base font-bold text-white shadow-lg shadow-yellow-500/25 transition-all hover:bg-yellow-600 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
          disabled={submitting}
          type="submit"
        >
          {submitting ? (
            <>
              Signing you up…
              <Loader2 className="h-5 w-5 animate-spin" />
            </>
          ) : (
            <>
              Sign Up Now
              <UserPlus className="h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
