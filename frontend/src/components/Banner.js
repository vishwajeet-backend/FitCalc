import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.banner-inner')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="banner">
      <div className="banner-container">
        <div className="banner-inner">
          <Link to="/" className="logo" onClick={closeMenu}>FitCalc</Link>
          
          {/* Hamburger Button */}
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Menu */}
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/calculators" className="nav-item" onClick={closeMenu}>Fitness</Link>
            <Link to="/pregnancy" className="nav-item" onClick={closeMenu}>Pregnancy</Link>
            <Link to="/metabolism" className="nav-item" onClick={closeMenu}>Metabolism</Link>
            <Link to="/blog" className="nav-item" onClick={closeMenu}>Blog</Link>
          </nav>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
        </div>
      </div>
    </header>
  );
};

export default Banner;