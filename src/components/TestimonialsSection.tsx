"use client";

import React, { useState } from "react";
import { TESTIMONIALS, FAQ_DATA } from "@/data/jewelryData";
import { Star, Quote, ChevronDown, HelpCircle } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32 px-5 sm:px-8 bg-[#0a0a08] border-t border-[#c9a96a]/12 relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Testimonials Header */}
        <div className="lux-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-10 border-b border-[#f4eee3]/10">
          <div className="max-w-2xl">
            <span className="lux-eyebrow block mb-4">Patron Testimonials</span>
            <h2 className="text-[2.4rem] sm:text-[3.4rem] font-light text-[#f4eee3] leading-[1.05] tracking-[-0.015em]">
              Loved by <span className="italic text-[#e8d9b4]">Generations</span>
            </h2>
          </div>
          <p className="text-[#a79e8e] text-xs sm:text-sm font-light leading-[1.9] max-w-sm lg:text-right">
            Weddings, anniversaries and quiet milestones — in the words of the families who have trusted us with them.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="lux-reveal grid grid-cols-1 md:grid-cols-3 gap-px bg-[#f4eee3]/10 border border-[#f4eee3]/10 mb-24">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="bg-[#0f0d0a] p-7 sm:p-9 flex flex-col justify-between relative group hover:bg-[#14110c] transition-colors duration-500"
            >
              <Quote className="w-7 h-7 text-[#c9a96a]/20 absolute top-7 right-7" strokeWidth={1} />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#c9a96a] mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-[#c9a96a]" strokeWidth={0} />
                  ))}
                </div>

                <p className="text-[12.5px] text-[#ded6c7]/85 font-light italic leading-[1.95] mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#f4eee3]/10 pt-5">
                <strong className="block text-[#f4eee3] text-[11px] font-normal tracking-[0.04em]">{item.name}</strong>
                <div className="flex justify-between gap-3 text-[9px] text-[#7f786c] mt-2 uppercase tracking-[0.14em]">
                  <span>{item.city}</span>
                  <span className="text-[#c9a96a]">{item.occasion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="lux-reveal max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="lux-eyebrow block mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.3} /> Client Notes
            </span>
            <h3 className="text-[2rem] sm:text-[2.6rem] font-light text-[#f4eee3]">
              Questions, <span className="italic text-[#e8d9b4]">answered</span>
            </h3>
          </div>

          <div className="border-t border-[#f4eee3]/10">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="border-b border-[#f4eee3]/10 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full py-6 text-left flex items-center justify-between gap-6 group outline-none"
                  >
                    <span className={`font-serif-luxury text-[1.15rem] sm:text-[1.3rem] font-light transition-colors ${isOpen ? "text-[#e8d9b4]" : "text-[#f4eee3] group-hover:text-[#e8d9b4]"}`}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#c9a96a] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.4}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-6 pr-10 text-[11.5px] text-[#a79e8e] font-light leading-[1.95] max-w-2xl">
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
