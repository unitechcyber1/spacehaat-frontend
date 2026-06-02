import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { listCities } from "@/services/mock-db";
import { verticals } from "@/utils/constants";

const DEFAULT_FOOTER_LEAD =
  "A premium discovery platform to compare coworking spaces, virtual offices, and office spaces across India.";

const FOOTER_BG = "#f9f8f5";

export function Footer() {
  const cities = listCities().slice(0, 4);

  return (
    <footer
      className="relative overflow-hidden border-t border-slate-900/[0.06]"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(76, 175, 80, 0.07), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent"
        aria-hidden
      />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))] lg:gap-10 xl:gap-14">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center transition-opacity hover:opacity-85"
              aria-label="SpaceHaat — home"
            >
              <span className="relative block h-10 w-[11.5rem] sm:h-11 sm:w-[13rem]">
                <Image
                  src="/spacehaat-logo.png"
                  alt="SpaceHaat"
                  fill
                  className="object-contain object-left"
                  sizes="208px"
                  priority={false}
                />
              </span>
            </Link>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-slate-600">{DEFAULT_FOOTER_LEAD}</p>
          </div>

          <nav aria-label="Services">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Services
            </p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {verticals.map((vertical) => (
                <li key={vertical.key}>
                  <Link
                    href={vertical.href}
                    className="text-[0.9375rem] font-medium text-slate-700 transition hover:text-ink"
                  >
                    {vertical.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Top cities">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Cities
            </p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {cities.map((city) => (
                <li key={city.id}>
                  <Link
                    href={`/coworking/${city.slug}`}
                    className="text-[0.9375rem] font-medium text-slate-700 transition hover:text-ink"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Company
            </p>
            <ul className="mt-5 flex flex-col gap-3.5">
              <li>
                <Link href="/" className="text-[0.9375rem] font-medium text-slate-700 transition hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#lead-form"
                  className="text-[0.9375rem] font-medium text-slate-700 transition hover:text-ink"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[0.9375rem] font-medium text-slate-700 transition hover:text-ink">
                  Admin
                </Link>
              </li>
              <li>
                <Link href="/#cities" className="text-[0.9375rem] font-medium text-slate-700 transition hover:text-ink">
                  Explore cities
                </Link>
              </li>
            </ul>
          </nav>
        </div>

      </Container>
    </footer>
  );
}
