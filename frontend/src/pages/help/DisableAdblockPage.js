import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

const instructions = [
  {
    name: 'AdBlock / AdBlock Plus',
    steps: [
      'Click the AdBlock (or ABP) icon in your browser toolbar.',
      'Select "Don\'t run on pages on this site" or "Pause on this site".',
      'Refresh the page.',
    ],
  },
  {
    name: 'uBlock Origin',
    steps: [
      'Click the uBlock Origin icon in your browser toolbar.',
      'Click the large blue power button to disable it for this site.',
      'Refresh the page.',
    ],
  },
  {
    name: 'Ghostery',
    steps: [
      'Click the Ghostery icon in your browser toolbar.',
      'Toggle the "Trust Site" switch to ON.',
      'Refresh the page.',
    ],
  },
  {
    name: 'Brave Shield',
    steps: [
      'Click the Brave Shield icon (lion) at the right of the address bar.',
      'Toggle "Shields" to OFF for this site.',
      'The page will automatically reload.',
    ],
  },
  {
    name: 'Opera Ad Blocker',
    steps: [
      'Click the shield icon in the address bar.',
      'Toggle off "Block ads" for this site.',
      'Refresh the page.',
    ],
  },
];

const DisableAdblockPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="calculator-header-banner">
        <div className="calculator-header-content">
          <Link to="/" className="calculator-logo">FitCalc</Link>
          <nav className="calculator-nav">
            <Link to="/calculators" className="calculator-nav-item">Fitness</Link>
            <Link to="/pregnancy" className="calculator-nav-item">Pregnancy</Link>
            <Link to="/metabolism" className="calculator-nav-item">Metabolism</Link>
            <Link to="/blog" className="calculator-nav-item">Blog</Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Breadcrumb */}
        <div className="calculator-breadcrumb" style={{ marginBottom: '24px' }}>
          <Link to="/">home</Link>
          {' / '}
          <span>disable ad blocker</span>
        </div>

        <h1 style={styles.heading}>How to Disable Your Ad Blocker</h1>
        <p style={styles.intro}>
          FitCalc is a free service supported by advertising. To use our calculators,
          please whitelist this site in your ad blocker. Below are step-by-step
          instructions for the most popular extensions.
        </p>

        {instructions.map((blocker) => (
          <section key={blocker.name} style={styles.section}>
            <h2 style={styles.blockerName}>{blocker.name}</h2>
            <ol style={styles.stepsList}>
              {blocker.steps.map((step, i) => (
                <li key={i} style={styles.step}>{step}</li>
              ))}
            </ol>
          </section>
        ))}

        <div style={styles.backWrapper}>
          <Link to="/calculators" style={styles.backLink}>
            ← Back to calculators
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  heading: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#161e24',
    marginBottom: '12px',
    fontFamily: "'IBM Plex Sans', sans-serif",
  },
  intro: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#475569',
    marginBottom: '32px',
  },
  section: {
    marginBottom: '28px',
    padding: '20px 24px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  blockerName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '12px',
  },
  stepsList: {
    paddingLeft: '20px',
    margin: 0,
  },
  step: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#334155',
    marginBottom: '6px',
  },
  backWrapper: {
    marginTop: '32px',
  },
  backLink: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#3b82f6',
    textDecoration: 'none',
  },
};

export default DisableAdblockPage;
