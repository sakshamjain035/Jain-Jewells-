import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jain Jewells | Luxury Gold, Diamond & Polki Jewellery Showroom",
  description: "Patronize Jain Jewells - Jaipur's premier showroom for 22K BIS Hallmarked Gold, GIA Certified Diamond Solitaires, Royal Polki Couture & Bespoke Craftsmanship.",
  keywords: ["Jain Jewells", "Luxury Jewellery Showroom", "Gold Jewellery", "Bridal Polki", "Solitaire Diamonds", "BIS Hallmark 916", "Custom Jewellery Jaipur"],
  authors: [{ name: "Jain Jewells" }],
  openGraph: {
    title: "Jain Jewells | Flagship Luxury Jewellery Showroom",
    description: "Discover timeless royal heritage jewellery, 100% certified gold rates, and private VIP showroom consultations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#06110c] text-[#f4ede2] selection:bg-[#d4af37] selection:text-[#06110c]">
        {children}
      </body>
    </html>
  );
}
