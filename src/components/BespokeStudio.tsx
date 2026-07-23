"use client";

import React, { useState } from "react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";
import { Sparkles, Palette, ArrowRight, CheckCircle2, MessageSquare, Upload, Calendar } from "lucide-react";

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
    <section id="bespoke" className="py-20 px-4 bg-[#06110c] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d2a1e] border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-3">
            <Palette className="w-4 h-4" /> Bespoke Jewelry Design Lab
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white mb-4 gold-text-gradient">
            Craft Your Custom Masterpiece
          </h2>
          <p className="text-white/70 text-sm sm:text-base">
            Collaborate directly with Jain Jewells master goldsmiths in Jaipur to bring your unique design vision to life.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="emerald-glass rounded-3xl p-6 sm:p-10 border border-[#d4af37]/30 max-w-4xl mx-auto shadow-2xl relative">
          {!isSubmitted ? (
            <div>
              {/* Stepper indicator */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        step === i
                          ? "gold-bg-gradient text-[#06110c] ring-4 ring-[#d4af37]/20"
                          : step > i
                          ? "bg-emerald-600 text-white"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {step > i ? <CheckCircle2 className="w-4 h-4" /> : i}
                    </div>
                    <span className="hidden sm:inline text-xs font-medium text-white/70">
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
                  <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
                    Step 1: What type of jewelry would you like to design?
                  </h3>
                  <p className="text-xs text-white/60 mb-6">Select your preferred ornament category.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {jewelryTypes.map((item) => (
                      <div
                        key={item.title}
                        onClick={() => setFormData({ ...formData, jewelryType: item.title })}
                        className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                          formData.jewelryType === item.title
                            ? "bg-[#0d3828] border-[#d4af37] shadow-lg"
                            : "bg-[#061811]/60 border-white/10 hover:border-[#d4af37]/40"
                        }`}
                      >
                        <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-xs text-white/60">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl flex items-center gap-2"
                    >
                      Next: Choose Metal <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Metal */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
                    Step 2: Select Precious Metal &amp; Purity
                  </h3>
                  <p className="text-xs text-white/60 mb-6">All gold metal options carry 100% official BIS Hallmarking.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {metals.map((m) => (
                      <div
                        key={m}
                        onClick={() => setFormData({ ...formData, metalPreference: m })}
                        className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                          formData.metalPreference === m
                            ? "bg-[#0d3828] border-[#d4af37] shadow-lg text-[#fcf6ba]"
                            : "bg-[#061811]/60 border-white/10 hover:border-[#d4af37]/40 text-white"
                        }`}
                      >
                        <span className="text-sm font-semibold">{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-3 rounded-xl border border-white/20 text-xs font-semibold text-white hover:bg-white/10"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl flex items-center gap-2"
                    >
                      Next: Select Gemstones <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Gemstones */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
                    Step 3: Select Preferred Gemstones &amp; Solitaires
                  </h3>
                  <p className="text-xs text-white/60 mb-6">Select one or multiple gemstones for your design.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {gemstonesList.map((g) => {
                      const isSelected = formData.gemstones.includes(g);
                      return (
                        <div
                          key={g}
                          onClick={() => toggleGemstone(g)}
                          className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-[#0d3828] border-[#d4af37] shadow-lg text-white"
                              : "bg-[#061811]/60 border-white/10 hover:border-[#d4af37]/40 text-white/70"
                          }`}
                        >
                          <span className="text-sm font-semibold">{g}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-3 rounded-xl border border-white/20 text-xs font-semibold text-white hover:bg-white/10"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl flex items-center gap-2"
                    >
                      Next: Budget &amp; Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Budget & Contact */}
              {step === 4 && (
                <form onSubmit={handleFinish} className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
                      Step 4: Target Budget &amp; Patron Details
                    </h3>
                    <p className="text-xs text-white/60">Finalize your custom design inquiry for our Jaipur master artisans.</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/80 block mb-2">
                      Target Budget Range
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {budgetRanges.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`p-2.5 rounded-xl text-xs font-semibold transition-all ${
                            formData.budget === b
                              ? "gold-bg-gradient text-[#06110c] font-bold"
                              : "bg-[#061811] text-white/80 border border-white/10"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-white/80 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-xs text-white rounded-xl p-3 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-white/80 block mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98290 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-xs text-white rounded-xl p-3 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/80 block mb-1">
                      Design Notes &amp; Special Inspiration (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe any specific motif, family heirloom gemstone, or occasion details..."
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-xs text-white rounded-xl p-3 outline-none resize-none"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-3 rounded-xl border border-white/20 text-xs font-semibold text-white hover:bg-white/10"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl flex items-center gap-2 shadow-lg"
                    >
                      Submit Bespoke Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif-luxury font-bold text-white mb-2">
                Bespoke Design Inquiry Created!
              </h3>
              <p className="text-sm text-white/70 max-w-md mx-auto mb-6">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Our senior jewelry designer at Jain Jewells Jaipur will review your specifications for a {formData.jewelryType}.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" /> Connect Directly on WhatsApp
                </a>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                  }}
                  className="bg-[#061811] border border-white/20 text-white text-xs font-semibold py-3.5 px-6 rounded-xl"
                >
                  Start New Custom Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
