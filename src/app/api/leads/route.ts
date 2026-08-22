import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const source = searchParams.get("source");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const query: Record<string, any> = {};

    if (status && status !== "All") {
      query.status = status;
    }
    if (priority && priority !== "All") {
      query.priority = priority;
    }
    if (source && source !== "All") {
      query.source = source;
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { email: searchRegex },
        { leadNumber: searchRegex },
        { interestedCategory: searchRegex },
        { productName: searchRegex },
      ];
    }

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Lead.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      leads,
      total,
    });
  } catch (error: any) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const leadNumber =
      body.leadNumber || `LEAD-${new Date().getFullYear().toString().slice(-2)}${Math.floor(1000 + Math.random() * 9000)}`;

    const newLead = await Lead.create({
      ...body,
      leadNumber,
      status: body.status || "New",
      priority: body.priority || "High",
      notes: body.notes || (body.initialNote ? [{ note: body.initialNote, author: "Admin", addedAt: new Date() }] : []),
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
