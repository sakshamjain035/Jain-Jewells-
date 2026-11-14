"use client";

import { useCallback, useEffect, useState } from "react";
import { FALLBACK_LIVE_RATES, type LiveRatesPayload } from "@/lib/liveRates";

/**
 * Loads the current gold, silver and diamond board from /api/rates as soon as
 * the page opens, so every visitor sees the latest market prices.
 */
export function useLiveRates() {
  const [data, setData] = useState<LiveRatesPayload>(FALLBACK_LIVE_RATES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/rates", { cache: "no-store" });
      if (!res.ok) return;
      const payload = (await res.json()) as LiveRatesPayload;
      if (payload?.rates?.length) setData(payload);
    } catch {
      // Keep the last known board if the network hiccups.
    }
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await load();
    } finally {
      setIsRefreshing(false);
    }
  }, [load]);

  // Fetch the board once when the page opens.
  useEffect(() => {
    const loadRates = async () => {
      await load();
    };
    loadRates();
  }, [load]);

  return { data, isRefreshing, refresh };
}
