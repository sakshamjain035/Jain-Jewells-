import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await connectToDatabase();
    const appointments = await Appointment.find().sort({ createdAt: -1 }).limit(100).lean();
    return NextResponse.json({ success: true, appointments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { fullName, name, email, phone, visitDate, date, timeSlot, time, categoryInterest, purpose, message, vipLounge } = body;

    const patronName = fullName || name || "Valued Patron";
    const patronPhone = phone;
    const patronEmail = email || "";
    const apptDate = visitDate || date || new Date().toISOString().split("T")[0];
    const apptTime = timeSlot || time || "12:00 PM - 02:00 PM";
    const apptPurpose = categoryInterest || purpose || "VIP Showroom Consultation";

    // 1. Create Appointment record
    const appointment = await Appointment.create({
      name: patronName,
      email: patronEmail,
      phone: patronPhone,
      date: apptDate,
      time: apptTime,
      purpose: `${apptPurpose}${vipLounge ? " (VIP Lounge Reserved)" : ""}`,
      message: message || "Requested showroom viewing appointment",
    });

    // 2. Auto-generate high-priority Lead
    const leadNumber = `LEAD-APPT-${Math.floor(1000 + Math.random() * 9000)}`;
    const lead = await Lead.create({
      leadNumber,
      name: patronName,
      email: patronEmail,
      phone: patronPhone,
      source: "VIP Appointment",
      status: "New",
      priority: "Urgent",
      interestedCategory: apptPurpose,
      productName: vipLounge ? "VIP Suite Booking" : "Showroom Trial",
      notes: [
        {
          note: `Booked VIP appointment for ${apptDate} at ${apptTime}. Collection interest: ${apptPurpose}.`,
          author: "System Auto-Sync",
          addedAt: new Date(),
        },
      ],
    });

    return NextResponse.json(
      {
        success: true,
        message: "VIP Appointment logged & Lead created successfully!",
        appointment,
        lead,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/appointments error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
