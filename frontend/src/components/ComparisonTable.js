import React from 'react';
import { useTranslation } from 'react-i18next';

const ComparisonTable = () => {
  const { t } = useTranslation();
  const svgToDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const iconCheck = svgToDataUri("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><rect width='24' height='24' rx='6' fill='#5b77b9'/></svg>");
  const iconCheckmark = svgToDataUri("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><path d='M6.8 12.2L10.2 15.6L17.2 8.6' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/></svg>");
  const mobileRows = [
    {
      fitcalc: t('comparison.mobile.fitcalc.row1', { defaultValue: 'All calculators free' }),
      others: t('comparison.mobile.others.row1', { defaultValue: 'Limited tools, advanced require payment' })
    },
    {
      fitcalc: t('comparison.mobile.fitcalc.row2', { defaultValue: 'Clean and modern interface' }),
      others: t('comparison.mobile.others.row2', { defaultValue: 'Outdated layouts with clutter' })
    },
    {
      fitcalc: t('comparison.mobile.fitcalc.row3', { defaultValue: 'Mobile-optimized' }),
      others: t('comparison.mobile.others.row3', { defaultValue: 'Desktop-first design' })
    }
  ];

  return (
    <section className="comparison-section">
      <div className="comparison-container">
        <div className="comparison-header">
          <h2 className="comparison-main-title">{t('comparison.title', { defaultValue: 'How We Compare to Others' })}</h2>
          <p className="comparison-subtitle">{t('comparison.subtitle', { defaultValue: 'All calculators are available for free with no premium restrictions.' })}</p>
        </div>

        <div className="comparison-table comparison-table-desktop">
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

        <div className="comparison-table-mobile" role="table" aria-label={t('comparison.mobile.title', { defaultValue: 'FitCalc comparison' })}>
          <div className="comparison-table-mobile-header" role="row">
            <div className="comparison-mobile-header-cell comparison-mobile-header-fitcalc" role="columnheader">
              <h3>{t('siteName', { defaultValue: 'FitCalc' })}</h3>
            </div>
            <div className="comparison-mobile-header-cell comparison-mobile-header-others" role="columnheader">
              <h3>{t('comparison.mobile.others', { defaultValue: 'Others' })}</h3>
            </div>
          </div>

          {mobileRows.map((row, index) => (
            <div className="comparison-mobile-row" role="row" key={`mobile-row-${index}`}>
              <div className="comparison-mobile-cell" role="cell">
                <div className="cell-content">
                  <div className="icon-container">
                    <img src={iconCheck} alt="" className="check-icon-svg" />
                    <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                  </div>
                  <p>{row.fitcalc}</p>
                </div>
              </div>

              <div className="comparison-mobile-cell" role="cell">
                <div className="cell-content">
                  <div className="icon-container">
                    <img src={iconCheck} alt="" className="check-icon-svg" />
                    <img src={iconCheckmark} alt="" className="checkmark-icon-svg" />
                  </div>
                  <p>{row.others}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;