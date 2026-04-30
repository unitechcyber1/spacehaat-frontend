import { LayoutGrid, Pencil } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Container } from "@/components/ui/container";
import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import { getVendorCoworkingListings, getVendorOfficeListings } from "@/services/listing-api";
import { getListingSession } from "@/services/listing-session";
import type { CoworkingModel } from "@/types/coworking-workspace.model";
import type { OfficeSpaceModel } from "@/types/office-space.model";
import { HostLogoutButton } from "./logout-button";

type Merged = {
  kind: "coworking" | "office";
  id: string;
  name: string;
  city: string;
  status: string;
  sortDate: number;
};

function asRecord<T extends object>(o: T) {
  return o as T & { added_on?: string };
}

function toMerged(
  w: CoworkingModel.WorkSpace,
  kind: "coworking" | "office",
): Merged {
  const id = String(w.id || (w as { _id?: string })._id || "");
  const loc = w.location;
  const cityName =
    typeof loc?.city === "object" && loc.city && "name" in loc.city
      ? String((loc.city as { name: string }).name)
      : "";
  const raw = asRecord(w);
  const added = raw.added_on ? new Date(raw.added_on).getTime() : 0;
  return {
    kind,
    id,
    name: String(w.name || "Untitled").trim() || "Untitled",
    city: cityName,
    status: String(w.status || "—"),
    sortDate: added || 0,
  };
}

export const generateMetadata = generateMetadataForPublicRoute;

export default async function HostListingsDashboardPage() {
  const session = await getListingSession();
  if (!session?.userId || !session?.token) {
    redirect("/list-your-space?reason=login-required");
  }

  const [co, of] = await Promise.all([
    getVendorCoworkingListings(session.userId, 100, session.token),
    getVendorOfficeListings(session.userId, 100, session.token),
  ]);

  const loadErr =
    !co.ok && co.status !== 401
      ? co.message || "Could not load coworking listings."
      : !of.ok && of.status !== 401
        ? of.message || "Could not load office listings."
        : null;

  if (co.status === 401 || of.status === 401) {
    redirect("/list-your-space?reason=session-expired");
  }

  const coworkingRows = (co.ok ? co.data?.data : []) ?? [];
  const officeRows = (of.ok ? of.data?.data : []) ?? [];

  const merged: Merged[] = [
    ...coworkingRows.map((w) => toMerged(w, "coworking")),
    ...officeRows.map((w) => toMerged(w as unknown as OfficeSpaceModel.OfficeSpace, "office")),
  ].sort((a, b) => b.sortDate - a.sortDate);

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
                Your listings
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink/75">
                Coworking and office spaces you have published. Open one to make changes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/add"
                className="rounded-xl border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                Add listing
              </Link>
              <HostLogoutButton />
            </div>
          </div>

          {loadErr ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
              {loadErr} Your session may be valid — try refreshing the page.
            </div>
          ) : null}

          {merged.length === 0 ? (
            <div className="mt-10 rounded-[1.5rem] border border-ink/10 bg-white p-10 text-center shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/5 text-ink/50">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <p className="mt-4 text-lg font-semibold text-ink">No listings yet</p>
              <p className="mt-1 text-sm text-ink/65">
                When you create a coworking or office listing, it will show up here.
              </p>
              <Link
                href="/add"
                className="mt-6 inline-flex rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink/90"
              >
                Create your first listing
              </Link>
            </div>
          ) : (
            <ul className="mt-8 grid gap-3">
              {merged.map((row) => (
                <li
                  key={`${row.kind}-${row.id}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-ink/10 bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-5"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                      {row.kind === "coworking" ? "Coworking" : "Office space"}
                    </p>
                    <h2 className="mt-1 truncate text-lg font-semibold text-ink">{row.name}</h2>
                    <p className="mt-0.5 text-sm text-ink/65">
                      {row.city || "—"} · {row.status}
                    </p>
                  </div>
                  <Link
                    href={
                      row.kind === "coworking"
                        ? `/add/coworking-space?edit=${encodeURIComponent(row.id)}`
                        : `/add/office-space?edit=${encodeURIComponent(row.id)}`
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-brand)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-brand)] transition hover:bg-[color:var(--color-brand-soft)]"
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </div>
  );
}
