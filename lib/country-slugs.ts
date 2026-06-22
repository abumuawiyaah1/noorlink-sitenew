/** Normalize URL slug or label to backend `country_id`. */
export function normalizeCountrySlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function plansPathForCountry(countryId: string): string {
  const slug = normalizeCountrySlug(countryId);
  if (slug === "saudi-arabia" || slug === "umrah" || slug === "hajj") {
    return "/hajj-umrah";
  }
  return `/plans/${slug}`;
}
