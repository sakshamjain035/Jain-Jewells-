"use client";

import React, { useState } from "react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";
import { Calendar, Clock, Sparkles, X, Check, ShieldCheck, MessageSquare, MapPin } from "lucide-react";

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const waMessage = encodeURIComponent(
    `Hello Jain Jewells Concierge,\nI would like to confirm my VIP Showroom Visit:\n- Name: ${formData.fullName}\n- Phone: ${formData.phone}\n- Date: ${formData.visitDate}\n- Time Slot: ${formData.timeSlot}\n- Interest: ${formData.categoryInterest}\n- VIP Lounge Reserved: ${formData.vipLounge ? "Yes" : "No"}`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="emerald-glass max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-[#d4af37] relative shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white p-2.5 rounded-full bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0d2e21] border border-[#d4af37]/50 text-[#d4af37] flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif-luxury font-bold gold-text-gradient">
                Book VIP Showroom Visit
              </h3>
              <p className="text-xs text-white/70 mt-1">
                Reserve your private viewing suite at our Jaipur flagship showroom with a dedicated jewelry stylist.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs text-white">
              <div>
                <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Jain"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                    Phone / Mobile *
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                    Preferred Visit Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
                  >
                    <option value="11:00 AM - 01:00 PM">11:00 AM – 01:00 PM (Morning)</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM – 04:00 PM (Afternoon)</option>
                    <option value="04:30 PM - 06:30 PM">04:30 PM – 06:30 PM (Evening)</option>
                    <option value="06:30 PM - 08:30 PM">06:30 PM – 08:30 PM (Prime)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                  Primary Collection Interest
                </label>
                <select
                  value={formData.categoryInterest}
                  onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                  className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
                >
                  <option value="Bridal Couture & Kundan">Bridal Trousseau &amp; Rajwadi Kundan</option>
                  <option value="Solitaire Engagement Rings">Solitaire Engagement Rings &amp; Tennis Bracelets</option>
                  <option value="Antique Nakshi Gold">Antique Nakshi Temple Gold Masterpieces</option>
                  <option value="Bespoke Custom Jewellery">Custom Bespoke Design Lab Consultation</option>
                  <option value="Gold Coins & Silver Artefacts">999 Pure Silver &amp; Gold Investment Coins</option>
                </select>
              </div>

              <div className="bg-[#061811] p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <strong className="block text-white">Reserve Private VIP Suite</strong>
                    <span className="text-[10px] text-white/60">Complimentary refreshment service &amp; valet parking</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.vipLounge}
                  onChange={(e) => setFormData({ ...formData, vipLounge: e.target.checked })}
                  className="w-4 h-4 accent-[#d4af37] rounded cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2 shadow-lg"
              >
                Confirm VIP Appointment
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif-luxury font-bold text-white mb-2">
              Appointment Reserved!
            </h3>
            <p className="text-xs text-white/70 max-w-sm mx-auto mb-6">
              Patron <strong className="text-white">{formData.fullName}</strong>, your visit has been logged for <strong className="text-[#d4af37]">{formData.visitDate} ({formData.timeSlot})</strong>.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${SHOWROOM_DETAILS.whatsapp.replace("+", "")}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Send Instant WhatsApp Confirmation
              </a>
              <button
                onClick={() => {
                  setIsBooked(false);
                  onClose();
                }}
                className="bg-[#061811] text-white/80 text-xs font-semibold py-2.5 rounded-xl border border-white/10"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
