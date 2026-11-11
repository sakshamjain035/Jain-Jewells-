import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";

export const metadata: Metadata = {
  title: "Terms & Conditions | Jain Jewells",
  description:
    "Read the Terms & Conditions governing the use of the Jain Jewells website, including product certification, pricing, payment, exchange, bespoke commissions and liability.",
};

const LAST_UPDATED = "September 8, 2026";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "business", title: "2. About Jain Jewells" },
  { id: "products", title: "3. Products, Certification & Authenticity" },
  { id: "pricing", title: "4. Pricing, Gold Rates & Payment" },
  { id: "orders", title: "5. Orders, Appointments & Bespoke Commissions" },
  { id: "exchange", title: "6. Exchange, Returns & Buyback" },
  { id: "delivery", title: "7. Shipping & Delivery" },
  { id: "warranty", title: "8. Care, Warranty & Liability" },
  { id: "ip", title: "9. Intellectual Property" },
  { id: "privacy", title: "10. Privacy & Data Protection" },
  { id: "conduct", title: "11. Acceptable Use of the Website" },
  { id: "law", title: "12. Governing Law & Jurisdiction" },
  { id: "changes", title: "13. Changes to These Terms" },
  { id: "contact", title: "14. Contact Us" },
];

export default function TermsPage() {
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
            <Scale className="w-6 h-6 text-[#c8a05c]" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#c8a05c]/80 font-semibold">
              Legal Policy
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-[#f6efe4]">
              Terms &amp; Conditions
            </h1>
          </div>
        </div>

        <p className="text-[#a99987] leading-relaxed max-w-3xl mb-12">
          Welcome to Jain Jewells. These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your
          access to and use of our website and the purchase of jewellery, bespoke commissions and
          related services from our showroom. By browsing this website, booking an appointment, or
          placing an order, you agree to be bound by these Terms. Please read them carefully before
          making any purchase.
        </p>

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
          <section id="acceptance" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">1. Acceptance of Terms</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                By accessing, browsing or using this website, and by booking an appointment or
                purchasing any product or service offered by Jain Jewells, you acknowledge that you
                have read, understood and agree to be bound by these Terms and by our Privacy
                Policy. If you do not agree with any part of these Terms, please discontinue use of
                this website and do not place an order.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you and Jain Jewells
                (a jewellery showroom operating at {SHOWROOM_DETAILS.address},{" "}
                {SHOWROOM_DETAILS.cityStatePincode}). If you are placing an order on behalf of
                another person, you confirm that you have the authority to accept these Terms on
                their behalf.
              </p>
            </div>
          </section>

          <section id="business" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">2. About Jain Jewells</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                Jain Jewells has been crafting and retailing fine jewellery in Jaipur since 1984.
                We specialise in 22K BIS Hallmarked gold jewellery, GIA and IGI certified diamond
                solitaires, royal polki couture, silver collections and bespoke custom commissions.
                Our showroom is located at {SHOWROOM_DETAILS.address},{" "}
                {SHOWROOM_DETAILS.cityStatePincode}, and we may also fulfil select orders through
                secure delivery within India.
              </p>
              <p>
                Nothing on this website constitutes investment, financial or legal advice. Gold and
                diamond prices fluctuate with market conditions, and any rates displayed are
                indicative only.
              </p>
            </div>
          </section>

          <section id="products" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">3. Products, Certification &amp; Authenticity</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                All gold jewellery sold by Jain Jewells is crafted in 22K (916) or 18K gold as
                specified on the product, and carries BIS Hallmark certification with a unique HUID
                (Hallmark Unique Identification) number where applicable. Diamond jewellery is
                accompanied by GIA or IGI certification as indicated on the product listing.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Certificates are issued by independent, recognised laboratories and are provided as received from the issuing authority.</li>
                <li>Colours of gemstones and gold may appear slightly different in photographs due to lighting and screen settings; every piece is verified physically at our certified in-house gemology lab before dispatch.</li>
                <li>Product images, weights, purity and making-charge details shown on this website are indicative and may vary marginally from the final piece. The exact details are confirmed on the invoice issued at the time of purchase.</li>
                <li>Weights shown exclude or include gemstones as indicated; final billing is based on actual weighment in the presence of the customer.</li>
              </ul>
            </div>
          </section>

          <section id="pricing" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">4. Pricing, Gold Rates &amp; Payment</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                Prices displayed on this website are based on the prevailing market rates for gold,
                silver and diamonds, plus applicable making charges and taxes. All prices are in
                Indian Rupees (INR) and include GST unless stated otherwise.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c8a05c]">Live rates:</strong> Gold and silver rates shown on our Live Rate Ticker update in near real-time and are indicative. The final price is determined by the rate applicable at the time of billing.</li>
                <li><strong className="text-[#c8a05c]">Making charges:</strong> Making charges are calculated as a percentage of the metal value or a fixed amount per piece, as indicated at the time of sale.</li>
                <li><strong className="text-[#c8a05c]">Payment:</strong> We accept payment via UPI, debit/credit cards, net banking, and bank transfer. For bespoke commissions, an advance deposit is required as detailed in Section 5.</li>
                <li><strong className="text-[#c8a05c]">No hidden charges:</strong> The invoice issued at the time of purchase is the final and binding record of the transaction.</li>
              </ul>
            </div>
          </section>

          <section id="orders" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">5. Orders, Appointments &amp; Bespoke Commissions</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c8a05c]">Showroom visits:</strong> Appointments can be booked through this website. An appointment is a request and is confirmed by our concierge team via phone, email or WhatsApp.</li>
                <li><strong className="text-[#c8a05c]">Order acceptance:</strong> All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order, including where certification, stock or pricing cannot be confirmed.</li>
                <li><strong className="text-[#c8a05c]">Bespoke commissions:</strong> Custom-made pieces require a non-refundable advance deposit of at least 30% of the estimated value. The balance is payable upon completion and physical verification of the piece. Timelines are estimates and may extend due to the handcrafted nature of our work; we will keep you informed of progress.</li>
                <li><strong className="text-[#c8a05c]">Cancellation:</strong> Orders for ready-made, in-stock jewellery may be cancelled within 24 hours of placement. Once a piece is engraved, resized or customised, it cannot be cancelled or returned.</li>
              </ul>
            </div>
          </section>

          <section id="exchange" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">6. Exchange, Returns &amp; Buyback</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                We stand behind the quality and purity of every piece we sell.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c8a05c]">Lifetime exchange:</strong> Jain Jewells offers lifetime exchange on gold and diamond jewellery purchased from us, subject to prevailing policies and value calculations at the time of exchange. Exchange value is calculated on the current market rate of gold and/or diamonds, less applicable making charges as per our policy.</li>
                <li><strong className="text-[#c8a05c]">Purity guarantee:</strong> If a certified purity test ever shows a shortfall against the BIS hallmark on a piece purchased from us, we will rectify the piece or refund its value in full, at our discretion.</li>
                <li><strong className="text-[#c8a05c]">Returns:</strong> In-stock, unaltered pieces purchased online may be returned within 7 days of delivery, in original condition with all certificates and packaging intact. Return shipping is borne by the customer unless the piece is defective or misdescribed.</li>
                <li><strong className="text-[#c8a05c]">Buyback:</strong> We buy back gold jewellery at prevailing market rates less applicable deductions. Buyback rates are confirmed at the showroom at the time of the transaction.</li>
              </ul>
            </div>
          </section>

          <section id="delivery" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">7. Shipping &amp; Delivery</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>We arrange fully insured, tamper-evident courier delivery for eligible orders within India. Delivery timelines are indicative and subject to the courier partner&apos;s schedule.</li>
                <li>Risk in the goods passes to you upon confirmed delivery. Please inspect the package in the presence of the delivery agent and note any damage or discrepancy before signing.</li>
                <li>We are not liable for delays caused by circumstances beyond our reasonable control, including natural events, regulatory holds or courier disruptions.</li>
              </ul>
            </div>
          </section>

          <section id="warranty" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">8. Care, Warranty &amp; Liability</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Jewellery is delicate by nature. We offer complimentary cleaning and inspection of pieces purchased from us, but normal wear, accidental damage, loss of stones or alteration by third parties is not covered under warranty.</li>
                <li>To the maximum extent permitted by law, Jain Jewells shall not be liable for any indirect, incidental or consequential loss arising from the use of this website or from any purchase, including loss of profits, data or goodwill.</li>
                <li>Our total liability in connection with any single transaction shall not exceed the amount paid by you for that transaction.</li>
                <li>Nothing in these Terms limits any rights you have under applicable consumer protection laws in India.</li>
              </ul>
            </div>
          </section>

          <section id="ip" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">9. Intellectual Property</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                All content on this website — including designs, product photography, text,
                graphics, logos, the &ldquo;Jain Jewells&rdquo; name and trademarks — is the
                property of Jain Jewells or its licensors and is protected under Indian and
                international intellectual property laws. You may not copy, reproduce, distribute,
                modify or commercially exploit any part of this website without our prior written
                consent.
              </p>
            </div>
          </section>

          <section id="privacy" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">10. Privacy &amp; Data Protection</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                Your privacy matters to us. Any personal information you share — such as your name,
                contact details, appointment preferences or wishlist selections — is used solely to
                provide our services, confirm bookings, process orders and share updates you have
                opted into. We never sell your data to third parties. Please refer to our Privacy
                Policy for full details on how we collect, use and protect your information.
              </p>
            </div>
          </section>

          <section id="conduct" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">11. Acceptable Use of the Website</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>You agree not to misuse this website, attempt to gain unauthorised access to our systems, introduce malicious code, or use the website for any unlawful purpose.</li>
                <li>You agree not to scrape, replicate or resell data, product information or images from this website.</li>
                <li>We may suspend access to the website for maintenance, security or operational reasons without prior notice.</li>
              </ul>
            </div>
          </section>

          <section id="law" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">12. Governing Law &amp; Jurisdiction</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                These Terms are governed by and construed in accordance with the laws of India.
                Any dispute arising out of or in connection with these Terms, or with any purchase
                from Jain Jewells, shall be subject to the exclusive jurisdiction of the courts of
                Jaipur, Rajasthan. We will always attempt to resolve any concern amicably before
                formal proceedings.
              </p>
            </div>
          </section>

          <section id="changes" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-3">13. Changes to These Terms</h2>
            <div className="text-[#a99987] leading-relaxed space-y-3 text-sm">
              <p>
                We may update these Terms from time to time to reflect changes in our business,
                products or applicable law. The &ldquo;Last updated&rdquo; date at the top of this
                page indicates the latest revision. Continued use of this website or placement of an
                order after any revision constitutes acceptance of the updated Terms. We encourage
                you to review this page periodically.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-24 emerald-glass rounded-none border border-[#c8a05c]/25 p-6 sm:p-8">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c8a05c] mb-4">14. Contact Us</h2>
            <p className="text-[#a99987] text-sm leading-relaxed mb-5">
              If you have any questions about these Terms, our products, or wish to raise a concern,
              our concierge team is happy to assist you:
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
          © 1984 – {new Date().getFullYear()} Jain Jewells, Jaipur. All Rights Reserved.
        </p>
      </div>
    </main>
  );
}