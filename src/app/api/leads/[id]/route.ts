import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const lead = await Lead.findById(id).lean();
    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    // If adding a note
    if (body.newNote) {
      const updated = await Lead.findByIdAndUpdate(
        id,
        {
          $push: {
            notes: {
              note: body.newNote,
              author: body.noteAuthor || "Admin Concierge",
              addedAt: new Date(),
            },
          },
          ...(body.status ? { status: body.status } : {}),
          ...(body.priority ? { priority: body.priority } : {}),
          ...(body.followUpDate ? { followUpDate: new Date(body.followUpDate) } : {}),
        },
        { new: true }
      );
      return NextResponse.json({ success: true, lead: updated });
    }

    const updatedLead = await Lead.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedLead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deleted = await Lead.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
