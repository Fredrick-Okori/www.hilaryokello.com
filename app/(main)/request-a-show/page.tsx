import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ShowRequestForm } from "@/components/show-request-form";

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
          Want me to perform in your city? Fill out the form below and I&apos;ll
          see what I can do!
        </p>
        <div className="mt-8">
          <ShowRequestForm />
        </div>
      </div>
    </section>
  );
}
