"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";

export function LfField({
  label,
  helper,
  children,
  error,
}: {
  label?: string;
  helper?: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div className="lf-field">
      {label ? <label className="lf-label">{label}</label> : null}
      {children}
      {error ? (
        <div className="lf-helper" style={{ color: "var(--c-danger)" }}>
          {error}
        </div>
      ) : null}
      {helper && !error ? <div className="lf-helper">{helper}</div> : null}
    </div>
  );
}

export function LfSeg({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="lf-seg">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={value === o ? "selected" : ""}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function LfYesNo({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="lf-yesno">
      <div>
        <div className="lf-yesno-label">{label}</div>
        {hint ? (
          <div className="lf-helper" style={{ marginTop: 2 }}>
            {hint}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        className={`lf-switch ${value ? "on" : ""}`}
        onClick={() => onChange(!value)}
        aria-pressed={value}
      />
    </div>
  );
}

export function LfPills({
  value,
  options,
  onChange,
  multi = true,
}: {
  value: string | string[];
  options: readonly string[] | string[];
  onChange: (v: string | string[]) => void;
  multi?: boolean;
}) {
  const sel = multi ? (value as string[]) || [] : value;
  const toggle = (o: string) => {
    if (multi) {
      const cur = (sel as string[]) || [];
      onChange(cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]);
    } else {
      onChange(o);
    }
  };
  return (
    <div className="lf-pills">
      {options.map((o) => {
        const on = multi ? (sel as string[]).includes(o) : sel === o;
        return (
          <button
            key={o}
            type="button"
            className={`lf-pill ${on ? "selected" : ""}`}
            onClick={() => toggle(o)}
          >
            {on ? <Check size={12} strokeWidth={3} /> : null}
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function LfMoney({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="lf-money-wrap">
      <div className="lf-money-pre">₹</div>
      <input
        type="text"
        inputMode="numeric"
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9,]/g, ""))}
      />
    </div>
  );
}

export function LfAmenGrid({
  list,
  value,
  onChange,
}: {
  list: { k: string; icon: ReactNode }[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const sel = value || [];
  const toggle = (k: string) =>
    onChange(sel.includes(k) ? sel.filter((x) => x !== k) : [...sel, k]);
  return (
    <div className="lf-amen-grid">
      {list.map(({ k, icon }) => {
        const on = sel.includes(k);
        return (
          <button
            key={k}
            type="button"
            className={`lf-amen ${on ? "selected" : ""}`}
            onClick={() => toggle(k)}
          >
            <div className="lf-amen-icon">{icon}</div>
            <div className="lf-amen-label">{k}</div>
            <span className="lf-amen-check">
              <Check size={10} strokeWidth={3} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
