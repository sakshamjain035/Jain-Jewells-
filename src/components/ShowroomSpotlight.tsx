"use client";

import React, { useState } from "react";
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
  MessageSquare,
} from "lucide-react";

interface ShowroomSpotlightProps {
  onOpenAppointment: () => void;
}

export const ShowroomSpotlight: React.FC<ShowroomSpotlightProps> = ({ onOpenAppointment }) => {
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#d4af37]" />;
      case "Award":
        return <Award className="w-6 h-6 text-[#d4af37]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#d4af37]" />;
      case "Palette":
        return <Palette className="w-6 h-6 text-[#d4af37]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#d4af37]" />;
    }
  };

  return (
    <section id="showroom" className="py-20 px-4 bg-[#06110c] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
            The Flagship Destination
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white mb-4 gold-text-gradient">
            Jain Jewells Showroom Experience
          </h2>
          <p className="text-white/70 text-base">
            Step into an realm of royal grandeur, private lounge hospitality, and certified jewelry craftsmanship in the heart of Jaipur.
          </p>
        </div>

        {/* Grid Layout: Left Info & Map, Right Image & Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Info Card */}
          <div className="lg:col-span-7 emerald-glass rounded-3xl p-6 sm:p-10 border border-[#d4af37]/30 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#0d2e21] text-[#fcf6ba] text-xs font-semibold uppercase tracking-wider border border-[#d4af37]/40">
                  Flagship Store
                </span>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open Today
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mb-3">
                {SHOWROOM_DETAILS.name}
              </h3>
              <p className="text-sm text-[#d4af37] font-medium tracking-wide mb-6">
                {SHOWROOM_DETAILS.tagline}
              </p>

              {/* Contact Details List */}
              <div className="flex flex-col gap-4 text-sm text-white/80 border-t border-b border-white/10 py-6 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Address:</strong>
                    <span>{SHOWROOM_DETAILS.address}, {SHOWROOM_DETAILS.cityStatePincode}</span>
                    <div className="text-xs text-white/50 mt-0.5">
                      Landmarks: {SHOWROOM_DETAILS.landmarks.join(" | ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Showroom Timings:</strong>
                    <div>{SHOWROOM_DETAILS.hours.weekdays}</div>
                    <div className="text-xs text-white/60">{SHOWROOM_DETAILS.hours.sunday}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Concierge &amp; Enquiries:</strong>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {SHOWROOM_DETAILS.phone.map((ph) => (
                        <a key={ph} href={`tel:${ph}`} className="hover:text-[#d4af37] transition-colors">
                          {ph}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Email Consultation:</strong>
                    <a href={`mailto:${SHOWROOM_DETAILS.email}`} className="hover:text-[#d4af37] transition-colors">
                      {SHOWROOM_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={SHOWROOM_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
              >
                <Navigation className="w-4 h-4" />
                Open Google Maps Directions
              </a>

              <button
                onClick={onOpenAppointment}
                className="bg-[#0d2a1e] hover:bg-[#123e2d] border border-[#d4af37]/40 text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                Reserve VIP Suite Visit
              </button>
            </div>
          </div>

          {/* Right Column: Showroom Image & Amenities */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Showroom Image Card */}
            <div className="relative rounded-3xl overflow-hidden group border border-[#d4af37]/30 h-64 sm:h-72 shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06110c] via-black/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-serif-luxury font-bold text-white">The VIP Lounge</h4>
                  <p className="text-xs text-white/70">Heritage interiors &amp; personal jewelry consultation</p>
                </div>
                <button
                  onClick={() => setShowVirtualTour(true)}
                  className="bg-[#06110c]/80 backdrop-blur-md border border-[#d4af37] text-[#fcf6ba] text-xs font-semibold py-2 px-3.5 rounded-full flex items-center gap-1.5 hover:bg-[#d4af37] hover:text-[#06110c] transition-all"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview Tour
                </button>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SHOWROOM_DETAILS.amenities.map((item) => (
                <div
                  key={item.title}
                  className="emerald-glass p-4 rounded-2xl border border-[#d4af37]/20 flex flex-col gap-2 hover:border-[#d4af37]/50 transition-all"
                >
                  <div className="flex items-center gap-2">
                    {getIcon(item.iconName)}
                    <h5 className="text-sm font-semibold text-white">{item.title}</h5>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="emerald-glass max-w-3xl w-full rounded-3xl p-6 border border-[#d4af37] relative shadow-2xl">
            <button
              onClick={() => setShowVirtualTour(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-serif-luxury font-bold gold-text-gradient mb-2">
              Jain Jewells Virtual Showroom Preview
            </h3>
            <p className="text-xs text-white/70 mb-6">
              Experience the luxury of our private viewing lounges and security lockers in Jaipur.
            </p>

            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 border border-white/10 mb-6">
              <img
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80"
                alt="Showroom Lounge"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/80 text-[#06110c] flex items-center justify-center mb-3 animate-bounce">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">VIP Personal Styling Suite</h4>
                <p className="text-xs text-white/80 max-w-md">
                  Book a private appointment to have our master gemologists present our rarest bridal collections exclusively for your family.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowVirtualTour(false)}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-white hover:bg-white/10"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setShowVirtualTour(false);
                  onOpenAppointment();
                }}
                className="gold-bg-gradient text-[#06110c] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Book VIP Visit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
