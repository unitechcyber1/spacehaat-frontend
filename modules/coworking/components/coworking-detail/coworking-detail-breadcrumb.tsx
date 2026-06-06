import Link from "next/link";

import type { CoworkingModel } from "@/types/coworking-workspace.model";
import { toTitleCase } from "@/utils/format";

export function CoworkingDetailBreadcrumb({ workspace }: { workspace: CoworkingModel.WorkSpace }) {
  const citySlug =
    workspace.location?.city?.name?.trim().toLowerCase().replace(/\s+/g, "-") || "city";
  const cityLabel = toTitleCase(workspace.location?.city?.name || citySlug);
  const micro = workspace.location?.micro_location?.name?.trim();
  const microSlug = micro?.toLowerCase().replace(/\s+/g, "-");

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 py-4 text-[13.5px] text-muted sm:py-5 sm:pb-[18px]"
    >
      <Link href="/" className="hover:text-[color:var(--color-brand)]">
        Home
      </Link>
      <span className="opacity-50">/</span>
      <Link href="/coworking" className="hover:text-[color:var(--color-brand)]">
        Coworking
      </Link>
      <span className="opacity-50">/</span>
      <Link href={`/coworking/${citySlug}`} className="hover:text-[color:var(--color-brand)]">
        {cityLabel}
      </Link>
      {micro && microSlug ? (
        <>
          <span className="opacity-50">/</span>
          <Link
            href={`/coworking/${citySlug}/${microSlug}`}
            className="hover:text-[color:var(--color-brand)]"
          >
            {toTitleCase(micro)}
          </Link>
        </>
      ) : null}
      <span className="opacity-50">/</span>
      <span className="font-semibold text-[#3b4048]">{workspace.name}</span>
    </nav>
  );
}
