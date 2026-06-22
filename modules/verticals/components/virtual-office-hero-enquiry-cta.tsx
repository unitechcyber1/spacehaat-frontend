"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { useVoCityLead } from "@/modules/virtual-office/components/city-page/vo-city-lead-context";
import { cn } from "@/utils/cn";

export function VirtualOfficeHeroEnquiryCta() {
  const { openLead } = useVoCityLead();

  return (
    <div className="lg:hidden">
      <FadeIn delay={0.22}>
        <div className="mt-3 border-t border-slate-200/50 pt-3 sm:mt-4 sm:pt-3.5">
          <p className="text-[0.8125rem] leading-snug text-slate-600">Get what you want today.</p>
          <Button
            type="button"
            onClick={openLead}
            className={cn(
              "mt-1.5 h-auto min-h-0 w-full rounded-lg px-3 py-2 text-center text-[0.8125rem] font-semibold leading-snug",
              "sm:max-w-[16rem] sm:py-2.5 sm:text-sm",
            )}
          >
            Get Virtual Office Details
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
