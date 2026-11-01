"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Mail,
  MapPin,
  RotateCcw,
  Trash2,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { supabase } from "@/lib/supabase";
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/booking";

type BookingRequest = {
  id: string;
  name: string;
  organisation: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string | null;
  location: string;
  audience: string;
  details: string;
  status: BookingStatus;
  whatsapp_status: string;
  created_at: string;
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  new: "bg-yellow-500/10 text-yellow-600 ring-yellow-500/20",
  contacted: "bg-blue-500/10 text-blue-700 ring-blue-500/20",
  confirmed: "bg-green-500/10 text-green-700 ring-green-500/20",
  declined: "bg-ink/5 text-ink/50 ring-ink/10",
};

function formatDate(iso: string | null): string {
  if (!iso) return "Date flexible";

  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function whatsAppLabel(status: string): { text: string; className: string } {
  if (status === "sent")
    return { text: "Confirmation sent", className: "text-green-700" };
  if (status === "not_configured")
    return { text: "Confirmation not set up", className: "text-ink/45" };
  if (status.startsWith("failed"))
    return { text: "Confirmation failed", className: "text-red-600" };

  return { text: "", className: "" };
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<BookingStatus | "">("");

  async function fetchBookings() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(
        error.code === "42P01" ||
          /does not exist|schema cache/i.test(error.message)
          ? "The booking_requests table doesn't exist yet. Run supabase/schema.sql in the Supabase SQL editor."
          : error.message,
      );
      setBookings([]);
    } else {
      setBookings((data ?? []) as BookingRequest[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function updateStatus(id: string, status: BookingStatus) {
    setBookings((list) =>
      list.map((b) => (b.id === id ? { ...b, status } : b)),
    );
    const { error } = await supabase
      .from("booking_requests")
      .update({ status })
      .eq("id", id);

    if (error) fetchBookings();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this booking request?")) return;
    await supabase.from("booking_requests").delete().eq("id", id);
    fetchBookings();
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = {};

    for (const b of bookings) c[b.status] = (c[b.status] ?? 0) + 1;

    return c;
  }, [bookings]);

  const visible = filter
    ? bookings.filter((b) => b.status === filter)
    : bookings;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink">Bookings</h2>
          <p className="mt-1 text-sm text-ink/60">
            Booking requests sent from the website&apos;s Book page
          </p>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink/85 transition-colors hover:bg-ink/5"
          disabled={loading}
          onClick={fetchBookings}
        >
          <RotateCcw size={16} /> Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["", ...BOOKING_STATUSES] as const).map((s) => (
          <button
            key={s || "all"}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold capitalize ring-1 transition-colors ${
              filter === s
                ? "bg-ink text-white ring-ink"
                : "bg-white text-ink/70 ring-ink/10 hover:text-ink"
            }`}
            onClick={() => setFilter(s)}
          >
            {s || "All"}{" "}
            <span className="opacity-60">
              {s ? (counts[s] ?? 0) : bookings.length}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-ink/50">Loading…</p>
      ) : error ? (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : visible.length === 0 ? (
        <p className="text-sm text-ink/50">
          {bookings.length === 0
            ? "No booking requests yet."
            : "No bookings with this status."}
        </p>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {visible.map((b) => {
            const wa = whatsAppLabel(b.whatsapp_status);

            return (
              <article
                key={b.id}
                className="flex flex-col rounded-xl border border-ink/10 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-ink">
                      {b.name}
                    </h3>
                    <p className="text-sm text-ink/55">
                      {b.organisation || "Individual"} · {b.event_type}
                    </p>
                  </div>
                  <span className="relative shrink-0">
                    <select
                      aria-label="Status"
                      className={`appearance-none rounded-full py-1 pl-3 pr-7 text-xs font-bold capitalize ring-1 focus:outline-none ${STATUS_STYLES[b.status] ?? STATUS_STYLES.new}`}
                      value={b.status}
                      onChange={(e) =>
                        updateStatus(b.id, e.target.value as BookingStatus)
                      }
                    >
                      {BOOKING_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 opacity-60" />
                  </span>
                </div>

                <dl className="mt-4 grid gap-2 text-sm text-ink/75 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 shrink-0 text-yellow-500" />
                    <dt className="sr-only">Date</dt>
                    <dd>{formatDate(b.event_date)}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-yellow-500" />
                    <dt className="sr-only">Location</dt>
                    <dd className="truncate">{b.location}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0 text-yellow-500" />
                    <dt className="sr-only">Audience</dt>
                    <dd>{b.audience || "Audience not given"}</dd>
                  </div>
                  {b.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-yellow-500" />
                      <dt className="sr-only">Email</dt>
                      <dd className="truncate">
                        <a
                          className="hover:underline"
                          href={`mailto:${b.email}`}
                        >
                          {b.email}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                {b.details && (
                  <p className="mt-4 whitespace-pre-line rounded-lg bg-cream px-4 py-3 text-sm text-ink/80">
                    {b.details}
                  </p>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                  <div className="text-xs text-ink/45">
                    Received {new Date(b.created_at).toLocaleString()}
                    {wa.text && (
                      <span
                        className={`ml-2 font-semibold ${wa.className}`}
                        title={b.whatsapp_status}
                      >
                        · {wa.text}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                      href={`https://wa.me/${b.phone.replace(/\D/g, "")}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <FaWhatsapp size={15} /> {b.phone}
                    </a>
                    <button
                      className="rounded-lg p-2 text-ink/60 transition-colors hover:bg-ink/5 hover:text-red-600"
                      title="Delete"
                      onClick={() => handleDelete(b.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
