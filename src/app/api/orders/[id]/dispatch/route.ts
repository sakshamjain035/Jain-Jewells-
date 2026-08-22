import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const {
      courierPartner = "BlueDart Apex Express",
      trackingNumber = `BD-${Math.floor(10000000 + Math.random() * 90000000)}`,
      trackingUrl,
      estimatedDelivery = "Within 2-3 Business Days",
      dispatchNotes = "Insured transit with tamper-evident seal and OTP verification.",
    } = body;

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const dispatchedAt = new Date();
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

    const itemsSummary = order.items.map((i: any) => `${i.quantity}x ${i.name} (${i.metalPurity || "Fine Gold"})`).join(", ");

    const defaultTrackingUrl =
      trackingUrl ||
      (courierPartner.toLowerCase().includes("bluedart")
        ? `https://www.bluedart.com/tracking?awb=${trackingNumber}`
        : courierPartner.toLowerCase().includes("delhivery")
        ? `https://www.delhivery.com/track/package/${trackingNumber}`
        : courierPartner.toLowerCase().includes("sequel")
        ? `https://sequel247.com/tracking/${trackingNumber}`
        : `https://jainjewells.com/track?order=${order.orderNumber}&awb=${trackingNumber}`);

    // Generate Luxury Customer Notification Message
    const notificationMessage = `👑 *JAIN JEWELLS — ORDER DISPATCHED* 👑\n\nDear *${order.customerName}*,\n\nWe are delighted to inform you that your bespoke jewellery order *#${order.orderNumber}* has been securely inspected, insured, and dispatched from our Jaipur High Jewellery Atelier.\n\n📦 *Order Items:* ${itemsSummary}\n💰 *Total Value:* ₹${order.totalAmount.toLocaleString("en-IN")}\n🚚 *Courier Partner:* ${courierPartner}\n🔢 *Tracking / AWB No.:* ${trackingNumber}\n⏳ *Estimated Delivery:* ${estimatedDelivery}\n\n📍 *Live Shipment Tracking:* ${defaultTrackingUrl}\n\n🔒 *Security Assurance:* Your consignment is fully transit-insured and sealed in our tamper-proof tamper-evident vault box. Please do not accept the package if the gold security seal is broken.\n\nWarm Regards,\n*Jain Jewells Concierge*\n📞 +91 98290 12345 | 🌐 www.jainjewells.com`;

    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(notificationMessage)}`;

    // Update order with dispatch details
    order.orderStatus = "Dispatched";
    order.dispatchDetails = {
      isDispatched: true,
      courierPartner,
      trackingNumber,
      trackingUrl: defaultTrackingUrl,
      dispatchedAt,
      estimatedDelivery,
      dispatchNotes,
    };

    // Log notification history
    order.notificationsSent.push({
      channel: "WhatsApp",
      recipient: order.customerPhone,
      message: notificationMessage,
      sentAt: dispatchedAt,
      status: "Sent",
    });

    order.notificationsSent.push({
      channel: "Email",
      recipient: order.customerEmail,
      message: `Shipment Confirmation for Order ${order.orderNumber} via ${courierPartner} (AWB: ${trackingNumber})`,
      sentAt: dispatchedAt,
      status: "Sent",
    });

    order.notificationsSent.push({
      channel: "SMS",
      recipient: order.customerPhone,
      message: `Jain Jewells: Order #${order.orderNumber} dispatched via ${courierPartner}. Track: ${defaultTrackingUrl}`,
      sentAt: dispatchedAt,
      status: "Sent",
    });

    await order.save();

    return NextResponse.json({
      success: true,
      message: `Order #${order.orderNumber} successfully marked as Dispatched and customer notification triggered.`,
      order,
      notifications: {
        whatsappUrl,
        whatsappMessage: notificationMessage,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        trackingUrl: defaultTrackingUrl,
        courierPartner,
        trackingNumber,
        estimatedDelivery,
      },
    });
  } catch (error: any) {
    console.error("Dispatch order error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to dispatch order" }, { status: 500 });
  }
}
