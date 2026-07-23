"use client";

import React, { useState } from "react";
import { PRODUCTS_DATA, Product, SHOWROOM_DETAILS } from "@/data/jewelryData";
import {
  Search,
  Filter,
  Eye,
  Heart,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  X,
  Calendar,
  Check,
  Scale,
  Award,
  ArrowRight,
} from "lucide-react";

interface ProductCatalogProps {
  onOpenAppointment: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onOpenAppointment,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "weight">("featured");

  const categories = [
    { id: "all", label: "All Masterpieces" },
    { id: "bridal", label: "Bridal Couture" },
    { id: "diamond", label: "Solitaires & Diamonds" },
    { id: "antique", label: "Antique Gold" },
    { id: "everyday", label: "Everyday Luxury" },
    { id: "silver", label: "Fine Silver" },
  ];

  // Filtering
  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.metal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "weight") return b.weightGrams - a.weightGrams;
    return 0;
  });

  return (
    <section id="collections" className="py-20 px-4 bg-[#040c09] border-t border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
            Curated Showroom Collections
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white mb-4 gold-text-gradient">
            Exquisite Jewellery Catalog
          </h2>
          <p className="text-white/70 text-sm sm:text-base">
            Each ornament carries certified purity, 6-digit HUID BIS Hallmarking, and the timeless artistry of Jain Jewells.
          </p>
        </div>

        {/* Filters & Search Controls Bar */}
        <div className="emerald-glass p-4 sm:p-6 rounded-3xl border border-[#d4af37]/30 mb-10 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-none pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "gold-bg-gradient text-[#06110c] font-bold shadow-md"
                    : "bg-[#06110c]/70 text-white/80 hover:text-white border border-white/10 hover:border-[#d4af37]/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Input */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search gold, polki, ring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#06110c]/80 border border-white/15 focus:border-[#d4af37] text-xs text-white placeholder-white/40 rounded-xl pl-9 pr-4 py-2.5 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-48 bg-[#06110c]/80 border border-white/15 focus:border-[#d4af37] text-xs text-white rounded-xl px-3 py-2.5 outline-none cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="weight">Weight: Highest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length === 0 ? (
          <div className="emerald-glass rounded-3xl p-12 text-center border border-white/10 max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-[#d4af37] mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">No Jewellery Found</h3>
            <p className="text-xs text-white/60 mb-4">
              We couldn&apos;t find any items matching your search. Try adjusting filters or search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="gold-bg-gradient text-[#06110c] text-xs font-bold px-5 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="emerald-glass rounded-2xl border border-[#d4af37]/20 overflow-hidden flex flex-col justify-between group hover:border-[#d4af37]/60 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                >
                  {/* Card Image Wrapper */}
                  <div className="relative aspect-square overflow-hidden bg-black/40 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      {product.isBestSeller && (
                        <span className="bg-[#d4af37] text-[#06110c] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                          Bestseller
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                          New Arrival
                        </span>
                      )}
                    </div>

                    {/* Wishlist Icon Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                        isWishlisted
                          ? "bg-rose-600 text-white shadow-lg scale-110"
                          : "bg-black/60 text-white/80 hover:text-rose-400 hover:bg-black/80"
                      }`}
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
                    </button>

                    {/* Hover Quick View Trigger Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
                      <span className="bg-[#06110c]/90 text-[#fcf6ba] text-xs font-semibold py-2 px-4 rounded-full border border-[#d4af37] flex items-center gap-1.5 shadow-xl">
                        <Eye className="w-3.5 h-3.5" /> Quick View Details
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <div className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                        {product.categoryLabel}
                      </div>
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-base font-serif-luxury font-bold text-white line-clamp-2 hover:text-[#d4af37] cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-white/60 line-clamp-2 mt-1 font-light">
                        {product.description}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-3">
                      <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                        <span className="flex items-center gap-1">
                          <Scale className="w-3 h-3 text-[#d4af37]" /> {product.weightGrams}g
                        </span>
                        <span className="text-[11px] bg-[#0d2e21] px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/20">
                          {product.metalPurity}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <div>
                          <span className="text-[10px] text-white/50 block">Estimated Price</span>
                          <span className="text-lg font-serif-luxury font-bold text-[#fcf6ba]">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="bg-[#0d2a1e] hover:bg-[#123e2d] border border-[#d4af37]/40 text-[#d4af37] p-2 rounded-xl hover:scale-105 transition-all"
                          title="View Complete Specifications"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="emerald-glass max-w-4xl w-full rounded-3xl p-6 sm:p-8 border border-[#d4af37] relative shadow-2xl my-8">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2.5 rounded-full bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Product Image Side */}
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#d4af37]/30 bg-black/50 shadow-lg">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-black/70 text-[#fcf6ba] text-[10px] font-bold px-3 py-1 rounded-full border border-[#d4af37]/40">
                    {selectedProduct.metalPurity}
                  </span>
                </div>

                <div className="emerald-glass p-4 rounded-xl border border-white/10 text-xs flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> 100% BIS Hallmarked Assurance
                  </div>
                  <p className="text-white/60 text-[11px]">
                    Every ornament from Jain Jewells comes stamped with 6-Digit HUID code and laser inscribed certificate of authenticity.
                  </p>
                </div>
              </div>

              {/* Product Details Side */}
              <div className="md:col-span-7 flex flex-col gap-4 text-white">
                <div>
                  <span className="text-xs text-[#d4af37] font-bold uppercase tracking-widest block mb-1">
                    {selectedProduct.categoryLabel}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold gold-text-gradient">
                    {selectedProduct.name}
                  </h3>
                  <div className="text-2xl font-serif-luxury font-bold text-[#fcf6ba] mt-2">
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                    <span className="text-xs font-normal text-white/50 ml-2">
                      (Includes metal cost, making charge &amp; GST)
                    </span>
                  </div>
                </div>

                <p className="text-sm text-white/80 leading-relaxed border-t border-white/10 pt-3">
                  {selectedProduct.description}
                </p>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#061811] p-4 rounded-xl border border-white/10">
                  <div>
                    <span className="text-white/50 block">Metal Type &amp; Purity</span>
                    <strong className="text-white">{selectedProduct.metal}</strong>
                  </div>

                  <div>
                    <span className="text-white/50 block">Gross Weight</span>
                    <strong className="text-white">{selectedProduct.weightGrams} Grams</strong>
                  </div>

                  <div>
                    <span className="text-white/50 block">Gemstone / Carats</span>
                    <strong className="text-white">{selectedProduct.gemstone || "Pure Solid Metal"}</strong>
                  </div>

                  <div>
                    <span className="text-white/50 block">Certification</span>
                    <strong className="text-white">{selectedProduct.certification}</strong>
                  </div>

                  <div>
                    <span className="text-white/50 block">Making Charge</span>
                    <strong className="text-white">{selectedProduct.makingChargePercent}% Standard</strong>
                  </div>

                  <div>
                    <span className="text-white/50 block">Showroom Availability</span>
                    <strong className="text-emerald-400">Ready in Jaipur Showroom</strong>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-3">
                  <a
                    href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=Hello%20Jain%20Jewells%2C%20I%20am%20interested%20in%20item%20%22${encodeURIComponent(selectedProduct.name)}%22%20(ID%3A%20${selectedProduct.id}%2C%20Price%3A%20%E2%82%B9${selectedProduct.price.toLocaleString("en-IN")}).%20Is%20this%20piece%20available%20for%20a%20showroom%20trial%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" /> Enquire on WhatsApp
                  </a>

                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      onOpenAppointment();
                    }}
                    className="flex-1 bg-[#0d2a1e] hover:bg-[#123e2d] border border-[#d4af37]/40 text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#d4af37]" /> Book Showroom Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
