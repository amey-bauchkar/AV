import React from 'react';
import { Link } from 'react-router-dom';

interface BrandingHeroShowcaseProps {
  showCta?: boolean;
}

export const BrandingHeroShowcase: React.FC<BrandingHeroShowcaseProps> = ({ showCta = true }) => {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        border: 'none',
        overflow: 'hidden'
      }}
    >
      {/* ========================================================
          DESKTOP 1:1 INFOGRAPHIC STAGE (1024 x 573 Coordinate Canvas)
          Full-width responsive scaling up to 1320px container
         ======================================================== */}
      <div
        className="branding-desktop-stage"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          aspectRatio: '1024 / 573',
          containerType: 'inline-size'
        }}
      >
        {/* SVG Precision Hotspot Leader Lines */}
        <svg
          className="branding-leader-lines"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 3
          }}
          viewBox="0 0 1024 573"
          preserveAspectRatio="none"
        >
          {/* Line 1 (Top Left: Fiber Laser -> Tote Bag) Starts cleanly past 0.1MM DETAIL */}
          <path
            d="M 328 214 L 352 214 L 372 278"
            fill="none"
            stroke="#E01E10"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="372" cy="278" r="4" fill="#E01E10" />

          {/* Line 2 (Bottom Left: UV Digital -> Ceramic Mug) */}
          <path
            d="M 292 384 L 336 384"
            fill="none"
            stroke="#E01E10"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="336" cy="384" r="4" fill="#E01E10" />

          {/* Line 3 (Top Right: Silkscreen -> Green Bottle) Starts at icon left border, points to bottle */}
          <path
            d="M 694 180 L 665 180 L 636 265"
            fill="none"
            stroke="#E01E10"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="636" cy="265" r="4" fill="#E01E10" />

          {/* Line 4 (Bottom Right: Blind Debossing -> Bamboo Stand) */}
          <path
            d="M 724 358 L 696 358 L 676 418"
            fill="none"
            stroke="#E01E10"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="676" cy="418" r="4" fill="#E01E10" />
        </svg>

        {/* 1. Header Block (Top Left) */}
        <div
          className="branding-stage-header"
          style={{
            position: 'absolute',
            left: '3.8%',
            top: '5.5%',
            maxWidth: '40%',
            zIndex: 4
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 3.8cqw, 48px)',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: '0 0 10px 0'
            }}
          >
            <span style={{ color: '#153D25', display: 'block' }}>Your Brand,</span>
            <span style={{ color: '#E01E10', display: 'block' }}>Precision Imprinted.</span>
          </h2>

          {/* Subtitle with Attached Red Accent Framing Bracket */}
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              maxWidth: '440px',
              paddingRight: '22px',
              paddingBottom: '12px'
            }}
          >
            <p
              style={{
                color: '#3A483D',
                fontSize: 'clamp(12px, 1.45cqw, 16.5px)',
                lineHeight: 1.4,
                fontWeight: 500,
                margin: 0
              }}
            >
              Sub-millimeter precision branding across stainless steel, natural bamboo, and executive leather.
            </p>

            {/* Red Accent Framing Shelf at bottom-right of subtitle */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '110px',
                height: '20px',
                borderBottom: '2px solid #E01E10',
                borderRight: '2px solid #E01E10',
                borderBottomRightRadius: '8px',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>

        {/* 2. Top-Left Callout: Fiber Laser Engraving */}
        <div
          className="branding-callout-item branding-callout-tl"
          style={{
            position: 'absolute',
            left: '3.8%',
            top: '36.5%',
            width: '30%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px'
          }}
        >
          {/* Red Circle Laser Icon */}
          <div
            style={{
              width: 'clamp(42px, 4.6cqw, 52px)',
              height: 'clamp(42px, 4.6cqw, 52px)',
              minWidth: 'clamp(42px, 4.6cqw, 52px)',
              backgroundColor: '#E01E10',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(224, 30, 16, 0.28)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round">
              <line x1="12" y1="2" x2="12" y2="7" />
              <line x1="12" y1="17" x2="12" y2="22" />
              <line x1="2" y1="12" x2="7" y2="12" />
              <line x1="17" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="8.46" y2="8.46" />
              <line x1="15.54" y1="15.54" x2="19.07" y2="19.07" />
              <line x1="4.93" y1="19.07" x2="8.46" y2="15.54" />
              <line x1="15.54" y1="8.46" x2="19.07" y2="4.93" />
              <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ color: '#E01E10', fontSize: 'clamp(9.5px, 1.1cqw, 13px)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                ● PERMANENT MARK
              </span>
              <span style={{ fontSize: 'clamp(9.5px, 1.1cqw, 13px)', fontWeight: 800, color: '#3A483D', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                0.1MM DETAIL
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(17px, 2.1cqw, 24px)', fontWeight: 800, color: '#153D25', margin: '0 0 4px 0', lineHeight: 1.15 }}>
              Fiber Laser Engraving
            </h3>

            <p style={{ color: '#2B382D', fontSize: 'clamp(11.5px, 1.35cqw, 15px)', lineHeight: 1.35, fontWeight: 500, margin: '0 0 6px 0', maxWidth: '240px' }}>
              Permanent micro-etch for polished steel and natural bamboo grain.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(11px, 1.25cqw, 14px)', color: '#153D25', fontWeight: 700 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#153D25">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Indelible &amp; scratch-proof</span>
            </div>
          </div>
        </div>

        {/* 3. Bottom-Left Callout: UV Digital Flatbed */}
        <div
          className="branding-callout-item branding-callout-bl"
          style={{
            position: 'absolute',
            left: '2.5%',
            top: '66%',
            width: '30%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px'
          }}
        >
          {/* Red Circle Printer Icon */}
          <div
            style={{
              width: 'clamp(42px, 4.6cqw, 52px)',
              height: 'clamp(42px, 4.6cqw, 52px)',
              minWidth: 'clamp(42px, 4.6cqw, 52px)',
              backgroundColor: '#E01E10',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(224, 30, 16, 0.28)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
              <path d="M6 9V4h12v5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="4" y="9" width="16" height="8" rx="2" />
              <path d="M6 14h12v6H6z" fill="#E01E10" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="12" r="1" fill="#FFFFFF" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ color: '#E01E10', fontSize: 'clamp(9.5px, 1.1cqw, 13px)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                ● MULTICOLOR
              </span>
              <span style={{ fontSize: 'clamp(9.5px, 1.1cqw, 13px)', fontWeight: 800, color: '#3A483D', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                1200+ DPI
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(17px, 2.1cqw, 24px)', fontWeight: 800, color: '#153D25', margin: '0 0 4px 0', lineHeight: 1.15 }}>
              UV Digital Flatbed
            </h3>

            <p style={{ color: '#2B382D', fontSize: 'clamp(11.5px, 1.35cqw, 15px)', lineHeight: 1.35, fontWeight: 500, margin: '0 0 6px 0', maxWidth: '240px' }}>
              Vibrant full-color with optional raised clear-coat gloss.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(11px, 1.25cqw, 14px)', color: '#153D25', fontWeight: 700 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#153D25">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Photographic crest precision</span>
            </div>
          </div>
        </div>

        {/* 4. Center Hero Gift Set Image */}
        <div
          className="branding-stage-image"
          style={{
            position: 'absolute',
            left: '23.5%',
            top: '28%',
            width: '53%',
            height: '59%',
            zIndex: 2,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <img
            src="/images/green-eco-friendly-corporate-gift-set.png"
            alt="AV Corporate giftings & events Green Eco-Friendly Corporate Gift Set"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 20px 32px rgba(21, 61, 37, 0.15))'
            }}
          />
        </div>

        {/* 5. Top-Right Callout: High-Opacity Silkscreen */}
        <div
          className="branding-callout-item branding-callout-tr"
          style={{
            position: 'absolute',
            left: '68%',
            top: '24%',
            width: '30%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px'
          }}
        >
          {/* Red Circle Pantone Swatch Icon */}
          <div
            style={{
              width: 'clamp(42px, 4.6cqw, 52px)',
              height: 'clamp(42px, 4.6cqw, 52px)',
              minWidth: 'clamp(42px, 4.6cqw, 52px)',
              backgroundColor: '#E01E10',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(224, 30, 16, 0.28)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="7" cy="17" r="2" fill="#FFFFFF" />
              <path d="M5.5 15.5 L2.5 10.5 C2.1 9.8 2.3 8.9 3 8.5 L6.5 6.5 C7.2 6.1 8.1 6.3 8.5 7 L11.5 12" />
              <line x1="4.5" y1="8" x2="7.5" y2="10" />
              <path d="M7 15 L7 5 C7 4.2 7.7 3.5 8.5 3.5 L12.5 3.5 C13.3 3.5 14 4.2 14 5 L14 15" />
              <line x1="7" y1="7.5" x2="14" y2="7.5" />
              <line x1="7" y1="11" x2="14" y2="11" />
              <path d="M8.5 15.5 L14.5 7 C15 6.3 15.9 6.1 16.6 6.5 L20 8.5 C20.7 8.9 20.9 9.8 20.5 10.5 L14.5 19" />
              <line x1="12" y1="10" x2="18" y2="10" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ color: '#E01E10', fontSize: 'clamp(9.5px, 1.1cqw, 13px)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                ● PANTONE MATCHED
              </span>
              <span style={{ fontSize: 'clamp(9.5px, 1.1cqw, 13px)', fontWeight: 800, color: '#3A483D', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                100% PMS
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(17px, 2.1cqw, 24px)', fontWeight: 800, color: '#153D25', margin: '0 0 4px 0', lineHeight: 1.15 }}>
              High-Opacity Silkscreen
            </h3>

            <p style={{ color: '#2B382D', fontSize: 'clamp(11.5px, 1.35cqw, 15px)', lineHeight: 1.35, fontWeight: 500, margin: '0 0 6px 0', maxWidth: '240px' }}>
              Dense industrial inks for curved surfaces and bottles.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(11px, 1.25cqw, 14px)', color: '#153D25', fontWeight: 700 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#153D25">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Strict PMS Solid Coated match</span>
            </div>
          </div>
        </div>

        {/* 6. Bottom-Right Callout: Blind Debossing & Foil */}
        <div
          className="branding-callout-item branding-callout-br"
          style={{
            position: 'absolute',
            left: '71%',
            top: '56%',
            width: '28%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px'
          }}
        >
          {/* Red Circle Deboss Layer Icon */}
          <div
            style={{
              width: 'clamp(42px, 4.6cqw, 52px)',
              height: 'clamp(42px, 4.6cqw, 52px)',
              minWidth: 'clamp(42px, 4.6cqw, 52px)',
              backgroundColor: '#E01E10',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(224, 30, 16, 0.28)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 12 12 17 22 12" />
              <polyline points="2 17 12 22 22 17" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ color: '#E01E10', fontSize: 'clamp(9.5px, 1.1cqw, 13px)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                ● BOARDROOM LUXURY
              </span>
              <span style={{ fontSize: 'clamp(9.5px, 1.1cqw, 13px)', fontWeight: 800, color: '#3A483D', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                3D RELIEF
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(17px, 2.1cqw, 24px)', fontWeight: 800, color: '#153D25', margin: '0 0 4px 0', lineHeight: 1.15 }}>
              Blind Debossing &amp; Foil
            </h3>

            <p style={{ color: '#2B382D', fontSize: 'clamp(11.5px, 1.35cqw, 15px)', lineHeight: 1.35, fontWeight: 500, margin: '0 0 6px 0', maxWidth: '240px' }}>
              Deep tactile impressions in rich executive leather.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(11px, 1.25cqw, 14px)', color: '#153D25', fontWeight: 700 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#153D25">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Timeless 3D finish, never fades</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          OPTIONAL ACTION BAR (FOR HOMEPAGE)
         ======================================================== */}
      {showCta && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            padding: '24px clamp(16px, 3vw, 32px) 8px clamp(16px, 3vw, 32px)',
            position: 'relative',
            zIndex: 4
          }}
        >
          <Link
            to="/branding"
            className="btn-pill-primary"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#153D25',
              color: '#FFFFFF',
              padding: '9px 14px 9px 20px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}
          >
            <span>Branding &amp; Artwork Guide</span>
            <span
              className="btn-pill-circle"
              aria-hidden="true"
              style={{
                width: '26px',
                height: '26px',
                backgroundColor: '#E01E10',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>

          <span style={{ fontSize: '0.86rem', color: '#153D25', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#E01E10', fontWeight: 800, fontSize: '0.96rem' }}>✓</span>
            Digital 2D proof within 4 business hours
          </span>

          <Link
            to="/contact"
            style={{
              color: '#E01E10',
              fontWeight: 700,
              fontSize: '0.86rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Request Custom Mockup</span>
            <span>→</span>
          </Link>
        </div>
      )}

      {/* ========================================================
          RESPONSIVE STYLES & MOBILE OVERRIDES
         ======================================================== */}
      <style>{`
        @media (max-width: 1023px) {
          .branding-desktop-stage {
            aspect-ratio: auto !important;
            padding: 32px 20px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .branding-desktop-stage .branding-leader-lines {
            display: none !important;
          }
          .branding-stage-header {
            position: static !important;
            max-width: 100% !important;
            order: 0 !important;
          }
          .branding-stage-image {
            position: static !important;
            width: 100% !important;
            height: auto !important;
            max-width: 480px !important;
            margin: 12px auto 16px auto !important;
            order: 1 !important;
          }
          .branding-callout-item {
            position: static !important;
            width: 100% !important;
            max-width: 440px !important;
            order: 2 !important;
          }
          .branding-callout-item p {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
