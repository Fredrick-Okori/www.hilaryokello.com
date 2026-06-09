"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Check, Loader2 } from "lucide-react";

type BookingInfo = {
  id: string;
  email: string;
  whatsapp: string;
  phone: string;
  note: string;
  updated_at: string;
};

export default function AdminBookingPage() {
  const [info, setInfo] = useState<BookingInfo | null>(null);
  const [form, setForm] = useState({ email: "", whatsapp: "", phone: "", note: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("booking_info")
      .select("*")
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          setInfo(data);
          setForm({ email: data.email, whatsapp: data.whatsapp, phone: data.phone, note: data.note });
        }
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    const payload = { ...form, updated_at: new Date().toISOString() };
    if (info) {
      await supabase.from("booking_info").update(payload).eq("id", info.id);
    } else {
      const { data } = await supabase.from("booking_info").insert([payload]).select().single();
      setInfo(data);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const fields: { key: keyof typeof form; label: string; type?: string; multiline?: boolean }[] = [
    { key: "email", label: "Booking Email", type: "email" },
    { key: "phone", label: "Phone Number" },
    { key: "whatsapp", label: "WhatsApp Number" },
    { key: "note", label: "Booking Note / Instructions", multiline: true },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Booking</h2>
        <p className="text-sm text-zinc-400 mt-1">Update booking contact information displayed on the site</p>
      </div>

      {loading ? (
        <p className="text-zinc-500 text-sm">Loading…</p>
      ) : (
        <div className="space-y-4">
          {fields.map(({ key, label, type = "text", multiline }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400">{label}</label>
              {multiline ? (
                <textarea
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  rows={4}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none resize-y"
                />
              ) : (
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-yellow-400 focus:outline-none"
                />
              )}
            </div>
          ))}

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-60 transition-colors"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : null}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>

          {info?.updated_at && (
            <p className="text-xs text-zinc-500">
              Last updated: {new Date(info.updated_at).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
