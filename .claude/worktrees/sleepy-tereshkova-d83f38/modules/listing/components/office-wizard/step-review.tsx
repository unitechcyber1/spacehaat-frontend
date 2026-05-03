"use client";

import type { OfficeWizardState } from "./use-office-wizard";

type Props = {
  state: OfficeWizardState;
};

export function OfficeStepReview({ state }: Props) {
  return (
    <div className="grid gap-6">
      <p className="text-sm text-ink/70">
        One last look. Clicking <span className="font-semibold text-ink">Save listing</span> sends
        all the details below to the host backend in a single request.
      </p>

      <ReviewBlock title="Basic information">
        <Row label="Name" value={state.name} />
        <Row label="Area (sq ft)" value={state.area} />
        <Row label="Rent per sq ft" value={`₹ ${state.rent}`} />
        <Row label="Furnishing" value={state.officeType || "—"} />
        <Row
          label="Description"
          value={
            state.description.length > 260
              ? `${state.description.slice(0, 260)}…`
              : state.description
          }
        />
        <Row
          label="Amenities"
          value={
            state.amenities.length
              ? state.amenities.map((a) => a.name).join(", ")
              : "None selected"
          }
        />
      </ReviewBlock>

      <ReviewBlock title="Location">
        <Row label="City" value={state.location.cityName || "—"} />
        <Row label="Micro-location" value={state.location.microLocationName || "—"} />
        <Row label="Address" value={state.location.address || "—"} />
        <Row label="Metro landmark" value={state.location.metroLandmark || "—"} />
        <Row label="Near-by landmark" value={state.location.nearByLandmark || "—"} />
      </ReviewBlock>

      <ReviewBlock title="Gallery">
        <Row label="Photos" value={`${state.images.length} uploaded`} />
        {state.images.length > 0 ? (
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {state.images.slice(0, 6).map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={img.url}
                alt={`Photo ${i + 1}`}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            ))}
          </div>
        ) : null}
      </ReviewBlock>
    </div>
  );
}

function ReviewBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-ink/10 bg-cream/40 p-4 sm:p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/70">
        {title}
      </h3>
      <div className="mt-3 grid gap-2">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-4 text-sm">
      <span className="text-ink/60">{label}</span>
      <span className="font-medium text-ink break-words">{value}</span>
    </div>
  );
}
