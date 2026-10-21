/**
 * AV Corporate giftings & events Product Catalog Data Contracts
 * Strict TypeScript types for centralized product data and categories.
 */

export type BrandingMethod =
  | 'Laser Engraving'
  | 'Debossing'
  | 'Screen Printing'
  | 'UV Printing'
  | 'UV Full Color Printing'
  | 'Sublimation';

export type ProductColorVariant = {
  name: string;
  hex?: string;
  image?: string;
  isAvailable?: boolean;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductImageSet = {
  hero: string;
  gallery: string[];
  thumbnail: string;
  sourceAssetIds?: string[];
  requiresManualReview?: boolean;
};

export type Product = {
  /** Stable unique internal identifier, e.g. "pix-033" */
  id: string;
  /** Primary catalog code / SKU, e.g. "PIX-033" */
  sku: string;
  /** Normalized human-readable product title */
  name: string;
  /** Original literal title as printed in the catalog */
  originalCatalogName: string;
  /** Unique URL-friendly slug */
  slug: string;
  /** Category display name */
  category: string;
  /** Canonical category slug */
  categorySlug: string;
  /** Primary catalog source page number (1-60) */
  sourcePage: number;
  /** Verifiable product description synthesized from catalog copy */
  description: string;
  /** Primary material, e.g. "SUS 304 Food Grade Stainless Steel", "201 Steel", "Natural Bamboo" */
  material: string;
  /** Product volume, dimensions, or capacity (e.g. "500ml", "208 Pages", "Universal") */
  capacity: string | null;
  /** Documented thermal retention performance (e.g. "Hot and Cold up to 12 Hours") */
  thermalPerformance: string | null;
  /** Documented lid or closure type */
  lidType: string | null;
  /** Verifiable features extracted directly from source */
  features: string[];
  /** Structured technical specifications table */
  specs: ProductSpecification[];
  /** Color, finish, or material variants */
  variants: ProductColorVariant[];
  /** Documented branding/printing methods explicitly supported */
  brandingMethods: BrandingMethod[];
  /** Mapped images referencing verified local public assets */
  images: ProductImageSet;
  /** Material and functional tags derived strictly from catalog evidence */
  tags: string[];
  /** Cross-sell references by SKU */
  relatedSkus: string[];
  /** Documented minimum order quantity, null if not provided in source */
  moq: number | null;
  /** List price or wholesale price, null if not provided in source */
  price: number | null;
  /** Data quality warnings, ambiguous specifications, or catalog anomalies */
  dataWarnings: string[];
  /** Flags whether this product entry has unresolved ambiguity */
  isAmbiguous: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  startPage: number;
  endPage: number;
  itemCount: number;
  description: string;
  heroImage?: string;
};

export type CatalogValidationSummary = {
  timestamp: string;
  totalCatalogEntries: number;
  totalUniqueModels: number;
  totalCategories: number;
  totalVariants: number;
  totalImagesMapped: number;
  productsRequiringImageReview: number;
  productsWithDataWarnings: number;
  isPassed: boolean;
};
