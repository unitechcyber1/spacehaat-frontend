"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HostLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onLogout() {
    if (busy) return;
    setBusy(true);
    try {
      await fetch("/api/user/vendorLogout", { method: "POST", credentials: "include" });
    } finally {
      router.push("/list-your-space");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" aria-hidden />
      {busy ? "Logging out..." : "Logout"}
    </button>
  );
}

