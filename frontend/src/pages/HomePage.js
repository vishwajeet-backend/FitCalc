import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';
import BMICalculator from '../components/BMICalculator';
import ResultsDisplay from '../components/ResultsDisplay';
import HowItWorks from '../components/HowItWorks';
import FitnessCalculatorsGrid from '../components/FitnessCalculatorsGrid';
import WhatIsFitCalc from '../components/WhatIsFitCalc';
import PowerfulFeatures from '../components/PowerfulFeatures';
import WhyUseFitCalc from '../components/WhyUseFitCalc';
import AdsSupportSection from '../components/AdsSupportSection';
import ComparisonTable from '../components/ComparisonTable';
import PrivacyTrust from '../components/PrivacyTrust';
import WhatToExpect from '../components/WhatToExpect';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import FeedbackForm from '../components/FeedbackForm';

const DEFAULT_BMI_RESULT = {
  bmi: 20.1,
  categoryKey: 'normalWeight',
  bmiPrime: 0.8,
  healthyWeightRange: '179.2 lbs'
};

const HomePage = () => {
  const { t } = useTranslation();
  const [bmiData, setBmiData] = useState(DEFAULT_BMI_RESULT);

  const handleBMICalculation = (data) => {
    setBmiData(data);
  };

  return (
    <div className="home-page">
      <Banner />
      
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">
            {t('homeHeroTitle', { defaultValue: 'Most Popular Fitness Calculators' })}
          </h1>
          <p className="hero-description">
            {t('homeHeroDescription', {
              defaultValue: 'The BMI Calculator helps you estimate whether your weight is in a healthy range for your height. Use it as a quick screening tool, then pair the result with nutrition, activity, and lifestyle habits to build a sustainable fitness plan.',
            })}
          </p>
        </section>

        <section className="calculator-section">
          <BMICalculator onCalculate={handleBMICalculation} />
          <ResultsDisplay bmiData={bmiData} />
        </section>

        <HowItWorks />
        <FitnessCalculatorsGrid />
        <WhatIsFitCalc />
        <PowerfulFeatures />
        <WhyUseFitCalc />
        <AdsSupportSection />
        <ComparisonTable />
        <PrivacyTrust />
        <WhatToExpect />
        <FAQ />
        <FinalCTA />
        <FeedbackForm />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
