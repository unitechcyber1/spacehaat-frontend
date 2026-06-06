import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export function CoworkingDetailEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[color:var(--color-brand)]">
      {children}
    </p>
  );
}

export function CoworkingDetailSectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[1.65rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink sm:text-[1.7rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function CoworkingDetailSectionSub({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-2 max-w-[60ch] text-[15.5px] leading-relaxed text-muted sm:text-base", className)}>
      {children}
    </p>
  );
}

export function CoworkingDetailBlock({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-t border-[#EEF0ED] py-7 first:border-t-0 first:pt-2 sm:py-8 lg:py-[34px]",
        className,
      )}
    >
      {children}
    </section>
  );
}
