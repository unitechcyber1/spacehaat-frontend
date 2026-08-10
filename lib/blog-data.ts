import type { BlogPost, BlogVerticalFilter } from "@/types/blog";
import type { SpaceVertical } from "@/types";

export const BLOG_VERTICAL_LABELS: Record<SpaceVertical, string> = {
  coworking: "Coworking",
  coliving: "Coliving & PG",
  "virtual-office": "Virtual Office",
  "office-space": "Office Space",
};

export const BLOG_VERTICAL_HREF: Record<SpaceVertical, string> = {
  coworking: "/coworking",
  coliving: "/coliving",
  "virtual-office": "/virtual-office",
  "office-space": "/office-space",
};

const POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-coworking-space-in-gurgaon",
    vertical: "coworking",
    title: "How to choose the right coworking space in Gurgaon",
    excerpt:
      "From seat pricing to meeting-room access, here is a practical checklist for teams comparing flexible workspaces in Gurgaon’s top micro-markets.",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Modern coworking floor in Gurgaon",
    author: "SpaceHaat Editorial",
    authorRole: "Workspace advisors",
    publishedAt: "2026-07-18",
    readMinutes: 6,
    tags: ["Gurgaon", "Team size", "Pricing"],
    featured: true,
    body: [
      {
        type: "p",
        text: "Gurgaon has one of the deepest coworking markets in India. The challenge is not finding options — it is filtering noise. Teams usually compare spaces on headline rent first, but the better shortlist comes from how you actually work: fixed desks, hybrid days, client meetings, and growth headroom.",
      },
      {
        type: "h2",
        text: "Start with location, not brand",
      },
      {
        type: "p",
        text: "Udyog Vihar, Golf Course Road, and Cyber City attract different commute patterns and client perceptions. Map your team’s daily routes and pick two micro-markets before you tour. A slightly higher seat cost in the right pocket often saves hours every week.",
      },
      {
        type: "ul",
        items: [
          "Check last-mile connectivity and parking for client visits",
          "Compare meeting-room credits vs. pay-as-you-go rates",
          "Ask about cabin availability if you plan to scale in 6–12 months",
        ],
      },
      {
        type: "h2",
        text: "Read the plan fine print",
      },
      {
        type: "p",
        text: "Hot desks, dedicated desks, and private cabins are priced differently for a reason. Confirm what is included: internet SLA, housekeeping, printing, and after-hours access. Verified operators on SpaceHaat share real starting prices so you can compare apples to apples.",
      },
    ],
  },
  {
    slug: "coworking-vs-managed-office-for-startups",
    vertical: "coworking",
    title: "Coworking vs managed office: what growing startups should pick",
    excerpt:
      "When does flexible coworking beat a managed office? A side-by-side view on cost, branding, and team velocity for early-stage companies.",
    coverImage:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Startup team in a flexible workspace",
    author: "SpaceHaat Editorial",
    authorRole: "Workspace advisors",
    publishedAt: "2026-06-22",
    readMinutes: 5,
    tags: ["Startups", "Managed office", "Flexibility"],
    body: [
      {
        type: "p",
        text: "Startups rarely need a five-year lease on day one. Coworking gives you speed: move in fast, add seats monthly, and stay close to talent hubs. Managed offices make sense when you need a branded floor, predictable costs, and a stable team size for 18+ months.",
      },
      {
        type: "h2",
        text: "Choose coworking when",
      },
      {
        type: "ul",
        items: [
          "Headcount changes quarter to quarter",
          "You want networking and community programming",
          "You need multiple city presences without capex",
        ],
      },
      {
        type: "h2",
        text: "Choose managed office when",
      },
      {
        type: "ul",
        items: [
          "Client visits require a dedicated reception and branding",
          "Compliance or security needs a private suite",
          "You have locked budget approval for 12–24 months",
        ],
      },
    ],
  },
  {
    slug: "virtual-office-gst-registration-guide-india",
    vertical: "virtual-office",
    title: "Virtual office for GST registration: what documents you need",
    excerpt:
      "A clear guide to business address proof, NOC, and rent agreements when registering GST with a virtual office in India.",
    coverImage:
      "https://img.spacehaat.com/images/original/475b4b5ecc2f03baf8973403555fb8167ca0c4fb.jpg",
    coverImageAlt: "Business documentation for virtual office",
    author: "SpaceHaat Editorial",
    authorRole: "Compliance desk",
    publishedAt: "2026-07-02",
    readMinutes: 7,
    tags: ["GST", "Documentation", "Compliance"],
    body: [
      {
        type: "p",
        text: "A virtual office gives you a professional business address without renting full-time desk space. For GST registration, authorities expect address proof that ties your business to a real, verifiable location — not a PO box.",
      },
      {
        type: "h2",
        text: "Documents operators typically provide",
      },
      {
        type: "ul",
        items: [
          "No Objection Certificate (NOC) from the property owner or operator",
          "Rent or leave & licence agreement in your company name",
          "Utility bill for the registered address where applicable",
        ],
      },
      {
        type: "p",
        text: "SpaceHaat partners with verified virtual office providers across major cities. Compare plans by compliance use case — business address, GST registration, or company incorporation — before you submit on the portal.",
      },
    ],
  },
  {
    slug: "best-cities-for-virtual-office-in-india",
    vertical: "virtual-office",
    title: "Best cities in India for a virtual office address",
    excerpt:
      "Bangalore, Mumbai, Delhi NCR, and Hyderabad compared for credibility, compliance support, and remote-team workflows.",
    coverImage:
      "https://images.unsplash.com/photo-1486406146927-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "City skyline representing business addresses",
    author: "SpaceHaat Editorial",
    authorRole: "Compliance desk",
    publishedAt: "2026-05-14",
    readMinutes: 4,
    tags: ["Cities", "Remote teams", "Business address"],
    body: [
      {
        type: "p",
        text: "Your registered address signals where you operate and sometimes where you pay state-level taxes. Founders picking a virtual office city should balance brand perception, courier handling, and where their customers and auditors expect them to be.",
      },
      {
        type: "h2",
        text: "Delhi NCR and Bangalore",
      },
      {
        type: "p",
        text: "Both remain top picks for SaaS, agencies, and e-commerce sellers. Strong operator density means faster document turnaround and more plan tiers to choose from.",
      },
      {
        type: "h2",
        text: "Mumbai and Hyderabad",
      },
      {
        type: "p",
        text: "Mumbai suits finance and media-facing brands; Hyderabad works well for tech teams with GCC and startup ecosystems. Match the city to where your invoices and contracts say you are based.",
      },
    ],
  },
  {
    slug: "office-space-rent-checklist-for-smes",
    vertical: "office-space",
    title: "Office space rent checklist for SMEs in 2026",
    excerpt:
      "Fit-out costs, lock-in, CAM charges, and exit clauses — what to verify before signing an office lease in India.",
    coverImage:
      "https://img.spacehaat.com/images/original/29f7c32fae7798c9733f5b891af3e0ded7031a85.jpg",
    coverImageAlt: "Private office suite interior",
    author: "SpaceHaat Editorial",
    authorRole: "Enterprise advisory",
    publishedAt: "2026-06-08",
    readMinutes: 8,
    tags: ["Lease", "SME", "Due diligence"],
    body: [
      {
        type: "p",
        text: "Signing office space without a structured checklist is how teams absorb surprise costs. CAM, electricity backups, fit-out timelines, and renewal terms matter as much as per-square-foot rent.",
      },
      {
        type: "h2",
        text: "Before you sign",
      },
      {
        type: "ul",
        items: [
          "Confirm carpet vs super built-up area in the agreement",
          "Clarify who owns fit-out and what reverts to landlord on exit",
          "Map parking, visitor access, and after-hours HVAC rules",
          "Negotiate rent-free or fit-out periods where possible",
        ],
      },
      {
        type: "p",
        text: "SpaceHaat helps SMEs shortlist managed and unfurnished options with transparent starting rates so finance teams can model year-one occupancy cost accurately.",
      },
    ],
  },
  {
    slug: "managed-office-vs-unfurnished-lease",
    vertical: "office-space",
    title: "Managed office vs unfurnished lease: total cost view",
    excerpt:
      "Compare all-in monthly cost, not just rent — including furniture, IT, and facility management for growing teams.",
    coverImage:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Managed office meeting room",
    author: "SpaceHaat Editorial",
    authorRole: "Enterprise advisory",
    publishedAt: "2026-04-28",
    readMinutes: 5,
    tags: ["Managed office", "TCO", "Facilities"],
    body: [
      {
        type: "p",
        text: "Unfurnished leases look cheaper on paper. Add workstations, meeting rooms, internet, housekeeping, and a facility manager — the gap narrows quickly for teams under 80 seats.",
      },
      {
        type: "h2",
        text: "When managed wins",
      },
      {
        type: "p",
        text: "If you need to occupy in weeks, not months, managed offices bundle operations so your team focuses on revenue, not vendor coordination.",
      },
    ],
  },
  {
    slug: "coliving-vs-pg-for-working-professionals",
    vertical: "coliving",
    title: "Coliving vs PG: what working professionals should know",
    excerpt:
      "Meals, WiFi, community, and lease flexibility — how coliving and PG options differ for relocations and first jobs.",
    coverImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Furnished coliving room",
    author: "SpaceHaat Editorial",
    authorRole: "Living advisors",
    publishedAt: "2026-07-10",
    readMinutes: 6,
    tags: ["Coliving", "PG", "Relocation"],
    body: [
      {
        type: "p",
        text: "Both coliving and PG housing target people who want a ready room without buying furniture. Coliving operators usually emphasize design, community events, and app-based support. Traditional PGs optimize for budget and proximity to colleges or business parks.",
      },
      {
        type: "h2",
        text: "Compare on these lines",
      },
      {
        type: "ul",
        items: [
          "All-inclusive rent vs. add-ons for meals and laundry",
          "House rules on guests, WFH, and quiet hours",
          "Minimum stay and notice period before you move out",
          "Safety: CCTV, access control, and on-site manager",
        ],
      },
      {
        type: "p",
        text: "On SpaceHaat you can filter coliving and PG listings by city and locality, then speak to an advisor for a shortlist matched to your budget and move-in date.",
      },
    ],
  },
  {
    slug: "moving-to-gurugram-coliving-guide",
    vertical: "coliving",
    title: "Moving to Gurugram: coliving neighborhoods worth exploring",
    excerpt:
      "Sector 42, Udyog Vihar, Golf Course Road, and more — where professionals find furnished stays near major hubs.",
    coverImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Apartment living room in Gurugram",
    author: "SpaceHaat Editorial",
    authorRole: "Living advisors",
    publishedAt: "2026-05-30",
    readMinutes: 5,
    tags: ["Gurugram", "Localities", "Move-in"],
    body: [
      {
        type: "p",
        text: "Gurugram’s coliving supply clusters around employment corridors. Pick a locality based on where you work most days, not just the lowest monthly rent.",
      },
      {
        type: "h2",
        text: "Udyog Vihar and Cyber corridors",
      },
      {
        type: "p",
        text: "Strong for tech and operations roles with short commutes. Expect higher demand — book tours early if your joining date is fixed.",
      },
      {
        type: "h2",
        text: "Golf Course Road and Sector 42",
      },
      {
        type: "p",
        text: "Premium finishes and quieter residential pockets. Good for consultants and teams who host clients occasionally and want better common-area amenities.",
      },
    ],
  },
];

export function listBlogPosts(filter: BlogVerticalFilter = "all"): BlogPost[] {
  const sorted = [...POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  if (filter === "all") return sorted;
  return sorted.filter((post) => post.vertical === filter);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function listBlogSlugs(): string[] {
  return POSTS.map((post) => post.slug);
}

export function listRelatedBlogPosts(post: BlogPost, limit = 3): BlogPost[] {
  return listBlogPosts(post.vertical)
    .filter((item) => item.slug !== post.slug)
    .slice(0, limit);
}

export function formatBlogDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
