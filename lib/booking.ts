// Booking enquiry options, shared by the public form, the server action and
// the admin.

export const BOOKING_EVENT_TYPES = [
  "Corporate events",
  "Private functions",
  "Festivals & tours",
  "Other",
];

export const BOOKING_AUDIENCE_SIZES = [
  "Under 100",
  "100 – 500",
  "500 – 1,000",
  "1,000 – 5,000",
  "5,000+",
];

export const BOOKING_STATUSES = [
  "new",
  "contacted",
  "confirmed",
  "declined",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];
