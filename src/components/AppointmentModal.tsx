"use client";

import React, { useState } from "react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";
import { Calendar, Sparkles, X, Check, MessageSquare } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    visitDate: "",
    timeSlot: "02:00 PM - 04:00 PM",
    categoryInterest: "Bridal Couture & Kundan",
    vipLounge: true,
  });
  const [isBooked, setIsBooked] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Failed to save appointment to DB:", err);
    } finally {
      setIsSubmitting(false);
      setIsBooked(true);
    }
  };

  const waMessage = encodeURIComponent(
    `Hello Jain Jewells Concierge,\nI would like to confirm my VIP Showroom Visit:\n- Name: ${formData.fullName}\n- Phone: ${formData.phone}\n- Date: ${formData.visitDate}\n- Time Slot: ${formData.timeSlot}\n- Interest: ${formData.categoryInterest}\n- VIP Lounge Reserved: ${formData.vipLounge ? "Yes" : "No"}`
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#080504]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#170d0c]/95 backdrop-blur-xl max-w-xl w-full p-6 sm:p-9 border border-[#c8a05c]/25 relative shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a99987] hover:text-[#f6efe4] border border-[#f6efe4]/10 hover:border-[#c8a05c]/50 transition-colors"
          aria-label="Close appointment form"
        >
          <X className="w-4 h-4" strokeWidth={1.4} />
        </button>

        {!isBooked ? (
          <div>
            <div className="text-center mb-7">
              <div className="w-10 h-10 border border-[#c8a05c]/45 text-[#c8a05c] flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-4 h-4" strokeWidth={1.3} />
              </div>
              <span className="lux-eyebrow block mb-2">By Appointment</span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-light text-[#f6efe4]">
                A Private Viewing
              </h3>
              <p className="text-[10.5px] text-[#a99987] font-light leading-relaxed mt-2 max-w-sm mx-auto">
                Reserve a private suite at our Jaipur showroom with a dedicated jewellery stylist.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[11px] text-[#f6efe4]">
              <div>
                <label className="text-[8px] uppercase tracking-[0.2em] text-[#857768] block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Jain"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#1b1110] border border-[#f6efe4]/12 focus:border-[#c8a05c] text-[#f6efe4] rounded-none p-3 outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] uppercase tracking-[0.2em] text-[#857768] block mb-1.5">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98290 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1b1110] border border-[#f6efe4]/12 focus:border-[#c8a05c] text-[#f6efe4] rounded-none p-3 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[8px] uppercase tracking-[0.2em] text-[#857768] block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patron@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1b1110] border border-[#f6efe4]/12 focus:border-[#c8a05c] text-[#f6efe4] rounded-none p-3 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] uppercase tracking-[0.2em] text-[#857768] block mb-1.5">
                    Preferred Visit Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full bg-[#1b1110] border border-[#f6efe4]/12 focus:border-[#c8a05c] text-[#f6efe4] rounded-none p-3 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[8px] uppercase tracking-[0.2em] text-[#857768] block mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#1b1110] border border-[#f6efe4]/12 focus:border-[#c8a05c] text-[#f6efe4] rounded-none p-3 outline-none transition-colors"
                  >
                    <option value="11:00 AM - 01:00 PM">11:00 AM – 01:00 PM (Morning)</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM – 04:00 PM (Afternoon)</option>
                    <option value="04:30 PM - 06:30 PM">04:30 PM – 06:30 PM (Evening)</option>
                    <option value="06:30 PM - 08:30 PM">06:30 PM – 08:30 PM (Prime)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[8px] uppercase tracking-[0.2em] text-[#857768] block mb-1.5">
                  Primary Collection Interest
                </label>
                <select
                  value={formData.categoryInterest}
                  onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                  className="w-full bg-[#1b1110] border border-[#f6efe4]/12 focus:border-[#c8a05c] text-[#f6efe4] rounded-none p-3 outline-none transition-colors"
                >
                  <option value="Bridal Couture & Kundan">Bridal Trousseau &amp; Rajwadi Kundan</option>
                  <option value="Solitaire Engagement Rings">Solitaire Engagement Rings &amp; Tennis Bracelets</option>
                  <option value="Antique Nakshi Gold">Antique Nakshi Temple Gold Masterpieces</option>
                  <option value="Bespoke Custom Jewellery">Custom Bespoke Design Lab Consultation</option>
                  <option value="Gold Coins & Silver Artefacts">999 Pure Silver &amp; Gold Investment Coins</option>
                </select>
              </div>

              <div className="bg-[#1e1413] p-4 border border-[#c8a05c]/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#c8a05c]" strokeWidth={1.3} />
                  <div>
                    <strong className="block text-[11px] text-[#f6efe4] font-normal">Reserve the private VIP suite</strong>
                    <span className="text-[9px] text-[#857768]">Complimentary refreshments &amp; valet parking</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.vipLounge}
                  onChange={(e) => setFormData({ ...formData, vipLounge: e.target.checked })}
                  className="w-4 h-4 accent-[#c8a05c] cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="lux-btn lux-btn-gold w-full mt-2 disabled:opacity-50"
              >
                {isSubmitting ? "Reserving Your Suite…" : "Request This Appointment"}
              </button>

            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-11 h-11 border border-[#c8a05c]/50 text-[#c8a05c] flex items-center justify-center mx-auto mb-4">
              <Check className="w-5 h-5" strokeWidth={1.4} />
            </div>
            <span className="lux-eyebrow block mb-2">Reserved</span>
            <h3 className="text-2xl font-serif-luxury font-light text-[#f6efe4] mb-3">
              We look forward to your visit
            </h3>
            <p className="text-[11px] text-[#a99987] font-light leading-relaxed max-w-sm mx-auto mb-7">
              <strong className="text-[#f6efe4] font-normal">{formData.fullName}</strong>, your private viewing is noted for <strong className="text-[#c8a05c] font-normal">{formData.visitDate} · {formData.timeSlot}</strong>. Our concierge will confirm shortly.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn lux-btn-gold w-full"
              >
                <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.4} /> Confirm on WhatsApp
              </a>
              <button
                onClick={() => {
                  setIsBooked(false);
                  onClose();
                }}
                className="lux-btn lux-btn-outline w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
