/**
 * AV Corporate giftings & events - Owner Administration & Quote Management Service
 * Provides secure authentication, real-time Supabase quotation sync,
 * status workflows, CSV export, and instant buyer engagement links.
 */

import { supabase, hasSupabaseConfig } from './supabase';
import type { RfqItem, QuoteBuyerInfo } from '../types/rfq';

export type QuoteStatus = 'new' | 'reviewed' | 'quoted' | 'fulfilled' | 'archived';

export interface AdminQuoteItem {
  id?: number | string;
  request_id?: string;
  product_id: string;
  sku: string;
  product_name: string;
  category: string;
  variant?: string;
  branding_method?: string;
  quantity: number;
  image_url?: string;
  notes?: string;
  created_at?: string;
}

export interface AdminQuoteRecord {
  id: string;
  session_hash?: string;
  full_name: string;
  email: string;
  company: string;
  phone?: string;
  delivery_city?: string;
  target_date?: string;
  notes?: string;
  item_count: number;
  total_quantity: number;
  status: QuoteStatus;
  created_at: string;
  metadata?: Record<string, unknown>;
  quote_request_items?: AdminQuoteItem[];
  isLocalOnly?: boolean;
}

const DEFAULT_ADMIN_PASSWORD = 'pix@2026';
const STORAGE_CUSTOM_PASSWORD_KEY = 'pix_admin_master_password';
const SESSION_AUTH_KEY = 'pix_admin_session_active';
const LOCAL_FALLBACK_KEY = 'pix-pending-quote-requests';

/**
 * Authentication management
 */
export function getMasterPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_PASSWORD;
  return localStorage.getItem(STORAGE_CUSTOM_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
}

export function verifyAdminPassword(password: string): boolean {
  const current = getMasterPassword();
  return password.trim() === current.trim();
}

export function setMasterPassword(newPassword: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_CUSTOM_PASSWORD_KEY, newPassword.trim());
}

export function resetMasterPassword(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_CUSTOM_PASSWORD_KEY);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
}

export function loginAdmin(password: string): boolean {
  if (verifyAdminPassword(password)) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
    }
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
  }
}

/**
 * Fetch all quotes from Supabase and merge any unsynced local drafts
 */
export async function fetchAllQuotes(): Promise<AdminQuoteRecord[]> {
  const quotesMap = new Map<string, AdminQuoteRecord>();

  // 1. Fetch from Supabase if configured
  if (hasSupabaseConfig && supabase) {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*, quote_request_items(*)')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error:', error);
      } else if (Array.isArray(data)) {
        data.forEach((row: AdminQuoteRecord) => {
          quotesMap.set(row.id, {
            ...row,
            isLocalOnly: false
          });
        });
      }
    } catch (err) {
      console.warn('Failed to query Supabase quote_requests:', err);
    }
  }

  // 2. Load client localStorage drafts (in case of offline submissions)
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
      if (raw) {
        const localList = JSON.parse(raw);
        if (Array.isArray(localList)) {
          localList.forEach((item: {
            id: string;
            timestamp: string;
            buyerInfo: QuoteBuyerInfo;
            items: RfqItem[];
            itemCount: number;
            totalUnits: number;
          }) => {
            if (!quotesMap.has(item.id)) {
              // Convert local draft into AdminQuoteRecord format
              const formattedItems: AdminQuoteItem[] = (item.items || []).map((it) => ({
                product_id: it.productId,
                sku: it.sku,
                product_name: it.name,
                category: it.category,
                variant: it.variant,
                branding_method: it.brandingMethod,
                quantity: it.quantity,
                image_url: it.image,
                notes: it.notes
              }));

              quotesMap.set(item.id, {
                id: item.id,
                full_name: item.buyerInfo?.fullName || 'Anonymous Buyer',
                email: item.buyerInfo?.email || 'N/A',
                company: item.buyerInfo?.company || 'N/A',
                phone: item.buyerInfo?.phone || '',
                delivery_city: item.buyerInfo?.deliveryCity || '',
                target_date: item.buyerInfo?.targetDeliveryDate || '',
                notes: item.buyerInfo?.notes || '',
                item_count: item.itemCount || (item.items ? item.items.length : 0),
                total_quantity: item.totalUnits || (item.items ? item.items.reduce((s, i) => s + i.quantity, 0) : 0),
                status: 'new',
                created_at: item.timestamp || new Date().toISOString(),
                quote_request_items: formattedItems,
                isLocalOnly: true
              });
            }
          });
        }
      }
    } catch (err) {
      console.warn('Error reading local quote drafts:', err);
    }
  }

  // Return sorted by date (newest first)
  return Array.from(quotesMap.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * Update quote status in Supabase
 */
export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<boolean> {
  if (hasSupabaseConfig && supabase) {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.warn('Failed to update quote status in Supabase:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Error updating status:', err);
      return false;
    }
  }
  return true;
}

/**
 * Delete a quote request
 */
export async function deleteQuoteRecord(id: string): Promise<boolean> {
  let success = true;

  if (hasSupabaseConfig && supabase) {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Failed to delete quote in Supabase:', error);
        success = false;
      }
    } catch (err) {
      console.warn('Error deleting quote:', err);
      success = false;
    }
  }

  // Also remove from local fallback if present
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
      if (raw) {
        const localList = JSON.parse(raw);
        if (Array.isArray(localList)) {
          const filtered = localList.filter((item: { id: string }) => item.id !== id);
          localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(filtered));
        }
      }
    } catch {
      // ignore
    }
  }

  return success;
}

