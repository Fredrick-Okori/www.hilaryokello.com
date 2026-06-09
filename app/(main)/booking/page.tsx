import BookingPage from "./parts/contact";

import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Booking | Dr. Hilary Okello - Uganda's Top Stand-Up Comedian",
  keywords:
    "Dr. Hilary Okello, Hilary Okello booking, Ugandan comedian booking, stand-up comedian Uganda Booking, African comedy,  Ugandan entertainers, comedy career Uganda, top African comedians, comedian profiles Uganda",
  description:
    "Learn more about Dr. Hilary Okello, Uganda's top comedian known for his sharp wit, medical background, and unique storytelling style. Discover his journey from   comedy spotlight across Africa.",
};
export default function Booking() {
  return(
    <>
    <BookingPage/>
    </>
  )
}