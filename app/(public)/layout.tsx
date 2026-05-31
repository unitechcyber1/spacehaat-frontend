import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[color:var(--color-page-bg)]">{children}</div>
    </>
  );
}
