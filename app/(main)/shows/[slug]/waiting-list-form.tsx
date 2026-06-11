"use client";

import { FormEvent, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function WaitingListForm({
  showSlug,
  showTitle,
}: {
  showSlug: string;
  showTitle: string;
}) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const payload = {
      show_slug: showSlug,
      show_title: showTitle,
      username: username.trim(),
      phone: phone.trim(),
      email: email.trim(),
    };

    const { error } = await supabase
      .from("waiting_list_entries")
      .insert(payload);

    if (error) {
      setMessage(error.message);
      setSubmitting(false);

      return;
    }

    setUsername("");
    setPhone("");
    setEmail("");
    setMessage("Thanks! You’ve been added to the waiting list.");
    setSubmitting(false);
  }

  return (
    <form
      aria-label={`Waiting list form for ${showTitle}`}
      className="space-y-3"
      onSubmit={onSubmit}
    >
      <label className="block">
        <span className="text-xs text-white/60">Username</span>
        <input
          required
          className="mt-1 w-full rounded-xl bg-zinc-900/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-yellow-400"
          name="username"
          placeholder="e.g. hilaryfan123"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs text-white/60">Phone number</span>
          <input
            required
            className="mt-1 w-full rounded-xl bg-zinc-900/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-yellow-400"
            name="phone"
            placeholder="e.g. +2637..."
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-xs text-white/60">Email</span>
          <input
            required
            className="mt-1 w-full rounded-xl bg-zinc-900/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-yellow-400"
            name="email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <button
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-base rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={submitting}
        type="submit"
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>

      {message && (
        <p
          aria-live="polite"
          className={`text-sm ${message.startsWith("Thanks") ? "text-green-400" : "text-red-400"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
