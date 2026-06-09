"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Pencil, X, Check, Globe, EyeOff } from "lucide-react";

type Show = {
  id: string;
  title: string;
  date: string;
  time: string;
  city: string;
  location: string;
  country: string;
  ticket_price: string;
  ticket_url: string | null;
  image: string;
  description: string;
  featured: boolean;
  badge: string | null;
  contact_number: string | null;
  published: boolean;
  published_at: string | null;
};

type ShowDraft = Omit<Show, "id" | "published" | "published_at">;

const emptyDraft: ShowDraft = {
  title: "",
  date: "",
  time: "7:30 PM",
  city: "",
  location: "",
  country: "",
  ticket_price: "",
  ticket_url: "",
  image: "",
  description: "",
  featured: false,
  badge: "",
  contact_number: "",
};

export default function AdminShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ShowDraft>(emptyDraft);
  const [adding, setAdding] = useState(false);

  async function fetchShows() {
    setLoading(true);
    const { data } = await supabase
      .from("shows")
      .select("*")
      .order("date", { ascending: true });
    setShows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchShows();
  }, []);

  async function handleAdd() {
    await supabase.from("shows").insert([{ ...form, published: false }]);
    setForm(emptyDraft);
    setAdding(false);
    fetchShows();
  }

  async function handleUpdate(id: string, updated: ShowDraft) {
    await supabase.from("shows").update(updated).eq("id", id);
    setEditingId(null);
    fetchShows();
  }

  async function handleDelete(id: string) {
    await supabase.from("shows").delete().eq("id", id);
    fetchShows();
  }

  async function handleTogglePublish(show: Show) {
    const nowPublished = !show.published;
    await supabase
      .from("shows")
      .update({
        published: nowPublished,
        published_at: nowPublished ? new Date().toISOString() : null,
      })
      .eq("id", show.id);
    fetchShows();
  }

  const published = shows.filter((s) => s.published);
  const drafts = shows.filter((s) => !s.published);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Shows</h2>
          <p className="text-sm text-zinc-400 mt-1">
            {published.length} published · {drafts.length} draft
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors"
        >
          <Plus size={16} /> Add Show
        </button>
      </div>

      {adding && (
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 space-y-4">
          <p className="text-sm font-semibold text-yellow-400">New Show</p>
          <ShowForm form={form} onChange={setForm} />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
            >
              <Check size={14} /> Save as Draft
            </button>
            <button
              onClick={() => setAdding(false)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-white"
            >
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-zinc-500 text-sm">Loading…</p>
      ) : shows.length === 0 ? (
        <p className="text-zinc-500 text-sm">No shows yet. Add your first show above.</p>
      ) : (
        <div className="space-y-6">
          {/* Published */}
          {published.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-green-400">
                Published ({published.length})
              </h3>
              {published.map((show) =>
                editingId === show.id ? (
                  <EditRow
                    key={show.id}
                    show={show}
                    onSave={(u) => handleUpdate(show.id, u)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <ShowRow
                    key={show.id}
                    show={show}
                    onEdit={() => setEditingId(show.id)}
                    onDelete={() => handleDelete(show.id)}
                    onTogglePublish={() => handleTogglePublish(show)}
                  />
                )
              )}
            </section>
          )}

          {/* Drafts */}
          {drafts.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Drafts ({drafts.length})
              </h3>
              {drafts.map((show) =>
                editingId === show.id ? (
                  <EditRow
                    key={show.id}
                    show={show}
                    onSave={(u) => handleUpdate(show.id, u)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <ShowRow
                    key={show.id}
                    show={show}
                    onEdit={() => setEditingId(show.id)}
                    onDelete={() => handleDelete(show.id)}
                    onTogglePublish={() => handleTogglePublish(show)}
                  />
                )
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function ShowRow({
  show,
  onEdit,
  onDelete,
  onTogglePublish,
}: {
  show: Show;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white truncate">{show.title}</p>
          {show.featured && (
            <span className="shrink-0 text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400 mt-0.5">
          {show.date} · {show.time} · {show.city || show.location}, {show.country}
        </p>
        {show.published && show.published_at && (
          <p className="text-xs text-green-500 mt-0.5">
            Published {new Date(show.published_at).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onTogglePublish}
          title={show.published ? "Unpublish" : "Publish to website"}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            show.published
              ? "bg-green-500/15 text-green-400 hover:bg-red-500/15 hover:text-red-400"
              : "bg-zinc-800 text-zinc-400 hover:bg-green-500/15 hover:text-green-400"
          }`}
        >
          {show.published ? (
            <>
              <Globe size={13} /> Published
            </>
          ) : (
            <>
              <EyeOff size={13} /> Draft
            </>
          )}
        </button>
        <button
          onClick={onEdit}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-yellow-400 transition-colors"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

function EditRow({
  show,
  onSave,
  onCancel,
}: {
  show: Show;
  onSave: (u: ShowDraft) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ShowDraft>({
    title: show.title,
    date: show.date,
    time: show.time,
    city: show.city,
    location: show.location,
    country: show.country,
    ticket_price: show.ticket_price,
    ticket_url: show.ticket_url,
    image: show.image,
    description: show.description,
    featured: show.featured,
    badge: show.badge,
    contact_number: show.contact_number,
  });

  return (
    <div className="rounded-xl border border-yellow-400/40 bg-zinc-900 p-5 space-y-4">
      <ShowForm form={form} onChange={setForm} />
      <div className="flex gap-2">
        <button
          onClick={() => onSave(form)}
          className="flex items-center gap-1.5 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
        >
          <Check size={14} /> Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-white"
        >
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

function ShowForm({
  form,
  onChange,
}: {
  form: ShowDraft;
  onChange: (f: ShowDraft) => void;
}) {
  function text(key: keyof ShowDraft, label: string, type = "text") {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-400">{label}</label>
        <input
          type={type}
          value={(form[key] ?? "") as string}
          onChange={(e) => onChange({ ...form, [key]: e.target.value })}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-yellow-400 focus:outline-none"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {text("title", "Show Title")}
        {text("city", "City")}
        {text("country", "Country")}
        {text("date", "Date", "date")}
        {text("time", "Time (e.g. 7:30 PM)")}
        {text("location", "Venue")}
        {text("ticket_price", "Ticket Price (e.g. R250)")}
        {text("ticket_url", "Ticket URL")}
        {text("contact_number", "WhatsApp Contact")}
        {text("badge", "Badge text (optional, e.g. Selling Fast)")}
        {text("image", "Image path (e.g. /tour/image.avif)")}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-400">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
          rows={3}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-yellow-400 focus:outline-none resize-y"
        />
      </div>

      {/* Featured toggle */}
      <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => onChange({ ...form, featured: e.target.checked })}
          className="accent-yellow-400 w-4 h-4"
        />
        Mark as Featured Show
      </label>
    </div>
  );
}
