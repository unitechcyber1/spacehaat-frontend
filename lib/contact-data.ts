import type { SpaceVertical } from "@/types";

export const CONTACT_PHONE = "7017333425";
export const CONTACT_PHONE_DISPLAY = "+91 70173 33425";
export const CONTACT_PHONE_HREF = `tel:+91${CONTACT_PHONE}`;
export const CONTACT_EMAIL = "info@spacehaat.com";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;

export const CONTACT_HOURS = "Mon – Sat, 9:00 AM – 7:00 PM IST";

export const CONTACT_OFFICE_ADDRESS =
  "2nd Floor, G-135, Jain Colony, Sector 22, Rohini, Delhi, 110086";

export const CONTACT_SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591810689712",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/spacehaat/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/spacehaat",
  },
] as const;

export const CONTACT_VERTICAL_OPTIONS: Array<{
  value: SpaceVertical | "general";
  label: string;
  mxSpaceType: string;
}> = [
  { value: "coworking", label: "Coworking space", mxSpaceType: "Web Coworking" },
  { value: "coliving", label: "Coliving & PG", mxSpaceType: "Web Coliving" },
  { value: "virtual-office", label: "Virtual office", mxSpaceType: "Web Virtual Office" },
  { value: "office-space", label: "Office space", mxSpaceType: "Web Office Space" },
  { value: "general", label: "General enquiry", mxSpaceType: "Contact page enquiry" },
];

export const CONTACT_TRUST_POINTS = [
  "Zero consultation cost",
  "Verified listings across India",
  "Expert shortlisting in 24 hours",
  "No spam — genuine leads only",
] as const;
