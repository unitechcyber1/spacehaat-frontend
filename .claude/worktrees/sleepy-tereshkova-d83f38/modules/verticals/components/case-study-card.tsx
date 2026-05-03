import { ArrowUpRight } from "lucide-react";

import { CaseStudy } from "@/types";

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
            {study.company}
          </p>
          <h3 className="mt-4 text-xl font-semibold text-ink">{study.headline}</h3>
        </div>
        <span className="rounded-full bg-slate-100 p-2 text-slate-700">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{study.summary}</p>
      <p className="mt-6 text-sm font-semibold text-ink">{study.metric}</p>
    </article>
  );
}
