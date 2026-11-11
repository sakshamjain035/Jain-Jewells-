"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Package,
  Users,
  Truck,
  Plus,
  RefreshCw,
  ArrowLeft,
  Database,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { AdminStatsCards } from "@/components/admin/AdminStatsCards";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { LeadsSection } from "@/components/admin/LeadsSection";
import { DispatchModal } from "@/components/admin/DispatchModal";
import { CustomerNotificationModal } from "@/components/admin/CustomerNotificationModal";
import { CreateOrderModal } from "@/components/admin/CreateOrderModal";
import { CreateLeadModal } from "@/components/admin/CreateLeadModal";

const ADMIN_PASSWORD = "12345";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Check if already authenticated in this session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("jain_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("jain_admin_auth", "true");
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
      setPasswordInput("");
    }
  };

  // If not authenticated, show password gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e0908] text-[#f6efe4] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          {/* Login Card */}
          <div className="bg-[#150d0c] border border-[#f6efe4]/10 p-8 sm:p-10 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-9">
              <Link href="/">
                <Logo size="md" />
              </Link>
            </div>

            {/* Lock Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-11 h-11 border border-[#c8a05c]/45 text-[#c8a05c] flex items-center justify-center">
                <Lock className="w-4 h-4" strokeWidth={1.3} />
              </div>
            </div>

            {/* Title */}
            <span className="block text-center text-[9px] uppercase tracking-[0.28em] text-[#c8a05c] mb-2">
              Private Access
            </span>
            <h1 className="text-center text-[1.8rem] font-serif-luxury font-light text-[#f6efe4] mb-2">
              Atelier Portal
            </h1>
            <p className="text-center text-[10.5px] text-[#a99987] font-light leading-relaxed mb-8">
              Enter the management password to access orders, clients and dispatch.
            </p>

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-[8px] uppercase tracking-[0.2em] text-[#857768] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter admin password"
                    autoFocus
                    className="w-full bg-[#1b1110] border border-[#f6efe4]/12 rounded-none px-4 py-3.5 text-[#f6efe4] text-xs placeholder:text-[#857768] focus:outline-none focus:border-[#c8a05c] transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#857768] hover:text-[#a99987] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-[#cf8f7e] text-[10px] mt-2">
                    {passwordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="lux-btn lux-btn-gold w-full"
              >
                Enter the Atelier
              </button>
            </form>

            {/* Back to Store */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-[9px] uppercase tracking-[0.18em] text-[#857768] hover:text-[#ecd8ae] transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.4} />
                Back to Storefront
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----- Authenticated: Full Admin Dashboard -----
  return <AdminDashboard />;
}

// ============================================================
// Admin Dashboard Component (rendered only after auth)
// ============================================================
function AdminDashboard() {
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
    <div className="min-h-screen bg-[#0e0908] text-[#f6efe4] selection:bg-[#c8a05c] selection:text-[#0e0908] relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1e1413] border border-[#c8a05c]/50 text-[#ecd8ae] px-5 py-3.5 shadow-2xl flex items-center gap-2.5 text-[10px] tracking-[0.04em]">
          <CheckCircle2 className="w-4 h-4 text-[#c8a05c] shrink-0" strokeWidth={1.4} />
          {toastMessage}
        </div>
      )}

      {/* Admin Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0e0908]/95 backdrop-blur-xl border-b border-[#c8a05c]/18 shadow-2xl py-4 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="sm" />
            </Link>

            <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] uppercase tracking-[0.26em] text-[#c8a05c]">
                  Operations Portal
                </span>
                <span className="inline-flex items-center gap-1.5 text-[8px] bg-[#101a13] text-[#9ab79f] border border-[#9ab79f]/25 px-2 py-0.5 uppercase tracking-[0.14em]">
                  <Database className="w-2.5 h-2.5" strokeWidth={1.5} />
                  Live
                </span>
              </div>
              <h1 className="text-base font-serif-luxury font-normal text-[#f6efe4] leading-tight tracking-[0.02em]">
                Jain Jewells Atelier
              </h1>
            </div>
          </div>

          {/* Top Bar Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleRefreshAll}
              className="p-2.5 bg-transparent hover:bg-[#c8a05c]/10 border border-[#f6efe4]/12 text-[#e0d4c2] hover:text-[#f6efe4] transition-all text-[9px] uppercase tracking-[0.14em] flex items-center gap-1.5"
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            <button
              onClick={() => setIsCreateLeadOpen(true)}
              className="p-2.5 px-3.5 bg-transparent hover:bg-[#c8a05c]/10 border border-[#c8a05c]/35 text-[#ecd8ae] text-[9px] uppercase tracking-[0.14em] flex items-center gap-1.5 transition-all"
            >
              <Users className="w-3.5 h-3.5 text-[#c8a05c]" strokeWidth={1.4} />
              <span>New Lead</span>
            </button>

            <button
              onClick={() => setIsCreateOrderOpen(true)}
              className="lux-btn lux-btn-gold !py-2.5 !px-4 !text-[9px]"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.6} />
              <span>New Order</span>
            </button>

            <Link
              href="/"
              className="p-2.5 px-3 text-[9px] uppercase tracking-[0.14em] text-[#a99987] hover:text-[#f6efe4] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.4} />
              <span className="hidden sm:inline">Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
        {/* KPI Summary Cards */}
        <AdminStatsCards
          stats={stats}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setOrderStatusFilter={setOrderStatusFilter}
        />

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-8 sm:gap-10 border-b border-[#f6efe4]/10 mb-9 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("orders")}
            className={`relative flex items-center gap-2 whitespace-nowrap text-[9px] uppercase tracking-[0.18em] pb-4 transition-colors ${
              activeTab === "orders"
                ? "text-[#ecd8ae] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#c8a05c]"
                : "text-[#a99987] hover:text-[#f6efe4]"
            }`}
          >
            <Package className="w-3.5 h-3.5" strokeWidth={1.4} />
            Orders &amp; Fulfilment
            {stats?.orders.pendingDispatch ? (
              <span className="text-[#c8a05c] text-[9px] tracking-[0.08em]">
                {stats.orders.pendingDispatch} pending
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`relative flex items-center gap-2 whitespace-nowrap text-[9px] uppercase tracking-[0.18em] pb-4 transition-colors ${
              activeTab === "leads"
                ? "text-[#ecd8ae] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#c8a05c]"
                : "text-[#a99987] hover:text-[#f6efe4]"
            }`}
          >
            <Users className="w-3.5 h-3.5" strokeWidth={1.4} />
            Client Leads
            {stats?.leads.new ? (
              <span className="text-[#c8a05c] text-[9px] tracking-[0.08em]">
                {stats.leads.new} new
              </span>
            ) : null}
          </button>

          <button
            onClick={() => {
              setActiveTab("dispatched");
              setOrderStatusFilter("Dispatched");
            }}
            className={`relative flex items-center gap-2 whitespace-nowrap text-[9px] uppercase tracking-[0.18em] pb-4 transition-colors ${
              activeTab === "dispatched"
                ? "text-[#ecd8ae] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#c8a05c]"
                : "text-[#a99987] hover:text-[#f6efe4]"
            }`}
          >
            <Truck className="w-3.5 h-3.5" strokeWidth={1.4} />
            Dispatched
            <span className="text-[#c8a05c] text-[9px] tracking-[0.08em]">
              {stats?.orders.dispatched ?? 0}
            </span>
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
