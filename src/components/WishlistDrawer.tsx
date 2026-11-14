"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { PRODUCTS_DATA, SHOWROOM_DETAILS } from "@/data/jewelryData";
import { useLiveRates } from "@/hooks/useLiveRates";
import { priceProducts } from "@/lib/productPricing";
import { X, Heart, Trash2, Calendar, MessageSquare } from "lucide-react";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveWishlist: (id: string) => void;
  onOpenAppointment: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveWishlist,
  onOpenAppointment,
}) => {
  const { data: liveRates } = useLiveRates();
  const pricedProducts = useMemo(() => priceProducts(PRODUCTS_DATA, liveRates), [liveRates]);

  if (!isOpen) return null;

  const wishlistedProducts = pricedProducts.filter((p) => wishlistIds.includes(p.id));
  const totalPrice = wishlistedProducts.reduce((sum, item) => sum + item.price, 0);

  const waWishlistText = encodeURIComponent(
    `Hello Jain Jewells Concierge,\nI have saved these items in my wishlist:\n${wishlistedProducts
      .map((p) => `- ${p.name} (₹${p.price.toLocaleString("en-IN")})`)
      .join("\n")}\nTotal Estimated Value: ₹${totalPrice.toLocaleString(
      "en-IN"
    )}\nCan you check showroom availability for these pieces?`
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#080504]/85 backdrop-blur-md flex justify-end">
      <div className="bg-[#0d0b08] border-l border-[#c8a05c]/25 max-w-md w-full h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[#f6efe4]/10 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-[#c8a05c]" strokeWidth={1.3} />
              <h3 className="text-xl font-serif-luxury font-light text-[#f6efe4]">Saved Pieces</h3>
              <span className="text-[10px] text-[#c8a05c] border border-[#c8a05c]/30 px-1.5 py-0.5">
                {wishlistedProducts.length}
              </span>
            </div>
            <button onClick={onClose} className="text-[#a99987] hover:text-[#f6efe4] p-1 transition-colors" aria-label="Close wishlist">
              <X className="w-5 h-5" strokeWidth={1.3} />
            </button>
          </div>

          {/* List */}
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-9 h-9 text-[#c8a05c]/40 mx-auto mb-4" strokeWidth={1} />
              <h4 className="text-xl font-serif-luxury font-light text-[#f6efe4] mb-2">Your wishlist is empty</h4>
              <p className="text-[11px] text-[#a99987] font-light leading-relaxed">Explore the collections and save the pieces that speak to you.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-1">
              {wishlistedProducts.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[#f6efe4]/10 pb-4 flex items-center gap-4 relative group last:border-0"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={80}
                    sizes="64px"
                    className="w-16 h-20 object-cover shrink-0 border border-[#f6efe4]/10"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] text-[#f6efe4] leading-snug line-clamp-2">{item.name}</h4>
                    <span className="text-[8px] text-[#c8a05c] uppercase tracking-[0.14em] block mt-1.5">{item.metalPurity}</span>
                    <strong className="text-sm text-[#ecd8ae] font-serif-luxury font-light block mt-1">
                      ₹{item.price.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button
                    onClick={() => onRemoveWishlist(item.id)}
                    className="text-[#857768] hover:text-[#c8a05c] p-1.5 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.3} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="border-t border-[#f6efe4]/10 pt-5 flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#857768]">Estimated value</span>
              <strong className="text-xl font-serif-luxury font-light text-[#ecd8ae]">
                ₹{totalPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <a
              href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=${waWishlistText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn lux-btn-gold w-full"
            >
              <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.4} /> Enquire on WhatsApp
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenAppointment();
              }}
              className="lux-btn lux-btn-outline w-full"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} /> Book a Showroom Visit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
