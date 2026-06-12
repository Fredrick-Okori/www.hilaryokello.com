"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2, RotateCcw, FileDown } from "lucide-react";

import { supabase } from "@/lib/supabase";

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

export default function AdminWaitinglistPage() {
  const [entries, setEntries] = useState<WaitingListEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchEntries() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("waiting_list_entries")
      .select("*")
      .order("created_at", { ascending: false });

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
      startY: 22,
      head: [["Show", "Username", "Phone", "Email", "Tickets", "Date"]],
      body: entries.map((e) => [
        e.show_title,
        e.username,
        e.phone,
        e.email,
        String(e.tickets ?? 1),
        new Date(e.created_at).toLocaleString(),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [234, 179, 8] },
    });

    doc.save("waiting-list.pdf");
  }

  async function handleDelete(id: string) {
    const ok = window.confirm("Delete this waiting list entry?");

    if (!ok) return;

    await supabase.from("waiting_list_entries").delete().eq("id", id);
    fetchEntries();
  }

  const grouped = useMemo(() => {
    const m = new Map<string, WaitingListEntry[]>();

    for (const e of entries) {
      const key = e.show_slug;

      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(e);
    }

    return Array.from(m.entries()).map(([show_slug, list]) => ({
      show_slug,
      show_title: list[0]?.show_title ?? show_slug,
      list,
    }));
  }, [entries]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Waitinglist</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Users who joined the show waiting list
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors"
            disabled={loading}
            onClick={fetchEntries}
          >
            <RotateCcw size={16} /> Refresh
          </button>
          <button
            className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition-colors disabled:opacity-50"
            disabled={loading || entries.length === 0}
            onClick={handleExportPdf}
          >
            <FileDown size={16} /> Export PDF
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-500 text-sm">Loading…</p>
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : entries.length === 0 ? (
        <p className="text-zinc-500 text-sm">No waiting list entries yet.</p>
      ) : (
        <div className="space-y-6">
          {grouped.map((g) => (
            <section key={g.show_slug} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-yellow-400">
                {g.show_title}
              </h3>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="grid grid-cols-12 gap-0 border-b border-zinc-800 bg-zinc-950 px-4 py-3 text-xs font-semibold text-zinc-400">
                  <div className="col-span-3">Username</div>
                  <div className="col-span-3">Phone</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-1 text-center">Tickets</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                <div className="divide-y divide-zinc-800">
                  {g.list.map((e) => (
                    <div
                      key={e.id}
                      className="grid grid-cols-12 gap-0 px-4 py-4 text-sm items-center"
                    >
                      <div className="col-span-3">
                        <div className="font-semibold text-white">
                          {e.username}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {new Date(e.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="col-span-3 text-zinc-200">{e.phone}</div>
                      <div className="col-span-3 text-zinc-200">{e.email}</div>
                      <div className="col-span-1 text-center text-zinc-200">
                        {e.tickets ?? 1}
                      </div>
                      <div className="col-span-2 text-right">
                        <button
                          className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-zinc-800 text-zinc-300 hover:text-red-400 transition-colors"
                          title="Delete"
                          onClick={() => handleDelete(e.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
