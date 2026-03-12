import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FitnessCalculatorsGrid = () => {
  const { t } = useTranslation();

  return (
    <section className="fitness-calculators-grid">
      <h2 className="calculator-grid-main-title">{t('fitnessCalculatorsTitle', { defaultValue: 'Fitness Calculators' })}</h2>
      
      <div className="calculators-columns-container">
        <div className="calculators-column">
          <p className="header-subtitle">{t('fitnessCalculatorsTitle', { defaultValue: 'Fitness Calculators' })}</p>
          <Link to="/bmi-calculator" className="calculator-link">{t('bmiCalculator')}</Link>
          <Link to="/calorie-calculator" className="calculator-link">{t('calorieCalculator')}</Link>
          <Link to="/body-fat-calculator" className="calculator-link">{t('bodyFatCalculator')}</Link>
          <Link to="/bmr-calculator" className="calculator-link">{t('bmrCalculator')}</Link>
          <Link to="/ideal-weight-calculator" className="calculator-link">{t('idealWeightCalculator')}</Link>
        </div>

        <div className="calculators-column">
          <p className="header-subtitle">{t('pregnancy')}</p>
          <Link to="/due-date-calculator" className="calculator-link">{t('pregnancyCalculator', { defaultValue: 'Pregnancy Calculator' })}</Link>
          <Link to="/pregnancy-weight-gain-calculator" className="calculator-link">{t('pregnancyWeightGainCalculator')}</Link>
          <Link to="/conception-calculator" className="calculator-link">{t('pregnancyConceptionCalculator', { defaultValue: 'Pregnancy Conception Calculator' })}</Link>
          <Link to="/due-date-calculator" className="calculator-link">{t('dueDateCalculator')}</Link>
          <Link to="/ovulation-calculator" className="calculator-link">{t('ovulationCalculator')}</Link>
        </div>

        <div className="calculators-column">
          <p className="header-subtitle">{t('otherCategory', { defaultValue: 'Other' })}</p>
          <Link to="/macro-calculator" className="calculator-link">{t('macroCalculator')}</Link>
          <Link to="/carbohydrate-calculator" className="calculator-link">{t('carbohydrateCalculator')}</Link>
          <Link to="/tdee-calculator" className="calculator-link">{t('tdeeCalculator')}</Link>
          <Link to="/gfr-calculator" className="calculator-link">{t('gfrCalculator')}</Link>
          <Link to="/body-surface-area-calculator" className="calculator-link">{t('bodySurfaceAreaCalculator')}</Link>
          <Link to="/calculators" className="view-more-link">{t('viewMore', { defaultValue: 'View More' })}</Link>
        </div>
      </div>
    </section>
  );
};

export default FitnessCalculatorsGrid;