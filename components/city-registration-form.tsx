"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/button";

import { supabase } from "@/lib/supabase";
import { COUNTRIES } from "@/lib/countries";

type FormState = {
  username: string;
  email: string;
  phone: string;
  city: string;
  country: string;
};

export default function CityRegistrationForm() {
  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    phone: "",
    city: "",
    country: "Uganda",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const dialCode = useMemo(
    () => COUNTRIES.find((c) => c.name === form.country)?.dialCode ?? "",
    [form.country],
  );

  const canSubmit = useMemo(() => {
    const emailOk = /.+@.+\..+/.test(form.email.trim());

    return (
      form.username.trim().length >= 2 &&
      emailOk &&
      !!dialCode &&
      form.phone.trim().length >= 6 &&
      form.city.trim().length >= 2 &&
      form.country.trim().length >= 2
    );
  }, [form, dialCode]);

  const update = (key: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setStatus(null);

    try {
      const { error } = await supabase.from("show_requests").insert({
        city: form.city.trim(),
        country: form.country.trim(),
        email: form.email.trim(),
        name: form.username.trim(),
        phone: `${dialCode} ${form.phone.trim()}`,
      });

      if (error) {
        throw error;
      }

      setForm({
        city: "",
        country: "Uganda",
        email: "",
        phone: "",
        username: "",
      });
      setStatus("Thanks! Your city has been registered.");
    } catch {
      setStatus("Could not submit your registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2 text-sm text-white/80">
          <span>Username</span>
          <input
            required
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/45 outline-none transition focus:border-yellow-400 focus:bg-white/15"
            placeholder="e.g. JaneDoe"
            type="text"
            value={form.username}
            onChange={(e) => update("username")(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-white/80">
          <span>Email</span>
          <input
            required
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/45 outline-none transition focus:border-yellow-400 focus:bg-white/15"
            placeholder="janedoe@gmail.com"
            type="email"
            value={form.email}
            onChange={(e) => update("email")(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-white/80">
          <span>Country</span>
          <select
            required
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white outline-none transition focus:border-yellow-400 focus:bg-white/15"
            value={form.country}
            onChange={(e) => update("country")(e.target.value)}
          >
            <option className="bg-black text-white/45" value="">
              Select your country
            </option>
            {COUNTRIES.map((country) => (
              <option
                key={country.iso2}
                className="bg-black text-white"
                value={country.name}
              >
                {country.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-white/80">
          <span>Phone Number</span>
          <div className="flex gap-2">
            <input
              disabled
              readOnly
              aria-label="Country code"
              className="w-20 shrink-0 rounded-2xl border border-white/15 bg-white/5 px-3 py-3 text-center text-base text-white/70 outline-none"
              placeholder="+…"
              value={dialCode}
            />
            <input
              required
              className="w-full min-w-0 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/45 outline-none transition focus:border-yellow-400 focus:bg-white/15"
              placeholder="e.g. 412345678"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone")(e.target.value)}
            />
          </div>
        </label>
        <label className="flex flex-col gap-2 text-sm text-white/80 sm:col-span-2">
          <span>Location / City</span>
          <input
            required
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/45 outline-none transition focus:border-yellow-400 focus:bg-white/15"
            placeholder="e.g. Melbourne"
            type="text"
            value={form.city}
            onChange={(e) => update("city")(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <Button
          className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-base sm:text-lg rounded-full transition-all transform hover:scale-105"
          isDisabled={!canSubmit || submitting}
          type="submit"
        >
          {submitting ? "Submitting…" : "Register your City"}
        </Button>

        {status && <p className="text-sm text-white/70">{status}</p>}
      </div>
    </form>
  );
}
