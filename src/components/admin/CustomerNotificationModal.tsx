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
    <div className="fixed inset-0 z-50 bg-[#080504]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#170d0c] max-w-3xl w-full rounded-none p-6 sm:p-9 border border-[#c8a05c]/25 relative shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a99987] hover:text-[#f6efe4] border border-[#f6efe4]/10 hover:border-[#c8a05c]/50 transition-colors"
          aria-label="Close notifications"
        >
          <X className="w-4 h-4" strokeWidth={1.4} />
        </button>

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-11 h-11 border border-[#9ab79f]/45 text-[#9ab79f] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-5 h-5" strokeWidth={1.3} />
          </div>
          <span className="lux-eyebrow block">Consignment in Transit</span>
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-light text-[#f6efe4] mt-2">
            Order #{order.orderNumber} dispatched
          </h3>
          <p className="text-[10.5px] text-[#a99987] font-light max-w-md mx-auto mt-2 leading-relaxed">
            Handed to <strong className="text-[#e0d4c2] font-normal">{courier}</strong> · AWB{" "}
            <code className="text-[#ecd8ae] font-mono">{trackingNumber}</code>
          </p>
        </div>

        {/* Notification Channel Tabs */}
        <div className="flex items-center justify-center gap-7 mb-7 border-b border-[#f6efe4]/10 pb-4">
          {[
            { id: "whatsapp" as const, label: "WhatsApp", icon: MessageSquare },
            { id: "email" as const, label: "Email", icon: Mail },
            { id: "sms" as const, label: "SMS", icon: Phone },
          ].map((channel) => (
            <button
              key={channel.id}
              onClick={() => setActiveNotificationTab(channel.id)}
              className={`relative flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] pb-2 transition-colors ${
                activeNotificationTab === channel.id
                  ? "text-[#ecd8ae] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#c8a05c]"
                  : "text-[#a99987] hover:text-[#f6efe4]"
              }`}
            >
              <channel.icon className="w-3.5 h-3.5" strokeWidth={1.4} /> {channel.label}
            </button>
          ))}
        </div>

        {/* Tab 1: WhatsApp Notification View */}
        {activeNotificationTab === "whatsapp" && (
          <div className="space-y-4">
            <div className="border border-[#f6efe4]/10 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f6efe4]/10 pb-4 mb-4 text-[9px] uppercase tracking-[0.14em]">
                <div className="flex items-center gap-2 text-[#c8a05c]">
                  <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.4} /> WhatsApp Template
                </div>
                <span className="text-[#857768]">To <strong className="text-[#e0d4c2] font-normal normal-case">{phone}</strong></span>
              </div>

              <div className="bg-[#1b1110] p-4 font-mono text-[11px] text-[#e0d4c2] whitespace-pre-wrap leading-relaxed border border-[#f6efe4]/8 max-h-56 overflow-y-auto">
                {waMsg}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2">
                <button
                  onClick={handleCopyWA}
                  className="flex items-center gap-1.5 text-xs text-[#a99987] hover:text-[#f6efe4] bg-white/5 px-3 py-2 rounded-none border border-[#f6efe4]/10"
                >
                  {copiedWA ? <Check className="w-3.5 h-3.5 text-[#9ab79f]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedWA ? "Copied to Clipboard!" : "Copy Text"}
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-btn lux-btn-gold"
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
            <div className="bg-[#1b1110] border border-[#f6efe4]/8 p-5 max-h-80 overflow-y-auto">
              {/* Luxury Email Header */}
              <div className="text-center border-b border-[#c8a05c]/30 pb-4 mb-4">
                <div className="text-base font-serif-luxury font-light gold-text-gradient tracking-widest uppercase">
                  JAIN JEWELLS
                </div>
                <span className="text-[10px] text-[#857768] tracking-widest uppercase block">
                  Fine Jewellery Atelier • Jaipur
                </span>
              </div>

              <div className="text-xs text-[#e0d4c2] space-y-3 leading-relaxed">
                <p>Dear <strong className="text-[#f6efe4]">{order.customerName}</strong>,</p>
                <p>
                  We take great pride in informing you that your handcrafted jewellery piece(s) under Order <strong className="text-[#ecd8ae]">#{order.orderNumber}</strong> have passed our master quality appraisal, received 6-Digit HUID hallmarking certification, and are now in transit.
                </p>

                <div className="border-y border-[#f6efe4]/10 py-4 text-[10px] grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#857768] block">Logistics Partner:</span>
                    <strong className="text-[#f6efe4]">{courier}</strong>
                  </div>
                  <div>
                    <span className="text-[#857768] block">Tracking ID:</span>
                    <strong className="text-[#ecd8ae] font-mono">{trackingNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[#857768] block">Estimated Arrival:</span>
                    <strong className="text-[#f6efe4]">{estimatedDelivery}</strong>
                  </div>
                  <div>
                    <span className="text-[#857768] block">Insurance Status:</span>
                    <strong className="text-[#9ab79f]">100% Fully Insured</strong>
                  </div>
                </div>

                <p className="text-[11px] text-[#a99987]">
                  Recipient Email: <strong className="text-[#f6efe4]">{email}</strong>
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <span className="text-[9px] uppercase tracking-[0.14em] text-[#9ab79f] flex items-center gap-1.5 border border-[#9ab79f]/25 px-3 py-2">
                <CheckCircle2 className="w-3 h-3" strokeWidth={1.5} /> Notification logged
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: SMS View */}
        {activeNotificationTab === "sms" && (
          <div className="space-y-4">
            <div className="border border-[#f6efe4]/10 p-5">
              <div className="text-[9px] uppercase tracking-[0.16em] text-[#857768] mb-3">SMS Preview · {phone}</div>
              <div className="bg-[#1b1110] p-4 font-mono text-[11px] text-[#e0d4c2] border border-[#f6efe4]/8 leading-relaxed">
                JAIN JEWELLS: Your order #{order.orderNumber} has been dispatched via {courier} (AWB: {trackingNumber}). Estimated delivery: {estimatedDelivery}. Track live at {trackingUrl}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#f6efe4]/10 pt-5 mt-6">
          <button
            onClick={handleCopyTrack}
            className="text-[9px] uppercase tracking-[0.14em] text-[#a99987] hover:text-[#f6efe4] flex items-center gap-1.5 px-4 py-2.5 border border-[#f6efe4]/10"
          >
            {copiedTrack ? <Check className="w-3.5 h-3.5 text-[#9ab79f]" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedTrack ? "Tracking Link Copied!" : "Copy Tracking URL"}
          </button>

          <button
            onClick={onClose}
            className="lux-btn lux-btn-gold"
          >
            Done &amp; Return to Orders
          </button>
        </div>
      </div>
    </div>
  );
};
