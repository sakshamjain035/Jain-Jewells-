"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LiveRateTicker } from "@/components/LiveRateTicker";
import { ShowroomSpotlight } from "@/components/ShowroomSpotlight";
import { ProductCatalog } from "@/components/ProductCatalog";
import { BespokeStudio } from "@/components/BespokeStudio";
import { BrandHeritage } from "@/components/BrandHeritage";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import { AppointmentModal } from "@/components/AppointmentModal";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { MessageSquare, Calendar } from "lucide-react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";

export default function Home() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>(["jj-101", "jj-102"]); // default sample saved

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#06110c] text-[#f4ede2] relative selection:bg-[#d4af37] selection:text-[#06110c]">
      {/* Sticky Header Navbar */}
      <Header
        onOpenAppointment={() => setAppointmentOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Hero Section Slider */}
      <Hero onOpenAppointment={() => setAppointmentOpen(true)} />

      {/* Live Gold & Silver Metal Rates Ticker + Calculator */}
      <LiveRateTicker />

      {/* Showroom Spotlight & Virtual Tour */}
      <ShowroomSpotlight onOpenAppointment={() => setAppointmentOpen(true)} />

      {/* Interactive Jewellery Product Catalog */}
      <ProductCatalog
        onOpenAppointment={() => setAppointmentOpen(true)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Bespoke Custom Design Lab */}
      <BespokeStudio />

      {/* Brand Heritage & Trust Pillars */}
      <BrandHeritage />

      {/* Testimonials & FAQ */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveWishlist={handleRemoveWishlist}
        onOpenAppointment={() => setAppointmentOpen(true)}
      />

      {/* Floating Quick Action Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <button
          onClick={() => setAppointmentOpen(true)}
          className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2 transform hover:scale-105 transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Book VIP Visit</span>
        </button>

        <a
          href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=Hello%20Jain%20Jewells%2C%20I%20would%20like%20to%20connect%20with%20your%20showroom%20concierge`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all border border-emerald-400/40 group"
          title="Chat with Showroom Concierge on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-white" />
        </a>
      </div>
    </main>
  );
}
