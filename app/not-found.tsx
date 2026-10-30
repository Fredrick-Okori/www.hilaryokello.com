import React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="max-w-4xl w-full space-y-6 p-8 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-5xl font-bold text-ink">Oops! Page Not Found</h1>

        <p className="text-md text-ink/70">
          It looks like you&apos;ve stumbled into a dead page that doesn&apos;t
          exist. Don&apos;t frown, though! You can still have a laugh and return
          to the homepage.
        </p>

        <div className="flex justify-center mt-4">
          <Link href="/">
            <Button
              className="text-sm font-medium text-ink bg-cream hover:bg-white hover:text-black flex items-center justify-center"
              size="lg"
              variant="bordered"
            >
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
