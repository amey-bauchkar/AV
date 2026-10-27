import type { Product } from '../types/product';

/**
 * Loads an image from a URL and converts it into a base64 Data URL.
 * Returns null if the image cannot be loaded or converted.
 */
async function getBase64ImageFromUrl(url: string): Promise<{ dataUrl: string; width: number; height: number } | null> {
  if (typeof window === 'undefined') return null;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 400;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve({ dataUrl, width: canvas.width, height: canvas.height });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

async function getBase64PngFromUrl(url: string): Promise<{ dataUrl: string; width: number; height: number } | null> {
  if (typeof window === 'undefined') return null;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 400;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        resolve({ dataUrl, width: canvas.width, height: canvas.height });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/**
 * Generates and downloads a clean, professional PDF Product Specification & Enquiry Sheet
 * using verified catalog data for AV Corporate giftings & events.
 */
export async function generateProductSpecSheet(product: Product): Promise<void> {
  // Dynamically load jsPDF to prevent bundling it in the critical initial bundle
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Colors based on official AV Brand Tokens
  const colorPrimary = [41, 41, 35];     // #292923 PNZ Archival Ink
  const colorAccent = [163, 77, 51];     // #A34D33 PNZ Burnt Copper
  const colorMuted = [102, 112, 100];    // #667064 Muted Green-Gray
  const colorBgLight = [244, 245, 235];  // #F4F5EB Warm Ivory
  const colorBorder = [220, 224, 206];   // #DCE0CE Warm Border

  // 1. Header Banner
  doc.setFillColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Embed Brand Logo
  let logoRendered = false;
  try {
    const logoRes = await getBase64PngFromUrl('/images/logo/logo-light.png');
    if (logoRes) {
      const logoH = 18;
      const logoW = (logoRes.width / logoRes.height) * logoH;
      doc.addImage(logoRes.dataUrl, 'PNG', margin, 5, logoW, logoH);
      logoRendered = true;
    }
  } catch {
    logoRendered = false;
  }

  if (!logoRendered) {
    // Brand Name Fallback
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('AV CORPORATE GIFTINGS & EVENTS', margin, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(217, 119, 6); // Amber accent
    doc.text('B2B CORPORATE MERCHANDISE & GIFTING SOLUTIONS', margin, 17);
  }

  // Document Type & Catalog reference on right
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('PRODUCT SPECIFICATION & ENQUIRY SHEET', pageWidth - margin, 12, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 210, 225);
  doc.text('Master Catalog Edition 2024–2025', pageWidth - margin, 17, { align: 'right' });

  // 2. Metadata Bar
  let currentY = 35;
  doc.setFillColor(colorBgLight[0], colorBgLight[1], colorBgLight[2]);
  doc.roundedRect(margin, currentY, contentWidth, 14, 2, 2, 'F');
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.roundedRect(margin, currentY, contentWidth, 14, 2, 2, 'S');

  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`SKU: ${product.sku}`, margin + 5, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.text(`Category: ${product.category}`, margin + 55, currentY + 6);
  doc.text(`Catalog Source: Page ${product.sourcePage}`, margin + 115, currentY + 6);

  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  doc.text(`Generated: ${dateStr}`, pageWidth - margin - 5, currentY + 6, { align: 'right' });

  // 3. Product Title
  currentY += 22;
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const titleLines = doc.splitTextToSize(product.name, contentWidth);
  doc.text(titleLines, margin, currentY);
  currentY += titleLines.length * 6;

  // 4. Product Image and Description Section (Side by Side)
  const imageBoxWidth = 65;
  const imageBoxHeight = 65;
  const textX = margin + imageBoxWidth + 8;
  const textWidth = contentWidth - imageBoxWidth - 8;

  // Image Box Outline
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.roundedRect(margin, currentY, imageBoxWidth, imageBoxHeight, 2, 2, 'FD');

  // Try to load and embed authentic image
  let imageRendered = false;
  if (product.images && product.images.hero) {
    try {
      const imgRes = await getBase64ImageFromUrl(product.images.hero);
      if (imgRes) {
        // Calculate fit within 61x61mm with padding
        const maxW = imageBoxWidth - 4;
        const maxH = imageBoxHeight - 4;
        const ratio = Math.min(maxW / imgRes.width, maxH / imgRes.height);
        const w = imgRes.width * ratio;
        const h = imgRes.height * ratio;
        const imgX = margin + 2 + (maxW - w) / 2;
        const imgY = currentY + 2 + (maxH - h) / 2;
        doc.addImage(imgRes.dataUrl, 'JPEG', imgX, imgY, w, h);
        imageRendered = true;
      }
    } catch {
      imageRendered = false;
    }
  }

  if (!imageRendered) {
    doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.text('Authentic photograph', margin + imageBoxWidth / 2, currentY + imageBoxHeight / 2 - 2, { align: 'center' });
    doc.text(`(Catalog SKU: ${product.sku})`, margin + imageBoxWidth / 2, currentY + imageBoxHeight / 2 + 4, { align: 'center' });
  }

  // Right Side: Description & Key Highlights
  let descY = currentY + 4;
  doc.setTextColor(colorAccent[0], colorAccent[1], colorAccent[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('COMMERCIAL OVERVIEW', textX, descY);
  descY += 5;

  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const descLines = doc.splitTextToSize(product.description || 'Verified product from AV Corporate giftings & events B2B master catalog.', textWidth);
  doc.text(descLines, textX, descY);
  descY += descLines.length * 4.5 + 4;

  if (product.features && product.features.length > 0) {
    doc.setTextColor(colorAccent[0], colorAccent[1], colorAccent[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('VERIFIED ATTRIBUTES & HIGHLIGHTS', textX, descY);
    descY += 4.5;

    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    product.features.slice(0, 4).forEach((feat) => {
      doc.text(`• ${feat}`, textX, descY);
      descY += 4;
    });
  }

  currentY += Math.max(imageBoxHeight, descY - currentY) + 8;

  // 5. Technical Specifications Table
  doc.setFillColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.rect(margin, currentY, contentWidth, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('TECHNICAL & MATERIAL SPECIFICATIONS', margin + 4, currentY + 4.2);
  currentY += 6;

  // Build specifications list filtering out empty/null values
  const validSpecs: { label: string; value: string }[] = [];
  if (product.sku) validSpecs.push({ label: 'Model / Master SKU', value: product.sku });
  if (product.category) validSpecs.push({ label: 'Product Category', value: product.category });
  if (product.material) validSpecs.push({ label: 'Primary Material', value: product.material });
  if (product.capacity) validSpecs.push({ label: 'Capacity / Dimensions', value: product.capacity });
  if (product.thermalPerformance) validSpecs.push({ label: 'Thermal Retention', value: product.thermalPerformance });
  if (product.lidType) validSpecs.push({ label: 'Lid / Closure Type', value: product.lidType });

  // Add additional specs from product.specs if not already present
  if (product.specs && Array.isArray(product.specs)) {
    product.specs.forEach((s) => {
      if (s.label && s.value && !validSpecs.some((v) => v.label.toLowerCase() === s.label.toLowerCase())) {
        validSpecs.push(s);
      }
    });
  }

  // Draw specification rows
  validSpecs.forEach((spec, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? colorBgLight[0] : 255, isEven ? colorBgLight[1] : 255, isEven ? colorBgLight[2] : 255);
    doc.rect(margin, currentY, contentWidth, 6, 'F');
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.line(margin, currentY + 6, margin + contentWidth, currentY + 6);

    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(spec.label, margin + 4, currentY + 4.2);

    doc.setFont('helvetica', 'normal');
    doc.text(spec.value, margin + 65, currentY + 4.2);
    currentY += 6;
  });

  currentY += 6;

  // 6. Custom Branding & Variants Section
  const colWidth = (contentWidth - 6) / 2;

  // Box A: Verified Branding Methods
  doc.setFillColor(colorBgLight[0], colorBgLight[1], colorBgLight[2]);
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.roundedRect(margin, currentY, colWidth, 26, 2, 2, 'FD');

  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('APPROVED BRANDING TECHNIQUES', margin + 4, currentY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  const brandingText = product.brandingMethods && product.brandingMethods.length > 0
    ? product.brandingMethods.join(' • ')
    : 'Laser Engraving • Screen Printing (Standard)';
  const bLines = doc.splitTextToSize(brandingText, colWidth - 8);
  doc.text(bLines, margin + 4, currentY + 11);

  // Box B: Color & Finish Variants
  const colBX = margin + colWidth + 6;
  doc.setFillColor(colorBgLight[0], colorBgLight[1], colorBgLight[2]);
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.roundedRect(colBX, currentY, colWidth, 26, 2, 2, 'FD');

  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('COLORWAYS & FINISHES', colBX + 4, currentY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  const variantText = product.variants && product.variants.length > 0
    ? product.variants.map((v) => v.name).join(', ')
    : 'Standard Catalog Colorways';
  const vLines = doc.splitTextToSize(variantText, colWidth - 8);
  doc.text(vLines, colBX + 4, currentY + 11);

  // 7. Footer & Disclaimer Notice
  const footerY = pageHeight - 24;
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.line(margin, footerY, margin + contentWidth, footerY);

  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.8);
  const disclaimer = 'Notice: This document is a technical specification & enquiry sheet generated from the AV Corporate giftings & events 2024–2025 master catalog. All product dimensions, capacities, and materials are verified against production lots. Product availability, custom branding mockups, and volume-tiered commercial pricing must be confirmed with the AV Corporate giftings & events B2B sales desk prior to final procurement. No retail price or arbitrary MOQ is implied.';
  const discLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(discLines, margin, footerY + 4);

  // Bottom contact strip
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.text('AV CORPORATE GIFTINGS & EVENTS | B2B Commercial Desk', margin, pageHeight - 8);
  doc.setFont('helvetica', 'normal');
  doc.text('Online Catalog & RFQ Portal: avcorporategifting.com', pageWidth - margin, pageHeight - 8, { align: 'right' });

  // Safe Filename
  const safeSku = product.sku.replace(/[^a-zA-Z0-9-_]/g, '-');
  doc.save(`${safeSku}-specification-sheet.pdf`);
}
