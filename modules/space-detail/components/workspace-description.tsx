"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/utils/cn";

/** Turn rich-text / HTML from a CMS into readable plain text with line breaks (no raw HTML in the DOM). */
function editorHtmlToPlainText(raw: string): string {
  let s = raw.trim();
  if (!s) return "";

  s = s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|tr)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");

  return s.replace(/\n{3,}/g, "\n\n").trim();
}

function looksLikeMarkup(s: string): boolean {
  return /<\/?[a-z][\s\S]*?>/i.test(s);
}

type WorkspaceDescriptionProps = {
  description: string;
  className?: string;
};

export function WorkspaceDescription({ description, className }: WorkspaceDescriptionProps) {
  const trimmed = description?.trim() ?? "";
  if (!trimmed) return null;

  const text = useMemo(
    () => (looksLikeMarkup(trimmed) ? editorHtmlToPlainText(trimmed) : trimmed),
    [trimmed],
  );

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const maxWords = 50;
  const canCollapse = words.length > maxWords;
  const [expanded, setExpanded] = useState(!canCollapse);

  const visibleText = useMemo(() => {
    if (!canCollapse || expanded) return text;
    return words.slice(0, maxWords).join(" ");
  }, [canCollapse, expanded, maxWords, text, words]);

  return (
    <div className={cn("relative text-base leading-8 text-muted", className)}>
      <p className="whitespace-pre-wrap">{visibleText}</p>

      {canCollapse && !expanded ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/85 to-transparent" />
      ) : null}

      {canCollapse ? (
        <div className={cn(!expanded ? "absolute bottom-2 left-0" : "mt-4")}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={cn(
              "pointer-events-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2",
              "text-sm font-semibold text-ink shadow-[0_10px_28px_rgba(15,23,42,0.06)]",
              "transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]/30",
            )}
          >
            <span className="relative">
              {expanded ? "See less" : "See more"}
              <span className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full bg-[color:var(--color-brand)]/40" />
            </span>
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-[color:var(--color-brand)]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[color:var(--color-brand)]" />
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
}
