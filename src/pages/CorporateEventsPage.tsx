import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRfqCart } from '../components/rfq/useRfqCart';
import { submitQuoteRequest } from '../lib/leadCapture';

export function CorporateEventsPage() {
  const { openRequestModal } = useRfqCart();

  // Consultation form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    eventType: 'Product Launch',
    guestCount: '100 - 300 Guests',
    city: '',
    targetDate: '',
    details: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.company.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, and Company).');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitQuoteRequest(
        {
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          deliveryCity: formData.city,
          targetDeliveryDate: formData.targetDate,
          notes: `[EVENT CONSULTATION REQUEST] Event Type: ${formData.eventType} | Guests: ${formData.guestCount} | City: ${formData.city} | Target Date: ${formData.targetDate} | Details: ${formData.details}`
        },
        []
      );
      setSubmitted(true);
    } catch {
      setErrorMsg('Unable to submit inquiry at this moment. Please reach out to us directly or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventFormats = [
    {
      id: 'launches',
      tag: 'Experiential Reveals',
      title: 'New Product Launches & Brand Reveals',
      description: 'Make a dramatic market statement. We design reveal mechanics, immersive stage backdrops, and synchronized AV cues that leave media, dealers, and consumers captivated.',
      capabilities: [
        'Motorized reveals, curtain drops & pneumatic reveal systems',
        'P2/P3 high-resolution LED backdrop walls & 3D projection',
        'VIP media hampers, influencer reveal boxes & teaser kits',
        'Multi-camera 4K live streaming & press lounge fabrication'
      ]
    },
    {
      id: 'conferences',
      tag: 'Conferences & Summits',
      title: 'Corporate Conferences & Leadership Summits',
      description: 'Flawless acoustics, seamless delegate transit, and branded environments for national conventions, industry summits, and board meetings.',
      capabilities: [
        'Keynote stage fabrication, podiums & synchronized audio',
        'Digital registration desks, QR badge printing & custom lanyards',
        'Complete attendee kits: journals, metal pens & vacuum drinkware',
        'Speaker mementos, breakout session AV & media pods'
      ]
    },
    {
      id: 'annual-days',
      tag: 'Annual Days & Galas',
      title: 'Annual Corporate Days & Award Nights',
      description: 'Celebrate company achievements and honor key milestones with grand theatrical production, high-energy entertainment, and prestige employee awards.',
      capabilities: [
        'Immersive theme decor, photo opportunity installations & red carpets',
        'Celebrity emcees, live musical bands & entertainment management',
        'Bespoke laser-crafted crystal, acrylic & wooden trophies',
        'Milestone employee gift sets & banquet stage choreography'
      ]
    },
    {
      id: 'offsites',
      tag: 'Offsites & Retreats',
      title: 'Leadership Retreats & Team Offsites',
      description: 'Energize corporate teams in inspiring settings across India. We manage venue coordination, team-building activities, and themed branded merchandise.',
      capabilities: [
        'Resort & destination coordination (Goa, Jaipur, Udaipur, etc.)',
        'Outdoor activity staging, sound engineering & sports setups',
        'Custom corporate apparel: branded dry-fit polos, hoodies & caps',
        'Room-drop welcome hampers, travel organizers & backpacks'
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--paper, #FAF9F5)', minHeight: '100vh' }}>
      {/* ========================================================
          HERO BANNER
         ======================================================== */}
      <section
        style={{
          paddingTop: 'clamp(64px, 8vw, 108px)',
          paddingBottom: 'clamp(48px, 6vw, 84px)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '860px', marginInline: 'auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                backgroundColor: 'rgba(163, 77, 51, 0.08)',
                border: '1px solid rgba(163, 77, 51, 0.2)',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '20px'
              }}
            >
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
              Turnkey Corporate Events & Production
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                lineHeight: 1.15,
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '20px'
              }}
            >
              Corporate Event Management & <br />
              <em style={{ fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-accent)' }}>
                Bespoke Brand Experiences.
              </em>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.18rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.65,
                maxWidth: '720px',
                marginInline: 'auto',
                marginBottom: '32px'
              }}
            >
              From high-stakes product launches and leadership summits to grand annual days and offsites across India — we handle stage fabrication, audiovisuals, artist booking, and custom delegate gifts under one seamless roof.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="#event-inquiry-form"
                className="btn btn-accent"
                style={{ padding: '14px 28px', fontSize: '0.95rem' }}
              >
                Plan Your Event →
              </a>
              <button
                type="button"
                onClick={openRequestModal}
                className="btn btn-outline"
                style={{ padding: '14px 28px', fontSize: '0.95rem' }}
              >
                Request Quotation
              </button>
            </div>

            {/* Quick Badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(16px, 3vw, 36px)',
                marginTop: '40px',
                paddingTop: '28px',
                borderTop: '1px solid var(--line-light, #EEEBE3)',
                flexWrap: 'wrap',
                fontSize: '0.85rem',
                color: 'var(--color-primary)',
                fontWeight: 600
              }}
            >
              <span>✓ Pan-India Execution</span>
              <span>✓ Single-Partner Accountability</span>
              <span>✓ Stage + Gifting Integration</span>
              <span>✓ 100% On-Time Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          THE 2-IN-1 ADVANTAGE (Why Corporate Teams Choose Us)
         ======================================================== */}
      <section style={{ padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: 'clamp(36px, 6vw, 64px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              alignItems: 'center',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)'
            }}
          >
            <div>
              <div
                style={{
                  color: '#E0A899',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                The Single-Partner Advantage
              </div>
              <h2
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.3rem)',
                  lineHeight: 1.25,
                  marginBottom: '16px'
                }}
              >
                End-to-End Event Production & Custom Gifting Under One Roof.
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '20px' }}>
                Every event planner knows the pain of coordinating multiple vendors: one team sets up the stage, another handles lights, an outside supplier prints badges, and a separate vendor ships attendee gift bags.
              </p>
              <p style={{ color: '#FFFFFF', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 600 }}>
                At AV Corporate Giftings & Events, we unify the entire process. Your stage backdrop, registration counter, lighting truss, and delegate gift kits are produced and delivered in harmony by one dedicated team.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '16px',
                padding: 'clamp(24px, 3vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ color: '#FF7B7B', fontWeight: 800 }}>✕</span>
                  <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>Multiple Scattered Vendors</strong>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.84rem', margin: 0, paddingLeft: '22px' }}>
                  Risk of delayed delegate bags, mismatched brand colors, finger-pointing between teams, and multiple invoices.
                </p>
              </div>

              <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ color: '#A3D9A5', fontWeight: 800 }}>✓</span>
                  <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>The AV Unified Experience</strong>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.84rem', margin: 0, paddingLeft: '22px' }}>
                  A single project lead manages stage fabrication, audio-visual technicals, and hands delegate kits directly to your registration tables on event day.
                </p>
              </div>

              <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ color: '#A3D9A5', fontWeight: 800 }}>✓</span>
                  <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>Single Commercial Invoice</strong>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.84rem', margin: 0, paddingLeft: '22px' }}>
                  Clean, GST-compliant enterprise quotation covering all fabrication, audio/visual rentals, and physical merchandise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CORE EVENT FORMATS
         ======================================================== */}
      <section style={{ padding: 'clamp(48px, 6vw, 84px) 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '780px', marginInline: 'auto', textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                backgroundColor: 'rgba(163, 77, 51, 0.08)',
                padding: '4px 14px',
                borderRadius: '999px'
              }}
            >
              Tailored Event Formats
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: 'var(--color-primary)', marginTop: '14px', marginBottom: '14px' }}>
              Full-Spectrum Corporate Event Execution
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.02rem', lineHeight: 1.6 }}>
              Whether hosting 50 executives or 2,500 national delegates, our technical teams and event producers deliver punctual, high-impact experiences.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {eventFormats.map((format) => (
              <div
                key={format.id}
                style={{
                  backgroundColor: 'var(--paper, #FAF9F5)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                  padding: 'clamp(24px, 3.5vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-accent)',
                      backgroundColor: 'rgba(163, 77, 51, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    {format.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '10px', lineHeight: 1.3 }}>
                  {format.title}
                </h3>

                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  {format.description}
                </p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--line-light, #EEEBE3)', paddingTop: '18px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', marginBottom: '12px' }}>
                    Deliverables & Staging:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {format.capabilities.map((cap, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--color-primary)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          lineHeight: 1.45
                        }}
                      >
                        <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>✓</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3-STEP PROCESS
         ======================================================== */}
      <section style={{ padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="container">
          <div style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--color-primary)', marginBottom: '12px' }}>
              How We Execute Your Corporate Event
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>
              A systematic, reliable 3-phase journey from initial concept to the final applause.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              {
                step: '01',
                title: 'Brief & 3D Stage Layout',
                desc: 'We review your guest count, venue specs, and corporate identity. Within 24 hours, you receive a tailored stage layout render and curated delegate gift options.'
              },
              {
                step: '02',
                title: 'Turnkey Staging & Fabrication',
                desc: 'Our fabrication workshop manufactures stage backdrops, podiums, and photo booths while our branding unit custom-prints attendee hampers and awards.'
              },
              {
                step: '03',
                title: 'Flawless Cue-to-Cue Execution',
                desc: 'Our on-ground production directors run sound checks, manage lighting cues, coordinate emcees, and oversee registration desk gift handover with zero friction.'
              }
            ].map((st) => (
              <div
                key={st.step}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--color-accent)', marginBottom: '8px', lineHeight: 1 }}>
                  {st.step}
                </div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                  {st.title}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          EVENT INQUIRY / CONSULTATION FORM
         ======================================================== */}
      <section
        id="event-inquiry-form"
        style={{
          padding: 'clamp(56px, 7vw, 96px) 0',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--color-border)'
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: '740px',
              marginInline: 'auto',
              backgroundColor: 'var(--paper, #FAF9F5)',
              border: '1px solid var(--color-border)',
              borderRadius: '20px',
              padding: 'clamp(28px, 5vw, 48px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)'
                }}
              >
                PLAN AN EVENT WITH AV
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: 'var(--color-primary)', marginTop: '8px', marginBottom: '8px' }}>
                Request an Event Consultation
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: 0 }}>
                Share your event details below. Our events director will respond with concept ideas and pricing within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '36px',
                  textAlign: 'center',
                  border: '1px solid var(--line-light, #EEEBE3)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</div>
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Thank You for Your Event Inquiry!</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  We have received your event requirements. Our corporate events specialist will contact you shortly with stage concepts and delegate gifting recommendations.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/products" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
                    Browse Delegate Gift Catalog
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        company: '',
                        phone: '',
                        eventType: 'Product Launch',
                        guestCount: '100 - 300 Guests',
                        city: '',
                        targetDate: '',
                        details: ''
                      });
                    }}
                    className="btn btn-accent"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Submit Another Event
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {errorMsg && (
                  <div
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'rgba(241, 69, 69, 0.1)',
                      border: '1px solid var(--brand-red, #F14545)',
                      borderRadius: '8px',
                      color: 'var(--brand-red, #F14545)',
                      fontSize: '0.88rem'
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Sharma"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. priya@company.com"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Acme Technologies India"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Phone / Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Event Format
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option value="Product Launch">New Product Launch & Brand Reveal</option>
                      <option value="Conference / Summit">Corporate Conference / Summit</option>
                      <option value="Annual Day / Awards">Annual Corporate Day & Award Night</option>
                      <option value="Offsite / Retreat">Leadership Retreat / Team Offsite</option>
                      <option value="Exhibition Booth">Exhibition Booth & Trade Activation</option>
                      <option value="Other">Other Corporate Event</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Estimated Attendees
                    </label>
                    <select
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option value="Under 50 Guests">Under 50 Guests (VIP / Boardroom)</option>
                      <option value="50 - 150 Guests">50 – 150 Guests</option>
                      <option value="150 - 500 Guests">150 – 500 Guests</option>
                      <option value="500 - 1,500 Guests">500 – 1,500 Guests</option>
                      <option value="1,500+ Guests">1,500+ Guests (Large Scale)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Event City / Venue Location
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai, Bengaluru, Delhi-NCR, Goa"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Target Event Date / Month
                    </label>
                    <input
                      type="text"
                      name="targetDate"
                      value={formData.targetDate}
                      onChange={handleInputChange}
                      placeholder="e.g. Mid November 2026"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                    Event Requirements & Gifting Needs
                  </label>
                  <textarea
                    name="details"
                    rows={4}
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder="Tell us about your event theme, stage requirements, or if you also require delegate gift kits & trophies..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.9rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-accent"
                  style={{
                    padding: '14px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    width: '100%',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Submitting Consultation Request...' : 'Submit Event Consultation Request →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          FREQUENTLY ASKED QUESTIONS
         ======================================================== */}
      <section style={{ padding: 'clamp(48px, 6vw, 84px) 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '36px' }}>
            Frequently Asked Questions for Event Planners
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: 'Can AV Corporate manage both event stage production and delegate gifts together?',
                a: 'Yes, this is our signature dual advantage. Instead of coordinating with a separate event management company and a separate gifting vendor, our team handles both the on-ground stage production (AV, sound, LED backdrops) and delivers custom delegate gift bags directly to your venue registration counters.'
              },
              {
                q: 'Which cities across India do you support?',
                a: 'We provide full turnkey production in Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, and major offsite destinations like Goa, Jaipur, and Udaipur. Our gift hampers can be shipped to any pin code across India.'
              },
              {
                q: 'Do you provide 3D stage mockups before we confirm?',
                a: 'Yes. Once we receive your event brief and venue specifications, our design studio prepares 3D visual renders of the stage layout, backdrop options, and registration counters so your leadership can visualize the setup in advance.'
              },
              {
                q: 'Can we include custom trophies and mementos for our Annual Day?',
                a: 'Absolutely. We design and manufacture custom laser-etched crystal awards, polished acrylic mementos, and sustainable wooden trophies customized with your brand logo, event title, and recipient names.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  padding: '20px 24px'
                }}
              >
                <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                  {faq.q}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

