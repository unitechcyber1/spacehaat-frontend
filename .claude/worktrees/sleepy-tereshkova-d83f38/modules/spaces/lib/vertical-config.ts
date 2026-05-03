import { SpaceVertical } from "@/types";

export const verticalConfig: Record<
  SpaceVertical,
  {
    label: string;
    description: string;
    href: string;
  }
> = {
  coworking: {
    label: "Coworking Spaces",
    description: "Premium shared workspaces curated for discovery and lead capture.",
    href: "/coworking",
  },
  "virtual-office": {
    label: "Virtual Offices",
    description: "Business address and compliance-ready listings across key Indian cities.",
    href: "/virtual-office",
  },
  "office-space": {
    label: "Office Spaces",
    description: "Managed and traditional office inventory for growing teams.",
    href: "/office-space",
  },
};
