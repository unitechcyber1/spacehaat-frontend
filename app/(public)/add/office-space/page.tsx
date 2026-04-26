import Link from "next/link";

import { Container } from "@/components/ui/container";
import { OfficeWizard } from "@/modules/listing/components/office-wizard";
import { getListingSession } from "@/services/listing-session";

export default async function AddOfficeSpacePage() {
  const session = await getListingSession();

  return (
    <div className="bg-cream">
      <Container className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/60">
                SpaceHaat Host Panel
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Add Office Space
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/add"
                className="rounded-xl border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                Change vertical
              </Link>
              <Link
                href="/add/coworking-space"
                className="rounded-xl border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                Add Coworking Space
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                Home
              </Link>
            </div>
          </div>

          <OfficeWizard userName={session?.name} />
        </div>
      </Container>
    </div>
  );
}
