import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateOneRepMax } from '../utils/apiService';

function OneRepMaxCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    weight: 225,
    weightKg: 102,
    reps: 8,
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
        weight: unit === 'us' ? formData.weight : formData.weightKg,
        reps: formData.reps,
        unit: unit === 'us' ? 'lbs' : 'kg',
      };

      const result = await calculateOneRepMax(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <CalculatorLayout
      title="One Rep Max Calculator"
      description="Calculate your one-rep max (1RM) - the maximum weight you can lift for one repetition. Uses 7 proven formulas to estimate your strength based on submaximal lifts."
      breadcrumbPath="one rep max calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
      >
        <FormGroup label="Weight Lifted">
          {unit === 'us' ? (
            <Input
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              min="10"
              max="1000"
              step="0.5"
              unit="lbs"
            />
          ) : (
            <Input
              value={formData.weightKg}
              onChange={(e) => handleInputChange('weightKg', parseFloat(e.target.value))}
              min="5"
              max="500"
              step="0.5"
              unit="kg"
            />
          )}
        </FormGroup>

        <FormGroup label="Reps Completed">
          <Input
            value={formData.reps}
            onChange={(e) => handleInputChange('reps', parseInt(e.target.value))}
            min="1"
            max="15"
            unit="reps"
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
          <ResultsContainer title="Your One Rep Max Estimate" downloadable>
            {/* Main 1RM Card */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Estimated One Rep Max (1RM)
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.oneRM ? Math.round(results.oneRM) : 'N/A'}
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
                Based on {formData.weight} {unit === 'us' ? 'lbs' : 'kg'} × {formData.reps} reps
              </div>
            </div>

            {/* 1RM by Formula */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              1RM Estimates by Formula
            </h3>
            
            <ResultsGrid columns={3}>
              {results.epley && (
                <ResultCard
                  title="Epley Formula"
                  value={`${Math.round(results.epley)} ${unit === 'us' ? 'lbs' : 'kg'}`}
                  percentage="Most popular"
                  subtitle="1RM = weight × (1 + reps/30)"
                  color="#667eea"
                />
              )}
              {results.brzycki && (
                <ResultCard
                  title="Brzycki Formula"
                  value={`${Math.round(results.brzycki)} ${unit === 'us' ? 'lbs' : 'kg'}`}
                  percentage="Conservative"
                  subtitle="36 / (37 - reps)"
                  color="#8b5cf6"
                />
              )}
              {results.lander && (
                <ResultCard
                  title="Lander Formula"
                  value={`${Math.round(results.lander)} ${unit === 'us' ? 'lbs' : 'kg'}`}
                  percentage="Moderate"
                  subtitle="100 / (101.3 - 2.67×reps)"
                  color="#a78bfa"
                />
              )}
              {results.lombardi && (
                <ResultCard
                  title="Lombardi Formula"
                  value={`${Math.round(results.lombardi)} ${unit === 'us' ? 'lbs' : 'kg'}`}
                  percentage="Power athletes"
                  subtitle="weight × reps^0.10"
                  color="#667eea"
                />
              )}
              {results.mayhew && (
                <ResultCard
                  title="Mayhew Formula"
                  value={`${Math.round(results.mayhew)} ${unit === 'us' ? 'lbs' : 'kg'}`}
                  percentage="Research-based"
                  subtitle="Exponential curve"
                  color="#8b5cf6"
                />
              )}
              {results.oconner && (
                <ResultCard
                  title="O'Conner Formula"
                  value={`${Math.round(results.oconner)} ${unit === 'us' ? 'lbs' : 'kg'}`}
                  percentage="Simple"
                  subtitle="weight × (1 + reps/40)"
                  color="#a78bfa"
                />
              )}
              {results.wathan && (
                <ResultCard
                  title="Wathan Formula"
                  value={`${Math.round(results.wathan)} ${unit === 'us' ? 'lbs' : 'kg'}`}
                  percentage="NFL standard"
                  subtitle="Curve fitting method"
                  color="#667eea"
                />
              )}
            </ResultsGrid>

            {/* Training Percentages */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Training Load Percentages
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
                        % of 1RM
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Weight
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Rep Range
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Training Goal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.percentages && Object.entries(results.percentages).reverse().map(([percent, weight], idx) => (
                      <tr key={percent} style={idx % 2 === 0 ? { background: '#f9fafb' } : {}}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
                          {percent}%
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                          {Math.round(weight)} {unit === 'us' ? 'lbs' : 'kg'}
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                          {
                            percent >= 95 ? '1-2 reps' :
                            percent >= 90 ? '2-3 reps' :
                            percent >= 85 ? '3-5 reps' :
                            percent >= 80 ? '5-6 reps' :
                            percent >= 75 ? '6-8 reps' :
                            percent >= 70 ? '8-10 reps' :
                            percent >= 65 ? '10-12 reps' :
                            '12-15 reps'
                          }
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                          {
                            percent >= 95 ? 'Max strength testing' :
                            percent >= 90 ? 'Power & strength' :
                            percent >= 85 ? 'Strength building' :
                            percent >= 80 ? 'Strength & hypertrophy' :
                            percent >= 75 ? 'Hypertrophy (muscle growth)' :
                            percent >= 70 ? 'Hypertrophy' :
                            percent >= 65 ? 'Muscular endurance' :
                            'Endurance & technique'
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Safety Tips */}
            <div style={{
              background: '#fef2f2',
              border: '2px solid #fecaca',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#991b1b', marginBottom: '0.75rem' }}>
                ⚠️ Safety Guidelines
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#991b1b', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Use a Spotter:</strong> Always have a spotter when attempting heavy lifts near your 1RM
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Warm Up Properly:</strong> Do progressive warm-up sets before testing
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Perfect Form:</strong> Compromised form increases injury risk - technique over ego
                </li>
                <li>
                  <strong>Know When to Stop:</strong> If you feel pain or discomfort, stop immediately
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
              📊 Understanding 1RM Calculations
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Why Multiple Formulas?</strong> Different formulas perform better for different rep ranges. The average gives you a reliable estimate.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Best Accuracy:</strong> Tests with 3-8 reps are most accurate. Very high reps (12+) or single reps may be less reliable.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Individual Variation:</strong> Training experience, muscle fiber type, and fatigue affect actual 1RM. Use this as a guide, not absolute truth.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default OneRepMaxCalculatorPage;
