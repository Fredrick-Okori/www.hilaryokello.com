"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const GA_ID = "G-36J4TDZWT9";
const STORAGE_KEY = "cookie-consent";
const OPEN_EVENT = "open-cookie-settings";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);

    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

// Lets the privacy page reopen the banner.
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

// Google Analytics loads only after the visitor accepts (Consent Mode v2,
// ads signals always denied). Vercel Analytics is cookieless and unaffected.
export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readChoice();

    setChoice(saved);
    setOpen(saved === null);

    const reopen = () => setOpen(true);

    window.addEventListener(OPEN_EVENT, reopen);

    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function decide(next: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode: the choice lasts for this page view only.
    }
    if (next === "denied") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      // Remove cookies GA already set on this domain.
      for (const name of document.cookie
        .split(/;\s*/)
        .map((c) => c.split("=")[0])) {
        if (name.startsWith("_ga")) {
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
          document.cookie = `${name}=; Max-Age=0; path=/`;
        }
      }
    }
    setChoice(next);
    setOpen(false);
  }

  return (
    <>
      {choice === "granted" && (
        <>
          <Script id="ga-consent" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'granted'
});
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
        </>
      )}

      {open && (
        <div
          aria-label="Cookie choice"
          className="fixed inset-x-4 bottom-24 z-[60] rounded-2xl border border-ink/10 bg-cream p-5 text-ink shadow-2xl shadow-ink/20 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm"
          role="dialog"
        >
          <p className="text-sm leading-relaxed text-ink/75">
            We&apos;d like to use Google Analytics cookies to see which pages
            people visit. Nothing is set unless you accept.{" "}
            <Link
              className="font-semibold text-[#391314] underline underline-offset-2"
              href="/privacy"
            >
              Privacy policy
            </Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button
              className="h-10 flex-1 rounded-full bg-[#391314] px-4 text-sm font-bold text-cream transition-colors hover:bg-yellow-500"
              type="button"
              onClick={() => decide("granted")}
            >
              Accept
            </button>
            <button
              className="h-10 flex-1 rounded-full border border-ink/15 px-4 text-sm font-bold text-ink transition-colors hover:bg-ink/5"
              type="button"
              onClick={() => decide("denied")}
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
