import { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type VerticalShellProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children: ReactNode;
};

export function VerticalShell({
  title,
  description,
  eyebrow,
  children,
}: VerticalShellProps) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
