import { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Request a Show",
    template: `%s - ${siteConfig.name}`,
  },
  description: "Want me to perform in your city? Let me know!",
};

export default function RequestAShowPage() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-4xl font-bold">Request a Show</h1>
        <p className="mt-4 text-lg">
          Want me to perform in your city? Use the Google form below to submit
          your request.
        </p>
        <div className="mt-8">
          <iframe
            className="w-full min-h-[800px] rounded-xl border border-white/10"
            loading="lazy"
            src="https://docs.google.com/forms/d/e/REPLACE_WITH_YOUR_FORM_ID/viewform?embedded=true"
            title="Request a show form"
          />
        </div>
      </div>
    </section>
  );
}
