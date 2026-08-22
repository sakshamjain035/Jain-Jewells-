"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Tag,
  FileText,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface LeadsSectionProps {
  leads: any[];
  isLoading: boolean;
  onRefresh: () => void;
  onOpenCreateLeadModal: () => void;
}

export const LeadsSection: React.FC<LeadsSectionProps> = ({
  leads,
  isLoading,
  onRefresh,
  onOpenCreateLeadModal,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLeadNotesModal, setActiveLeadNotesModal] = useState<any | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const statuses = ["All", "New", "Contacted", "In Negotiation", "Converted", "Closed"];
  const priorities = ["All", "Urgent", "High", "Medium", "Low"];

  // Filter leads locally
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || lead.priority === priorityFilter;
    const matchesSearch =
      searchQuery === "" ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.interestedCategory &&
        lead.interestedCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.productName && lead.productName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      onRefresh();
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLeadNotesModal || !newNoteText.trim()) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`/api/leads/${activeLeadNotesModal._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newNote: newNoteText.trim(),
          noteAuthor: "Store Concierge",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActiveLeadNotesModal(data.lead);
        setNewNoteText("");
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Controls */}
      <div className="emerald-glass p-4 sm:p-5 rounded-2xl border border-[#d4af37]/30 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-none pb-2 lg:pb-0">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === s
                  ? "gold-bg-gradient text-[#06110c] font-bold shadow-md"
                  : "bg-[#06110c]/80 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              {s === "New" && <span className="w-2 h-2 rounded-full bg-[#d4af37] inline-block mr-1.5 animate-pulse" />}
              {s}
            </button>
          ))}
        </div>

        {/* Priority Filter + Search + Add Lead Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full sm:w-36 bg-[#06110c]/90 border border-white/15 focus:border-[#d4af37] text-xs text-white rounded-xl px-3 py-2.5 outline-none cursor-pointer"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                Priority: {p}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#06110c]/90 border border-white/15 focus:border-[#d4af37] text-xs text-white placeholder-white/40 rounded-xl pl-9 pr-4 py-2.5 outline-none transition-colors"
            />
          </div>

          <button
            onClick={onOpenCreateLeadModal}
            className="w-full sm:w-auto gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shrink-0 hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* Leads Cards Grid */}
      {isLoading ? (
        <div className="text-center py-20 emerald-glass rounded-2xl border border-white/10">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-white/70">Loading customer leads from MongoDB...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-16 emerald-glass rounded-2xl border border-white/10 max-w-lg mx-auto">
          <Users className="w-12 h-12 text-[#d4af37]/60 mx-auto mb-3" />
          <h3 className="text-lg font-serif-luxury font-bold text-white mb-1">No Leads Found</h3>
          <p className="text-xs text-white/60 mb-4">
            No active inquiries or appointments match your filter &quot;{statusFilter}&quot;.
          </p>
          <button
            onClick={() => {
              setStatusFilter("All");
              setPriorityFilter("All");
              setSearchQuery("");
            }}
            className="gold-bg-gradient text-[#06110c] text-xs font-bold px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLeads.map((lead) => {
            const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
            const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
            const waGreeting = encodeURIComponent(
              `Hello ${lead.name},\nThank you for connecting with Jain Jewells. Regarding your inquiry on "${
                lead.productName || lead.interestedCategory || "our High Jewellery Collection"
              }", our showroom master concierge is at your service. How may we assist your selection today?`
            );

            return (
              <div
                key={lead._id}
                className="emerald-glass rounded-2xl border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all p-5 flex flex-col justify-between shadow-xl bg-gradient-to-br from-[#061811] to-[#04140d] group"
              >
                <div>
                  {/* Card Header: Lead ID, Priority, Source */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <span className="text-[10px] font-mono text-white/60">{lead.leadNumber}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          lead.priority === "Urgent"
                            ? "bg-rose-950 text-rose-300 border border-rose-500/40"
                            : lead.priority === "High"
                            ? "bg-amber-950 text-amber-300 border border-amber-500/40"
                            : "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {lead.priority}
                      </span>
                      <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded">
                        {lead.source}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <h4 className="text-base font-serif-luxury font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {lead.name}
                  </h4>

                  <div className="text-xs text-white/70 space-y-1.5 mt-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                      <a href={`tel:${lead.phone}`} className="hover:text-white">
                        {lead.phone}
                      </a>
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Interest Details */}
                  <div className="bg-[#03110b] p-3 rounded-xl border border-white/10 my-3 text-xs space-y-1">
                    <div className="text-[10px] font-semibold text-[#d4af37] uppercase">
                      Interest &amp; Budget:
                    </div>
                    <div className="text-white font-medium">
                      {lead.productName || lead.interestedCategory || "General Collection Inquiry"}
                    </div>
                    {lead.estimatedBudget && (
                      <div className="text-[11px] text-emerald-300">
                        Budget: {lead.estimatedBudget}
                      </div>
                    )}
                  </div>

                  {/* Notes summary */}
                  {lead.notes && lead.notes.length > 0 && (
                    <div className="text-[11px] text-white/60 italic line-clamp-2 mb-3 bg-black/20 p-2 rounded-lg">
                      &quot;{lead.notes[lead.notes.length - 1].note}&quot;
                    </div>
                  )}
                </div>

                {/* Card Footer: Status Selector & Direct Action Buttons */}
                <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-white/50 uppercase font-semibold">Status:</span>
                    <select
                      value={lead.status}
                      disabled={isUpdating}
                      onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                      className={`text-xs font-bold rounded-lg px-2 py-1 outline-none cursor-pointer ${
                        lead.status === "New"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : lead.status === "Converted"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : lead.status === "In Negotiation"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                          : "bg-white/10 text-white/80 border border-white/15"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Negotiation">In Negotiation</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <a
                      href={`https://wa.me/${formattedPhone}?text=${waGreeting}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </a>

                    <button
                      onClick={() => setActiveLeadNotesModal(lead)}
                      className="bg-[#0a261a] hover:bg-[#0e3625] border border-[#d4af37]/40 text-[#fcf6ba] text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" /> Notes ({lead.notes?.length || 0})
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lead Notes Drawer / Modal */}
      {activeLeadNotesModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="emerald-glass max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-[#d4af37] relative shadow-2xl my-8 text-white">
            <button
              onClick={() => setActiveLeadNotesModal(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
            >
              ✕
            </button>

            <div className="border-b border-white/10 pb-4 mb-4">
              <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest block">
                Concierge Activity Log
              </span>
              <h3 className="text-xl font-serif-luxury font-bold text-white">
                Lead Notes: {activeLeadNotesModal.name}
              </h3>
              <p className="text-xs text-white/60">{activeLeadNotesModal.phone}</p>
            </div>

            {/* Existing Notes Timeline */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-5">
              {activeLeadNotesModal.notes && activeLeadNotesModal.notes.length > 0 ? (
                activeLeadNotesModal.notes.map((note: any, index: number) => (
                  <div key={index} className="bg-[#04140d] p-3 rounded-xl border border-white/10 text-xs">
                    <p className="text-white/90">{note.note}</p>
                    <div className="flex items-center justify-between text-[10px] text-white/40 mt-2">
                      <span>By: {note.author}</span>
                      <span>{new Date(note.addedAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-white/40">No notes recorded yet.</div>
              )}
            </div>

            {/* Add New Note Form */}
            <form onSubmit={handleAddNote} className="flex flex-col gap-3">
              <textarea
                required
                rows={3}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Log customer preference, quotation given, follow-up promise..."
                className="w-full bg-[#061811] border border-white/15 focus:border-[#d4af37] text-white text-xs rounded-xl p-3 outline-none resize-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveLeadNotesModal(null)}
                  className="px-4 py-2 rounded-xl text-xs border border-white/10 text-white/70"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="gold-bg-gradient text-[#06110c] font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-xl shadow"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
