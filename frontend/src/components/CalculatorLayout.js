import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import useAdblockDetector from '../hooks/useAdblockDetector';
import AdblockModal from './AdblockModal';
import CalculatorForm from './CalculatorForm';
import LanguageSwitcher from './LanguageSwitcher';
import { translateText } from '../utils/translateText';

const titleMap = {
  'BMI Calculator': 'bmiCalculator',
  'BMR Calculator': 'bmrCalculator',
  'Calorie Calculator': 'calorieCalculator',
  'Body Fat Calculator': 'bodyFatCalculator',
  'Protein Calculator': 'proteinCalculator',
  'Lean Body Mass Calculator': 'leanBodyMassCalculator',
  'TDEE Calculator': 'tdeeCalculator',
  'Macro Calculator': 'macroCalculator',
  'Ideal Weight Calculator': 'idealWeightCalculator',
  'One Rep Max Calculator': 'oneRepMaxCalculator',
  'Pace Calculator': 'paceCalculator',
  'Target Heart Rate Calculator': 'targetHeartRateCalculator',
  'Calories Burned Calculator': 'caloriesBurnedCalculator',
  'Body Type Calculator': 'bodyTypeCalculator',
  'Body Surface Area Calculator': 'bodySurfaceAreaCalculator',
  'Army Body Fat Calculator': 'armyBodyFatCalculator',
  'Navy Body Fat Calculator': 'navyBodyFatCalculator',
  'Carbohydrate Calculator': 'carbohydrateCalculator',
  'Fat Intake Calculator': 'fatIntakeCalculator',
  'GFR Calculator': 'gfrCalculator',
  'Healthy Weight Calculator': 'healthyWeightCalculator',
  'Due Date Calculator': 'dueDateCalculator',
  'Ovulation Calculator': 'ovulationCalculator',
  'Conception Calculator': 'conceptionCalculator',
  'Period Calculator': 'periodCalculator',
  'Pregnancy Week Calculator': 'pregnancyWeekCalculator',
  'Pregnancy Weight Gain Calculator': 'pregnancyWeightGainCalculator',
};

const CalculatorLayout = ({ title, description, breadcrumbPath, children }) => {
  const { t } = useTranslation();
  const { detected, loading, retry } = useAdblockDetector({
    location: breadcrumbPath || title || 'calculator',
  });
  // Separate form content from results
  const childArray = React.Children.toArray(children);
  const formContent = [];
  const resultsContent = [];
  
  let foundForm = false;
  childArray.forEach(child => {
    // CalculatorForm is the form, everything after it goes to results column
    const isForm = child?.type === CalculatorForm ||
                   child?.type?.displayName === 'CalculatorForm';
    
    if (isForm) {
      foundForm = true;
      formContent.push(child);
    } else if (foundForm) {
      // After form, everything goes to results column
      resultsContent.push(child);
    } else {
      // Before form (like error messages), keep in form column
      formContent.push(child);
    }
  });

    const translatedTitle = t(titleMap[title] || title, { defaultValue: title });
    const translatedDescription = translateText(description, t, { prefix: 'calculator.description' });
    const translatedBreadcrumb = translateText(breadcrumbPath, t, { prefix: 'calculator.breadcrumb' });

  return (
    <div className="calculator-page-container">
      {detected && <AdblockModal onRetry={retry} loading={loading} />}

      {/* Header Banner */}
      <header className="calculator-header-banner">
        <div className="calculator-header-content">
          <Link to="/" className="calculator-logo">{t('siteName')}</Link>
          <nav className="calculator-nav">
            <Link to="/calculators" className="calculator-nav-item">{t('fitness')}</Link>
            <Link to="/pregnancy" className="calculator-nav-item">{t('pregnancy')}</Link>
            <Link to="/metabolism" className="calculator-nav-item">{t('metabolism')}</Link>
            <Link to="/blog" className="calculator-nav-item">{t('blog')}</Link>
            <LanguageSwitcher className="calculator-language-switcher" />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxWidth: '1376px', margin: '0 auto', padding: '48px 32px 0', width: '100%', flex: 1 }}>
          {/* Breadcrumb */}
          <div className="calculator-breadcrumb">
            <Link to="/">{t('home').toLowerCase()}</Link>
            {' / '}
            <Link to="/calculators">{t('fitnessAndHealth').toLowerCase()}</Link>
            {' / '}
              <span>{translatedBreadcrumb}</span>
          </div>

          {/* Two Column Layout */}
          <div className="calculator-main-content" style={{ marginTop: '20px', marginBottom: '48px' }}>
            {/* Left Column - Form */}
            <div className="calculator-form-container">
              <h1 className="calculator-title">{translatedTitle}</h1>
                <p className="calculator-description">{translatedDescription}</p>
              {formContent}
            </div>
            
            {/* Right Column - Results */}
            {resultsContent.length > 0 && (
              <div style={{ flex: 1 }}>
                {resultsContent}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CalculatorLayout;
