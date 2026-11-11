"use client";

import React, { useState } from "react";
import Image from "next/image";
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
      <div className="border-y border-[#f6efe4]/10 py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Status Filters */}
        <div className="flex items-center gap-6 sm:gap-7 overflow-x-auto w-full lg:w-auto scrollbar-none">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`relative whitespace-nowrap text-[9px] uppercase tracking-[0.16em] pb-2 transition-colors flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? "text-[#ecd8ae] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#c8a05c]"
                  : "text-[#a99987] hover:text-[#f6efe4]"
              }`}
            >
              {tab.id === "Received" && <span className="w-1.5 h-1.5 rounded-full bg-[#d3ab72]" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72">
          <Search className="w-3.5 h-3.5 text-[#857768] absolute left-0 top-1/2 -translate-y-1/2" strokeWidth={1.4} />
          <input
            type="text"
            placeholder="Search orders, names, cities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-[#f6efe4]/20 focus:border-[#c8a05c] text-[10px] tracking-[0.03em] text-[#f6efe4] placeholder-[#857768] rounded-none pl-6 pr-3 py-2.5 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Orders List / Cards */}
      {isLoading ? (
        <div className="text-center py-20 border border-[#f6efe4]/10">
          <div className="w-6 h-6 border border-[#c8a05c]/25 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#a99987]">Retrieving orders…</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 border border-[#f6efe4]/10 max-w-lg mx-auto">
          <Package className="w-8 h-8 text-[#c8a05c]/60 mx-auto mb-4" strokeWidth={1} />
          <h3 className="text-xl font-serif-luxury font-light text-[#f6efe4] mb-2">No orders found</h3>
          <p className="text-[10px] text-[#a99987] mb-6 leading-relaxed">
            No orders match the selected filter &quot;{statusFilter}&quot; or search query.
          </p>
          <button
            onClick={() => {
              setStatusFilter("All");
              setSearchQuery("");
            }}
            className="lux-btn lux-btn-outline !py-3 !px-5 !text-[9px]"
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
                className={`bg-[#150d0c] border p-5 sm:p-6 transition-colors duration-300 ${
                  isPendingDispatch
                    ? "border-[#f6efe4]/10 border-l-2 border-l-[#d3ab72] hover:border-[#c8a05c]/40"
                    : isDispatched
                    ? "border-[#f6efe4]/10 border-l-2 border-l-[#9ab79f] hover:border-[#c8a05c]/40"
                    : "border-[#f6efe4]/10 hover:border-[#c8a05c]/40"
                }`}
              >
                {/* Top Bar of Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f6efe4]/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 flex items-center justify-center border ${
                        isPendingDispatch
                          ? "border-[#d3ab72]/40 text-[#d3ab72]"
                          : isDispatched
                          ? "border-[#9ab79f]/40 text-[#9ab79f]"
                          : "border-[#f6efe4]/15 text-[#f6efe4]"
                      }`}
                    >
                      {isPendingDispatch ? <Package className="w-3.5 h-3.5" strokeWidth={1.4} /> : <Truck className="w-3.5 h-3.5" strokeWidth={1.4} />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-serif-luxury font-light text-[#f6efe4] tracking-wide">
                          #{order.orderNumber}
                        </span>
                        <span
                          className={`text-[8px] uppercase tracking-[0.14em] ${
                            isPendingDispatch
                              ? "text-[#d3ab72]"
                              : isDispatched
                              ? "text-[#9ab79f]"
                              : "text-[#a99987]"
                          }`}
                        >
                          · {order.orderStatus}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#857768] flex items-center gap-1 mt-0.5">
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
                      <div className="text-lg font-serif-luxury font-light text-[#ecd8ae]">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </div>
                      <span
                        className={`text-[8px] uppercase tracking-[0.14em] ${
                          order.paymentStatus === "Paid" ? "text-[#9ab79f]" : "text-[#d3ab72]"
                        }`}
                      >
                        {order.paymentStatus} · {order.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body: Customer Details & Items Preview Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Customer Info Column */}
                  <div className="lg:col-span-4 bg-[#1b1110] p-5 border border-[#f6efe4]/8 text-[11px] space-y-2.5 font-light">
                    <div className="text-[10px] font-bold text-[#c8a05c] uppercase tracking-wider mb-1">
                      Patron &amp; Delivery Destination
                    </div>
                    <div className="text-sm font-serif-luxury font-light text-[#f6efe4]">
                      {order.customerName}
                    </div>

                    <div className="flex items-center gap-2 text-[#e0d4c2]">
                      <Phone className="w-3.5 h-3.5 text-[#c8a05c]" />
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="hover:text-[#c8a05c] transition-colors"
                      >
                        {order.customerPhone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-[#a99987]">
                      <Mail className="w-3.5 h-3.5 text-[#c8a05c]" />
                      <span className="truncate">{order.customerEmail}</span>
                    </div>

                    <div className="flex items-start gap-2 text-[#a99987] pt-1 border-t border-[#f6efe4]/10">
                      <MapPin className="w-3.5 h-3.5 text-[#c8a05c] shrink-0 mt-0.5" />
                      <span>
                        {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} - {order.shippingAddress.pincode}
                      </span>
                    </div>
                  </div>

                  {/* Items Ordered List Column */}
                  <div className="lg:col-span-5 space-y-2">
                    <div className="text-[10px] font-bold text-[#c8a05c] uppercase tracking-wider">
                      Purchased Masterpieces ({order.items.length})
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {order.items.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="border-b border-[#f6efe4]/8 pb-2.5 flex items-center gap-3 text-[11px] last:border-0"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            sizes="48px"
                            className="w-12 h-12 object-cover border border-[#c8a05c]/25 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <strong className="text-[#f6efe4] truncate block font-medium">
                              {item.name}
                            </strong>
                            <div className="flex items-center gap-2 text-[11px] text-[#a99987]">
                              <span className="text-[#c8a05c]">{item.metalPurity}</span>
                              <span>• {item.weightGrams}g</span>
                              <span>• Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[#ecd8ae] font-serif-luxury font-light">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <p className="text-[11px] text-[#a99987] italic bg-black/30 p-2 rounded-none border border-[#f6efe4]/5">
                        &quot;{order.notes}&quot;
                      </p>
                    )}
                  </div>

                  {/* Action & Dispatch Status Column */}
                  <div className="lg:col-span-3 flex flex-col justify-between gap-3 h-full">
                    {/* If Dispatched: Show Tracking Info */}
                    {isDispatched && order.dispatchDetails?.isDispatched && (
                      <div className="border border-[#9ab79f]/25 p-3.5 text-[10px] space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[#9ab79f] uppercase tracking-[0.12em] text-[8px]">
                          <Truck className="w-3 h-3" strokeWidth={1.4} /> {order.dispatchDetails.courierPartner}
                        </div>
                        <div className="text-[#a99987]">
                          AWB{" "}
                          <code className="text-[#ecd8ae] font-mono">
                            {order.dispatchDetails.trackingNumber}
                          </code>
                        </div>
                        <div className="text-[#857768]">
                          Est. delivery {order.dispatchDetails.estimatedDelivery}
                        </div>

                        <button
                          onClick={() => onOpenNotificationModal(order)}
                          className="w-full mt-2 border border-[#c8a05c]/30 hover:border-[#c8a05c] text-[#ecd8ae] text-[8px] uppercase tracking-[0.14em] py-2 px-2 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" strokeWidth={1.4} /> Notification log
                        </button>
                      </div>
                    )}

                    {/* Action Dispatch Button */}
                    <div className="flex flex-col gap-2 pt-2">
                      {isPendingDispatch && (
                        <button
                          onClick={() => onOpenDispatchModal(order)}
                          className="lux-btn lux-btn-gold w-full"
                        >
                          <Truck className="w-3.5 h-3.5" strokeWidth={1.4} /> Dispatch Order
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="w-full border border-[#f6efe4]/12 hover:border-[#c8a05c]/45 text-[#e0d4c2] hover:text-[#f6efe4] text-[9px] uppercase tracking-[0.16em] py-3 px-3 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} /> Full Details
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
        <div className="fixed inset-0 z-50 bg-[#080504]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#170d0c] max-w-2xl w-full p-6 sm:p-9 border border-[#c8a05c]/25 relative shadow-2xl my-8 text-[#f6efe4]">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a99987] hover:text-[#f6efe4] border border-[#f6efe4]/10 hover:border-[#c8a05c]/50 transition-colors"
              aria-label="Close order details"
            >
              ✕
            </button>

            <div className="border-b border-[#f6efe4]/10 pb-5 mb-5">
              <span className="lux-eyebrow block mb-2">Order Record</span>
              <h3 className="text-2xl font-serif-luxury font-light text-[#f6efe4]">
                Order #{selectedOrderDetails.orderNumber}
              </h3>
            </div>

            <div className="space-y-5 text-[11px]">
              <div className="grid grid-cols-2 gap-5 border-y border-[#f6efe4]/10 py-5">
                <div>
                  <span className="text-[#857768] block">Customer Name</span>
                  <strong className="text-[#f6efe4]">{selectedOrderDetails.customerName}</strong>
                </div>
                <div>
                  <span className="text-[#857768] block">Phone</span>
                  <strong className="text-[#f6efe4]">{selectedOrderDetails.customerPhone}</strong>
                </div>
                <div>
                  <span className="text-[#857768] block">Email</span>
                  <strong className="text-[#f6efe4]">{selectedOrderDetails.customerEmail}</strong>
                </div>
                <div>
                  <span className="text-[#857768] block">Status</span>
                  <strong className="text-[#9ab79f]">{selectedOrderDetails.orderStatus}</strong>
                </div>
              </div>

              <div>
                <span className="text-[8px] uppercase tracking-[0.18em] text-[#857768] block mb-2">Items</span>
                <div className="space-y-0">
                  {selectedOrderDetails.items.map((i: any, index: number) => (
                    <div
                      key={index}
                      className="py-3 border-b border-[#f6efe4]/8 last:border-0 flex justify-between items-center gap-4"
                    >
                      <div>
                        <strong className="text-[#f6efe4] block">{i.name}</strong>
                        <span className="text-[10px] text-[#a99987]">
                          {i.metalPurity} • {i.weightGrams}g • Qty: {i.quantity}
                        </span>
                      </div>
                      <strong className="text-[#ecd8ae] font-serif-luxury">
                        ₹{(i.price * i.quantity).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrderDetails.dispatchDetails?.isDispatched && (
                <div className="border border-[#9ab79f]/25 p-4 text-[10px] text-[#e0d4c2] space-y-1">
                  <div className="uppercase tracking-[0.16em] text-[8px] text-[#9ab79f] mb-2">Dispatch Information</div>
                  <div>Logistics · {selectedOrderDetails.dispatchDetails.courierPartner}</div>
                  <div>AWB · {selectedOrderDetails.dispatchDetails.trackingNumber}</div>
                  <div>
                    Dispatched ·{" "}
                    {new Date(selectedOrderDetails.dispatchDetails.dispatchedAt).toLocaleString()}
                  </div>
                  <div className="text-[#a99987]">Notes · {selectedOrderDetails.dispatchDetails.dispatchNotes}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#f6efe4]/10">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="lux-btn lux-btn-gold"
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
