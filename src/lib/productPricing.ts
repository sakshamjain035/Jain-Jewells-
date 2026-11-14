import type { Product } from "@/data/jewelryData";
import { FALLBACK_LIVE_RATES, type LiveRatesPayload } from "@/lib/liveRates";

/**
 * Indicative wholesale USD-per-carat references for stones that are not
 * solitaires. They are converted with the live USD/INR rate, just like the
 * solitaire board, so diamond value tracks the market rather than a fixed INR
 * number.
 */
export const MELEE_DIAMOND_USD_PER_CARAT = 1900;
export const POLKI_DIAMOND_USD_PER_CARAT = 900;

export const GST_RATE = 0.03;

function ratePerGramFor(product: Product, rates: LiveRatesPayload) {
  const label = `${product.metal} ${product.metalPurity}`.toLowerCase();
  const metal = label.includes("silver") || label.includes("999")
    ? "999 Fine Silver"
    : label.includes("22k")
      ? "22K Gold"
      : label.includes("24k")
        ? "24K Gold"
        : "18K Gold";

  return rates.rates.find((rate) => rate.metal === metal)?.ratePerGram
    ?? FALLBACK_LIVE_RATES.rates.find((rate) => rate.metal === metal)?.ratePerGram
    ?? 0;
}

function solitaireUsdPerCarat(carats: number) {
  if (carats >= 1.5) return 11500;
  if (carats >= 0.75) return 6400;
  return 4300;
}

export function priceProduct(product: Product, rates: LiveRatesPayload = FALLBACK_LIVE_RATES) {
  const metalWeight = product.metalWeightGrams ?? product.weightGrams;
  const metalValue = metalWeight * ratePerGramFor(product, rates);

  const carats = product.diamondCarats ?? 0;
  const usdPerCarat =
    product.diamondKind === "polki"
      ? POLKI_DIAMOND_USD_PER_CARAT
      : product.diamondKind === "solitaire"
        ? solitaireUsdPerCarat(carats)
        : MELEE_DIAMOND_USD_PER_CARAT;
  const diamondValue = carats * usdPerCarat * rates.usdInr;

  const stoneValue = product.stoneValueInr ?? 0;
  const makingCharges = metalValue * (product.makingChargePercent / 100);

  const total = (metalValue + diamondValue + stoneValue + makingCharges) * (1 + GST_RATE);

  // India price lists settle on clean hundreds; avoids jitter from minor FX moves.
  return Math.round(total / 500) * 500;
}

export function priceProducts(
  products: Product[],
  rates: LiveRatesPayload = FALLBACK_LIVE_RATES
): Product[] {
  return products.map((product) => ({ ...product, price: priceProduct(product, rates) }));
}

/**
 * Every piece gets a full view plus two tighter framings of the same photograph,
 * followed by any styled shots stored on the product. This keeps the quick-view
 * gallery useful without showing a different ornament.
 */
export function getProductGallery(product: Product): string[] {
  const base = product.image.split("?")[0];
  const isPexels = base.includes("images.pexels.com");
  const detail = isPexels
    ? `${base}?auto=compress&cs=tinysrgb&w=1200&h=1200&fit=crop`
    : `${base}?auto=format&fit=crop&w=1200&h=1200&q=85`;
  const closeUp = isPexels
    ? `${base}?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`
    : `${base}?auto=format&fit=crop&w=1200&h=800&q=85`;

  return [product.image, detail, closeUp, ...(product.gallery ?? [])];
}
