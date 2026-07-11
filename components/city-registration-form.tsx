"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

type FormState = {
  username: string;
  email: string;
  phone: string;
  city: string;
};

export default function CityRegistrationForm() {
  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    phone: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const emailOk = /.+@.+\..+/.test(form.email.trim());

    return (
      form.username.trim().length >= 2 &&
      emailOk &&
      form.phone.trim().length >= 7 &&
      form.city.trim().length >= 2
    );
  }, [form]);

  const update = (key: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setStatus(null);

    try {
      // This app currently uses a Google Form CTA on the home page.
      // We collect data and then open the Google Form with query params.
      // If you have a backend endpoint later, this is where you would POST.

      const googleFormUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSfJtqtEE96Z7VMjrEWPMJnAuGV0ozURLy5iFvbsCImEw5VTGA/viewform";

      const params = new URLSearchParams();

      params.set("entry.username", form.username.trim());
      params.set("entry.email", form.email.trim());
      params.set("entry.phone", form.phone.trim());
      params.set("entry.city", form.city.trim());

      // Note: Google Form entry.* parameter IDs must match your form.
      // Leaving params in place makes it easy to wire to the correct IDs.
      window.open(
        `${googleFormUrl}?${params.toString()}`,
        "_blank",
        "noopener,noreferrer",
      );
      setStatus("Opening the registration form…");
    } catch {
      setStatus("Could not open the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          isRequired
          classNames={{
            input: "text-white",
            label: "text-white/75",
          }}
          label="Username"
          placeholder="e.g. HilaryFan"
          value={form.username}
          variant="bordered"
          onValueChange={update("username")}
        />
        <Input
          isRequired
          classNames={{
            input: "text-white",
            label: "text-white/75",
          }}
          label="Email"
          placeholder="you@example.com"
          type="email"
          value={form.email}
          variant="bordered"
          onValueChange={update("email")}
        />
        <Input
          isRequired
          classNames={{
            input: "text-white",
            label: "text-white/75",
          }}
          label="Phone Number"
          placeholder="e.g. +2567xxxxxxxx"
          value={form.phone}
          variant="bordered"
          onValueChange={update("phone")}
        />
        <Input
          isRequired
          classNames={{
            input: "text-white",
            label: "text-white/75",
          }}
          label="Location / City"
          placeholder="e.g. Nairobi"
          value={form.city}
          variant="bordered"
          onValueChange={update("city")}
        />
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
