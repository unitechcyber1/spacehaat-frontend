"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { toPhone10 } from "@/lib/phone-norm";
import { buildUserEnquiryBody } from "@/lib/user-enquiry-payload";
import { submitUserEnquiry, UserEnquiryError } from "@/services/user-enquiry-api";

type LeadFormProps = {
  compact?: boolean;
  submitLabel?: string;
  /** Shown in `city` and `location[]` (e.g. city page name or "India"). */
  city?: string;
  /** `mx_Space_Type` for the user enquiry API. */
  mxSpaceType?: string;
};

export function LeadForm({
  compact = false,
  submitLabel = "Get Free Consultation",
  city = "India",
  mxSpaceType = "Homepage lead",
}: LeadFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setErrorMessage(null);
    setIsPending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "");
    const requirement = String(formData.get("requirement") ?? "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      setIsPending(false);
      return;
    }
    if (!toPhone10(phone)) {
      setStatus("error");
      setErrorMessage("Enter a valid 10-digit mobile number.");
      setIsPending(false);
      return;
    }

    const pageUrl =
      typeof window !== "undefined" ? window.location.href : "https://www.spacehaat.com";

    try {
      const body = buildUserEnquiryBody({
        name,
        email,
        phone,
        interestedIn: requirement || "Workspace consultation",
        city,
        pageUrl,
        mxSpaceType,
      });
      await submitUserEnquiry(body);
      form.reset();
      setStatus("success");
    } catch (e) {
      setStatus("error");
      if (e instanceof UserEnquiryError) {
        setErrorMessage(
          e.needLogin
            ? "Please sign in with your phone to submit an enquiry, then try again."
            : e.message,
        );
      } else {
        setErrorMessage(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      }
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
        disabled={isPending}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="h-14 rounded-[1rem] border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-[color:var(--color-brand)]"
        disabled={isPending}
      />
      <input
        name="phone"
        required
        inputMode="tel"
        autoComplete="tel"
        placeholder="10-digit mobile number"
        className="h-14 rounded-[1rem] border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-[color:var(--color-brand)]"
        disabled={isPending}
      />
      <textarea
        name="requirement"
        required
        placeholder="Tell us what kind of workspace you need"
        className="min-h-32 rounded-[1rem] border border-slate-200 bg-white px-4 py-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-[color:var(--color-brand)]"
        disabled={isPending}
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
          {errorMessage || "Something went wrong. Please try again."}
        </p>
      ) : null}
    </form>
  );
}
