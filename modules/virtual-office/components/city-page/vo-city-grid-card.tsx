"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";

import { ContactFormModal } from "@/components/contact/contact-form-modal";
import { virtualOfficePlanRows } from "@/lib/virtual-office-workspace-plans";
import { deriveAppCitySlugFromWorkspace } from "@/services/coworking-workspace-mapper";
import type { CoworkingModel } from "@/types/coworking-workspace.model";
import { formatCurrency } from "@/utils/format";
import { cn } from "@/utils/cn";

const FALLBACK =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=72";

function cardImage(workspace: CoworkingModel.WorkSpace): string {
  const hero = typeof workspace.image === "string" ? workspace.image.trim() : "";
  if (hero) return hero;
  return workspace.images?.[0]?.image?.s3_link?.trim() || FALLBACK;
}

export function VirtualOfficeCityGridCard({
  workspace,
  className,
}: {
  workspace: CoworkingModel.WorkSpace;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const href = `/virtual-office/${workspace.slug}`;
  const micro = workspace.location?.micro_location?.name?.trim() ?? "";
  const planRows = useMemo(() => virtualOfficePlanRows(workspace), [workspace]);

  return (
    <>
      <article
        className={cn(
          "flex min-w-[72%] shrink-0 snap-start flex-col overflow-hidden rounded-[18px] border border-[#EAE7E0] bg-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(20,20,20,0.06)] sm:min-w-[62%] lg:min-w-0",
          className,
        )}
      >
        <Link href={href} className="relative block h-[140px] bg-gradient-to-br from-[#EDF2EC] to-[#DCE8DD]">
          <Image src={cardImage(workspace)} alt={workspace.name} fill className="object-cover" sizes="(max-width:1024px) 85vw, 33vw" />
        </Link>
        <div className="flex flex-1 flex-col gap-2 p-4 sm:gap-2.5 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={href}
                className="line-clamp-2 text-[15px] font-bold text-ink hover:text-[color:var(--color-brand)] sm:text-[17px]"
              >
                {workspace.name}
              </Link>
              {micro ? (
                <p className="mt-1 flex items-center gap-1 text-[12px] text-muted sm:text-[13px]">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {micro}
                </p>
              ) : null}
            </div>
          </div>
          {planRows.length > 0 ? (
            <div className="rounded-lg bg-[#FAF7F2] px-3 py-2 text-[12.5px] leading-relaxed text-[#444] sm:py-2.5 sm:text-[13px]">
              {planRows.map((row) => (
                <p key={row.label}>
                  {row.label} {formatCurrency(row.price)}/mo
                </p>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-1.5">
            {["Digital KYC", "E‑stamped agreement", "Utility bill"].map((f) => (
              <span
                key={f}
                className="rounded-[5px] bg-[#F4F0E9] px-2 py-1 text-[11px] font-medium text-[#444] sm:text-[11.5px]"
              >
                {f}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-auto w-full rounded-xl bg-[color:var(--color-brand)] py-2.5 text-sm font-semibold text-white hover:bg-[#3B8E3F]"
          >
            Get Details →
          </button>
        </div>
      </article>

      <ContactFormModal
        open={open}
        onOpenChange={setOpen}
        leadTarget={{
          city: deriveAppCitySlugFromWorkspace(workspace),
          spaceId: workspace.id || workspace._id,
        }}
        submitLabel="Get Details"
        title="Get Virtual Office Details"
        subtitle={`Share your details for ${workspace.name}.`}
        interestedInDefault={`${workspace.name} — virtual office`}
        mxSpaceType="Virtual Office"
      />
    </>
  );
}
