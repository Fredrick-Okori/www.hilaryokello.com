"use client";

import { useCallback } from "react";

// Invisible, score-based reCAPTCHA (Google Cloud / Enterprise JS API).
// Tokens are verified server-side in lib/recaptcha.ts.

type Grecaptcha = {
  enterprise: {
    ready: (cb: () => void) => void;
    execute: (siteKey: string, opts: { action: string }) => Promise<string>;
  };
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const SCRIPT_ID = "recaptcha-enterprise";

function loadScript(): Promise<Grecaptcha> {
  return new Promise((resolve, reject) => {
    const ready = () =>
      window.grecaptcha!.enterprise.ready(() => resolve(window.grecaptcha!));

    if (window.grecaptcha?.enterprise) return ready();

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(SITE_KEY)}`;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", ready, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("reCAPTCHA failed to load")),
      {
        once: true,
      },
    );
  });
}

let scriptPromise: Promise<Grecaptcha> | null = null;

function getGrecaptcha(): Promise<Grecaptcha> {
  scriptPromise ??= loadScript().catch((err) => {
    scriptPromise = null; // allow a retry on the next submit

    throw err;
  });

  return scriptPromise;
}

export function useRecaptcha() {
  // Load Google's script on first interaction with the form (onFocus), not
  // on page load, so pages with a form below the fold stay light.
  const preload = useCallback(() => {
    if (SITE_KEY) getGrecaptcha().catch(() => {});
  }, []);

  // Resolves to "" when no site key is configured (local development).
  const getToken = useCallback(async (action: string): Promise<string> => {
    if (!SITE_KEY) return "";
    const grecaptcha = await getGrecaptcha();

    return grecaptcha.enterprise.execute(SITE_KEY, { action });
  }, []);

  return { preload, getToken };
}
