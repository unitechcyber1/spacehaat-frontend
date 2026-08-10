/** Internal links and copy for the global footer (SEO + navigation). */

/** Bottom bar: keyword phrases split for semantic links (SEO signals). */
export const footerBottomKeywordLinks = [
  { label: "Coworking Spaces in India", href: "/coworking" },
  { label: "Virtual Office India", href: "/virtual-office" },
  { label: "Office Space for Rent", href: "/office-space" },
  { label: "Coliving & PG India", href: "/coliving" },
  { label: "Coworking Space Gurugram", href: "/coworking/gurgaon" },
  { label: "Coworking Space Bangalore", href: "/coworking/bangalore" },
  { label: "Coworking Space Mumbai", href: "/coworking/mumbai" },
] as const;

export const footerBottomTagline =
  "India's Premium Coworking & Office Space Discovery Platform";

/** Shared city set so every vertical column lists the same markets. */
const footerCities = [
  { name: "Gurgaon", slug: "gurgaon" },
  { name: "Noida", slug: "noida" },
  { name: "Delhi", slug: "delhi" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Pune", slug: "pune" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Ahmedabad", slug: "ahmedabad" },
  { name: "Jaipur", slug: "jaipur" },
  { name: "Chennai", slug: "chennai" },
  { name: "Lucknow", slug: "lucknow" },
  { name: "Indore", slug: "indore" },
] as const;

function cityLinks(
  verticalPath: string,
  labelFor: (cityName: string) => string,
): { label: string; href: string }[] {
  return footerCities.map((city) => ({
    label: labelFor(city.name),
    href: `/${verticalPath}/${city.slug}`,
  }));
}

export const footerVerticalColumns = [
  {
    title: "Coworking",
    ariaLabel: "Coworking spaces by city",
    links: cityLinks("coworking", (city) => `Coworking Space in ${city}`),
  },
  {
    title: "Virtual Office",
    ariaLabel: "Virtual office by city",
    links: cityLinks("virtual-office", (city) => `Virtual Office in ${city}`),
  },
  {
    title: "Coliving & PG",
    ariaLabel: "Coliving and PG by city",
    links: cityLinks("coliving", (city) => `Coliving & PG in ${city}`),
  },
  {
    title: "Office Space",
    ariaLabel: "Office space by city",
    links: cityLinks("office-space", (city) => `Office Space for Rent in ${city}`),
  },
] as const;

/** Kept for backwards compatibility / plain-text reuse. */
export const footerSeoKeywords =
  "Coworking Spaces in India | Virtual Office India | Office Space for Rent | Coliving PG India | Coworking Space Gurugram | Coworking Space Bangalore | Coworking Space Mumbai";
