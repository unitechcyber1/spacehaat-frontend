"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck, FileText, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { ContactFormModal } from "@/components/contact/contact-form-modal";
import { cn } from "@/utils/cn";

type VirtualOfficeDocumentsProvidedProps = {
  imageSrc: string;
  imageAlt: string;
};

export function VirtualOfficeDocumentsProvided({
  imageSrc,
  imageAlt,
}: VirtualOfficeDocumentsProvidedProps) {
  const [open, setOpen] = useState(false);

  const docs = [
    {
      title: "No Objection Certificate (NOC)",
      desc: "Issued by the provider for registrations where applicable.",
      icon: ShieldCheck,
    },
    {
      title: "Notarised agreements",
      desc: "Stamped / notarised documents as per availability and plan.",
      icon: FileText,
    },
    {
      title: "Utility bill support",
      desc: "Electricity / internet proof (where required for compliance).",
      icon: BadgeCheck,
    },
    {
      title: "Owner KYC (as needed)",
      desc: "Provider KYC documents shared only when required.",
      icon: BadgeCheck,
    },
  ];

  return (
    <>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-soft">
          <div className="relative aspect-[16/10] sm:aspect-[16/9]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/10 via-transparent to-transparent" />
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl tracking-[-0.03em] text-ink sm:text-4xl">
            Documents included with your Virtual Office
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            We prioritise providers that share the right paperwork clearly — so your GST / ROC process feels smooth and predictable.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {docs.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-soft"
                >
                  <Icon className="h-5 w-5 text-[color:var(--color-brand)]" />
                  <p className="mt-4 text-sm font-semibold text-ink">{d.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{d.desc}</p>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-brand)]",
              "transition hover:translate-x-0.5",
            )}
          >
            Request callback
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ContactFormModal
        open={open}
        onOpenChange={setOpen}
        leadTarget={{ city: "global", spaceId: "virtual-office-documents" }}
        submitLabel="Request Callback"
        title="Request Callback"
        subtitle="Get a quick call back with documents, pricing, and timeline."
        interestedInDefault="Virtual office documents & pricing"
        mxSpaceType="Virtual Office"
      />
    </>
  );
}

