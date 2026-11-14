"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Sparkles,
  Award,
  ShieldCheck,
  Palette,
  Navigation,
  Calendar,
  Eye,
  X,
} from "lucide-react";

interface ShowroomSpotlightProps {
  onOpenAppointment: () => void;
}

export const ShowroomSpotlight: React.FC<ShowroomSpotlightProps> = ({ onOpenAppointment }) => {
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-4 h-4 text-[#c8a05c]" strokeWidth={1.3} />;
      case "Award":
        return <Award className="w-4 h-4 text-[#c8a05c]" strokeWidth={1.3} />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-[#c8a05c]" strokeWidth={1.3} />;
      case "Palette":
        return <Palette className="w-4 h-4 text-[#c8a05c]" strokeWidth={1.3} />;
      default:
        return <Sparkles className="w-4 h-4 text-[#c8a05c]" strokeWidth={1.3} />;
    }
  };

  return (
    <section id="showroom" className="py-24 sm:py-32 px-5 sm:px-8 bg-[#0e0908] relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Title */}
        <div className="lux-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-10 border-b border-[#f6efe4]/10">
          <div className="max-w-2xl">
            <span className="lux-eyebrow block mb-4">The Flagship Destination</span>
            <h2 className="text-[2.4rem] sm:text-[3.4rem] font-light text-[#f6efe4] leading-[1.05] tracking-[-0.015em]">
              A Showroom, <span className="italic text-[#ecd8ae]">Not a Store</span>
            </h2>
          </div>
          <p className="text-[#a99987] text-xs sm:text-sm font-light leading-[1.9] max-w-sm lg:text-right">
            Private lounges, in-house gemologists and unhurried service — in the heart of Ludhiana since 1984.
          </p>
        </div>

        {/* Grid Layout: Left Info & Map, Right Image & Amenities */}
        <div className="lux-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Info Card */}
          <div className="lg:col-span-7 bg-[#150d0c] p-6 sm:p-10 border border-[#f6efe4]/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#c8a05c]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <span className="lux-eyebrow">Flagship Showroom</span>
                <span className="w-6 h-px bg-[#c8a05c]/50" />
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#a99987] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8a05c]" />
                  Open Today
                </span>
              </div>

              <h3 className="text-[1.9rem] sm:text-[2.4rem] font-light text-[#f6efe4] leading-tight mb-3">
                {SHOWROOM_DETAILS.name}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#c8a05c] mb-8">
                {SHOWROOM_DETAILS.tagline}
              </p>

              {/* Contact Details List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-[11px] font-light text-[#e0d4c2]/85 border-t border-b border-[#f6efe4]/10 py-7 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c8a05c] shrink-0 mt-0.5" strokeWidth={1.3} />
                  <div>
                    <strong className="block text-[8px] uppercase tracking-[0.2em] text-[#857768] font-normal mb-1.5">The Address</strong>
                    <span>{SHOWROOM_DETAILS.address}, {SHOWROOM_DETAILS.cityStatePincode}</span>
                    <div className="text-[10px] text-[#857768] mt-1">
                      {SHOWROOM_DETAILS.landmarks.join(" · ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c8a05c] shrink-0 mt-0.5" strokeWidth={1.3} />
                  <div>
                    <strong className="block text-[8px] uppercase tracking-[0.2em] text-[#857768] font-normal mb-1.5">Opening Hours</strong>
                    <div>{SHOWROOM_DETAILS.hours.weekdays}</div>
                    <div className="text-[10px] text-[#857768] mt-1">{SHOWROOM_DETAILS.hours.sunday}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c8a05c] shrink-0 mt-0.5" strokeWidth={1.3} />
                  <div>
                    <strong className="block text-[8px] uppercase tracking-[0.2em] text-[#857768] font-normal mb-1.5">Concierge</strong>
                    <div className="flex flex-col gap-1">
                      {SHOWROOM_DETAILS.phone.map((ph) => (
                        <a key={ph} href={`tel:${ph}`} className="hover:text-[#ecd8ae] transition-colors">
                          {ph}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#c8a05c] shrink-0 mt-0.5" strokeWidth={1.3} />
                  <div>
                    <strong className="block text-[8px] uppercase tracking-[0.2em] text-[#857768] font-normal mb-1.5">Email</strong>
                    <a href={`mailto:${SHOWROOM_DETAILS.email}`} className="hover:text-[#ecd8ae] transition-colors">
                      {SHOWROOM_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={SHOWROOM_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn lux-btn-gold"
              >
                <Navigation className="w-3.5 h-3.5" strokeWidth={1.4} />
                Directions
              </a>

              <button
                onClick={onOpenAppointment}
                className="lux-btn lux-btn-outline"
              >
                <Calendar className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} />
                Reserve a Visit
              </button>
            </div>
          </div>

          {/* Right Column: Showroom Image & Amenities */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Showroom Image Card */}
            <div className="relative overflow-hidden group border border-[#f6efe4]/10 h-72 sm:h-80">
              <Image
                src="https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1400&q=85"
                alt="The VIP lounge at Jain Jewells, Ludhiana"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover saturate-[0.85] transition-transform duration-[1200ms] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0908] via-[#0e0908]/25 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <span className="lux-eyebrow block mb-1.5">Inside the Maison</span>
                  <h4 className="text-2xl font-serif-luxury font-light text-[#f6efe4]">The VIP Lounge</h4>
                  <p className="text-[10px] text-[#a99987] mt-1">Heritage interiors · private consultation</p>
                </div>
                <button
                  onClick={() => setShowVirtualTour(true)}
                  className="shrink-0 bg-[#0e0908]/60 backdrop-blur-md border border-[#c8a05c]/50 text-[#ecd8ae] text-[9px] uppercase tracking-[0.18em] py-2.5 px-3.5 flex items-center gap-1.5 hover:bg-[#c8a05c] hover:text-[#0e0908] transition-all"
                >
                  <Eye className="w-3 h-3" strokeWidth={1.5} /> Preview
                </button>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#f6efe4]/10 border border-[#f6efe4]/10">
              {SHOWROOM_DETAILS.amenities.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#150d0c] p-5 flex flex-col gap-2 hover:bg-[#1e1413] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {getIcon(item.iconName)}
                    <h5 className="text-[11px] uppercase tracking-[0.1em] text-[#f6efe4]">{item.title}</h5>
                  </div>
                  <p className="text-[10px] text-[#a99987] leading-relaxed font-light">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="fixed inset-0 z-50 bg-[#080504]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#170d0c]/95 max-w-3xl w-full p-6 sm:p-8 border border-[#c8a05c]/25 relative shadow-2xl">
            <button
              onClick={() => setShowVirtualTour(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a99987] hover:text-[#f6efe4] border border-[#f6efe4]/10 hover:border-[#c8a05c]/50 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" strokeWidth={1.3} />
            </button>
            
            <span className="lux-eyebrow block mb-2">A Preview</span>
            <h3 className="text-[1.8rem] sm:text-[2.2rem] font-serif-luxury font-light text-[#f6efe4] mb-2">
              Inside the Ludhiana Maison
            </h3>
            <p className="text-[11px] text-[#a99987] font-light mb-6">
              Private viewing lounges, in-house gemologists and discreet security, in the heart of the city.
            </p>

            <div className="relative overflow-hidden h-72 sm:h-96 border border-[#f6efe4]/10 mb-6">
              <Image
                src="https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1400&q=85"
                alt="Showroom lounge"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover saturate-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0908]/90 via-[#0e0908]/25 to-transparent flex flex-col items-start justify-end text-left p-6 sm:p-8">
                <h4 className="text-2xl font-serif-luxury font-light text-[#f6efe4] mb-2">The Private Suite</h4>
                <p className="text-[11px] text-[#e0d4c2]/85 max-w-md font-light leading-relaxed">
                  Book an appointment with our master gemologists to view our rarest bridal collections, exclusively for your family.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowVirtualTour(false)}
                className="lux-btn lux-btn-outline"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setShowVirtualTour(false);
                  onOpenAppointment();
                }}
                className="lux-btn lux-btn-gold"
              >
                Reserve a Private Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
