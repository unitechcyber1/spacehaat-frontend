"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type CoworkingLeadQuizContextValue = {
  open: boolean;
  presetNeed: string | null;
  openQuiz: () => void;
  closeQuiz: () => void;
  pickPlan: (planName: string) => void;
  focusLeadForm: () => void;
  consumePresetNeed: () => string | null;
  registerReset: (fn: () => void) => void;
};

const CoworkingLeadQuizContext = createContext<CoworkingLeadQuizContextValue | null>(null);

export function CoworkingLeadQuizProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presetNeed, setPresetNeed] = useState<string | null>(null);
  const resetRef = useRef<(() => void) | null>(null);

  const openQuiz = useCallback(() => setOpen(true), []);
  const closeQuiz = useCallback(() => setOpen(false), []);

  const registerReset = useCallback((fn: () => void) => {
    resetRef.current = fn;
  }, []);

  const pickPlan = useCallback((planName: string) => {
    resetRef.current?.();
    setPresetNeed(planName);
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setOpen(true);
    }
  }, []);

  const focusLeadForm = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setOpen(true);
    }
  }, []);

  const consumePresetNeed = useCallback(() => {
    const value = presetNeed;
    if (value) setPresetNeed(null);
    return value;
  }, [presetNeed]);

  const value = useMemo(
    () => ({
      open,
      presetNeed,
      openQuiz,
      closeQuiz,
      pickPlan,
      focusLeadForm,
      consumePresetNeed,
      registerReset,
    }),
    [open, presetNeed, openQuiz, closeQuiz, pickPlan, focusLeadForm, consumePresetNeed, registerReset],
  );

  return (
    <CoworkingLeadQuizContext.Provider value={value}>{children}</CoworkingLeadQuizContext.Provider>
  );
}

export function useCoworkingLeadQuiz() {
  const ctx = useContext(CoworkingLeadQuizContext);
  if (!ctx) {
    throw new Error("useCoworkingLeadQuiz must be used within CoworkingLeadQuizProvider");
  }
  return ctx;
}
