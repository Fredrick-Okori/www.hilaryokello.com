"use client";

/*
  Requires a `merchandise` table in Supabase:

  create table merchandise (
    id          uuid default gen_random_uuid() primary key,
    name        text not null,
    slug        text not null unique,
    description text,
    price       text,
    category    text,
    sizes       text[],
    badge       text,
    image       text,
    published   boolean default false,
    published_at timestamptz,
    created_at  timestamptz default now()
  );
*/

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, Globe, EyeOff, Pencil, Plus, Trash2, X } from "lucide-react";

import { supabase } from "@/lib/supabase";

type Merch = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  sizes: string[];
  badge: string | null;
  image: string;
  published: boolean;
  published_at: string | null;
};

type MerchDraft = Omit<Merch, "id" | "published" | "published_at">;

const CATEGORIES = ["T-Shirts", "Hoodies", "Hats", "Accessories"];

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const emptyDraft: MerchDraft = {
  name: "",
  slug: "",
  description: "",
  price: "",
  category: "T-Shirts",
  sizes: [],
  badge: "",
  image: "",
};

export default function AdminStorePage() {
  const [items, setItems] = useState<Merch[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MerchDraft>(emptyDraft);

  async function fetchItems() {
    setLoading(true);
    const { data } = await supabase
      .from("merchandise")
      .select("*")
      .order("created_at", { ascending: false });

    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleAdd() {
    const draft = { ...form, slug: form.slug || makeSlug(form.name) };

    await supabase.from("merchandise").insert([{ ...draft, published: false }]);
    setForm(emptyDraft);
    setAdding(false);
    fetchItems();
  }

  async function handleUpdate(id: string, updated: MerchDraft) {
    await supabase.from("merchandise").update(updated).eq("id", id);
    setEditingId(null);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    await supabase.from("merchandise").delete().eq("id", id);
    fetchItems();
  }

  async function handleTogglePublish(item: Merch) {
    const nowPublished = !item.published;

    await supabase
      .from("merchandise")
      .update({
        published: nowPublished,
        published_at: nowPublished ? new Date().toISOString() : null,
      })
      .eq("id", item.id);
    fetchItems();
  }

  const published = items.filter((i) => i.published);
  const drafts = items.filter((i) => !i.published);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Store</h2>
          <p className="text-sm text-zinc-400 mt-1">
            {published.length} published · {drafts.length} draft
          </p>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors"
          onClick={() => {
            setForm(emptyDraft);
            setAdding(true);
          }}
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 space-y-4">
          <p className="text-sm font-semibold text-yellow-400">
            New Merchandise
          </p>
          <MerchForm form={form} onChange={setForm} />
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
              onClick={handleAdd}
            >
              <Check size={14} /> Save as Draft
            </button>
            <button
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-white"
              onClick={() => setAdding(false)}
            >
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-zinc-500 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-zinc-500 text-sm">
          No merchandise yet. Add your first item above.
        </p>
      ) : (
        <div className="space-y-6">
          {published.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-green-400">
                Published ({published.length})
              </h3>
              {published.map((item) =>
                editingId === item.id ? (
                  <EditRow
                    key={item.id}
                    item={item}
                    onCancel={() => setEditingId(null)}
                    onSave={(u) => handleUpdate(item.id, u)}
                  />
                ) : (
                  <MerchRow
                    key={item.id}
                    item={item}
                    onDelete={() => handleDelete(item.id)}
                    onEdit={() => setEditingId(item.id)}
                    onTogglePublish={() => handleTogglePublish(item)}
                  />
                ),
              )}
            </section>
          )}

          {drafts.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Drafts ({drafts.length})
              </h3>
              {drafts.map((item) =>
                editingId === item.id ? (
                  <EditRow
                    key={item.id}
                    item={item}
                    onCancel={() => setEditingId(null)}
                    onSave={(u) => handleUpdate(item.id, u)}
                  />
                ) : (
                  <MerchRow
                    key={item.id}
                    item={item}
                    onDelete={() => handleDelete(item.id)}
                    onEdit={() => setEditingId(item.id)}
                    onTogglePublish={() => handleTogglePublish(item)}
                  />
                ),
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function MerchRow({
  item,
  onEdit,
  onDelete,
  onTogglePublish,
}: {
  item: Merch;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
      {/* Thumbnail */}
      {item.image ? (
        <div className="relative w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0">
          <Image
            fill
            alt={item.name}
            className="object-contain p-1"
            src={item.image}
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-lg bg-zinc-800 shrink-0" />
      )}

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-white truncate">
            {item.name}
          </p>
          {item.badge && (
            <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full font-medium shrink-0">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400 mt-0.5">
          {item.category} · {item.price} · {(item.sizes ?? []).join(", ")}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            item.published
              ? "bg-green-500/15 text-green-400 hover:bg-red-500/15 hover:text-red-400"
              : "bg-zinc-800 text-zinc-400 hover:bg-green-500/15 hover:text-green-400"
          }`}
          title={item.published ? "Unpublish" : "Publish to website"}
          onClick={onTogglePublish}
        >
          {item.published ? (
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
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-yellow-400 transition-colors"
          onClick={onEdit}
        >
          <Pencil size={15} />
        </button>
        <button
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
          onClick={onDelete}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

function EditRow({
  item,
  onSave,
  onCancel,
}: {
  item: Merch;
  onSave: (u: MerchDraft) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<MerchDraft>({
    name: item.name,
    slug: item.slug,
    description: item.description,
    price: item.price,
    category: item.category,
    sizes: item.sizes ?? [],
    badge: item.badge ?? "",
    image: item.image,
  });

  return (
    <div className="rounded-xl border border-yellow-400/40 bg-zinc-900 p-5 space-y-4">
      <MerchForm form={form} onChange={setForm} />
      <div className="flex gap-2">
        <button
          className="flex items-center gap-1.5 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
          onClick={() => onSave(form)}
        >
          <Check size={14} /> Save
        </button>
        <button
          className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-white"
          onClick={onCancel}
        >
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

function MerchForm({
  form,
  onChange,
}: {
  form: MerchDraft;
  onChange: (f: MerchDraft) => void;
}) {
  function field(key: keyof MerchDraft, label: string, type = "text") {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-400">{label}</label>
        <input
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-yellow-400 focus:outline-none"
          type={type}
          value={(form[key] ?? "") as string}
          onChange={(e) => onChange({ ...form, [key]: e.target.value })}
        />
      </div>
    );
  }

  const allSizes = ["S", "M", "L", "XL", "XXL", "ONE SIZE"];

  function toggleSize(size: string) {
    const current = form.sizes ?? [];
    const next = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];

    onChange({ ...form, sizes: next });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {field("name", "Name")}
        {field("slug", "Slug (auto-generated if blank)")}
        {field("price", "Price (e.g. UGX 65,000)")}

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-400">Category</label>
          <select
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-yellow-400 focus:outline-none"
            value={form.category}
            onChange={(e) => onChange({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {field("badge", "Badge (e.g. New, Limited Edition)")}
        {field("image", "Image path (e.g. /store/hoodie.png)")}
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-zinc-400">Sizes</label>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                (form.sizes ?? []).includes(size)
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
              }`}
              type="button"
              onClick={() => toggleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-400">Description</label>
        <textarea
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-yellow-400 focus:outline-none resize-y"
          rows={3}
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
        />
      </div>
    </div>
  );
}
