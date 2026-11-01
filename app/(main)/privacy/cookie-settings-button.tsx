"use client";

import { openCookieSettings } from "@/components/cookie-consent";

export function CookieSettingsButton() {
  return (
    <button
      className="font-semibold text-[#391314] underline underline-offset-2"
      type="button"
      onClick={openCookieSettings}
    >
      Change your cookie choice
    </button>
  );
}
