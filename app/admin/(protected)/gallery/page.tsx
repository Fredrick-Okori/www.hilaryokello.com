"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, X, Check } from "lucide-react";
import Image from "next/image";

type GalleryImage = {
  id: string;
  url: string;
  caption: string | null;
  category: string | null;
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ url: "", caption: "", category: "" });

  async function fetchImages() {
    setLoading(true);
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    setImages(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchImages(); }, []);

  async function handleAdd() {
    await supabase.from("gallery").insert([form]);
    setForm({ url: "", caption: "", category: "" });
    setAdding(false);
    fetchImages();
  }

  async function handleDelete(id: string) {
    await supabase.from("gallery").delete().eq("id", id);
    fetchImages();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gallery</h2>
          <p className="text-sm text-zinc-400 mt-1">Manage photo gallery images</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors"
        >
          <Plus size={16} /> Add Image
        </button>
      </div>

      {adding && (
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 space-y-3">
          <p className="text-sm font-semibold text-yellow-400">New Image</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(["url", "caption", "category"] as const).map((key) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs text-zinc-400 capitalize">{key === "url" ? "Image URL" : key}</label>
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="flex items-center gap-1.5 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300">
              <Check size={14} /> Save
            </button>
            <button onClick={() => setAdding(false)} className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-white">
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-zinc-500 text-sm">Loading…</p>
      ) : images.length === 0 ? (
        <p className="text-zinc-500 text-sm">No images found. Add your first image above.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-square">
              <Image
                src={img.url}
                alt={img.caption ?? "Gallery image"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                {img.caption && <p className="text-xs text-center text-white">{img.caption}</p>}
                <button
                  onClick={() => handleDelete(img.id)}
                  className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-400"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
