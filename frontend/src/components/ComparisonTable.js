import React from 'react';
import { useTranslation } from 'react-i18next';

const ComparisonTable = () => {
  const { t } = useTranslation();
  const iconCheck = "https://www.figma.com/api/mcp/asset/87df9095-d1e6-4dd1-91ff-660565a2879a";
  const iconCheckmark = "https://www.figma.com/api/mcp/asset/917f376c-2042-4b20-be4a-c15e42bd183d";

  return (
    <section className="comparison-section">
      <div className="comparison-container">
        <div className="comparison-header">
          <h2 className="comparison-main-title">{t('comparison.title', { defaultValue: 'How We Compare to Others' })}</h2>
          <p className="comparison-subtitle">{t('comparison.subtitle', { defaultValue: 'All calculators are available for free with no premium restrictions.' })}</p>
        </div>
        
        <div className="comparison-table">
          {/* Column 1: FitCalc */}
          <div className="comparison-column">
            <div className="header-cell header-fitcalc">
              <h3>{t('siteName')}</h3>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.fitcalc.row1', { defaultValue: 'All calculators are available for free with no premium restrictions' })}</p>
              </div>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.fitcalc.row2', { defaultValue: 'Clean and modern interface designed for fast and smooth usage.' })}</p>
              </div>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.fitcalc.row3', { defaultValue: 'Mobile-first design optimized for gym use and quick daily checks.' })}</p>
              </div>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.fitcalc.row4', { defaultValue: 'Results are shown with clear ranges, categories, and simple explanations' })}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Other Competitors */}
          <div className="comparison-column">
            <div className="header-cell header-competitor">
              <h3>{t('comparison.competitors', { defaultValue: 'Other Competitors' })}</h3>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.compA.row1', { defaultValue: 'Most tools are limited and advanced calculators require payment.' })}</p>
              </div>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.compA.row2', { defaultValue: 'Outdated layouts with cluttered design and confusing navigation.' })}</p>
              </div>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.compA.row3', { defaultValue: 'Mobile experience is not smooth and requires extra scrolling.' })}</p>
              </div>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.compA.row4', { defaultValue: 'Shows numbers only with minimal explanation or guidance.' })}</p>
              </div>
            </div>
          </div>

          {/* Column 3: Other Competitors */}
          <div className="comparison-column">
            <div className="header-cell header-competitor">
              <h3>{t('comparison.competitors', { defaultValue: 'Other Competitors' })}</h3>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.compB.row1', { defaultValue: 'Basic features available for free; advanced tools require purchase. Some calculators are free but they push subscriptions and upgrades heavily.' })}</p>
              </div>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.compB.row2', { defaultValue: 'Too many popups, banners, and distractions that ruin user experience.' })}</p>
              </div>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.compB.row3', { defaultValue: 'Not responsive enough, with broken spacing and poor readability.' })}</p>
              </div>
            </div>
            <div className="comparison-cell">
              <div className="cell-content">
                <div className="icon-container">
                  <img src={iconCheck} alt="" className="check-icon-svg" />
                  <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                </div>
                <p>{t('comparison.compB.row4', { defaultValue: 'Basic features available for free; advanced tools require purchase. Some calculators are free but they push subscriptions and upgrades heavily.' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;