"use client";

import React, { useState } from "react";
import { TESTIMONIALS, FAQ_DATA } from "@/data/jewelryData";
import { Star, Quote, ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 bg-[#040c09] border-t border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
            Patron Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white mb-4 gold-text-gradient">
            Loved by Generations of Families
          </h2>
          <p className="text-white/70 text-sm sm:text-base">
            Read real experiences from patrons who chose Jain Jewells for their weddings, anniversaries, and family celebrations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="emerald-glass p-6 sm:p-8 rounded-3xl border border-[#d4af37]/25 flex flex-col justify-between relative shadow-xl hover:border-[#d4af37]/50 transition-all"
            >
              <Quote className="w-8 h-8 text-[#d4af37]/30 absolute top-6 right-6" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#d4af37] mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                  ))}
                </div>

                <p className="text-sm text-white/80 font-light italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <strong className="block text-white text-sm font-semibold">{item.name}</strong>
                <div className="flex justify-between text-xs text-white/50 mt-0.5">
                  <span>{item.city}</span>
                  <span className="text-[#d4af37] font-medium">{item.occasion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d2a1e] text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-3">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
              Everything You Need to Know
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`emerald-glass rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? "border-[#d4af37] bg-[#0d2e21]/70" : "border-white/10 hover:border-[#d4af37]/40"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif-luxury font-semibold text-white text-sm sm:text-base outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#d4af37] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-white/80 font-light leading-relaxed border-t border-white/10 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
