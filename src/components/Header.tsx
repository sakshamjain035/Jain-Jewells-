"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { SHOWROOM_DETAILS, LIVE_METAL_RATES } from "@/data/jewelryData";
import {
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Menu,
  X,
  Heart,
  TrendingUp,
  MessageSquare,
  Clock,
} from "lucide-react";

interface HeaderProps {
  onOpenAppointment: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAppointment,
  wishlistCount,
  onOpenWishlist,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const gold22kRate = LIVE_METAL_RATES.find((r) => r.metal === "22K Gold");

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner Ticker */}
      <div className="bg-[#040b08] border-b border-[#d4af37]/20 py-1.5 px-4 text-xs text-[#d4af37]/90">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            <span className="flex items-center gap-1.5 font-semibold text-[#fcf6ba]">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Live 22K Gold Rate:
              <span className="text-white font-bold">
                ₹{gold22kRate?.ratePerGram.toLocaleString("en-IN")}/g
              </span>
              <span className="text-emerald-400 text-[10px] bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                {gold22kRate?.change}
              </span>
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:flex items-center gap-1 text-white/80">
              <Clock className="w-3 h-3 text-[#d4af37]" />
              {SHOWROOM_DETAILS.hours.weekdays}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${SHOWROOM_DETAILS.phone[0]}`}
              className="flex items-center gap-1 text-white/90 hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span className="hidden sm:inline">Showroom:</span> {SHOWROOM_DETAILS.phone[0]}
            </a>
            <a
              href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=Hello%20Jain%20Jewells%2C%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <MessageSquare className="w-3 h-3 fill-emerald-500/20" />
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#06110c]/90 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-2xl py-3"
            : "bg-[#06110c]/70 backdrop-blur-md border-b border-[#d4af37]/15 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="focus:outline-none">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-white/80">
            <a
              href="#hero"
              className="hover:text-[#d4af37] transition-colors hover:scale-105 transform duration-200"
            >
              Home
            </a>
            <a
              href="#showroom"
              className="hover:text-[#d4af37] transition-colors hover:scale-105 transform duration-200"
            >
              Showroom
            </a>
            <a
              href="#collections"
              className="hover:text-[#d4af37] transition-colors hover:scale-105 transform duration-200"
            >
              Collections
            </a>
            <a
              href="#bespoke"
              className="hover:text-[#d4af37] transition-colors hover:scale-105 transform duration-200"
            >
              Bespoke Lab
            </a>
            <a
              href="#rates"
              className="hover:text-[#d4af37] transition-colors hover:scale-105 transform duration-200"
            >
              Live Rates
            </a>
            <a
              href="#heritage"
              className="hover:text-[#d4af37] transition-colors hover:scale-105 transform duration-200"
            >
              Heritage
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Wishlist button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full text-white/80 hover:text-[#d4af37] hover:bg-[#0d2a1e] border border-transparent hover:border-[#d4af37]/30 transition-all"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#06110c] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#06110c]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* VIP Appointment CTA */}
            <button
              onClick={onOpenAppointment}
              className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book VIP Visit
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-white/90"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#06110c] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#d4af37] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[102px] bg-[#06110c]/95 backdrop-blur-2xl border-b border-[#d4af37]/30 p-6 flex flex-col gap-5 shadow-2xl z-50">
          <nav className="flex flex-col gap-4 text-base font-serif-luxury text-white">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] border-b border-white/10 pb-2"
            >
              Home Showcase
            </a>
            <a
              href="#showroom"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] border-b border-white/10 pb-2"
            >
              Showroom Location & Details
            </a>
            <a
              href="#collections"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] border-b border-white/10 pb-2"
            >
              Jewellery Collections
            </a>
            <a
              href="#bespoke"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] border-b border-white/10 pb-2"
            >
              Bespoke Customizer Lab
            </a>
            <a
              href="#rates"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] border-b border-white/10 pb-2"
            >
              Live Gold & Silver Rates
            </a>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] border-b border-white/10 pb-2"
            >
              Our Heritage & Quality Seals
            </a>
          </nav>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full gold-bg-gradient text-[#06110c] font-bold text-sm uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Book Private VIP Appointment
            </button>
            <a
              href={SHOWROOM_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0d2a1e] border border-[#d4af37]/40 text-white font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              Get Showroom Directions
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
