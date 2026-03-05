import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import './CalculatorPage.css';

// Generic calculator input form component
function GenericCalculatorForm({ calculatorType, onCalculate }) {
  const [formData, setFormData] = useState({
    age: 25,
    gender: 'male',
    weight: 70,
    height: 170,
    unit: 'metric'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateResult = async () => {
    try {
      const response = await fetch(`/api/calculators/${calculatorType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (onCalculate) {
        onCalculate(data);
      }
    } catch (error) {
      console.error('Error calculating:', error);
    }
  };

  return (
    <div className="bmi-calculator-container">
      <div className="calculator-card">
        <div className="calculator-inputs">
          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <div className="gender-selector">
              <button
                className={formData.gender === 'male' ? 'active' : ''}
                onClick={() => handleInputChange('gender', 'male')}
              >
                Male
              </button>
              <button
                className={formData.gender === 'female' ? 'active' : ''}
                onClick={() => handleInputChange('gender', 'female')}
              >
                Female
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Height ({formData.unit === 'us' ? 'inches' : 'cm'})</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Weight ({formData.unit === 'us' ? 'lbs' : 'kg'})</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <div className="unit-toggle">
              <button
                className={formData.unit === 'us' ? 'active' : ''}
                onClick={() => handleInputChange('unit', 'us')}
              >
                US Units
              </button>
              <button
                className={formData.unit === 'metric' ? 'active' : ''}
                onClick={() => handleInputChange('unit', 'metric')}
              >
                Metric
              </button>
            </div>
          </div>

          <button 
            className="calculate-btn"
            onClick={calculateResult}
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}

// Calculator metadata
const calculatorInfo = {
  'body-fat': {
    title: 'Body Fat Calculator',
    description: 'Calculate your body fat percentage using various measurement methods.',
  },
  'lean-body-mass': {
    title: 'Lean Body Mass Calculator',
    description: 'Calculate your lean body mass to understand your muscle composition.',
  },
  'ideal-weight': {
    title: 'Ideal Weight Calculator',
    description: 'Determine your ideal weight based on your height and body frame.',
  },
  'pace': {
    title: 'Pace Calculator',
    description: 'Calculate your running or walking pace for different distances.',
  },
  'army-body-fat': {
    title: 'Army Body Fat Calculator',
    description: 'Calculate body fat percentage using the US Army method.',
  },
  'navy-body-fat': {
    title: 'Navy Body Fat Calculator',
    description: 'Calculate body fat percentage using the US Navy method.',
  },
  'bmr': {
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate - calories burned at rest.',
  },
  'macro': {
    title: 'Macro Calculator',
    description: 'Calculate your daily macronutrient needs (protein, carbs, fats).',
  },
  'protein': {
    title: 'Protein Calculator',
    description: 'Calculate your daily protein requirements based on your activity level.',
  },
  'one-rep-max': {
    title: 'One Rep Max Calculator',
    description: 'Calculate your one-repetition maximum for strength training.',
  },
  'pregnancy-due-date': {
    title: 'Pregnancy Due Date Calculator',
    description: 'Calculate your expected due date based on your last menstrual period.',
  },
  'pregnancy-weight-gain': {
    title: 'Pregnancy Weight Gain Calculator',
    description: 'Track healthy weight gain throughout your pregnancy.',
  },
  'waist-to-hip': {
    title: 'Waist to Hip Ratio Calculator',
    description: 'Calculate your waist to hip ratio for health assessment.',
  },
  'body-type': {
    title: 'Body Type Calculator',
    description: 'Determine your body type (ectomorph, mesomorph, endomorph).',
  },
  'tdee': {
    title: 'TDEE Calculator',
    description: 'Calculate your Total Daily Energy Expenditure.',
  },
};

function GenericCalculatorPage() {
  const { type } = useParams();
  const [results, setResults] = React.useState(null);
  const info = calculatorInfo[type] || {
    title: 'Calculator',
    description: 'Enter your information to calculate your results.'
  };

  const handleCalculate = (calculatedResults) => {
    setResults(calculatedResults);
  };

  return (
    <div className="calculator-page">
      {/* Header */}
      <header className="calculator-header">
        <div className="container">
          <Link to="/" className="logo">FitCalc</Link>
          <nav className="main-nav">
            <Link to="/calculators">Fitness</Link>
            <Link to="/pregnancy">Pregnancy</Link>
            <Link to="/metabolism">Metabolism</Link>
            <Link to="/blog">Blog</Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">home</Link>
          <span> / </span>
          <Link to="/calculators">fitness & health</Link>
          <span> / </span>
          <span>{type ? type.replace(/-/g, ' ') : 'calculator'}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="calculator-content">
        <div className="container">
          <h1>{info.title}</h1>
          <p className="calculator-description">
            {info.description}
          </p>

          <GenericCalculatorForm calculatorType={type} onCalculate={handleCalculate} />
          
          {results && (
            <div className="results-card" style={{ marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: '8px' }}>
              <h2>Your Results</h2>
              <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
                {JSON.stringify(results, null, 2)}
              </pre>
              {results.status === 'In development' && (
                <p style={{ color: '#6b7280', marginTop: '1rem' }}>
                  This calculator is currently under development. Full functionality coming soon!
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GenericCalculatorPage;
