import Link from "next/link";

import { Container } from "@/components/ui/container";
import {
  footerAbout,
  footerBottomKeywordLinks,
  footerBottomTagline,
  footerColiving,
  footerCompany,
  footerCoworkingByCity,
  footerCoworkingGurugramAreas,
  footerMeetingRooms,
  footerOfficeSpace,
  footerVirtualOffice,
} from "@/components/layout/footer-data";
import { cn } from "@/utils/cn";

const FOOTER_BG = "#f9f8f5";

const linkClass =
  "block text-sm leading-snug text-slate-600 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f8f5]";

const groupTitleClass =
  "text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500";

function VerticalLinkList({
  items,
}: {
  items: readonly { label: string; href: string }[];
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item.href + item.label}>
          <Link href={item.href} className={linkClass}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Structured SEO + navigation block — vertical link lists by vertical.
 * Renders **below** CMS `SeoFooterContentSection` (horizontal city paragraphs) and above the compact `Footer`.
 */
export function FooterMarketingSection() {
  const year = new Date().getFullYear();

  return (
    <section
      className="border-t border-slate-200/80"
      style={{ backgroundColor: FOOTER_BG }}
      aria-label="SpaceHaat workspace links"
    >
      <Container className="py-12 sm:py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-12 xl:grid-cols-4">
          {/* Column 1 — About (full width on tablet, then first column on xl) */}
          <div className="max-w-xl md:col-span-2 xl:col-span-1 xl:max-w-none">
            <h2 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
              {footerAbout.title}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
              {footerAbout.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Column 2 — Coworking */}
          <nav aria-label="Coworking spaces by city and area">
            <div>
              <p className={groupTitleClass}>Coworking by City</p>
              <div className="mt-4">
                <VerticalLinkList items={footerCoworkingByCity} />
              </div>
            </div>
            <div className="mt-10">
              <p className={groupTitleClass}>Coworking by Area (Gurugram)</p>
              <div className="mt-4">
                <VerticalLinkList items={footerCoworkingGurugramAreas} />
              </div>
            </div>
          </nav>

          {/* Column 3 — Virtual office, coliving, office space, meeting rooms */}
          <nav aria-label="Virtual office, coliving, and office space">
            <div>
              <p className={groupTitleClass}>Virtual Office</p>
              <div className="mt-4">
                <VerticalLinkList items={footerVirtualOffice} />
              </div>
            </div>
            <div className="mt-10">
              <p className={groupTitleClass}>Coliving & PG</p>
              <div className="mt-4">
                <VerticalLinkList items={footerColiving} />
              </div>
            </div>
            <div className="mt-10">
              <p className={groupTitleClass}>Office Space</p>
              <div className="mt-4">
                <VerticalLinkList items={footerOfficeSpace} />
              </div>
            </div>
            <div className="mt-10">
              <p className={groupTitleClass}>Meeting Rooms</p>
              <div className="mt-4">
                <VerticalLinkList items={footerMeetingRooms} />
              </div>
            </div>
          </nav>

          {/* Column 4 — Company */}
          <nav aria-label="Company">
            <p className={groupTitleClass}>Company</p>
            <div className="mt-4">
              <VerticalLinkList items={footerCompany} />
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-200/80 pt-8 sm:mt-14 sm:pt-10">
          <div className="flex flex-col gap-4 text-xs leading-relaxed text-slate-500 sm:gap-5 sm:text-sm">
            <p>
              <span className="text-slate-600">
                © {year} SpaceHaat. All rights reserved.
              </span>
              <span className="mx-2 text-slate-400" aria-hidden>
                |
              </span>
              <span>{footerBottomTagline}</span>
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[0.8125rem] text-slate-500 sm:text-xs">
              {footerBottomKeywordLinks.map((kw, i) => (
                <span key={kw.href} className="inline-flex items-center gap-2">
                  {i > 0 ? (
                    <span className="text-slate-300" aria-hidden>
                      |
                    </span>
                  ) : null}
                  <Link
                    href={kw.href}
                    className={cn(
                      "font-medium text-slate-600 underline-offset-2 transition hover:text-ink hover:underline",
                    )}
                  >
                    {kw.label}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
