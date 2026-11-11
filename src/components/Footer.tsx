"use client";

import React, { useState } from "react";
import { Logo } from "./Logo";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";
import { Phone, MapPin, Mail, Clock, ShieldCheck, Award, ArrowRight } from "lucide-react";

const SHOP_LINKS = [
  { label: "The Maison", href: "#hero" },
  { label: "Showroom Tour", href: "#showroom" },
  { label: "Collections", href: "#collections" },
  { label: "Bespoke Atelier", href: "#bespoke" },
  { label: "Live Gold Rates", href: "#rates" },
  { label: "Our Heritage", href: "#heritage" },
];

const CARE_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchange", href: "/returns" },
];

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) setSubscribed(true);
  };

  return (
    <footer className="bg-[#080706] border-t border-[#c9a96a]/25 text-[#ded6c7] relative overflow-hidden">
      {/* Newsletter band */}
      <div className="border-b border-[#f4eee3]/8">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-14 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="lux-eyebrow block mb-4">The House Letter</span>
            <h2 className="text-[2rem] sm:text-[2.8rem] font-light text-[#f4eee3] leading-[1.08] tracking-[-0.01em]">
              Private previews, quiet launches,
              <br className="hidden sm:block" />
              <span className="italic text-[#e8d9b4]"> and the day&apos;s gold rate.</span>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pl-10">
            <p className="text-[11px] text-[#a79e8e] font-light leading-[1.8] mb-5 max-w-md">
              A considered letter from our Jaipur atelier — new collections, bridal previews and daily metal alerts. No noise.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-end gap-3 max-w-md">
                <div className="flex-1">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-transparent border-b border-[#f4eee3]/20 focus:border-[#c9a96a] text-[11px] tracking-[0.03em] text-[#f4eee3] placeholder-[#7f786c] py-3 outline-none transition-colors rounded-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#e8d9b4] pb-3 shrink-0 hover:text-[#f4eee3] transition-colors"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5 text-[#c9a96a] group-hover:translate-x-1 transition-transform" strokeWidth={1.4} />
                </button>
              </form>
            ) : (
              <div className="border border-[#c9a96a]/30 px-4 py-3 text-[10px] tracking-[0.12em] uppercase text-[#e8d9b4] max-w-md">
                Thank you — you are on the list.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-14 border-b border-[#f4eee3]/8">
          {/* Brand */}
          <div className="lg:col-span-5 flex flex-col gap-6 pr-0 lg:pr-14">
            <Logo size="lg" />
            <p className="text-[11px] text-[#a79e8e] font-light leading-[1.95] max-w-sm">
              Jain Jewells is a Jaipur maison of fine jewellery — 100% BIS hallmarked gold, GIA certified solitaires, royal Polki couture and bespoke artistry, since 1984.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#a79e8e]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c9a96a]" strokeWidth={1.3} /> BIS 916
              </span>
              <span className="w-px h-3 bg-[#f4eee3]/12" />
              <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#a79e8e]">
                <Award className="w-3.5 h-3.5 text-[#c9a96a]" strokeWidth={1.3} /> GIA &amp; IGI
              </span>
            </div>
          </div>

          {/* Showroom */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h4 className="text-[9px] uppercase tracking-[0.28em] text-[#c9a96a]">The Showroom</h4>

            <div className="flex items-start gap-3 text-[11px] text-[#ded6c7]/85 font-light leading-relaxed">
              <MapPin className="w-4 h-4 text-[#c9a96a] shrink-0 mt-0.5" strokeWidth={1.3} />
              <span>
                {SHOWROOM_DETAILS.address},<br />
                {SHOWROOM_DETAILS.cityStatePincode}
              </span>
            </div>

            <div className="flex items-start gap-3 text-[11px] text-[#ded6c7]/85 font-light">
              <Clock className="w-4 h-4 text-[#c9a96a] shrink-0 mt-0.5" strokeWidth={1.3} />
              <div>
                <div>{SHOWROOM_DETAILS.hours.weekdays}</div>
                <div className="text-[#7f786c] mt-1">{SHOWROOM_DETAILS.hours.sunday}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[11px] text-[#ded6c7]/85 font-light">
              <Phone className="w-4 h-4 text-[#c9a96a] shrink-0 mt-0.5" strokeWidth={1.3} />
              <div className="flex flex-col gap-1">
                {SHOWROOM_DETAILS.phone.map((ph) => (
                  <a key={ph} href={`tel:${ph}`} className="hover:text-[#e8d9b4] transition-colors">
                    {ph}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-[#ded6c7]/85 font-light">
              <Mail className="w-4 h-4 text-[#c9a96a] shrink-0" strokeWidth={1.3} />
              <a href={`mailto:${SHOWROOM_DETAILS.email}`} className="hover:text-[#e8d9b4] transition-colors">
                {SHOWROOM_DETAILS.email}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-[9px] uppercase tracking-[0.28em] text-[#c9a96a] mb-1">Explore</h4>
              {SHOP_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[11px] text-[#a79e8e] font-light hover:text-[#f4eee3] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-[9px] uppercase tracking-[0.28em] text-[#c9a96a] mb-1">Client Care</h4>
              {CARE_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[11px] text-[#a79e8e] font-light hover:text-[#f4eee3] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a href="/admin" className="text-[11px] text-[#c9a96a] hover:text-[#e8d9b4] transition-colors mt-1">
                Admin Portal
              </a>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="py-8 overflow-hidden select-none pointer-events-none" aria-hidden="true">
          <p className="font-serif-luxury text-center text-[13vw] leading-none tracking-[0.06em] text-[#f4eee3]/[0.04] whitespace-nowrap">
            Jain Jewells
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] uppercase tracking-[0.16em] text-[#7f786c] border-t border-[#f4eee3]/8 pt-6">
          <div>
            © 1984–{new Date().getFullYear()} Jain Jewells · Jaipur
          </div>
          <div className="text-center text-[8px] tracking-[0.18em]">
            BIS Hallmark HUID guaranteed · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
