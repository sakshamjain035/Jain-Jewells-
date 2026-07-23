"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, MapPin, Award, ChevronRight, ChevronLeft } from "lucide-react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";

interface HeroProps {
  onOpenAppointment: () => void;
}

const HERO_SLIDES = [
  {
    title: "Royal Rajwadi Polki & Kundan Bridal Couture",
    subtitle: "Handcrafted heritage heirlooms designed for the royal Indian bride.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1800&q=85",
    tag: "Bridal Showcase 2026",
    ctaText: "Explore Bridal Collection",
    ctaLink: "#collections",
  },
  {
    title: "GIA Certified Solitaires & Fine Diamond Jewelry",
    subtitle: "Precision-cut brilliance in 18K Rose, White & Platinum prongs.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1800&q=85",
    tag: "Solitaire Collection",
    ctaText: "View Diamond Solitaires",
    ctaLink: "#collections",
  },
  {
    title: "Mastercrafted Antique Nakshi Temple Gold",
    subtitle: "22K BIS Hallmarked 916 gold masterworks sculptured by traditional Jaipur artisans.",
    image: "https://images.unsplash.com/photo-1611591475281-8d9954a2be31?auto=format&fit=crop&w=1800&q=85",
    tag: "Heritage Artisans",
    ctaText: "Discover Antique Gold",
    ctaLink: "#collections",
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero" className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel Slider */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
            style={{ backgroundImage: `url(${s.image})` }}
          />
          {/* Dark luxury radial overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06110c]/95 via-[#06110c]/70 to-[#06110c]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06110c] via-transparent to-[#06110c]/60" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 sm:py-24">
        <div className="max-w-2xl text-left">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d2e21]/90 border border-[#d4af37]/50 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4" />
            {slide.tag}
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white leading-[1.15] mb-6 gold-text-gradient">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-8 max-w-xl">
            {slide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <a
              href={slide.ctaLink}
              className="gold-bg-gradient text-[#06110c] font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              {slide.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenAppointment}
              className="bg-[#0d2a1e]/90 hover:bg-[#144230] text-white font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] transition-all backdrop-blur-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#d4af37]" />
              Book VIP Showroom Visit
            </button>
          </div>

          {/* Trust Pillars Bar */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-white/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div className="text-xs">
                <strong className="block text-white font-semibold">100% BIS Hallmarked</strong>
                <span className="text-white/60 hidden sm:inline">6-Digit HUID Code</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div className="text-xs">
                <strong className="block text-white font-semibold">GIA & IGI Certified</strong>
                <span className="text-white/60 hidden sm:inline">Natural Solitaires</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div className="text-xs">
                <strong className="block text-white font-semibold">Jaipur Flagship</strong>
                <span className="text-white/60 hidden sm:inline">Since 1984</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3">
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
          className="p-2.5 rounded-full bg-[#06110c]/80 border border-[#d4af37]/30 text-white hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06110c]/80 border border-white/10 text-xs font-bold text-white">
          <span>{currentSlide + 1}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/60">{HERO_SLIDES.length}</span>
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="p-2.5 rounded-full bg-[#06110c]/80 border border-[#d4af37]/30 text-white hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
