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
  badge?: string;
  soldOutPercentage?: number;
  soldOutLabel?: string;
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
    id: 18,
    title: "Kampala | The Laughing Debate",
    dateLabel: "May 21, 2026",
    date: "2026-05-21T19:30:00",
    time: "7:30 PM",
    location: "Infinity Cafe & Lounge (Capital Shoppers)",
    city: "Thursday | Kampala",
    country: "Uganda",
    ticketPrice: "25K",
    image: "/tour/laugh_maraboustork.jpg",
    link: "https://karitickets.com/event/THE_LAUGHING_DEBATE",
    description:
      "The Laughing Debate lands at Infinity Cafe & Lounge inside Capital Shoppers! A night of sharp comedy, bold opinions, and laughs that hit different. Join Dr. Hilary Okello for an unmissable Thursday evening in Kampala.",
    featured: false,
    badge: "Tickets Available",
    contactNumber: "+256784704143",
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
    link: "https://www.quicket.co.za/events/355018-dr-hilary-okello-jokes-from-far-away-cape-town/#/",
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
    link: "https://m.mojaticket.com/#/event/19090",
    description:
      "The Kingdom of Eswatini, welcome! Jokes From Far Away makes a royal stop in Mbabane as Dr. Hilary Okello brings fresh, cross-continental comedy to the Mbabane Theatre Club. Expect hilarious stories from the road, sharp cultural observations, and a night of laughter that's fit for a kingdom.",
    featured: false,
    contactNumber: "+27637677212",
  },
  {
    id: 20,
    title: "Francistown | Dr. Hilary Okello Live",
    dateLabel: "Jun 5, 2026",
    date: "2026-06-05T19:00:00",
    time: "7:00 PM",
    location: "Cresta Marang Gardens",
    city: "Friday | Francistown",
    country: "Botswana",
    ticketPrice: "Single: P150 | Double: P200",
    image: "/tour/francistown.avif",
    link: "https://www.webtickets.co.bw/v2/event.aspx?itemid=6186516",
    description:
      "Dr. Hilary Okello Live comes to Francistown! Join Africa's Doctor of Comedy for a spectacular night of laughter at the beautiful Cresta Marang Gardens. Grab a single or bring a friend on a double ticket.",
    featured: false,
    contactNumber: "+27637677212",
  },
  {
    id: 19,
    title: "Gaborone | Dr. Hilary Okello Live",
    dateLabel: "Jun 4, 2026",
    date: "2026-06-04T19:00:00",
    time: "7:00 PM",
    location: "Nuestra Casa Molapo Crossing",
    city: "Thursday | Gaborone",
    country: "Botswana",
    ticketPrice: "Single: P200 | Double: P300",
    image: "/tour/gaborone_converted.avif",
    link: "https://www.webtickets.co.bw/v2/event.aspx?itemid=6186508",
    description:
      "Dr. Hilary Okello Live lands in Gaborone! An unforgettable night of world-class comedy at Nuestra Casa, Molapo Crossing. Single and double tickets available — bring a friend and double the laughs.",
    featured: false,
    contactNumber: "+27637677212",
  },
  {
    id: 17,
    title: "Windhoek | Jokes From Far Away",
    dateLabel: "Jun 3, 2026",
    date: "2026-06-03T19:00:00",
    time: "7:30 PM",
    location: "Ster Kinekor Grove Mall",
    city: "Wednesday | Windhoek",
    country: "Namibia",
    ticketPrice: "N$300",
    image: "/tour/DR-OKELLO-LIVE-IN-Namibia.avif",
    link: "#",
    description:
      "Jokes From Far Away touches down in Namibia! Dr. Hilary Okello brings his acclaimed comedy tour to Windhoek for a night of sharp wit and hilarious African storytelling at Ster Kinekor Grove Mall.",
    featured: false,
    contactNumber: "+264811563577",
  },
  {
    id: 14,
    title: "Johannesburg | Jokes From Far Away",
    dateLabel: "May 29, 2026",
    date: "2026-05-29T19:00:00",
    time: "7:30 PM",
    location: "Victory Theatre",
    city: "Friday | Johannesburg",
    country: "South Africa",
    ticketPrice: "Early Bird: R250 | Standard: R300 | VIP: R600",
    image: "/tour/johannesburg.avif",
    link: "https://www.quicket.co.za/events/368566-dr-hilary-okello-jokes-from-far-away-johannesburg/",
    description:
      "Johannesburg, the City of Gold — get ready for a night of pure comedy gold! Dr. Hilary Okello brings Jokes From Far Away to Joburg, performing at the Victory Theatre. From Kampala to Joburg, the jokes travel far and hit hard. This is African comedy at its sharpest — don't miss it.",
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
