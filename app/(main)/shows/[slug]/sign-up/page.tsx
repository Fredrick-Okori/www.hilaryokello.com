import { Metadata } from "next";

import ShowSignUp from "./show-sign-up";

import { getShowBySlug } from "@/lib/shows";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = getShowBySlug(slug);

  return {
    title: show
      ? `Sign Up — ${show.title} — Dr. Hilary Okello`
      : "Sign Up for a Show — Dr. Hilary Okello",
    description: show
      ? `Sign up to be the first to know when tickets for ${show.title} in ${show.city}, ${show.country} go on sale.`
      : "Sign up to be the first to know when tickets go on sale.",
  };
}

export default async function ShowSignUpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Shows hard-coded in lib/shows.ts resolve here; shows added from the admin
  // live in Supabase and are looked up on the client.
  return <ShowSignUp initialShow={getShowBySlug(slug) ?? null} slug={slug} />;
}
