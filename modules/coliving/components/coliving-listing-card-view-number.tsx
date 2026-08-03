"use client";

import { useState } from "react";

import { ColivingListingLeadQuizModal } from "@/modules/coliving/components/coliving-listing-lead-quiz-modal";
import type { PgDetail } from "@/types/pg.model";
import { cn } from "@/utils/cn";

type ColivingListingCardViewNumberProps = {
  pg: PgDetail;
  className?: string;
};

export function ColivingListingCardViewNumber({ pg, className }: ColivingListingCardViewNumberProps) {
  const [quizOpen, setQuizOpen] = useState(false);

  const stopNav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          stopNav(e);
          setQuizOpen(true);
        }}
        className={cn(
          "shrink-0 text-[0.8125rem] font-semibold text-[color:var(--color-brand)] underline-offset-4 transition hover:underline sm:text-[0.875rem]",
          className,
        )}
      >
        View number
      </button>

      <ColivingListingLeadQuizModal open={quizOpen} onOpenChange={setQuizOpen} pg={pg} />
    </>
  );
}
