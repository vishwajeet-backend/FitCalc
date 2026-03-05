import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <header className="banner">
      <div className="banner-container">
        <div className="banner-inner">
          <Link to="/" className="logo">FitCalc</Link>
          
          <nav className="nav-menu">
            <Link to="/calculators" className="nav-item">Fitness</Link>
            <Link to="/pregnancy" className="nav-item">Pregnancy</Link>
            <Link to="/metabolism" className="nav-item">Metabolism</Link>
            <Link to="/blog" className="nav-item">Blog</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Banner;