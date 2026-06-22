import type { EsimPlan, FormattedPriceParts } from "@/lib/plans-api";

export type PilgrimTierKey =
  | "basic"
  | "connected"
  | "unlimited"
  | "family";

export type PilgrimTierMeta = {
  key: PilgrimTierKey;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  recommended?: boolean;
  hasGroupCalculator?: boolean;
};

export const PILGRIM_TIER_META: PilgrimTierMeta[] = [
  {
    key: "basic",
    title: "Basic",
    subtitle: "Lite Explorer",
    description: "Essential data for maps, messaging, and arrival coordination.",
    highlights: [
      "Install before departure",
      "Makkah & Madinah coverage",
      "Ideal for short stays",
    ],
  },
  {
    key: "connected",
    title: "Connected Pilgrim",
    subtitle: "Best Choice",
    description:
      "Balanced data for daily worship, family updates, and navigation.",
    highlights: [
      "Congestion-resilient access",
      "Priority routing in holy sites",
      "Recommended for first-time pilgrims",
    ],
    recommended: true,
  },
  {
    key: "unlimited",
    title: "Unlimited Devotion",
    subtitle: "Premium / Unlimited",
    description:
      "Unlimited peace of mind for live streams, video calls, and full itinerary apps.",
    highlights: [
      "Unlimited high-speed data",
      "Best for extended stays",
      "Superior value under network congestion",
    ],
  },
  {
    key: "family",
    title: "Family Share",
    subtitle: "Efficiency / Hotspot",
    description:
      "One plan, shared connectivity — coordinate your group with a single hotspot.",
    highlights: [
      "Hotspot-ready for group devices",
      "Split cost across travelers",
      "Group coordination in crowded areas",
    ],
    hasGroupCalculator: true,
  },
];

export type PilgrimTierOffer = PilgrimTierMeta & {
  plan: EsimPlan | null;
};

function fallbackParts(price: number): FormattedPriceParts {
  const dollars = Math.floor(price);
  const cents = Math.round((price - dollars) * 100);
  return { dollars: String(dollars), cents: String(cents) };
}

export const PILGRIM_FALLBACK_PLANS: Record<PilgrimTierKey, EsimPlan> = {
  basic: {
    id: "pilgrim-basic",
    countryId: "saudi-arabia",
    name: "Lite Explorer",
    dataGb: 5,
    durationDays: 10,
    price: 24.95,
    formattedPriceParts: fallbackParts(24.95),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "MANUAL",
    marginStatus: "manual",
    planCategory: "fixed",
    displayBadge: null,
  },
  connected: {
    id: "pilgrim-connected",
    countryId: "saudi-arabia",
    name: "Connected Pilgrim",
    dataGb: 15,
    durationDays: 15,
    price: 34.95,
    formattedPriceParts: fallbackParts(34.95),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "MANUAL",
    marginStatus: "manual",
    planCategory: "fixed",
    displayBadge: "best_choice",
  },
  unlimited: {
    id: "pilgrim-unlimited",
    countryId: "saudi-arabia",
    name: "Unlimited Devotion",
    dataGb: undefined,
    durationDays: 21,
    price: 49.77,
    formattedPriceParts: fallbackParts(49.77),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "AUTOMATED",
    marginStatus: "automated",
    planCategory: "unlimited",
    displayBadge: null,
  },
  family: {
    id: "pilgrim-family",
    countryId: "saudi-arabia",
    name: "Family Share",
    dataGb: 30,
    durationDays: 21,
    price: 59.95,
    formattedPriceParts: fallbackParts(59.95),
    currency: "USD",
    isRechargeable: false,
    isPayAsYouGo: false,
    pricingStrategy: "MANUAL",
    marginStatus: "manual",
    planCategory: "flexible",
    displayBadge: "flexible",
  },
};

export function resolvePilgrimTiers(plans: EsimPlan[]): PilgrimTierOffer[] {
  const fixed = plans
    .filter((p) => p.planCategory === "fixed")
    .sort((a, b) => a.price - b.price);
  const unlimited = plans.find((p) => p.planCategory === "unlimited") ?? null;
  const flexible =
    plans.find((p) => p.planCategory === "flexible" || p.isRechargeable) ?? null;
  const connected =
    plans.find((p) => p.displayBadge === "best_choice") ??
    fixed.find((p) => p.displayBadge === "best_choice") ??
    fixed[1] ??
    null;
  const basic =
    fixed.find((p) => p.id !== connected?.id) ?? fixed[0] ?? null;

  const byKey: Record<PilgrimTierKey, EsimPlan | null> = {
    basic,
    connected,
    unlimited,
    family: flexible,
  };

  return PILGRIM_TIER_META.map((meta) => ({
    ...meta,
    plan: byKey[meta.key] ?? PILGRIM_FALLBACK_PLANS[meta.key],
  }));
}

export function splitPricePerPerson(
  price: number,
  parts: FormattedPriceParts,
  groupSize: number,
): { price: number; formattedPriceParts: FormattedPriceParts } {
  const safeSize = Math.max(1, groupSize);
  const perPerson = Math.round((price / safeSize) * 100) / 100;
  return {
    price: perPerson,
    formattedPriceParts: fallbackParts(perPerson),
  };
}

export function computeGroupSavings(
  individualPlanPrice: number,
  familyPerPersonPrice: number,
  groupSize: number,
): { perPersonSavings: number; totalSavings: number } {
  const safeSize = Math.max(1, groupSize);
  const perPersonSavings = Math.max(
    0,
    Math.round((individualPlanPrice - familyPerPersonPrice) * 100) / 100,
  );
  return {
    perPersonSavings,
    totalSavings: Math.round(perPersonSavings * safeSize * 100) / 100,
  };
}
