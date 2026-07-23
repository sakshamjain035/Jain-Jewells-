"use client";

import React, { useState } from "react";
import { LIVE_METAL_RATES, SHOWROOM_DETAILS } from "@/data/jewelryData";
import { Calculator, TrendingUp, ShieldCheck, RefreshCw, Info, ArrowRight, MessageSquare } from "lucide-react";

export const LiveRateTicker: React.FC = () => {
  const [selectedRateIndex, setSelectedRateIndex] = useState(1); // 22K default
  const [gramWeight, setGramWeight] = useState<number>(10);
  const [makingChargePercent, setMakingChargePercent] = useState<number>(12);
  const [lastRefreshed] = useState<string>("Today, 10:30 AM IST");

  const activeRateObj = LIVE_METAL_RATES[selectedRateIndex];
  const metalCost = gramWeight * activeRateObj.ratePerGram;
  const makingCost = metalCost * (makingChargePercent / 100);
  const subtotal = metalCost + makingCost;
  const gstAmount = subtotal * 0.03; // 3% GST on jewellery
  const totalEstimatedPrice = Math.round(subtotal + gstAmount);

  return (
    <section id="rates" className="py-16 px-4 bg-[#040c09] border-y border-[#d4af37]/20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-700/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d2a1e] border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-4 h-4" /> 100% BIS Hallmarked Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold gold-text-gradient mb-3">
            Today&apos;s Live Metal Rates &amp; Price Calculator
          </h2>
          <p className="text-white/70 text-sm sm:text-base">
            Guaranteed 100% pure live rate board updated twice daily directly at the Jain Jewells Jaipur showroom.
          </p>
        </div>

        {/* Live Rate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {LIVE_METAL_RATES.map((rate, idx) => (
            <div
              key={rate.metal}
              onClick={() => setSelectedRateIndex(idx)}
              className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 relative ${
                selectedRateIndex === idx
                  ? "bg-[#0d2e21] border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.2)] transform -translate-y-1"
                  : "emerald-glass emerald-glass-hover opacity-90"
              }`}
            >
              {selectedRateIndex === idx && (
                <span className="absolute top-3 right-3 text-[10px] bg-[#d4af37] text-[#06110c] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Selected
                </span>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white/90">{rate.metal}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    rate.isPositive ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" : "bg-rose-950 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {rate.change}
                </span>
              </div>
              <div className="text-2xl font-serif-luxury font-bold text-[#fcf6ba] mb-1">
                ₹{rate.ratePerGram.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-white/60 ml-1">/ {rate.unit}</span>
              </div>
              <div className="text-[11px] text-white/60">{rate.purity}</div>
            </div>
          ))}
        </div>

        {/* Interactive Estimator Tool */}
        <div className="emerald-glass rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          {/* Controls side */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-serif-luxury font-semibold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#d4af37]" />
                Estimate Jewellery Cost
              </h3>
              <span className="text-xs text-white/50 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin" /> Rate: {lastRefreshed}
              </span>
            </div>

            {/* Metal Selector Tabs */}
            <div>
              <label className="text-xs uppercase tracking-wider text-white/70 font-medium mb-2 block">
                1. Select Metal Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LIVE_METAL_RATES.map((r, idx) => (
                  <button
                    key={r.metal}
                    onClick={() => setSelectedRateIndex(idx)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      selectedRateIndex === idx
                        ? "gold-bg-gradient text-[#06110c] font-bold shadow-md"
                        : "bg-[#06110c]/80 text-white/80 border border-white/10 hover:border-[#d4af37]/50"
                    }`}
                  >
                    {r.metal}
                  </button>
                ))}
              </div>
            </div>

            {/* Gram Weight Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-white/70 font-medium">
                  2. Jewellery Weight (Grams)
                </label>
                <span className="text-sm font-bold text-[#d4af37]">{gramWeight} grams</span>
              </div>
              <input
                type="range"
                min="1"
                max="250"
                value={gramWeight}
                onChange={(e) => setGramWeight(Number(e.target.value))}
                className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>1g (Rings/Earrings)</span>
                <span>50g (Bangles)</span>
                <span>150g (Necklaces)</span>
                <span>250g+ (Bridal Sets)</span>
              </div>
            </div>

            {/* Making Charges Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-white/70 font-medium flex items-center gap-1">
                  3. Making Charge Rate (%)
                  <span title="Making charges depend on design complexity (cast vs handcrafted Nakshi work)">
                    <Info className="w-3.5 h-3.5 text-white/40 hover:text-white" />
                  </span>
                </label>
                <span className="text-sm font-bold text-[#d4af37]">{makingChargePercent}%</span>
              </div>
              <input
                type="range"
                min="8"
                max="22"
                value={makingChargePercent}
                onChange={(e) => setMakingChargePercent(Number(e.target.value))}
                className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>8% (Lightweight/Chains)</span>
                <span>14% (Kundan/Meenakari)</span>
                <span>22% (Heavy Artisan Nakshi)</span>
              </div>
            </div>
          </div>

          {/* Breakdown summary side */}
          <div className="lg:col-span-5 bg-[#061811] p-6 rounded-2xl border border-[#d4af37]/30 flex flex-col justify-between h-full gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white/80 uppercase tracking-widest border-b border-white/10 pb-3 mb-4">
                Estimated Price Breakdown
              </h4>
              
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Metal Value ({gramWeight}g @ ₹{activeRateObj.ratePerGram}/g):</span>
                  <span className="font-semibold text-white">₹{metalCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Making Charges ({makingChargePercent}%):</span>
                  <span className="font-semibold text-white">₹{Math.round(makingCost).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>GST (3% Standard Govt Tax):</span>
                  <span className="font-semibold text-white">₹{Math.round(gstAmount).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="border-t border-[#d4af37]/30 mt-4 pt-4">
                <span className="text-xs text-[#d4af37] uppercase tracking-wider block mb-1">
                  Estimated Grand Total (INR)
                </span>
                <div className="text-3xl font-serif-luxury font-extrabold gold-text-gradient">
                  ₹{totalEstimatedPrice.toLocaleString("en-IN")}
                </div>
                <p className="text-[11px] text-white/50 mt-1">
                  *Exact price may vary slightly based on gemstone carats, stone settings & final ornament design.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=Hi%20Jain%20Jewells%2C%20I%20used%20your%20online%20calculator%20for%20a%20${gramWeight}g%20${activeRateObj.metal}%20design%20(Est%3A%20%E2%82%B9${totalEstimatedPrice.toLocaleString("en-IN")}).%20Can%20you%20share%20available%20designs%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0d3828] hover:bg-[#124d38] border border-[#d4af37]/40 text-[#fcf6ba] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md group"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Inquire This Quote on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
