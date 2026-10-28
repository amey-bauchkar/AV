/**
 * AV Corporate giftings & events - RFQ State & Quote Types
 */

import type { BrandingMethod } from './product';

export type RfqItem = {
  productId: string;
  sku: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  capacity?: string | null;
  material?: string;
  variant: string;
  brandingMethod: BrandingMethod | 'None / Standard';
  quantity: number;
  notes?: string;
};

export type QuoteBuyerInfo = {
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  deliveryCity?: string;
  targetDeliveryDate?: string;
  notes?: string;
  inquiryType?: 'gifting' | 'events' | 'both';
  eventType?: string;
  estimatedGuests?: string;
};

export type QuoteSubmissionResult = {
  success: boolean;
  referenceId: string;
  message: string;
  viaSupabase: boolean;
  localDraftSaved: boolean;
};
