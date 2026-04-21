export default function PublicRouteLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14" aria-busy="true" aria-label="Loading page">
      <div className="animate-pulse space-y-8">
        <div className="space-y-3">
          <div className="h-10 w-2/3 max-w-md rounded-md bg-[var(--color-line)]" />
          <div className="h-4 w-full max-w-xl rounded bg-[var(--color-line)]" />
          <div className="h-4 w-4/5 max-w-lg rounded bg-[var(--color-line)]" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-52 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
