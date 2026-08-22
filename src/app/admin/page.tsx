"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Package,
  Users,
  Truck,
  Plus,
  RefreshCw,
  Sparkles,
  ArrowLeft,
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Clock,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { AdminStatsCards } from "@/components/admin/AdminStatsCards";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { LeadsSection } from "@/components/admin/LeadsSection";
import { DispatchModal } from "@/components/admin/DispatchModal";
import { CustomerNotificationModal } from "@/components/admin/CustomerNotificationModal";
import { CreateOrderModal } from "@/components/admin/CreateOrderModal";
import { CreateLeadModal } from "@/components/admin/CreateLeadModal";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "leads" | "dispatched">("orders");
  const [stats, setStats] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(true);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(true);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>("");

  // Modals state
  const [dispatchOrderTarget, setDispatchOrderTarget] = useState<any | null>(null);
  const [notificationModalData, setNotificationModalData] = useState<{
    order: any;
    notifications: any;
  } | null>(null);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState<boolean>(false);
  const [isCreateLeadOpen, setIsCreateLeadOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, []);

  // Fetch Orders
  const fetchOrders = useCallback(async () => {
    setIsLoadingOrders(true);
    try {
      const params = new URLSearchParams();
      if (activeTab === "dispatched") {
        params.set("status", "Dispatched");
      } else if (orderStatusFilter !== "All") {
        params.set("status", orderStatusFilter);
      }
      if (orderSearchQuery) {
        params.set("search", orderSearchQuery);
      }

      const res = await fetch(`/api/orders?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoadingOrders(false);
    }
  }, [activeTab, orderStatusFilter, orderSearchQuery]);

  // Fetch Leads
  const fetchLeads = useCallback(async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setIsLoadingLeads(false);
    }
  }, []);

  // Initial Load & Auto-Seed check
  useEffect(() => {
    const init = async () => {
      // Check if seeding is needed
      try {
        await fetch("/api/seed", { method: "POST" });
      } catch (e) {
        // ignore
      }
      fetchStats();
      fetchOrders();
      fetchLeads();
    };
    init();
  }, [fetchStats, fetchOrders, fetchLeads]);

  const handleRefreshAll = () => {
    fetchStats();
    fetchOrders();
    fetchLeads();
    showToast("✨ Data synchronized with MongoDB Atlas.");
  };

  const handleDispatchSuccess = (dispatchedOrder: any, notificationPayload: any) => {
    setDispatchOrderTarget(null);
    fetchStats();
    fetchOrders();
    setNotificationModalData({
      order: dispatchedOrder,
      notifications: notificationPayload,
    });
    showToast(`🚚 Order #${dispatchedOrder.orderNumber} successfully marked as Dispatched!`);
  };

  return (
    <div className="min-h-screen bg-[#040d09] text-[#f4ede2] selection:bg-[#d4af37] selection:text-[#06110c] relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-950 border border-emerald-400 text-emerald-200 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce-subtle">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Admin Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#06110c]/90 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-2xl py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="sm" />
            </Link>

            <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37]">
                  Admin &amp; Operations Portal
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  <Database className="w-3 h-3 text-emerald-400 animate-pulse" />
                  MongoDB Live
                </span>
              </div>
              <h1 className="text-lg font-serif-luxury font-bold text-white leading-tight">
                Jain Jewells Atelier Management
              </h1>
            </div>
          </div>

          {/* Top Bar Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleRefreshAll}
              className="p-2.5 rounded-xl bg-[#061811] hover:bg-[#0e3324] border border-white/15 text-white/80 hover:text-white transition-all text-xs flex items-center gap-1.5"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline">Sync DB</span>
            </button>

            <button
              onClick={() => setIsCreateLeadOpen(true)}
              className="p-2.5 px-3 rounded-xl bg-[#061811] hover:bg-[#0e3324] border border-[#d4af37]/40 text-[#fcf6ba] text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Users className="w-4 h-4 text-[#d4af37]" />
              <span>+ New Lead</span>
            </button>

            <button
              onClick={() => setIsCreateOrderOpen(true)}
              className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Order</span>
            </button>

            <Link
              href="/"
              className="p-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* KPI Summary Cards */}
        <AdminStatsCards
          stats={stats}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setOrderStatusFilter={setOrderStatusFilter}
        />

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 text-sm font-serif-luxury font-bold uppercase tracking-wider py-2.5 px-5 rounded-2xl transition-all ${
              activeTab === "orders"
                ? "gold-bg-gradient text-[#06110c] shadow-lg shadow-[#d4af37]/20"
                : "bg-[#061811] text-white/70 hover:text-white border border-white/10"
            }`}
          >
            <Package className="w-4 h-4" />
            Orders Received &amp; Fulfilment
            {stats?.orders.pendingDispatch ? (
              <span className="bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full ml-1 animate-pulse">
                {stats.orders.pendingDispatch} Pending
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 text-sm font-serif-luxury font-bold uppercase tracking-wider py-2.5 px-5 rounded-2xl transition-all ${
              activeTab === "leads"
                ? "gold-bg-gradient text-[#06110c] shadow-lg shadow-[#d4af37]/20"
                : "bg-[#061811] text-white/70 hover:text-white border border-white/10"
            }`}
          >
            <Users className="w-4 h-4" />
            Customer Leads &amp; Inquiries
            {stats?.leads.new ? (
              <span className="bg-[#d4af37] text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full ml-1">
                {stats.leads.new} New
              </span>
            ) : null}
          </button>

          <button
            onClick={() => {
              setActiveTab("dispatched");
              setOrderStatusFilter("Dispatched");
            }}
            className={`flex items-center gap-2 text-sm font-serif-luxury font-bold uppercase tracking-wider py-2.5 px-5 rounded-2xl transition-all ${
              activeTab === "dispatched"
                ? "gold-bg-gradient text-[#06110c] shadow-lg shadow-[#d4af37]/20"
                : "bg-[#061811] text-white/70 hover:text-white border border-white/10"
            }`}
          >
            <Truck className="w-4 h-4" />
            Dispatched Consignments ({stats?.orders.dispatched ?? 0})
          </button>
        </div>

        {/* Tab 1 & Tab 3: Orders Received Table / Dispatched View */}
        {(activeTab === "orders" || activeTab === "dispatched") && (
          <OrdersTable
            orders={orders}
            isLoading={isLoadingOrders}
            statusFilter={activeTab === "dispatched" ? "Dispatched" : orderStatusFilter}
            setStatusFilter={setOrderStatusFilter}
            searchQuery={orderSearchQuery}
            setSearchQuery={setOrderSearchQuery}
            onOpenDispatchModal={(order) => setDispatchOrderTarget(order)}
            onOpenNotificationModal={(order) =>
              setNotificationModalData({ order, notifications: null })
            }
            onRefresh={fetchOrders}
          />
        )}

        {/* Tab 2: Leads Pipeline Section */}
        {activeTab === "leads" && (
          <LeadsSection
            leads={leads}
            isLoading={isLoadingLeads}
            onRefresh={fetchLeads}
            onOpenCreateLeadModal={() => setIsCreateLeadOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      {dispatchOrderTarget && (
        <DispatchModal
          order={dispatchOrderTarget}
          isOpen={Boolean(dispatchOrderTarget)}
          onClose={() => setDispatchOrderTarget(null)}
          onDispatchSuccess={handleDispatchSuccess}
        />
      )}

      {notificationModalData && (
        <CustomerNotificationModal
          isOpen={Boolean(notificationModalData)}
          order={notificationModalData.order}
          notifications={notificationModalData.notifications}
          onClose={() => setNotificationModalData(null)}
        />
      )}

      {isCreateOrderOpen && (
        <CreateOrderModal
          isOpen={isCreateOrderOpen}
          onClose={() => setIsCreateOrderOpen(false)}
          onOrderCreated={() => {
            fetchStats();
            fetchOrders();
            showToast("✨ New order placed in Received state!");
          }}
        />
      )}

      {isCreateLeadOpen && (
        <CreateLeadModal
          isOpen={isCreateLeadOpen}
          onClose={() => setIsCreateLeadOpen(false)}
          onLeadCreated={() => {
            fetchStats();
            fetchLeads();
            showToast("✨ New customer lead saved to MongoDB!");
          }}
        />
      )}
    </div>
  );
}
