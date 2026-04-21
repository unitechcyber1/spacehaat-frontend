"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { OfficeSpaceModel } from "@/types/office-space.model";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format";

const LISTING_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=72";

function imageS3Link(row: OfficeSpaceModel.OfficeSpace): string {
  const first = row.images?.[0]?.image?.s3_link;
  return typeof first === "string" && first.trim() ? first : LISTING_IMAGE_FALLBACK;
}

function officeTitle(row: OfficeSpaceModel.OfficeSpace): string {
  const sq = row.other_detail?.area_for_lease_in_sq_ft;
  if (typeof sq === "number" && Number.isFinite(sq) && sq > 0) {
    return `${sq.toLocaleString("en-IN")} sq. ft. office space for rent`;
  }
  return row.name ?? "Office space";
}

function officeSubtitle(row: OfficeSpaceModel.OfficeSpace): string {
  const locationName =
    row.location?.micro_location?.name ??
    row.location?.micro_location?.id ??
    row.location?.name ??
    "";
  const cityName = row.location?.city?.name ?? "";
  return [locationName, cityName].filter(Boolean).join(", ");
}

export function OfficeSpaceCard({
  office,
  className,
}: {
  office: OfficeSpaceModel.OfficeSpace;
  className?: string;
}) {
  const title = officeTitle(office);
  const subtitle = officeSubtitle(office);
  const rating = office.ratings ? Number.parseFloat(String(office.ratings)) || 0 : 0;
  const price = office.other_detail?.area_for_lease_in_sq_ft * office.other_detail?.rent_in_sq_ft;

  return (
    <article className={cn("group", className)}>
      <Link href={`/office-space/${office.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={imageS3Link(office)}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* {office.spaceTag ? (
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-slate-950/85 px-3 py-1.5 text-[0.75rem] font-semibold text-white shadow-lg backdrop-blur-sm">
              {office.spaceTag}
            </div>
          ) : null} */}
        </div>
      </Link>

      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/office-space/${office.slug}`}
            className="min-w-0 text-[0.98rem] font-semibold leading-snug text-ink"
          >
            <span className="line-clamp-2">{title}</span>
          </Link>
          {rating > 0 ? (
            <div className="inline-flex shrink-0 items-center gap-1 text-[0.92rem] font-medium text-ink">
              <Star className="h-4 w-4 fill-[#f4a621] text-[#f4a621]" />
              <span>{rating}</span>
            </div>
          ) : null}
        </div>

        <div className="flex items-start gap-2 text-[0.92rem] text-muted">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="line-clamp-2">{subtitle}</p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="text-[0.95rem] text-ink">
            <span className="font-semibold">{formatCurrency(price)}</span>
            <span className="text-muted"> / per month</span>
          </div>
          <Link
            href={`/office-space/${office.slug}`}
            className="shrink-0 text-[0.88rem] font-semibold text-[color:var(--color-brand)] underline-offset-4 transition hover:underline"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </article>
  );
}

