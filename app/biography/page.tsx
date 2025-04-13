// app/comedian-bio/page.tsx (Server Component)

import ComedianBio from "./parts/biography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biography | Dr. Hilary Okello - Uganda's Top Stand-Up Comedian",
  keywords:
    "Dr. Hilary Okello, Hilary Okello biography, Ugandan comedian bio, stand-up comedian Uganda, African comedy, Gulu comedian, Ugandan entertainers, comedy career Uganda, top African comedians, comedian profiles Uganda",
  description:
    "Learn more about Dr. Hilary Okello, Uganda's top comedian known for his sharp wit, medical background, and unique storytelling style. Discover his journey from Gulu to the comedy spotlight across Africa.",
};

export default function BiographyPage() {
  return <ComedianBio />;
}
