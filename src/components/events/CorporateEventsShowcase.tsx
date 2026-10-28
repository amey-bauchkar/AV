import React from 'react';
import { Link } from 'react-router-dom';

interface CorporateEventsShowcaseProps {
  onOpenRfqModal?: () => void;
}

export const CorporateEventsShowcase: React.FC<CorporateEventsShowcaseProps> = ({ onOpenRfqModal }) => {
  const eventFormats = [
    {
      id: 'launches',
      tag: 'Product Launches',
      title: 'New Product Launches & Brand Reveals',
      subtitle: 'Create memorable moments that capture media attention and excite customers.',
      highlights: [
        'Custom stage fabrication & experiential reveal moments',
        'High-resolution LED walls, lighting & acoustic staging',
        'Customized VIP press hampers & influencer gift sets',
        'Live streaming, photo-ops & branded interactive zones'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      id: 'conferences',
      tag: 'Conferences & Summits',
      title: 'Corporate Conferences & Leadership Summits',
      subtitle: 'Seamless delegate flow and executive audiovisuals for national and regional summits.',
      highlights: [
        'Main stage design, crystal-clear acoustics & projection',
        'Registration desks, customized delegate badges & lanyards',
        'Curated attendee kits (notebooks, pens & thermal bottles)',
        'Breakout session staging & speaker appreciation gifts'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 'annual-days',
      tag: 'Annual Days & Galas',
      title: 'Annual Corporate Days & Award Nights',
      subtitle: 'Celebrate your company milestones and honor top performers with unforgettable production.',
      highlights: [
        'Immersive thematic decor, red-carpet entries & backdrops',
        'Celebrity emcees, live artists & sound-and-light choreography',
        'Custom laser-etched crystal & metal award trophies',
        'Employee recognition gifts & milestone celebration boxes'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1 .45-1 1v1h12v-1c0-.55-.45-1-1-1h-2c-.55 0-1-.45-1-1v-2.34" />
          <path d="M18 4H6v7a6 6 0 0 0 12 0V4z" />
        </svg>
      )
    },
    {
      id: 'offsites',
      tag: 'Offsites & Retreats',
      title: 'Team Offsites & Leadership Retreats',
      subtitle: 'Energize leadership teams and remote departments with turnkey experiential offsites.',
      highlights: [
        'Resort & destination coordination across India',
        'Outdoor team building, AV setup & sound engineering',
        'Custom-branded polo shirts, caps, backpacks & travel gear',
        'Personalized welcome room-drop hampers upon arrival'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      )
    }
  ];

  return (
    <section
      className="corporate-events-section"
      aria-label="Corporate Event Management & Production"
      style={{
        padding: 'clamp(56px, 7vw, 96px) 0',
        backgroundColor: 'var(--paper, #FAF9F5)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}
    >
      <div className="container">
        {/* Header Section */}
        <div style={{ maxWidth: '820px', marginInline: 'auto', textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              backgroundColor: 'rgba(163, 77, 51, 0.08)',
              border: '1px solid rgba(163, 77, 51, 0.2)',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '16px'
            }}
          >
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
            Turnkey Event Production & Activations
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              lineHeight: 1.18,
              color: 'var(--color-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '16px'
            }}
          >
            Complete Corporate Events & <br />
            <em style={{ fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-accent)' }}>
              Memorable Brand Experiences.
            </em>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '680px',
              marginInline: 'auto'
            }}
          >
            We manage your entire corporate event lifecycle — from stage design, sound, and lighting to artist booking and customized delegate gift hampers — delivered with zero stress.
          </p>
        </div>

        {/* 4 Core Event Formats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          {eventFormats.map((format) => (
            <div
              key={format.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                padding: 'clamp(24px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(41, 41, 35, 0.04)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {format.icon}
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(163, 77, 51, 0.08)',
                    color: 'var(--color-accent)'
                  }}
                >
                  {format.tag}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  marginBottom: '8px',
                  lineHeight: 1.3
                }}
              >
                {format.title}
              </h3>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.55,
                  marginBottom: '20px'
                }}
              >
                {format.subtitle}
              </p>

              <div style={{ borderTop: '1px solid var(--line-light, #EEEBE3)', paddingTop: '16px', marginTop: 'auto' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', marginBottom: '10px' }}>
                  What We Deliver:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {format.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--color-text-muted)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        lineHeight: 1.45
                      }}
                    >
                      <span style={{ color: 'var(--color-accent)', fontWeight: 800, flexShrink: 0 }}>✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* The 2-in-1 Advantage Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: 'clamp(32px, 5vw, 48px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#E0A899',
                marginBottom: '12px'
              }}
            >
              The AV Advantage
            </div>
            <h3
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                lineHeight: 1.25,
                marginBottom: '12px'
              }}
            >
              Why Juggle Separate Event Planners & Gifting Vendors?
            </h3>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.82)',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}
            >
              Most companies hire one agency for stage setups and an entirely different vendor for delegate kits — resulting in mismatched branding, delayed bags, and endless vendor phone calls.
            </p>
            <p
              style={{
                color: '#FFFFFF',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                fontWeight: 600
              }}
            >
              At AV Corporate, we fabricate your stage and handcraft your delegate hampers simultaneously. One unified team, guaranteed on-time delivery, and single-invoice simplicity.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(241, 69, 69, 0.2)', color: '#FF7B7B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                ✕
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>Traditional Approach</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>Multiple vendors, delayed delegate kits, fragmented branding</div>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(116, 125, 107, 0.35)', color: '#A3D9A5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                ✓
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>The AV Unified Way</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>One partner for staging, sound, lighting, decor & delegate gifts</div>
              </div>
            </div>

            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                to="/events"
                className="btn btn-accent"
                style={{
                  flex: '1 1 180px',
                  textAlign: 'center',
                  padding: '12px 20px',
                  fontSize: '0.88rem',
                  textDecoration: 'none'
                }}
              >
                Explore Event Services →
              </Link>
              <button
                type="button"
                onClick={onOpenRfqModal}
                className="btn"
                style={{
                  flex: '1 1 180px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '12px 20px',
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Plan an Event With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

