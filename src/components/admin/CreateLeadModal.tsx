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
    <div className="fixed inset-0 z-50 bg-[#050504]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#100e0b] max-w-xl w-full rounded-none p-6 sm:p-8 border border-[#c9a96a]/25 relative shadow-2xl my-8 text-[#f4eee3]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a79e8e] hover:text-[#f4eee3] border border-[#f4eee3]/10 hover:border-[#c9a96a]/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-[#f4eee3]/10 pb-4 mb-5">
          <div className="w-10 h-10 rounded-none bg-[#221d15] border border-[#c9a96a]/40 text-[#c9a96a] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif-luxury font-light gold-text-gradient">
              Add New Customer Lead
            </h3>
            <p className="text-xs text-[#a79e8e]">Log walk-in, phone inquiry, or VIP patronage</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-rose-950/80 border border-rose-500/40 p-3 rounded-none text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-1.5">
              Patron Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Smt. Gayatri Devi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#14110c] border border-[#f4eee3]/15 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98290 XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#14110c] border border-[#f4eee3]/15 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none"
              />
            </div>

            <div>
              <label className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="patron@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#14110c] border border-[#f4eee3]/15 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-1.5">
                Lead Source
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                className="w-full bg-[#14110c] border border-[#f4eee3]/15 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none cursor-pointer"
              >
                <option value="Direct Walk-in">Direct Walk-in</option>
                <option value="VIP Appointment">VIP Appointment</option>
                <option value="WhatsApp Concierge">WhatsApp Concierge</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Bespoke Customizer">Bespoke Customizer</option>
              </select>
            </div>

            <div>
              <label className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-1.5">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full bg-[#14110c] border border-[#f4eee3]/15 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none cursor-pointer"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-1.5">
                City / Location
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Jaipur"
                className="w-full bg-[#14110c] border border-[#f4eee3]/15 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-1.5">
                Collection Interest
              </label>
              <input
                type="text"
                value={formData.interestedCategory}
                onChange={(e) => setFormData({ ...formData, interestedCategory: e.target.value })}
                placeholder="e.g. Polki Choker & Jhumkas"
                className="w-full bg-[#14110c] border border-[#f4eee3]/15 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none"
              />
            </div>

            <div>
              <label className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-1.5">
                Estimated Budget (INR)
              </label>
              <input
                type="text"
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                placeholder="e.g. ₹5,00,000 - ₹10,00,000"
                className="w-full bg-[#14110c] border border-[#f4eee3]/15 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-1.5">
              Initial Note / Requirement
            </label>
            <textarea
              rows={2}
              value={formData.initialNote}
              onChange={(e) => setFormData({ ...formData, initialNote: e.target.value })}
              placeholder="e.g. Looking for lightweight bridal jewellery for reception."
              className="w-full bg-[#14110c] border border-[#f4eee3]/15 focus:border-[#c9a96a] text-[#f4eee3] rounded-none p-3 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-none border border-[#f4eee3]/15 text-[#a79e8e] text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="lux-btn lux-btn-gold"
            >
              {isSubmitting ? "Saving Lead..." : "Save Lead to MongoDB"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
