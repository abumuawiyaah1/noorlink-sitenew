import type { FormattedPriceParts } from "@/lib/plans-api";

type PsychologicalPriceProps = {
  parts: FormattedPriceParts;
  currency?: string;
  className?: string;
};

export function PsychologicalPrice({
  parts,
  currency = "USD",
  className = "",
}: PsychologicalPriceProps) {
  const symbol = currency === "USD" ? "$" : `${currency} `;
  const cents = parts.cents.padStart(2, "0");

  return (
    <span className={`psychological-price ${className}`.trim()}>
      <span className="psychological-price__symbol">{symbol}</span>
      <span className="text-3xl font-bold">{parts.dollars}</span>
      <span className="text-lg font-medium align-top mt-1">{cents}</span>
    </span>
  );
}
