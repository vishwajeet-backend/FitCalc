import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';

const AllCalculators = () => {
  const fitnessCalculators = [
    { name: 'BMI Calculator', path: '/calculator/bmi' },
    { name: 'Calorie Calculator', path: '/calculator/calorie' },
    { name: 'Body Fat Calculator', path: '/calculator/body-fat' },
    { name: 'BMR Calculator', path: '/calculator/bmr' },
    { name: 'Ideal Weight Calculator', path: '/calculator/ideal-weight' },
    { name: 'Pace Calculator', path: '/calculator/pace' },
    { name: 'Army Body Fat Calculator', path: '/calculator/army-body-fat' },
    { name: 'Lean Body Mass Calculator', path: '/calculator/lean-body-mass' },
    { name: 'Healthy Weight Calculator', path: '/calculator/healthy-weight' },
    { name: 'Calories Burned Calculator', path: '/calculator/calories-burned' },
    { name: 'One Rep Max Calculator', path: '/calculator/one-rep-max' },
    { name: 'Target Heart Rate Calculator', path: '/calculator/target-heart-rate' }
  ];

  const pregnancyCalculators = [
    { name: 'Pregnancy Calculator', path: '/calculator/pregnancy' },
    { name: 'Pregnancy Weight Gain Calculator', path: '/calculator/pregnancy-weight-gain' },
    { name: 'Pregnancy Conception Calculator', path: '/calculator/pregnancy-conception' },
    { name: 'Due Date Calculator', path: '/calculator/due-date' },
    { name: 'Ovulation Calculator', path: '/calculator/ovulation' },
    { name: 'Conception Calculator', path: '/calculator/conception' },
    { name: 'Period Calculator', path: '/calculator/period' }
  ];

  const otherCalculators = [
    { name: 'Macro Calculator', path: '/calculator/macro' },
    { name: 'Carbohydrate Calculator', path: '/calculator/carbohydrate' },
    { name: 'Protein Calculator', path: '/calculator/protein' },
    { name: 'Fat Intake Calculator', path: '/calculator/fat-intake' },
    { name: 'TDEE Calculator', path: '/calculator/tdee' },
    { name: 'GFR Calculator', path: '/calculator/gfr' },
    { name: 'Body Type Calculator', path: '/calculator/body-type' },
    { name: 'Body Surface Area Calculator', path: '/calculator/body-surface-area' }
  ];

  return (
    <div className="all-calculators-page">
      <Banner />
      
      <main className="all-calculators-content">
        <div className="breadcrumb">
          <Link to="/">home</Link>
          <span> / </span>
          <Link to="/fitness">fitness & health</Link>
          <span> / </span>
          <span>target heart rate calculator</span>
        </div>

        <div className="calculators-header">
          <h1 className="page-title">Fitness Calculators</h1>
        </div>

        <div className="calculators-grid-section">
          <div className="calculators-categories">
            <div className="calculator-category">
              <h2 className="category-title main-title">Fitness Calculators</h2>
              <h3 className="category-subtitle">Fitness Calculators</h3>
              <div className="calculator-links">
                {fitnessCalculators.map((calc, index) => (
                  <Link key={index} to={calc.path} className="calculator-link">
                    {calc.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="calculator-category">
              <h3 className="category-subtitle">Pregnancy</h3>
              <div className="calculator-links">
                {pregnancyCalculators.map((calc, index) => (
                  <Link key={index} to={calc.path} className="calculator-link">
                    {calc.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="calculator-category">
              <h3 className="category-subtitle">Other</h3>
              <div className="calculator-links">
                {otherCalculators.map((calc, index) => (
                  <Link key={index} to={calc.path} className="calculator-link">
                    {calc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="all-calculators-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Fitness</h3>
              <ul>
                <li><Link to="/calculators/bmi">BMI Calculator</Link></li>
                <li><Link to="/calculators/calorie">Calorie Calculator</Link></li>
                <li><Link to="/calculators/body-fat">Body Fat Calculator</Link></li>
                <li><Link to="/calculators/bmr">BMR Calculator</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Pregnancy</h3>
              <ul>
                <li><Link to="/calculators/due-date">Due Date Calculator</Link></li>
                <li><Link to="/calculators/pregnancy">Pregnancy Week</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Nutrition</h3>
              <ul>
                <li><Link to="/calculators/protein">Protein Calculator</Link></li>
                <li><Link to="/calculators/macro">Macro Calculator</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Disclaimer</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 FitCalc. All rights reserved. Not medical advice. Consult a professional for health decisions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AllCalculators;
