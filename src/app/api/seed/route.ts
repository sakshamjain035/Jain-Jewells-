import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import Lead from "@/models/Lead";

export async function POST() {
  try {
    await connectToDatabase();

    const orderCount = await Order.countDocuments();
    const leadCount = await Lead.countDocuments();

    if (orderCount > 0 && leadCount > 0) {
      return NextResponse.json({
        success: true,
        message: "Database already contains orders and leads. Seeding skipped.",
        orderCount,
        leadCount,
      });
    }

    const sampleOrders = [
      {
        orderNumber: "JJ-2026-8801",
        customerName: "Rani Meenakshi Devi",
        customerEmail: "meenakshi.devi@royalmail.in",
        customerPhone: "+919829012345",
        shippingAddress: {
          street: "Palace Enclave, Civil Lines",
          city: "Jaipur",
          state: "Rajasthan",
          pincode: "302006",
          landmark: "Near Raj Mandir",
        },
        items: [
          {
            productId: "jj-101",
            name: "Rajwadi Heritage Polki & Emerald Bridal Choker",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
            category: "bridal",
            metal: "22K Yellow Gold",
            metalPurity: "22K (916 BIS)",
            weightGrams: 84.5,
            quantity: 1,
            price: 685000,
          },
          {
            productId: "jj-102",
            name: "Solitaire Crown Cut Diamond Engagement Ring",
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
            category: "diamond",
            metal: "18K White Gold",
            metalPurity: "18K (750 BIS)",
            weightGrams: 7.2,
            quantity: 1,
            price: 345000,
          },
        ],
        totalAmount: 1030000,
        paymentStatus: "Paid",
        paymentMethod: "UPI / NetBanking",
        orderStatus: "Received", // Ready for Admin to click Dispatch!
        dispatchDetails: {
          isDispatched: false,
        },
        notes: "VIP wedding order. Please package in velvet heirloom chest with 6-digit HUID certificates.",
        createdAt: new Date(Date.now() - 3600000 * 4),
      },
      {
        orderNumber: "JJ-2026-8802",
        customerName: "Siddharth Singhania",
        customerEmail: "siddharth.s@singhaniagroup.com",
        customerPhone: "+919810098765",
        shippingAddress: {
          street: "Penthouse 14, Worli Sea Face",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400018",
          landmark: "Opposite Coast Guard HQ",
        },
        items: [
          {
            productId: "jj-103",
            name: "Antique Nakshi Lakshmi Kasu Temple Necklace",
            image: "https://images.unsplash.com/photo-1611591475155-4286fa7c2e7f?auto=format&fit=crop&w=800&q=80",
            category: "antique",
            metal: "22K Antique Gold",
            metalPurity: "22K (916 BIS)",
            weightGrams: 112.0,
            quantity: 1,
            price: 890000,
          },
        ],
        totalAmount: 890000,
        paymentStatus: "Advance Paid",
        paymentMethod: "Showroom Bank Transfer",
        orderStatus: "Received", // Ready for Admin to click Dispatch!
        dispatchDetails: {
          isDispatched: false,
        },
        notes: "Customer requested high-priority insured dispatch via Sequel Secure.",
        createdAt: new Date(Date.now() - 3600000 * 8),
      },
      {
        orderNumber: "JJ-2026-8803",
        customerName: "Ananya Deshmukh",
        customerEmail: "ananya.d@gmail.com",
        customerPhone: "+919920144556",
        shippingAddress: {
          street: "B-402, Koregaon Park Plaza",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411001",
          landmark: "Lane 7",
        },
        items: [
          {
            productId: "jj-104",
            name: "Fine Floral Diamond Tennis Bracelet",
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
            category: "diamond",
            metal: "18K Rose Gold",
            metalPurity: "18K (750 BIS)",
            weightGrams: 18.5,
            quantity: 1,
            price: 245000,
          },
        ],
        totalAmount: 245000,
        paymentStatus: "Paid",
        paymentMethod: "Credit/Debit Card",
        orderStatus: "Dispatched",
        dispatchDetails: {
          isDispatched: true,
          courierPartner: "BlueDart Apex Express",
          trackingNumber: "BD-88392102",
          trackingUrl: "https://www.bluedart.com/tracking?awb=BD-88392102",
          dispatchedAt: new Date(Date.now() - 3600000 * 18),
          estimatedDelivery: "Tomorrow by 2:00 PM",
          dispatchNotes: "Tamper evident gold seal #G-99821 applied.",
        },
        notificationsSent: [
          {
            channel: "WhatsApp",
            recipient: "+919920144556",
            message: "Order #JJ-2026-8803 dispatched via BlueDart Apex (AWB: BD-88392102).",
            sentAt: new Date(Date.now() - 3600000 * 18),
            status: "Delivered",
          },
          {
            channel: "Email",
            recipient: "ananya.d@gmail.com",
            message: "Dispatch notification & transit insurance details sent.",
            sentAt: new Date(Date.now() - 3600000 * 18),
            status: "Delivered",
          },
        ],
        createdAt: new Date(Date.now() - 3600000 * 24),
      },
      {
        orderNumber: "JJ-2026-8804",
        customerName: "Vikramaditya Rathore",
        customerEmail: "vikram.rathore@jodhpurheritage.org",
        customerPhone: "+919414055221",
        shippingAddress: {
          street: "Heritage Haveli, Paota",
          city: "Jodhpur",
          state: "Rajasthan",
          pincode: "342001",
        },
        items: [
          {
            productId: "jj-105",
            name: "999 Fine Silver Royal Pooja Thali Set (1.2 kg)",
            image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
            category: "silver",
            metal: "999 Pure Silver",
            metalPurity: "99.9% Fine Silver",
            weightGrams: 1200,
            quantity: 1,
            price: 138000,
          },
        ],
        totalAmount: 138000,
        paymentStatus: "Paid",
        paymentMethod: "UPI / NetBanking",
        orderStatus: "Delivered",
        dispatchDetails: {
          isDispatched: true,
          courierPartner: "Sequel Secure Logistics",
          trackingNumber: "SQ-5510294",
          trackingUrl: "https://sequel247.com/tracking/SQ-5510294",
          dispatchedAt: new Date(Date.now() - 3600000 * 48),
          estimatedDelivery: "Delivered",
        },
        createdAt: new Date(Date.now() - 3600000 * 72),
      },
    ];

    const sampleLeads = [
      {
        leadNumber: "LEAD-2601",
        name: "Mrs. Shweta & Rajesh Agarwal",
        phone: "+919829033445",
        email: "agarwal.family@gmail.com",
        city: "Jaipur",
        source: "VIP Appointment",
        status: "New",
        priority: "Urgent",
        interestedCategory: "Bridal Couture & Rajwadi Kundan",
        productName: "Bridal Trousseau Suite",
        estimatedBudget: "₹15,00,000 - ₹25,00,000",
        notes: [
          {
            note: "Daughter's wedding scheduled in December 2026. Reserved VIP private suite for Saturday 3:00 PM.",
            author: "Concierge Desk",
            addedAt: new Date(Date.now() - 3600000 * 2),
          },
        ],
        followUpDate: new Date(Date.now() + 3600000 * 24),
      },
      {
        leadNumber: "LEAD-2602",
        name: "Dr. Arvind Mehta",
        phone: "+919876543210",
        email: "arvind.mehta@cardio.in",
        city: "Delhi NCR",
        source: "Bespoke Customizer",
        status: "In Negotiation",
        priority: "High",
        interestedCategory: "Solitaire Diamonds",
        productName: "3.5 Carat VVS1 Cushion Cut Solitaire Ring",
        estimatedBudget: "₹8,50,000",
        notes: [
          {
            note: "Custom cad rendering sent on WhatsApp. Patron requested 18K Platinum prong setting quotation.",
            author: "Master Craftsman",
            addedAt: new Date(Date.now() - 3600000 * 12),
          },
        ],
        followUpDate: new Date(Date.now() + 3600000 * 48),
      },
      {
        leadNumber: "LEAD-2603",
        name: "Pooja Khandelwal",
        phone: "+919414011223",
        email: "pooja.k@outlook.com",
        city: "Jaipur",
        source: "Product Inquiry",
        status: "Contacted",
        priority: "Medium",
        interestedCategory: "Antique Nakshi Gold",
        productName: "Heritage Temple Jhumkas",
        estimatedBudget: "₹1,80,000",
        notes: [
          {
            note: "Shared high-res video of jhumkas via WhatsApp concierge. Patron visiting showroom on Sunday.",
            author: "Sales Stylist",
            addedAt: new Date(Date.now() - 3600000 * 20),
          },
        ],
      },
      {
        leadNumber: "LEAD-2604",
        name: "Gaurav & Neha Bansal",
        phone: "+919811234567",
        email: "nehabansal@gmail.com",
        city: "Bengaluru",
        source: "WhatsApp Concierge",
        status: "Converted",
        priority: "High",
        interestedCategory: "Solitaire Diamond",
        productName: "Tennis Bracelet & Solitaire Pendant",
        estimatedBudget: "₹5,20,000",
        notes: [
          {
            note: "Converted to confirmed order #JJ-2026-8803. Payment settled.",
            author: "Sales Lead",
            addedAt: new Date(Date.now() - 3600000 * 30),
          },
        ],
      },
    ];

    const [createdOrders, createdLeads] = await Promise.all([
      Order.insertMany(sampleOrders),
      Lead.insertMany(sampleLeads),
    ]);

    return NextResponse.json({
      success: true,
      message: "Sample luxury orders and leads seeded into MongoDB successfully.",
      ordersCount: createdOrders.length,
      leadsCount: createdLeads.length,
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
