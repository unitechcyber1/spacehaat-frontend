import type { ReactNode } from "react";

export const COLIVING_DESKTOP_TIPS: Record<string, { h: string; body: ReactNode }> = {
  basic: {
    h: "Why we ask",
    body: (
      <ul>
        <li>
          <b>Friendly names</b> like &quot;Sunrise PG&quot; rank higher in tenant searches than
          generic IDs.
        </li>
        <li>Gender match is one of the top 3 filters tenants apply.</li>
        <li>You can change the property name later — but the type is locked once published.</li>
      </ul>
    ),
  },
  location: {
    h: "Tip",
    body: (
      <p>
        An accurate map pin reduces no-shows. Drag the pin to the exact building entrance, not just
        the street.
      </p>
    ),
  },
  rooms: {
    h: "Pricing benchmark",
    body: (
      <>
        <p style={{ marginBottom: 8 }}>For your locality, average rent ranges:</p>
        <ul>
          <li>Single: ₹13k – ₹18k</li>
          <li>Double: ₹9k – ₹12k</li>
          <li>Triple: ₹6k – ₹9k</li>
        </ul>
      </>
    ),
  },
  food: {
    h: "What tenants see",
    body: (
      <p>
        Each service you toggle on becomes a labeled tag on your listing card. Including{" "}
        <b>at least one meal</b> increases inquiries.
      </p>
    ),
  },
  amenities: {
    h: "Quick win",
    body: (
      <p>
        Listings with <b>10+ amenities</b> get more views. Include everything that&apos;s actually
        available.
      </p>
    ),
  },
  rules: {
    h: "Set expectations",
    body: <p>Clear, upfront rules attract the right tenants. Most properties pick 3–5 rules.</p>,
  },
  photos: {
    h: "Photo checklist",
    body: (
      <ul>
        <li>1 hero shot of the building exterior</li>
        <li>2–3 room photos (different angles)</li>
        <li>1 bathroom photo</li>
        <li>1 common area / kitchen</li>
        <li>Daytime, natural light, landscape orientation</li>
      </ul>
    ),
  },
};
