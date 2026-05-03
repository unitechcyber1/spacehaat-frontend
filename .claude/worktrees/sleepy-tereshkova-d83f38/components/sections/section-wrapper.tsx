"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/utils/cn";

type SectionWrapperProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionWrapper({
  id,
  children,
  className,
  contentClassName,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", className)}>
      <Container className={contentClassName}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, ease: [0.21, 1, 0.32, 1] }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
