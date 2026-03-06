import React from 'react';

const FitnessCalculatorsGrid = () => {
  return (
    <section className="fitness-calculators-grid">
      <div className="calculators-header-row">
        <div className="header-column">
          <h2 className="main-calculators-title">Fitness Calculators</h2>
          <p className="header-subtitle">Fitness Calculators</p>
        </div>
        <div className="header-column">
          <p className="header-subtitle">Pregnancy</p>
        </div>
        <div className="header-column">
          <p className="header-subtitle">Other</p>
        </div>
      </div>

      <div className="calculators-content-row">
        <div className="calculators-column">
          <a href="#bmi-calculator" className="calculator-link">BMI Calculator</a>
          <a href="#calorie-calculator" className="calculator-link">Calorie Calculator</a>
          <a href="#body-fat-calculator" className="calculator-link">Body Fat Calculator</a>
          <a href="#bmr-calculator" className="calculator-link">BMR Calculator</a>
          <a href="#ideal-weight-calculator" className="calculator-link">Ideal Weight Calculator</a>
        </div>

        <div className="calculators-column">
          <a href="#pregnancy-calculator" className="calculator-link">Pregnancy Calculator</a>
          <a href="#pregnancy-weight-gain-calculator" className="calculator-link">Pregnancy Weight Gain Calculator</a>
          <a href="#pregnancy-conception-calculator" className="calculator-link">Pregnancy Conception Calculator</a>
          <a href="#due-date-calculator" className="calculator-link">Due Date Calculator</a>
          <a href="#ovulation-calculator" className="calculator-link">Ovulation Calculator</a>
        </div>

        <div className="calculators-column calculators-column-other">
          <div className="other-calculators-list">
            <a href="#macro-calculator" className="calculator-link">Macro Calculator</a>
            <a href="#carbohydrate-calculator" className="calculator-link">Carbohydrate Calculator</a>
            <a href="#tdee-calculator" className="calculator-link">TDEE Calculator</a>
            <a href="#gfr-calculator" className="calculator-link">GFR Calculator</a>
            <a href="#body-surface-area-calculator" className="calculator-link">Body Surface Area Calculator</a>
          </div>
          <div className="view-more-container">
            <a href="/fitness" className="view-more-link">View More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessCalculatorsGrid;