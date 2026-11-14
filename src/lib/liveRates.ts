import type { MetalRate } from "@/data/jewelryData";

/**
 * Market configuration for the live rate board.
 *
 * Gold and silver spot prices are quoted in USD per troy ounce, so we convert to
 * INR per gram and add the Indian import duty to arrive at a landed retail rate
 * (before GST, which is charged separately at billing).
 */
export const RATE_CONFIG = {
  ounceInGrams: 31.1034768,
  goldImportDutyPercent: 6,
  silverImportDutyPercent: 6,
  /** Used only if the live feed cannot be reached. */
  goldUsdPerOunceFallback: 3887.6,
  silverUsdPerOunceFallback: 48.65,
  usdInrFallback: 94.29,
  /** Server-side cache window; every new visit past this window refetches spot. */
  cacheMs: 2 * 60 * 1000,
} as const;

/**
 * Polished natural diamond prices are published weekly (Rapaport-style), not
 * ticked intraday, so Indian jewellers quote them from a USD-per-carat reference.
 * These references are converted live with the current USD/INR rate.
 */
export const DIAMOND_REFERENCE_USD_PER_CARAT = [
  { label: "0.50 ct Solitaire", detail: "Round · G Colour · VS2", usdPerCarat: 4300 },
  { label: "1.00 ct Solitaire", detail: "Round · G Colour · VS2", usdPerCarat: 6400 },
  { label: "2.00 ct Solitaire", detail: "Round · G Colour · VS2", usdPerCarat: 11500 },
] as const;

export interface DiamondRate {
  metal: string;
  purity: string;
  ratePerCarat: number;
  unit: "per carat";
}

export interface LiveRatesPayload {
  rates: MetalRate[];
  diamonds: DiamondRate[];
  updatedAt: string;
  source: "live" | "reference";
  usdInr: number;
  spot: {
    goldUsdPerOunce: number;
    silverUsdPerOunce: number;
  };
}

export interface RateInputs {
  goldUsdPerOunce: number;
  silverUsdPerOunce: number;
  usdInr: number;
  updatedAt: string;
  source: "live" | "reference";
}

const round = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const inrPerGram = (usdPerOunce: number, usdInr: number, dutyPercent: number) =>
  (usdPerOunce / RATE_CONFIG.ounceInGrams) * usdInr * (1 + dutyPercent / 100);

const formatChange = (current: number, previous?: number) => {
  if (!previous || previous <= 0) {
    return { change: "Live spot", isPositive: true };
  }
  const delta = current - previous;
  const percent = (delta / previous) * 100;
  const sign = delta >= 0 ? "+" : "−";
  const deltaText =
    Math.abs(delta) < 10 ? Math.abs(delta).toFixed(2) : Math.abs(delta).toFixed(0);

  return {
    change: `${sign}₹${deltaText} (${sign}${Math.abs(percent).toFixed(2)}%)`,
    isPositive: delta >= 0,
  };
};

/**
 * Builds the full rate board from spot prices. `previous` (the last quotes we
 * served) is optional and only used to show the movement since the last refresh.
 */
export function buildLiveRates(
  inputs: RateInputs,
  previous?: LiveRatesPayload
): LiveRatesPayload {
  const { goldUsdPerOunce, silverUsdPerOunce, usdInr, updatedAt, source } = inputs;

  const gold24k = round(
    inrPerGram(goldUsdPerOunce, usdInr, RATE_CONFIG.goldImportDutyPercent),
    0
  );
  const silver999 = round(
    inrPerGram(silverUsdPerOunce, usdInr, RATE_CONFIG.silverImportDutyPercent),
    2
  );

  const previousRate = (metal: string) =>
    previous?.rates.find((rate) => rate.metal === metal)?.ratePerGram;

  const rates: MetalRate[] = [
    {
      metal: "24K Gold",
      purity: "99.9% Pure Fine Gold",
      ratePerGram: gold24k,
      ...formatChange(gold24k, previousRate("24K Gold")),
      unit: "per gram",
    },
    {
      metal: "22K Gold",
      purity: "91.6% BIS Hallmarked",
      ratePerGram: round(gold24k * 0.916, 0),
      ...formatChange(round(gold24k * 0.916, 0), previousRate("22K Gold")),
      unit: "per gram",
    },
    {
      metal: "18K Gold",
      purity: "75.0% Designer Gold",
      ratePerGram: round(gold24k * 0.75, 0),
      ...formatChange(round(gold24k * 0.75, 0), previousRate("18K Gold")),
      unit: "per gram",
    },
    {
      metal: "999 Fine Silver",
      purity: "99.9% Sterling Silver",
      ratePerGram: silver999,
      ...formatChange(silver999, previousRate("999 Fine Silver")),
      unit: "per gram",
    },
  ];

  const diamonds: DiamondRate[] = DIAMOND_REFERENCE_USD_PER_CARAT.map((stone) => ({
    metal: stone.label,
    purity: stone.detail,
    ratePerCarat: round(stone.usdPerCarat * usdInr, 0),
    unit: "per carat",
  }));

  return {
    rates,
    diamonds,
    updatedAt,
    source,
    usdInr: round(usdInr, 2),
    spot: {
      goldUsdPerOunce: round(goldUsdPerOunce, 2),
      silverUsdPerOunce: round(silverUsdPerOunce, 3),
    },
  };
}

/** Snapshot rendered before the first client fetch resolves (or if the feed is down). */
export const FALLBACK_LIVE_RATES: LiveRatesPayload = buildLiveRates({
  goldUsdPerOunce: RATE_CONFIG.goldUsdPerOunceFallback,
  silverUsdPerOunce: RATE_CONFIG.silverUsdPerOunceFallback,
  usdInr: RATE_CONFIG.usdInrFallback,
  updatedAt: "2026-11-14T10:30:00+05:30",
  source: "reference",
});

/** Formats an ISO timestamp as an IST rate-board stamp. */
export function formatRateTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "just now";

  const formatted = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return `${formatted} IST`;
}
