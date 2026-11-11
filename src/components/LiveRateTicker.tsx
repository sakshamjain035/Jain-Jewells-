"use client";

import React, { useState } from "react";
import { LIVE_METAL_RATES, SHOWROOM_DETAILS } from "@/data/jewelryData";
import { Calculator, RefreshCw, Info, ArrowRight, MessageSquare } from "lucide-react";

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
    <section id="rates" className="py-24 sm:py-28 px-5 sm:px-8 bg-[#0a0a08] border-y border-[#c9a96a]/12 relative overflow-hidden">
      {/* Ambient warmth */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[620px] h-[300px] bg-[#c9a96a]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="lux-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-10 border-b border-[#f4eee3]/10">
          <div className="max-w-2xl">
            <span className="lux-eyebrow block mb-4">Transparent by Design</span>
            <h2 className="text-[2.2rem] sm:text-[3.2rem] font-light text-[#f4eee3] leading-[1.05]">
              Today&apos;s Live Metal Rates<br className="hidden sm:block" />
              <span className="italic text-[#e8d9b4]"> &amp; Atelier Estimator</span>
            </h2>
          </div>
          <p className="text-[#a79e8e] text-xs sm:text-sm font-light leading-[1.9] max-w-sm lg:text-right">
            A pure rate board, refreshed twice daily at our Jaipur showroom. Estimate any piece with complete clarity — no hidden charges.
          </p>
        </div>

        {/* Live Rate Cards Grid */}
        <div className="lux-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#f4eee3]/10 border border-[#f4eee3]/10 mb-14">
          {LIVE_METAL_RATES.map((rate, idx) => (
            <div
              key={rate.metal}
              onClick={() => setSelectedRateIndex(idx)}
              className={`cursor-pointer p-6 sm:p-7 transition-all duration-500 relative ${
                selectedRateIndex === idx
                  ? "bg-[#1a1712]"
                  : "bg-[#0c0b09] hover:bg-[#14110c]"
              }`}
            >
              {selectedRateIndex === idx && (
                <span className="absolute top-0 left-0 right-0 h-px bg-[#c9a96a]" />
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#ded6c7]">{rate.metal}</span>
                <span
                  className={`text-[10px] tracking-[0.04em] ${
                    rate.isPositive ? "text-[#c9a96a]" : "text-[#a79e8e]"
                  }`}
                >
                  {rate.change}
                </span>
              </div>
              <div className="text-[1.7rem] font-serif-luxury font-light text-[#f4eee3] mb-1">
                ₹{rate.ratePerGram.toLocaleString("en-IN")}
                <span className="text-[10px] font-light text-[#7f786c] ml-1.5">/ {rate.unit}</span>
              </div>
              <div className="text-[10px] text-[#7f786c] tracking-[0.04em]">{rate.purity}</div>
            </div>
          ))}
        </div>

        {/* Interactive Estimator Tool */}
        <div className="lux-reveal bg-[#0f0d0a] border border-[#f4eee3]/10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Controls side */}
          <div className="lg:col-span-7 flex flex-col gap-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f4eee3]/10 pb-5">
              <h3 className="text-2xl font-serif-luxury font-light text-[#f4eee3] flex items-center gap-2.5">
                <Calculator className="w-4 h-4 text-[#c9a96a]" strokeWidth={1.3} />
                Atelier Cost Estimator
              </h3>
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#7f786c] flex items-center gap-1.5">
                <RefreshCw className="w-2.5 h-2.5 text-[#c9a96a]" /> Updated {lastRefreshed}
              </span>
            </div>

            {/* Metal Selector Tabs */}
            <div>
              <label className="text-[9px] uppercase tracking-[0.2em] text-[#7f786c] mb-3 block">
                01 — Select Metal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LIVE_METAL_RATES.map((r, idx) => (
                  <button
                    key={r.metal}
                    onClick={() => setSelectedRateIndex(idx)}
                    className={`py-3 px-3 text-[10px] uppercase tracking-[0.08em] transition-all border ${
                      selectedRateIndex === idx
                        ? "border-[#c9a96a] text-[#e8d9b4] bg-[#c9a96a]/10"
                        : "border-[#f4eee3]/10 text-[#a79e8e] hover:border-[#c9a96a]/40 hover:text-[#f4eee3]"
                    }`}
                  >
                    {r.metal}
                  </button>
                ))}
              </div>
            </div>

            {/* Gram Weight Input */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[9px] uppercase tracking-[0.2em] text-[#7f786c]">
                  02 — Jewellery Weight
                </label>
                <span className="text-xs text-[#e8d9b4] font-light">{gramWeight} grams</span>
              </div>
              <input
                type="range"
                min="1"
                max="250"
                value={gramWeight}
                onChange={(e) => setGramWeight(Number(e.target.value))}
                className="w-full h-[3px] bg-[#2c2619] rounded-none appearance-none cursor-pointer accent-[#c9a96a]"
              />
              <div className="flex justify-between text-[9px] tracking-[0.04em] text-[#7f786c] mt-2">
                <span>1g · Rings</span>
                <span>50g · Bangles</span>
                <span>150g · Necklaces</span>
                <span>250g+ · Bridal</span>
              </div>
            </div>

            {/* Making Charges Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[9px] uppercase tracking-[0.2em] text-[#7f786c] flex items-center gap-1.5">
                  03 — Making Charge
                  <span title="Making charges depend on design complexity — cast work versus handcrafted Nakshi work">
                    <Info className="w-3 h-3 text-[#7f786c] hover:text-[#c9a96a]" strokeWidth={1.4} />
                  </span>
                </label>
                <span className="text-xs text-[#e8d9b4] font-light">{makingChargePercent}%</span>
              </div>
              <input
                type="range"
                min="8"
                max="22"
                value={makingChargePercent}
                onChange={(e) => setMakingChargePercent(Number(e.target.value))}
                className="w-full h-[3px] bg-[#2c2619] rounded-none appearance-none cursor-pointer accent-[#c9a96a]"
              />
              <div className="flex justify-between text-[9px] tracking-[0.04em] text-[#7f786c] mt-2">
                <span>8% · Lightweight</span>
                <span>14% · Kundan</span>
                <span>22% · Artisan Nakshi</span>
              </div>
            </div>
          </div>

          {/* Breakdown summary side */}
          <div className="lg:col-span-5 bg-[#16130e] p-6 sm:p-8 border border-[#c9a96a]/20 flex flex-col justify-between h-full gap-7">
            <div>
              <h4 className="text-[9px] text-[#c9a96a] uppercase tracking-[0.24em] border-b border-[#f4eee3]/10 pb-4 mb-5">
                Price Breakdown
              </h4>
              
              <div className="flex flex-col gap-3.5 text-[11px] font-light">
                <div className="flex justify-between gap-3 text-[#a79e8e]">
                  <span>Metal value · {gramWeight}g @ ₹{activeRateObj.ratePerGram}/g</span>
                  <span className="text-[#f4eee3]">₹{metalCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between gap-3 text-[#a79e8e]">
                  <span>Making charges · {makingChargePercent}%</span>
                  <span className="text-[#f4eee3]">₹{Math.round(makingCost).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between gap-3 text-[#a79e8e]">
                  <span>GST · 3% standard</span>
                  <span className="text-[#f4eee3]">₹{Math.round(gstAmount).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="border-t border-[#c9a96a]/25 mt-5 pt-5">
                <span className="text-[9px] text-[#7f786c] uppercase tracking-[0.22em] block mb-2">
                  Estimated Total · INR
                </span>
                <div className="text-[2.1rem] font-serif-luxury font-light text-[#e8d9b4]">
                  ₹{totalEstimatedPrice.toLocaleString("en-IN")}
                </div>
                <p className="text-[9px] text-[#7f786c] leading-relaxed mt-2">
                  Final price may vary with gemstone carats, settings and the finished ornament.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=Hi%20Jain%20Jewells%2C%20I%20used%20your%20online%20calculator%20for%20a%20${gramWeight}g%20${activeRateObj.metal}%20design%20(Est%3A%20%E2%82%B9${totalEstimatedPrice.toLocaleString("en-IN")}).%20Can%20you%20share%20available%20designs%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn lux-btn-outline w-full group"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#c9a96a]" strokeWidth={1.4} />
              Request this Quote
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={1.4} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
