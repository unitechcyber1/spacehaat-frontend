import Link from "next/link";

import { Container } from "@/components/ui/container";
import { listCities } from "@/services/mock-db";
import { verticals } from "@/utils/constants";

const DEFAULT_FOOTER_LEAD =
  "A premium discovery platform to compare coworking spaces, virtual offices, and office spaces across India.";

export function Footer() {
  const cities = listCities().slice(0, 4);

  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link
            href="/"
            className="inline-flex font-display text-2xl text-ink transition hover:text-slate-900"
            aria-label="Go to homepage"
          >
            SpaceHaat
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            {DEFAULT_FOOTER_LEAD}
          </p>
          <Link
            href="/#lead-form"
            className="mt-5 hidden text-sm font-medium text-[color:var(--color-brand)] sm:inline-flex"
          >
            Get Free Consultation
          </Link>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Services</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            {verticals.map((vertical) => (
              <Link key={vertical.key} href={vertical.href} className="hover:text-ink">
                {vertical.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Cities</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            {cities.map((city) => (
              <Link key={city.id} href={`/coworking/${city.slug}`} className="hover:text-ink">
                {city.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Company</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <Link href="/" className="hover:text-ink">
              About
            </Link>
            <Link href="/#lead-form" className="hover:text-ink">
              Contact
            </Link>
            <Link href="/admin" className="hover:text-ink">
              Admin
            </Link>
            <Link href="/#cities" className="hover:text-ink">
              Cities
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
