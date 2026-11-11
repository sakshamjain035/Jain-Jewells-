"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  ArrowRight,
} from "lucide-react";

interface ProductCatalogProps {
  onOpenAppointment: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

interface PlacedOrderSummary {
  orderNumber: string;
  customerName: string;
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
  const [orderModalProduct, setOrderModalProduct] = useState<Product | null>(null);
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState<PlacedOrderSummary | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerCity, setBuyerCity] = useState("Jaipur");
  const [buyerAddress, setBuyerAddress] = useState("B-4, C-Scheme");
  const [isOrdering, setIsOrdering] = useState(false);

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
    <section id="collections" className="py-24 sm:py-32 px-5 sm:px-8 bg-[#0b0a08] border-t border-[#c9a96a]/12 relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="lux-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-10 border-b border-[#f4eee3]/10">
          <div className="max-w-2xl">
            <span className="lux-eyebrow block mb-4">Curated Showroom Collections</span>
            <h2 className="text-[2.4rem] sm:text-[3.4rem] font-light text-[#f4eee3] leading-[1.05] tracking-[-0.015em]">
              The Jewellery <span className="italic text-[#e8d9b4]">Catalog</span>
            </h2>
          </div>
          <p className="text-[#a79e8e] text-xs sm:text-sm font-light leading-[1.9] max-w-sm lg:text-right">
            Each ornament carries certified purity, a 6-digit HUID hallmark, and the quiet artistry of the House of Jain.
          </p>
        </div>

        {/* Filters & Search Controls Bar */}
        <div className="border-b border-[#f4eee3]/10 pb-6 mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto w-full lg:w-auto scrollbar-none pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative whitespace-nowrap text-[10px] uppercase tracking-[0.2em] pb-2 transition-colors ${
                  activeCategory === cat.id
                    ? "text-[#f4eee3] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#c9a96a]"
                    : "text-[#a79e8e] hover:text-[#f4eee3]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-[#a79e8e] absolute left-0 top-1/2 -translate-y-1/2" strokeWidth={1.4} />
              <input
                type="text"
                placeholder="Search the collection"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-[#f4eee3]/20 focus:border-[#c9a96a] text-[11px] tracking-[0.04em] text-[#f4eee3] placeholder-[#7f786c] pl-6 pr-5 py-2.5 outline-none transition-colors rounded-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#a79e8e] hover:text-[#f4eee3]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "weight")
                }
                className="w-full sm:w-44 bg-transparent border-b border-[#f4eee3]/20 focus:border-[#c9a96a] text-[10px] uppercase tracking-[0.14em] text-[#ded6c7] px-0 py-2.5 outline-none cursor-pointer rounded-none"
              >
                <option value="featured" className="bg-[#14110c]">Sort: Featured</option>
                <option value="price-asc" className="bg-[#14110c]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#14110c]">Price: High to Low</option>
                <option value="weight" className="bg-[#14110c]">Weight: Highest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length === 0 ? (
          <div className="border border-[#c9a96a]/20 p-14 text-center max-w-lg mx-auto">
            <Filter className="w-8 h-8 text-[#c9a96a] mx-auto mb-4 opacity-70" strokeWidth={1} />
            <h3 className="text-2xl font-light text-[#f4eee3] mb-2">No pieces found</h3>
            <p className="text-xs text-[#a79e8e] font-light leading-relaxed mb-6">
              We couldn&apos;t find any items matching your search. Try adjusting the filters or your query.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="lux-btn lux-btn-outline !py-3 !px-6 !text-[9px]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="lux-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {sortedProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group flex flex-col"
                >
                  {/* Card Image Wrapper */}
                  <div
                    className="relative aspect-[4/5] overflow-hidden bg-[#14110c] border border-[#f4eee3]/8 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover saturate-[0.92] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                      {product.isBestSeller && (
                        <span className="bg-[#e8d9b4] text-[#0a0a08] text-[8px] font-medium px-2.5 py-1 uppercase tracking-[0.2em]">
                          Bestseller
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="bg-[#0a0a08]/70 backdrop-blur-sm text-[#f4eee3] text-[8px] font-medium px-2.5 py-1 uppercase tracking-[0.2em] border border-[#f4eee3]/25">
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
                      className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center border backdrop-blur-md transition-all duration-300 ${
                        isWishlisted
                          ? "bg-[#e8d9b4] text-[#0a0a08] border-[#e8d9b4]"
                          : "bg-[#0a0a08]/40 text-[#f4eee3]/80 border-[#f4eee3]/20 hover:border-[#c9a96a] hover:text-[#e8d9b4]"
                      }`}
                      title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} strokeWidth={1.4} />
                    </button>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-7 pointer-events-none">
                      <span className="text-[9px] uppercase tracking-[0.26em] text-[#f4eee3] border-b border-[#c9a96a]/70 pb-1 flex items-center gap-2">
                        <Eye className="w-3 h-3" strokeWidth={1.4} /> View the Piece
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-5 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-[8.5px] text-[#c9a96a] uppercase tracking-[0.24em]">
                          {product.categoryLabel}
                        </span>
                        <span className="text-[9px] text-[#7f786c] tracking-[0.06em] shrink-0">
                          {product.metalPurity}
                        </span>
                      </div>
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-[1.3rem] leading-[1.3] font-light text-[#f4eee3] line-clamp-2 hover:text-[#e8d9b4] cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[#a79e8e] line-clamp-2 mt-2 font-light leading-[1.75]">
                        {product.description}
                      </p>
                    </div>

                    <div className="border-t border-[#f4eee3]/10 pt-4 flex items-end justify-between gap-3">
                      <div>
                        <span className="text-[8px] text-[#7f786c] uppercase tracking-[0.2em] block mb-1">
                          From
                        </span>
                        <span className="text-xl font-serif-luxury font-light text-[#f4eee3]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-[#a79e8e] flex items-center gap-1.5">
                          <Scale className="w-3 h-3 text-[#c9a96a]" strokeWidth={1.3} /> {product.weightGrams}g
                        </span>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="w-8 h-8 border border-[#c9a96a]/30 text-[#c9a96a] flex items-center justify-center hover:bg-[#c9a96a] hover:text-[#0a0a08] transition-all duration-300"
                          title="View complete specifications"
                          aria-label="View product details"
                        >
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.4} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-[#050504]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#100e0b]/95 backdrop-blur-xl max-w-4xl w-full p-6 sm:p-10 border border-[#c9a96a]/25 relative shadow-2xl my-8">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a79e8e] hover:text-[#f4eee3] border border-[#f4eee3]/10 hover:border-[#c9a96a]/50 transition-colors"
              aria-label="Close product details"
            >
              <X className="w-4 h-4" strokeWidth={1.4} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Product Image Side */}
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="relative overflow-hidden aspect-[4/5] border border-[#f4eee3]/10 bg-[#14110c]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover saturate-[0.95]"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#0a0a08]/80 backdrop-blur-sm text-[#e8d9b4] text-[8px] tracking-[0.18em] uppercase px-3 py-1.5 border border-[#c9a96a]/30">
                    {selectedProduct.metalPurity}
                  </span>
                </div>

                <div className="border border-[#f4eee3]/10 p-4 text-xs flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#c9a96a] text-[10px] uppercase tracking-[0.16em]">
                    <ShieldCheck className="w-4 h-4" strokeWidth={1.3} /> BIS Hallmarked Assurance
                  </div>
                  <p className="text-[#a79e8e] text-[11px] font-light leading-relaxed">
                    Every ornament from Jain Jewells is stamped with a 6-digit HUID code and accompanied by a laser-inscribed certificate of authenticity.
                  </p>
                </div>
              </div>

              {/* Product Details Side */}
              <div className="md:col-span-7 flex flex-col gap-4 text-white">
                <div>
                  <span className="lux-eyebrow block mb-2">
                    {selectedProduct.categoryLabel}
                  </span>
                  <h3 className="text-[1.9rem] sm:text-[2.4rem] font-light text-[#f4eee3] leading-[1.15]">
                    {selectedProduct.name}
                  </h3>
                  <div className="text-2xl font-serif-luxury font-light text-[#e8d9b4] mt-3">
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                    <span className="text-[10px] font-light tracking-wide text-[#7f786c] ml-2">
                      incl. metal, making charge &amp; GST
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#ded6c7]/85 font-light leading-[1.9] border-t border-[#f4eee3]/10 pt-5">
                  {selectedProduct.description}
                </p>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-x-5 gap-y-5 text-xs border-y border-[#f4eee3]/10 py-5">
                  <div>
                    <span className="text-[#7f786c] text-[8px] uppercase tracking-[0.18em] block mb-1">Metal &amp; Purity</span>
                    <strong className="text-[#f4eee3] font-normal">{selectedProduct.metal}</strong>
                  </div>

                  <div>
                    <span className="text-[#7f786c] text-[8px] uppercase tracking-[0.18em] block mb-1">Gross Weight</span>
                    <strong className="text-[#f4eee3] font-normal">{selectedProduct.weightGrams} Grams</strong>
                  </div>

                  <div>
                    <span className="text-[#7f786c] text-[8px] uppercase tracking-[0.18em] block mb-1">Gemstone / Carats</span>
                    <strong className="text-[#f4eee3] font-normal">{selectedProduct.gemstone || "Pure Solid Metal"}</strong>
                  </div>

                  <div>
                    <span className="text-[#7f786c] text-[8px] uppercase tracking-[0.18em] block mb-1">Certification</span>
                    <strong className="text-[#f4eee3] font-normal">{selectedProduct.certification}</strong>
                  </div>

                  <div>
                    <span className="text-[#7f786c] text-[8px] uppercase tracking-[0.18em] block mb-1">Making Charge</span>
                    <strong className="text-[#f4eee3] font-normal">{selectedProduct.makingChargePercent}% Standard</strong>
                  </div>

                  <div>
                    <span className="text-[#7f786c] text-[8px] uppercase tracking-[0.18em] block mb-1">Availability</span>
                    <strong className="text-[#c9a96a] font-normal">Ready in the Jaipur showroom</strong>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-3">
                  <button
                    onClick={() => {
                      const prod = selectedProduct;
                      setSelectedProduct(null);
                      setOrderModalProduct(prod);
                    }}
                    className="flex-1 lux-btn lux-btn-gold !py-4 !px-4 !text-[9px]"
                  >
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={1.4} /> Reserve this Piece
                  </button>

                  <a
                    href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=Hello%20Jain%20Jewells%2C%20I%20am%20interested%20in%20item%20%22${encodeURIComponent(selectedProduct.name)}%22%20(ID%3A%20${selectedProduct.id}%2C%20Price%3A%20%E2%82%B9${selectedProduct.price.toLocaleString("en-IN")}).%20Is%20this%20piece%20available%20for%20a%20showroom%20trial%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 lux-btn lux-btn-outline !py-4 !px-4 !text-[9px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#c9a96a]" strokeWidth={1.4} /> Enquire
                  </a>

                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      onOpenAppointment();
                    }}
                    className="border border-[#f4eee3]/15 hover:border-[#f4eee3]/40 text-[#f4eee3] text-[9px] uppercase tracking-[0.18em] py-4 px-4 flex items-center justify-center gap-2 transition-colors"
                    title="Book a showroom trial"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#c9a96a]" strokeWidth={1.4} /> Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Online Order / Reserve Masterpiece Modal */}
      {orderModalProduct && (
        <div className="fixed inset-0 z-50 bg-[#050504]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#100e0b]/95 backdrop-blur-xl max-w-lg w-full p-6 sm:p-9 border border-[#c9a96a]/25 relative shadow-2xl my-8 text-[#f4eee3]">
            <button
              onClick={() => {
                setOrderModalProduct(null);
                setOrderPlacedSuccess(null);
              }}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a79e8e] hover:text-[#f4eee3] border border-[#f4eee3]/10 hover:border-[#c9a96a]/50 transition-colors"
              aria-label="Close order form"
            >
              <X className="w-4 h-4" strokeWidth={1.4} />
            </button>

            {!orderPlacedSuccess ? (
              <div>
                <div className="flex items-center gap-4 border-b border-[#f4eee3]/10 pb-5 mb-5">
                  <Image
                    src={orderModalProduct.image}
                    alt={orderModalProduct.name}
                    width={72}
                    height={72}
                    sizes="72px"
                    className="w-[72px] h-[72px] object-cover border border-[#c9a96a]/30"
                  />
                  <div>
                    <span className="lux-eyebrow block mb-1">Private Reservation</span>
                    <p className="text-[11px] text-[#a79e8e] font-light leading-snug">{orderModalProduct.name}</p>
                    <strong className="text-base font-serif-luxury font-light text-[#e8d9b4]">
                      ₹{orderModalProduct.price.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsOrdering(true);
                    try {
                      const res = await fetch("/api/orders", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          customerName: buyerName,
                          customerPhone: buyerPhone,
                          customerEmail: buyerEmail || `${buyerName.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
                          shippingAddress: {
                            street: buyerAddress,
                            city: buyerCity,
                            state: "Rajasthan",
                            pincode: "302001",
                          },
                          items: [
                            {
                              productId: orderModalProduct.id,
                              name: orderModalProduct.name,
                              image: orderModalProduct.image,
                              category: orderModalProduct.category,
                              metal: orderModalProduct.metal,
                              metalPurity: orderModalProduct.metalPurity,
                              weightGrams: orderModalProduct.weightGrams,
                              quantity: 1,
                              price: orderModalProduct.price,
                            },
                          ],
                          totalAmount: orderModalProduct.price,
                          paymentStatus: "Paid",
                          paymentMethod: "UPI / NetBanking",
                          orderStatus: "Received",
                          notes: "Storefront express checkout reservation.",
                        }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        setOrderPlacedSuccess(data.order);
                      }
                    } catch (err) {
                      console.error("Order error:", err);
                    } finally {
                      setIsOrdering(false);
                    }
                  }}
                  className="flex flex-col gap-3 text-xs"
                >
                  <div>
                    <label className="font-semibold uppercase text-white/80 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smt. Sunita Jain"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full bg-[#14110c] border border-[#f4eee3]/12 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold uppercase text-white/80 block mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98290 XXXXX"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="w-full bg-[#14110c] border border-[#f4eee3]/12 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-semibold uppercase text-white/80 block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={buyerCity}
                        onChange={(e) => setBuyerCity(e.target.value)}
                        className="w-full bg-[#14110c] border border-[#f4eee3]/12 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold uppercase text-white/80 block mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={buyerAddress}
                      onChange={(e) => setBuyerAddress(e.target.value)}
                      placeholder="Street, Landmark, City"
                      className="w-full bg-[#14110c] border border-[#f4eee3]/12 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none transition-colors"
                    />
                  </div>

                  <div className="bg-[#16130e] p-3 border border-[#c9a96a]/20 text-[10px] text-[#ded6c7] flex items-center gap-2.5 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-[#c9a96a]" strokeWidth={1.3} />
                    <span>Includes fully insured transit &amp; a 6-digit HUID hallmarking certificate.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isOrdering}
                    className="lux-btn lux-btn-gold w-full mt-2 disabled:opacity-60"
                  >
                    {isOrdering ? "Placing Order…" : "Confirm & Place Order (₹" + orderModalProduct.price.toLocaleString("en-IN") + ")"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 border border-[#c9a96a]/50 text-[#c9a96a] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-5 h-5" strokeWidth={1.4} />
                </div>
                <span className="lux-eyebrow block">Reservation Confirmed</span>
                <h3 className="text-2xl font-serif-luxury font-light text-[#f4eee3] mt-2">
                  Order #{orderPlacedSuccess.orderNumber}
                </h3>
                <p className="text-[11px] text-[#a79e8e] font-light leading-relaxed max-w-sm mx-auto mt-3">
                  Thank you, <strong className="text-[#f4eee3] font-normal">{orderPlacedSuccess.customerName}</strong>. Your order is logged with our atelier as <span className="text-[#c9a96a]">Received — awaiting dispatch</span>.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-7 justify-center">
                  <button
                    onClick={() => {
                      setOrderModalProduct(null);
                      setOrderPlacedSuccess(null);
                    }}
                    className="lux-btn lux-btn-gold !py-3"
                  >
                    Continue Browsing
                  </button>
                  <a
                    href="/admin"
                    className="lux-btn lux-btn-outline !py-3"
                  >
                    View in Admin Panel
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

