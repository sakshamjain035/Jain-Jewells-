import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./globals.css";

const playfair = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
      <body className="min-h-full flex flex-col bg-[#0a0a08] text-[#f4eee3] selection:bg-[#c9a96a] selection:text-[#0a0a08]">
        <noscript>
          <style>{`.lux-reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
