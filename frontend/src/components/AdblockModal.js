import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * AdblockModal — Accessible, non-dismissible modal shown when adblock is detected.
 *
 * Props:
 *   onRetry   — called when user clicks "Retry"
 *   loading   — whether a retry detection is in progress
 */
const AdblockModal = ({ onRetry, loading }) => {
  const { t } = useTranslation();
  const retryRef = useRef(null);

  // Trap focus inside the modal and prevent Escape from closing it
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
      }

      // Focus trap: cycle between interactive elements inside the modal
      if (e.key === 'Tab') {
        const modal = document.getElementById('adblock-modal');
        if (!modal) return;

        const focusable = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-focus retry button on mount
    if (retryRef.current) {
      retryRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div style={styles.overlay} aria-hidden="true" />

      {/* Modal */}
      <div
        id="adblock-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="adblock-modal-title"
        aria-describedby="adblock-modal-desc"
        style={styles.modal}
      >
        {/* Icon */}
        <div style={styles.iconWrapper}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="24" fill="#FEE2E2" />
            <path
              d="M24 14V26M24 30V34"
              stroke="#DC2626"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 id="adblock-modal-title" style={styles.title}>
          {t('adblock.title', { defaultValue: 'Ad Blocker Detected' })}
        </h2>

        <p id="adblock-modal-desc" style={styles.description}>
          {t('adblock.description', { defaultValue: "It looks like you are using an ad blocker. FitCalc relies on ads to remain free. Please disable your ad blocker for this site and click Retry to continue using the calculators." })}
        </p>

        <div style={styles.actions}>
          <button
            ref={retryRef}
            onClick={onRetry}
            disabled={loading}
            style={{
              ...styles.retryButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? t('adblock.checking', { defaultValue: 'Checking...' }) : t('adblock.retry', { defaultValue: 'Retry' })}
          </button>

          <a
            href="/help/disable-adblock"
            style={styles.helpLink}
          >
            {t('adblock.helpLink', { defaultValue: 'How to disable your ad blocker' })}
          </a>
        </div>
      </div>
    </>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    zIndex: 9998,
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px 32px 32px',
    maxWidth: '440px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
    textAlign: 'center',
    fontFamily: "'IBM Plex Sans', sans-serif",
  },
  iconWrapper: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '22px',
    fontWeight: 600,
    color: '#161e24',
    margin: '0 0 12px',
  },
  description: {
    fontSize: '15px',
    lineHeight: 1.6,
    color: '#475569',
    margin: '0 0 28px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
  },
  retryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 36px',
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: "'IBM Plex Sans', sans-serif",
    color: '#ffffff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '10px',
    transition: 'background-color 0.2s',
  },
  helpLink: {
    fontSize: '14px',
    color: '#3b82f6',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default AdblockModal;
