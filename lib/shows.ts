// Shared show data — single source of truth used by the listing and detail pages.

export interface Show {
  id: number;
  slug: string;
  title: string;
  dateLabel: string;
  date: string; // ISO string
  time: string;
  location: string;
  country: string;
  city: string;
  ticketPrice: string;
  image: string;
  link: string;
  description: string;
  featured: boolean;
  contactNumber?: string;
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeSlug(city: string, country: string, id: number): string {
  return `${toSlug(city)}-${toSlug(country)}-${id}`;
}

const RAW: Omit<Show, "slug">[] = [
  {
    id: 1,
    title: "Thursday | Lavington: Jokes From Far Away",
    dateLabel: "Apr 09, 2026",
    date: "2026-04-09T19:30:00",
    time: "7:30 PM",
    location: "Suave Kitchen & Social Club, Westlands",
    city: "Thursday - Nairobi",
    country: "Kenya",
    ticketPrice: "Early Bird - KES 1500 | Standard - KES 2000",
    image: "/tour/thursday_poster.webp",
    link: "https://standupcollective.co.ke/buytickets?event=WESTLANDS%20%3a%20JOKES%20FROM%20FAR%20AWAY%20-%20DR.%20Hilary%20Okello%20-%20Thursday",
    description:
      "Jokes From Far Away kicks off at Westlands. Dr. Hilary Okello brings his globally-travelled comedy to Kenya: sharp East African observations, outsider-insider storytelling, and a room full of laughter at Suave Kitchen & Social Club, Westlands. Get your early bird tickets before they're gone.",
    featured: true,
  },
  {
    id: 2,
    title: "Friday | Lavington: Jokes From Far Away",
    dateLabel: "Apr 10, 2026",
    date: "2026-04-10T19:30:00",
    time: "7:30 PM",
    location: "Levels Hotel, Kingara Rd",
    city: "Friday - Nairobi",
    country: "Kenya",
    ticketPrice: "Early Bird JFFA - KES 1500",
    image: "/tour/jffa_nairobi_kenya.jpg",
    link: "https://standupcollective.co.ke/buytickets?event=LAVINGTON%3a%20JOKES%20FROM%20FAR%20AWAY%20-%20DR.%20Hilary%20Okello%20-%20Friday",
    description:
      "Nairobi, Night 1 — Jokes From Far Away kicks off at Lavington's Levels Hotel. Dr. Hilary Okello brings his globally-travelled comedy to Kenya: sharp East African observations, outsider-insider storytelling, and a room full of laughter on Kingara Rd. Get your early bird tickets before they're gone.",
    featured: false,
  },
  {
    id: 3,
    title: "Saturday | Lavington: Jokes From Far Away",
    dateLabel: "Apr 11, 2026",
    date: "2026-04-11T19:30:00",
    time: "7:30 PM",
    location: "Levels Hotel, Kingara Rd",
    city: "Saturday - Nairobi",
    country: "Kenya",
    ticketPrice: "Early Bird JFFA - KES 1500",
    image: "/tour/jffa_nairobi_kenya.jpg",
    link: "https://standupcollective.co.ke/buytickets?event=LAVINGTON%3a%20JOKES%20FROM%20FAR%20AWAY%20-%20DR.%20Hilary%20Okello%20-%20Saturday",
    description:
      "Nairobi, Night 2 — the Saturday show at Levels Hotel in Lavington. If you missed Friday, this is your second chance. If you were there Friday, you already know why you're coming back. Dr. Hilary Okello closes out Nairobi with his best material — don't miss the finale.",
    featured: false,
  },
  {
    id: 4,
    title: "THURSDAY | Dar es Salaam: Jokes From Far Away",
    dateLabel: "Apr 16, 2026",
    date: "2026-04-16T20:00:00",
    time: "8:00 PM",
    location: "The Punchline Comedy Club",
    city: "Thursday - Dar es Salaam",
    country: "Tanzania",
    ticketPrice: "",
    image: "/tour/Dar _converted.avif",
    link: "#",
    description:
      "Jokes From Far Away rolls into Dar es Salaam! Dr. Hilary Okello takes the stage at The Punchline Comedy Club for a night of sharp wit and hilarious cross-continental stories. Contact us via WhatsApp to reserve your spot.",
    featured: false,
    contactNumber: "+255654035555",
  },
  {
    id: 5,
    title: "Saturday | Arusha: Jokes From Far Away",
    dateLabel: "Apr 18, 2026",
    date: "2026-04-18T20:00:00",
    time: "8:00 PM",
    location: "Twiga Brewery, Aim Mall Arusha",
    city: "Saturday - Arusha",
    country: "Tanzania",
    ticketPrice: "",
    image: "/tour/Arusha_converted.avif",
    link: "#",
    description:
      "Arusha, get ready! Jokes From Far Away continues its Tanzania leg at the Twiga Brewery in Aim Mall. Dr. Hilary Okello brings his signature blend of African storytelling and global comedy perspectives. Contact us via WhatsApp to reserve your seat.",
    featured: false,
    contactNumber: "+255621383543",
  },
  {
    id: 11,
    title: "Entebbe | Jokes From Far Away",
    dateLabel: "Apr 25, 2026",
    date: "2026-04-25T19:00:00",
    time: "7:30 PM",
    location: "Numax Cinemas",
    city: "Saturday | Entebbe",
    country: "Uganda",
    ticketPrice: "Early Bird: 30K | Gate: 50K",
    image: "/tour/Dr-Hilary-Okello-Entebbe_converted.avif",
    link: "https://kayetickets.com/events/hilary/checkout",
    description:
      "Before your next flight, there's comedy to catch. Jokes From Far Away lands at Numax Cinemas in Entebbe for one unmissable night of laughter. Dr. Hilary Okello performs right by the lake — a world-class show in the gateway city of Uganda.",
    featured: false,
  },
  {
    id: 12,
    title: "Cape Town | Jokes From Far Away",
    dateLabel: "May 30, 2026",
    date: "2026-05-30T19:00:00",
    time: "7:30 PM",
    location: "Homecoming Center",
    city: "Saturday | Cape Town",
    country: "South Africa",
    ticketPrice: "From R250",
    image: "/tour/capetown_south_africa.avif",
    link: "#",
    description:
      "Jokes From Far Away lands in the Mother City! Dr. Hilary Okello brings his continent-spanning comedy tour to Cape Town — sharp observations, bold African storytelling, and punchlines that travel as far as Table Mountain's shadow. An unmissable night of laughter at the Homecoming Centre.",
    featured: false,
    contactNumber: "+27637677212",
  },
  {
    id: 13,
    title: "Mbabane | Eswatini",
    dateLabel: "May 28, 2026",
    date: "2026-05-28T19:00:00",
    time: "7:30 PM",
    location: "Mbabane Theatre Club",
    city: "Thursday | Mbabane",
    country: "Eswatini",
    ticketPrice: "Early Bird: E100 | Standard: E200",
    image: "/tour/mbabane_eswatini.avif",
    link: "#",
    description:
      "The Kingdom of Eswatini, welcome! Jokes From Far Away makes a royal stop in Mbabane as Dr. Hilary Okello brings fresh, cross-continental comedy to the Mbabane Theatre Club. Expect hilarious stories from the road, sharp cultural observations, and a night of laughter that's fit for a kingdom.",
    featured: false,
    contactNumber: "+27637677212",
  },
  {
    id: 14,
    title: "Johannesburg | Jokes From Far Away",
    dateLabel: "May 29, 2026",
    date: "2026-05-29T19:00:00",
    time: "7:30 PM",
    location: "Ster Kinekor Mall of Africa",
    city: "Friday | Johannesburg",
    country: "South Africa",
    ticketPrice: "Early Bird: R250 | Standard: R300 | VIP: R600",
    image: "/tour/johannesburg.avif",
    link: "#",
    description:
      "Johannesburg, the City of Gold — get ready for a night of pure comedy gold! Dr. Hilary Okello brings Jokes From Far Away to Joburg, performing at the iconic Ster Kinekor Mall of Africa. From Kampala to Joburg, the jokes travel far and hit hard. This is African comedy at its sharpest — don't miss it.",
    featured: false,
    contactNumber: "+27637677212",
  },
];

export const SHOWS: Show[] = RAW.map((show) => ({
  ...show,
  slug: makeSlug(show.city, show.country, show.id),
}));

export function getShowBySlug(slug: string): Show | undefined {
  return SHOWS.find((s) => s.slug === slug);
}

export const DEFAULT_CONTACT = "+211922064459";
