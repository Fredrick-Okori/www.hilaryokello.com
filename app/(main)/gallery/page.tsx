import { Metadata } from "next";

import Gallery from "./parts/gallery";

export const metadata: Metadata = {
  title: "Gallery | Dr. Hilary Okello - Uganda's Top Comedian",
  keywords:
    "Hilary Okello gallery, comedy photos Uganda, stand-up comedy pictures, Dr. Hilary Okello stage shots, Gulu comedy gallery, behind the scenes comedy, African comedians gallery, Uganda comedy events, live comedy show pictures",
  description:
    "Browse the official photo gallery of Dr. Hilary Okello, one of Uganda's top comedians. View stunning stage moments, behind-the-scenes laughter, and highlights from live comedy shows across Uganda.",
};

export default function GalleryPage() {
  return (
    <div>
      <Gallery />
    </div>
  );
}
