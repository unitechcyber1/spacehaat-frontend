"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";

import { workspaceRating } from "@/modules/coworking/components/coworking-detail-header";
import type { CoworkingModel } from "@/types/coworking-workspace.model";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format";

const LISTING_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=72";

function cardImageSrc(workspace: CoworkingModel.WorkSpace): string {
  const hero = typeof workspace.image === "string" ? workspace.image.trim() : "";
  if (hero) return hero;
  const link = workspace.images?.[0]?.image?.s3_link?.trim();
  return link || LISTING_IMAGE_FALLBACK;
}

function cardLocationLine(workspace: CoworkingModel.WorkSpace): string {
  return (
    workspace.location?.micro_location?.name?.trim() ||
    workspace.location?.micro_location?.id ||
    ""
  );
}

export function CoworkingCard({
  workspace,
  className,
}: {
  workspace: CoworkingModel.WorkSpace;
  className?: string;
}) {
  const rating = workspaceRating(workspace);
  const price = workspace.starting_price ?? 0;

  return (
    <article className={cn("group", className)}>
      <div className="relative">
        <Link href={`/coworking/${workspace.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={cardImageSrc(workspace)}
              alt={workspace.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </Link>

        <button
          type="button"
          aria-label={`Save ${workspace.name}`}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur transition hover:scale-105"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/coworking/${workspace.slug}`}
            className="min-w-0 text-[0.98rem] font-semibold leading-snug text-ink"
          >
            <span className="line-clamp-1">{workspace.name}</span>
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
          <p className="line-clamp-1">{cardLocationLine(workspace)}</p>
        </div>

        <div className="pt-1 text-[0.95rem] text-ink">
          <span className="font-semibold">{formatCurrency(price)}</span>
          <span className="text-muted"> /month</span>
        </div>
      </div>
    </article>
  );
}
