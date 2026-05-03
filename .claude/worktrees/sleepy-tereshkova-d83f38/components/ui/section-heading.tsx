import { ReactNode } from "react";

import { cn } from "@/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl text-ink sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-base text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
