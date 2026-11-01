import React from "react";
import { Metadata } from "next";

import { VideoSection } from "@/components/videos";

export const metadata: Metadata = {
  title: "Watch & Listen",
  description:
    "Stand-up specials and clips from Dr. Hilary Okello, Uganda's top comedian and Africa's Doctor of Comedy.",
  alternates: { canonical: "/watch" },
};

export default function Page() {
  return (
    <>
      {/* Video Section */}
      <div className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <VideoSection headingLevel="h1" title="Watch & Listen" />
        </div>
      </div>
    </>
  );
}
