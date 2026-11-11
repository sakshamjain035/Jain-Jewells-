"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { SHOWROOM_DETAILS, LIVE_METAL_RATES } from "@/data/jewelryData";
import {
  Phone,
  Calendar,
  Menu,
  X,
  Heart,
  Clock,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";

interface HeaderProps {
  onOpenAppointment: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

const NAV_LINKS = [
  { label: "Maison", href: "#hero" },
  { label: "Showroom", href: "#showroom" },
  { label: "Collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "Gold Rates", href: "#rates" },
  { label: "Heritage", href: "#heritage" },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenAppointment,
  wishlistCount,
  onOpenWishlist,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const gold22kRate = LIVE_METAL_RATES.find((r) => r.metal === "22K Gold");

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Fine utility bar */}
      <div className="bg-[#0a0606] border-b border-[#c8a05c]/15 text-[10px] tracking-[0.18em] uppercase text-[#a99987]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-4 h-9">
          <div className="flex items-center gap-5 min-w-0 overflow-hidden">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-1 h-1 rounded-full bg-[#c8a05c]" />
              <span className="hidden sm:inline text-[#857768]">22K Gold</span>
              <span className="text-[#ecd8ae] tracking-[0.12em]">
                ₹{gold22kRate?.ratePerGram.toLocaleString("en-IN")}
                <span className="text-[#857768]"> /g</span>
              </span>
              <span className="text-[#a99987]/80 normal-case tracking-normal text-[10px]">
                {gold22kRate?.change}
              </span>
            </span>

            <span className="hidden lg:block w-px h-3 bg-[#f6efe4]/10" />
            <span className="hidden lg:flex items-center gap-2 whitespace-nowrap text-[#857768]">
              <Clock className="w-3 h-3 text-[#c8a05c]/70" strokeWidth={1.4} />
              {SHOWROOM_DETAILS.hours.weekdays}
            </span>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <a
              href={`tel:${SHOWROOM_DETAILS.phone[0]}`}
              className="hidden sm:flex items-center gap-2 hover:text-[#ecd8ae] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#c8a05c]/70" strokeWidth={1.4} />
              {SHOWROOM_DETAILS.phone[0]}
            </a>
            <a
              href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=Hello%20Jain%20Jewells%2C%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#ecd8ae] transition-colors"
            >
              <MessageSquare className="w-3 h-3 text-[#c8a05c]/70" strokeWidth={1.4} />
              <span className="hidden md:inline">Concierge</span>
              <span className="md:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#0e0908]/92 backdrop-blur-xl border-b border-[#c8a05c]/20 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)]"
            : "bg-[#0e0908]/55 backdrop-blur-md border-b border-[#f6efe4]/8"
        }`}
      >
        <div
          className={`max-w-[1400px] mx-auto px-5 sm:px-8 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-[70px]" : "h-[84px]"
          }`}
        >
          <a href="#hero" className="focus:outline-none shrink-0" aria-label="Jain Jewells home">
            <Logo size="md" />
          </a>

          <nav className="hidden lg:flex items-center gap-9 xl:gap-11">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[10px] uppercase tracking-[0.24em] text-[#e0d4c2]/80 hover:text-[#f6efe4] transition-colors py-3"
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#c8a05c] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-[#e0d4c2]/85 hover:text-[#ecd8ae] transition-colors"
              title="Saved pieces"
              aria-label="Open wishlist"
            >
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.3} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] rounded-full bg-[#c8a05c] text-[#0e0908] text-[9px] font-semibold flex items-center justify-center px-1">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAppointment}
              className="hidden sm:inline-flex lux-btn lux-btn-outline !py-3 !px-5 !text-[9px]"
            >
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.4} />
              Book a Viewing
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#f6efe4] hover:text-[#c8a05c] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0908]/98 backdrop-blur-2xl lg:hidden overflow-y-auto">
          <div className="flex items-center justify-between px-5 sm:px-8 h-[70px] border-b border-[#f6efe4]/8">
            <Logo size="md" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#f6efe4] hover:text-[#c8a05c] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" strokeWidth={1.2} />
            </button>
          </div>

          <nav className="px-6 sm:px-8 py-10 flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between py-5 border-b border-[#f6efe4]/8"
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-[10px] tracking-[0.2em] text-[#c8a05c]/60">
                    0{i + 1}
                  </span>
                  <span className="font-serif-luxury text-3xl text-[#f6efe4] group-hover:text-[#ecd8ae] transition-colors">
                    {link.label}
                  </span>
                </span>
                <ArrowUpRight
                  className="w-5 h-5 text-[#c8a05c]/50 group-hover:text-[#c8a05c] transition-colors"
                  strokeWidth={1.2}
                />
              </a>
            ))}
          </nav>

          <div className="px-6 sm:px-8 pb-12 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full lux-btn lux-btn-gold"
            >
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              Reserve a Private Viewing
            </button>
            <a
              href={`tel:${SHOWROOM_DETAILS.phone[0]}`}
              className="w-full lux-btn lux-btn-outline"
            >
              <Phone className="w-4 h-4 text-[#c8a05c]" strokeWidth={1.4} />
              {SHOWROOM_DETAILS.phone[0]}
            </a>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#857768] text-center pt-4">
              Jaipur · Established 1984
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
