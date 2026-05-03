import { SpaceVertical } from "@/types";

export const APP_NAME = "SpaceHaat";

export const verticals: Array<{
  key: SpaceVertical;
  label: string;
  href: string;
  description: string;
}> = [
  {
    key: "coworking",
    label: "Coworking Spaces",
    href: "/coworking",
    description: "Flexible, premium workspaces for teams and solo professionals.",
  },
  {
    key: "virtual-office",
    label: "Virtual Offices",
    href: "/virtual-office",
    description: "Compliance-ready business addresses built for modern operators.",
  },
  {
    key: "office-space",
    label: "Office Spaces",
    href: "/office-space",
    description: "Managed and unfurnished office options across India.",
  },
];
