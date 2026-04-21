import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-line bg-white p-10 text-center shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            404
          </p>
          <h1 className="mt-4 font-display text-5xl text-ink">Page not found</h1>
          <p className="mt-4 text-muted">
            This route shell is ready, but the requested workspace path doesn&apos;t
            exist in the current dataset.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/">Back to home</Button>
          </div>
          <p className="mt-4 text-sm text-muted">
            <Link href="/coworking" className="underline underline-offset-4">
              Browse coworking
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
