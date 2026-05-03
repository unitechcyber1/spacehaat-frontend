/** Internal links and copy for the global footer (SEO + navigation). */

export const footerAbout = {
  title: "About SpaceHaat",
  paragraphs: [
    "SpaceHaat is India's premium workspace discovery platform — built for professionals, startups, and enterprise teams who need more than just a desk. We curate verified coworking spaces, virtual offices, and private office spaces across Gurugram, Noida, Delhi, Bangalore, Mumbai, Hyderabad, Pune, Chennai, and beyond.",
    "Every listing is operator-verified. Pricing is real. And our expert team is available to shortlist, compare, and negotiate on your behalf — at zero consultation cost.",
  ],
} as const;

/** Bottom bar: keyword phrases split for semantic links (SEO signals). */
export const footerBottomKeywordLinks = [
  { label: "Coworking Spaces in India", href: "/coworking" },
  { label: "Virtual Office India", href: "/virtual-office" },
  { label: "Office Space for Rent", href: "/office-space" },
  { label: "Coworking Space Gurugram", href: "/coworking/gurgaon" },
  { label: "Coworking Space Bangalore", href: "/coworking/bangalore" },
  { label: "Coworking Space Mumbai", href: "/coworking/mumbai" },
] as const;

export const footerBottomTagline =
  "India's Premium Coworking & Office Space Discovery Platform";

export const footerCoworkingByCity = [
  { label: "Coworking Space in Gurugram", href: "/coworking/gurgaon" },
  { label: "Coworking Space in Noida", href: "/coworking/noida" },
  { label: "Coworking Space in Delhi", href: "/coworking/delhi" },
  { label: "Coworking Space in Bangalore", href: "/coworking/bangalore" },
  { label: "Coworking Space in Mumbai", href: "/coworking/mumbai" },
  { label: "Coworking Space in Hyderabad", href: "/coworking/hyderabad" },
  { label: "Coworking Space in Pune", href: "/coworking/pune" },
  { label: "Coworking Space in Chennai", href: "/coworking/chennai" },
  { label: "Coworking Space in Lucknow", href: "/coworking/lucknow" },
] as const;

export const footerCoworkingGurugramAreas = [
  { label: "Coworking Space in Cyber City", href: "/coworking/gurgaon/cyber-city" },
  { label: "Coworking Space in Golf Course Road", href: "/coworking/gurgaon/golf-course-road" },
  { label: "Coworking Space in Sohna Road", href: "/coworking/gurgaon/sohna-road" },
  { label: "Coworking Space in Udyog Vihar", href: "/coworking/gurgaon/udyog-vihar" },
  { label: "Coworking Space in MG Road", href: "/coworking/gurgaon/mg-road" },
] as const;

export const footerVirtualOffice = [
  { label: "Virtual Office in Gurugram", href: "/virtual-office/gurgaon" },
  { label: "Virtual Office in Noida", href: "/virtual-office/noida" },
  { label: "Virtual Office in Bangalore", href: "/virtual-office/bangalore" },
  { label: "Virtual Office in Mumbai", href: "/virtual-office/mumbai" },
  { label: "Virtual Office in Delhi", href: "/virtual-office/delhi" },
  { label: "Virtual Office for GST Registration", href: "/virtual-office" },
] as const;

export const footerOfficeSpace = [
  { label: "Office Space for Rent in Gurugram", href: "/office-space/gurgaon" },
  { label: "Managed Office Space in India", href: "/office-space" },
  { label: "Private Office Space in Bangalore", href: "/office-space/bangalore" },
  { label: "Office Space for Startups", href: "/office-space" },
] as const;

export const footerMeetingRooms = [
  { label: "Meeting Rooms in Gurugram", href: "/coworking/gurgaon" },
  { label: "Meeting Rooms in Noida", href: "/coworking/noida" },
] as const;

export const footerCompany = [
  { label: "About SpaceHaat", href: "/" },
  { label: "List Your Space", href: "/list-your-space" },
  { label: "Contact Us", href: "/#lead-form" },
  { label: "SpaceHaat Select (Expert Consultation)", href: "/#lead-form" },
  { label: "Trusted Operators", href: "/" },
] as const;

/** Kept for backwards compatibility / plain-text reuse. */
export const footerSeoKeywords =
  "Coworking Spaces in India | Virtual Office India | Office Space for Rent | Coworking Space Gurugram | Coworking Space Bangalore | Coworking Space Mumbai";
