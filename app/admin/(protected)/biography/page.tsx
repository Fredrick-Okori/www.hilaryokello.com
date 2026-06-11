"use client";

import React, { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { supabase } from "@/lib/supabase";

type Bio = {
  id: string;
  content: string;
  updated_at: string;
};

export default function AdminBiographyPage() {
  const [bio, setBio] = useState<Bio | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("biography")
      .select("*")
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          setBio(data);
          setContent(data.content);
        }
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    if (bio) {
      await supabase
        .from("biography")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", bio.id);
    } else {
      const { data } = await supabase
        .from("biography")
        .insert([{ content }])
        .select()
        .single();

      setBio(data);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Biography</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Edit the biography displayed on the website
        </p>
      </div>

      {loading ? (
        <p className="text-zinc-500 text-sm">Loading…</p>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400">Biography Content</label>
            <textarea
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none resize-y leading-relaxed"
              placeholder="Write the biography here…"
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            className="flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-60 transition-colors"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? (
              <Loader2 className="animate-spin" size={15} />
            ) : saved ? (
              <Check size={15} />
            ) : null}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
          {bio?.updated_at && (
            <p className="text-xs text-zinc-500">
              Last updated: {new Date(bio.updated_at).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
