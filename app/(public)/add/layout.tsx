import type { ReactNode } from "react";

/** Prevents wide host flows (wizard chrome, grids) from causing page-level horizontal scroll. */
export default function AddLayout({ children }: { children: ReactNode }) {
  return <div className="min-w-0 overflow-x-hidden">{children}</div>;
}
