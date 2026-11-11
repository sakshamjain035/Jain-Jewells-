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
        return <Sparkles className="w-4 h-4 text-[#c9a96a]" strokeWidth={1.3} />;
      case "Award":
        return <Award className="w-4 h-4 text-[#c9a96a]" strokeWidth={1.3} />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-[#c9a96a]" strokeWidth={1.3} />;
      case "Palette":
        return <Palette className="w-4 h-4 text-[#c9a96a]" strokeWidth={1.3} />;
      default:
        return <Sparkles className="w-4 h-4 text-[#c9a96a]" strokeWidth={1.3} />;
    }
  };

  return (
    <section id="showroom" className="py-24 sm:py-32 px-5 sm:px-8 bg-[#0a0a08] relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Title */}
        <div className="lux-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-10 border-b border-[#f4eee3]/10">
          <div className="max-w-2xl">
            <span className="lux-eyebrow block mb-4">The Flagship Destination</span>
            <h2 className="text-[2.4rem] sm:text-[3.4rem] font-light text-[#f4eee3] leading-[1.05] tracking-[-0.015em]">
              A Showroom, <span className="italic text-[#e8d9b4]">Not a Store</span>
            </h2>
          </div>
          <p className="text-[#a79e8e] text-xs sm:text-sm font-light leading-[1.9] max-w-sm lg:text-right">
            Private lounges, in-house gemologists and unhurried service — in the heart of Jaipur since 1984.
          </p>
        </div>

        {/* Grid Layout: Left Info & Map, Right Image & Amenities */}
        <div className="lux-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Info Card */}
          <div className="lg:col-span-7 bg-[#0f0d0a] p-6 sm:p-10 border border-[#f4eee3]/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#c9a96a]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <span className="lux-eyebrow">Flagship Showroom</span>
                <span className="w-6 h-px bg-[#c9a96a]/50" />
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#a79e8e] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96a]" />
                  Open Today
                </span>
              </div>

              <h3 className="text-[1.9rem] sm:text-[2.4rem] font-light text-[#f4eee3] leading-tight mb-3">
                {SHOWROOM_DETAILS.name}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#c9a96a] mb-8">
                {SHOWROOM_DETAILS.tagline}
              </p>

              {/* Contact Details List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-[11px] font-light text-[#ded6c7]/85 border-t border-b border-[#f4eee3]/10 py-7 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c9a96a] shrink-0 mt-0.5" strokeWidth={1.3} />
                  <div>
                    <strong className="block text-[8px] uppercase tracking-[0.2em] text-[#7f786c] font-normal mb-1.5">The Address</strong>
                    <span>{SHOWROOM_DETAILS.address}, {SHOWROOM_DETAILS.cityStatePincode}</span>
                    <div className="text-[10px] text-[#7f786c] mt-1">
                      {SHOWROOM_DETAILS.landmarks.join(" · ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c9a96a] shrink-0 mt-0.5" strokeWidth={1.3} />
                  <div>
                    <strong className="block text-[8px] uppercase tracking-[0.2em] text-[#7f786c] font-normal mb-1.5">Opening Hours</strong>
                    <div>{SHOWROOM_DETAILS.hours.weekdays}</div>
                    <div className="text-[10px] text-[#7f786c] mt-1">{SHOWROOM_DETAILS.hours.sunday}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c9a96a] shrink-0 mt-0.5" strokeWidth={1.3} />
                  <div>
                    <strong className="block text-[8px] uppercase tracking-[0.2em] text-[#7f786c] font-normal mb-1.5">Concierge</strong>
                    <div className="flex flex-col gap-1">
                      {SHOWROOM_DETAILS.phone.map((ph) => (
                        <a key={ph} href={`tel:${ph}`} className="hover:text-[#e8d9b4] transition-colors">
                          {ph}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#c9a96a] shrink-0 mt-0.5" strokeWidth={1.3} />
                  <div>
                    <strong className="block text-[8px] uppercase tracking-[0.2em] text-[#7f786c] font-normal mb-1.5">Email</strong>
                    <a href={`mailto:${SHOWROOM_DETAILS.email}`} className="hover:text-[#e8d9b4] transition-colors">
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
                <Calendar className="w-3.5 h-3.5 text-[#c9a96a]" strokeWidth={1.4} />
                Reserve a Visit
              </button>
            </div>
          </div>

          {/* Right Column: Showroom Image & Amenities */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Showroom Image Card */}
            <div className="relative overflow-hidden group border border-[#f4eee3]/10 h-72 sm:h-80">
              <Image
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80"
                alt="The VIP lounge at Jain Jewells, Jaipur"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover saturate-[0.85] transition-transform duration-[1200ms] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08] via-[#0a0a08]/25 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <span className="lux-eyebrow block mb-1.5">Inside the Maison</span>
                  <h4 className="text-2xl font-serif-luxury font-light text-[#f4eee3]">The VIP Lounge</h4>
                  <p className="text-[10px] text-[#a79e8e] mt-1">Heritage interiors · private consultation</p>
                </div>
                <button
                  onClick={() => setShowVirtualTour(true)}
                  className="shrink-0 bg-[#0a0a08]/60 backdrop-blur-md border border-[#c9a96a]/50 text-[#e8d9b4] text-[9px] uppercase tracking-[0.18em] py-2.5 px-3.5 flex items-center gap-1.5 hover:bg-[#c9a96a] hover:text-[#0a0a08] transition-all"
                >
                  <Eye className="w-3 h-3" strokeWidth={1.5} /> Preview
                </button>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#f4eee3]/10 border border-[#f4eee3]/10">
              {SHOWROOM_DETAILS.amenities.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#0f0d0a] p-5 flex flex-col gap-2 hover:bg-[#16130e] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {getIcon(item.iconName)}
                    <h5 className="text-[11px] uppercase tracking-[0.1em] text-[#f4eee3]">{item.title}</h5>
                  </div>
                  <p className="text-[10px] text-[#a79e8e] leading-relaxed font-light">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="fixed inset-0 z-50 bg-[#050504]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#100e0b]/95 max-w-3xl w-full p-6 sm:p-8 border border-[#c9a96a]/25 relative shadow-2xl">
            <button
              onClick={() => setShowVirtualTour(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a79e8e] hover:text-[#f4eee3] border border-[#f4eee3]/10 hover:border-[#c9a96a]/50 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" strokeWidth={1.3} />
            </button>
            
            <span className="lux-eyebrow block mb-2">A Preview</span>
            <h3 className="text-[1.8rem] sm:text-[2.2rem] font-serif-luxury font-light text-[#f4eee3] mb-2">
              Inside the Jaipur Maison
            </h3>
            <p className="text-[11px] text-[#a79e8e] font-light mb-6">
              Private viewing lounges, in-house gemologists and discreet security, in the heart of the city.
            </p>

            <div className="relative overflow-hidden h-72 sm:h-96 border border-[#f4eee3]/10 mb-6">
              <Image
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80"
                alt="Showroom lounge"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover saturate-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08]/90 via-[#0a0a08]/25 to-transparent flex flex-col items-start justify-end text-left p-6 sm:p-8">
                <h4 className="text-2xl font-serif-luxury font-light text-[#f4eee3] mb-2">The Private Suite</h4>
                <p className="text-[11px] text-[#ded6c7]/85 max-w-md font-light leading-relaxed">
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
