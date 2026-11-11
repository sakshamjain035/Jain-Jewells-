import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCcw, ArrowLeft, Mail, Phone, MapPin, ShieldCheck, BadgeCheck, Wallet } from "lucide-react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";

export const metadata: Metadata = {
  title: "Returns & Exchange Policy | Jain Jewells",
  description:
    "Read the Jain Jewells returns and exchange policy — 7-day returns on in-stock pieces, lifetime exchange, purity guarantee and buyback terms.",
};

const LAST_UPDATED = "September 8, 2026";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "eligibility", title: "2. Return Eligibility" },
  { id: "nonreturnable", title: "3. Non-Returnable Items" },
  { id: "process", title: "4. How to Initiate a Return" },
  { id: "shipping", title: "5. Return Shipping & Charges" },
  { id: "refunds", title: "6. Inspection & Refunds" },
  { id: "exchange", title: "7. Lifetime Exchange" },
  { id: "purity", title: "8. Purity Guarantee" },
  { id: "buyback", title: "9. Buyback" },
  { id: "damaged", title: "10. Damaged or Defective Items" },
  { id: "contact", title: "11. Contact Us" },
];

export default function ReturnsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a08] text-[#f4eee3]">
      {/* Top Gold Accent Bar */}
      <div className="h-px gold-bg-gradient" />

      {/* Header */}
      <header className="border-b border-[#c9a96a]/15 bg-[#080706]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#c9a96a] hover:text-[#f4eee3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <span className="text-xs text-[#7f786c] font-light">Last updated: {LAST_UPDATED}</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 flex-1 w-full">
        {/* Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-none bg-[#c9a96a]/10 border border-[#c9a96a]/40 flex items-center justify-center shrink-0">
            <RefreshCcw className="w-6 h-6 text-[#c9a96a]" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96a]/80 font-semibold">
              Store Policy
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-[#f4eee3]">
              Returns &amp; Exchange Policy
            </h1>
          </div>
        </div>

        <p className="text-[#a79e8e] leading-relaxed max-w-3xl mb-12">
          We want you to love every piece you bring home from Jain Jewells. If something isn&apos;t
          quite right, our returns, lifetime exchange and buyback policies are designed to make
          things simple and fair. Please read this policy carefully before making a purchase.
        </p>

        {/* Trust highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="emerald-glass rounded-none border border-[#c9a96a]/20 p-5">
            <BadgeCheck className="w-6 h-6 text-[#c9a96a] mb-3" />
            <h3 className="text-sm font-serif-luxury font-light text-[#f4eee3] mb-1">7-Day Returns</h3>
            <p className="text-xs text-[#a79e8e] leading-relaxed">Return eligible in-stock pieces within 7 days of delivery, in original condition.</p>
          </div>
          <div className="emerald-glass rounded-none border border-[#c9a96a]/20 p-5">
            <RefreshCcw className="w-6 h-6 text-[#c9a96a] mb-3" />
            <h3 className="text-sm font-serif-luxury font-light text-[#f4eee3] mb-1">Lifetime Exchange</h3>
            <p className="text-xs text-[#a79e8e] leading-relaxed">Exchange gold and diamond jewellery purchased from us, any time, per policy.</p>
          </div>
          <div className="emerald-glass rounded-none border border-[#c9a96a]/20 p-5">
            <ShieldCheck className="w-6 h-6 text-[#c9a96a] mb-3" />
            <h3 className="text-sm font-serif-luxury font-light text-[#f4eee3] mb-1">Purity Guarantee</h3>
            <p className="text-xs text-[#a79e8e] leading-relaxed">Certified purity shortfall? We rectify the piece or refund in full.</p>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="emerald-glass rounded-none border border-[#c9a96a]/20 p-6 mb-12">
          <h2 className="text-[9px] font-normal not-italic tracking-[0.28em] text-[#c9a96a] uppercase mb-4">
            Table of Contents
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-[#a79e8e] hover:text-[#c9a96a] transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-10">
          <section id="introduction" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">1. Introduction</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                This Returns &amp; Exchange Policy applies to jewellery purchased from Jain Jewells,
                whether through this website, by phone, or at our showroom at{" "}
                {SHOWROOM_DETAILS.address}, {SHOWROOM_DETAILS.cityStatePincode}. It forms part of
                our{" "}
                <Link href="/terms" className="text-[#c9a96a] hover:text-[#f4eee3] transition-colors underline underline-offset-2">
                  Terms &amp; Conditions
                </Link>{" "}
                and should be read together with our{" "}
                <Link href="/shipping" className="text-[#c9a96a] hover:text-[#f4eee3] transition-colors underline underline-offset-2">
                  Shipping &amp; Delivery Policy
                </Link>
                .
              </p>
            </div>
          </section>

          <section id="eligibility" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">2. Return Eligibility</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                To be eligible for a return, all of the following conditions must be met:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>The item was purchased from Jain Jewells and is <strong className="text-[#f4eee3]">in-stock, ready-made jewellery</strong> (not customised, engraved, resized or altered).</li>
                <li>The return request is initiated <strong className="text-[#f4eee3]">within 7 days of delivery</strong>.</li>
                <li>The piece is returned in <strong className="text-[#f4eee3]">original, unworn condition</strong> with all certificates (BIS hallmark, GIA/IGI), invoices, tags and original packaging intact.</li>
                <li>The piece has not been damaged, altered or resized by any third party.</li>
              </ul>
              <p>
                Items purchased in person at the showroom are subject to our lifetime exchange
                policy (Section 7) rather than the online return window, since you have had the
                opportunity to inspect them at the time of purchase.
              </p>
            </div>
          </section>

          <section id="nonreturnable" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">3. Non-Returnable Items</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Bespoke, custom-made or commissioned pieces.</li>
                <li>Items engraved, resized, or altered after purchase.</li>
                <li>Pieces showing signs of wear, damage, or missing certificates and packaging.</li>
                <li>Items returned after the 7-day window (these may still qualify for lifetime exchange — see Section 7).</li>
                <li>Earrings and other pieces worn for hygiene reasons, unless defective or misdescribed.</li>
              </ul>
            </div>
          </section>

          <section id="process" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">4. How to Initiate a Return</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Contact our concierge team within 7 days of delivery using the details in Section 11, quoting your order number.</li>
                <li>Share clear photographs of the piece in its original packaging so our team can confirm eligibility.</li>
                <li>Once approved, you will receive a Return Authorisation (RA) number and instructions for returning the item.</li>
                <li>Pack the piece securely in its original packaging with all certificates and the invoice, and dispatch using the authorised courier.</li>
              </ol>
              <p>
                Returns without a valid RA number may be refused. Please do not send the item back
                before receiving instructions from our team.
              </p>
            </div>
          </section>

          <section id="shipping" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">5. Return Shipping &amp; Charges</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Return shipping is borne by the customer unless the piece is defective or was misdescribed in the listing.</li>
                <li>We strongly recommend returning jewellery through the insured courier arranged by our concierge team so the consignment is covered in transit.</li>
                <li>The original outbound shipping charge is refunded when the return is accepted; for non-defective returns, the original shipping charge paid by the customer is not refundable.</li>
                <li>No restocking fee is charged on eligible returns.</li>
              </ul>
            </div>
          </section>

          <section id="refunds" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">6. Inspection &amp; Refunds</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Upon receipt, our gemologists inspect the piece to verify condition, weight and certificates. Inspection typically takes 2–3 business days.</li>
                <li>Once approved, refunds are processed to the original payment method within <strong className="text-[#f4eee3]">5–7 business days</strong>. Bank transfers may take additional time depending on your bank.</li>
                <li>Refunds are issued for the amount paid for the piece (including GST) less any non-refundable shipping charges as described above.</li>
                <li>If a returned piece fails inspection due to wear, damage or missing certificates, we will contact you and may return the piece to you at your cost.</li>
              </ul>
            </div>
          </section>

          <section id="exchange" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">7. Lifetime Exchange</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                Every piece of gold and diamond jewellery purchased from Jain Jewells carries our
                lifetime exchange promise. There is no time limit and no minimum purchase value.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Exchange value is calculated on the prevailing market rate of gold and/or diamonds at the time of exchange, less applicable making charges as per our policy.</li>
                <li>The new piece&apos;s value must equal or exceed the exchange value of your returned piece; the balance is payable at the prevailing rate.</li>
                <li>Solitaire and certified diamond pieces are valued based on the current stone market plus the gold value.</li>
                <li>Exchange is available at our Jaipur showroom; for online orders, our concierge team will guide you through the process.</li>
                <li>Worn or altered pieces are still eligible for exchange — this is our commitment to you for life.</li>
              </ul>
            </div>
          </section>

          <section id="purity" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">8. Purity Guarantee</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                Every gold piece we sell carries BIS Hallmark certification with a unique HUID
                number, and diamond pieces are accompanied by GIA or IGI certificates. As an
                additional assurance:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>If an independent certified purity test ever shows a shortfall against the hallmark on a piece purchased from us, we will rectify the piece or refund its full value, at our discretion.</li>
                <li>This guarantee covers the gold purity and the authenticity of certified stones as documented at the time of sale.</li>
              </ul>
            </div>
          </section>

          <section id="buyback" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">9. Buyback</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                We buy back gold jewellery — whether purchased from us or elsewhere — at prevailing
                market rates. The buyback value is calculated at the showroom on the day of the
                transaction, based on current gold rates and the actual weight and purity of the
                piece, less applicable deductions. Payment is made immediately at the showroom.
              </p>
            </div>
          </section>

          <section id="damaged" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">10. Damaged or Defective Items</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                If your order arrives damaged, or a piece has a manufacturing defect, please report
                it within 48 hours of delivery with photographs (see our Shipping Policy, Section 9).
                We will arrange a replacement, repair or full refund — including all shipping
                charges — as appropriate. Manufacturing defects are covered at no cost to you.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-24 emerald-glass rounded-none border border-[#c9a96a]/25 p-6 sm:p-8">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-4">11. Contact Us</h2>
            <p className="text-[#a79e8e] text-sm leading-relaxed mb-5">
              To initiate a return, request an exchange, or ask any question, our concierge team is
              here for you:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c9a96a] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#f4eee3] font-semibold mb-0.5">Showroom</p>
                  <p className="text-[#a79e8e] text-xs leading-relaxed">
                    {SHOWROOM_DETAILS.address},<br />
                    {SHOWROOM_DETAILS.cityStatePincode}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#c9a96a] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#f4eee3] font-semibold mb-0.5">Phone / WhatsApp</p>
                  {SHOWROOM_DETAILS.phone.map((ph) => (
                    <a key={ph} href={`tel:${ph}`} className="block text-[#a79e8e] text-xs hover:text-[#c9a96a] transition-colors">
                      {ph}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#c9a96a] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#f4eee3] font-semibold mb-0.5">Email</p>
                  <a
                    href={`mailto:${SHOWROOM_DETAILS.email}`}
                    className="text-[#a79e8e] text-xs hover:text-[#c9a96a] transition-colors"
                  >
                    {SHOWROOM_DETAILS.email}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <p className="mt-12 pt-6 border-t border-[#f4eee3]/10 text-xs text-[#7f786c] text-center">
          © 1984 – {new Date().getFullYear()} Jain Jewells, Jaipur. All Rights Reserved.
        </p>
      </div>
    </main>
  );
}