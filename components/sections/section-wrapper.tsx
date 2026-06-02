import { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/utils/cn";

type SectionWrapperProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/** Page section shell — content is always visible (no scroll-reveal) to avoid blank gaps on navigation. */
export function SectionWrapper({
  id,
  children,
  className,
  contentClassName,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", className)}>
      <Container className={contentClassName}>
        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  );
}
