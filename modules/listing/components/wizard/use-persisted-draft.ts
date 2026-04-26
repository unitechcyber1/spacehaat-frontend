"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Persists a wizard draft (state + current step) to `localStorage` so that
 * refreshing the page does not wipe the user's progress.
 *
 * - Hydration runs in `useEffect` to avoid SSR / hydration mismatches. The
 *   first render therefore shows the default state; the saved draft is then
 *   pulled in on the client and the wizard re-renders with it.
 * - `setState` / `setStepIndex` are wired to the caller-supplied setters.
 * - Consumers should call `clearDraft()` after a successful submit.
 */
export function usePersistedDraft<T>(args: {
  storageKey: string;
  state: T;
  setState: (next: T) => void;
  stepIndex: number;
  setStepIndex: (next: number) => void;
  /** Return a draft-safe projection of the state (e.g. strip transient fields). */
  serialize?: (state: T) => unknown;
  /** Called with the hydrated state before it is pushed to setState. */
  onHydrate?: (hydrated: T) => void;
}): { hydrated: boolean; clearDraft: () => void } {
  const { storageKey, state, setState, stepIndex, setStepIndex, serialize, onHydrate } =
    args;

  const [hydrated, setHydrated] = useState(false);
  // Keep the latest setters in refs so the mount-only effect stays stable.
  const setStateRef = useRef(setState);
  const setStepIndexRef = useRef(setStepIndex);
  const onHydrateRef = useRef(onHydrate);
  useEffect(() => {
    setStateRef.current = setState;
    setStepIndexRef.current = setStepIndex;
    onHydrateRef.current = onHydrate;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          state?: T;
          stepIndex?: number;
        } | null;
        if (parsed?.state) {
          onHydrateRef.current?.(parsed.state);
          setStateRef.current(parsed.state);
        }
        if (typeof parsed?.stepIndex === "number" && parsed.stepIndex >= 0) {
          setStepIndexRef.current(parsed.stepIndex);
        }
      }
    } catch {
      // Ignore malformed drafts — we'll overwrite them on the next save.
    } finally {
      setHydrated(true);
    }
    // intentionally only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    if (typeof window === "undefined") return;
    try {
      const snapshot = serialize ? serialize(state) : state;
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ state: snapshot, stepIndex }),
      );
    } catch {
      // Storage may be full or disabled; silently ignore.
    }
  }, [hydrated, state, stepIndex, storageKey, serialize]);

  function clearDraft() {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // noop
    }
  }

  return { hydrated, clearDraft };
}
