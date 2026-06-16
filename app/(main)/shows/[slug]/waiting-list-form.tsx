"use client";

import { FormEvent, useState } from "react";
import { CheckCircle } from "lucide-react";

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
  const [tickets, setTickets] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from("waiting_list_entries").insert({
      show_slug: showSlug,
      show_title: showTitle,
      username: username.trim(),
      phone: phone.trim(),
      email: email.trim(),
      tickets,
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);

      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle className="h-10 w-10 text-yellow-400" />
        <p className="text-white font-bold text-lg">You&apos;re on the list!</p>
        <p className="text-white/60 text-sm">
          We&apos;ll notify you as soon as tickets are available for{" "}
          <span className="text-white font-medium">{showTitle}</span>.
        </p>
      </div>
    );
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
          placeholder="e.g. Paul Kori"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs text-white/60">Number of tickets</span>
          <input
            required
            className="mt-1 w-full rounded-xl bg-zinc-900/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-yellow-400"
            max={20}
            min={1}
            name="tickets"
            type="number"
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
          />
        </label>

        <label className="block">
          <span className="text-xs text-white/60">Phone number</span>
          <input
            required
            className="mt-1 w-full rounded-xl bg-zinc-900/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-yellow-400"
            name="phone"
            placeholder="e.g. +263712345678"
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
            placeholder="paul@gmail.com"
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

      {error && (
        <p aria-live="polite" className="text-sm text-red-400" role="status">
          {error}
        </p>
      )}
    </form>
  );
}
