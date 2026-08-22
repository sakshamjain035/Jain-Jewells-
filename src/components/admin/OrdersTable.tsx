"use client";

import React, { useState } from "react";
import {
  Truck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Eye,
  Trash2,
  Send,
  MessageSquare,
  AlertCircle,
  Package,
} from "lucide-react";

interface OrdersTableProps {
  orders: any[];
  isLoading: boolean;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenDispatchModal: (order: any) => void;
  onOpenNotificationModal: (order: any) => void;
  onRefresh: () => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  isLoading,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  onOpenDispatchModal,
  onOpenNotificationModal,
  onRefresh,
}) => {
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any | null>(null);

  const statusTabs = [
    { id: "All", label: "All Orders" },
    { id: "Received", label: "Received (Pending Dispatch)" },
    { id: "Processing", label: "In Atelier Processing" },
    { id: "Dispatched", label: "Dispatched & In Transit" },
    { id: "Delivered", label: "Delivered" },
  ];

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="emerald-glass p-4 sm:p-5 rounded-2xl border border-[#d4af37]/30 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-none pb-2 lg:pb-0">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? "gold-bg-gradient text-[#06110c] font-bold shadow-md"
                  : "bg-[#06110c]/80 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              {tab.id === "Received" && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Order #, Name, Phone, City..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#06110c]/90 border border-white/15 focus:border-[#d4af37] text-xs text-white placeholder-white/40 rounded-xl pl-9 pr-4 py-2.5 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Orders List / Cards */}
      {isLoading ? (
        <div className="text-center py-20 emerald-glass rounded-2xl border border-white/10">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-white/70">Fetching real-time orders from MongoDB...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 emerald-glass rounded-2xl border border-white/10 max-w-lg mx-auto">
          <Package className="w-12 h-12 text-[#d4af37]/60 mx-auto mb-3" />
          <h3 className="text-lg font-serif-luxury font-bold text-white mb-1">No Orders Found</h3>
          <p className="text-xs text-white/60 mb-4">
            No orders match the selected filter &quot;{statusFilter}&quot; or search query.
          </p>
          <button
            onClick={() => {
              setStatusFilter("All");
              setSearchQuery("");
            }}
            className="gold-bg-gradient text-[#06110c] text-xs font-bold px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {orders.map((order) => {
            const isPendingDispatch =
              order.orderStatus === "Received" || order.orderStatus === "Processing";
            const isDispatched = order.orderStatus === "Dispatched";
            const isDelivered = order.orderStatus === "Delivered";

            return (
              <div
                key={order._id}
                className={`emerald-glass rounded-2xl border p-5 sm:p-6 transition-all duration-300 shadow-xl ${
                  isPendingDispatch
                    ? "border-amber-500/40 bg-gradient-to-r from-[#061811] via-[#091f16] to-[#121f0b]/40 hover:border-amber-400"
                    : isDispatched
                    ? "border-emerald-500/40 bg-gradient-to-r from-[#061811] to-[#041a12] hover:border-emerald-400"
                    : "border-white/10 hover:border-[#d4af37]/40"
                }`}
              >
                {/* Top Bar of Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isPendingDispatch
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : isDispatched
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-white/10 text-white border border-white/20"
                      }`}
                    >
                      {isPendingDispatch ? <Package className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-serif-luxury font-bold text-white tracking-wide">
                          #{order.orderNumber}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                            isPendingDispatch
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                              : isDispatched
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                              : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                          }`}
                        >
                          ● {order.orderStatus}
                        </span>
                      </div>
                      <span className="text-[11px] text-white/50 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Payment Tag */}
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <div className="text-right">
                      <div className="text-lg font-serif-luxury font-bold text-[#fcf6ba]">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          order.paymentStatus === "Paid"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-950 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {order.paymentStatus} ({order.paymentMethod})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body: Customer Details & Items Preview Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Customer Info Column */}
                  <div className="lg:col-span-4 bg-[#04140d] p-4 rounded-xl border border-white/10 text-xs space-y-2">
                    <div className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                      Patron &amp; Delivery Destination
                    </div>
                    <div className="text-sm font-serif-luxury font-bold text-white">
                      {order.customerName}
                    </div>

                    <div className="flex items-center gap-2 text-white/80">
                      <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="hover:text-[#d4af37] transition-colors"
                      >
                        {order.customerPhone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-white/70">
                      <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span className="truncate">{order.customerEmail}</span>
                    </div>

                    <div className="flex items-start gap-2 text-white/70 pt-1 border-t border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>
                        {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} - {order.shippingAddress.pincode}
                      </span>
                    </div>
                  </div>

                  {/* Items Ordered List Column */}
                  <div className="lg:col-span-5 space-y-2">
                    <div className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                      Purchased Masterpieces ({order.items.length})
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {order.items.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-[#04140d]/80 p-2.5 rounded-xl border border-white/10 flex items-center gap-3 text-xs"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover border border-[#d4af37]/30 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <strong className="text-white truncate block font-medium">
                              {item.name}
                            </strong>
                            <div className="flex items-center gap-2 text-[11px] text-white/60">
                              <span className="text-[#d4af37]">{item.metalPurity}</span>
                              <span>• {item.weightGrams}g</span>
                              <span>• Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[#fcf6ba] font-serif-luxury font-bold">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <p className="text-[11px] text-white/60 italic bg-black/30 p-2 rounded-lg border border-white/5">
                        &quot;{order.notes}&quot;
                      </p>
                    )}
                  </div>

                  {/* Action & Dispatch Status Column */}
                  <div className="lg:col-span-3 flex flex-col justify-between gap-3 h-full">
                    {/* If Dispatched: Show Tracking Info */}
                    {isDispatched && order.dispatchDetails?.isDispatched && (
                      <div className="bg-[#032014] p-3 rounded-xl border border-emerald-500/30 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                          <Truck className="w-3.5 h-3.5" /> Dispatched via{" "}
                          {order.dispatchDetails.courierPartner}
                        </div>
                        <div className="text-[11px] text-white/70">
                          AWB:{" "}
                          <code className="text-[#fcf6ba] font-mono font-bold">
                            {order.dispatchDetails.trackingNumber}
                          </code>
                        </div>
                        <div className="text-[10px] text-white/60">
                          Est. Delivery: {order.dispatchDetails.estimatedDelivery}
                        </div>

                        <button
                          onClick={() => onOpenNotificationModal(order)}
                          className="w-full mt-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" /> View Notification Log
                        </button>
                      </div>
                    )}

                    {/* Action Dispatch Button */}
                    <div className="flex flex-col gap-2 pt-2">
                      {isPendingDispatch && (
                        <button
                          onClick={() => onOpenDispatchModal(order)}
                          className="w-full gold-bg-gradient text-[#06110c] font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-95 transition-all animate-bounce-subtle"
                        >
                          <Truck className="w-4 h-4" /> Dispatch Order Now
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="w-full bg-[#061811] hover:bg-[#0d2a1e] border border-white/15 text-white/80 hover:text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#d4af37]" /> Full Order Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Order Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="emerald-glass max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-[#d4af37] relative shadow-2xl my-8 text-white">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
            >
              ✕
            </button>

            <div className="border-b border-white/10 pb-4 mb-4">
              <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest block">
                Jain Jewells Order Certificate
              </span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white">
                Order #{selectedOrderDetails.orderNumber}
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#04140d] p-4 rounded-xl border border-white/10">
                <div>
                  <span className="text-white/50 block">Customer Name</span>
                  <strong className="text-white">{selectedOrderDetails.customerName}</strong>
                </div>
                <div>
                  <span className="text-white/50 block">Phone</span>
                  <strong className="text-white">{selectedOrderDetails.customerPhone}</strong>
                </div>
                <div>
                  <span className="text-white/50 block">Email</span>
                  <strong className="text-white">{selectedOrderDetails.customerEmail}</strong>
                </div>
                <div>
                  <span className="text-white/50 block">Status</span>
                  <strong className="text-emerald-400">{selectedOrderDetails.orderStatus}</strong>
                </div>
              </div>

              <div>
                <span className="text-white/50 block mb-2 font-semibold">Items Breakdown:</span>
                <div className="space-y-2">
                  {selectedOrderDetails.items.map((i: any, index: number) => (
                    <div
                      key={index}
                      className="bg-[#061811] p-3 rounded-xl border border-white/10 flex justify-between items-center"
                    >
                      <div>
                        <strong className="text-white block">{i.name}</strong>
                        <span className="text-[10px] text-white/60">
                          {i.metalPurity} • {i.weightGrams}g • Qty: {i.quantity}
                        </span>
                      </div>
                      <strong className="text-[#fcf6ba] font-serif-luxury">
                        ₹{(i.price * i.quantity).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrderDetails.dispatchDetails?.isDispatched && (
                <div className="bg-[#032014] p-4 rounded-xl border border-emerald-500/40 text-emerald-200">
                  <div className="font-bold mb-1 text-emerald-300">📦 Dispatch Information:</div>
                  <div>Logistics: {selectedOrderDetails.dispatchDetails.courierPartner}</div>
                  <div>AWB / Tracking: {selectedOrderDetails.dispatchDetails.trackingNumber}</div>
                  <div>
                    Dispatched At:{" "}
                    {new Date(selectedOrderDetails.dispatchDetails.dispatchedAt).toLocaleString()}
                  </div>
                  <div>Notes: {selectedOrderDetails.dispatchDetails.dispatchNotes}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
