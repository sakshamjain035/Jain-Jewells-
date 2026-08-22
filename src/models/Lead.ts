import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILeadNote {
  note: string;
  author: string;
  addedAt: Date;
}

export interface ILead extends Document {
  leadNumber: string;
  name: string;
  email?: string;
  phone: string;
  source: "VIP Appointment" | "Product Inquiry" | "Bespoke Customizer" | "WhatsApp Concierge" | "Direct Walk-in" | "Website Consultation";
  status: "New" | "Contacted" | "In Negotiation" | "Converted" | "Closed";
  priority: "Urgent" | "High" | "Medium" | "Low";
  interestedCategory?: string;
  productName?: string;
  estimatedBudget?: number | string;
  city?: string;
  notes: ILeadNote[];
  followUpDate?: Date;
  convertedOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadNoteSchema = new Schema<ILeadNote>(
  {
    note: { type: String, required: true },
    author: { type: String, default: "Sales Concierge" },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const LeadSchema = new Schema<ILead>(
  {
    leadNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    source: {
      type: String,
      enum: [
        "VIP Appointment",
        "Product Inquiry",
        "Bespoke Customizer",
        "WhatsApp Concierge",
        "Direct Walk-in",
        "Website Consultation",
      ],
      default: "Website Consultation",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Negotiation", "Converted", "Closed"],
      default: "New",
      index: true,
    },
    priority: {
      type: String,
      enum: ["Urgent", "High", "Medium", "Low"],
      default: "High",
    },
    interestedCategory: { type: String },
    productName: { type: String },
    estimatedBudget: { type: Schema.Types.Mixed },
    city: { type: String },
    notes: { type: [LeadNoteSchema], default: [] },
    followUpDate: { type: Date },
    convertedOrderId: { type: String },
  },
  { timestamps: true }
);

const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
