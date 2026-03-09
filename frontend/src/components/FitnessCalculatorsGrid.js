import React from 'react';
import { Link } from 'react-router-dom';

const FitnessCalculatorsGrid = () => {
  return (
    <section className="fitness-calculators-grid">
      <h2 className="calculator-grid-main-title">Fitness Calculators</h2>
      
      <div className="calculators-header-row">
        <p className="header-subtitle">Fitness Calculators</p>
        <p className="header-subtitle">Pregnancy</p>
        <p className="header-subtitle">Other</p>
      </div>

      <div className="calculators-content-row">
        <div className="calculators-column">
          <Link to="/calculator/bmi" className="calculator-link">BMI Calculator</Link>
          <Link to="/calculator/calorie" className="calculator-link">Calorie Calculator</Link>
          <Link to="/calculator/body-fat" className="calculator-link">Body Fat Calculator</Link>
          <Link to="/calculator/bmr" className="calculator-link">BMR Calculator</Link>
          <Link to="/calculator/ideal-weight" className="calculator-link">Ideal Weight Calculator</Link>
        </div>

        <div className="calculators-column">
          <Link to="/calculator/pregnancy-due-date" className="calculator-link">Pregnancy Calculator</Link>
          <Link to="/calculator/pregnancy-weight-gain" className="calculator-link">Pregnancy Weight Gain Calculator</Link>
          <Link to="/calculator/conception" className="calculator-link">Pregnancy Conception Calculator</Link>
          <Link to="/calculator/pregnancy-due-date" className="calculator-link">Due Date Calculator</Link>
          <Link to="/calculator/ovulation" className="calculator-link">Ovulation Calculator</Link>
        </div>

        <div className="calculators-column">
          <Link to="/calculator/macro" className="calculator-link">Macro Calculator</Link>
          <Link to="/calculator/carbohydrate" className="calculator-link">Carbohydrate Calculator</Link>
          <Link to="/calculator/tdee" className="calculator-link">TDEE Calculator</Link>
          <Link to="/calculator/gfr" className="calculator-link">GFR Calculator</Link>
          <Link to="/calculator/body-surface-area" className="calculator-link">Body Surface Area Calculator</Link>
          <Link to="/calculators" className="view-more-link">View More</Link>
        </div>
      </div>
    </section>
  );
};

export default FitnessCalculatorsGrid;