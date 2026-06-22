"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ColivingLeadQuizContextValue = {
  open: boolean;
  shaking: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  focusLeadQuiz: () => void;
};

const ColivingLeadQuizContext = createContext<ColivingLeadQuizContextValue | null>(null);

const SHAKE_MS = 720;

function isDesktopViewport() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
}

export function ColivingLeadQuizProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [shaking, setShaking] = useState(false);

  const openQuiz = useCallback(() => setOpen(true), []);
  const closeQuiz = useCallback(() => setOpen(false), []);

  const focusLeadQuiz = useCallback(() => {
    if (isDesktopViewport()) {
      document.getElementById("booking-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduceMotion) {
        setShaking(true);
        window.setTimeout(() => setShaking(false), SHAKE_MS);
      }
      return;
    }
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ open, shaking, openQuiz, closeQuiz, focusLeadQuiz }),
    [open, shaking, openQuiz, closeQuiz, focusLeadQuiz],
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
