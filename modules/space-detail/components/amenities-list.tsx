import {
  Armchair,
  AirVent,
  Building2,
  Coffee,
  Cpu,
  Droplets,
  Dumbbell,
  Leaf,
  Landmark,
  Lock,
  ParkingCircle,
  PhoneCall,
  Presentation,
  Printer,
  Projector,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Speaker,
  Sun,
  UtensilsCrossed,
  Wifi,
  Zap,
} from "lucide-react";

type AmenitiesListProps = {
  amenities: string[];
};

type AmenityIcon = typeof Wifi;

const amenityIconMap: Record<string, AmenityIcon> = {
  wifi: Wifi,
  "high-speed wifi": Wifi,
  internet: Wifi,

  cafeteria: Coffee,
  pantry: UtensilsCrossed,
  kitchen: UtensilsCrossed,
  "tea coffee": Coffee,
  coffee: Coffee,

  reception: ShieldCheck,
  "reception support": ShieldCheck,
  security: ShieldCheck,
  cctv: ShieldCheck,
  "24x7 security": ShieldCheck,

  parking: ParkingCircle,
  "car parking": ParkingCircle,
  "bike parking": ParkingCircle,

  "power backup": Zap,
  generator: Zap,
  ups: Zap,

  "meeting rooms": Landmark,
  "meeting room": Landmark,
  "board rooms": Landmark,
  "board room": Landmark,
  "conference room": Building2,
  "conference rooms": Building2,

  "phone booths": PhoneCall,
  "phone booth": PhoneCall,

  printer: Printer,
  printing: Printer,
  scanner: Printer,

  projector: Projector,
  presentation: Presentation,
  "sound system": Speaker,
  audio: Speaker,
  av: Speaker,

  "air conditioning": Snowflake,
  ac: Snowflake,
  ventilation: AirVent,

  "drinking water": Droplets,
  water: Droplets,

  "natural light": Sun,
  sunlight: Sun,

  terrace: Leaf,
  garden: Leaf,
  "green area": Leaf,

  lockers: Lock,
  locker: Lock,
  shower: ShowerHead,
  gym: Dumbbell,
  fitness: Dumbbell,
};

function normalizeAmenityKey(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[_/]+/g, " ")
    .replace(/\s+/g, " ");
}

function pickAmenityIcon(name: string): AmenityIcon {
  const key = normalizeAmenityKey(name);
  if (!key) return Armchair;

  const exact = amenityIconMap[key];
  if (exact) return exact;

  const contains = (token: string) => key.includes(token);

  if (contains("wifi") || contains("internet")) return Wifi;
  if (contains("coffee") || contains("tea") || contains("cafeteria") || contains("pantry")) return Coffee;
  if (contains("reception") || contains("security") || contains("cctv")) return ShieldCheck;
  if (contains("parking")) return ParkingCircle;
  if (contains("power") || contains("backup") || contains("generator") || contains("ups")) return Zap;
  if (contains("meeting") || contains("board") || contains("conference")) return Landmark;
  if (contains("phone")) return PhoneCall;
  if (contains("print") || contains("scanner")) return Printer;
  if (contains("projector")) return Projector;
  if (contains("present")) return Presentation;
  if (contains("audio") || contains("sound") || contains("av")) return Speaker;
  if (contains("air condition") || contains("air-conditioning") || contains(" ac")) return Snowflake;
  if (contains("vent")) return AirVent;
  if (contains("water")) return Droplets;
  if (contains("light") || contains("sun")) return Sun;
  if (contains("terrace") || contains("green") || contains("garden")) return Leaf;
  if (contains("locker")) return Lock;
  if (contains("shower")) return ShowerHead;
  if (contains("gym") || contains("fitness")) return Dumbbell;

  return Armchair;
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {amenities.map((amenity) => {
        const Icon = amenityIconMap[normalizeAmenityKey(amenity)] ?? pickAmenityIcon(amenity);

        return (
          <div
            key={amenity}
            className="flex items-center gap-3 rounded-[1rem] border border-slate-200/80 bg-white px-4 py-3"
          >
            <Icon className="h-4 w-4 text-[color:var(--color-brand)]" />
            <span className="text-sm text-slate-700">{amenity}</span>
          </div>
        );
      })}
    </div>
  );
}
