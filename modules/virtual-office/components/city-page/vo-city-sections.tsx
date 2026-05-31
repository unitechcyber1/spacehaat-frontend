"use client";

import {
  formatInrPrice,
  getVirtualOfficePlanPrices,
  locationBadgeAt,
  type VirtualOfficeCatalogCity,
} from "@/lib/virtual-office-city-catalog";
import { VoCityEnquiryBanner } from "@/modules/virtual-office/components/city-page/vo-city-enquiry-banner";
import { VoCityLocationCard } from "@/modules/virtual-office/components/city-page/vo-city-location-card";
import {
  VoEyebrow,
  VoGhostButton,
  VoPrimaryButton,
  VoSection,
  VoSectionSub,
  VoSectionTitle,
} from "@/modules/virtual-office/components/city-page/vo-city-ui";
import { VoCityExplainerDiagram } from "@/modules/virtual-office/components/city-page/vo-city-explainer-diagram";
import { VoLeadCtaButton } from "@/modules/virtual-office/components/city-page/vo-lead-cta-button";

type VoCitySectionsProps = {
  citySlug: string;
  cityDisplay: string;
  catalog: VirtualOfficeCatalogCity;
};

export function VoCityExplainerSection() {
  return (
    <VoSection>
      <VoEyebrow>What you actually get</VoEyebrow>
      <VoSectionTitle>More Than Just an Address</VoSectionTitle>
      <VoSectionSub className="mt-3">
        A virtual office is a complete compliance package — every document Indian regulators need, plus
        the day‑to‑day services of a physical office.
      </VoSectionSub>

      <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="relative mx-auto aspect-square w-full max-w-[min(100%,520px)] rounded-[24px] border border-[#EAE7E0] bg-white p-7 shadow-[0_8px_30px_rgba(20,20,20,0.06)] sm:max-w-[520px] sm:p-8 lg:mx-0 lg:max-w-none lg:min-h-[480px]">
          <VoCityExplainerDiagram className="h-full min-h-[360px] w-full sm:min-h-[400px] lg:min-h-[440px]" />
        </div>

        <div className="flex flex-col gap-3.5">
          {[
            {
              title: "Not a PO Box",
              body: "A commercial‑grade address issued by a registered business centre. GST officers verify it. Banks accept it.",
            },
            {
              title: "Not a shared mailbox",
              body: "Your business name on the door. Your documents. Your GSTIN. Cleanly separated from other tenants.",
            },
            {
              title: "Not just for startups",
              body: "Enterprises use virtual offices to establish presence in new cities without long leases.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[14px] border border-[#EAE7E0] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(20,20,20,0.06)]"
            >
              <h3 className="text-[17px] font-semibold text-ink">
                <span className="mr-1 font-bold text-[color:var(--color-brand)]">Not</span>
                {item.title.replace(/^Not /, "")}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#555]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </VoSection>
  );
}

export function VoCityWhySection({ cityDisplay }: { cityDisplay: string }) {
  const items = [
    {
      title: "Business hub advantage",
      body: `${cityDisplay} hosts major corporates, startups, and enterprise operations — a credible address for clients and regulators.`,
    },
    {
      title: "GST-ready documentation",
      body: "NOC, rent agreement, and utility bills issued by verified operators — aligned with GST portal requirements.",
    },
    {
      title: "Faster setup",
      body: "Digital KYC and document turnaround in 24–72 hours so you can file GST or company registration sooner.",
    },
    {
      title: "Premium perception",
      body: `A ${cityDisplay} address on invoices and your website signals institutional credibility to investors and buyers.`,
    },
    {
      title: "Strong connectivity",
      body: "Metro-linked commercial zones make client visits and compliance verification smoother.",
    },
    {
      title: "Built for scale",
      body: "Start with a virtual office, upgrade to coworking or private office when your team needs physical space.",
    },
  ];

  return (
    <section className="py-10 sm:py-12">
      <div className="overflow-hidden rounded-3xl bg-[#1A1A1A] px-5 py-12 sm:px-10 sm:py-16">
        <VoEyebrow className="text-[#7AC97D] [&>span]:bg-[#7AC97D]">{cityDisplay} advantage</VoEyebrow>
        <h2 className="font-display text-[1.65rem] font-bold leading-tight tracking-[-0.025em] text-white sm:text-[2.125rem]">
          Why a {cityDisplay} Address Gives Your Business an Edge
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {items.map((item, i) => (
            <div key={item.title} className="flex gap-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[rgba(76,175,80,0.3)] bg-[rgba(76,175,80,0.14)] text-sm font-bold text-[#7AC97D]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#bdb8ae]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VoCityPlansSection({ cityDisplay, catalog }: { cityDisplay: string; catalog: VirtualOfficeCatalogCity }) {
  const prices = getVirtualOfficePlanPrices(catalog);

  const plans = [
    {
      name: "Business Address",
      price: prices.businessAddress,
      best: "Best for: mailing address, website & visiting cards.",
      featured: false,
      rows: [
        ["Documents", "NOC + Agreement"],
        ["GST registration", "✗ Not included", false],
        ["Company registration", "✗", false],
        ["Mail handling", "✓", true],
        ["Turnaround", "24–48 hrs"],
      ] as const,
    },
    {
      name: "GST Registration",
      price: prices.gstRegistration,
      best: `Best for: businesses needing GST registration in ${cityDisplay}.`,
      featured: true,
      rows: [
        ["Documents", "NOC + Agreement + Utility Bill"],
        ["GST registration", "✓ Included", true],
        ["Company registration", "✗", false],
        ["Mail handling", "✓", true],
        ["Turnaround", "48–72 hrs"],
      ] as const,
    },
    {
      name: "Company Registration",
      price: prices.companyRegistration,
      best: "Best for: Pvt Ltd, LLP, OPC registration.",
      featured: false,
      rows: [
        ["Documents", "NOC + Agreement + Utility + ROC NOC"],
        ["GST registration", "✓ Included", true],
        ["Company registration", "✓ Included", true],
        ["Mail handling", "✓", true],
        ["Turnaround", "3–5 working days"],
      ] as const,
    },
  ];

  return (
    <VoSection id="plans">
      <VoEyebrow>Pricing &amp; plans</VoEyebrow>
      <VoSectionTitle>Choose Your Virtual Office Plan</VoSectionTitle>
      <VoSectionSub className="mt-3">
        All plans include compliance documents and operator support for verification where applicable.
      </VoSectionSub>

      <div className="vo-plans-scroll mt-6 flex gap-3 overflow-x-auto pb-2 lg:mt-8 lg:gap-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:rounded-[20px] lg:border lg:border-[#EAE7E0] lg:pb-0">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex min-w-[70%] shrink-0 snap-start flex-col rounded-2xl border border-[#EAE7E0] bg-white p-4 sm:min-w-[60%] sm:p-5 lg:min-w-0 lg:rounded-none lg:border-0 lg:border-r lg:last:border-r-0 ${
              plan.featured ? "bg-gradient-to-b from-[#EDF7EE] to-white lg:from-[#FFF7F2]" : ""
            }`}
          >
            {plan.featured ? (
              <span className="absolute right-4 top-4 rounded-md bg-[color:var(--color-brand)] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                Most Popular
              </span>
            ) : null}
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">{plan.name}</p>
            <p className="mt-2 font-display text-[2rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[2.25rem]">
              <span className="mb-1 block text-[13px] font-medium text-muted">From</span>
              {formatInrPrice(plan.price)}
              <span className="text-base font-medium text-muted">/mo</span>
            </p>
            <p className="mt-2 min-h-[34px] text-[13px] leading-snug text-[#444] sm:min-h-[42px] sm:text-sm">
              {plan.best}
            </p>
            <div className="mt-4 flex-1 border-t border-[#EAE7E0] pt-3 sm:mt-5 sm:pt-4">
              {plan.rows.map(([label, value, yes]) => (
                <div
                  key={label}
                  className="flex justify-between gap-3 border-b border-dashed border-[#EAE7E0] py-1.5 text-[13px] last:border-0 sm:py-2 sm:text-[13.5px]"
                >
                  <span className="font-medium text-muted">{label}</span>
                  <span
                    className={
                      yes === true
                        ? "font-semibold text-emerald-600"
                        : yes === false
                          ? "font-semibold text-[#bbb]"
                          : "font-medium text-ink"
                    }
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <VoLeadCtaButton className="mt-5 w-full sm:mt-6">Enquire for This Plan</VoLeadCtaButton>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-[14px] border border-[#EAE7E0] bg-white px-4 py-3.5 text-sm text-[#555]">
        ✓ Prices are pre‑GST. Add 18% GST at checkout. Annual or quarterly billing available.
      </p>
    </VoSection>
  );
}

export function VoCityLocationsSection({ cityDisplay, catalog }: VoCitySectionsProps) {
  const locations = catalog.locations;

  return (
    <VoSection id="locations">
      <VoEyebrow>Where you can register</VoEyebrow>
      <VoSectionTitle>Prime {cityDisplay} Addresses Available</VoSectionTitle>
      <VoSectionSub className="mt-3">
        Every listed address is in a registered commercial building — pre‑vetted for GST acceptance.
      </VoSectionSub>

      <div className="vo-loc-scroll mt-6 flex gap-2.5 overflow-x-auto pb-2 lg:mt-8 lg:gap-5 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
        {locations.map((loc, index) => {
          const badge = locationBadgeAt(index);
          const wide = index === locations.length - 1 && locations.length % 2 === 1;

          return (
            <VoCityLocationCard
              key={loc.locality}
              locality={loc}
              cityDisplay={cityDisplay}
              badge={badge}
              wide={wide}
            />
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-[#EAE7E0] bg-white px-6 py-7 text-center">
        <h3 className="text-xl font-semibold text-ink">Can&apos;t decide? We&apos;ll shortlist for you — free.</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Our consultants match your business type and GST goals to the best address. No brokerage.
        </p>
        <VoLeadCtaButton className="mt-5">Talk to an Expert</VoLeadCtaButton>
      </div>
    </VoSection>
  );
}

export function VoCityTimelineSection() {
  const steps = [
    { title: "Choose Your Plan", body: "Business address, GST registration, or company registration." },
    { title: "Submit KYC", body: "PAN, Aadhaar, photo. Fully digital. 5 minutes." },
    { title: "Documents Issued", body: "NOC + rent agreement + utility bill, 24–72 hrs." },
    { title: "File GST Application", body: "On gst.gov.in with your virtual office docs." },
    { title: "Officer Verification", body: "The centre receives the officer on your behalf." },
    { title: "GSTIN Issued", body: "Typically within 7 working days." },
  ];

  return (
    <VoSection id="how">
      <VoEyebrow>Process</VoEyebrow>
      <VoSectionTitle>From Enquiry to GST Registration in 7 Days</VoSectionTitle>
      <VoSectionSub className="mt-3">
        A single workflow from KYC to GSTIN — handled by SpaceHaat and the verified operator.
      </VoSectionSub>

      <div className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="flex flex-col gap-2.5 rounded-[14px] border border-[#EAE7E0] bg-white p-4 sm:p-5"
          >
            <div className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[color:var(--color-brand)] text-sm font-bold text-white">
              {i + 1}
            </div>
            <h3 className="text-[15px] font-semibold text-ink">{step.title}</h3>
            <p className="text-[13px] leading-snug text-muted">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-stretch justify-between gap-4 rounded-[14px] bg-[#EDF7EE] px-5 py-5 sm:flex-row sm:items-center">
        <p className="text-left text-[15px] font-medium text-[#3a2a23]">
          We assist at every step. Expert document review before filing.
        </p>
        <VoLeadCtaButton className="shrink-0 sm:w-auto">Start the Process →</VoLeadCtaButton>
      </div>
    </VoSection>
  );
}

export function VoCityAudienceSection({ cityDisplay }: { cityDisplay: string }) {
  const items = [
    { icon: "💼", title: "Freelancers & Consultants", tag: "→ Business Address" },
    { icon: "📦", title: "E‑commerce Sellers", tag: "→ GST Registration" },
    { icon: "🚀", title: "Startups & Founders", tag: "→ Company Registration" },
    { icon: "🏛️", title: "Enterprise Expansion", tag: "→ GST + Meeting Room" },
  ];

  return (
    <VoSection>
      <VoEyebrow>Who it&apos;s for</VoEyebrow>
      <VoSectionTitle>Who Gets a Virtual Office in {cityDisplay}?</VoSectionTitle>
      <div className="vo-aud-scroll mt-6 flex gap-2.5 overflow-x-auto pb-2 lg:mt-8 lg:gap-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex min-w-[54%] shrink-0 snap-start flex-col gap-2 rounded-2xl border border-[#EAE7E0] bg-white p-3.5 sm:min-w-[48%] sm:p-5 lg:min-w-0"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EDF7EE] text-[20px] sm:h-11 sm:w-11 sm:text-[22px]">
              {item.icon}
            </div>
            <h3 className="text-[15px] font-semibold text-ink sm:text-[17px]">{item.title}</h3>
            <p className="text-[13px] leading-relaxed text-[#555] sm:text-sm">
              Establish a credible {cityDisplay} presence without a long-term lease.
            </p>
            <span className="mt-auto self-start rounded-md bg-[#EDF7EE] px-2.5 py-1 text-xs font-semibold text-[color:var(--color-brand)]">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </VoSection>
  );
}

export function VoCityDocumentsSection() {
  const docs = [
    {
      title: "NOC (No Objection Certificate)",
      paper: "No Objection Certificate",
      body: "Confirms your business is permitted to use the address. Required by the GST portal.",
      tag: "Issued within 24 hrs",
    },
    {
      title: "Rent / Leave & Licence Agreement",
      paper: "Rent / Leave & Licence",
      body: "E‑stamped rental agreement — valid proof of address possession for ROC filings.",
      tag: "E‑stamped · Legally valid",
    },
    {
      title: "Utility Bill",
      paper: "Utility Bill",
      body: "Recent electricity bill in the operator's name showing the commercial address.",
      tag: "Under 2 months",
    },
  ];

  return (
    <VoSection>
      <VoEyebrow>Compliance</VoEyebrow>
      <VoSectionTitle>Every Document, Explained</VoSectionTitle>
      <VoSectionSub className="mt-3">
        The GST department requires specific documents. Here&apos;s what you get — and what each one does.
      </VoSectionSub>

      <div className="vo-docs-scroll mt-6 flex gap-2.5 overflow-x-auto pb-2 lg:mt-8 lg:gap-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        {docs.map((doc) => (
          <article
            key={doc.title}
            className="flex min-w-[56%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#EAE7E0] bg-white sm:min-w-[50%] lg:min-w-0"
          >
            <div className="relative border-b border-[#EAE7E0] bg-[#FCFBF7] p-4 sm:p-5">
              <h4 className="text-[15px] font-bold uppercase tracking-wide text-ink">{doc.paper}</h4>
              <div className="absolute right-4 top-4 grid h-[60px] w-[60px] place-items-center rounded-full border-2 border-emerald-500 p-1 text-center text-[9px] font-bold leading-tight text-emerald-600">
                SpaceHaat
                <br />
                Verified
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-[88%] rounded bg-[#ECE7DC]" />
                <div className="h-2 w-full rounded bg-[#ECE7DC]" />
                <div className="h-2 w-[60%] rounded bg-[#ECE7DC]" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
              <h3 className="text-[15px] font-bold text-ink sm:text-[17px]">{doc.title}</h3>
              <p className="text-[13px] leading-relaxed text-[#555] sm:text-sm">{doc.body}</p>
              <span className="mt-auto self-start rounded-md bg-[#EDF7EE] px-2.5 py-1 text-xs font-semibold text-[color:var(--color-brand)]">
                {doc.tag}
              </span>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-5 border-l-[3px] border-[color:var(--color-brand)] bg-white py-4 pl-5 text-sm leading-relaxed text-[#444]">
        SpaceHaat only lists operators whose documentation has been verified for GST approval.{" "}
        <b className="text-ink">Pre‑vetted = lower rejection risk.</b>
      </p>
    </VoSection>
  );
}

export function VoCityStatsSection({ cityDisplay }: { cityDisplay: string }) {
  return (
    <VoSection id="reviews">
      <div className="rounded-[20px] bg-[#EDF7EE] px-6 py-10 sm:px-10">
        <div className="grid gap-8 text-center sm:grid-cols-3">
          {[
            { n: "500+", l: `Businesses registered via SpaceHaat in ${cityDisplay}` },
            { n: "99%", l: "GST approval rate across listed operators" },
            { n: "48 hr", l: "Average document turnaround" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-5xl font-extrabold tracking-[-0.04em] text-[color:var(--color-brand)]">
                {s.n}
              </p>
              <p className="mt-2 text-sm font-medium text-[#3a2a23]">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-3">
          {[
            { q: `"Got my ${cityDisplay} GSTIN in 6 days. Docs were perfect — zero rejection."`, a: "E‑commerce founder" },
            { q: `"Moved to a premium address in 3 days. Clients noticed immediately."`, a: "Independent Consultant" },
            { q: `"SpaceHaat shortlisted 3 options. We picked the best fit quickly."`, a: "SaaS Startup" },
          ].map((t) => (
            <blockquote key={t.a} className="text-sm italic leading-relaxed text-[#3a2a23]">
              <p>{t.q}</p>
              <footer className="mt-2 text-[13px] font-semibold not-italic text-[#7a5a4d]">— {t.a}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </VoSection>
  );
}

export function VoCityEnquirySection({ cityDisplay }: { cityDisplay: string }) {
  return (
    <VoSection id="vo-enquiry">
      <VoCityEnquiryBanner cityDisplay={cityDisplay} />
    </VoSection>
  );
}
