import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

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
    { name: 'Due Date Calculator', path: '/calculator/pregnancy-due-date' },
    { name: 'Pregnancy Week Calculator', path: '/calculator/pregnancy-week' },
    { name: 'Pregnancy Weight Gain Calculator', path: '/calculator/pregnancy-weight-gain' },
    { name: 'Conception Calculator', path: '/calculator/conception' },
    { name: 'Ovulation Calculator', path: '/calculator/ovulation' },
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

      <Footer />
    </div>
  );
};

export default AllCalculators;
