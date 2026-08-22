import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  image: string;
  category?: string;
  metal: string;
  metalPurity: string;
  weightGrams: number;
  quantity: number;
  price: number;
}

export interface IDispatchDetails {
  isDispatched: boolean;
  courierPartner: string;
  trackingNumber: string;
  trackingUrl?: string;
  dispatchedAt?: Date;
  estimatedDelivery?: string;
  dispatchNotes?: string;
}

export interface INotificationLog {
  channel: "WhatsApp" | "Email" | "SMS";
  recipient: string;
  message: string;
  sentAt: Date;
  status: "Sent" | "Delivered" | "Failed";
}

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  items: IOrderItem[];
  totalAmount: number;
  paymentStatus: "Paid" | "Pending" | "COD" | "Advance Paid";
  paymentMethod: "UPI / NetBanking" | "Credit/Debit Card" | "Showroom Bank Transfer" | "Cash On Delivery";
  orderStatus: "Received" | "Processing" | "Dispatched" | "Delivered" | "Cancelled";
  dispatchDetails: IDispatchDetails;
  notificationsSent: INotificationLog[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String },
    metal: { type: String, required: true },
    metalPurity: { type: String, required: true },
    weightGrams: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const NotificationLogSchema = new Schema<INotificationLog>(
  {
    channel: { type: String, enum: ["WhatsApp", "Email", "SMS"], required: true },
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["Sent", "Delivered", "Failed"], default: "Sent" },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      landmark: { type: String },
    },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "COD", "Advance Paid"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["UPI / NetBanking", "Credit/Debit Card", "Showroom Bank Transfer", "Cash On Delivery"],
      default: "UPI / NetBanking",
    },
    orderStatus: {
      type: String,
      enum: ["Received", "Processing", "Dispatched", "Delivered", "Cancelled"],
      default: "Received",
      index: true,
    },
    dispatchDetails: {
      isDispatched: { type: Boolean, default: false },
      courierPartner: { type: String, default: "" },
      trackingNumber: { type: String, default: "" },
      trackingUrl: { type: String, default: "" },
      dispatchedAt: { type: Date },
      estimatedDelivery: { type: String, default: "" },
      dispatchNotes: { type: String, default: "" },
    },
    notificationsSent: { type: [NotificationLogSchema], default: [] },
    notes: { type: String },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
