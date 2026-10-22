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
        backgroundColor: '#F5F4EE',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* ========================================================
          BACKGROUND SUNLIGHT & LEAF SHADOW EFFECT (Top Left)
         ======================================================== */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '580px',
          height: '460px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.95
        }}
        viewBox="0 0 580 460"
        fill="none"
      >
        <defs>
          <filter id="brandingLeafBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <linearGradient id="brandingLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#153D25" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#153D25" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#153D25" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g filter="url(#brandingLeafBlur)">
          <path d="M-60 -40 C 60 30, 170 120, 290 200" stroke="url(#brandingLeafGrad)" strokeWidth="38" strokeLinecap="round" />
          <path d="M10 -20 C 80 40, 170 90, 240 160" stroke="url(#brandingLeafGrad)" strokeWidth="28" strokeLinecap="round" />
          <path d="M-30 70 C 50 110, 140 180, 210 250" stroke="url(#brandingLeafGrad)" strokeWidth="30" strokeLinecap="round" />
          <ellipse cx="160" cy="85" rx="52" ry="26" transform="rotate(-26 160 85)" fill="url(#brandingLeafGrad)" />
          <ellipse cx="230" cy="150" rx="60" ry="28" transform="rotate(-22 230 150)" fill="url(#brandingLeafGrad)" />
          <ellipse cx="270" cy="95" rx="46" ry="22" transform="rotate(-15 270 95)" fill="url(#brandingLeafGrad)" />
          <ellipse cx="130" cy="165" rx="54" ry="24" transform="rotate(-38 130 165)" fill="url(#brandingLeafGrad)" />
          <ellipse cx="195" cy="225" rx="56" ry="26" transform="rotate(-32 195 225)" fill="url(#brandingLeafGrad)" />
        </g>
      </svg>

      {/* ========================================================
          DESKTOP 1:1 INFOGRAPHIC STAGE (1024 x 573 Coordinate Canvas)
         ======================================================== */}
      <div
        className="branding-desktop-stage"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1120px',
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
          {/* Line 1 (Top Left: Fiber Laser -> Tote Bag) Starts right after 0.1MM DETAIL */}
          <path
            d="M 300 220 L 332 220 L 358 280"
            fill="none"
            stroke="#E01E10"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="358" cy="280" r="3.5" fill="#E01E10" />

          {/* Line 2 (Bottom Left: UV Digital -> Ceramic Mug) Starts right after 1200+ DPI */}
          <path
            d="M 296 387 L 338 387"
            fill="none"
            stroke="#E01E10"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="338" cy="387" r="3.5" fill="#E01E10" />

          {/* Line 3 (Top Right: Silkscreen -> Green Bottle) Connects cleanly to circle icon */}
          <path
            d="M 778 191 L 735 191 L 700 265"
            fill="none"
            stroke="#E01E10"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="700" cy="265" r="3.5" fill="#E01E10" />

          {/* Line 4 (Bottom Right: Blind Debossing -> Bamboo Stand) */}
          <path
            d="M 814 362 L 795 362 L 777 388"
            fill="none"
            stroke="#E01E10"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="777" cy="388" r="3.5" fill="#E01E10" />
        </svg>

        {/* 1. Header Block (Top Left) */}
        <div
          className="branding-stage-header"
          style={{
            position: 'absolute',
            left: '4.5%',
            top: '6.5%',
            maxWidth: '38%',
            zIndex: 4
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(24px, 3.4cqw, 36px)',
              fontWeight: 800,
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
              maxWidth: '380px',
              paddingRight: '22px',
              paddingBottom: '14px'
            }}
          >
            <p
              style={{
                color: '#4A554A',
                fontSize: 'clamp(9.5px, 1.22cqw, 12.5px)',
                lineHeight: 1.45,
                margin: 0
              }}
            >
              Every catalog model is engineered with flat, unobstructed imprint zones. Sub-millimeter precision across food-grade stainless steel, natural bamboo, and executive PU leather.
            </p>

            {/* Red Accent Framing Shelf at bottom-right of subtitle */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '115px',
                height: '22px',
                borderBottom: '1.5px solid #E01E10',
                borderRight: '1.5px solid #E01E10',
                borderBottomRightRadius: '9px',
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
            left: '4.2%',
            top: '37.3%',
            width: '29%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          {/* Red Circle Laser Icon */}
          <div
            style={{
              width: 'clamp(36px, 4.2cqw, 44px)',
              height: 'clamp(36px, 4.2cqw, 44px)',
              minWidth: 'clamp(36px, 4.2cqw, 44px)',
              backgroundColor: '#E01E10',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(224, 30, 16, 0.28)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round">
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
              <span style={{ color: '#E01E10', fontSize: 'clamp(8px, 0.98cqw, 10px)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                ● PERMANENT MARK
              </span>
              <span style={{ fontSize: 'clamp(8px, 0.98cqw, 10px)', fontWeight: 800, color: '#4A554A', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                0.1MM DETAIL
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(13px, 1.6cqw, 17px)', fontWeight: 800, color: '#153D25', margin: '0 0 4px 0' }}>
              Fiber Laser Engraving
            </h3>

            <p style={{ color: '#2B382D', fontSize: 'clamp(9px, 1.1cqw, 11.5px)', lineHeight: 1.4, margin: '0 0 5px 0', maxWidth: '215px' }}>
              <strong style={{ color: '#153D25' }}>Clean micro-sublimation: </strong>
              Reveals polished surgical steel or rich natural bamboo grain without inks or fading.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: 'clamp(8.5px, 1.05cqw, 11px)', color: '#153D25', fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#153D25">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Indelible, scratch-proof &amp; wash-safe</span>
            </div>
          </div>
        </div>

        {/* 3. Bottom-Left Callout: UV Digital Flatbed */}
        <div
          className="branding-callout-item branding-callout-bl"
          style={{
            position: 'absolute',
            left: '2.3%',
            top: '66.3%',
            width: '29%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          {/* Red Circle Printer Icon */}
          <div
            style={{
              width: 'clamp(36px, 4.2cqw, 44px)',
              height: 'clamp(36px, 4.2cqw, 44px)',
              minWidth: 'clamp(36px, 4.2cqw, 44px)',
              backgroundColor: '#E01E10',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(224, 30, 16, 0.28)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
              <path d="M6 9V4h12v5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="4" y="9" width="16" height="8" rx="2" />
              <path d="M6 14h12v6H6z" fill="#E01E10" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="12" r="1" fill="#FFFFFF" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ color: '#E01E10', fontSize: 'clamp(8px, 0.98cqw, 10px)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                ● MULTICOLOR &amp; TEXTURE
              </span>
              <span style={{ fontSize: 'clamp(8px, 0.98cqw, 10px)', fontWeight: 800, color: '#4A554A', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                1200+ DPI
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(13px, 1.6cqw, 17px)', fontWeight: 800, color: '#153D25', margin: '0 0 4px 0' }}>
              UV Digital Flatbed
            </h3>

            <p style={{ color: '#2B382D', fontSize: 'clamp(9px, 1.1cqw, 11.5px)', lineHeight: 1.4, margin: '0 0 5px 0', maxWidth: '215px' }}>
              <strong style={{ color: '#153D25' }}>Photographic fidelity: </strong>
              Instant UV curing with smooth gradients and optional embossed clear-coat varnish.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: 'clamp(8.5px, 1.05cqw, 11px)', color: '#153D25', fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#153D25">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Zero dot gain for fine intricate crests</span>
            </div>
          </div>
        </div>

        {/* 4. Center Hero Gift Set Image */}
        <div
          className="branding-stage-image"
          style={{
            position: 'absolute',
            left: '24.5%',
            top: '32%',
            width: '53.5%',
            height: '54%',
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
            left: '76%',
            top: '30.2%',
            width: '23.5%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          {/* Red Circle Pantone Swatch Icon */}
          <div
            style={{
              width: 'clamp(36px, 4.2cqw, 44px)',
              height: 'clamp(36px, 4.2cqw, 44px)',
              minWidth: 'clamp(36px, 4.2cqw, 44px)',
              backgroundColor: '#E01E10',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(224, 30, 16, 0.28)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
              <span style={{ color: '#E01E10', fontSize: 'clamp(8px, 0.98cqw, 10px)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                ● PANTONE MATCHED (PMS)
              </span>
              <span style={{ fontSize: 'clamp(8px, 0.98cqw, 10px)', fontWeight: 800, color: '#4A554A', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                100% MATCH
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(13px, 1.6cqw, 17px)', fontWeight: 800, color: '#153D25', margin: '0 0 4px 0', whiteSpace: 'nowrap' }}>
              High-Opacity Silkscreen
            </h3>

            <p style={{ color: '#2B382D', fontSize: 'clamp(9px, 1.1cqw, 11.5px)', lineHeight: 1.4, margin: '0 0 5px 0', maxWidth: '205px' }}>
              <strong style={{ color: '#153D25' }}>Corporate color match: </strong>
              Industrial polyurethane inks deliver maximum pigment density and total opacity.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: 'clamp(8.5px, 1.05cqw, 11px)', color: '#153D25', fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#153D25">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Formulated strictly to PMS Solid Coated standards</span>
            </div>
          </div>
        </div>

        {/* 6. Bottom-Right Callout: Blind Debossing & Foil */}
        <div
          className="branding-callout-item branding-callout-br"
          style={{
            position: 'absolute',
            left: '79.5%',
            top: '59.7%',
            width: '23%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          {/* Red Circle Deboss Layer Icon */}
          <div
            style={{
              width: 'clamp(36px, 4.2cqw, 44px)',
              height: 'clamp(36px, 4.2cqw, 44px)',
              minWidth: 'clamp(36px, 4.2cqw, 44px)',
              backgroundColor: '#E01E10',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(224, 30, 16, 0.28)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 12 12 17 22 12" />
              <polyline points="2 17 12 22 22 17" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ color: '#E01E10', fontSize: 'clamp(8px, 0.98cqw, 10px)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                ● BOARDROOM ELEGANCE
              </span>
              <span style={{ fontSize: 'clamp(8px, 0.98cqw, 10px)', fontWeight: 800, color: '#4A554A', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                LUXURY 3D
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(13px, 1.6cqw, 17px)', fontWeight: 800, color: '#153D25', margin: '0 0 4px 0', whiteSpace: 'nowrap' }}>
              Blind Debossing &amp; Foil
            </h3>

            <p style={{ color: '#2B382D', fontSize: 'clamp(9px, 1.1cqw, 11.5px)', lineHeight: 1.4, margin: '0 0 5px 0', maxWidth: '205px' }}>
              <strong style={{ color: '#153D25' }}>Tactile indentation: </strong>
              CNC brass dies stamp deep 3D relief into thermal PU leather diaries and gift sets.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: 'clamp(8.5px, 1.05cqw, 11px)', color: '#153D25', fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#153D25">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Executive standard for VIP corporate summits</span>
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
            padding: '16px clamp(16px, 3vw, 32px)',
            borderTop: '1px solid rgba(21, 61, 37, 0.08)',
            backgroundColor: 'rgba(255, 255, 255, 0.55)',
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
