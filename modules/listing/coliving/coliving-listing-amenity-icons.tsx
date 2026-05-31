"use client";

import type { ReactNode } from "react";
import {
  AirVent,
  Bath,
  BedDouble,
  BookOpen,
  Building2,
  Camera,
  Car,
  CupSoda,
  Dumbbell,
  Droplets,
  Refrigerator,
  Shield,
  Sofa,
  Table2,
  Tv,
  User,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICON_SIZE = 22;
const stroke = 1.6;

function Icon({ I }: { I: LucideIcon }) {
  return <I size={ICON_SIZE} strokeWidth={stroke} />;
}

export const COLIVING_COMMON_AMENITY_ICONS: { k: string; icon: ReactNode }[] = [
  { k: "Power Back-Up", icon: <Icon I={Zap} /> },
  { k: "Lift", icon: <Icon I={Building2} /> },
  { k: "Wi-Fi", icon: <Icon I={Wifi} /> },
  { k: "Water Cooler", icon: <Icon I={Droplets} /> },
  { k: "Fridge", icon: <Icon I={Refrigerator} /> },
  { k: "Warden", icon: <Icon I={User} /> },
  { k: "Gym", icon: <Icon I={Dumbbell} /> },
  { k: "Security", icon: <Icon I={Shield} /> },
  { k: "CCTV", icon: <Icon I={Camera} /> },
  { k: "TV Lounge", icon: <Icon I={Tv} /> },
  { k: "Study Room", icon: <Icon I={BookOpen} /> },
  { k: "Terrace", icon: <Icon I={Building2} /> },
];

export const COLIVING_ROOM_AMENITY_ICONS: { k: string; icon: ReactNode }[] = [
  { k: "AC", icon: <Icon I={AirVent} /> },
  { k: "Television", icon: <Icon I={Tv} /> },
  { k: "Single Bed", icon: <Icon I={BedDouble} /> },
  { k: "Attached Bath", icon: <Icon I={Bath} /> },
  { k: "Hot Water", icon: <Icon I={Droplets} /> },
  { k: "Cupboard", icon: <Icon I={CupSoda} /> },
  { k: "Table & Chair", icon: <Icon I={Table2} /> },
  { k: "Mattress", icon: <Icon I={BedDouble} /> },
  { k: "Balcony", icon: <Icon I={Sofa} /> },
];

export { Car as ColivingCarIcon };
