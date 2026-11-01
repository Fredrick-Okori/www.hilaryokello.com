import { Metadata } from "next";

import ShowSignUp from "./show-sign-up";

import { signUpPath } from "@/lib/shows";
import {
  SITE_URL,
  findShow,
  isStaticShow,
  jsonLdScript,
  showEventJsonLd,
} from "@/lib/shows-server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = await findShow(slug);

  return {
    title: show
      ? `Sign Up: ${show.city}, ${show.dateLabel}`
      : "Sign Up for a Show",
    description: show
      ? `Sign up to be the first to know when tickets for ${show.title} in ${show.city}, ${show.country} go on sale.`
      : "Sign up to be the first to know when tickets go on sale.",
    alternates: { canonical: signUpPath(slug) },
  };
}

export default async function ShowSignUpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = await findShow(slug);

  return (
    <>
      {/* Hard-coded shows carry their event data on the detail page; this
          is the only page for shows added from the admin. */}
      {show && !isStaticShow(slug) && (
        <script
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(
              showEventJsonLd(show, `${SITE_URL}${signUpPath(slug)}`),
            ),
          }}
          type="application/ld+json"
        />
      )}
      {/* Found on the server, so the page (and its h1) renders complete; the
          client lookup is only a fallback. */}
      <ShowSignUp initialShow={show ?? null} slug={slug} />
    </>
  );
}
