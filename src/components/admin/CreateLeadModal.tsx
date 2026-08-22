"use client";

import React, { useState } from "react";
import { X, Users, Plus, ShieldCheck, Sparkles } from "lucide-react";

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated: () => void;
}

export const CreateLeadModal: React.FC<CreateLeadModalProps> = ({
  isOpen,
  onClose,
  onLeadCreated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Jaipur",
    source: "Direct Walk-in",
    priority: "High",
    interestedCategory: "Bridal Couture & Kundan",
    productName: "",
    estimatedBudget: "₹5,00,000",
    initialNote: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create lead");
      }

      onLeadCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="emerald-glass max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-[#d4af37] relative shadow-2xl my-8 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#0e3324] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif-luxury font-bold gold-text-gradient">
              Add New Customer Lead
            </h3>
            <p className="text-xs text-white/60">Log walk-in, phone inquiry, or VIP patronage</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-rose-950/80 border border-rose-500/40 p-3 rounded-xl text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
              Patron Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Smt. Gayatri Devi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98290 XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="patron@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Lead Source
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none cursor-pointer"
              >
                <option value="Direct Walk-in">Direct Walk-in</option>
                <option value="VIP Appointment">VIP Appointment</option>
                <option value="WhatsApp Concierge">WhatsApp Concierge</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Bespoke Customizer">Bespoke Customizer</option>
              </select>
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none cursor-pointer"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                City / Location
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Jaipur"
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Collection Interest
              </label>
              <input
                type="text"
                value={formData.interestedCategory}
                onChange={(e) => setFormData({ ...formData, interestedCategory: e.target.value })}
                placeholder="e.g. Polki Choker & Jhumkas"
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Estimated Budget (INR)
              </label>
              <input
                type="text"
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                placeholder="e.g. ₹5,00,000 - ₹10,00,000"
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
              Initial Note / Requirement
            </label>
            <textarea
              rows={2}
              value={formData.initialNote}
              onChange={(e) => setFormData({ ...formData, initialNote: e.target.value })}
              placeholder="e.g. Looking for lightweight bridal jewellery for reception."
              className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
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
              {isSubmitting ? "Saving Lead..." : "Save Lead to MongoDB"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
