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
      <div className="border-y border-[#f6efe4]/10 py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Status Filters */}
        <div className="flex items-center gap-6 sm:gap-7 overflow-x-auto w-full lg:w-auto scrollbar-none">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`relative whitespace-nowrap text-[9px] uppercase tracking-[0.16em] pb-2 transition-colors flex items-center gap-1.5 ${
                statusFilter === s
                  ? "text-[#ecd8ae] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[#c8a05c]"
                  : "text-[#a99987] hover:text-[#f6efe4]"
              }`}
            >
              {s === "New" && <span className="w-1.5 h-1.5 rounded-full bg-[#d3ab72]" />}
              {s}
            </button>
          ))}
        </div>

        {/* Priority Filter + Search + Add Lead Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full sm:w-36 bg-transparent border-b border-[#f6efe4]/20 focus:border-[#c8a05c] text-[9px] uppercase tracking-[0.12em] text-[#e0d4c2] rounded-none px-0 py-2.5 outline-none cursor-pointer"
          >
            {priorities.map((p) => (
              <option key={p} value={p} className="bg-[#1b1110]">
                Priority: {p}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-[#857768] absolute left-0 top-1/2 -translate-y-1/2" strokeWidth={1.4} />
            <input
              type="text"
              placeholder="Search leads"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-[#f6efe4]/20 focus:border-[#c8a05c] text-[10px] text-[#f6efe4] placeholder-[#857768] rounded-none pl-6 pr-3 py-2.5 outline-none transition-colors"
            />
          </div>

          <button
            onClick={onOpenCreateLeadModal}
            className="lux-btn lux-btn-gold !py-2.5 !px-4 !text-[9px] shrink-0 w-full sm:w-auto"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} /> Add Lead
          </button>
        </div>
      </div>

      {/* Leads Cards Grid */}
      {isLoading ? (
        <div className="text-center py-20 border border-[#f6efe4]/10">
          <div className="w-6 h-6 border border-[#c8a05c]/25 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#a99987]">Retrieving client leads…</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-16 border border-[#f6efe4]/10 max-w-lg mx-auto">
          <Users className="w-8 h-8 text-[#c8a05c]/60 mx-auto mb-4" strokeWidth={1} />
          <h3 className="text-xl font-serif-luxury font-light text-[#f6efe4] mb-2">No leads found</h3>
          <p className="text-[10px] text-[#a99987] mb-6 leading-relaxed">
            No active inquiries or appointments match &quot;{statusFilter}&quot;.
          </p>
          <button
            onClick={() => {
              setStatusFilter("All");
              setPriorityFilter("All");
              setSearchQuery("");
            }}
            className="lux-btn lux-btn-outline !py-3 !px-5 !text-[9px]"
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
                className="bg-[#150d0c] border border-[#f6efe4]/10 hover:border-[#c8a05c]/40 transition-colors p-5 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Lead ID, Priority, Source */}
                  <div className="flex items-center justify-between border-b border-[#f6efe4]/10 pb-3 mb-3">
                    <span className="text-[9px] font-mono text-[#857768] tracking-[0.06em]">{lead.leadNumber}</span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[8px] uppercase tracking-[0.14em] ${
                          lead.priority === "Urgent"
                            ? "text-[#cf8f7e]"
                            : lead.priority === "High"
                            ? "text-[#d3ab72]"
                            : "text-[#9ab79f]"
                        }`}
                      >
                        {lead.priority}
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.12em] text-[#857768]">
                        {lead.source}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <h4 className="text-base font-serif-luxury font-light text-[#f6efe4] group-hover:text-[#c8a05c] transition-colors">
                    {lead.name}
                  </h4>

                  <div className="text-xs text-[#a99987] space-y-1.5 mt-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#c8a05c]" />
                      <a href={`tel:${lead.phone}`} className="hover:text-[#f6efe4]">
                        {lead.phone}
                      </a>
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#c8a05c]" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Interest Details */}
                  <div className="border-y border-[#f6efe4]/8 my-4 py-3 text-[10px] space-y-1">
                    <div className="text-[8px] uppercase tracking-[0.18em] text-[#857768]">
                      Interest &amp; Budget
                    </div>
                    <div className="text-[#f6efe4]">
                      {lead.productName || lead.interestedCategory || "General Collection Inquiry"}
                    </div>
                    {lead.estimatedBudget && (
                      <div className="text-[10px] text-[#c8a05c]">
                        {lead.estimatedBudget}
                      </div>
                    )}
                  </div>

                  {/* Notes summary */}
                  {lead.notes && lead.notes.length > 0 && (
                    <div className="text-[11px] text-[#a99987] italic line-clamp-2 mb-3 bg-black/20 p-2 rounded-none">
                      &quot;{lead.notes[lead.notes.length - 1].note}&quot;
                    </div>
                  )}
                </div>

                {/* Card Footer: Status Selector & Direct Action Buttons */}
                <div className="border-t border-[#f6efe4]/10 pt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[8px] text-[#857768] uppercase tracking-[0.16em]">Status</span>
                    <select
                      value={lead.status}
                      disabled={isUpdating}
                      onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                      className={`text-[9px] uppercase tracking-[0.1em] rounded-none px-0 py-1 outline-none cursor-pointer bg-transparent border-b ${
                        lead.status === "New"
                          ? "text-[#d3ab72] border-[#d3ab72]/40"
                          : lead.status === "Converted"
                          ? "text-[#9ab79f] border-[#9ab79f]/40"
                          : lead.status === "In Negotiation"
                          ? "text-[#c8a05c] border-[#c8a05c]/40"
                          : "text-[#a99987] border-[#f6efe4]/15"
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
                      className="border border-[#9ab79f]/30 hover:border-[#9ab79f] text-[#9ab79f] text-[9px] uppercase tracking-[0.12em] py-2.5 px-2 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" strokeWidth={1.4} /> WhatsApp
                    </a>

                    <button
                      onClick={() => setActiveLeadNotesModal(lead)}
                      className="border border-[#c8a05c]/30 hover:border-[#c8a05c] text-[#ecd8ae] text-[9px] uppercase tracking-[0.12em] py-2.5 px-2 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3 h-3" strokeWidth={1.4} /> Notes ({lead.notes?.length || 0})
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
        <div className="fixed inset-0 z-50 bg-[#080504]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#170d0c] max-w-xl w-full p-6 sm:p-9 border border-[#c8a05c]/25 relative shadow-2xl my-8 text-[#f6efe4]">
            <button
              onClick={() => setActiveLeadNotesModal(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#a99987] hover:text-[#f6efe4] border border-[#f6efe4]/10 hover:border-[#c8a05c]/50 transition-colors"
              aria-label="Close lead notes"
            >
              ✕
            </button>

            <div className="border-b border-[#f6efe4]/10 pb-4 mb-4">
              <span className="text-[10px] text-[#c8a05c] font-bold uppercase tracking-widest block">
                Concierge Activity Log
              </span>
              <h3 className="text-xl font-serif-luxury font-light text-[#f6efe4]">
                Lead Notes: {activeLeadNotesModal.name}
              </h3>
              <p className="text-xs text-[#a99987]">{activeLeadNotesModal.phone}</p>
            </div>

            {/* Existing Notes Timeline */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-5">
              {activeLeadNotesModal.notes && activeLeadNotesModal.notes.length > 0 ? (
                activeLeadNotesModal.notes.map((note: any, index: number) => (
                  <div key={index} className="bg-[#17100f] p-3 rounded-none border border-[#f6efe4]/10 text-xs">
                    <p className="text-[#f6efe4]/90">{note.note}</p>
                    <div className="flex items-center justify-between text-[10px] text-[#857768] mt-2">
                      <span>By: {note.author}</span>
                      <span>{new Date(note.addedAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[#857768]">No notes recorded yet.</div>
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
                className="w-full bg-[#1b1110] border border-[#f6efe4]/15 focus:border-[#c8a05c] text-[#f6efe4] text-xs rounded-none p-3 outline-none resize-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveLeadNotesModal(null)}
                  className="px-4 py-2 rounded-none text-xs border border-[#f6efe4]/10 text-[#a99987]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="lux-btn lux-btn-gold"
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
