import { Metadata } from "next";
import Link from "next/link";

import { CookieSettingsButton } from "./cookie-settings-button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal information this website collects, why, how long it is kept and how to access or delete it.",
  alternates: { canonical: "/privacy" },
};

// The booking WhatsApp line; requests about personal data go here too.
const CONTACT_WHATSAPP = "+256 784 704143";
const CONTACT_WHATSAPP_URL = "https://wa.me/256784704143";
const LAST_UPDATED = "1 November 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink/75">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="bg-cream">
      <article className="mx-auto max-w-3xl px-4 pb-24 pt-40 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
          Last updated {LAST_UPDATED}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75">
          This policy explains what personal information this website collects,
          why, and what you can do about it. The site is run on behalf of Dr.
          Hilary Okello, who is responsible for the information described here.
        </p>

        <Section title="What we collect and why">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="text-ink">Show sign-ups.</strong> Your name,
              phone number, email and the show you picked, so we can tell you
              when tickets go on sale.
            </li>
            <li>
              <strong className="text-ink">City requests.</strong> Your name,
              phone number, email, city and country, so we can plan where the
              tour goes next and let you know if a show comes to your city.
            </li>
            <li>
              <strong className="text-ink">Booking requests.</strong> Your name,
              organisation, phone number, email and the event details you give
              us, so our booking team can reply and arrange the booking. We may
              send you a WhatsApp message confirming that we received your
              request.
            </li>
            <li>
              <strong className="text-ink">Chat.</strong> Messages you send
              through the chat window on the site, so we can answer them.
            </li>
            <li>
              <strong className="text-ink">Analytics.</strong> If you accept
              cookies, Google Analytics records which pages are visited and how
              people arrive at the site. We also use Vercel Analytics, which
              counts page views without cookies and without identifying you.
            </li>
          </ul>
          <p>
            We use this information only for the purposes above. We do not sell
            it, and we do not use it for advertising.
          </p>
        </Section>

        <Section title="Legal basis">
          <p>
            We process the details you send through our forms because you asked
            us to (to be notified, to request a city, or to book a show), and
            analytics cookies only with your consent. This follows the Uganda
            Data Protection and Privacy Act 2019 and, for visitors in the
            European Union or the United Kingdom, the GDPR and UK GDPR.
          </p>
        </Section>

        <Section title="Who handles it for us">
          <p>
            Information is stored with our database provider (Supabase), and the
            site is hosted by Vercel. Analytics are provided by Google (only
            with consent) and Vercel; WhatsApp messages are sent through
            WhatsApp Business (Meta). These providers process data on our behalf
            and may store it outside Uganda.
          </p>
          <p>
            Tickets are sold by independent ticketing platforms. When you buy a
            ticket there, their own privacy policy applies.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            Show sign-ups are kept until tickets for that show are on sale and
            the show has taken place. City requests are kept while we plan the
            tour. Booking requests are kept for as long as we need them to
            arrange and follow up on the event. After that, we delete them. You
            can ask us to delete your details sooner at any time.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            Google Analytics cookies (named <code>_ga</code>) are set only if
            you click Accept on the cookie banner. The site also stores your
            cookie choice in your browser so it doesn&apos;t ask again.
          </p>
          <p>
            <CookieSettingsButton />
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You can ask to see the personal information we hold about you, to
            correct it, to delete it, or to object to how we use it. You can
            also complain to the Personal Data Protection Office in Uganda (or
            your local data protection authority).
          </p>
        </Section>

        <Section title="Contact">
          <p>
            For any privacy request, message us on WhatsApp at{" "}
            <a
              className="font-semibold text-[#391314] underline underline-offset-2"
              href={CONTACT_WHATSAPP_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {CONTACT_WHATSAPP}
            </a>
            . We&apos;ll reply as soon as we can.
          </p>
          <p>
            <Link
              className="font-semibold text-[#391314] underline underline-offset-2"
              href="/"
            >
              Back to the home page
            </Link>
          </p>
        </Section>
      </article>
    </main>
  );
}
