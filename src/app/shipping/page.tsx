import type { Metadata } from "next";
import Link from "next/link";
import { Truck, ArrowLeft, Mail, Phone, MapPin, PackageCheck, ShieldCheck, Clock } from "lucide-react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Jain Jewells",
  description:
    "Read the Jain Jewells shipping and delivery policy — dispatch timelines, fully insured delivery, packaging security, tracking and what to do if a package arrives damaged.",
};

const LAST_UPDATED = "September 8, 2026";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "areas", title: "2. Delivery Areas" },
  { id: "processing", title: "3. Order Processing & Dispatch" },
  { id: "charges", title: "4. Shipping Charges & Insurance" },
  { id: "timelines", title: "5. Delivery Timelines" },
  { id: "packaging", title: "6. Packaging & Security" },
  { id: "tracking", title: "7. Tracking & Delivery Confirmation" },
  { id: "failed", title: "8. Failed Delivery & Redelivery" },
  { id: "damaged", title: "9. Damaged or Missing Items" },
  { id: "returns", title: "10. Returns & Exchanges" },
  { id: "contact", title: "11. Contact Us" },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0e0908] text-[#f6efe4]">
      {/* Top Gold Accent Bar */}
      <div className="h-px gold-bg-gradient" />

      {/* Header */}
      <header className="border-b border-[#c8a05c]/15 bg-[#080706]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#c8a05c] hover:text-[#f6efe4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <span className="text-xs text-[#857768] font-light">Last updated: {LAST_UPDATED}</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 flex-1 w-full">
        {/* Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-none bg-[#c8a05c]/10 border border-[#c8a05c]/40 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6 text-[#c8a05c]" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#c8a05c]/80 font-semibold">
              Store Policy
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-[#f6efe4]">
              Shipping &amp; Delivery Policy
            </h1>
          </div>
        </div>

        <p className="text-[#a99987] leading-relaxed max-w-3xl mb-12">
          Every piece of jewellery we send out is treated like the treasure it is — fully insured,
          securely packaged and dispatched with care. This policy explains how we ship your orders,
          what it costs, how long delivery takes, and what to do if anything goes wrong in transit.
        </p>

        {/* Trust highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="emerald-glass rounded-none border border-[#c8a05c]/20 p-5">
            <PackageCheck className="w-6 h-6 text-[#c8a05c] mb-3" />
            <h3 className="text-sm font-serif-luxury font-light text-[#f6efe4] mb-1">Fully Insured</h3>
            <p className="text-xs text-[#a99987] leading-relaxed">Every consignment is insured for its full value from dispatch to delivery.</p>
          </div>
          <div className="emerald-glass rounded-none border border-[#c8a05c]/20 p-5">
            <ShieldCheck className="w-6 h-6 text-[#c8a05c] mb-3" />
            <h3 className="text-sm font-serif-luxury font-light text-[#f6efe4] mb-1">Tamper-Evident</h3>
            <p className="text-xs text-[#a99987] leading-relaxed">Discreet, sealed packaging with no brand markings that reveal the contents.</p>
          </div>
          <div className="emerald-glass rounded-none border border-[#c8a05c]/20 p-5">
            <Clock className="w-6 h-6 text-[#c8a05c] mb-3" />
            <h3 className="text-sm font-serif-luxury font-light text-[#f6efe4] mb-1">Tracked Delivery</h3>
            <p className="text-xs text-[#a99987] leading-relaxed">Live tracking details shared with you the moment your order ships.</p>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="emerald-glass rounded-none border border-[#c8a05c]/20 p-6 mb-12">
          <h2 className="text-[9px] font-normal not-italic tracking-[0.28em] text-[#c8a05c] uppercase mb-4">
            Table of Contents
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-[#a99987] hover:text-[#c8a05c] transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-10">
          <section id="introduction" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">1. Introduction</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                Jain Jewells is headquartered at {SHOWROOM_DETAILS.address},{" "}
                {SHOWROOM_DETAILS.cityStatePincode}, and dispatches all online orders from our
                Ludhiana showroom. This Shipping &amp; Delivery Policy forms part of our Terms &amp;
                Conditions and applies to every order placed through this website.
              </p>
              <p>
                Please read this policy carefully before placing an order. By placing an order, you
                agree to the dispatch, delivery and returns practices described here.
              </p>
            </div>
          </section>

          <section id="areas" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">2. Delivery Areas</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                We currently offer insured doorstep delivery across all major cities and pin codes
                in India, including Jammu &amp; Kashmir and the North-Eastern states (subject to
                courier availability and prevailing security regulations in the region).
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>International shipping is not currently available through our website. For overseas clients, please contact our concierge team for assistance.</li>
                <li>Certain remote or restricted locations may require additional delivery time or may only be serviced through our nearest showroom.</li>
                <li>If we cannot deliver to your address, our concierge team will contact you before dispatch to arrange an alternative.</li>
              </ul>
            </div>
          </section>

          <section id="processing" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">3. Order Processing &amp; Dispatch</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c8a05c]">Ready-made pieces:</strong> In-stock jewellery is quality-checked, certified and dispatched within <strong className="text-[#f6efe4]">2–3 business days</strong> of order confirmation and payment.</li>
                <li><strong className="text-[#c8a05c]">Bespoke commissions:</strong> Custom-made pieces are dispatched once craftsmanship is complete and the piece is verified by our in-house gemologists. The estimated timeline is shared with you when the commission is confirmed.</li>
                <li><strong className="text-[#c8a05c]">Order confirmation:</strong> Your order is confirmed once payment is received and our concierge team verifies stock, certification and pricing with you over phone, email or WhatsApp.</li>
                <li>Dispatch typically happens Monday to Saturday, excluding public holidays.</li>
              </ul>
            </div>
          </section>

          <section id="charges" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">4. Shipping Charges &amp; Insurance</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c8a05c]">Standard delivery:</strong> Flat shipping charge of ₹299 per order across India.</li>
                <li><strong className="text-[#c8a05c]">Free shipping:</strong> Orders above ₹50,000 qualify for complimentary insured doorstep delivery.</li>
                <li><strong className="text-[#c8a05c]">Insurance:</strong> Every consignment is insured for its full invoice value. Insurance is included in the shipping charge and is borne by Jain Jewells for orders above ₹50,000.</li>
                <li>There are no cash-on-delivery charges, as COD is not offered for high-value jewellery orders. All orders are paid for in advance via UPI, card, net banking or bank transfer.</li>
              </ul>
            </div>
          </section>

          <section id="timelines" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">5. Delivery Timelines</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>Timelines are counted from the date of dispatch and are indicative:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c8a05c]">Metro cities (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, Pune):</strong> 2–4 business days.</li>
                <li><strong className="text-[#c8a05c]">Other major cities:</strong> 3–5 business days.</li>
                <li><strong className="text-[#c8a05c]">Rest of India &amp; remote areas:</strong> 5–8 business days.</li>
              </ul>
              <p>
                Timelines may extend during festive seasons, peak bridal periods, adverse weather or
                courier disruptions. We are not liable for delays beyond our reasonable control, but
                we will keep you informed of any change in status.
              </p>
            </div>
          </section>

          <section id="packaging" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">6. Packaging &amp; Security</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>All orders are packed in discreet, unbranded outer packaging so the contents are never apparent.</li>
                <li>Jewellery is secured in tamper-evident sealed pouches, cushioned inserts and a rigid outer box.</li>
                <li>Certificates (BIS hallmark, GIA/IGI), invoices and any polishing cloth are included inside the package.</li>
                <li>High-value consignments may require signature on delivery and a one-time password (OTP) verification to release the package.</li>
              </ul>
            </div>
          </section>

          <section id="tracking" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">7. Tracking &amp; Delivery Confirmation</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                Once your order is dispatched, our concierge team shares your tracking number and
                courier details via WhatsApp, email or SMS. You can follow your consignment on the
                courier&apos;s website or app using the tracking number provided.
              </p>
              <p>
                For security reasons, high-value deliveries require the recipient&apos;s identity
                verification (government-issued photo ID or OTP) before the package is handed over.
                Please keep your phone reachable on the delivery date.
              </p>
            </div>
          </section>

          <section id="failed" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">8. Failed Delivery &amp; Redelivery</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>If a delivery attempt fails (recipient unavailable, incorrect address, or OTP not verifiable), the courier will attempt redelivery or hold the package at the nearest hub.</li>
                <li>Please contact our concierge team within 48 hours of a failed attempt to arrange redelivery or schedule a pickup from the courier hub.</li>
                <li>Orders returned to our showroom due to repeated failed delivery attempts may be subject to a redelivery charge. If you wish to cancel instead, our standard return policy (Section 10) applies.</li>
              </ul>
            </div>
          </section>

          <section id="damaged" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">9. Damaged or Missing Items</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                Every package is inspected and sealed at our showroom before dispatch, and is
                covered by transit insurance. In the unlikely event of damage or shortage:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c8a05c]">On delivery:</strong> Inspect the package in the presence of the delivery agent. Note any visible damage or tampering on the delivery record before signing.</li>
                <li><strong className="text-[#c8a05c]">Report promptly:</strong> Contact our concierge team within 48 hours of delivery, with photographs of the outer packaging and contents.</li>
                <li><strong className="text-[#c8a05c]">Resolution:</strong> We will investigate with the courier and insurer, and arrange a replacement, repair or full refund — including all shipping charges — as appropriate. No claim can be entertained after 48 hours of delivery.</li>
              </ul>
            </div>
          </section>

          <section id="returns" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">10. Returns &amp; Exchanges</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                In-stock, unaltered pieces may be returned within 7 days of delivery in original
                condition with all certificates and packaging intact. Return shipping is borne by
                the customer unless the piece is defective or misdescribed. Customised, engraved or
                resized pieces cannot be returned.
              </p>
              <p>
                All purchases from Jain Jewells are eligible for our lifetime exchange and purity
                guarantee. For full details, please refer to our{" "}
                <Link href="/terms#exchange" className="text-[#c8a05c] hover:text-[#f6efe4] transition-colors underline underline-offset-2">
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-24 emerald-glass rounded-none border border-[#c8a05c]/25 p-6 sm:p-8">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-4">11. Contact Us</h2>
            <p className="text-[#a99987] text-sm leading-relaxed mb-5">
              Questions about your shipment, or need help tracking an order? Our concierge team is
              here for you:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c8a05c] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#f6efe4] font-semibold mb-0.5">Showroom</p>
                  <p className="text-[#a99987] text-xs leading-relaxed">
                    {SHOWROOM_DETAILS.address},<br />
                    {SHOWROOM_DETAILS.cityStatePincode}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#c8a05c] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#f6efe4] font-semibold mb-0.5">Phone / WhatsApp</p>
                  {SHOWROOM_DETAILS.phone.map((ph) => (
                    <a key={ph} href={`tel:${ph}`} className="block text-[#a99987] text-xs hover:text-[#c8a05c] transition-colors">
                      {ph}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#c8a05c] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#f6efe4] font-semibold mb-0.5">Email</p>
                  <a
                    href={`mailto:${SHOWROOM_DETAILS.email}`}
                    className="text-[#a99987] text-xs hover:text-[#c8a05c] transition-colors"
                  >
                    {SHOWROOM_DETAILS.email}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <p className="mt-12 pt-6 border-t border-[#f6efe4]/10 text-xs text-[#857768] text-center">
          © 1984 – {new Date().getFullYear()} Jain Jewells, Ludhiana. All Rights Reserved.
        </p>
      </div>
    </main>
  );
}