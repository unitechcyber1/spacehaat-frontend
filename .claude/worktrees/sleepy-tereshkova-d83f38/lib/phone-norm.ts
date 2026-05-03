/** Last 10 digits for Indian mobile-style numbers, or `null` if too short. */
export function toPhone10(phone: string): string | null {
  const d = phone.replace(/\D/g, "");
  if (d.length < 10) return null;
  return d.slice(-10);
}
