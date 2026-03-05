import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Fitness</h3>
            <ul>
              <li>BMI Calculator</li>
              <li>Calorie Calculator</li>
              <li>Body Fat Calculator</li>
              <li>TDEE Calculator</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Pregnancy</h3>
            <ul>
              <li>Due Date Calculator</li>
              <li>Pregnancy Week</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Nutrition</h3>
            <ul>
              <li>Protein Calculator</li>
              <li>Macro Calculator</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Privacy Policy</li>
              <li>Terms & Disclaimer</li>
              <li>Contact</li>
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