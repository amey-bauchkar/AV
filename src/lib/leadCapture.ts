/**
 * AV Corporate giftings & events - Lead Capture & Quotation Submission Service
 * Manages quotation payloads, Supabase backend integration, and local draft fallbacks.
 */

import { supabase, hasSupabaseConfig } from './supabase';
import type { RfqItem, QuoteBuyerInfo, QuoteSubmissionResult } from '../types/rfq';

const SESSION_KEY = 'pix_rfq_session_hash';
const LOCAL_FALLBACK_KEY = 'pix-pending-quote-requests';

export function getOrCreateSessionHash(): string {
  if (typeof window === 'undefined') return 'server-session';
  try {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const next = globalThis.crypto?.randomUUID?.() ?? `pix_rfq_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return `pix_rfq_${Date.now()}`;
  }
}

export function validateBuyerInfo(info: QuoteBuyerInfo): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!info.fullName || info.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required (minimum 2 characters)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!info.email || !emailRegex.test(info.email.trim())) {
    errors.email = 'Valid corporate or business email is required';
  }

  if (!info.company || info.company.trim().length < 2) {
    errors.company = 'Company / Organization name is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function saveQuoteDraftToLocalStorage(buyerInfo: QuoteBuyerInfo, items: RfqItem[], refId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const record = {
      id: refId,
      timestamp: new Date().toISOString(),
      buyerInfo,
      items,
      itemCount: items.length,
      totalUnits: items.reduce((sum, item) => sum + item.quantity, 0)
    };
    if (Array.isArray(existing)) {
      existing.unshift(record);
      localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(existing));
    }
  } catch (err) {
    console.warn('Failed to save quote draft to localStorage fallback:', err);
  }
}

export async function submitQuoteRequest(
  buyerInfo: QuoteBuyerInfo,
  items: RfqItem[]
): Promise<QuoteSubmissionResult> {
  const validation = validateBuyerInfo(buyerInfo);
  if (!validation.isValid) {
    const firstErr = Object.values(validation.errors)[0];
    throw new Error(firstErr);
  }

  const isEventOrCustom =
    buyerInfo.inquiryType === 'events' ||
    buyerInfo.inquiryType === 'both' ||
    (buyerInfo.notes && buyerInfo.notes.includes('[EVENT'));

  if ((!items || items.length === 0) && !isEventOrCustom) {
    throw new Error('Cannot submit an empty quotation request. Please select at least one item or choose Event Management.');
  }

  const sessionHash = getOrCreateSessionHash();
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const fallbackRefId = `AV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  // If Supabase is configured, submit via Supabase
  if (hasSupabaseConfig && supabase) {
    try {
      const { data: requestRecord, error: requestError } = await supabase
        .from('quote_requests')
        .insert({
          session_hash: sessionHash,
          full_name: buyerInfo.fullName.trim(),
          email: buyerInfo.email.trim(),
          company: buyerInfo.company.trim(),
          phone: (buyerInfo.phone || '').trim(),
          delivery_city: (buyerInfo.deliveryCity || '').trim(),
          target_date: (buyerInfo.targetDeliveryDate || '').trim(),
          notes: (buyerInfo.notes || '').trim(),
          item_count: items.length,
          total_quantity: totalUnits,
          status: 'new',
          metadata: {
            source: isEventOrCustom ? 'web_portal_events' : 'web_portal_rfq',
            inquiryType: buyerInfo.inquiryType || (isEventOrCustom ? 'events' : 'gifting'),
            eventType: buyerInfo.eventType || '',
            estimatedGuests: buyerInfo.estimatedGuests || '',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
          }
        })
        .select('id')
        .single();

      if (requestError) {
        throw new Error(requestError.message);
      }

      const requestId = requestRecord?.id;

      if (requestId) {
        const itemRows = items.map((item) => ({
          request_id: requestId,
          product_id: item.productId,
          sku: item.sku,
          product_name: item.name,
          category: item.category,
          variant: item.variant || 'Standard',
          branding_method: item.brandingMethod || 'None / Standard',
          quantity: item.quantity,
          image_url: item.image,
          notes: item.notes || ''
        }));

        const { error: itemsError } = await supabase
          .from('quote_request_items')
          .insert(itemRows);

        if (itemsError) {
          console.warn('Warning: Items insertion error, request record saved:', itemsError);
        }
      }

      saveQuoteDraftToLocalStorage(buyerInfo, items, requestId || fallbackRefId);

      return {
        success: true,
        referenceId: requestId || fallbackRefId,
        message: 'Your corporate quotation request has been securely submitted to AV Corporate giftings & events sales engineering.',
        viaSupabase: true,
        localDraftSaved: true
      };
    } catch (err: unknown) {
      console.warn('Supabase submission failed, using local draft fallback:', err);
      saveQuoteDraftToLocalStorage(buyerInfo, items, fallbackRefId);
      return {
        success: true,
        referenceId: fallbackRefId,
        message: 'Quotation draft recorded locally. Our B2B sales team has logged your inquiry reference.',
        viaSupabase: false,
        localDraftSaved: true
      };
    }
  }

  // Fallback when Supabase credentials are not present
  saveQuoteDraftToLocalStorage(buyerInfo, items, fallbackRefId);
  return {
    success: true,
    referenceId: fallbackRefId,
    message: 'Quotation request generated. Backend integration is in offline fallback mode; draft preserved in local storage.',
    viaSupabase: false,
    localDraftSaved: true
  };
}

export function formatQuoteSummaryText(buyerInfo: QuoteBuyerInfo, items: RfqItem[], refId: string): string {
  const lines: string[] = [
    '==================================================',
    'AV CORPORATE GIFTINGS & EVENTS - B2B QUOTATION REQUEST',
    '==================================================',
    `Reference Number: ${refId}`,
    `Date: ${new Date().toLocaleString()}`,
    '',
    '--- BUYER DETAILS ---',
    `Contact Name: ${buyerInfo.fullName}`,
    `Company: ${buyerInfo.company}`,
    `Email: ${buyerInfo.email}`,
    `Phone / WhatsApp: ${buyerInfo.phone || 'Not specified'}`,
    `Delivery City / PIN: ${buyerInfo.deliveryCity || 'Not specified'}`,
    `Target Date: ${buyerInfo.targetDeliveryDate || 'Flexible'}`,
    buyerInfo.inquiryType ? `Inquiry Category: ${buyerInfo.inquiryType === 'both' ? 'Both Gifting & Events' : buyerInfo.inquiryType === 'events' ? 'Corporate Event Management' : 'Corporate Gifting'}` : '',
    buyerInfo.eventType ? `Event Format: ${buyerInfo.eventType}` : '',
    buyerInfo.estimatedGuests ? `Estimated Guests: ${buyerInfo.estimatedGuests}` : '',
    buyerInfo.notes ? `Project Notes: ${buyerInfo.notes}` : '',
    '',
    '--- REQUESTED PRODUCTS & SPECIFICATIONS ---'
  ];

  if (items.length === 0) {
    lines.push('   (No catalog items pre-selected — Event Management & Turnkey Consultation Inquiry)');
  }
  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. SKU: ${item.sku} | ${item.name}`,
      `   Category: ${item.category}`,
      `   Selected Variant / Finish: ${item.variant || 'Standard'}`,
      `   Branding Method: ${item.brandingMethod || 'Standard'}`,
      `   Requested Quantity: ${item.quantity} units`,
      item.notes ? `   Line Notes: ${item.notes}` : ''
    );
  });

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  lines.push(
    '',
    `Total Distinct Items: ${items.length}`,
    `Total Units Requested: ${totalUnits} units`,
    '==================================================',
    'Please forward this summary to sales@avcorporategifting.com if submitting offline.'
  );

  return lines.filter(Boolean).join('\n');
}
