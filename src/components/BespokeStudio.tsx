"use client";

import React, { useState } from "react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";
import { Sparkles, Palette, ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";

export const BespokeStudio: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    jewelryType: "Bridal Necklace Set",
    metalPreference: "22K BIS 916 Gold",
    gemstones: ["Polki (Uncut Diamonds)", "Zambian Emerald"],
    budget: "₹3,000,000 – ₹5,000,000",
    targetDate: "",
    fullName: "",
    phone: "",
    specialNotes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const jewelryTypes = [
    { title: "Bridal Couture Necklace", desc: "Heavy Polki, Kundan or Nakshi Rani Haar" },
    { title: "Solitaire Engagement Ring", desc: "Certified GIA Solitaire custom prongs" },
    { title: "Antique Gold Bangles & Kada", desc: "Hand-engraved 22K gold masterworks" },
    { title: "Diamond Chandelier Earrings", desc: "18K Rose or White Gold high jewelry" },
    { title: "Royal Gemstone Pendant", desc: "Colombian emerald or ruby centerpieces" },
    { title: "Men's Luxury Accessories", desc: "Gold chains, diamond cufflinks & kadas" },
  ];

  const metals = [
    "22K Yellow Gold (BIS 916)",
    "18K Rose Gold",
    "18K White Gold",
    "18K Yellow Gold",
    "Platinum & 18K Blend",
    "999 Fine Silver",
  ];

  const gemstonesList = [
    "GIA Certified Solitaire Diamonds",
    "Polki (Uncut Flat Diamonds)",
    "Zambian / Colombian Emeralds",
    "Burmese Rubies",
    "Basra & South Sea Pearls",
    "Sapphires (Neelam / Pukhraj)",
  ];

  const budgetRanges = [
    "₹100,000 – ₹300,000",
    "₹300,000 – ₹700,000",
    "₹700,000 – ₹1,500,000",
    "₹1,500,000 – ₹3,000,000",
    "₹3,000,000 + (Imperial Luxury)",
  ];

  const toggleGemstone = (gem: string) => {
    setFormData((prev) => {
      const exists = prev.gemstones.includes(gem);
      if (exists) {
        return { ...prev, gemstones: prev.gemstones.filter((g) => g !== gem) };
      } else {
        return { ...prev, gemstones: [...prev.gemstones, gem] };
      }
    });
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const waText = encodeURIComponent(
    `Hello Jain Jewells Bespoke Studio,\nI would like to start a custom jewellery design consultation:\n- Item Type: ${formData.jewelryType}\n- Metal: ${formData.metalPreference}\n- Gemstones: ${formData.gemstones.join(", ")}\n- Budget Range: ${formData.budget}\n- Customer Name: ${formData.fullName}\n- Phone: ${formData.phone}\n- Notes: ${formData.specialNotes || "None"}`
  );

  return (
    <section id="bespoke" className="py-24 sm:py-32 px-5 sm:px-8 bg-[#0e0908] relative border-t border-[#c8a05c]/12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="lux-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-10 border-b border-[#f6efe4]/10">
          <div className="max-w-2xl">
            <span className="lux-eyebrow block mb-4 flex items-center gap-2.5">
              <Palette className="w-3.5 h-3.5" strokeWidth={1.3} /> The Bespoke Atelier
            </span>
            <h2 className="text-[2.4rem] sm:text-[3.4rem] font-light text-[#f6efe4] leading-[1.05] tracking-[-0.015em]">
              A Piece Made <span className="italic text-[#ecd8ae]">Only for You</span>
            </h2>
          </div>
          <p className="text-[#a99987] text-xs sm:text-sm font-light leading-[1.9] max-w-sm lg:text-right">
            Sketch an idea with our master goldsmiths in Ludhiana. From the first line to the final polish, the piece is yours alone.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="lux-reveal bg-[#150d0c] border border-[#f6efe4]/10 p-6 sm:p-10 lg:p-12 max-w-4xl mx-auto relative">
          {!isSubmitted ? (
            <div>
              {/* Stepper indicator */}
              <div className="flex items-center justify-between border-b border-[#f6efe4]/10 pb-6 mb-9 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 flex items-center justify-center text-[10px] transition-all border ${
                        step === i
                          ? "border-[#c8a05c] bg-[#c8a05c]/10 text-[#ecd8ae]"
                          : step > i
                          ? "border-[#c8a05c]/40 text-[#c8a05c]"
                          : "border-[#f6efe4]/15 text-[#857768]"
                      }`}
                    >
                      {step > i ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.4} /> : i}
                    </div>
                    <span className="hidden sm:inline text-[9px] uppercase tracking-[0.16em] text-[#a99987]">
                      {i === 1 && "Category"}
                      {i === 2 && "Metal Choice"}
                      {i === 3 && "Gemstones"}
                      {i === 4 && "Budget & Contact"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Category */}
              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-serif-luxury font-light text-[#f6efe4] mb-2">
                    <span className="text-[#c8a05c] text-[10px] uppercase tracking-[0.2em] block mb-2">Step 01</span>
                    What would you like to create?
                  </h3>
                  <p className="text-[11px] text-[#a99987] mb-6 font-light">Select your preferred ornament category.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {jewelryTypes.map((item) => (
                      <div
                        key={item.title}
                        onClick={() => setFormData({ ...formData, jewelryType: item.title })}
                        className={`p-4 cursor-pointer border transition-all duration-300 ${
                          formData.jewelryType === item.title
                            ? "bg-[#c8a05c]/10 border-[#c8a05c]"
                            : "bg-transparent border-[#f6efe4]/10 hover:border-[#c8a05c]/40"
                        }`}
                      >
                        <h4 className="text-[12px] text-[#f6efe4] mb-1 tracking-[0.02em]">{item.title}</h4>
                        <p className="text-[10px] text-[#a99987] font-light leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="lux-btn lux-btn-gold"
                    >
                      Choose Metal <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.4} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Metal */}
              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-serif-luxury font-light text-[#f6efe4] mb-2">
                    <span className="text-[#c8a05c] text-[10px] uppercase tracking-[0.2em] block mb-2">Step 02</span>
                    Choose your precious metal
                  </h3>
                  <p className="text-[11px] text-[#a99987] mb-6 font-light">Every gold piece carries official BIS hallmarking.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {metals.map((m) => (
                      <div
                        key={m}
                        onClick={() => setFormData({ ...formData, metalPreference: m })}
                        className={`p-4 cursor-pointer border transition-all duration-300 ${
                          formData.metalPreference === m
                            ? "bg-[#c8a05c]/10 border-[#c8a05c] text-[#ecd8ae]"
                            : "bg-transparent border-[#f6efe4]/10 hover:border-[#c8a05c]/40 text-[#e0d4c2]"
                        }`}
                      >
                        <span className="text-[12px] tracking-[0.02em]">{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-3 border border-[#f6efe4]/15 text-[9px] uppercase tracking-[0.18em] text-[#a99987] hover:text-[#f6efe4] hover:border-[#f6efe4]/35 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="lux-btn lux-btn-gold"
                    >
                      Select Gemstones <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.4} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Gemstones */}
              {step === 3 && (
                <div>
                  <h3 className="text-2xl font-serif-luxury font-light text-[#f6efe4] mb-2">
                    <span className="text-[#c8a05c] text-[10px] uppercase tracking-[0.2em] block mb-2">Step 03</span>
                    Choose your stones
                  </h3>
                  <p className="text-[11px] text-[#a99987] mb-6 font-light">Select one or more gemstones for your design.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {gemstonesList.map((g) => {
                      const isSelected = formData.gemstones.includes(g);
                      return (
                        <div
                          key={g}
                          onClick={() => toggleGemstone(g)}
                          className={`p-4 cursor-pointer border transition-all duration-300 flex items-center justify-between ${
                            isSelected
                              ? "bg-[#c8a05c]/10 border-[#c8a05c] text-[#ecd8ae]"
                              : "bg-transparent border-[#f6efe4]/10 hover:border-[#c8a05c]/40 text-[#a99987]"
                          }`}
                        >
                          <span className="text-[12px] tracking-[0.02em]">{g}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-3 border border-[#f6efe4]/15 text-[9px] uppercase tracking-[0.18em] text-[#a99987] hover:text-[#f6efe4] hover:border-[#f6efe4]/35 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="lux-btn lux-btn-gold"
                    >
                      Budget &amp; Details <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.4} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Budget & Contact */}
              {step === 4 && (
                <form onSubmit={handleFinish} className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-serif-luxury font-light text-[#f6efe4] mb-2">
                      <span className="text-[#c8a05c] text-[10px] uppercase tracking-[0.2em] block mb-2">Step 04</span>
                      Your budget &amp; details
                    </h3>
                    <p className="text-[11px] text-[#a99987] font-light">Finalise your commission inquiry for our Ludhiana master artisans.</p>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#857768] block mb-2">
                      Target Budget
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {budgetRanges.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`p-3 border text-[11px] transition-all duration-300 ${
                            formData.budget === b
                              ? "border-[#c8a05c] bg-[#c8a05c]/10 text-[#ecd8ae]"
                              : "border-[#f6efe4]/10 text-[#a99987] hover:border-[#c8a05c]/40"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-[0.2em] text-[#857768] block mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#1b1110] border border-[#f6efe4]/12 focus:border-[#c8a05c] text-[11px] text-[#f6efe4] rounded-none p-3 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] uppercase tracking-[0.2em] text-[#857768] block mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98290 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#1b1110] border border-[#f6efe4]/12 focus:border-[#c8a05c] text-[11px] text-[#f6efe4] rounded-none p-3 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#857768] block mb-2">
                      Design Notes &amp; Inspiration <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe a motif, a family heirloom stone, or the occasion…"
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      className="w-full bg-[#1b1110] border border-[#f6efe4]/12 focus:border-[#c8a05c] text-[11px] text-[#f6efe4] rounded-none p-3 outline-none resize-none transition-colors"
                    />
                  </div>

                  <div className="flex justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-3 border border-[#f6efe4]/15 text-[9px] uppercase tracking-[0.18em] text-[#a99987] hover:text-[#f6efe4] hover:border-[#f6efe4]/35 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="lux-btn lux-btn-gold"
                    >
                      Submit Commission
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 border border-[#c8a05c]/50 text-[#c8a05c] flex items-center justify-center mx-auto mb-5">
                <Sparkles className="w-5 h-5" strokeWidth={1.2} />
              </div>
              <span className="lux-eyebrow block">Commission Inquiry Received</span>
              <h3 className="text-2xl font-serif-luxury font-light text-[#f6efe4] mt-2 mb-3">
                Your vision is in our hands
              </h3>
              <p className="text-[11px] text-[#a99987] font-light leading-relaxed max-w-md mx-auto mb-7">
                Thank you, <strong className="text-[#f6efe4] font-normal">{formData.fullName}</strong>. A senior designer at Jain Jewells Ludhiana will review your specifications for a {formData.jewelryType}.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-btn lux-btn-gold"
                >
                  <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.4} /> Continue on WhatsApp
                </a>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                  }}
                  className="lux-btn lux-btn-outline"
                >
                  Start a New Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
