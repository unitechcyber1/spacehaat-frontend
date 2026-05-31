import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export function VoEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-3.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-brand)]",
        className,
      )}
    >
      <span className="h-0.5 w-[18px] shrink-0 rounded-full bg-[color:var(--color-brand)]" aria-hidden />
      {children}
    </p>
  );
}

export function VoSectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "font-display text-[1.65rem] font-bold leading-[1.12] tracking-[-0.025em] text-ink sm:text-[2.125rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function VoSectionSub({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("max-w-[62ch] text-base text-muted sm:text-[1.0625rem]", className)}>{children}</p>;
}

export function VoSection({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("border-t border-[#EAE7E0] py-12 sm:py-16", className)}>
      {children}
    </section>
  );
}

export function VoPrimaryButton({
  children,
  className,
  href,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3B8E3F] hover:shadow-[0_8px_22px_rgba(76,175,80,0.28)] sm:text-base",
    className,
  );
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function VoGhostButton({
  children,
  className,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl border border-[#EAE7E0] bg-transparent px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink",
    className,
  );
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function VoCheckPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EAE7E0] bg-white px-3.5 py-2 text-xs font-medium text-[#333] sm:text-[13px]">
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
        ✓
      </span>
      {children}
    </span>
  );
}
