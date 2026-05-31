"use client";

import { useMemo, useState } from "react";

import { ContactFormModal } from "@/components/contact/contact-form-modal";
import { slugifyPgName } from "@/lib/pg-slug";
import {
  formatPgPhoneDisplay,
  pgPhoneTelHref,
  resolvePgContactPhone,
} from "@/lib/pg-contact";
import type { PgDetail } from "@/types/pg.model";
import { cn } from "@/utils/cn";

type ColivingListingCardViewNumberProps = {
  pg: PgDetail;
  className?: string;
};

export function ColivingListingCardViewNumber({ pg, className }: ColivingListingCardViewNumberProps) {
  const [revealed, setRevealed] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const phone = useMemo(() => resolvePgContactPhone(pg), [pg]);
  const leadTarget = useMemo(
    () => ({
      city: slugifyPgName(pg.city),
      spaceId: slugifyPgName(pg.name),
    }),
    [pg.city, pg.name],
  );

  const stopNav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (phone && revealed) {
    return (
      <a
        href={pgPhoneTelHref(phone)}
        onClick={stopNav}
        className={cn(
          "shrink-0 text-[0.8125rem] font-semibold text-[color:var(--color-brand)] underline decoration-1 underline-offset-2 transition hover:text-[#43A047] sm:text-[0.875rem]",
          className,
        )}
      >
        {formatPgPhoneDisplay(phone)}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          stopNav(e);
          if (phone) setRevealed(true);
          else setContactOpen(true);
        }}
        className={cn(
          "shrink-0 text-[0.8125rem] font-semibold text-[color:var(--color-brand)] underline-offset-4 transition hover:underline sm:text-[0.875rem]",
          className,
        )}
      >
        View number
      </button>

      <ContactFormModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        leadTarget={leadTarget}
        submitLabel="Get callback"
        title="View contact number"
        subtitle={`Share your details and we will share the contact for ${pg.name}.`}
        interestedInDefault={`${pg.name} — contact`}
        mxSpaceType="Web Coliving"
        spaceListingKey="living_space"
        microlocation={pg.locality}
      />
    </>
  );
}
