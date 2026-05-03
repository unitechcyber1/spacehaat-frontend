"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/utils/cn";

export type AsyncOption = { value: string; label: string };

type FetchResult<TMeta = unknown> = {
  options: AsyncOption[];
  /** Optional metadata surfaced to consumers (e.g. totalRecords). */
  meta?: TMeta;
};

type AsyncSearchSelectProps = {
  /** Currently selected option id (`""` when nothing is selected). */
  value: string;
  /**
   * The display label for the selected value. Needed because the list of
   * options is ephemeral (we drop it once the dropdown closes) but the
   * input chip still needs to show the selected city name on page refresh.
   */
  selectedLabel?: string;
  onChange: (option: AsyncOption | null) => void;

  /**
   * Called with the current search query (debounced). Must return options
   * plus optional metadata. When the user has not typed anything, `query`
   * is `""` — use this to load the initial page.
   */
  fetcher: (query: string, signal: AbortSignal) => Promise<FetchResult>;

  placeholder?: string;
  disabled?: boolean;

  /** Debounce for the search input (ms). Defaults to 300 ms. */
  debounceMs?: number;
  /** Message shown when the fetcher returns 0 options. */
  noResultsText?: string;
  /** Optional line shown under the options (e.g. "Showing 10 of 24"). */
  footerText?: string;
};

/**
 * Headless combobox: a text input that opens a dropdown and proxies every
 * keystroke through a caller-provided async `fetcher`. Used for the city
 * select which hits `/api/admin/city/getCityByCountryOnly/:id?name=...`.
 */
export function AsyncSearchSelect({
  value,
  selectedLabel,
  onChange,
  fetcher,
  placeholder = "Search…",
  disabled,
  debounceMs = 300,
  noResultsText = "No matches.",
  footerText,
}: AsyncSearchSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<AsyncOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Reset the input when the selected value is externally cleared.
  useEffect(() => {
    if (!value) setQuery("");
  }, [value]);

  // Debounced fetch whenever the dropdown is open + query changes.
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);
      fetcher(query.trim(), controller.signal)
        .then((result) => {
          if (controller.signal.aborted) return;
          setOptions(result.options);
          setActiveIndex(result.options.length > 0 ? 0 : -1);
        })
        .catch((e: unknown) => {
          if (controller.signal.aborted) return;
          setError(e instanceof Error ? e.message : "Search failed.");
          setOptions([]);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [open, query, debounceMs, fetcher]);

  // Close on click outside.
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const commit = useCallback(
    (opt: AsyncOption) => {
      onChange(opt);
      setQuery(opt.label);
      setOpen(false);
    },
    [onChange],
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (open && activeIndex >= 0 && options[activeIndex]) {
        e.preventDefault();
        commit(options[activeIndex]!);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const displayValue = useMemo(() => {
    if (open) return query;
    return selectedLabel ?? query;
  }, [open, query, selectedLabel]);

  return (
    <div ref={rootRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={() => {
          if (disabled) return;
          setOpen(true);
          setQuery("");
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!open) setOpen(true);
          // Typing a new query invalidates the current selection.
          if (value) onChange(null);
        }}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        className={cn(
          "h-11 w-full rounded-xl border px-4 text-base text-ink outline-none transition placeholder:text-ink/40",
          "border-ink/15 bg-white focus:border-ink/40",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      />

      {value && !open ? (
        <button
          type="button"
          aria-label="Clear selection"
          onClick={() => {
            onChange(null);
            setQuery("");
            inputRef.current?.focus();
          }}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink disabled:opacity-40"
        >
          ✕
        </button>
      ) : null}

      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-72 overflow-auto rounded-xl border border-ink/10 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.12)]"
        >
          {loading ? (
            <div className="px-4 py-3 text-sm text-ink/60">Searching…</div>
          ) : error ? (
            <div className="px-4 py-3 text-sm text-red-600">{error}</div>
          ) : options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-ink/60">{noResultsText}</div>
          ) : (
            <ul className="divide-y divide-ink/5">
              {options.map((opt, idx) => {
                const isActive = idx === activeIndex;
                const isSelected = opt.value === value;
                return (
                  <li key={opt.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        // prevent input blur before the click fires
                        e.preventDefault();
                      }}
                      onClick={() => commit(opt)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition",
                        isActive && "bg-ink/5",
                        isSelected && "font-semibold text-ink",
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected ? (
                        <span aria-hidden className="text-ink/60">✓</span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {footerText && !loading && !error && options.length > 0 ? (
            <div className="border-t border-ink/10 px-4 py-2 text-[11px] uppercase tracking-wider text-ink/50">
              {footerText}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
