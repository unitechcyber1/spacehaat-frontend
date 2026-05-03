/**
 * Static dropdown data shared between the coworking and office-space wizards.
 *
 * Mirrors the Angular `CoworkingserviceService.getHoursData()` helper which
 * returns 15-minute slots from 01:00 AM to 12:45 AM. We cut it down to 30-min
 * slots here for a tidier select; the upstream accepts any string.
 */

function buildHourOptions(stepMinutes = 30): string[] {
  const out: string[] = [];
  const total = (24 * 60) / stepMinutes;
  for (let i = 0; i < total; i++) {
    const totalMins = i * stepMinutes;
    const hour24 = Math.floor(totalMins / 60);
    const minute = totalMins % 60;
    const ampm = hour24 < 12 ? "AM" : "PM";
    const displayHour = ((hour24 + 11) % 12) + 1;
    const mm = String(minute).padStart(2, "0");
    const hh = String(displayHour).padStart(2, "0");
    out.push(`${hh}:${mm} ${ampm}`);
  }
  return out;
}

export const HOUR_OPTIONS = buildHourOptions(30);

/**
 * Country id used by Angular for India — hard-coded in
 * `coworking-addproperty.component.ts` (`getCityOfCountry('6231ae062a52af3ddaa73a39')`).
 * Kept here so the wizard can preload cities without needing a country dropdown.
 */
export const DEFAULT_COUNTRY_ID = "6231ae062a52af3ddaa73a39";

export const OFFICE_TYPE_OPTIONS = [
  { value: "raw", label: "Raw / Bare shell" },
  { value: "semi-furnished", label: "Semi-furnished" },
  { value: "fully-furnished", label: "Fully furnished" },
] as const;

export const MIN_IMAGES = 5;
export const MAX_IMAGES = 15;
export const MIN_DESCRIPTION_WORDS = 50;
