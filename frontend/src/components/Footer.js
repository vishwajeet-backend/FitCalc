import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Fitness</h3>
            <ul>
              <li><Link to="/calculator/bmi">BMI Calculator</Link></li>
              <li><Link to="/calculator/calorie">Calorie Calculator</Link></li>
              <li><Link to="/calculator/body-fat">Body Fat Calculator</Link></li>
              <li><Link to="/calculator/tdee">TDEE Calculator</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Pregnancy</h3>
            <ul>
              <li><Link to="/calculator/due-date">Due Date Calculator</Link></li>
              <li><Link to="/calculator/pregnancy-week">Pregnancy Week</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Nutrition</h3>
            <ul>
              <li><Link to="/calculator/protein">Protein Calculator</Link></li>
              <li><Link to="/calculator/macro">Macro Calculator</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Disclaimer</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 FitCalc. All rights reserved. Not medical advice. Consult a professional for health decisions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;