"use client";

import { useVoCityLead } from "@/modules/virtual-office/components/city-page/vo-city-lead-context";
import { VoPrimaryButton } from "@/modules/virtual-office/components/city-page/vo-city-ui";
import { cn } from "@/utils/cn";

export function VoLeadCtaButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { openLead } = useVoCityLead();

  return (
    <VoPrimaryButton type="button" onClick={openLead} className={cn(className)}>
      {children}
    </VoPrimaryButton>
  );
}
