"use client";

import {
  BadgePercent,
  CheckCircle2,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { ContactFormModal } from "@/components/contact/contact-form-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export function HomeFinalCtaBand() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-white p-7 shadow-xl sm:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,1) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(76,175,80,0.22), rgba(76,175,80,0))" }}
          aria-hidden
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <h2 className="max-w-[22ch] font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl">
              Find your ideal workspace &amp; start growing
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Get expert guidance, best deals, and verified spaces all in one place.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                <Zap className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                Limited-time deals available
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                <BadgePercent className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                Spaces filling fast in your city
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.22)] backdrop-blur sm:p-5">
            <div
              className="pointer-events-none absolute -inset-3 rounded-3xl blur-2xl"
              style={{
                background:
                  "radial-gradient(55% 55% at 50% 30%, rgba(76,175,80,0.22), rgba(76,175,80,0))",
              }}
              aria-hidden
            />

            <div className="relative grid gap-3">
              <Button
                type="button"
                onClick={() => setOpen(true)}
                className={cn(
                  "h-14 w-full rounded-xl px-6 text-base font-semibold",
                  "bg-gradient-to-b from-[color:var(--color-brand)] to-[color:var(--color-accent)]",
                  "shadow-[0_14px_34px_-12px_rgba(76,175,80,0.65)]",
                  "transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-12px_rgba(46,125,50,0.6)]",
                )}
              >
                Get Expert Advice
              </Button>

              <Button
                href="/coworking"
                variant="secondary"
                className="h-12 w-full rounded-xl border-2 bg-white text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Explore Spaces
              </Button>

              <div className="mt-1 grid gap-2 rounded-xl border border-slate-200/70 bg-slate-50/70 px-3 py-3 text-xs text-slate-700 sm:px-4">
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                  Trusted by 10,000+ users
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                  100% verified spaces
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                  No spam guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactFormModal
        open={open}
        onOpenChange={setOpen}
        leadTarget={{ city: "india", spaceId: "home-cta" }}
        submitLabel="Get Expert Advice"
        title="Get Expert Advice"
        subtitle="Share your details and our team will help you shortlist verified spaces."
        interestedInDefault="Homepage expert advice"
        mxSpaceType="General enquiry"
      />
    </>
  );
}
