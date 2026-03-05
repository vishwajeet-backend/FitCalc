import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const CalculatorLayout = ({ title, description, breadcrumbPath, children }) => {
  const styles = {
    page: {
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      background: 'white',
      padding: '1rem 0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    headerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#3b82f6',
      textDecoration: 'none',
    },
    nav: {
      display: 'flex',
      gap: '2rem',
    },
    navLink: {
      color: '#374151',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '0.9375rem',
      transition: 'color 0.2s',
    },
    breadcrumb: {
      background: 'white',
      padding: '0.75rem 0',
      borderBottom: '1px solid #e5e7eb',
    },
    breadcrumbContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
      fontSize: '0.875rem',
      color: '#6b7280',
    },
    breadcrumbLink: {
      color: '#3b82f6',
      textDecoration: 'none',
    },
    main: {
      flex: 1,
      padding: '2rem 0',
    },
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    description: {
      fontSize: '1rem',
      color: '#6b7280',
      marginBottom: '2rem',
      lineHeight: '1.6',
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <Link to="/" style={styles.logo}>FitCalc</Link>
          <nav style={styles.nav}>
            <Link to="/calculators" style={styles.navLink}>Fitness</Link>
            <Link to="/pregnancy" style={styles.navLink}>Pregnancy</Link>
            <Link to="/metabolism" style={styles.navLink}>Metabolism</Link>
            <Link to="/blog" style={styles.navLink}>Blog</Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <div style={styles.breadcrumbContainer}>
          <Link to="/" style={styles.breadcrumbLink}>home</Link>
          <span> / </span>
          <Link to="/calculators" style={styles.breadcrumbLink}>fitness & health</Link>
          <span> / </span>
          <span>{breadcrumbPath}</span>
        </div>
      </div>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.mainContainer}>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.description}>{description}</p>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CalculatorLayout;
