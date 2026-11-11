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
    <main className="min-h-screen flex flex-col bg-[#0a0a08] text-[#f4eee3] relative selection:bg-[#c9a96a] selection:text-[#0a0a08]">
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

      {/* Floating concierge actions */}
      <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        <button
          onClick={() => setAppointmentOpen(true)}
          className="lux-btn lux-btn-gold shadow-[0_20px_45px_-20px_rgba(0,0,0,0.9)] !py-3 !px-4 sm:!px-5 !text-[9px]"
        >
          <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Book a Viewing</span>
        </button>

        <a
          href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=Hello%20Jain%20Jewells%2C%20I%20would%20like%20to%20connect%20with%20your%20showroom%20concierge`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 bg-[#100e0a]/90 backdrop-blur-md border border-[#c9a96a]/35 text-[#e8d9b4] flex items-center justify-center hover:border-[#c9a96a] hover:bg-[#c9a96a] hover:text-[#0a0a08] transition-all duration-300"
          title="Chat with our showroom concierge"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-[18px] h-[18px]" strokeWidth={1.3} />
        </a>
      </div>
    </main>
  );
}
