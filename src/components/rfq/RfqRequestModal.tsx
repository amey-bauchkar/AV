import { useState } from 'react';
import { useRfqCart } from './useRfqCart';
import { submitQuoteRequest, formatQuoteSummaryText } from '../../lib/leadCapture';
import type { QuoteBuyerInfo, QuoteSubmissionResult } from '../../types/rfq';

type RfqRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RfqRequestModal({ isOpen, onClose }: RfqRequestModalProps) {
  const { items, clearCart } = useRfqCart();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<QuoteSubmissionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<QuoteBuyerInfo>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    deliveryCity: '',
    targetDeliveryDate: '',
    notes: ''
  });

  if (!isOpen) return null;

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToStep2 = () => {
    if (items.length === 0) {
      setErrorMessage('Please add at least one product before requesting a quote.');
      return;
    }
    setErrorMessage(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await submitQuoteRequest(formData, items);
      setSubmissionResult(result);
      clearCart();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during submission.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    if (!submissionResult) return;
    const text = formatQuoteSummaryText(formData, items, submissionResult.referenceId);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseAndReset = () => {
    setStep(1);
    setSubmissionResult(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfq-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-md)',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseAndReset();
      }}
    >
      <div
        data-lenis-prevent
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--space-xl)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-2xs)' }}>
              <span className="badge badge-accent">B2B QUOTATION ENGINE</span>
              <span className="badge badge-primary">STEP {step} OF 2</span>
            </div>
            <h2 id="rfq-modal-title" style={{ fontSize: '1.4rem' }}>
              {submissionResult
                ? 'Quotation Request Confirmed'
                : step === 1
                ? 'Review Quotation Line Items'
                : 'Corporate Buyer & Project Details'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseAndReset}
            aria-label="Close Quotation Form"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: 'var(--space-xs)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--space-xl)', flex: 1 }}>
          {submissionResult ? (
            <div style={{ textAlign: 'center', paddingBlock: 'var(--space-lg)' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-eco-soft)',
                  color: 'var(--color-eco)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginInline: 'auto',
                  marginBottom: 'var(--space-md)'
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h3 style={{ marginBottom: 'var(--space-xs)' }}>Thank You, {formData.fullName}!</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: 'var(--space-lg)' }}>
                {submissionResult.message}
              </p>

              <div
                style={{
                  backgroundColor: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-md)',
                  marginBottom: 'var(--space-xl)',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>REFERENCE ID</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {submissionResult.referenceId}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Company</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{formData.company}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Status</span>
                  <span className="badge badge-eco">
                    {submissionResult.viaSupabase ? 'Transmitted to Cloud' : 'Preserved Locally'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button type="button" onClick={handleCopySummary} className="btn btn-outline">
                  {copied ? 'Summary Copied to Clipboard ✓' : 'Copy Quote Summary'}
                </button>
                <button type="button" onClick={handleCloseAndReset} className="btn btn-primary">
                  Return to Catalog
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            <div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: 'var(--space-lg)' }}>
                Review your requested corporate gift items and customization specifications before submitting your quote request.
              </p>

              <div style={{ display: 'grid', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
                {items.map((item, idx) => (
                  <div
                    key={`${item.productId}-${idx}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-md)',
                      padding: 'var(--space-sm) var(--space-md)',
                      backgroundColor: 'var(--color-surface-2)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '56px',
                        height: '56px',
                        objectFit: 'contain',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: '#fff'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/products/placeholder-product.svg';
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                          {item.sku}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>• {item.category}</span>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Variant: <strong>{item.variant}</strong> | Branding: <strong>{item.brandingMethod}</strong>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                        {item.quantity}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>units</span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: 'var(--space-md)',
                  backgroundColor: 'var(--color-surface-3)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-xl)'
                }}
              >
                <span style={{ fontWeight: 600 }}>Total Requested Units</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {totalUnits} units ({items.length} line items)
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)' }}>
                <button type="button" onClick={handleCloseAndReset} className="btn btn-outline">
                  Back to Basket
                </button>
                <button type="button" onClick={handleProceedToStep2} className="btn btn-accent">
                  Continue to Buyer Details →
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div
                  style={{
                    padding: 'var(--space-sm) var(--space-md)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#DC2626',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-md)',
                    fontSize: '0.9rem'
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--space-2xs)' }}>
                    Contact Person Name <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: '100%',
                      padding: 'var(--space-sm)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--space-2xs)' }}>
                    Company / Organization <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Corp India"
                    style={{
                      width: '100%',
                      padding: 'var(--space-sm)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--space-2xs)' }}>
                    Work Email <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    style={{
                      width: '100%',
                      padding: 'var(--space-sm)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--space-2xs)' }}>
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91-9876543210"
                    style={{
                      width: '100%',
                      padding: 'var(--space-sm)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--space-2xs)' }}>
                    Delivery City & PIN (Optional)
                  </label>
                  <input
                    type="text"
                    name="deliveryCity"
                    value={formData.deliveryCity}
                    onChange={handleInputChange}
                    placeholder="e.g. Mumbai, 400001"
                    style={{
                      width: '100%',
                      padding: 'var(--space-sm)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--space-2xs)' }}>
                    Target Delivery Date (Optional)
                  </label>
                  <input
                    type="date"
                    name="targetDeliveryDate"
                    value={formData.targetDeliveryDate}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: 'var(--space-sm)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--space-2xs)' }}>
                  Custom Branding Notes / Special Project Instructions (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Specify logo placement, packaging needs, or specific employee welcome kit requests..."
                  style={{
                    width: '100%',
                    padding: 'var(--space-sm)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline" disabled={isSubmitting}>
                  ← Back to Review
                </button>
                <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting Quote Request...' : 'Submit Quotation Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
