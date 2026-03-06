import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateHealthyWeight } from '../utils/apiService';

function HealthyWeightCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    age: 30,
    gender: 'male',
    heightFeet: 5,
    heightInches: 10,
    heightCm: 178,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);

    try {
      const data = unit === 'us' 
        ? {
            age: formData.age,
            gender: formData.gender,
            height: (formData.heightFeet * 12) + formData.heightInches,
            unit: 'us',
          }
        : {
            age: formData.age,
            gender: formData.gender,
            height: formData.heightCm,
            unit: 'metric',
          };

      const result = await calculateHealthyWeight(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <CalculatorLayout
      title="Healthy Weight Calculator"
      description="Calculate your healthy weight range based on your height and BMI. Get recommendations from multiple scientific formulas and understand what weight range is considered healthy for your body."
      breadcrumbPath="healthy weight calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
      >
        <FormGroup label="Age">
          <Input
            value={formData.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
            min="1"
            max="120"
          />
        </FormGroup>

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

        <FormGroup label="Height">
          {unit === 'us' ? (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Input
                value={formData.heightFeet}
                onChange={(e) => handleInputChange('heightFeet', parseInt(e.target.value))}
                min="1"
                max="8"
                unit="ft"
              />
              <Input
                value={formData.heightInches}
                onChange={(e) => handleInputChange('heightInches', parseInt(e.target.value))}
                min="0"
                max="11"
                unit="in"
              />
            </div>
          ) : (
            <Input
              value={formData.heightCm}
              onChange={(e) => handleInputChange('heightCm', parseInt(e.target.value))}
              min="50"
              max="250"
              unit="cm"
            />
          )}
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
          <ResultsContainer title="Your Healthy Weight Range" downloadable>
            {/* Healthy BMI Range */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Healthy Weight Range (BMI 18.5-24.9)
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.minHealthy && results.maxHealthy 
                  ? `${Math.round(results.minHealthy)} - ${Math.round(results.maxHealthy)}`
                  : 'N/A'}
              </div>
              <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                {unit === 'us' ? 'pounds' : 'kilograms'}
              </p>
              <p style={{ 
                fontSize: '0.875rem', 
                marginTop: '1rem', 
                padding: '0.75rem', 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '6px' 
              }}>
                ✅ This range is associated with optimal health and lowest disease risk
              </p>
            </div>

            {/* Ideal Weight in Center of Range */}
            {results.idealWeight && (
              <div style={{
                background: 'white',
                border: '2px solid #10b981',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Ideal Weight (BMI 22)
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981' }}>
                  {Math.round(results.idealWeight)}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {unit === 'us' ? 'pounds' : 'kilograms'}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  Middle of the healthy BMI range
                </p>
              </div>
            )}

            {/* Weight by Formula */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Ideal Weight by Formula
            </h3>
            
            <ResultsGrid columns={2}>
              {results.robinson && (
                <ResultCard
                  title="Robinson (1983)"
                  value={`${Math.round(results.robinson)} ${unit === 'us' ? 'lb' : 'kg'}`}
                  percentage=""
                  subtitle="Modern standard"
                  color="#3b82f6"
                />
              )}
              {results.miller && (
                <ResultCard
                  title="Miller (1983)"
                  value={`${Math.round(results.miller)} ${unit === 'us' ? 'lb' : 'kg'}`}
                  percentage=""
                  subtitle="Alternative method"
                  color="#8b5cf6"
                />
              )}
              {results.devine && (
                <ResultCard
                  title="Devine (1974)"
                  value={`${Math.round(results.devine)} ${unit === 'us' ? 'lb' : 'kg'}`}
                  percentage=""
                  subtitle="Medical standard"
                  color="#10b981"
                />
              )}
              {results.hamwi && (
                <ResultCard
                  title="Hamwi (1964)"
                  value={`${Math.round(results.hamwi)} ${unit === 'us' ? 'lb' : 'kg'}`}
                  percentage=""
                  subtitle="Clinical estimate"
                  color="#f59e0b"
                />
              )}
            </ResultsGrid>

            {/* BMI Categories Table */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                BMI Categories & Weight Ranges
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
                        BMI Range
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Weight Range
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#fbbf24', marginRight: '0.5rem' }}></span>
                        Underweight
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>&lt; 18.5</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        {results.underweight ? `< ${Math.round(results.underweight)} ${unit === 'us' ? 'lbs' : 'kg'}` : '-'}
                      </td>
                    </tr>
                    <tr style={{ background: '#f0fdf4' }}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#10b981', marginRight: '0.5rem' }}></span>
                        <strong>Healthy Weight</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}><strong>18.5 - 24.9</strong></td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>
                          {results.minHealthy && results.maxHealthy 
                            ? `${Math.round(results.minHealthy)} - ${Math.round(results.maxHealthy)} ${unit === 'us' ? 'lbs' : 'kg'}`
                            : '-'}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b', marginRight: '0.5rem' }}></span>
                        Overweight
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>25 - 29.9</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        {results.overweight ? `${Math.round(results.maxHealthy)} - ${Math.round(results.overweight)} ${unit === 'us' ? 'lbs' : 'kg'}` : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#ef4444', marginRight: '0.5rem' }}></span>
                        Obese
                      </td>
                      <td style={{ padding: '1rem' }}>&gt;= 30</td>
                      <td style={{ padding: '1rem' }}>
                        {results.obese ? `> ${Math.round(results.obese)} ${unit === 'us' ? 'lbs' : 'kg'}` : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
              📊 Understanding Healthy Weight
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Why BMI 18.5-24.9?</strong> This range is associated with the lowest risk of weight-related health problems and chronic diseases.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Individual Variation:</strong> Your ideal weight depends on factors beyond BMI, including muscle mass, bone density, and body composition.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Athletes & Muscular Builds:</strong> May have higher BMI due to muscle mass while still being healthy. Consider body fat percentage for a complete picture.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default HealthyWeightCalculatorPage;
