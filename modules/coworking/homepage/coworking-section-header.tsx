import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/utils/cn";

type CoworkingSectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  titleClassName?: string;
  layout?: "stack" | "row";
};

export function CoworkingSectionHeader({
  eyebrow,
  title,
  description,
  action,
  actionHref,
  actionLabel,
  className,
  titleClassName,
  layout = "stack",
}: CoworkingSectionHeaderProps) {
  const actionNode =
    action ??
    (actionHref && actionLabel ? (
      <Link
        href={actionHref}
        className="inline-flex shrink-0 items-center gap-1.5 border-b-[1.5px] border-ink pb-1 text-sm font-semibold text-ink transition hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-accent)]"
      >
        {actionLabel}
      </Link>
    ) : null);

  const heading = (
    <div className={cn("max-w-[760px]", layout === "row" && "mb-0")}>
      {eyebrow ? (
        <p className="mb-[18px] flex items-center gap-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--color-accent)]">
          <span className="h-0.5 w-[26px] shrink-0 rounded-sm bg-[color:var(--color-brand)]" aria-hidden />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-[clamp(1.875rem,3.4vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-muted">{description}</p> : null}
    </div>
  );

  if (layout === "row" && actionNode) {
    return (
      <div
        className={cn(
          "mb-10 flex flex-col items-start justify-between gap-6 sm:mb-[52px] md:flex-row md:items-end",
          className,
        )}
      >
        {heading}
        {actionNode}
      </div>
    );
  }

  return (
    <div className={cn("mb-10 sm:mb-[52px]", className)}>
      {heading}
      {actionNode ? <div className="mt-6">{actionNode}</div> : null}
    </div>
  );
}
