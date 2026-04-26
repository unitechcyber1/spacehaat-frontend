import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { RscSyncOnPathnameChange } from "@/components/seo/rsc-sync-on-pathname-change";

/**
 * Public shell: header stays mounted; **route SEO lives in `template.tsx`** so it refreshes
 * on every client navigation. Do not add `getResolvedSeoForRequest` here.
 */
export const dynamic = "force-dynamic";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <RscSyncOnPathnameChange />
      <Header />
      {children}
    </div>
  );
}
