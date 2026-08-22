"use client";

import React, { useState } from "react";
import { Truck, X, ShieldCheck, Send, Calendar, FileText, CheckCircle2, MessageSquare, Mail, AlertTriangle } from "lucide-react";

interface DispatchModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onDispatchSuccess: (dispatchedOrder: any, notificationPayload: any) => void;
}

const COURIER_OPTIONS = [
  { id: "BlueDart Apex Express", label: "BlueDart Apex Express (Air High-Value)", prefix: "BD" },
  { id: "Sequel Secure Logistics", label: "Sequel Secure Logistics (Armoured Vault Transit)", prefix: "SQ" },
  { id: "Delhivery Express Secure", label: "Delhivery Express (Secure Insured)", prefix: "DL" },
  { id: "DTDC Gold Priority", label: "DTDC Gold Priority Express", prefix: "DT" },
  { id: "India Post Speed Post Secure", label: "Speed Post Secure (Insured Parcel)", prefix: "SP" },
];

export const DispatchModal: React.FC<DispatchModalProps> = ({
  order,
  isOpen,
  onClose,
  onDispatchSuccess,
}) => {
  const [courierPartner, setCourierPartner] = useState<string>("BlueDart Apex Express");
  const [trackingNumber, setTrackingNumber] = useState<string>(
    `BD-${Math.floor(10000000 + Math.random() * 90000000)}`
  );
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("2-3 Business Days (Express Insured)");
  const [dispatchNotes, setDispatchNotes] = useState<string>(
    "Insured shipment in tamper-evident security pouch. Hallmarking & diamond certificates enclosed."
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !order) return null;

  const handleCourierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCourierPartner(selected);
    const courierObj = COURIER_OPTIONS.find((c) => c.id === selected);
    const prefix = courierObj?.prefix || "JJ";
    setTrackingNumber(`${prefix}-${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/orders/${order._id}/dispatch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courierPartner,
          trackingNumber,
          estimatedDelivery,
          dispatchNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to dispatch order");
      }

      onDispatchSuccess(data.order, data.notifications);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during dispatch");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="emerald-glass max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-[#d4af37] relative shadow-2xl my-8">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 border-b border-white/10 pb-5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest block">
              Fulfilment &amp; Logistics Action
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
              Dispatch Order #{order.orderNumber}
            </h3>
            <p className="text-xs text-white/70 mt-1">
              Mark this jewellery consignment as dispatched and immediately notify patron{" "}
              <strong className="text-white">{order.customerName}</strong>.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-rose-950/80 border border-rose-500/40 p-3 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Order Summary Snapshot */}
        <div className="bg-[#05160f] p-4 rounded-2xl border border-white/10 mb-6 text-xs text-white/80 space-y-2">
          <div className="flex flex-wrap justify-between items-center border-b border-white/10 pb-2">
            <div>
              <span className="text-white/50 block text-[10px]">Customer:</span>
              <strong className="text-white text-sm">{order.customerName}</strong> (
              {order.customerPhone})
            </div>
            <div className="text-right">
              <span className="text-white/50 block text-[10px]">Order Value:</span>
              <strong className="text-sm font-serif-luxury text-[#fcf6ba]">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center pt-1 text-[11px]">
            <div>
              <span className="text-white/50">Delivery Destination: </span>
              <span className="text-white">
                {order.shippingAddress.city}, {order.shippingAddress.state} ({order.shippingAddress.pincode})
              </span>
            </div>
            <div>
              <span className="text-white/50">Items: </span>
              <span className="text-emerald-400 font-semibold">{order.items.length} Piece(s)</span>
            </div>
          </div>
        </div>

        {/* Dispatch Form */}
        <form onSubmit={handleDispatch} className="flex flex-col gap-4 text-xs text-white">
          <div>
            <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
              Insured Courier Logistics Partner *
            </label>
            <select
              value={courierPartner}
              onChange={handleCourierChange}
              className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none cursor-pointer"
            >
              {COURIER_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Tracking / AWB Airway Bill Number *
              </label>
              <input
                type="text"
                required
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. BD-8921445"
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white font-mono rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
                Estimated Delivery Timeline *
              </label>
              <input
                type="text"
                required
                value={estimatedDelivery}
                onChange={(e) => setEstimatedDelivery(e.target.value)}
                placeholder="e.g. In 2 Business Days (By 4 PM)"
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold uppercase tracking-wider text-white/80 block mb-1">
              Security Seal &amp; Dispatch Notes
            </label>
            <textarea
              rows={2}
              value={dispatchNotes}
              onChange={(e) => setDispatchNotes(e.target.value)}
              placeholder="Tamper proof vault seal number, special packaging notes..."
              className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white rounded-xl p-3 outline-none resize-none"
            />
          </div>

          {/* Customer Notification Channels Banner */}
          <div className="bg-[#0b2419] p-3.5 rounded-xl border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white text-xs block">Automated Customer Notification Enabled</strong>
                <span className="text-[10px] text-white/70">
                  Instant WhatsApp link, branded email notification &amp; SMS tracking will be generated.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
              <MessageSquare className="w-4 h-4" />
              <Mail className="w-4 h-4" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-3 rounded-xl border border-white/15 text-white/80 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Processing Dispatch...</>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Confirm Dispatch &amp; Notify Customer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
