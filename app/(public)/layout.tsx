import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { PublicContentShell } from "@/components/layout/public-content-shell";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <PublicContentShell>{children}</PublicContentShell>
    </>
  );
}
