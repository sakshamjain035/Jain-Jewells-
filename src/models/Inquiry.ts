import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  productId: string;
  productName: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry ||
  mongoose.model<IInquiry>("Inquiry", InquirySchema);
