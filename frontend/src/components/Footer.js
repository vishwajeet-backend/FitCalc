import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>{t('fitness')}</h3>
            <ul>
              <li><Link to="/bmi-calculator">{t('bmiCalculator')}</Link></li>
              <li><Link to="/calorie-calculator">{t('calorieCalculator')}</Link></li>
              <li><Link to="/body-fat-calculator">{t('bodyFatCalculator')}</Link></li>
              <li><Link to="/tdee-calculator">{t('tdeeCalculator')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>{t('pregnancy')}</h3>
            <ul>
              <li><Link to="/due-date-calculator">{t('dueDateCalculator')}</Link></li>
              <li><Link to="/pregnancy-week-calculator">{t('pregnancyWeekCalculator')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Nutrition</h3>
            <ul>
              <li><Link to="/protein-intake-calculator">{t('proteinCalculator')}</Link></li>
              <li><Link to="/macro-calculator">{t('macroCalculator')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><Link to="/blog">{t('blog')}</Link></li>
              <li><Link to="/privacy">{t('privacyPolicy')}</Link></li>
              <li><Link to="/terms">{t('termsDisclaimer')}</Link></li>
              <li><Link to="/contact">{t('contact')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 FitCalc. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;