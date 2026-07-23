"use client";

import React, { useState } from "react";
import { Logo } from "./Logo";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";
import { Phone, MapPin, Mail, Clock, ShieldCheck, Award, MessageSquare, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) setSubscribed(true);
  };

  return (
    <footer className="bg-[#030907] border-t border-[#d4af37]/30 text-white/80 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Logo size="lg" />
            <p className="text-xs text-white/70 font-light leading-relaxed max-w-sm mt-2">
              Jain Jewells is Jaipur&apos;s celebrated luxury jewellery showroom, offering 100% BIS Hallmarked 22K Gold, GIA Certified Solitaires, Polki Bridal Couture &amp; Bespoke Artistry since 1984.
            </p>

            {/* Seals */}
            <div className="flex items-center gap-4 mt-2">
              <div className="emerald-glass px-3 py-1.5 rounded-xl border border-[#d4af37]/30 flex items-center gap-2 text-[11px] text-[#fcf6ba]">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> BIS 916 Hallmark
              </div>
              <div className="emerald-glass px-3 py-1.5 rounded-xl border border-[#d4af37]/30 flex items-center gap-2 text-[11px] text-[#fcf6ba]">
                <Award className="w-4 h-4 text-[#d4af37]" /> GIA &amp; IGI Certified
              </div>
            </div>
          </div>

          {/* Showroom Details Col */}
          <div className="lg:col-span-4 flex flex-col gap-3 text-xs">
            <h4 className="text-sm font-serif-luxury font-bold text-white uppercase tracking-wider text-[#d4af37]">
              Showroom Location &amp; Hours
            </h4>

            <div className="flex items-start gap-2.5 text-white/80">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{SHOWROOM_DETAILS.address}, {SHOWROOM_DETAILS.cityStatePincode}</span>
            </div>

            <div className="flex items-start gap-2.5 text-white/80">
              <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <div>{SHOWROOM_DETAILS.hours.weekdays}</div>
                <div className="text-white/50">{SHOWROOM_DETAILS.hours.sunday}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-white/80">
              <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
              <div className="flex gap-3">
                {SHOWROOM_DETAILS.phone.map((ph) => (
                  <a key={ph} href={`tel:${ph}`} className="hover:text-[#d4af37]">
                    {ph}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-white/80">
              <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
              <a href={`mailto:${SHOWROOM_DETAILS.email}`} className="hover:text-[#d4af37]">
                {SHOWROOM_DETAILS.email}
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-2 flex flex-col gap-2.5 text-xs">
            <h4 className="text-sm font-serif-luxury font-bold text-white uppercase tracking-wider text-[#d4af37]">
              Quick Navigation
            </h4>
            <a href="#hero" className="hover:text-[#d4af37] transition-colors">Home Showcase</a>
            <a href="#showroom" className="hover:text-[#d4af37] transition-colors">Showroom Tour</a>
            <a href="#collections" className="hover:text-[#d4af37] transition-colors">Jewellery Catalog</a>
            <a href="#bespoke" className="hover:text-[#d4af37] transition-colors">Bespoke Design Lab</a>
            <a href="#rates" className="hover:text-[#d4af37] transition-colors">Daily Gold Rates</a>
            <a href="#heritage" className="hover:text-[#d4af37] transition-colors">Our Heritage</a>
          </div>

          {/* Newsletter / Gold Rate Alert Col */}
          <div className="lg:col-span-2 flex flex-col gap-3 text-xs">
            <h4 className="text-sm font-serif-luxury font-bold text-white uppercase tracking-wider text-[#d4af37]">
              Daily Rate Alerts
            </h4>
            <p className="text-white/60 leading-relaxed">
              Subscribe for daily Jaipur live gold rate SMS/email alerts and exclusive bridal launches.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-[#061811] border border-white/20 text-white rounded-xl p-2.5 outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="gold-bg-gradient text-[#06110c] font-bold py-2 rounded-xl text-center uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="bg-[#0d2a1e] text-emerald-400 p-3 rounded-xl text-[11px] border border-emerald-500/30">
                ✓ Subscribed to daily gold rate updates!
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © 1984 – {new Date().getFullYear()} <strong className="text-white">Jain Jewells</strong>. All Rights Reserved. 
            <span className="hidden sm:inline font-light"> | BIS Hallmark HUID 6-Digit Guaranteed.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Purity</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Lifetime Exchange Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
