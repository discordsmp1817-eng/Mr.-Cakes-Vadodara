import { useEffect, useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Star,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/bakeryData';
import { validateEnquiryForm, type CakeEnquiryInput } from '../utils/validation';
import { buildWhatsAppEnquiryUrl, buildWhatsAppGeneralUrl } from '../utils/whatsapp';

interface ContactPageProps {
  prefilledCakeType?: string;
}

const CAKE_TYPE_OPTIONS = [
  'Birthday Cake',
  'Chocolate Cake',
  'Designer Cake',
  'Anniversary Cake',
  'Photo Cake',
  'Pastries & Desserts',
  'Special Occasion Cake',
];

const OCCASION_OPTIONS = [
  'Birthday',
  'Anniversary',
  'Engagement / Wedding',
  'Baby Shower',
  'Corporate / Milestone',
  'Family Gathering',
  'Other Celebration',
];

const FLAVOUR_OPTIONS = [
  'Belgian Chocolate',
  'Chocolate Truffle',
  'Black Forest',
  'Red Velvet',
  'Butterscotch',
  'Pineapple',
  'Strawberry',
  'Custom / Discuss on WhatsApp',
];

const SIZE_OPTIONS = [
  '0.5 kg',
  '1 kg',
  '1.5 kg',
  '2 kg',
  '3 kg+',
  'Multi-Tier / Custom',
  'Not Sure — Recommend Size',
];

export function ContactPage({ prefilledCakeType }: ContactPageProps) {
  const [formData, setFormData] = useState<CakeEnquiryInput>({
    fullName: '',
    phone: '',
    email: '',
    cakeType: prefilledCakeType || '',
    occasion: '',
    preferredFlavour: '',
    cakeSize: '',
    deliveryDate: '',
    instructions: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CakeEnquiryInput, string>>>({});
  const [readyEnquiry, setReadyEnquiry] = useState<CakeEnquiryInput | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefilledCakeType) {
      setFormData((prev) => ({
        ...prev,
        cakeType: prefilledCakeType,
      }));
    }
  }, [prefilledCakeType]);

  const updateField = (field: keyof CakeEnquiryInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      setReadyEnquiry(null);
      return;
    }

    setErrors({});
    setReadyEnquiry({ ...formData });
  };

  const handleCopySummary = async () => {
    if (!readyEnquiry) return;
    const summaryText = [
      `Cake Enquiry for ${BUSINESS_INFO.name}`,
      `Name: ${readyEnquiry.fullName}`,
      `Phone: ${readyEnquiry.phone}`,
      readyEnquiry.email ? `Email: ${readyEnquiry.email}` : null,
      `Cake Type: ${readyEnquiry.cakeType}`,
      `Occasion: ${readyEnquiry.occasion}`,
      readyEnquiry.preferredFlavour ? `Flavour: ${readyEnquiry.preferredFlavour}` : null,
      readyEnquiry.cakeSize ? `Preferred Size: ${readyEnquiry.cakeSize}` : null,
      `Required Date: ${readyEnquiry.deliveryDate}`,
      readyEnquiry.instructions ? `Instructions: ${readyEnquiry.instructions}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-[#FFF8F0]">
      {/* Page Header */}
      <section className="border-b border-[#35221B]/10 bg-[#F4E9DA]/55 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C58A4A]">
            Contact &amp; Cake Enquiry
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[#35221B] sm:text-5xl text-balance">
            Order Your Celebration Cake
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#80695C]">
            Share your cake requirements below to prepare your instant WhatsApp enquiry, or reach
            our New VIP Road, Vadodara bakery directly by phone.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Column: Verified Business Details & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-[#35221B]/10 bg-[#FFFDF9] p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[#35221B]">
                    {BUSINESS_INFO.name}
                  </h2>
                  <div className="mt-2 flex items-center gap-2 text-sm text-[#603B2B]">
                    <Star className="h-4 w-4 fill-[#C58A4A] text-[#C58A4A]" aria-hidden="true" />
                    <span className="font-semibold tabular-nums">{BUSINESS_INFO.rating}/5</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {BUSINESS_INFO.reviewCount} Customer Reviews on Google
                    </span>
                  </div>
                </div>

                <div className="space-y-4 border-t border-[#35221B]/10 pt-5 text-sm text-[#603B2B]">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#C58A4A]" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#80695C]">
                        Phone &amp; WhatsApp
                      </p>
                      <a
                        href={BUSINESS_INFO.phoneTel}
                        className="mt-0.5 inline-block text-base font-semibold text-[#35221B] hover:text-[#C58A4A] tabular-nums"
                      >
                        {BUSINESS_INFO.phoneRaw}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C58A4A]" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#80695C]">
                        Bakery Address
                      </p>
                      <address className="mt-0.5 not-italic leading-relaxed text-[#603B2B]">
                        {BUSINESS_INFO.fullAddress}
                      </address>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row pt-2">
                  <a
                    href={buildWhatsAppGeneralUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-chocolate inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Quick WhatsApp</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-espresso inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap"
                  >
                    <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#35221B]/10 bg-[#F4E9DA] shadow-sm">
                <iframe
                  title="Mr. Cakes Vadodara Location Map"
                  src={BUSINESS_INFO.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              </div>
            </div>

            {/* Right Column: Validated Enquiry Form + WhatsApp Handoff */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#35221B]/10 bg-[#FFFDF9] p-6 sm:p-9 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#35221B]">
                    Cake Enquiry Details
                  </h2>
                  <p className="mt-1.5 text-sm text-[#80695C]">
                    Complete the details below to generate a ready-to-send WhatsApp enquiry with our
                    bakery team.
                  </p>
                </div>

                {readyEnquiry ? (
                  <div
                    role="status"
                    className="space-y-6 rounded-xl border border-[#C58A4A]/40 bg-[#FFF8F0] p-6"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C58A4A]">
                        Enquiry Ready to Send
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-[#35221B]">
                        Send Your Cake Request on WhatsApp
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#603B2B]">
                        Because this website operates without an automated email server, your
                        enquiry has not been auto-emailed yet. Click below to send these exact
                        details directly to Mr. Cakes Vadodara ({BUSINESS_INFO.phoneRaw}) on
                        WhatsApp.
                      </p>
                    </div>

                    <dl className="grid grid-cols-1 gap-3 border-y border-[#35221B]/10 py-4 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-xs text-[#80695C]">Full Name</dt>
                        <dd className="font-medium text-[#35221B]">{readyEnquiry.fullName}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#80695C]">Phone Number</dt>
                        <dd className="font-medium text-[#35221B] tabular-nums">
                          {readyEnquiry.phone}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#80695C]">Cake Type</dt>
                        <dd className="font-medium text-[#35221B]">{readyEnquiry.cakeType}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#80695C]">Occasion</dt>
                        <dd className="font-medium text-[#35221B]">{readyEnquiry.occasion}</dd>
                      </div>
                      {readyEnquiry.preferredFlavour && (
                        <div>
                          <dt className="text-xs text-[#80695C]">Preferred Flavour</dt>
                          <dd className="font-medium text-[#35221B]">
                            {readyEnquiry.preferredFlavour}
                          </dd>
                        </div>
                      )}
                      {readyEnquiry.cakeSize && (
                        <div>
                          <dt className="text-xs text-[#80695C]">Preferred Size / Weight</dt>
                          <dd className="font-medium text-[#35221B]">{readyEnquiry.cakeSize}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-xs text-[#80695C]">Required Delivery Date</dt>
                        <dd className="font-medium text-[#35221B] tabular-nums">
                          {readyEnquiry.deliveryDate}
                        </dd>
                      </div>
                      {readyEnquiry.email && (
                        <div>
                          <dt className="text-xs text-[#80695C]">Email</dt>
                          <dd className="font-medium text-[#35221B]">{readyEnquiry.email}</dd>
                        </div>
                      )}
                      {readyEnquiry.instructions && (
                        <div className="sm:col-span-2">
                          <dt className="text-xs text-[#80695C]">Additional Instructions</dt>
                          <dd className="font-medium text-[#35221B]">{readyEnquiry.instructions}</dd>
                        </div>
                      )}
                    </dl>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a
                        href={buildWhatsAppEnquiryUrl(readyEnquiry)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#256D46] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1E5939] whitespace-nowrap"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Send via WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="btn-outline-espresso inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-[#256D46]" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" aria-hidden="true" />
                            <span>Copy Details</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setReadyEnquiry(null)}
                        className="btn-outline-espresso inline-flex min-h-[46px] items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap"
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="enquiry-fullName"
                          className="mb-1.5 block text-sm font-medium text-[#35221B]"
                        >
                          Full Name <span className="text-[#9E2A2B]">*</span>
                        </label>
                        <input
                          id="enquiry-fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          placeholder="Your full name"
                          aria-invalid={Boolean(errors.fullName)}
                          aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                          className={`h-11 w-full rounded-xl border bg-[#FFF8F0]/50 px-3.5 text-sm text-[#35221B] placeholder:text-[#80695C]/65 focus:outline-none ${
                            errors.fullName
                              ? 'border-[#9E2A2B] focus:border-[#9E2A2B]'
                              : 'border-[#35221B]/18 focus:border-[#C58A4A]'
                          }`}
                        />
                        {errors.fullName && (
                          <p id="error-fullName" className="mt-1 text-xs text-[#9E2A2B]">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="enquiry-phone"
                          className="mb-1.5 block text-sm font-medium text-[#35221B]"
                        >
                          Phone Number <span className="text-[#9E2A2B]">*</span>
                        </label>
                        <input
                          id="enquiry-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="10-digit mobile number"
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'error-phone' : undefined}
                          className={`h-11 w-full rounded-xl border bg-[#FFF8F0]/50 px-3.5 text-sm text-[#35221B] placeholder:text-[#80695C]/65 focus:outline-none tabular-nums ${
                            errors.phone
                              ? 'border-[#9E2A2B] focus:border-[#9E2A2B]'
                              : 'border-[#35221B]/18 focus:border-[#C58A4A]'
                          }`}
                        />
                        {errors.phone && (
                          <p id="error-phone" className="mt-1 text-xs text-[#9E2A2B]">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label
                          htmlFor="enquiry-email"
                          className="mb-1.5 block text-sm font-medium text-[#35221B]"
                        >
                          Email Address <span className="text-xs text-[#80695C]">(Optional)</span>
                        </label>
                        <input
                          id="enquiry-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="you@example.com"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'error-email' : undefined}
                          className={`h-11 w-full rounded-xl border bg-[#FFF8F0]/50 px-3.5 text-sm text-[#35221B] placeholder:text-[#80695C]/65 focus:outline-none ${
                            errors.email
                              ? 'border-[#9E2A2B] focus:border-[#9E2A2B]'
                              : 'border-[#35221B]/18 focus:border-[#C58A4A]'
                          }`}
                        />
                        {errors.email && (
                          <p id="error-email" className="mt-1 text-xs text-[#9E2A2B]">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Cake Type */}
                      <div>
                        <label
                          htmlFor="enquiry-cakeType"
                          className="mb-1.5 block text-sm font-medium text-[#35221B]"
                        >
                          Cake Type <span className="text-[#9E2A2B]">*</span>
                        </label>
                        <select
                          id="enquiry-cakeType"
                          value={
                            CAKE_TYPE_OPTIONS.includes(formData.cakeType) || formData.cakeType === ''
                              ? formData.cakeType
                              : 'custom-prefilled'
                          }
                          onChange={(e) => updateField('cakeType', e.target.value)}
                          aria-invalid={Boolean(errors.cakeType)}
                          aria-describedby={errors.cakeType ? 'error-cakeType' : undefined}
                          className={`h-11 w-full rounded-xl border bg-[#FFF8F0]/50 px-3.5 text-sm text-[#35221B] focus:outline-none ${
                            errors.cakeType
                              ? 'border-[#9E2A2B] focus:border-[#9E2A2B]'
                              : 'border-[#35221B]/18 focus:border-[#C58A4A]'
                          }`}
                        >
                          <option value="">Select cake type</option>
                          {formData.cakeType && !CAKE_TYPE_OPTIONS.includes(formData.cakeType) && (
                            <option value="custom-prefilled">{formData.cakeType}</option>
                          )}
                          {CAKE_TYPE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors.cakeType && (
                          <p id="error-cakeType" className="mt-1 text-xs text-[#9E2A2B]">
                            {errors.cakeType}
                          </p>
                        )}
                      </div>

                      {/* Occasion */}
                      <div>
                        <label
                          htmlFor="enquiry-occasion"
                          className="mb-1.5 block text-sm font-medium text-[#35221B]"
                        >
                          Occasion <span className="text-[#9E2A2B]">*</span>
                        </label>
                        <select
                          id="enquiry-occasion"
                          value={formData.occasion}
                          onChange={(e) => updateField('occasion', e.target.value)}
                          aria-invalid={Boolean(errors.occasion)}
                          aria-describedby={errors.occasion ? 'error-occasion' : undefined}
                          className={`h-11 w-full rounded-xl border bg-[#FFF8F0]/50 px-3.5 text-sm text-[#35221B] focus:outline-none ${
                            errors.occasion
                              ? 'border-[#9E2A2B] focus:border-[#9E2A2B]'
                              : 'border-[#35221B]/18 focus:border-[#C58A4A]'
                          }`}
                        >
                          <option value="">Select occasion</option>
                          {OCCASION_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors.occasion && (
                          <p id="error-occasion" className="mt-1 text-xs text-[#9E2A2B]">
                            {errors.occasion}
                          </p>
                        )}
                      </div>

                      {/* Preferred Flavour */}
                      <div>
                        <label
                          htmlFor="enquiry-flavour"
                          className="mb-1.5 block text-sm font-medium text-[#35221B]"
                        >
                          Preferred Flavour
                        </label>
                        <select
                          id="enquiry-flavour"
                          value={formData.preferredFlavour}
                          onChange={(e) => updateField('preferredFlavour', e.target.value)}
                          className="h-11 w-full rounded-xl border border-[#35221B]/18 bg-[#FFF8F0]/50 px-3.5 text-sm text-[#35221B] focus:border-[#C58A4A] focus:outline-none"
                        >
                          <option value="">Select flavour preference</option>
                          {FLAVOUR_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Cake Size / Weight */}
                      <div>
                        <label
                          htmlFor="enquiry-size"
                          className="mb-1.5 block text-sm font-medium text-[#35221B]"
                        >
                          Cake Size / Weight
                        </label>
                        <select
                          id="enquiry-size"
                          value={formData.cakeSize}
                          onChange={(e) => updateField('cakeSize', e.target.value)}
                          className="h-11 w-full rounded-xl border border-[#35221B]/18 bg-[#FFF8F0]/50 px-3.5 text-sm text-[#35221B] focus:border-[#C58A4A] focus:outline-none"
                        >
                          <option value="">Select preferred size</option>
                          {SIZE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Required Delivery Date */}
                      <div>
                        <label
                          htmlFor="enquiry-deliveryDate"
                          className="mb-1.5 block text-sm font-medium text-[#35221B]"
                        >
                          Required Delivery Date <span className="text-[#9E2A2B]">*</span>
                        </label>
                        <input
                          id="enquiry-deliveryDate"
                          type="date"
                          value={formData.deliveryDate}
                          onChange={(e) => updateField('deliveryDate', e.target.value)}
                          aria-invalid={Boolean(errors.deliveryDate)}
                          aria-describedby={errors.deliveryDate ? 'error-deliveryDate' : undefined}
                          className={`h-11 w-full rounded-xl border bg-[#FFF8F0]/50 px-3.5 text-sm text-[#35221B] focus:outline-none tabular-nums ${
                            errors.deliveryDate
                              ? 'border-[#9E2A2B] focus:border-[#9E2A2B]'
                              : 'border-[#35221B]/18 focus:border-[#C58A4A]'
                          }`}
                        />
                        {errors.deliveryDate && (
                          <p id="error-deliveryDate" className="mt-1 text-xs text-[#9E2A2B]">
                            {errors.deliveryDate}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Additional Instructions */}
                    <div>
                      <label
                        htmlFor="enquiry-instructions"
                        className="mb-1.5 block text-sm font-medium text-[#35221B]"
                      >
                        Additional Instructions
                      </label>
                      <textarea
                        id="enquiry-instructions"
                        rows={4}
                        value={formData.instructions}
                        onChange={(e) => updateField('instructions', e.target.value)}
                        placeholder="Share cake message lettering, colour theme, photo cake notes, or preferred pickup/delivery timing..."
                        className="w-full rounded-xl border border-[#35221B]/18 bg-[#FFF8F0]/50 p-3.5 text-sm text-[#35221B] placeholder:text-[#80695C]/65 focus:border-[#C58A4A] focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                      <button
                        type="submit"
                        className="btn-chocolate inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg px-7 py-3 text-sm font-medium whitespace-nowrap"
                      >
                        <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Send Cake Enquiry</span>
                      </button>

                      <a
                        href={buildWhatsAppGeneralUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#603B2B] hover:text-[#C58A4A] transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 text-[#256D46]" aria-hidden="true" />
                        <span>Or chat directly on WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
