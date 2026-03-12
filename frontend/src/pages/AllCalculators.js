import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const AllCalculators = () => {
  const { t } = useTranslation();

  const fitnessCalculators = [
    { key: 'bmiCalculator', path: '/bmi-calculator' },
    { key: 'calorieCalculator', path: '/calorie-calculator' },
    { key: 'bodyFatCalculator', path: '/body-fat-calculator' },
    { key: 'bmrCalculator', path: '/bmr-calculator' },
    { key: 'idealWeightCalculator', path: '/ideal-weight-calculator' },
    { key: 'paceCalculator', path: '/pace-calculator' },
    { key: 'armyBodyFatCalculator', path: '/army-body-fat-calculator' },
    { key: 'leanBodyMassCalculator', path: '/lean-body-mass-calculator' },
    { key: 'healthyWeightCalculator', path: '/healthy-weight-calculator' },
    { key: 'caloriesBurnedCalculator', path: '/calories-burned-calculator' },
    { key: 'oneRepMaxCalculator', path: '/one-rep-max-calculator' },
    { key: 'targetHeartRateCalculator', path: '/target-heart-rate-calculator' }
  ];

  const pregnancyCalculators = [
    { key: 'dueDateCalculator', path: '/due-date-calculator' },
    { key: 'pregnancyWeekCalculator', path: '/pregnancy-week-calculator' },
    { key: 'pregnancyWeightGainCalculator', path: '/pregnancy-weight-gain-calculator' },
    { key: 'conceptionCalculator', path: '/conception-calculator' },
    { key: 'ovulationCalculator', path: '/ovulation-calculator' },
    { key: 'periodCalculator', path: '/period-calculator' }
  ];

  const otherCalculators = [
    { key: 'macroCalculator', path: '/macro-calculator' },
    { key: 'carbohydrateCalculator', path: '/carbohydrate-calculator' },
    { key: 'proteinCalculator', path: '/protein-intake-calculator' },
    { key: 'fatIntakeCalculator', path: '/fat-intake-calculator' },
    { key: 'tdeeCalculator', path: '/tdee-calculator' },
    { key: 'gfrCalculator', path: '/gfr-calculator' },
    { key: 'bodyTypeCalculator', path: '/body-type-calculator' },
    { key: 'bodySurfaceAreaCalculator', path: '/body-surface-area-calculator' }
  ];

  return (
    <div className="all-calculators-page">
      <Banner />
      
      <main className="all-calculators-content">
        <div className="breadcrumb">
          <Link to="/">{t('home').toLowerCase()}</Link>
          <span> / </span>
          <Link to="/fitness">{t('fitnessAndHealth').toLowerCase()}</Link>
          <span> / </span>
          <span>{t('allCalculators').toLowerCase()}</span>
        </div>

        <div className="calculators-header">
          <h1 className="page-title">{t('allCalculators')}</h1>
        </div>

        <div className="calculators-grid-section">
          <div className="calculators-categories">
            <div className="calculator-category">
              <h3 className="category-subtitle">{t('fitness')}</h3>
              <div className="calculator-links">
                {fitnessCalculators.map((calc, index) => (
                  <Link key={index} to={calc.path} className="calculator-link">
                    {t(calc.key)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="calculator-category">
              <h3 className="category-subtitle">{t('pregnancy')}</h3>
              <div className="calculator-links">
                {pregnancyCalculators.map((calc, index) => (
                  <Link key={index} to={calc.path} className="calculator-link">
                    {t(calc.key)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="calculator-category">
              <h3 className="category-subtitle">{t('otherCategory', { defaultValue: 'Other' })}</h3>
              <div className="calculator-links">
                {otherCalculators.map((calc, index) => (
                  <Link key={index} to={calc.path} className="calculator-link">
                    {t(calc.key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllCalculators;
