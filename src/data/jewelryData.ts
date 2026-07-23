export interface Product {
  id: string;
  name: string;
  category: 'bridal' | 'diamond' | 'antique' | 'everyday' | 'silver';
  categoryLabel: string;
  price: number;
  metal: string;
  metalPurity: string;
  weightGrams: number;
  gemstone?: string;
  certification: string;
  image: string;
  gallery?: string[];
  description: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  makingChargePercent: number;
}

export interface ShowroomInfo {
  name: string;
  tagline: string;
  address: string;
  cityStatePincode: string;
  landmarks: string[];
  phone: string[];
  whatsapp: string;
  email: string;
  googleMapsUrl: string;
  hours: {
    weekdays: string;
    sunday: string;
  };
  amenities: { title: string; description: string; iconName: string }[];
}

export const SHOWROOM_DETAILS: ShowroomInfo = {
  name: "Jain Jewells Flagship Showroom",
  tagline: "Heritage Craftsmanship & Timeless Elegance Since 1984",
  address: "104-108, Heritage Jewellery Plaza, Palace Road, C-Scheme",
  cityStatePincode: "Jaipur, Rajasthan 302001",
  landmarks: ["Opposite Royal Palace Gate", "Next to Central Museum Square"],
  phone: ["+91 141 234 5678", "+91 98290 12345"],
  whatsapp: "+919829012345",
  email: "concierge@jainjewells.com",
  googleMapsUrl: "https://maps.google.com/?q=Jain+Jewells+Jaipur",
  hours: {
    weekdays: "10:30 AM – 8:30 PM (Mon – Sat)",
    sunday: "11:30 AM – 7:30 PM (Sun)",
  },
  amenities: [
    {
      title: "Private VIP Bridal Suite",
      description: "Exclusive private viewing rooms with personal jewelry stylists & family seating.",
      iconName: "Sparkles",
    },
    {
      title: "Certified In-House Gemologists",
      description: "On-site GIA & IGI diamond consultation & instant purity verification.",
      iconName: "Award",
    },
    {
      title: "Complimentary Valet Parking",
      description: "Hassle-free secure valet parking service at the showroom main entrance.",
      iconName: "ShieldCheck",
    },
    {
      title: "Bespoke Design Lounge",
      description: "Collaborate directly with our master artisans to sketch and craft custom pieces.",
      iconName: "Palette",
    },
  ],
};

export interface MetalRate {
  metal: string;
  purity: string;
  ratePerGram: number;
  change: string;
  isPositive: boolean;
  unit: string;
}

