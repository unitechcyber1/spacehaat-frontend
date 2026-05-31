"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { VirtualOfficeCatalogCity } from "@/lib/virtual-office-city-catalog";
import { VoCityLeadModal } from "@/modules/virtual-office/components/city-page/vo-city-lead-modal";

type VoCityLeadContextValue = {
  openLead: () => void;
  closeLead: () => void;
  leadModalOpen: boolean;
};

const VoCityLeadContext = createContext<VoCityLeadContextValue | null>(null);

export function useVoCityLead(): VoCityLeadContextValue {
  const ctx = useContext(VoCityLeadContext);
  if (!ctx) {
    throw new Error("useVoCityLead must be used within VoCityLeadProvider");
  }
  return ctx;
}

type VoCityLeadProviderProps = {
  children: ReactNode;
  citySlug: string;
  cityDisplay: string;
  catalog: VirtualOfficeCatalogCity;
};

export function VoCityLeadProvider({ children, citySlug, cityDisplay, catalog }: VoCityLeadProviderProps) {
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  const openLead = useCallback(() => {
    setLeadModalOpen(true);
  }, []);

  const closeLead = useCallback(() => setLeadModalOpen(false), []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href="#lead-form"]');
      if (!anchor) return;
      event.preventDefault();
      setLeadModalOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!leadModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [leadModalOpen]);

  const value = useMemo(
    () => ({ openLead, closeLead, leadModalOpen }),
    [openLead, closeLead, leadModalOpen],
  );

  return (
    <VoCityLeadContext.Provider value={value}>
      {children}
      <VoCityLeadModal
        open={leadModalOpen}
        onClose={closeLead}
        citySlug={citySlug}
        cityDisplay={cityDisplay}
        catalog={catalog}
      />
    </VoCityLeadContext.Provider>
  );
}
