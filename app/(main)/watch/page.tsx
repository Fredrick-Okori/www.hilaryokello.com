import React from "react";

import { VideoSection } from "@/components/videos";

export default function Page() {
  return (
    <>
      {/* Video Section */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <VideoSection title="Featured Videos" />
        </div>
      </div>
    </>
  );
}
