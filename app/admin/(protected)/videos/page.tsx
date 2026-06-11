"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";

import { supabase } from "@/lib/supabase";

type VideoItem = {
  id: string;
  title: string;
  youtube_id: string;
  duration: string;
  views: string;
  is_featured: boolean;
};

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<VideoItem, "id">>({
    title: "",
    youtube_id: "",
    duration: "",
    views: "",
    is_featured: false,
  });

  async function fetchVideos() {
    setLoading(true);
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("is_featured", { ascending: false });

    setVideos(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  async function handleAdd() {
    await supabase.from("videos").insert([form]);
    setForm({
      title: "",
      youtube_id: "",
      duration: "",
      views: "",
      is_featured: false,
    });
    setAdding(false);
    fetchVideos();
  }

  async function handleUpdate(id: string, updated: Omit<VideoItem, "id">) {
    await supabase.from("videos").update(updated).eq("id", id);
    setEditingId(null);
    fetchVideos();
  }

  async function handleDelete(id: string) {
    await supabase.from("videos").delete().eq("id", id);
    fetchVideos();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Videos</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Manage featured and recommended videos
          </p>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors"
          onClick={() => setAdding(true)}
        >
          <Plus size={16} /> Add Video
        </button>
      </div>

      {adding && (
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 space-y-3">
          <p className="text-sm font-semibold text-yellow-400">New Video</p>
          <VideoForm form={form} onChange={setForm} />
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
              onClick={handleAdd}
            >
              <Check size={14} /> Save
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
      ) : videos.length === 0 ? (
        <p className="text-zinc-500 text-sm">
          No videos found. Add your first video above.
        </p>
      ) : (
        <div className="space-y-3">
          {videos.map((video) =>
            editingId === video.id ? (
              <EditVideoRow
                key={video.id}
                video={video}
                onCancel={() => setEditingId(null)}
                onSave={(u) => handleUpdate(video.id, u)}
              />
            ) : (
              <VideoRow
                key={video.id}
                video={video}
                onDelete={() => handleDelete(video.id)}
                onEdit={() => setEditingId(video.id)}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

function VideoRow({
  video,
  onEdit,
  onDelete,
}: {
  video: VideoItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">
      <div className="flex items-center gap-3 min-w-0">
        <img
          alt={video.title}
          className="w-20 h-12 rounded-lg object-cover shrink-0"
          src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {video.title}
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            {video.duration} · {video.views} views{" "}
            {video.is_featured && (
              <span className="ml-1 text-yellow-400">★ Featured</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0 ml-3">
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

function EditVideoRow({
  video,
  onSave,
  onCancel,
}: {
  video: VideoItem;
  onSave: (u: Omit<VideoItem, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<VideoItem, "id">>({
    title: video.title,
    youtube_id: video.youtube_id,
    duration: video.duration,
    views: video.views,
    is_featured: video.is_featured,
  });

  return (
    <div className="rounded-xl border border-yellow-400/40 bg-zinc-900 p-5 space-y-3">
      <VideoForm form={form} onChange={setForm} />
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

function VideoForm({
  form,
  onChange,
}: {
  form: Omit<VideoItem, "id">;
  onChange: (f: Omit<VideoItem, "id">) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(
          [
            ["title", "Title"],
            ["youtube_id", "YouTube ID"],
            ["duration", "Duration (e.g. 15:04)"],
            ["views", "Views (e.g. 60K)"],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-xs text-zinc-400">{label}</label>
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-yellow-400 focus:outline-none"
              value={form[key]}
              onChange={(e) => onChange({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
        <input
          checked={form.is_featured}
          className="accent-yellow-400 w-4 h-4"
          type="checkbox"
          onChange={(e) => onChange({ ...form, is_featured: e.target.checked })}
        />
        Mark as Featured Video
      </label>
    </div>
  );
}
