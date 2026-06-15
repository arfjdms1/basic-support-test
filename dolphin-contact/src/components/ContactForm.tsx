"use client";

import { FormEvent, useState } from "react";

import { FEATURE_OPTIONS } from "@/lib/validation";

import { SelectField } from "./SelectField";

type FormState = {
  recipientEmail: string;
  name: string;
  email: string;
  company: string;
  feature: string;
  message: string;
};

const initialState: FormState = {
  recipientEmail: "",
  name: "",
  email: "",
  company: "",
  feature: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFeedback("Thanks! Your message has been sent.");
      setForm((current) => ({
        ...initialState,
        recipientEmail: current.recipientEmail,
      }));
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  const inputClassName =
    "w-full rounded-xl border border-white/10 bg-[#1a2238] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20";

  return (
    <section className="w-full max-w-3xl">
      <div className="mb-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
        <label
          htmlFor="recipientEmail"
          className="mb-2 block text-sm font-medium text-amber-100"
        >
          Demo: send submissions to this inbox
        </label>
        <input
          id="recipientEmail"
          name="recipientEmail"
          type="email"
          required
          value={form.recipientEmail}
          onChange={(event) => updateField("recipientEmail", event.target.value)}
          placeholder="you@company.com"
          className={inputClassName}
        />
        <p className="mt-2 text-xs text-amber-100/80">
          Form messages are emailed to the address above.
        </p>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Transform Your Learning Journey?
        </h2>
        <p className="mt-3 text-base text-slate-300 sm:text-lg">
          Join the next gen leaders who are building confidence and achieving
          their goals with Dolphin.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-[#121a2f]/80 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your Name"
            className={inputClassName}
          />
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="Your Email"
            className={inputClassName}
          />
          <input
            name="company"
            type="text"
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            placeholder="Company (Optional)"
            className={inputClassName}
          />
          <SelectField
            name="feature"
            required
            value={form.feature}
            onChange={(value) => updateField("feature", value)}
            options={FEATURE_OPTIONS}
          />
        </div>

        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell us about your learning goals..."
          className={`${inputClassName} mt-4 resize-y`}
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Sending..." : "Get in Touch"}
        </button>

        {feedback ? (
          <p
            role="status"
            className={`mt-4 text-center text-sm ${
              status === "success" ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {feedback}
          </p>
        ) : null}
      </form>
    </section>
  );
}
