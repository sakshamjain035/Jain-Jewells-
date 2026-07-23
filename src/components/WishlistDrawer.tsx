"use client";

import React from "react";
import { PRODUCTS_DATA, Product, SHOWROOM_DETAILS } from "@/data/jewelryData";
import { X, Heart, Trash2, Calendar, MessageSquare, ArrowRight } from "lucide-react";

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
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS_DATA.filter((p) => wishlistIds.includes(p.id));
  const totalPrice = wishlistedProducts.reduce((sum, item) => sum + item.price, 0);

  const waWishlistText = encodeURIComponent(
    `Hello Jain Jewells Concierge,\nI have saved these items in my wishlist:\n${wishlistedProducts
      .map((p) => `- ${p.name} (₹${p.price.toLocaleString("en-IN")})`)
      .join("\n")}\nTotal Estimated Value: ₹${totalPrice.toLocaleString(
      "en-IN"
    )}\nCan you check showroom availability for these pieces?`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="bg-[#06110c] border-l border-[#d4af37]/30 max-w-md w-full h-full p-6 flex flex-col justify-between shadow-2xl relative">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="text-xl font-serif-luxury font-bold text-white">Your Saved Wishlist</h3>
              <span className="bg-[#d4af37] text-[#06110c] text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlistedProducts.length}
              </span>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white p-1">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* List */}
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <h4 className="text-base font-serif-luxury font-bold text-white mb-1">Your wishlist is empty</h4>
              <p className="text-xs text-white/60">Explore our collections and click the heart icon to save favorite pieces.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-1">
              {wishlistedProducts.map((item) => (
                <div
                  key={item.id}
                  className="emerald-glass p-3 rounded-xl border border-white/10 flex items-center gap-3 relative group"
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shrink-0 border border-[#d4af37]/30" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <span className="text-[10px] text-[#d4af37] uppercase block">{item.metalPurity}</span>
                    <strong className="text-sm text-[#fcf6ba] font-serif-luxury block">
                      ₹{item.price.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button
                    onClick={() => onRemoveWishlist(item.id)}
                    className="text-white/40 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">Total Wishlist Value:</span>
              <strong className="text-lg font-serif-luxury gold-text-gradient">
                ₹{totalPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <a
              href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=${waWishlistText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Inquire Wishlist on WhatsApp
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenAppointment();
              }}
              className="bg-[#0d2a1e] border border-[#d4af37]/40 text-white font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#d4af37]" /> Book Showroom Visit for Saved Pieces
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
