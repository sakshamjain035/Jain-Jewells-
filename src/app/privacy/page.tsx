import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Mail, Phone, MapPin, Database, Cookie } from "lucide-react";
import { SHOWROOM_DETAILS } from "@/data/jewelryData";

export const metadata: Metadata = {
  title: "Privacy Policy | Jain Jewells",
  description:
    "Read the Jain Jewells Privacy Policy to understand how we collect, use, protect and store your personal information when you use our website, book appointments or make purchases.",
};

const LAST_UPDATED = "September 8, 2026";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "collect", title: "2. Information We Collect" },
  { id: "use", title: "3. How We Use Your Information" },
  { id: "consent", title: "4. Consent & Legal Basis" },
  { id: "storage", title: "5. Storage, Cookies & Local Data" },
  { id: "sharing", title: "6. Sharing & Disclosure" },
  { id: "security", title: "7. Data Security" },
  { id: "retention", title: "8. Data Retention" },
  { id: "rights", title: "9. Your Rights & Choices" },
  { id: "children", title: "10. Children's Privacy" },
  { id: "links", title: "11. Third-Party Links" },
  { id: "changes", title: "12. Changes to This Policy" },
  { id: "contact", title: "13. Contact Us" },
];

export default function PrivacyPage() {
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
            <ShieldCheck className="w-6 h-6 text-[#c9a96a]" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#c9a96a]/80 font-semibold">
              Legal Policy
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-[#f4eee3]">
              Privacy Policy
            </h1>
          </div>
        </div>

        <p className="text-[#a79e8e] leading-relaxed max-w-3xl mb-12">
          At Jain Jewells, your privacy and the security of your personal information are of
          paramount importance to us. This Privacy Policy explains what information we collect when
          you visit our website, book an appointment, submit an inquiry or purchase from our
          showroom, how we use and protect that information, and the choices you have. By using
          this website, you consent to the practices described in this Policy.
        </p>

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
                Jain Jewells is a luxury jewellery showroom operating at {SHOWROOM_DETAILS.address},{" "}
                {SHOWROOM_DETAILS.cityStatePincode}. This Privacy Policy applies to information we
                collect through this website, through our showroom interactions, and through
                communication channels such as phone, email and WhatsApp.
              </p>
              <p>
                We process personal information in accordance with the Digital Personal Data
                Protection Act, 2023 of India and other applicable laws. This Policy may be
                supplemented by specific notices provided at the point of data collection.
              </p>
            </div>
          </section>

          <section id="collect" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">2. Information We Collect</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>We collect information that you provide directly to us, as well as information collected automatically when you use the website:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c9a96a]">Contact &amp; appointment details:</strong> When you book a VIP showroom visit, we collect your name, phone number, email address, preferred date and time, collection interest and any message you share.</li>
                <li><strong className="text-[#c9a96a]">Product inquiries:</strong> When you inquire about a piece, we collect your name, phone number, email address and the details of your inquiry.</li>
                <li><strong className="text-[#c9a96a]">Newsletter subscription:</strong> When you subscribe to daily gold rate alerts, we collect your email address.</li>
                <li><strong className="text-[#c9a96a]">Purchase records:</strong> When you purchase from us, we record the transaction details, billing information and certificates associated with your purchase.</li>
                <li><strong className="text-[#c9a96a]">Bespoke commission details:</strong> For custom-made pieces, we may collect your design preferences and measurements necessary to craft your piece.</li>
                <li><strong className="text-[#c9a96a]">Technical data:</strong> We may automatically collect basic technical information such as your device type, browser, approximate location and pages visited, to operate and improve the website.</li>
              </ul>
              <p>
                We do not collect sensitive financial information such as card numbers or bank
                credentials through this website; payments are processed through secure, regulated
                payment gateways.
              </p>
            </div>
          </section>

          <section id="use" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">3. How We Use Your Information</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>To confirm and manage your showroom appointments and follow up on your visit.</li>
                <li>To respond to your product inquiries and provide details, pricing and quotations.</li>
                <li>To process orders, prepare invoices and issue authenticity certificates.</li>
                <li>To keep you informed about your bespoke commission&apos;s progress.</li>
                <li>To send you daily gold rate alerts and updates about new collections and exclusive events — only if you have opted in, and you may opt out at any time.</li>
                <li>To maintain our internal records, improve our services, and comply with legal and regulatory obligations.</li>
              </ul>
              <p>
                We do not sell, rent or trade your personal information to third parties for their
                marketing purposes.
              </p>
            </div>
          </section>

          <section id="consent" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">4. Consent &amp; Legal Basis</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                By providing your personal information to us — whether through this website, in
                person at the showroom, or via phone, email or WhatsApp — you consent to its
                collection and use as described in this Policy. Where required by law, we obtain
                your explicit consent before sending marketing communications, and every such
                communication includes a simple way to withdraw consent.
              </p>
              <p>
                We process your information on one or more of the following lawful bases:
                performance of a contract (e.g. fulfilling an order or appointment), your consent
                (e.g. newsletters), our legitimate interests (e.g. improving our services), and
                compliance with legal obligations.
              </p>
            </div>
          </section>

          <section id="storage" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">5. Storage, Cookies &amp; Local Data</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <div className="flex items-start gap-3 emerald-glass rounded-none border border-[#c9a96a]/20 p-4">
                <Database className="w-5 h-5 text-[#c9a96a] shrink-0 mt-0.5" />
                <p>
                  Information submitted through appointment and inquiry forms is stored securely in
                  our database and is accessible only to authorised Jain Jewells staff for
                  concierge, fulfilment and record-keeping purposes.
                </p>
              </div>
              <div className="flex items-start gap-3 emerald-glass rounded-none border border-[#c9a96a]/20 p-4">
                <Cookie className="w-5 h-5 text-[#c9a96a] shrink-0 mt-0.5" />
                <p>
                  This website uses minimal local storage (such as your saved wishlist items and
                  admin session status) to remember your preferences on your own device. We do not
                  use intrusive third-party tracking cookies. Your browser settings allow you to
                  clear this local data at any time.
                </p>
              </div>
            </div>
          </section>

          <section id="sharing" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">6. Sharing &amp; Disclosure</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                We share your information only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c9a96a]">Service providers:</strong> Trusted partners who help us operate our business — such as courier companies for delivering insured jewellery, and secure payment gateways for processing payments. These partners are bound by confidentiality and may use your data only to perform their services.</li>
                <li><strong className="text-[#c9a96a]">Legal compliance:</strong> Where required by law, court order or a regulatory authority, we may disclose information to the extent necessary to comply.</li>
                <li><strong className="text-[#c9a96a]">Business protection:</strong> To protect our rights, property or safety, and that of our customers, against fraud or misuse.</li>
              </ul>
              <p>
                We do not share your information with advertisers or data brokers.
              </p>
            </div>
          </section>

          <section id="security" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">7. Data Security</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                We implement reasonable technical and organisational measures to protect your
                personal information against unauthorised access, alteration, disclosure or
                destruction, including access controls, secure connections and restricted staff
                access. While no method of transmission over the internet is completely secure, we
                continually review and strengthen our safeguards.
              </p>
              <p>
                The administrative areas of this website are protected by access controls and are
                accessible only to authorised personnel.
              </p>
            </div>
          </section>

          <section id="retention" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">8. Data Retention</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                We retain your personal information only for as long as necessary to fulfil the
                purposes described in this Policy, to honour our lifetime exchange and buyback
                commitments, and to comply with applicable legal, tax and accounting requirements
                (typically up to 8 years for purchase records in India). Appointment and inquiry
                records are retained for a shorter period and archived or deleted when no longer
                needed. When we no longer need your information, we securely delete or anonymise it.
              </p>
            </div>
          </section>

          <section id="rights" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">9. Your Rights &amp; Choices</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[#c9a96a]">Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong className="text-[#c9a96a]">Correction:</strong> Ask us to correct any inaccurate or incomplete information.</li>
                <li><strong className="text-[#c9a96a]">Erasure:</strong> Request deletion of your personal information, subject to legal retention obligations.</li>
                <li><strong className="text-[#c9a96a]">Opt-out:</strong> Unsubscribe from newsletters and rate alerts at any time using the link in any email, or by contacting us directly.</li>
                <li><strong className="text-[#c9a96a]">Withdraw consent:</strong> Withdraw any consent you have given for specific processing, without affecting the lawfulness of processing carried out before withdrawal.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us using the details in Section 13. We
                will respond within a reasonable timeframe (typically within 30 days) and may ask
                you to verify your identity to protect your information.
              </p>
            </div>
          </section>

          <section id="children" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">10. Children&apos;s Privacy</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                This website and our services are intended for individuals who are 18 years of age
                or older. We do not knowingly collect personal information from children. If you
                believe a child has provided us with personal information, please contact us and we
                will take steps to delete it promptly.
              </p>
            </div>
          </section>

          <section id="links" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">11. Third-Party Links</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                Our website may contain links to external services, such as WhatsApp, Google Maps
                or our social media pages. We are not responsible for the privacy practices or
                content of third-party websites. We encourage you to review the privacy policies of
                any external site you visit.
              </p>
            </div>
          </section>

          <section id="changes" className="scroll-mt-24">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-3">12. Changes to This Policy</h2>
            <div className="text-[#a79e8e] leading-relaxed space-y-3 text-sm">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our
                practices, technology or applicable law. The &ldquo;Last updated&rdquo; date at the
                top of this page indicates the latest revision. Material changes will be notified
                on this page. We encourage you to review this Policy periodically.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-24 emerald-glass rounded-none border border-[#c9a96a]/25 p-6 sm:p-8">
            <h2 className="text-2xl font-serif-luxury font-light text-[#c9a96a] mb-4">13. Contact Us</h2>
            <p className="text-[#a79e8e] text-sm leading-relaxed mb-5">
              If you have any questions about this Privacy Policy, or wish to exercise your data
              rights, our concierge team is happy to assist you:
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