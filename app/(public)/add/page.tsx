import Link from "next/link";
import { LayoutGrid } from "lucide-react";

import { Container } from "@/components/ui/container";
import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import { getVendorCoworkingListings, getVendorOfficeListings } from "@/services/listing-api";
import { getListingSession } from "@/services/listing-session";

const VERTICALS = [
  {
    href: "/add/coworking-space",
    title: "Coworking Space",
    description:
      "List shared workspaces, private cabins, day passes, meeting rooms, and flexible seats.",
  },
  {
    href: "/add/office-space",
    title: "Office Space",
    description:
      "List managed / leased office inventory with rent per sq ft, furnishing type and area details.",
  },
] as const;

export const generateMetadata = generateMetadataForPublicRoute;

export default async function AddVerticalChooserPage() {
  const session = await getListingSession();
  let hasListings = false;
  if (session?.userId && session?.token) {
    const [c, o] = await Promise.all([
      getVendorCoworkingListings(session.userId, 1, session.token),
      getVendorOfficeListings(session.userId, 1, session.token),
    ]);
    if (c.ok && Array.isArray(c.data?.data) && c.data.data.length > 0) {
      hasListings = true;
    }
    if (o.ok && Array.isArray(o.data?.data) && o.data.data.length > 0) {
      hasListings = true;
    }
  }

  return (
    <div className="bg-cream">
      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/60">
                SpaceHaat Host Panel
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                What would you like to list?
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/75">
                Pick a vertical to continue. You can always come back and add more listings later.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {hasListings ? (
                <Link
                  href="/add/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-brand)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-brand)] transition hover:bg-[color:var(--color-brand-soft)]"
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden />
                  Dashboard
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {VERTICALS.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="group rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_18px_60px_rgba(0,0,0,0.1)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/60">
                  Add listing
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  Continue
                  <span
                    aria-hidden
                    className="transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
