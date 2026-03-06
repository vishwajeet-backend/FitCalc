import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PrivacyPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'information-we-collect',
        'how-we-use-information',
        'information-sharing',
        'data-security',
        'your-rights',
        'cookies-tracking',
        'contact-information'
      ];

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -100;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '80px',
    backgroundColor: '#DCE6FA',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
  };

  const containerStyle = {
    maxWidth: '1800px',
    width: '100%',
    padding: '0 42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const logoStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '36px',
    fontWeight: '500',
    color: '#161E24',
    textDecoration: 'none',
    lineHeight: 'normal'
  };

  const navStyle = {
    display: 'flex',
    gap: '24px',
    alignItems: 'center'
  };

  const navLinkStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '14px',
    fontWeight: '400',
    color: '#000000',
    textDecoration: 'none',
    padding: '15px 10px',
    lineHeight: '22.4px'
  };

  const pageContainerStyle = {
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    paddingTop: '80px'
  };

  const heroSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    padding: '60px 40px',
    maxWidth: '1360px',
    margin: '0 auto'
  };

  const lastUpdatedStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    color: '#7D7D80',
    lineHeight: '21px',
    textAlign: 'center'
  };

  const pageTitleStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '48px',
    fontWeight: '600',
    color: '#141414',
    lineHeight: '60px',
    letterSpacing: '-1px',
    textAlign: 'center',
    margin: '0'
  };

  const pageSubtitleStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '16px',
    fontWeight: '500',
    color: '#404041',
    lineHeight: '24px',
    textAlign: 'center'
  };

  const heroImageStyle = {
    width: '100%',
    height: '700px',
    borderRadius: '24px',
    objectFit: 'cover',
    backgroundColor: '#E1E6F2'
  };

  const contentWrapperStyle = {
    maxWidth: '1360px',
    margin: '0 auto',
    padding: '60px 40px',
    display: 'flex',
    gap: '80px'
  };

  const mainContentStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '48px'
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    scrollMarginTop: '100px'
  };

  const sectionTitleStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '20px',
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 'normal',
    margin: '0'
  };

  const paragraphStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '16px',
    fontWeight: '500',
    color: '#5C5C5E',
    lineHeight: '28px',
    margin: '0'
  };

  const contactSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    scrollMarginTop: '100px'
  };

  const contactBoxStyle = {
    backgroundColor: '#F5F5F7',
    border: '1.295px solid #EDEDED',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const contactTitleStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '15px',
    fontWeight: '700',
    color: '#222222',
    lineHeight: '22.5px',
    margin: '0'
  };

  const contactTextStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '15px',
    fontWeight: '500',
    color: '#6B6B6B',
    lineHeight: '22.5px',
    margin: '0'
  };

  const contactLinkStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '15px',
    fontWeight: '500',
    color: '#222222',
    lineHeight: '22.5px',
    textDecoration: 'underline',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '0'
  };

  const sidebarStyle = {
    width: '240px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'sticky',
    top: '100px',
    alignSelf: 'flex-start'
  };

  const sidebarTitleStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '12px',
    fontWeight: '500',
    color: '#7D7D80',
    lineHeight: '18px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    margin: '0'
  };

  const tocListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    listStyle: 'none',
    padding: '0',
    margin: '0'
  };

  const tocItemStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    color: '#7D7D80',
    lineHeight: '21px',
    cursor: 'pointer',
    padding: '4px 0',
    transition: 'color 0.2s',
    userSelect: 'none'
  };

  const tocItemActiveStyle = {
    ...tocItemStyle,
    fontWeight: '600',
    color: '#1A1A1A',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const indicatorStyle = {
    width: '3px',
    height: '16px',
    backgroundColor: '#222222'
  };

  return (
    <div style={pageContainerStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={containerStyle}>
          <Link to="/" style={logoStyle}>FitCalc</Link>
          <nav style={navStyle}>
            <Link to="/" style={navLinkStyle}>Fitness</Link>
            <Link to="/" style={navLinkStyle}>Pregnancy</Link>
            <Link to="/" style={navLinkStyle}>Metabolism</Link>
            <Link to="/blog" style={navLinkStyle}>Blog</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <p style={lastUpdatedStyle}>Last updated: December 17, 2024</p>
        <h1 style={pageTitleStyle}>Privacy Policy</h1>
        <p style={pageSubtitleStyle}>Please read these policies carefully before using our services</p>
        <div style={heroImageStyle}>
          <img 
            src="https://www.figma.com/api/mcp/asset/d9a985fd-6c4f-4761-89df-d1c3d6211427" 
            alt="Privacy Policy Illustration" 
            style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px'}}
          />
        </div>
      </section>

      {/* Content Area */}
      <div style={contentWrapperStyle}>
        {/* Main Content */}
        <main style={mainContentStyle}>
          {/* Introduction */}
          <section id="introduction" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Introduction</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                Welcome to FitCalc. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, store, and protect your information when you use our health and fitness calculators.
              </p>
              <p style={paragraphStyle}>
                This policy applies to all information collected through our website and any related services, sales, marketing, or events. By using FitCalc, you consent to the data practices described in this policy.
              </p>
              <p style={paragraphStyle}>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically for any changes.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section id="information-we-collect" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Information We Collect</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                Calculator Input Data: When you use our calculators, you may provide health-related information such as height, weight, age, gender, activity level, and other metrics. This data is processed locally in your browser and is not stored on our servers unless you explicitly choose to save it.
              </p>
              <p style={paragraphStyle}>
                Usage Information: We automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of your visits. This helps us improve our services and understand user behavior.
              </p>
              <p style={paragraphStyle}>
                Cookies and Tracking Technologies: We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and gather analytics about website usage. You can control cookie preferences through your browser settings. For more information, see our Cookies and Tracking section below.
              </p>
            </div>
          </section>

          {/* How We Use Information */}
          <section id="how-we-use-information" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>How We Use Information</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                Provide Calculator Services: We use the information you input into our calculators to perform calculations and provide you with results. These calculations are performed in real-time and the input data is not permanently stored unless you request it.
              </p>
              <p style={paragraphStyle}>
                Improve Our Services: We analyze usage patterns and aggregate data to improve our calculators, develop new features, and enhance user experience. This analysis is performed on anonymized data that cannot be traced back to individual users.
              </p>
              <p style={paragraphStyle}>
                Communication: If you contact us or subscribe to our newsletter, we may use your email address to respond to your inquiries, send updates about our services, or provide health and fitness tips. You can opt out of marketing communications at any time.
              </p>
            </div>
          </section>

          {/* Information Sharing */}
          <section id="information-sharing" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Information Sharing</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances: with your explicit consent, to comply with legal obligations, to protect our rights and safety, or with service providers who assist us in operating our website.
              </p>
              <p style={paragraphStyle}>
                Service Providers: We may share information with trusted third-party service providers who perform services on our behalf, such as hosting, analytics, and customer support. These providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>
              <p style={paragraphStyle}>
                Legal Requirements: We may disclose your information if required by law, regulation, legal process, or governmental request. We may also disclose information to enforce our terms and conditions, protect our rights or property, or ensure the safety of our users or the public.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section id="data-security" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Data Security</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, access controls, and regular security assessments.
              </p>
              <p style={paragraphStyle}>
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of any account credentials.
              </p>
              <p style={paragraphStyle}>
                Data Retention: We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. Calculator input data is typically processed in real-time and not retained.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section id="your-rights" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Your Rights</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                Access and Correction: You have the right to access the personal information we hold about you and request corrections if it is inaccurate or incomplete. Since most calculator data is not stored, there may be limited personal information available.
              </p>
              <p style={paragraphStyle}>
                Deletion: You have the right to request deletion of your personal information, subject to certain legal exceptions. You can clear your browser data to remove any locally stored calculator preferences or saved results.
              </p>
              <p style={paragraphStyle}>
                Opt-Out: You can opt out of receiving marketing communications from us at any time by clicking the unsubscribe link in our emails or contacting us directly. You can also disable cookies through your browser settings, though this may affect website functionality.
              </p>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section id="cookies-tracking" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Cookies and Tracking</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                Cookies are small text files stored on your device that help us provide and improve our services. We use essential cookies for basic website functionality, analytics cookies to understand how visitors use our site, and preference cookies to remember your settings.
              </p>
              <p style={paragraphStyle}>
                Third-Party Analytics: We may use third-party analytics services like Google Analytics to collect information about website usage. These services use cookies and similar technologies to track user behavior across websites. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
              </p>
              <p style={paragraphStyle}>
                Managing Cookies: Most web browsers allow you to control cookies through their settings. You can usually find cookie management options in your browser's privacy or security settings. Please note that disabling certain cookies may limit your ability to use some features of our website.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact-information" style={contactSectionStyle}>
            <h2 style={sectionTitleStyle}>Contact Information</h2>
            <p style={{...contactTextStyle, fontSize: '14px', color: '#7D7D80'}}>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div style={contactBoxStyle}>
              <p style={contactTitleStyle}>FitCalc</p>
              <p style={contactTextStyle}>Email: privacy@fitcalc.io</p>
              <button style={contactLinkStyle} onClick={() => window.location.href = '/contact'}>
                Contact Form
              </button>
            </div>
          </section>
        </main>

        {/* Table of Contents Sidebar */}
        <aside style={sidebarStyle}>
          <h3 style={sidebarTitleStyle}>Contents</h3>
          <ul style={tocListStyle}>
            <li 
              style={activeSection === 'introduction' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('introduction')}
            >
              Introduction
              {activeSection === 'introduction' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'information-we-collect' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('information-we-collect')}
            >
              Information We Collect
              {activeSection === 'information-we-collect' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'how-we-use-information' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('how-we-use-information')}
            >
              How We Use Information
              {activeSection === 'how-we-use-information' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'information-sharing' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('information-sharing')}
            >
              Information Sharing
              {activeSection === 'information-sharing' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'data-security' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('data-security')}
            >
              Data Security
              {activeSection === 'data-security' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'your-rights' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('your-rights')}
            >
              Your Rights
              {activeSection === 'your-rights' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'cookies-tracking' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('cookies-tracking')}
            >
              Cookies and Tracking
              {activeSection === 'cookies-tracking' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'contact-information' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('contact-information')}
            >
              Contact Information
              {activeSection === 'contact-information' && <div style={indicatorStyle}></div>}
            </li>
          </ul>
        </aside>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPage;
