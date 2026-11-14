import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jain Jewells | Luxury Gold, Diamond & Polki Jewellery Showroom",
  description: "Patronize Jain Jewells - Ludhiana's premier showroom for 22K BIS Hallmarked Gold, GIA Certified Diamond Solitaires, Royal Polki Couture & Bespoke Craftsmanship.",
  keywords: ["Jain Jewells", "Luxury Jewellery Showroom", "Gold Jewellery", "Bridal Polki", "Solitaire Diamonds", "BIS Hallmark 916", "Custom Jewellery Ludhiana"],
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
      className={`${bodoni.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0e0908] text-[#f6efe4] selection:bg-[#c8a05c] selection:text-[#0e0908]">
        <noscript>
          <style>{`.lux-reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
