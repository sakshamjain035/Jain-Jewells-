"use client";

import React from "react";
import { Package, Truck, IndianRupee, Users, ArrowUpRight, Clock } from "lucide-react";

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
  setActiveTab,
  setOrderStatusFilter,
}) => {
  const pendingOrders = stats?.orders.pendingDispatch ?? 0;
  const dispatchedOrders = stats?.orders.dispatched ?? 0;
  const newLeads = stats?.leads.new ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#f6efe4]/10 border border-[#f6efe4]/10 mb-10">
      {/* 1. Orders Received */}
      <div
        onClick={() => {
          setActiveTab("orders");
          if (setOrderStatusFilter) setOrderStatusFilter("Received");
        }}
        className="group bg-[#150d0c] p-6 cursor-pointer hover:bg-[#1d1312] transition-colors duration-500 relative"
      >
        <div className="flex items-center justify-between mb-5">
          <span className="text-[8px] uppercase tracking-[0.22em] text-[#a99987] flex items-center gap-2">
            <Package className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} />
            Orders Received
          </span>
          {pendingOrders > 0 && (
            <span className="inline-flex items-center gap-1 text-[8px] tracking-[0.1em] uppercase text-[#d3ab72]">
              <Clock className="w-2.5 h-2.5" strokeWidth={1.5} /> {pendingOrders} to dispatch
            </span>
          )}
        </div>

        <div className="text-[2rem] font-serif-luxury font-light text-[#f6efe4] leading-none">
          {stats?.orders.received ?? 0}
          <span className="text-[10px] font-light text-[#857768] ml-2">
            of {stats?.orders.total ?? 0}
          </span>
        </div>

        <p className="text-[10px] text-[#a99987] font-light leading-relaxed mt-4">
          Verified orders awaiting packing &amp; insured dispatch.
        </p>

        <span className="inline-flex items-center gap-1 text-[8px] uppercase tracking-[0.18em] text-[#c8a05c] mt-5 group-hover:text-[#ecd8ae] transition-colors">
          Review <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={1.5} />
        </span>
      </div>

      {/* 2. Orders Dispatched */}
      <div
        onClick={() => {
          setActiveTab("dispatched");
          if (setOrderStatusFilter) setOrderStatusFilter("Dispatched");
        }}
        className="group bg-[#150d0c] p-6 cursor-pointer hover:bg-[#1d1312] transition-colors duration-500"
      >
        <div className="flex items-center justify-between mb-5">
          <span className="text-[8px] uppercase tracking-[0.22em] text-[#a99987] flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} />
            Dispatched
          </span>
          <span className="inline-flex items-center gap-1 text-[8px] uppercase tracking-[0.1em] text-[#9ab79f]">
            In transit
          </span>
        </div>

        <div className="text-[2rem] font-serif-luxury font-light text-[#f6efe4] leading-none">
          {dispatchedOrders}
          <span className="text-[10px] font-light text-[#857768] ml-2">
            {stats?.orders.delivered ?? 0} delivered
          </span>
        </div>

        <p className="text-[10px] text-[#a99987] font-light leading-relaxed mt-4">
          Consignments under monitoring with client notifications.
        </p>

        <span className="inline-flex items-center gap-1 text-[8px] uppercase tracking-[0.18em] text-[#c8a05c] mt-5 group-hover:text-[#ecd8ae] transition-colors">
          Track <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={1.5} />
        </span>
      </div>

      {/* 3. Revenue */}
      <div className="bg-[#150d0c] p-6">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[8px] uppercase tracking-[0.22em] text-[#a99987] flex items-center gap-2">
            <IndianRupee className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} />
            Gross Order Value
          </span>
          <span className="text-[8px] uppercase tracking-[0.1em] text-[#857768]">
            Certified
          </span>
        </div>

        <div className="text-[2rem] font-serif-luxury font-light text-[#ecd8ae] truncate leading-none">
          {stats?.revenue.formatted ?? "₹0"}
        </div>

        <p className="text-[10px] text-[#a99987] font-light leading-relaxed mt-4">
          Cumulative value of confirmed orders and bridal commissions.
        </p>
      </div>

      {/* 4. Leads */}
      <div
        onClick={() => setActiveTab("leads")}
        className="group bg-[#150d0c] p-6 cursor-pointer hover:bg-[#1d1312] transition-colors duration-500"
      >
        <div className="flex items-center justify-between mb-5">
          <span className="text-[8px] uppercase tracking-[0.22em] text-[#a99987] flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} />
            Client Leads
          </span>
          {newLeads > 0 && (
            <span className="text-[8px] uppercase tracking-[0.1em] text-[#c8a05c]">
              {newLeads} new
            </span>
          )}
        </div>

        <div className="text-[2rem] font-serif-luxury font-light text-[#f6efe4] leading-none">
          {stats?.leads.total ?? 0}
          <span className="text-[10px] font-light text-[#857768] ml-2">
            {stats?.leads.converted ?? 0} converted
          </span>
        </div>

        <p className="text-[10px] text-[#a99987] font-light leading-relaxed mt-4">
          Inquiries, private appointments and bespoke prospects.
        </p>

        <span className="inline-flex items-center gap-1 text-[8px] uppercase tracking-[0.18em] text-[#c8a05c] mt-5 group-hover:text-[#ecd8ae] transition-colors">
          Open pipeline <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  );
};