/**
 * Clean phone number and generate WhatsApp direct link
 */
export function generateWhatsAppLink(
  rawPhone: string | undefined,
  buyerName: string,
  refId: string,
  company: string,
  totalUnits: number
): string | null {
  if (!rawPhone) return null;
  const digitsOnly = rawPhone.replace(/\D/g, '');
  if (!digitsOnly || digitsOnly.length < 8) return null;

  // If 10 digits (India domestic), prepend 91
  const cleanNumber = digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly;

  const shortRef = refId.slice(0, 8).toUpperCase();
  const message = [
    `Namaste ${buyerName},`,
    `Thank you for your quotation inquiry with AV Corporate giftings & events regarding Ref #${shortRef}.`,
    `We have reviewed your inquiry for ${totalUnits} units for ${company}.`,
    `We would be pleased to share the commercial pricing slab, branding mockups, and estimated production turnaround with you.`,
    `AV Corporate giftings & events | B2B Commercial Desk`
  ].join('\n\n');

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate corporate mailto link
 */
export function generateEmailLink(
  email: string,
  buyerName: string,
  refId: string,
  company: string,
  totalUnits: number
): string {
  const shortRef = refId.slice(0, 8).toUpperCase();
  const subject = `AV Corporate giftings & events Quotation Slab - Ref #${shortRef} - ${company}`;
  const body = [
    `Dear ${buyerName},`,
    '',
    `Thank you for requesting a corporate quotation from AV Corporate giftings & events for ${company}.`,
    `We have received your requested batch of ${totalUnits} units with custom corporate branding.`,
    '',
    `Please find our commercial quote and production timelines attached.`,
    '',
    `Best regards,`,
    `Commercial Sales Desk`,
    `AV Corporate giftings & events | B2B Division`,
    `Direct: +91 98200 12345 | sales@avcorporategifting.com`
  ].join('\n');

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Format complete quote dossier to clipboard text
 */
export function formatFullDossierText(quote: AdminQuoteRecord): string {
  const items = quote.quote_request_items || [];
  const lines: string[] = [
    '==================================================',
    'AV CORPORATE GIFTINGS & EVENTS - B2B COMMERCIAL QUOTATION DOSSIER',
    '==================================================',
    `Quotation ID: ${quote.id}`,
    `Submitted Date: ${new Date(quote.created_at).toLocaleString()}`,
    `Pipeline Status: ${quote.status.toUpperCase()}`,
    '',
    '--- CLIENT & BUYER PROFILE ---',
    `Contact Person: ${quote.full_name}`,
    `Organization / Company: ${quote.company}`,
    `Corporate Email: ${quote.email}`,
    `Phone / WhatsApp: ${quote.phone || 'Not provided'}`,
    `Delivery Destination: ${quote.delivery_city || 'Not provided'}`,
    `Required Delivery Date: ${quote.target_date || 'Flexible'}`,
    quote.notes ? `Buyer Project Notes: ${quote.notes}` : '',
    '',
    `--- REQUESTED LINE ITEMS (${items.length} SKUs, ${quote.total_quantity} TOTAL UNITS) ---`
  ];

  items.forEach((item, index) => {
    lines.push(
      `[${index + 1}] ${item.product_name} (SKU: ${item.sku})`,
      `    Category: ${item.category}`,
      `    Variant: ${item.variant || 'Standard'}`,
      `    Branding Technique: ${item.branding_method || 'Standard'}`,
      `    Quantity: ${item.quantity} units`,
      item.notes ? `    Customization Note: ${item.notes}` : ''
    );
  });

  lines.push(
    '',
    '==================================================',
    'Generated via AV Corporate giftings & events Owner Admin Portal'
  );

  return lines.filter(Boolean).join('\n');
}

/**
 * Export all quotes to an Excel-compatible CSV file
 */
export function exportQuotesToCSV(quotes: AdminQuoteRecord[]): void {
  if (typeof window === 'undefined' || quotes.length === 0) return;

  const headers = [
    'Quote ID',
    'Submitted At',
    'Status',
    'Buyer Full Name',
    'Company',
    'Email',
    'Phone',
    'Delivery City',
    'Target Date',
    'Total Units',
    'Item Count',
    'Requested SKUs & Quantities',
    'Buyer Notes'
  ];

  const escapeCSV = (val: unknown): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = quotes.map((q) => {
    const itemsSummary = (q.quote_request_items || [])
      .map((i) => `${i.sku} (${i.product_name}) x ${i.quantity} [${i.branding_method || 'Std'}]`)
      .join('; ');

    return [
      escapeCSV(q.id),
      escapeCSV(new Date(q.created_at).toISOString()),
      escapeCSV(q.status),
      escapeCSV(q.full_name),
      escapeCSV(q.company),
      escapeCSV(q.email),
      escapeCSV(q.phone || ''),
      escapeCSV(q.delivery_city || ''),
      escapeCSV(q.target_date || ''),
      escapeCSV(q.total_quantity),
      escapeCSV(q.item_count),
      escapeCSV(itemsSummary),
      escapeCSV(q.notes || '')
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `pix-quotes-export-${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
