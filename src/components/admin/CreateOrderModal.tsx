"use client";

import React, { useState } from "react";
import { X, Package, Plus, Sparkles } from "lucide-react";
import { PRODUCTS_DATA } from "@/data/jewelryData";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated: () => void;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  onOrderCreated,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS_DATA[0]?.id || "");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [street, setStreet] = useState<string>("B-12, Malviya Nagar");
  const [city, setCity] = useState<string>("Jaipur");
  const [state, setState] = useState<string>("Rajasthan");
  const [pincode, setPincode] = useState<string>("302017");
  const [paymentStatus, setPaymentStatus] = useState<"Paid" | "Pending" | "Advance Paid">("Paid");
  const [paymentMethod, setPaymentMethod] = useState<string>("UPI / NetBanking");
  const [notes, setNotes] = useState<string>("Express showroom counter booking.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const product = PRODUCTS_DATA.find((p) => p.id === selectedProductId) || PRODUCTS_DATA[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const orderPayload = {
        customerName,
        customerPhone,
        customerEmail: customerEmail || `${customerName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        shippingAddress: {
          street,
          city,
          state,
          pincode,
        },
        items: [
          {
            productId: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            metal: product.metal,
            metalPurity: product.metalPurity,
            weightGrams: product.weightGrams,
            quantity: 1,
            price: product.price,
          },
        ],
        totalAmount: product.price,
        paymentStatus,
        paymentMethod,
        orderStatus: "Received", // Creates in Received status ready for dispatch
        notes,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      onOrderCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="emerald-glass max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-[#d4af37] relative shadow-2xl my-8 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif-luxury font-bold gold-text-gradient">
              Create New Jewellery Order
            </h3>
            <p className="text-xs text-white/60">Log showroom walk-in order or express order</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-rose-950/80 border border-rose-500/40 p-3 rounded-xl text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {/* Select Jewellery Piece */}
          <div>
            <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
              Select Jewellery Masterpiece *
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none cursor-pointer"
            >
              {PRODUCTS_DATA.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ₹{p.price.toLocaleString("en-IN")} ({p.metalPurity}, {p.weightGrams}g)
                </option>
              ))}
            </select>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maharani Archana Rathore"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98290 XXXXX"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="patron@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Pincode *
              </label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as any)}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none cursor-pointer"
              >
                <option value="Paid">Paid (Full Settlement)</option>
                <option value="Advance Paid">Advance Paid (50%)</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none cursor-pointer"
              >
                <option value="UPI / NetBanking">UPI / NetBanking</option>
                <option value="Showroom Bank Transfer">Showroom Bank Transfer (RTGS/NEFT)</option>
                <option value="Credit/Debit Card">Credit/Debit Card POS</option>
                <option value="Cash On Delivery">Cash On Delivery (Insured)</option>
              </select>
            </div>
          </div>

          {/* Price Snapshot */}
          <div className="bg-[#04140d] p-3 rounded-xl border border-white/10 flex justify-between items-center text-xs">
            <span className="text-white/70">Total Order Value:</span>
            <strong className="text-base font-serif-luxury text-[#fcf6ba]">
              ₹{product.price.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/15 text-white/70 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              {isSubmitting ? "Creating Order..." : "Place Order (Received State)"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
