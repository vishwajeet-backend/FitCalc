import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'use-of-contents',
        'user-accounts',
        'intellectual-property',
        'privacy',
        'limitation-of-liability',
        'changes-to-terms',
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

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
    minHeight: '100vh'
  };

  const heroSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    padding: '30px 40px',
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
    maxHeight: '400px',
    borderRadius: '24px',
    objectFit: 'cover',
    backgroundColor: '#E1E6F2',
    overflow: 'hidden'
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
    <div style={pageContainerStyle} className="legal-page-container">
      <Banner />
      {/* Hero Section */}
      <section style={heroSectionStyle} className="legal-hero-section">
        <p style={lastUpdatedStyle}>Last updated: December 17, 2024</p>
        <h1 style={pageTitleStyle} className="legal-page-title">Terms & Conditions</h1>
        <p style={pageSubtitleStyle} className="legal-page-subtitle">Please read these terms carefully before using our services</p>
        <div style={heroImageStyle} className="legal-hero-image">
          <img 
            src="https://www.figma.com/api/mcp/asset/addf172e-f2ad-40fd-a50c-1bbfb8cf5060" 
            alt="Terms and Conditions Illustration" 
            style={{width: '100%', objectFit: 'cover', borderRadius: '24px'}}
          />
        </div>
      </section>

      {/* Content Area */}
      <div style={contentWrapperStyle} className="legal-content-wrapper">
        {/* Main Content */}
        <main style={mainContentStyle} className="legal-main-content">
          {/* Introduction */}
          <section id="introduction" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Introduction</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                Welcome to FitCalc, a platform dedicated to providing accurate and helpful health calculators. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by the following terms and conditions. These terms govern your use of FitCalc and all content, services, and features available on our platform.
              </p>
              <p style={paragraphStyle}>
                Acceptance of Terms: Your access to and use of FitCalc is conditioned upon your acceptance of these terms. If you do not agree with any part of these terms, you must not use our website. We reserve the right to modify or revise these terms at any time, and your continued use of FitCalc after any changes constitutes your acceptance of the new terms.
              </p>
              <p style={paragraphStyle}>
                Description of Service: FitCalc provides a variety of health and fitness calculators for informational purposes only. We strive to ensure that the calculations and information provided are accurate and up-to-date, but we make no warranties or guarantees as to the accuracy, completeness, or reliability of any content. Your use of any information or calculators on this website is entirely at your own risk.
              </p>
            </div>
          </section>

          {/* Use of Contents */}
          <section id="use-of-contents" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Use of Contents</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                All content on FitCalc, including but not limited to text, graphics, logos, images, and calculators, is the property of FitCalc and is protected by copyright and other intellectual property laws. You may use our calculators and view content for personal, non-commercial purposes only.
              </p>
              <p style={paragraphStyle}>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our material without prior written consent. Commercial use of any calculator results or content requires explicit permission from FitCalc.
              </p>
              <p style={paragraphStyle}>
                Prohibited Uses: You agree not to use FitCalc for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks. You may not attempt to gain unauthorized access to any portion of our website or any systems or networks connected to our website.
              </p>
            </div>
          </section>

          {/* User Accounts */}
          <section id="user-accounts" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>User Accounts</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                Currently, FitCalc does not require user account creation to access our calculators and services. If we implement user accounts in the future, you will be responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
              <p style={paragraphStyle}>
                You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation.
              </p>
              <p style={paragraphStyle}>
                Account Termination: We reserve the right to terminate or suspend any user account at our sole discretion, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section id="intellectual-property" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Intellectual Property</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                The FitCalc name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of FitCalc or its affiliates. You must not use such marks without our prior written permission. All other names, logos, product and service names, designs, and slogans on this website are the trademarks of their respective owners.
              </p>
              <p style={paragraphStyle}>
                Calculator Algorithms: The algorithms, formulas, and methodologies used in our calculators are based on widely accepted medical and scientific standards. While we implement these calculations with care, they are provided for informational purposes only and should not replace professional medical advice.
              </p>
              <p style={paragraphStyle}>
                User Feedback: If you provide us with any feedback, suggestions, or ideas about FitCalc, you grant us a perpetual, worldwide, royalty-free license to use, modify, and incorporate such feedback into our services without any obligation to you.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section id="privacy" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Privacy</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={{...paragraphStyle, color: '#404041'}}>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use FitCalc. By using our website, you consent to the collection and use of information as described in our Privacy Policy.
              </p>
              <p style={{...paragraphStyle, color: '#404041'}}>
                Data Collection: We may collect personal information that you voluntarily provide when using our calculators, such as height, weight, age, and other health metrics. This information is used solely to perform calculations and is not stored on our servers unless you explicitly save it.
              </p>
              <p style={{...paragraphStyle, color: '#404041'}}>
                Cookies and Analytics: We use cookies and similar tracking technologies to improve your experience on our website and to gather analytics about website usage. You can control cookie preferences through your browser settings. For more details, please refer to our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section id="limitation-of-liability" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Limitation of Liability</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                Medical Disclaimer: FitCalc calculators are for informational and educational purposes only. They are not intended to diagnose, treat, cure, or prevent any disease or health condition. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
              <p style={paragraphStyle}>
                No Warranties: FitCalc is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that our website will be uninterrupted, secure, or error-free, or that defects will be corrected. We do not warrant the accuracy or completeness of any calculator results.
              </p>
              <p style={paragraphStyle}>
                Limitation of Damages: To the fullest extent permitted by law, FitCalc shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our website.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section id="changes-to-terms" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Changes to Terms</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <p style={paragraphStyle}>
                We reserve the right to modify these Terms and Conditions at any time. We will notify users of any material changes by posting the new Terms and Conditions on this page and updating the "Last updated" date at the top of this page.
              </p>
              <p style={paragraphStyle}>
                Your continued use of FitCalc after any such changes constitutes your acceptance of the new Terms and Conditions. We encourage you to review these terms periodically to stay informed about any updates.
              </p>
              <p style={paragraphStyle}>
                If you do not agree to the modified terms, you must stop using FitCalc. Your only remedy if you do not accept the modified terms is to discontinue use of our website and services.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact-information" style={contactSectionStyle}>
            <h2 style={sectionTitleStyle}>Contact Information</h2>
            <p style={{...contactTextStyle, fontSize: '14px', color: '#7D7D80'}}>
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div style={contactBoxStyle}>
              <p style={contactTitleStyle}>FitCalc</p>
              <p style={contactTextStyle}>Email: hello@fitcalc.io</p>
              <button style={contactLinkStyle} onClick={() => window.location.href = '/contact'}>
                Contact Form
              </button>
            </div>
          </section>
        </main>

        {/* Table of Contents Sidebar */}
        <aside style={sidebarStyle} className="legal-sidebar">
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
              style={activeSection === 'use-of-contents' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('use-of-contents')}
            >
              Use of Contents
              {activeSection === 'use-of-contents' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'user-accounts' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('user-accounts')}
            >
              User Accounts
              {activeSection === 'user-accounts' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'intellectual-property' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('intellectual-property')}
            >
              Intellectual Property
              {activeSection === 'intellectual-property' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'privacy' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('privacy')}
            >
              Privacy
              {activeSection === 'privacy' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'limitation-of-liability' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('limitation-of-liability')}
            >
              Limitation of Liability
              {activeSection === 'limitation-of-liability' && <div style={indicatorStyle}></div>}
            </li>
            <li 
              style={activeSection === 'changes-to-terms' ? tocItemActiveStyle : tocItemStyle}
              onClick={() => scrollToSection('changes-to-terms')}
            >
              Changes to Terms
              {activeSection === 'changes-to-terms' && <div style={indicatorStyle}></div>}
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

export default TermsPage;
