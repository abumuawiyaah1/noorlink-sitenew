import { plansPathForCountry } from "@/lib/country-slugs";

export type DestinationRegion =
  | "Americas"
  | "Europe"
  | "Asia"
  | "Middle East";

export type DestinationCard = {
  id: string;
  title: string;
  region: DestinationRegion;
  priceLabel: string;
  className: string;
  href: string;
};

export const DESTINATION_FILTERS: { id: "all" | DestinationRegion; label: string }[] = [
  { id: "all", label: "Trending" },
  { id: "Europe", label: "Europe" },
  { id: "Asia", label: "Asia" },
  { id: "Americas", label: "Americas" },
  { id: "Middle East", label: "Middle East" },
];

export const DESTINATION_CARDS: DestinationCard[] = [
  { id: "usa", title: "United States", region: "Americas", priceLabel: "From $4.50", className: "bg-usa", href: plansPathForCountry("usa") },
  { id: "canada", title: "Canada", region: "Americas", priceLabel: "From $6.00", className: "bg-canada", href: plansPathForCountry("canada") },
  { id: "mexico", title: "Mexico", region: "Americas", priceLabel: "From $6.00", className: "bg-mexico", href: plansPathForCountry("mexico") },
  { id: "brazil", title: "Brazil", region: "Americas", priceLabel: "From $8.00", className: "bg-brazil", href: plansPathForCountry("brazil") },
  { id: "europe", title: "Europe (Regional)", region: "Europe", priceLabel: "From $5.00", className: "bg-europe-regional", href: plansPathForCountry("france") },
  { id: "uk", title: "United Kingdom", region: "Europe", priceLabel: "From $5.00", className: "bg-uk", href: plansPathForCountry("united-kingdom") },
  { id: "france", title: "France", region: "Europe", priceLabel: "From $4.50", className: "bg-france", href: plansPathForCountry("france") },
  { id: "germany", title: "Germany", region: "Europe", priceLabel: "From $4.50", className: "bg-germany", href: plansPathForCountry("germany") },
  { id: "asia", title: "Asia (Regional)", region: "Asia", priceLabel: "From $12.00", className: "bg-asia-regional", href: plansPathForCountry("japan") },
  { id: "japan", title: "Japan", region: "Asia", priceLabel: "From $6.00", className: "bg-japan", href: plansPathForCountry("japan") },
  { id: "thailand", title: "Thailand", region: "Asia", priceLabel: "From $6.00", className: "bg-thailand", href: plansPathForCountry("thailand") },
  { id: "china", title: "China", region: "Asia", priceLabel: "From $7.00", className: "bg-china", href: plansPathForCountry("china") },
  { id: "middle-east", title: "Middle East (Regional)", region: "Middle East", priceLabel: "From $15.00", className: "bg-middle-east-regional", href: plansPathForCountry("turkey") },
  { id: "turkey", title: "Turkey", region: "Middle East", priceLabel: "From $4.50", className: "bg-turkey", href: plansPathForCountry("turkey") },
  { id: "saudi-arabia", title: "Saudi Arabia", region: "Middle East", priceLabel: "From $7.00", className: "bg-saudi-arabia", href: plansPathForCountry("saudi-arabia") },
  { id: "uae", title: "UAE", region: "Middle East", priceLabel: "From $7.50", className: "bg-uae", href: plansPathForCountry("uae") },
];

export function filterDestinationCards(
  query: string,
  region: "all" | DestinationRegion,
): DestinationCard[] {
  const q = query.trim().toLowerCase();

  return DESTINATION_CARDS.filter((card) => {
    const regionMatch = region === "all" || card.region === region;
    const queryMatch =
      !q ||
      card.title.toLowerCase().includes(q) ||
      card.region.toLowerCase().includes(q);
    return regionMatch && queryMatch;
  });
}
