"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2, RotateCcw, FileDown } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { SHOWS, dbShowToShow, type DbShow } from "@/lib/shows";

type WaitingListEntry = {
  id: string;
  show_slug: string;
  show_title: string;
  username: string;
  phone: string;
  email: string;
  tickets: number;
  created_at: string;
};

type Row = WaitingListEntry & { city: string; country: string };

type Place = { city: string; country: string };

// Entries store the show's slug and a "Title — City, Country · Date" label,
// not city/country columns, so look the place up from the show itself and
// fall back to parsing the label for shows that have since been deleted.
function placeFor(entry: WaitingListEntry, bySlug: Map<string, Place>): Place {
  const known = bySlug.get(entry.show_slug);

  if (known) return known;
  const m = entry.show_title.match(/ — (.+), ([^,·]+?) · /);

  return m
    ? { city: m[1].trim(), country: m[2].trim() }
    : { city: "", country: "" };
}

const selectClass =
  "rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-yellow-400 focus:outline-none";

export default function AdminWaitinglistPage() {
  const [entries, setEntries] = useState<WaitingListEntry[]>([]);
  const [places, setPlaces] = useState<Map<string, Place>>(new Map());
  const [countryFilter, setCountryFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchEntries() {
    setLoading(true);
    setError(null);

    const [{ data, error }, { data: dbShows }] = await Promise.all([
      supabase
        .from("waiting_list_entries")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.from("shows").select("*"),
    ]);

    const bySlug = new Map<string, Place>();

    for (const show of [
      ...SHOWS,
      ...((dbShows ?? []) as DbShow[]).map(dbShowToShow),
    ]) {
      bySlug.set(show.slug, {
        city: show.city.trim(),
        country: show.country.trim(),
      });
    }
    setPlaces(bySlug);

    if (error) {
      setError(error.message);
      setEntries([]);
      setLoading(false);

      return;
    }

    setEntries((data ?? []) as WaitingListEntry[]);
    setLoading(false);
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  async function handleExportPdf() {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF({ orientation: "landscape" });

    doc.setFontSize(14);
    doc.text("Waiting List — Dr. Hilary Okello", 14, 16);

    autoTable(doc, {
      startY: cityFilter || countryFilter ? 28 : 22,
      head: [["Full name", "Phone", "Email", "City", "Country", "Signed up"]],
      body: filtered.map((e) => [
        e.username,
        e.phone,
        e.email,
        e.city,
        e.country,
        new Date(e.created_at).toLocaleString(),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [234, 179, 8] },
    });

    const scope = [cityFilter, countryFilter].filter(Boolean).join(", ");

    if (scope) doc.text(scope, 14, 22);
    doc.save(
      `waiting-list${scope ? `-${scope.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : ""}.pdf`,
    );
  }

  async function handleDelete(id: string) {
    const ok = window.confirm("Delete this waiting list entry?");

    if (!ok) return;

    await supabase.from("waiting_list_entries").delete().eq("id", id);
    fetchEntries();
  }

  const rows = useMemo<Row[]>(
    () => entries.map((e) => ({ ...e, ...placeFor(e, places) })),
    [entries, places],
  );

  const countries = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.country).filter(Boolean))).sort(),
    [rows],
  );

  // Cities narrow to the chosen country.
  const cities = useMemo(
    () =>
      Array.from(
        new Set(
          rows
            .filter((r) => !countryFilter || r.country === countryFilter)
            .map((r) => r.city)
            .filter(Boolean),
        ),
      ).sort(),
    [rows, countryFilter],
  );

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (!countryFilter || r.country === countryFilter) &&
          (!cityFilter || r.city === cityFilter),
      ),
    [rows, countryFilter, cityFilter],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink">Waitinglist</h2>
          <p className="text-sm text-ink/60 mt-1">
            Fans who signed up for shows whose tickets aren&apos;t out yet
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-lg border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink/85 hover:bg-ink/5 transition-colors"
            disabled={loading}
            onClick={fetchEntries}
          >
            <RotateCcw size={16} /> Refresh
          </button>
          <button
            className="flex items-center gap-2 rounded-lg border border-ink/15 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50"
            disabled={loading || filtered.length === 0}
            onClick={handleExportPdf}
          >
            <FileDown size={16} /> Export PDF
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading…</p>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : entries.length === 0 ? (
        <p className="text-ink/50 text-sm">No waiting list entries yet.</p>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-xs font-semibold text-ink/60">
              Country
              <select
                className={selectClass}
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setCityFilter("");
                }}
              >
                <option value="">All countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-semibold text-ink/60">
              City
              <select
                className={selectClass}
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option value="">All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            {(countryFilter || cityFilter) && (
              <button
                className="py-2 text-sm font-semibold text-yellow-500 hover:underline"
                onClick={() => {
                  setCountryFilter("");
                  setCityFilter("");
                }}
              >
                Clear filters
              </button>
            )}
            <p className="ml-auto py-2 text-sm text-ink/60">
              {filtered.length} sign-up{filtered.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-ink/10 bg-cream text-xs font-semibold text-ink/60">
                <tr>
                  <th className="px-4 py-3">Full name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-ink">{e.username}</div>
                      <div className="text-xs text-ink/50">
                        {new Date(e.created_at).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-ink/85">{e.phone}</td>
                    <td className="break-all px-4 py-4 text-ink/85">
                      {e.email}
                    </td>
                    <td className="px-4 py-4 text-ink/85">{e.city || "—"}</td>
                    <td className="px-4 py-4 text-ink/85">
                      {e.country || "—"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        className="inline-flex items-center justify-center rounded-lg p-2 text-ink/75 transition-colors hover:bg-ink/5 hover:text-red-600"
                        title="Delete"
                        onClick={() => handleDelete(e.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
