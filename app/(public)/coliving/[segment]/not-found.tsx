import Link from "next/link";

import { Container } from "@/components/ui/container";
export default function ColivingPropertyNotFound() {
  return (
    <Container className="py-20 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Property not found</h1>
      <p className="mt-3 text-muted">This coliving or PG listing may have been removed or the link is incorrect.</p>
      <Link
        href="/coliving"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white"
      >
        Browse all coliving & PG
      </Link>
    </Container>
  );
}
