"use client";

import Link from "next/link";

import { formatInrPrice, getCityLowestMonthlyPrice, type VirtualOfficeCatalogCity } from "@/lib/virtual-office-city-catalog";
import { useVoCityLead } from "@/modules/virtual-office/components/city-page/vo-city-lead-context";
import { VoPrimaryButton } from "@/modules/virtual-office/components/city-page/vo-city-ui";

export function VoCityBreadcrumb({ cityDisplay }: { cityDisplay: string }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
      <Link href="/" className="hover:text-ink">
        Home
      </Link>
      <span className="opacity-50">›</span>
      <Link href="/virtual-office" className="hover:text-ink">
        Virtual Office
      </Link>
      <span className="opacity-50">›</span>
      <span className="font-medium text-ink">{cityDisplay}</span>
    </nav>
  );
}

export function VoCityMobileBar({ catalog }: { catalog: VirtualOfficeCatalogCity }) {
  const { openLead } = useVoCityLead();
  const from = getCityLowestMonthlyPrice(catalog);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2.5 border-t border-[#EAE7E0] bg-white px-3.5 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="min-w-0 flex-1 text-xs leading-snug text-[#333]">
        From <b className="text-sm font-bold text-[color:var(--color-brand)]">{formatInrPrice(from)}/mo</b>
      </div>
      <VoPrimaryButton type="button" onClick={openLead} className="shrink-0 px-4 py-2.5 text-sm">
        Get Details
      </VoPrimaryButton>
    </div>
  );
}
