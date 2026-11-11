"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Award, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  onOpenAppointment: () => void;
}

const HERO_SLIDES = [
  {
    title: "Royal Rajwadi Polki & Kundan Bridal Couture",
    subtitle:
      "Handcrafted heritage heirlooms for the modern Indian bride — set by hand in Jaipur, one stone at a time.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=88",
    tag: "Bridal Showcase 2026",
    ctaText: "Explore Bridal",
    ctaLink: "#collections",
  },
  {
    title: "GIA Certified Solitaires & Fine Diamond Jewellery",
    subtitle:
      "Precision-cut brilliance held in 18K rose, white gold and platinum — chosen for a lifetime, and beyond.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=88",
    tag: "The Solitaire Edit",
    ctaText: "View Solitaires",
    ctaLink: "#collections",
  },
  {
    title: "Mastercrafted Antique Gold, in the Jaipur Tradition",
    subtitle:
      "22K BIS hallmarked 916 gold, sculpted by fourth-generation artisans in the ateliers of the Pink City.",
    image:
      "https://images.unsplash.com/photo-1599459183200-59c7687a0275?auto=format&fit=crop&w=2000&q=88",
    tag: "Heritage Ateliers",
    ctaText: "Discover Antique Gold",
    ctaLink: "#collections",
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[86vh] lg:min-h-[92vh] flex flex-col justify-end overflow-hidden border-b border-[#c9a96a]/15"
    >
      {/* Imagery */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.title}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            idx === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={idx !== currentSlide}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            sizes="100vw"
            preload={idx === 0}
            loading={idx === 0 ? "eager" : "lazy"}
            className={`object-cover object-center transition-transform duration-[9000ms] ease-out ${
              idx === currentSlide ? "scale-100" : "scale-[1.04]"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a08]/95 via-[#0a0a08]/62 to-[#0a0a08]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08] via-transparent to-[#0a0a08]/45" />
        </div>
      ))}

      {/* Vertical house signature */}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-5">
        <span className="w-px h-16 bg-gradient-to-b from-transparent to-[#c9a96a]/50" />
        <span className="[writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.4em] text-[#e8d9b4]/60">
          The House of Jain · Jaipur
        </span>
        <span className="w-px h-16 bg-gradient-to-t from-transparent to-[#c9a96a]/50" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-5 sm:px-8 pt-16 pb-10 sm:pb-14">
        <div className="max-w-[46rem]">
          <div key={currentSlide} className="lux-fade">
            <div className="flex items-center gap-4 mb-7 sm:mb-9">
              <span className="text-[10px] tracking-[0.3em] text-[#c9a96a]">
                0{currentSlide + 1}
              </span>
              <span className="w-10 h-px bg-[#c9a96a]/60" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#e8d9b4]/90">
                {slide.tag}
              </span>
            </div>

            <h1 className="font-serif-luxury font-light text-[#f6f1e6] text-[2.6rem] sm:text-[4.1rem] lg:text-[5rem] leading-[1.02] tracking-[-0.015em] mb-6 sm:mb-7">
              {slide.title}
            </h1>

            <p className="text-[#ded6c7]/80 text-sm sm:text-base font-light leading-[1.8] max-w-lg mb-9">
              {slide.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7 lux-fade lux-fade-2">
            <a href={slide.ctaLink} className="lux-btn lux-btn-gold group">
              {slide.ctaText}
              <ArrowRight
                className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
                strokeWidth={1.6}
              />
            </a>

            <button
              onClick={onOpenAppointment}
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-[#f4eee3] py-3"
            >
              <span className="border-b border-[#f4eee3]/30 group-hover:border-[#c9a96a] pb-1 transition-colors">
                Book a Private Viewing
              </span>
              <ArrowRight
                className="w-3.5 h-3.5 text-[#c9a96a] group-hover:translate-x-1 transition-transform"
                strokeWidth={1.4}
              />
            </button>
          </div>
        </div>

        {/* Slide controls + assurances */}
        <div className="mt-14 sm:mt-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-[#f4eee3]/12 max-w-2xl w-full">
            {[
              { icon: ShieldCheck, title: "BIS 916 Hallmarked", note: "6-digit HUID" },
              { icon: Award, title: "GIA & IGI Certified", note: "Natural diamonds" },
              { icon: MapPin, title: "Jaipur Flagship", note: "Since 1984" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 py-4 sm:py-5 sm:px-5 first:sm:pl-0 border-b sm:border-b-0 sm:border-r border-[#f4eee3]/10 last:border-0"
              >
                <item.icon className="w-4 h-4 text-[#c9a96a] mt-0.5 shrink-0" strokeWidth={1.3} />
                <div>
                  <p className="text-[11px] text-[#f4eee3] tracking-[0.06em]">{item.title}</p>
                  <p className="text-[10px] text-[#a79e8e] tracking-[0.08em] mt-1">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5 self-end">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.title}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-px transition-all duration-500 ${
                    idx === currentSlide
                      ? "w-12 bg-[#c9a96a]"
                      : "w-6 bg-[#f4eee3]/25 hover:bg-[#f4eee3]/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
                }
                className="w-9 h-9 flex items-center justify-center border border-[#c9a96a]/30 text-[#ded6c7] hover:border-[#c9a96a] hover:text-[#f4eee3] transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.3} />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="w-9 h-9 flex items-center justify-center border border-[#c9a96a]/30 text-[#ded6c7] hover:border-[#c9a96a] hover:text-[#f4eee3] transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
