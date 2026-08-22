"use client";

import React from "react";
import { Package, Truck, IndianRupee, Users, ArrowUpRight, AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface AdminStatsProps {
  stats: {
    orders: {
      total: number;
      received: number;
      processing: number;
      dispatched: number;
      delivered: number;
      pendingDispatch: number;
    };
    revenue: {
      total: number;
      formatted: string;
    };
    leads: {
      total: number;
      new: number;
      converted: number;
      conversionRate: number;
    };
    appointments: {
      total: number;
    };
  } | null;
  activeTab: "orders" | "leads" | "dispatched";
  setActiveTab: (tab: "orders" | "leads" | "dispatched") => void;
  setOrderStatusFilter?: (status: string) => void;
}

export const AdminStatsCards: React.FC<AdminStatsProps> = ({
  stats,
  activeTab,
  setActiveTab,
  setOrderStatusFilter,
}) => {
  const pendingOrders = stats?.orders.pendingDispatch ?? 0;
  const dispatchedOrders = stats?.orders.dispatched ?? 0;
  const newLeads = stats?.leads.new ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {/* 1. Orders Received (Action Needed) Card */}
      <div
        onClick={() => {
          setActiveTab("orders");
          if (setOrderStatusFilter) setOrderStatusFilter("Received");
        }}
        className={`emerald-glass rounded-2xl p-5 border transition-all cursor-pointer relative overflow-hidden group hover:scale-[1.02] shadow-xl ${
          pendingOrders > 0
            ? "border-amber-500/50 bg-gradient-to-br from-[#0b2419] to-[#1f1505]"
            : "border-[#d4af37]/30 hover:border-[#d4af37]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-amber-400" />
            Orders Received
          </span>
          {pendingOrders > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-amber-500 text-black px-2.5 py-0.5 rounded-full animate-pulse">
              <AlertCircle className="w-3 h-3" /> {pendingOrders} Awaiting Dispatch
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-serif-luxury font-bold text-white">
            {stats?.orders.received ?? 0}
            <span className="text-xs font-normal text-white/50 ml-2">
              of {stats?.orders.total ?? 0} total
            </span>
          </div>
          <div className="text-xs text-amber-400/80 group-hover:text-amber-300 font-semibold flex items-center">
            Dispatch Now <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
          </div>
        </div>

        <p className="text-[11px] text-white/60 mt-2">
          New customer orders ready for verification, packing &amp; shipment.
        </p>
      </div>

      {/* 2. Orders Dispatched Card */}
      <div
        onClick={() => {
          setActiveTab("dispatched");
          if (setOrderStatusFilter) setOrderStatusFilter("Dispatched");
        }}
        className="emerald-glass rounded-2xl p-5 border border-[#d4af37]/30 hover:border-emerald-400 transition-all cursor-pointer group hover:scale-[1.02] shadow-xl bg-gradient-to-br from-[#061811] to-[#041a12]"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-300 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-400" />
            Dispatched Orders
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> In Transit
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-serif-luxury font-bold text-emerald-300">
            {dispatchedOrders}
            <span className="text-xs font-normal text-white/50 ml-2">
              ({stats?.orders.delivered ?? 0} delivered)
            </span>
          </div>
          <div className="text-xs text-emerald-400/80 group-hover:text-emerald-300 font-semibold flex items-center">
            View Tracking <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
          </div>
        </div>

        <p className="text-[11px] text-white/60 mt-2">
          Insured consignments actively monitored with customer notifications.
        </p>
      </div>

      {/* 3. Total Order Revenue Card */}
      <div className="emerald-glass rounded-2xl p-5 border border-[#d4af37]/30 shadow-xl bg-gradient-to-br from-[#091f16] to-[#0c2e21]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-[#d4af37] flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4 text-[#d4af37]" />
            Gross Order Value
          </span>
          <span className="text-[10px] text-white/60 bg-black/40 px-2 py-0.5 rounded border border-white/10">
            Certified Gold
          </span>
        </div>

        <div className="text-3xl font-serif-luxury font-bold text-[#fcf6ba] truncate">
          {stats?.revenue.formatted ?? "₹0"}
        </div>

        <p className="text-[11px] text-white/60 mt-2">
          Cumulative value of confirmed showroom orders &amp; bridal trousseaus.
        </p>
      </div>

      {/* 4. Active Leads & Inquiries Card */}
      <div
        onClick={() => setActiveTab("leads")}
        className="emerald-glass rounded-2xl p-5 border border-[#d4af37]/30 hover:border-[#d4af37] transition-all cursor-pointer group hover:scale-[1.02] shadow-xl bg-gradient-to-br from-[#061811] to-[#12281e]"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-white/80 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#d4af37]" />
            Customer Leads
          </span>
          {newLeads > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#d4af37] text-black px-2 py-0.5 rounded-full">
              {newLeads} Fresh
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-serif-luxury font-bold text-white">
            {stats?.leads.total ?? 0}
            <span className="text-xs font-normal text-white/50 ml-2">
              ({stats?.leads.converted ?? 0} converted)
            </span>
          </div>
          <div className="text-xs text-[#d4af37] group-hover:text-white font-semibold flex items-center">
            Open Pipeline <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
          </div>
        </div>

        <p className="text-[11px] text-white/60 mt-2">
          Inquiries, VIP showroom appointments, and bespoke design prospects.
        </p>
      </div>
    </div>
  );
};
