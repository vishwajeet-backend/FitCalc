import React, { useState } from 'react';
import './App.css';
import Banner from './components/Banner';
import FitnessCalculatorsGrid from './components/FitnessCalculatorsGrid';
import BMICalculator from './components/BMICalculator';
import ResultsDisplay from './components/ResultsDisplay';
import WhatIsFitCalc from './components/WhatIsFitCalc';
import PowerfulFeatures from './components/PowerfulFeatures';
import WhyUseFitCalc from './components/WhyUseFitCalc';
import ComparisonTable from './components/ComparisonTable';
import HowItWorks from './components/HowItWorks';
import PrivacyTrust from './components/PrivacyTrust';
import WhatToExpect from './components/WhatToExpect';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import FeedbackForm from './components/FeedbackForm';
import Footer from './components/Footer';

function App() {
  const [bmiData, setBmiData] = useState(null);

  const handleBMICalculation = (data) => {
    setBmiData(data);
  };

  return (
    <div className="App">
      <Banner />
      
      <main className="main-content">
        {/* Original Core Sections */}
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

        {/* New Additional Sections */}
        <FitnessCalculatorsGrid />
        <WhatIsFitCalc />
        <PowerfulFeatures />
        <WhyUseFitCalc />
        <ComparisonTable />
        <PrivacyTrust />
        <WhatToExpect />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;