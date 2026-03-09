import React, { useState } from 'react';
import Banner from '../components/Banner';
import BMICalculator from '../components/BMICalculator';
import ResultsDisplay from '../components/ResultsDisplay';
import HowItWorks from '../components/HowItWorks';
import FitnessCalculatorsGrid from '../components/FitnessCalculatorsGrid';
import WhatIsFitCalc from '../components/WhatIsFitCalc';
import PowerfulFeatures from '../components/PowerfulFeatures';
import WhyUseFitCalc from '../components/WhyUseFitCalc';
import ComparisonTable from '../components/ComparisonTable';
import PrivacyTrust from '../components/PrivacyTrust';
import WhatToExpect from '../components/WhatToExpect';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import FeedbackForm from '../components/FeedbackForm';

const HomePage = () => {
  const [bmiData, setBmiData] = useState(null);

  const handleBMICalculation = (data) => {
    setBmiData(data);
  };

  return (
    <div className="home-page">
      <Banner />
      
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">Most Popular Fitness Calculators</h1>
          <p className="hero-description">
            The Calorie Calculator can be used to estimate the number of calories a person needs to consume each day. 
            This calculator can also provide some simple guidelines for gaining or losing weight.
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
