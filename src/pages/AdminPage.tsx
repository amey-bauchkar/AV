/**
 * AV Corporate giftings & events - Executive Owner Administration & RFQ Portal
 * Provides password-gated access for the business owner to inspect incoming quotations,
 * review custom branding & unit counts, connect directly via WhatsApp/Email,
 * update inquiry status, and export to CSV.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  fetchAllQuotes,
  updateQuoteStatus,
  deleteQuoteRecord,
  generateWhatsAppLink,
  generateEmailLink,
  formatFullDossierText,
  exportQuotesToCSV,
  setMasterPassword,
  resetMasterPassword,
  type AdminQuoteRecord,
  type QuoteStatus
} from '../lib/adminService';
import { hasSupabaseConfig } from '../lib/supabase';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Data
  const [quotes, setQuotes] = useState<AdminQuoteRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedQuote, setSelectedQuote] = useState<AdminQuoteRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings Modal
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);

  // Check initial session
  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Load quotes when authenticated
  const loadQuotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllQuotes();
      setQuotes(data);
    } catch (err) {
      console.error('Failed to load quotes:', err);
      showToast('Error loading quotations from database.');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (isAuthenticated) {
      loadQuotes();
    }
  }, [isAuthenticated, loadQuotes]);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!passwordInput.trim()) {
      setLoginError('Please enter the owner master passcode.');
      return;
    }

    const success = loginAdmin(passwordInput.trim());
    if (success) {
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      setLoginError('Incorrect password. Please verify and try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setSelectedQuote(null);
  };

  // Handle Status Update
  const handleStatusChange = async (quoteId: string, newStatus: QuoteStatus) => {
    // Optimistic update
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
    );
    if (selectedQuote && selectedQuote.id === quoteId) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    const ok = await updateQuoteStatus(quoteId, newStatus);
    if (ok) {
      showToast(`Status updated to "${newStatus.toUpperCase()}"`);
    } else {
      showToast('Failed to sync status with database.');
      loadQuotes(); // revert
    }
  };

  // Handle Delete
  const handleDelete = async (quoteId: string) => {
    if (!window.confirm('Are you sure you want to delete this quotation request? This cannot be undone.')) {
      return;
    }
    const ok = await deleteQuoteRecord(quoteId);
    if (ok) {
      setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
      if (selectedQuote && selectedQuote.id === quoteId) {
        setSelectedQuote(null);
      }
      showToast('Quotation deleted successfully.');
    } else {
      showToast('Failed to delete quotation.');
    }
  };

  // Handle Copy Dossier
  const handleCopyDossier = (quote: AdminQuoteRecord) => {
    const text = formatFullDossierText(quote);
    navigator.clipboard.writeText(text);
    showToast('Quote dossier copied to clipboard!');
  };

  // Handle Change Password
  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordInput.trim() || newPasswordInput.trim().length < 4) {
      alert('Password must be at least 4 characters.');
      return;
    }
    setMasterPassword(newPasswordInput.trim());
    setSettingsSuccess('Master passcode successfully updated!');
    setNewPasswordInput('');
    setTimeout(() => {
      setSettingsSuccess(null);
      setShowSettingsModal(false);
    }, 2000);
  };

  const handleResetPassword = () => {
    if (window.confirm('Reset passcode back to the default "pix@2026"?')) {
      resetMasterPassword();
      setSettingsSuccess('Passcode reset to default (pix@2026).');
      setTimeout(() => {
        setSettingsSuccess(null);
        setShowSettingsModal(false);
      }, 2000);
    }
  };

  // Filtered & Searched Quotes
  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      // Status filter
      if (selectedStatus !== 'all' && q.status !== selectedStatus) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesClient =
          q.full_name.toLowerCase().includes(query) ||
          q.company.toLowerCase().includes(query) ||
          q.email.toLowerCase().includes(query) ||
          (q.phone && q.phone.toLowerCase().includes(query)) ||
          (q.delivery_city && q.delivery_city.toLowerCase().includes(query)) ||
          q.id.toLowerCase().includes(query);

        const matchesItems = (q.quote_request_items || []).some(
          (i) =>
            i.product_name.toLowerCase().includes(query) ||
            i.sku.toLowerCase().includes(query) ||
            i.category.toLowerCase().includes(query)
        );

        return matchesClient || matchesItems;
      }
      return true;
    });
  }, [quotes, selectedStatus, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const totalQuotes = quotes.length;
    const newQuotes = quotes.filter((q) => q.status === 'new').length;
    const inProgress = quotes.filter((q) => q.status === 'reviewed' || q.status === 'quoted').length;
    const totalUnits = quotes.reduce((sum, q) => sum + (q.total_quantity || 0), 0);
    const distinctCompanies = new Set(quotes.map((q) => q.company.toLowerCase().trim())).size;

    return { totalQuotes, newQuotes, inProgress, totalUnits, distinctCompanies };
  }, [quotes]);

  // Status badge styling helper
  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'new':
        return { bg: '#FFEBEA', color: '#D91C0E', border: '#F8B4AF', label: 'NEW INQUIRY' };
      case 'reviewed':
        return { bg: '#FFF7E6', color: '#B76E00', border: '#FFE0A3', label: 'REVIEWED' };
      case 'quoted':
        return { bg: '#E6F4FF', color: '#0958D9', border: '#BAE0FF', label: 'QUOTE SENT' };
      case 'fulfilled':
        return { bg: '#E6F9F0', color: '#0E7A4A', border: '#A8ECC8', label: 'FULFILLED' };
      case 'archived':
        return { bg: '#F5F5F5', color: '#666666', border: '#D9D9D9', label: 'ARCHIVED' };
      default:
        return { bg: '#F5F5F5', color: '#333333', border: '#D9D9D9', label: status };
    }
  };

  // --------------------------------------------------------------------------
  // Screen 1: Password Gate (Unauthenticated)
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-bg-subtle, #F8F9F5)',
          padding: 'var(--space-xl)'
        }}
      >
        <div
          style={{
            maxWidth: '440px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            padding: 'var(--space-2xl)',
            textAlign: 'center'
          }}
        >
          {/* Lock Crest Icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light, #1A4D2E)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-lg) auto',
              boxShadow: '0 8px 16px rgba(21, 61, 37, 0.2)'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent, #F12D18)',
              display: 'block',
              marginBottom: '6px'
            }}
          >
            ● RESTRICTED ACCESS
          </span>

          <h1
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--color-primary-dark, #0D2617)',
              marginBottom: '8px'
            }}
          >
            Owner RFQ Desk
          </h1>

          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.5,
              marginBottom: 'var(--space-xl)'
            }}
          >
            AV Corporate giftings & events internal quotation management system. Enter owner password to inspect corporate inquiries.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <label
                htmlFor="admin-password"
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text)',
                  marginBottom: '6px'
                }}
              >
                Owner Master Passcode
              </label>

              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passcode (e.g. pix@2026)"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 14px',
                    fontSize: '0.95rem',
                    border: loginError ? '2px solid #F12D18' : '1px solid var(--color-border)',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--color-text)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)',
                    padding: '4px'
                  }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div
                style={{
                  fontSize: '0.82rem',
                  color: '#D91C0E',
                  backgroundColor: '#FFEBEA',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  textAlign: 'left',
                  border: '1px solid #F8B4AF'
                }}
              >
                ⚠️ {loginError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#FFFFFF',
                backgroundColor: 'var(--color-primary, #153D25)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(21, 61, 37, 0.25)',
                marginTop: '4px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-dark, #0D2617)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary, #153D25)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Unlock Owner Dashboard →
            </button>
          </form>

          <div
            style={{
              marginTop: 'var(--space-lg)',
              paddingTop: 'var(--space-md)',
              borderTop: '1px solid var(--color-border)',
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)'
            }}
          >
            <span>Default Master Passcode: </span>
            <code style={{ fontWeight: 700, color: 'var(--color-primary)', background: '#EDF2EC', padding: '2px 6px', borderRadius: '4px' }}>
              pix@2026
            </code>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Screen 2: Authenticated Executive Admin Dashboard
  // --------------------------------------------------------------------------
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-subtle, #F8F9F5)',
        minHeight: '100vh',
        paddingBottom: 'var(--space-3xl)'
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: 'var(--color-primary-dark, #0D2617)',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            zIndex: 9999,
            fontSize: '0.88rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          padding: '16px 0',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          {/* Brand & Subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                backgroundColor: 'var(--color-primary, #153D25)',
                color: '#fff',
                fontWeight: 900,
                fontSize: '0.85rem',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              AV
            </span>
            <div>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--color-primary-dark, #0D2617)' }}>
                AV Corporate giftings & events Commercial Desk
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: hasSupabaseConfig ? '#10B981' : '#F59E0B'
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {hasSupabaseConfig ? 'Supabase Live Sync' : 'Offline Storage Mode'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Refresh */}
            <button
              onClick={loadQuotes}
              disabled={isLoading}
              title="Refresh Quotes"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }}>
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>{isLoading ? 'Syncing...' : 'Refresh'}</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={() => exportQuotesToCSV(filteredQuotes)}
              disabled={quotes.length === 0}
              title="Export all quotations to Excel CSV"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--color-primary-dark)',
                backgroundColor: '#EDF4EE',
                border: '1px solid #C4DCC8',
                borderRadius: '6px',
                cursor: quotes.length === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Export CSV</span>
            </button>

            {/* Settings (Change Password) */}
            <button
              onClick={() => setShowSettingsModal(true)}
              title="Security Settings"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Passcode</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Lock Admin Desk"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#D91C0E',
                backgroundColor: '#FFF0F0',
                border: '1px solid #FFD0D0',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Lock / Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container" style={{ paddingTop: 'var(--space-xl)' }}>
        {/* Metric Cards Row */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-xl)'
          }}
        >
          {/* Card 1: Total RFQs */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
              Total Inquiries
            </span>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginTop: '4px' }}>
              {stats.totalQuotes}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Across {stats.distinctCompanies} corporate client(s)
            </div>
          </div>

          {/* Card 2: New Submissions */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #F8B4AF',
              boxShadow: '0 2px 8px rgba(241, 45, 24, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#D91C0E' }}>
                ● Action Required
              </span>
              {stats.newQuotes > 0 && (
                <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#D91C0E', color: '#FFF', padding: '2px 6px', borderRadius: '10px' }}>
                  NEW
                </span>
              )}
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#D91C0E', marginTop: '4px' }}>
              {stats.newQuotes}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Fresh unreviewed quotation requests
            </div>
          </div>

          {/* Card 3: In Pipeline */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
              In Discussion
            </span>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
              {stats.inProgress}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Reviewed & pricing sent to client
            </div>
          </div>

          {/* Card 4: Total Units */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
              Total Units Inquired
            </span>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
              {stats.totalUnits.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Bulk corporate gifting volume
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            padding: '16px 20px',
            marginBottom: 'var(--space-lg)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            {/* Status Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Inquiries', count: quotes.length },
                { id: 'new', label: 'New', count: quotes.filter((q) => q.status === 'new').length },
                { id: 'reviewed', label: 'Reviewed', count: quotes.filter((q) => q.status === 'reviewed').length },
                { id: 'quoted', label: 'Quoted', count: quotes.filter((q) => q.status === 'quoted').length },
                { id: 'fulfilled', label: 'Fulfilled', count: quotes.filter((q) => q.status === 'fulfilled').length },
                { id: 'archived', label: 'Archived', count: quotes.filter((q) => q.status === 'archived').length }
              ].map((tab) => {
                const isActive = selectedStatus === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedStatus(tab.id)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      fontWeight: isActive ? 700 : 500,
                      borderRadius: '6px',
                      border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                      backgroundColor: isActive ? 'var(--color-primary)' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : 'var(--color-text)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '1px 5px',
                        borderRadius: '10px',
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#F0F0F0',
                        color: isActive ? '#FFFFFF' : 'var(--color-text-muted)'
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', minWidth: '280px', flex: '1', maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Search by buyer, company, email, city, or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 34px',
                  fontSize: '0.84rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: 'absolute',
                  left: '11px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)'
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)',
                    fontSize: '1rem',
                    padding: '2px'
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Quotes List / Table */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            overflow: 'hidden'
          }}
        >
          {filteredQuotes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#F5F5F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  color: 'var(--color-text-muted)'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--color-text)' }}>
                No quotations found
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                {searchQuery || selectedStatus !== 'all'
                  ? 'Try clearing your search query or filter to view all quotations.'
                  : 'New buyer quote submissions will automatically populate here.'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAF7', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Ref ID & Date
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Client & Company
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Location & Timeline
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Requested Items
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Pipeline Status
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote) => {
                    const badge = getStatusBadge(quote.status);
                    const whatsappLink = generateWhatsAppLink(
                      quote.phone,
                      quote.full_name,
                      quote.id,
                      quote.company,
                      quote.total_quantity
                    );
                    const emailLink = generateEmailLink(
                      quote.email,
                      quote.full_name,
                      quote.id,
                      quote.company,
                      quote.total_quantity
                    );

                    return (
                      <tr
                        key={quote.id}
                        style={{
                          borderBottom: '1px solid var(--color-border)',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFBF8')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        {/* Column 1: Ref ID & Date */}
                        <td style={{ padding: '14px 16px', verticalAlign: 'top' }}>
                          <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.85rem' }}>
                            #{quote.id.slice(0, 8).toUpperCase()}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                            {new Date(quote.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                            {new Date(quote.created_at).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          {quote.isLocalOnly && (
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                background: '#FEF3C7',
                                color: '#92400E',
                                padding: '1px 5px',
                                borderRadius: '3px',
                                marginTop: '4px'
                              }}
                            >
                              OFFLINE DRAFT
                            </span>
                          )}
                        </td>

                        {/* Column 2: Client & Company */}
                        <td style={{ padding: '14px 16px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.9rem' }}>
                            {quote.full_name}
                          </div>
                          <div style={{ fontWeight: 600, color: 'var(--color-primary-dark)', fontSize: '0.82rem', marginTop: '2px' }}>
                            🏢 {quote.company}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '0.78rem' }}>
                            <a
                              href={emailLink}
                              style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
                              title={`Email: ${quote.email}`}
                            >
                              ✉️ {quote.email}
                            </a>
                            {quote.phone && (
                              <span style={{ color: 'var(--color-text-muted)' }}>
                                📞 {quote.phone}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Column 3: Location & Timeline */}
                        <td style={{ padding: '14px 16px', verticalAlign: 'top' }}>
                          <div style={{ fontSize: '0.82rem', color: 'var(--color-text)' }}>
                            📍 {quote.delivery_city || 'City not specified'}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            Target: <span style={{ fontWeight: 600 }}>{quote.target_date || 'Flexible'}</span>
                          </div>
                          {quote.notes && (
                            <div
                              style={{
                                fontSize: '0.74rem',
                                color: 'var(--color-text-muted)',
                                fontStyle: 'italic',
                                marginTop: '4px',
                                maxWidth: '200px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                              title={quote.notes}
                            >
                              "{quote.notes}"
                            </div>
                          )}
                        </td>

                        {/* Column 4: Requested Items */}
                        <td style={{ padding: '14px 16px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 700, color: 'var(--color-text)' }}>
                            {quote.total_quantity.toLocaleString()} units
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                            {quote.item_count} SKU{quote.item_count === 1 ? '' : 's'} requested
                          </div>
                          <div style={{ marginTop: '4px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {(quote.quote_request_items || []).slice(0, 2).map((item, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: '0.7rem',
                                  backgroundColor: '#F3F4F0',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  color: 'var(--color-text)',
                                  maxWidth: '180px',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                                title={`${item.product_name} (${item.sku}) x ${item.quantity}`}
                              >
                                {item.sku}: {item.quantity}u
                              </span>
                            ))}
                            {(quote.quote_request_items || []).length > 2 && (
                              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                +{(quote.quote_request_items || []).length - 2} more
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Column 5: Status selector */}
                        <td style={{ padding: '14px 16px', verticalAlign: 'top' }}>
                          <select
                            value={quote.status}
                            onChange={(e) => handleStatusChange(quote.id, e.target.value as QuoteStatus)}
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '5px 8px',
                              borderRadius: '6px',
                              border: `1px solid ${badge.border}`,
                              backgroundColor: badge.bg,
                              color: badge.color,
                              cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="new">● NEW INQUIRY</option>
                            <option value="reviewed">● REVIEWED</option>
                            <option value="quoted">● QUOTE SENT</option>
                            <option value="fulfilled">● FULFILLED</option>
                            <option value="archived">● ARCHIVED</option>
                          </select>
                        </td>

                        {/* Column 6: Actions */}
                        <td style={{ padding: '14px 16px', verticalAlign: 'top', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                            {/* Inspect */}
                            <button
                              onClick={() => setSelectedQuote(quote)}
                              style={{
                                padding: '6px 12px',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                backgroundColor: 'var(--color-primary, #153D25)',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)')}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
                            >
                              Inspect RFQ →
                            </button>

                            {/* WhatsApp link if available */}
                            {whatsappLink && (
                              <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '30px',
                                  height: '30px',
                                  borderRadius: '6px',
                                  backgroundColor: '#E6F9F0',
                                  border: '1px solid #A8ECC8',
                                  color: '#0E7A4A',
                                  textDecoration: 'none'
                                }}
                              >
                                💬
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* ---------------------------------------------------------------------- */}
      {/* Detail Inspection Modal */}
      {/* ---------------------------------------------------------------------- */}
      {selectedQuote && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedQuote(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '840px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--color-border)',
              boxSizing: 'border-box'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F9FAF7'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                  COMMERCIAL RFQ DOSSIER
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: 'var(--color-primary-dark)' }}>
                  {selectedQuote.company} — {selectedQuote.full_name}
                </h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px', fontFamily: 'monospace' }}>
                  Ref #{selectedQuote.id} | Logged: {new Date(selectedQuote.created_at).toLocaleString()}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select
                  value={selectedQuote.status}
                  onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value as QuoteStatus)}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <option value="new">● Status: NEW</option>
                  <option value="reviewed">● Status: REVIEWED</option>
                  <option value="quoted">● Status: QUOTE SENT</option>
                  <option value="fulfilled">● Status: FULFILLED</option>
                  <option value="archived">● Status: ARCHIVED</option>
                </select>

                <button
                  onClick={() => setSelectedQuote(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)',
                    padding: '4px 8px',
                    lineHeight: 1
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              {/* Buyer Information Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  backgroundColor: '#F8F9F5',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  marginBottom: '24px'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                    Buyer Name
                  </span>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '2px' }}>
                    {selectedQuote.full_name}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                    Organization / Company
                  </span>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginTop: '2px' }}>
                    {selectedQuote.company}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                    Corporate Email
                  </span>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '2px' }}>
                    <a href={`mailto:${selectedQuote.email}`} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                      {selectedQuote.email}
                    </a>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                    Phone / WhatsApp
                  </span>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '2px' }}>
                    {selectedQuote.phone || 'Not provided'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                    Delivery City
                  </span>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '2px' }}>
                    {selectedQuote.delivery_city || 'Not provided'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                    Target Delivery Date
                  </span>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '2px' }}>
                    {selectedQuote.target_date || 'Flexible'}
                  </div>
                </div>
              </div>

              {/* Buyer Notes */}
              {selectedQuote.notes && (
                <div
                  style={{
                    backgroundColor: '#FFFBEB',
                    border: '1px solid #FDE68A',
                    borderRadius: '8px',
                    padding: '14px 18px',
                    marginBottom: '24px'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#B45309' }}>
                    BUYER PROJECT NOTES
                  </span>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#92400E', lineHeight: 1.5 }}>
                    "{selectedQuote.notes}"
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {/* WhatsApp */}
                {selectedQuote.phone && (
                  <a
                    href={generateWhatsAppLink(
                      selectedQuote.phone,
                      selectedQuote.full_name,
                      selectedQuote.id,
                      selectedQuote.company,
                      selectedQuote.total_quantity
                    ) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    <span>💬 Chat on WhatsApp</span>
                  </a>
                )}

                {/* Email */}
                <a
                  href={generateEmailLink(
                    selectedQuote.email,
                    selectedQuote.full_name,
                    selectedQuote.id,
                    selectedQuote.company,
                    selectedQuote.total_quantity
                  )}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <span>✉️ Email Quotation</span>
                </a>

                {/* Copy Text */}
                <button
                  onClick={() => handleCopyDossier(selectedQuote)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    cursor: 'pointer'
                  }}
                >
                  <span>📋 Copy Summary</span>
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(selectedQuote.id)}
                  style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    backgroundColor: '#FFF0F0',
                    border: '1px solid #FFD0D0',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#D91C0E',
                    cursor: 'pointer'
                  }}
                >
                  <span>🗑️ Delete Quote</span>
                </button>
              </div>

              {/* Itemized Line Items Table */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: '0 0 12px 0' }}>
                  Requested Products ({selectedQuote.item_count} Items, {selectedQuote.total_quantity} Units)
                </h3>

                <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F9FAF7', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                        <th style={{ padding: '10px 14px', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' }}>Item</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' }}>Category</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' }}>Variant</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' }}>Branding Method</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', textAlign: 'right' }}>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedQuote.quote_request_items || []).map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {item.image_url ? (
                                <img
                                  src={item.image_url}
                                  alt={item.product_name}
                                  style={{
                                    width: '42px',
                                    height: '42px',
                                    objectFit: 'contain',
                                    backgroundColor: '#F4F5EB',
                                    borderRadius: '6px',
                                    border: '1px solid var(--color-border)'
                                  }}
                                  onError={(e) => {
                                    (e.currentTarget as HTMLElement).style.display = 'none';
                                  }}
                                />
                              ) : null}
                              <div>
                                <div style={{ fontWeight: 700, color: 'var(--color-text)' }}>{item.product_name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontFamily: 'monospace' }}>
                                  {item.sku}
                                </div>
                                {item.notes && (
                                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                                    Note: {item.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 14px', verticalAlign: 'middle', color: 'var(--color-text-muted)' }}>
                            {item.category}
                          </td>
                          <td style={{ padding: '12px 14px', verticalAlign: 'middle', fontWeight: 600 }}>
                            {item.variant || 'Standard'}
                          </td>
                          <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>
                            <span
                              style={{
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                backgroundColor: '#EDF2EC',
                                color: 'var(--color-primary)',
                                padding: '3px 8px',
                                borderRadius: '4px'
                              }}
                            >
                              {item.branding_method || 'Standard'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 14px', verticalAlign: 'middle', textAlign: 'right', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                            {item.quantity.toLocaleString()} units
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ backgroundColor: '#F9FAF7', fontWeight: 800 }}>
                        <td colSpan={4} style={{ padding: '12px 14px', textAlign: 'right' }}>
                          Total Quotation Volume:
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right', fontSize: '1rem', color: 'var(--color-primary)' }}>
                          {selectedQuote.total_quantity.toLocaleString()} units
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* Settings Modal (Change Passcode) */}
      {/* ---------------------------------------------------------------------- */}
      {showSettingsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '440px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--color-border)',
              boxSizing: 'border-box'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                Owner Security Settings
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                ×
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
              Update the master passcode required to access the AV Corporate giftings & events Owner Admin Desk.
            </p>

            <form onSubmit={handleSaveNewPassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  New Master Passcode
                </label>
                <input
                  type="text"
                  placeholder="Enter new secret passcode..."
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '0.9rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {settingsSuccess && (
                <div style={{ fontSize: '0.82rem', color: '#0E7A4A', backgroundColor: '#E6F9F0', padding: '8px 12px', borderRadius: '6px' }}>
                  ✓ {settingsSuccess}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Save Passcode
                </button>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#F5F5F5',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Reset Default
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
