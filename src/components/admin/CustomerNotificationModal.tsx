"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  X,
  MessageSquare,
  Mail,
  Copy,
  ExternalLink,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  Phone,
} from "lucide-react";

interface CustomerNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  notifications: {
    whatsappUrl?: string;
    whatsappMessage?: string;
    customerPhone?: string;
    customerEmail?: string;
    trackingUrl?: string;
    courierPartner?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
  } | null;
}

export const CustomerNotificationModal: React.FC<CustomerNotificationModalProps> = ({
  isOpen,
  onClose,
  order,
  notifications,
}) => {
  const [copiedWA, setCopiedWA] = useState(false);
  const [copiedTrack, setCopiedTrack] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState<"whatsapp" | "email" | "sms">("whatsapp");

  if (!isOpen || !order) return null;

  const phone = notifications?.customerPhone || order.customerPhone;
  const email = notifications?.customerEmail || order.customerEmail;
  const courier = notifications?.courierPartner || order.dispatchDetails?.courierPartner || "BlueDart Apex Express";
  const trackingNumber = notifications?.trackingNumber || order.dispatchDetails?.trackingNumber || "N/A";
  const trackingUrl = notifications?.trackingUrl || order.dispatchDetails?.trackingUrl || "#";
  const estimatedDelivery = notifications?.estimatedDelivery || order.dispatchDetails?.estimatedDelivery || "2-3 Days";
  const waMsg =
    notifications?.whatsappMessage ||
    `👑 *JAIN JEWELLS — ORDER DISPATCHED* 👑\n\nDear *${order.customerName}*,\n\nYour bespoke jewellery order *#${order.orderNumber}* has been dispatched via *${courier}* (AWB: ${trackingNumber}).\n\nTrack: ${trackingUrl}`;

  const waUrl =
    notifications?.whatsappUrl ||
    `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(waMsg)}`;

  const handleCopyWA = () => {
    navigator.clipboard.writeText(waMsg);
    setCopiedWA(true);
    setTimeout(() => setCopiedWA(false), 2500);
  };

  const handleCopyTrack = () => {
    navigator.clipboard.writeText(trackingUrl);
    setCopiedTrack(true);
    setTimeout(() => setCopiedTrack(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="emerald-glass max-w-3xl w-full rounded-3xl p-6 sm:p-8 border border-emerald-400 relative shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto mb-3 shadow-[0_0_25px_rgba(52,211,153,0.3)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
            Consignment In Transit
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mt-1">
            Order #{order.orderNumber} Dispatched!
          </h3>
          <p className="text-xs text-white/70 max-w-md mx-auto mt-1">
            Consignment has been handed over to <strong className="text-emerald-300">{courier}</strong> with AWB{" "}
            <code className="text-[#fcf6ba] font-mono font-bold bg-black/40 px-2 py-0.5 rounded">{trackingNumber}</code>.
          </p>
        </div>

        {/* Notification Channel Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveNotificationTab("whatsapp")}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
              activeNotificationTab === "whatsapp"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                : "bg-white/5 text-white/70 hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Notification
          </button>

          <button
            onClick={() => setActiveNotificationTab("email")}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
              activeNotificationTab === "email"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                : "bg-white/5 text-white/70 hover:text-white"
            }`}
          >
            <Mail className="w-4 h-4" /> Branded Email
          </button>

          <button
            onClick={() => setActiveNotificationTab("sms")}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
              activeNotificationTab === "sms"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                : "bg-white/5 text-white/70 hover:text-white"
            }`}
          >
            <Phone className="w-4 h-4" /> SMS Alert
          </button>
        </div>

        {/* Tab 1: WhatsApp Notification View */}
        {activeNotificationTab === "whatsapp" && (
          <div className="space-y-4">
            <div className="bg-[#051f15] border border-emerald-500/40 rounded-2xl p-4 sm:p-5 relative shadow-inner">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <MessageSquare className="w-4 h-4" /> WhatsApp Dispatch Template
                </div>
                <span className="text-[11px] text-white/60">Recipient: <strong className="text-white">{phone}</strong></span>
              </div>

              <div className="bg-[#03140e] p-4 rounded-xl font-mono text-xs text-emerald-100/90 whitespace-pre-wrap leading-relaxed border border-emerald-500/20 max-h-56 overflow-y-auto">
                {waMsg}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2">
                <button
                  onClick={handleCopyWA}
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/5 px-3 py-2 rounded-lg border border-white/10"
                >
                  {copiedWA ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedWA ? "Copied to Clipboard!" : "Copy Text"}
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-4 h-4" /> Send Direct WhatsApp Notification <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Luxury Email View */}
        {activeNotificationTab === "email" && (
          <div className="space-y-4">
            <div className="bg-[#03110b] border border-[#d4af37]/40 rounded-2xl p-5 shadow-2xl max-h-80 overflow-y-auto">
              {/* Luxury Email Header */}
              <div className="text-center border-b border-[#d4af37]/30 pb-4 mb-4">
                <div className="text-base font-serif-luxury font-bold gold-text-gradient tracking-widest uppercase">
                  JAIN JEWELLS
                </div>
                <span className="text-[10px] text-white/50 tracking-widest uppercase block">
                  Fine Jewellery Atelier • Jaipur
                </span>
              </div>

              <div className="text-xs text-white/80 space-y-3 leading-relaxed">
                <p>Dear <strong className="text-white">{order.customerName}</strong>,</p>
                <p>
                  We take great pride in informing you that your handcrafted jewellery piece(s) under Order <strong className="text-[#fcf6ba]">#{order.orderNumber}</strong> have passed our master quality appraisal, received 6-Digit HUID hallmarking certification, and are now in transit.
                </p>

                <div className="bg-[#072016] p-3 rounded-xl border border-emerald-500/20 text-[11px] grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-white/50 block">Logistics Partner:</span>
                    <strong className="text-white">{courier}</strong>
                  </div>
                  <div>
                    <span className="text-white/50 block">Tracking ID:</span>
                    <strong className="text-emerald-300 font-mono">{trackingNumber}</strong>
                  </div>
                  <div>
                    <span className="text-white/50 block">Estimated Arrival:</span>
                    <strong className="text-white">{estimatedDelivery}</strong>
                  </div>
                  <div>
                    <span className="text-white/50 block">Insurance Status:</span>
                    <strong className="text-emerald-400">100% Fully Insured</strong>
                  </div>
                </div>

                <p className="text-[11px] text-white/60">
                  Recipient Email: <strong className="text-white">{email}</strong>
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Email dispatch notification logged in database
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: SMS View */}
        {activeNotificationTab === "sms" && (
          <div className="space-y-4">
            <div className="bg-[#051a11] border border-white/10 rounded-2xl p-5">
              <div className="text-xs text-white/60 mb-2">SMS Message Preview (Sent to {phone}):</div>
              <div className="bg-[#020e08] p-4 rounded-xl font-mono text-xs text-white border border-white/10">
                JAIN JEWELLS: Your order #{order.orderNumber} has been dispatched via {courier} (AWB: {trackingNumber}). Estimated delivery: {estimatedDelivery}. Track live at {trackingUrl}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-5 mt-6">
          <button
            onClick={handleCopyTrack}
            className="text-xs text-white/80 hover:text-white flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10"
          >
            {copiedTrack ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedTrack ? "Tracking Link Copied!" : "Copy Tracking URL"}
          </button>

          <button
            onClick={onClose}
            className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Done &amp; Return to Orders
          </button>
        </div>
      </div>
    </div>
  );
};
