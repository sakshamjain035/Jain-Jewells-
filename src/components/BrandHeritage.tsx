"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Award, RefreshCcw, Sparkles } from "lucide-react";

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
    <section id="heritage" className="py-24 sm:py-32 px-5 sm:px-8 bg-[#100a09] border-t border-[#c8a05c]/12 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Heritage Story Grid */}
        <div className="lux-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-6 flex flex-col gap-7">
            <span className="lux-eyebrow">Four Decades of Heritage</span>

            <h2 className="text-[2.4rem] sm:text-[3.4rem] font-light text-[#f6efe4] leading-[1.06] tracking-[-0.015em]">
              A Legacy of Purity,<br />
              <span className="italic text-[#ecd8ae]">Passion &amp; Artistry</span>
            </h2>

            <p className="text-[13px] sm:text-sm text-[#e0d4c2]/85 font-light leading-[1.9]">
              Founded in 1984 in the historic city of Ludhiana, <strong className="text-[#f6efe4] font-normal">Jain Jewells</strong> has become a quiet destination for royalty, connoisseurs and families marking life&apos;s most cherished milestones.
            </p>

            <p className="text-[13px] text-[#a99987] font-light leading-[1.9]">
              From hand-drawn sketches to molten gold, our master artisans preserve centuries-old Rajasthani goldsmithing techniques — Nakshi relief carving, Jadau Kundan and intricate floral Meenakari.
            </p>

            <div className="grid grid-cols-2 gap-6 border-t border-[#f6efe4]/10 pt-7">
              <div>
                <span className="text-[2.6rem] font-serif-luxury font-light text-[#ecd8ae] block leading-none">40+</span>
                <span className="text-[9px] text-[#857768] uppercase tracking-[0.2em] block mt-2">Years of trust</span>
              </div>
              <div>
                <span className="text-[2.6rem] font-serif-luxury font-light text-[#ecd8ae] block leading-none">50,000+</span>
                <span className="text-[9px] text-[#857768] uppercase tracking-[0.2em] block mt-2">Patron families</span>
              </div>
            </div>
          </div>

          {/* Craftsmanship Image Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-[#f6efe4]/10 group h-[420px] sm:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1400&q=85"
                alt="Layered gold chains from the Jain Jewells atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover saturate-[0.85] transition-transform duration-[1400ms] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0908] via-[#0e0908]/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="lux-eyebrow block mb-2">The Atelier</span>
                <h4 className="text-2xl font-serif-luxury font-light text-[#f6efe4] mb-2">
                  Ludhiana Master Goldsmiths
                </h4>
                <p className="text-[11px] text-[#a99987] font-light leading-relaxed max-w-sm">
                  Every jewel undergoes eighteen rigorous quality checks before it receives the House of Jain signature.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trust Pillars */}
        <div className="lux-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#f6efe4]/10 border border-[#f6efe4]/10">
          {pillars.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#150d0c] p-7 sm:p-8 flex flex-col gap-5 hover:bg-[#1d1312] transition-colors duration-500"
              >
                <div className="w-9 h-9 border border-[#c8a05c]/35 text-[#c8a05c] flex items-center justify-center">
                  <IconComponent className="w-4 h-4" strokeWidth={1.2} />
                </div>
                <div>
                  <h3 className="text-lg font-serif-luxury font-light text-[#f6efe4] mb-2.5 leading-snug">{item.title}</h3>
                  <p className="text-[10.5px] text-[#a99987] leading-[1.85] font-light">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
