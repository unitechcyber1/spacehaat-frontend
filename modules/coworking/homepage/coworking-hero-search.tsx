"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import type { SearchOption } from "@/types";
import { cn } from "@/utils/cn";

type CoworkingHeroSearchProps = {
  cities: SearchOption[];
  className?: string;
};

export function CoworkingHeroSearch({ cities, className }: CoworkingHeroSearchProps) {
  const router = useRouter();
  const [city, setCity] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const match = cities.find((c) => c.value === city);
    const slug = match?.value ?? city.trim().toLowerCase().replace(/\s+/g, "-");
    if (!slug) return;
    router.push(`/coworking/${slug}`);
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "flex max-w-[680px] flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-[0_24px_56px_rgba(15,23,42,0.10),0_8px_18px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:gap-2.5 sm:p-2 sm:pl-5",
        className,
      )}
    >
      <select
        aria-label="City"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="min-w-0 flex-1 cursor-pointer border-0 bg-transparent py-3 text-[15px] font-medium text-ink outline-none sm:py-3.5"
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full shrink-0 rounded-[11px] bg-[color:var(--color-brand)] px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[color:var(--color-accent)] sm:w-auto sm:py-3.5"
      >
        Search Spaces
      </button>
    </form>
  );
}
