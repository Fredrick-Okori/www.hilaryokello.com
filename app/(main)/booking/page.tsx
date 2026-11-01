import { Metadata } from "next";

import BookingPage from "./parts/contact";

export const metadata: Metadata = {
  title: "Booking",
  alternates: { canonical: "/booking" },
  keywords:
    "Dr. Hilary Okello, Hilary Okello booking, Ugandan comedian booking, stand-up comedian Uganda Booking, African comedy,  Ugandan entertainers, comedy career Uganda, top African comedians, comedian profiles Uganda",
  description:
    "Book Dr. Hilary Okello, Uganda's top stand-up comedian, for corporate events, private functions, festivals and international tours. Send your enquiry on WhatsApp.",
};
export default function Booking() {
  return (
    <>
      <BookingPage />
    </>
  );
}
