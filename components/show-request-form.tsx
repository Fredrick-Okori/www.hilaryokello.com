"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/ssr";

export function ShowRequestForm() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    try {
      const { error } = await supabase.from("show_requests").insert([
        {
          city,
          country,
          name,
          email,
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmissionStatus("success");
      setCity("");
      setCountry("");
      setName("");
      setEmail("");
    } catch (error) {
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <Input
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <Input
        label="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Your Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
      {submissionStatus === "success" && (
        <p className="text-green-500">
          Thank you for your request! I&apos;ll be in touch.
        </p>
      )}
      {submissionStatus === "error" && (
        <p className="text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
