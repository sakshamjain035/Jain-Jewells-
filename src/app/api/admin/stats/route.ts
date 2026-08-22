import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import Lead from "@/models/Lead";
import Appointment from "@/models/Appointment";

export async function GET() {
  try {
    await connectToDatabase();

    const [
      totalOrders,
      receivedOrders,
      processingOrders,
      dispatchedOrders,
      deliveredOrders,
      revenueResult,
      totalLeads,
      newLeads,
      convertedLeads,
      totalAppointments,
      recentOrders,
      recentLeads,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: "Received" }),
      Order.countDocuments({ orderStatus: "Processing" }),
      Order.countDocuments({ orderStatus: "Dispatched" }),
      Order.countDocuments({ orderStatus: "Delivered" }),
      Order.aggregate([
        { $match: { orderStatus: { $ne: "Cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Lead.countDocuments(),
      Lead.countDocuments({ status: "New" }),
      Lead.countDocuments({ status: "Converted" }),
      Appointment.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    return NextResponse.json({
      success: true,
      stats: {
        orders: {
          total: totalOrders,
          received: receivedOrders,
          processing: processingOrders,
          dispatched: dispatchedOrders,
          delivered: deliveredOrders,
          pendingDispatch: receivedOrders + processingOrders,
        },
        revenue: {
          total: totalRevenue,
          formatted: `₹${totalRevenue.toLocaleString("en-IN")}`,
        },
        leads: {
          total: totalLeads,
          new: newLeads,
          converted: convertedLeads,
          conversionRate: totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0,
        },
        appointments: {
          total: totalAppointments,
        },
        recentOrders,
        recentLeads,
      },
    });
  } catch (error: any) {
    console.error("GET /api/admin/stats error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
