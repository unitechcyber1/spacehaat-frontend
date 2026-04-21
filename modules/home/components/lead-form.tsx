"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { submitLead } from "@/services/leads-api";

type LeadFormProps = {
  compact?: boolean;
  submitLabel?: string;
};

export function LeadForm({
  compact = false,
  submitLabel = "Get Free Consultation",
}: LeadFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setIsPending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      requirement: String(formData.get("requirement") ?? ""),
      source: "homepage" as const,
    };

    try {
      await submitLead(payload);

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <input
        name="name"
        required
        placeholder="Your name"
        className="h-14 rounded-[1rem] border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-[color:var(--color-brand)]"
      />
      <input
        name="phone"
        required
        placeholder="Phone number"
        className="h-14 rounded-[1rem] border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-[color:var(--color-brand)]"
      />
      <textarea
        name="requirement"
        required
        placeholder="Tell us what kind of workspace you need"
        className="min-h-32 rounded-[1rem] border border-slate-200 bg-white px-4 py-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-[color:var(--color-brand)]"
      />
      <Button
        type="submit"
        className={compact ? "w-full" : "w-full sm:w-auto"}
        disabled={isPending}
      >
        {isPending ? "Submitting..." : submitLabel}
      </Button>
      {status === "success" ? (
        <p className="text-sm text-[color:var(--color-brand)]">
          Thanks. Our workspace team will reach out shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-rose-600">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
