import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const query: Record<string, any> = {};

    if (status && status !== "All") {
      query.orderStatus = status;
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { orderNumber: searchRegex },
        { customerName: searchRegex },
        { customerPhone: searchRegex },
        { customerEmail: searchRegex },
        { "shippingAddress.city": searchRegex },
        { "items.name": searchRegex },
      ];
    }

    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      orders,
      total,
    });
  } catch (error: any) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const orderNumber =
      body.orderNumber || `JJ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = await Order.create({
      ...body,
      orderNumber,
      orderStatus: body.orderStatus || "Received",
      paymentStatus: body.paymentStatus || "Pending",
      dispatchDetails: body.dispatchDetails || { isDispatched: false },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
