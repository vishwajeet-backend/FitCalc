import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateLeanBodyMass } from '../utils/apiService';

function LeanBodyMassCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    gender: 'male',
    weight: 180,
    weightKg: 82,
    bodyFat: 15,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);

    try {
      const data = {
        gender: formData.gender,
        weight: unit === 'us' ? formData.weight : formData.weightKg,
        bodyFat: formData.bodyFat,
        unit,
      };

      const result = await calculateLeanBodyMass(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getCategoryColor = (lbmPercentage, gender) => {
    if (!lbmPercentage) return '#6b7280';
    
    const val = parseFloat(lbmPercentage);
    
    if (gender === 'male') {
      if (val >= 90) return '#10b981'; // Athlete
      if (val >= 85) return '#3b82f6'; // Fit
      return '#6b7280'; // Average
    } else {
      if (val >= 85) return '#10b981'; // Athlete
      if (val >= 80) return '#3b82f6'; // Fit
      return '#6b7280'; // Average
    }
  };

  const getCategoryText = (lbmPercentage, gender) => {
    if (!lbmPercentage) return 'Unknown';
    
    const val = parseFloat(lbmPercentage);
    
    if (gender === 'male') {
      if (val >= 90) return 'Athletic';
      if (val >= 85) return 'Fit';
      return 'Average';
    } else {
      if (val >= 85) return 'Athletic';
      if (val >= 80) return 'Fit';
      return 'Average';
    }
  };

  return (
    <CalculatorLayout
      title="Lean Body Mass Calculator"
      description="Calculate your lean body mass (LBM) - the weight of everything in your body except fat. LBM includes muscle, bone, organs, and water, and is a key indicator of metabolic health and fitness."
      breadcrumbPath="lean body mass calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
      >
        <FormGroup label="Gender">
          <RadioGroup
            value={formData.gender}
            onChange={(val) => handleInputChange('gender', val)}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />
        </FormGroup>

        <FormGroup label="Body Weight">
          {unit === 'us' ? (
            <Input
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              min="50"
              max="500"
              step="0.1"
              unit="lbs"
            />
          ) : (
            <Input
              value={formData.weightKg}
              onChange={(e) => handleInputChange('weightKg', parseFloat(e.target.value))}
              min="20"
              max="250"
              step="0.1"
              unit="kg"
            />
          )}
        </FormGroup>

        <FormGroup label="Body Fat Percentage">
          <Input
            value={formData.bodyFat}
            onChange={(e) => handleInputChange('bodyFat', parseFloat(e.target.value))}
            min="3"
            max="50"
            step="0.1"
            unit="%"
          />
        </FormGroup>
      </CalculatorForm>

      {error && (
        <div style={{ 
          background: '#fee2e2', 
          color: '#991b1b', 
          padding: '1rem', 
          borderRadius: '6px', 
          marginBottom: '1rem' 
        }}>
          {error}
        </div>
      )}

      {results && (
        <>
          <ResultsContainer title="Your Lean Body Mass" downloadable>
            {/* Main LBM Card */}
            <div style={{
              background: `linear-gradient(135deg, ${getCategoryColor(results.lbmPercentage, formData.gender)} 0%, ${getCategoryColor(results.lbmPercentage, formData.gender)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Lean Body Mass
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.leanBodyMass ? Math.round(results.leanBodyMass * 10) / 10 : 'N/A'}
              </div>
              <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '1rem' }}>
                {unit === 'us' ? 'pounds' : 'kilograms'}
              </p>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {getCategoryText(results.lbmPercentage, formData.gender)} ({results.lbmPercentage ? Math.round(results.lbmPercentage * 10) / 10 : 0}% of total weight)
              </div>
            </div>

            {/* Body Composition Breakdown */}
            <ResultsGrid columns={3}>
              <ResultCard
                title="Lean Body Mass"
                value={`${results.leanBodyMass ? Math.round(results.leanBodyMass * 10) / 10 : 0} ${unit === 'us' ? 'lbs' : 'kg'}`}
                percentage={`${results.lbmPercentage ? Math.round(results.lbmPercentage * 10) / 10 : 0}%`}
                subtitle="Muscle, organs, bone, water"
                color="#8b5cf6"
              />
              <ResultCard
                title="Fat Mass"
                value={`${results.fatMass ? Math.round(results.fatMass * 10) / 10 : 0} ${unit === 'us' ? 'lbs' : 'kg'}`}
                percentage={`${formData.bodyFat}%`}
                subtitle="Body fat"
                color="#f59e0b"
              />
              <ResultCard
                title="Total Weight"
                value={`${unit === 'us' ? formData.weight : formData.weightKg} ${unit === 'us' ? 'lbs' : 'kg'}`}
                percentage="100%"
                subtitle="Complete body weight"
                color="#3b82f6"
              />
            </ResultsGrid>

            {/* LBM Categories by Gender */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Lean Body Mass Categories
              </h3>
              <div style={{
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Category
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Male (% LBM)
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Female (% LBM)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#10b981', marginRight: '0.5rem' }}></span>
                        <strong>Athletic</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>≥ 90%</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>≥ 85%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#3b82f6', marginRight: '0.5rem' }}></span>
                        Fit
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>85-89%</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>80-84%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#6b7280', marginRight: '0.5rem' }}></span>
                        Average
                      </td>
                      <td style={{ padding: '1rem' }}>&lt; 85%</td>
                      <td style={{ padding: '1rem' }}>&lt; 80%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Why LBM Matters */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                💪 Why Lean Body Mass Matters
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Metabolic Health:</strong> Higher LBM increases resting metabolic rate and calorie burning
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Strength & Function:</strong> More lean mass means greater physical strength and capability
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Better Than Weight Alone:</strong> Two people with the same weight can have very different body composition
                </li>
                <li>
                  <strong>Goal Setting:</strong> Track LBM during weight loss to ensure you're losing fat, not muscle
                </li>
              </ul>
            </div>
          </ResultsContainer>

          {/* Info section */}
          <div style={{
            background: '#eff6ff',
            border: '1px solid #dbeafe',
            borderRadius: '8px',
            padding: '1.25rem',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.75rem' }}>
              📊 How to Use This Calculator
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Step 1:</strong> Measure your body fat percentage using a body fat calculator, calipers, or body composition scale.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Step 2:</strong> Enter your current weight and body fat percentage into this calculator.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Calculation:</strong> LBM = Total Weight × (1 - Body Fat % / 100). This gives you everything except fat.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default LeanBodyMassCalculatorPage;
