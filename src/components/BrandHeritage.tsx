"use client";

import React from "react";
import { ShieldCheck, Award, RefreshCcw, Sparkles, CheckCircle2 } from "lucide-react";

export const BrandHeritage: React.FC = () => {
  const pillars = [
    {
      title: "100% BIS 916 Hallmarked",
      description: "Every gram of gold is certified under official Indian Government BIS standards featuring 6-Digit HUID laser engraving.",
      icon: ShieldCheck,
    },
    {
      title: "GIA & IGI Diamond Assurance",
      description: "Natural solitaires & diamonds come with individual certificates detailing color, clarity, cut & carat specifications.",
      icon: Award,
    },
    {
      title: "Transparent Valuation",
      description: "No hidden costs. We provide itemized bills separating pure metal weight, stone carats, making charges & GST.",
      icon: Sparkles,
    },
    {
      title: "Lifetime Exchange Guarantee",
      description: "Enjoy lifetime exchange and buyback options based on prevailing live market rates across all collections.",
      icon: RefreshCcw,
    },
  ];

  return (
    <section id="heritage" className="py-20 px-4 bg-[#06110c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heritage Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d2e21] border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-widest w-fit">
              Four Decades of Royal Heritage
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white leading-tight gold-text-gradient">
              Legacy of Purity, Passion &amp; Royal Artistry
            </h2>

            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              Founded in 1984 in the historic pink city of Jaipur, <strong className="text-white">Jain Jewells</strong> has evolved into a premier destination for royalty, connoisseurs, and families celebrating life&apos;s most cherished milestones.
            </p>

            <p className="text-sm text-white/70 font-light leading-relaxed">
              From hand-drawn sketches to molten gold, our master artisans preserve centuries-old Rajasthani goldsmithing techniques including Nakshi relief carving, Jadau Kundan, and intricate floral Meenakari.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <span className="text-3xl font-serif-luxury font-extrabold gold-text-gradient block">40+</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Years of Trust</span>
              </div>
              <div>
                <span className="text-3xl font-serif-luxury font-extrabold gold-text-gradient block">50,000+</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Happy Patron Families</span>
              </div>
            </div>
          </div>

          {/* Craftsmanship Image Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80"
                alt="Artisan Craftsmanship"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06110c] via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 emerald-glass p-4 rounded-2xl border border-[#d4af37]/30">
                <h4 className="text-base font-serif-luxury font-bold text-[#fcf6ba] mb-1">
                  Jaipur Master Goldsmiths
                </h4>
                <p className="text-xs text-white/70">
                  Every jewel undergoes 18 rigorous quality checks before receiving the Jain Jewells hallmark signature.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trust Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="emerald-glass p-6 rounded-2xl border border-[#d4af37]/20 flex flex-col gap-4 emerald-glass-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0d2a1e] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-serif-luxury font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
