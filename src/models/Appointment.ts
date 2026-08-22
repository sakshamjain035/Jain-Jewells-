import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  purpose: string;
  message?: string;
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    purpose: { type: String, required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);
