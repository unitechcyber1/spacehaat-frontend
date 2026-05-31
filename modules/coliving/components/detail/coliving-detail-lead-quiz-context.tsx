"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ColivingLeadQuizContextValue = {
  open: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  setOpen: (open: boolean) => void;
};

const ColivingLeadQuizContext = createContext<ColivingLeadQuizContextValue | null>(null);

export function ColivingLeadQuizProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openQuiz = useCallback(() => setOpen(true), []);
  const closeQuiz = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openQuiz, closeQuiz, setOpen }),
    [open, openQuiz, closeQuiz],
  );

  return <ColivingLeadQuizContext.Provider value={value}>{children}</ColivingLeadQuizContext.Provider>;
}

export function useColivingLeadQuiz() {
  const ctx = useContext(ColivingLeadQuizContext);
  if (!ctx) {
    throw new Error("useColivingLeadQuiz must be used within ColivingLeadQuizProvider");
  }
  return ctx;
}
