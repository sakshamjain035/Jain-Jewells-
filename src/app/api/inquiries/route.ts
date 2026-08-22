import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(100).lean();
    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { productId, productName, name, email, phone, message } = body;

    const inquiry = await Inquiry.create({
      productId: productId || "custom",
      productName: productName || "Jewellery Masterpiece",
      name,
      email: email || "",
      phone,
      message: message || "Interested in product details & pricing",
    });

    const leadNumber = `LEAD-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const lead = await Lead.create({
      leadNumber,
      name,
      email: email || "",
      phone,
      source: "Product Inquiry",
      status: "New",
      priority: "High",
      productName: productName || "Jewellery Inquired",
      interestedCategory: "Showroom Collection",
      notes: [
        {
          note: `Inquiry on "${productName}". Customer note: ${message || "Interested in custom consultation"}`,
          author: "Inquiry Sync",
          addedAt: new Date(),
        },
      ],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry recorded and Lead created successfully!",
        inquiry,
        lead,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