export const LIVE_METAL_RATES: MetalRate[] = [
  {
    metal: "24K Gold",
    purity: "99.9% Pure Fine Gold",
    ratePerGram: 7485,
    change: "+₹35 (+0.47%)",
    isPositive: true,
    unit: "per gram",
  },
  {
    metal: "22K Gold",
    purity: "91.6% BIS Hallmarked",
    ratePerGram: 6860,
    change: "+₹30 (+0.44%)",
    isPositive: true,
    unit: "per gram",
  },
  {
    metal: "18K Gold",
    purity: "75.0% Designer Gold",
    ratePerGram: 5615,
    change: "+₹25 (+0.45%)",
    isPositive: true,
    unit: "per gram",
  },
  {
    metal: "999 Fine Silver",
    purity: "99.9% Sterling Silver",
    ratePerGram: 93.5,
    change: "-₹0.20 (-0.21%)",
    isPositive: false,
    unit: "per gram",
  },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "jj-101",
    name: "Royal Rajwadi Polki & Emerald Bridal Necklace Set",
    category: "bridal",
    categoryLabel: "Bridal Heritage Couture",
    price: 685000,
    metal: "22K Yellow Gold",
    metalPurity: "BIS 916 Hallmarked",
    weightGrams: 84.5,
    gemstone: "Uncut Diamonds (Polki) & Zambian Emerald Drop Beads",
    certification: "BIS Hallmarked & In-House Authenticity Certificate",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
    description: "Handcrafted by 4th generation Jaipur artisans, featuring intricate meenakari work on the reverse and regal Zambian emerald clusters.",
    isBestSeller: true,
    makingChargePercent: 14,
  },
  {
    id: "jj-102",
    name: "The Imperial Solitaire Diamond Ring (1.5 ct)",
    category: "diamond",
    categoryLabel: "Solitaire Collection",
    price: 345000,
    metal: "18K White Gold & Platinum Prongs",
    metalPurity: "18K (750) Hallmarked",
    weightGrams: 5.2,
    gemstone: "1.50 Carat Round Brilliant Diamond (VVS1, E Color, Excellent Cut)",
    certification: "IGI Certified & Laser Inscribed",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
    description: "An extraordinary center solitaire elevated by hidden halo diamond pave band. Epitome of timeless commitment.",
    isBestSeller: true,
    makingChargePercent: 10,
  },
  {
    id: "jj-103",
    name: "Antique Nakshi Temple Gold Rani Haar",
    category: "antique",
    categoryLabel: "Antique Gold Masterpieces",
    price: 520000,
    metal: "22K Antique Yellow Gold",
    metalPurity: "BIS 916 Hallmarked",
    weightGrams: 68.2,
    gemstone: "Ruby & South Sea Pearl Accents",
    certification: "BIS 916 Hallmark Certificate",
    image: "https://images.unsplash.com/photo-1611591475281-8d9954a2be31?auto=format&fit=crop&w=1000&q=80",
    description: "Features elaborate handcrafted divine Goddess Lakshmi motifs and Nakshi carving work, paired with cultured pearls.",
    isNewArrival: true,
    makingChargePercent: 15,
  },
  {
    id: "jj-104",
    name: "Celestial Diamond Chandelier Earrings",
    category: "diamond",
    categoryLabel: "Diamond Fine Jewelry",
    price: 215000,
    metal: "18K Rose Gold",
    metalPurity: "18K (750) Hallmarked",
    weightGrams: 16.8,
    gemstone: "Natural Round & Marquise Diamonds (3.20 ct total weight)",
    certification: "SGL / IGI Certified",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
    description: "Cascading diamond chandeliers designed to capture every ray of ambient light. Perfect for evening galas and wedding receptions.",
    makingChargePercent: 12,
  },
  {
    id: "jj-105",
    name: "Kundan Meenakari Heritage Bridal Mathapatti",
    category: "bridal",
    categoryLabel: "Bridal Heritage Couture",
    price: 185000,
    metal: "22K Yellow Gold",
    metalPurity: "BIS 916 Hallmarked",
    weightGrams: 24.1,
    gemstone: "Glass Kundan, Pearls & Ruby Drops",
    certification: "BIS 916 Hallmark Certificate",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80",
    description: "Traditional royal Rajasthani Mathapatti hairpiece with intricate pink and green meenakari craftsmanship.",
    isNewArrival: true,
    makingChargePercent: 14,
  },
  {
    id: "jj-106",
    name: "Classic Diamond Tennis Bracelet (5.0 ct)",
    category: "diamond",
    categoryLabel: "Solitaire & Everyday Luxury",
    price: 290000,
    metal: "18K White Gold",
    metalPurity: "18K (750) Hallmarked",
    weightGrams: 14.5,
    gemstone: "48 Matching Round Brilliant Cut Diamonds (VVS-VS)",
    certification: "IGI Card Certified",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
    description: "A continuous line of perfectly proportioned diamonds featuring a secure double-lock safety clasp.",
    isBestSeller: true,
    makingChargePercent: 10,
  },
  {
    id: "jj-107",
    name: "Minimalist 18K Gold Geometric Diamond Pendant",
    category: "everyday",
    categoryLabel: "Everyday Modern Luxury",
    price: 48000,
    metal: "18K Yellow Gold",
    metalPurity: "18K (750) Hallmarked",
    weightGrams: 4.8,
    gemstone: "Natural Diamonds (0.35 ct total)",
    certification: "IGI Card Certified",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80",
    description: "Sleek, lightweight geometry designed for daily elegance at work or evening dinners. Includes adjustable chain.",
    makingChargePercent: 9,
  },
  {
    id: "jj-108",
    name: "Pure 999 Fine Silver Carved Royal Pooja Thali Set",
    category: "silver",
    categoryLabel: "Fine Silver & Heritage Gifts",
    price: 75000,
    metal: "999 Pure Silver",
    metalPurity: "99.9% Purity Certified",
    weightGrams: 750.0,
    certification: "Pure Silver Assay Certification",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=80",
    description: "Includes silver thali, 2 katoris, incense holder, camphor burner, and bell. Hand-engraved with lotus motifs.",
    isBestSeller: true,
    makingChargePercent: 8,
  },
];

export const TESTIMONIALS = [
  {
    name: "Meera & Siddharth Agarwal",
    city: "Jaipur & Delhi",
    occasion: "Bridal Shopping",
    quote: "Jain Jewells made our daughter's wedding trousseau shopping extraordinary. The private bridal lounge allowed us to curate bespoke Polki and Kundan sets with full transparency on gold weight and gemstone carats.",
    rating: 5,
    date: "June 2026",
  },
  {
    name: "Dr. Vikramaditya Sharma",
    city: "Mumbai",
    occasion: "25th Anniversary Solitaire",
    quote: "I wanted a rare 2-carat VVS diamond ring for my wife. The gemologists at Jain Jewells educated me thoroughly on cut & clarity, and delivered a certified solitaire piece beyond our expectations.",
    rating: 5,
    date: "May 2026",
  },
  {
    name: "Sunita & Rajesh Kothari",
    city: "Ahmedabad",
    occasion: "Antique Gold Collection",
    quote: "The Nakshi carving work on their Antique Gold Rani Haar is unmatched in purity and craftsmanship. We have been loyal clients of Jain Jewells for over two decades.",
    rating: 5,
    date: "April 2026",
  },
];

export const FAQ_DATA = [
  {
    question: "Is all gold jewelry at Jain Jewells 100% BIS Hallmarked?",
    answer: "Yes, absolutely! Every single piece of gold jewelry at Jain Jewells carries official 6-digit HUID BIS Hallmark certification, guaranteeing exact gold purity (24K, 22K 916, or 18K 750).",
  },
  {
    question: "How are diamonds certified at Jain Jewells?",
    answer: "All our natural solitaires and diamond jewelry are certified by internationally recognized independent gemological laboratories such as GIA (Gemological Institute of America) and IGI (International Gemological Institute).",
  },
  {
    question: "Can I book a private VIP appointment at the showroom?",
    answer: "Yes! We encourage our patrons to reserve a private viewing session in our VIP Suite. You will have dedicated personal stylists, gemologists, and family seating.",
  },
  {
    question: "Does Jain Jewells offer custom bespoke jewelry design services?",
    answer: "Yes! Our Bespoke Design Studio works directly with you. You can share your design sketches or inspiration, select custom gemstones, and our master goldsmiths will craft your dream piece.",
  },
  {
    question: "What is your return and buyback / exchange policy?",
    answer: "We offer 100% transparent lifetime exchange and buyback on all gold and diamond jewelry based on prevailing live market rates, as per our showroom guidelines.",
  },
];
