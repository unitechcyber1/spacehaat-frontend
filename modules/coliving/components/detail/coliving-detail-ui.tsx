import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export function ColivingEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted sm:text-[0.72rem]",
        className,
      )}
    >
      <span className="h-px w-4 bg-slate-300/90" aria-hidden />
      {children}
    </p>
  );
}

export function ColivingSectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-1.5 font-display text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.01em] text-ink sm:text-[1.85rem] lg:text-[2.125rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function ColivingAccent({ children }: { children: ReactNode }) {
  return (
    <span className="font-serif font-semibold italic text-[color:var(--color-brand)]">{children}</span>
  );
}

export function ColivingBlock({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-b border-slate-200/80 py-8 first:pt-0 max-lg:py-7 sm:py-10 lg:scroll-mt-32",
        className,
      )}
    >
      {children}
    </section>
  );
}
