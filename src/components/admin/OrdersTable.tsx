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
      <div className="border-y border-[#f4eee3]/10 py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Status Filters */}
        <div className="flex items-center gap-6 sm:gap-7 overflow-x-auto w-full lg:w-auto scrollbar-none">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`relative whitespace-nowrap text-[9px] uppercase tracking-[0.16em] pb-2 transition-colors flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? "text-[#e8d9b4] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#c9a96a]"
                  : "text-[#a79e8e] hover:text-[#f4eee3]"
              }`}
            >
              {tab.id === "Received" && <span className="w-1.5 h-1.5 rounded-full bg-[#d3ab72]" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72">
          <Search className="w-3.5 h-3.5 text-[#7f786c] absolute left-0 top-1/2 -translate-y-1/2" strokeWidth={1.4} />
          <input
            type="text"
            placeholder="Search orders, names, cities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-[#f4eee3]/20 focus:border-[#c9a96a] text-[10px] tracking-[0.03em] text-[#f4eee3] placeholder-[#7f786c] rounded-none pl-6 pr-3 py-2.5 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Orders List / Cards */}
      {isLoading ? (
        <div className="text-center py-20 border border-[#f4eee3]/10">
          <div className="w-6 h-6 border border-[#c9a96a]/25 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#a79e8e]">Retrieving orders…</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 border border-[#f4eee3]/10 max-w-lg mx-auto">
          <Package className="w-8 h-8 text-[#c9a96a]/60 mx-auto mb-4" strokeWidth={1} />
          <h3 className="text-xl font-serif-luxury font-light text-[#f4eee3] mb-2">No orders found</h3>
          <p className="text-[10px] text-[#a79e8e] mb-6 leading-relaxed">
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
                className={`bg-[#0f0d0a] border p-5 sm:p-6 transition-colors duration-300 ${
                  isPendingDispatch
                    ? "border-[#f4eee3]/10 border-l-2 border-l-[#d3ab72] hover:border-[#c9a96a]/40"
                    : isDispatched
                    ? "border-[#f4eee3]/10 border-l-2 border-l-[#9ab79f] hover:border-[#c9a96a]/40"
                    : "border-[#f4eee3]/10 hover:border-[#c9a96a]/40"
                }`}
              >
                {/* Top Bar of Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f4eee3]/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 flex items-center justify-center border ${
                        isPendingDispatch
                          ? "border-[#d3ab72]/40 text-[#d3ab72]"
                          : isDispatched
                          ? "border-[#9ab79f]/40 text-[#9ab79f]"
                          : "border-[#f4eee3]/15 text-[#f4eee3]"
                      }`}
                    >
                      {isPendingDispatch ? <Package className="w-3.5 h-3.5" strokeWidth={1.4} /> : <Truck className="w-3.5 h-3.5" strokeWidth={1.4} />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-serif-luxury font-light text-[#f4eee3] tracking-wide">
                          #{order.orderNumber}
                        </span>
                        <span
                          className={`text-[8px] uppercase tracking-[0.14em] ${
                            isPendingDispatch
                              ? "text-[#d3ab72]"
                              : isDispatched
                              ? "text-[#9ab79f]"
                              : "text-[#a79e8e]"
                          }`}
                        >
                          · {order.orderStatus}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#7f786c] flex items-center gap-1 mt-0.5">
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
                      <div className="text-lg font-serif-luxury font-light text-[#e8d9b4]">
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
                  <div className="lg:col-span-4 bg-[#14110c] p-5 border border-[#f4eee3]/8 text-[11px] space-y-2.5 font-light">
                    <div className="text-[10px] font-bold text-[#c9a96a] uppercase tracking-wider mb-1">
                      Patron &amp; Delivery Destination
                    </div>
                    <div className="text-sm font-serif-luxury font-light text-[#f4eee3]">
                      {order.customerName}
                    </div>

                    <div className="flex items-center gap-2 text-[#ded6c7]">
                      <Phone className="w-3.5 h-3.5 text-[#c9a96a]" />
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="hover:text-[#c9a96a] transition-colors"
                      >
                        {order.customerPhone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-[#a79e8e]">
                      <Mail className="w-3.5 h-3.5 text-[#c9a96a]" />
                      <span className="truncate">{order.customerEmail}</span>
                    </div>

                    <div className="flex items-start gap-2 text-[#a79e8e] pt-1 border-t border-[#f4eee3]/10">
                      <MapPin className="w-3.5 h-3.5 text-[#c9a96a] shrink-0 mt-0.5" />
                      <span>
                        {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} - {order.shippingAddress.pincode}
                      </span>
                    </div>
                  </div>

                  {/* Items Ordered List Column */}
                  <div className="lg:col-span-5 space-y-2">
                    <div className="text-[10px] font-bold text-[#c9a96a] uppercase tracking-wider">
                      Purchased Masterpieces ({order.items.length})
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {order.items.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="border-b border-[#f4eee3]/8 pb-2.5 flex items-center gap-3 text-[11px] last:border-0"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            sizes="48px"
                            className="w-12 h-12 object-cover border border-[#c9a96a]/25 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <strong className="text-[#f4eee3] truncate block font-medium">
                              {item.name}
                            </strong>
                            <div className="flex items-center gap-2 text-[11px] text-[#a79e8e]">
                              <span className="text-[#c9a96a]">{item.metalPurity}</span>
                              <span>• {item.weightGrams}g</span>
                              <span>• Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[#e8d9b4] font-serif-luxury font-light">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <p className="text-[11px] text-[#a79e8e] italic bg-black/30 p-2 rounded-none border border-[#f4eee3]/5">
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
                        <div className="text-[#a79e8e]">
                          AWB{" "}
                          <code className="text-[#e8d9b4] font-mono">
                            {order.dispatchDetails.trackingNumber}
                          </code>
                        </div>
                        <div className="text-[#7f786c]">
                          Est. delivery {order.dispatchDetails.estimatedDelivery}
                        </div>

                        <button
                          onClick={() => onOpenNotificationModal(order)}
                          className="w-full mt-2 border border-[#c9a96a]/30 hover:border-[#c9a96a] text-[#e8d9b4] text-[8px] uppercase tracking-[0.14em] py-2 px-2 flex items-center justify-center gap-1.5 transition-colors"
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
                        className="w-full border border-[#f4eee3]/12 hover:border-[#c9a96a]/45 text-[#ded6c7] hover:text-[#f4eee3] text-[9px] uppercase tracking-[0.16em] py-3 px-3 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#c9a96a]" strokeWidth={1.4} /> Full Details
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
        <div className="fixed inset-0 z-50 bg-[#050504]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#100e0b] max-w-2xl w-full p-6 sm:p-9 border border-[#c9a96a]/25 relative shadow-2xl my-8 text-[#f4eee3]">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a79e8e] hover:text-[#f4eee3] border border-[#f4eee3]/10 hover:border-[#c9a96a]/50 transition-colors"
              aria-label="Close order details"
            >
              ✕
            </button>

            <div className="border-b border-[#f4eee3]/10 pb-5 mb-5">
              <span className="lux-eyebrow block mb-2">Order Record</span>
              <h3 className="text-2xl font-serif-luxury font-light text-[#f4eee3]">
                Order #{selectedOrderDetails.orderNumber}
              </h3>
            </div>

            <div className="space-y-5 text-[11px]">
              <div className="grid grid-cols-2 gap-5 border-y border-[#f4eee3]/10 py-5">
                <div>
                  <span className="text-[#7f786c] block">Customer Name</span>
                  <strong className="text-[#f4eee3]">{selectedOrderDetails.customerName}</strong>
                </div>
                <div>
                  <span className="text-[#7f786c] block">Phone</span>
                  <strong className="text-[#f4eee3]">{selectedOrderDetails.customerPhone}</strong>
                </div>
                <div>
                  <span className="text-[#7f786c] block">Email</span>
                  <strong className="text-[#f4eee3]">{selectedOrderDetails.customerEmail}</strong>
                </div>
                <div>
                  <span className="text-[#7f786c] block">Status</span>
                  <strong className="text-[#9ab79f]">{selectedOrderDetails.orderStatus}</strong>
                </div>
              </div>

              <div>
                <span className="text-[8px] uppercase tracking-[0.18em] text-[#7f786c] block mb-2">Items</span>
                <div className="space-y-0">
                  {selectedOrderDetails.items.map((i: any, index: number) => (
                    <div
                      key={index}
                      className="py-3 border-b border-[#f4eee3]/8 last:border-0 flex justify-between items-center gap-4"
                    >
                      <div>
                        <strong className="text-[#f4eee3] block">{i.name}</strong>
                        <span className="text-[10px] text-[#a79e8e]">
                          {i.metalPurity} • {i.weightGrams}g • Qty: {i.quantity}
                        </span>
                      </div>
                      <strong className="text-[#e8d9b4] font-serif-luxury">
                        ₹{(i.price * i.quantity).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrderDetails.dispatchDetails?.isDispatched && (
                <div className="border border-[#9ab79f]/25 p-4 text-[10px] text-[#ded6c7] space-y-1">
                  <div className="uppercase tracking-[0.16em] text-[8px] text-[#9ab79f] mb-2">Dispatch Information</div>
                  <div>Logistics · {selectedOrderDetails.dispatchDetails.courierPartner}</div>
                  <div>AWB · {selectedOrderDetails.dispatchDetails.trackingNumber}</div>
                  <div>
                    Dispatched ·{" "}
                    {new Date(selectedOrderDetails.dispatchDetails.dispatchedAt).toLocaleString()}
                  </div>
                  <div className="text-[#a79e8e]">Notes · {selectedOrderDetails.dispatchDetails.dispatchNotes}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#f4eee3]/10">
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
