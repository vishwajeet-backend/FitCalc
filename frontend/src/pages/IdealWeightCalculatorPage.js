import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup, Select } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateIdealWeight } from '../utils/apiService';

function IdealWeightCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    gender: 'male',
    heightFeet: 5,
    heightInches: 10,
    heightCm: 178,
    frame: 'medium',
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
            gender: formData.gender,
            height: (formData.heightFeet * 12) + formData.heightInches,
            frame: formData.frame,
            unit: 'us',
          }
        : {
            gender: formData.gender,
            height: formData.heightCm,
            frame: formData.frame,
            unit: 'metric',
          };

      const result = await calculateIdealWeight(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const frameOptions = [
    { value: 'small', label: 'Small Frame' },
    { value: 'medium', label: 'Medium Frame' },
    { value: 'large', label: 'Large Frame' },
  ];

  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal body weight using multiple scientific formulas including Robinson, Miller, Devine, and Hamwi methods. Get a personalized weight range based on your height, gender, and body frame."
      breadcrumbPath="ideal weight calculator"
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

        <FormGroup label="Body Frame">
          <Select
            value={formData.frame}
            onChange={(e) => handleInputChange('frame', e.target.value)}
            options={frameOptions}
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
          <ResultsContainer title="Your Ideal Weight Range" downloadable>
            {/* Recommended Weight Range */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Recommended Weight Range
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.minWeight && results.maxWeight 
                  ? `${Math.round(results.minWeight)} - ${Math.round(results.maxWeight)}`
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
                📊 Based on {formData.frame} frame and {formData.gender === 'male' ? 'male' : 'female'} physiology
              </p>
            </div>

            {/* Multiple Formula Results */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Ideal Weight by Formula
            </h3>
            
            <ResultsGrid columns={2}>
              <ResultCard
                title="Robinson Formula (1983)"
                value={results.robinson ? `${Math.round(results.robinson)} ${unit === 'us' ? 'lb' : 'kg'}` : 'N/A'}
                percentage=""
                subtitle="Popular modern formula"
                color="#3b82f6"
              />
              <ResultCard
                title="Miller Formula (1983)"
                value={results.miller ? `${Math.round(results.miller)} ${unit === 'us' ? 'lb' : 'kg'}` : 'N/A'}
                percentage=""
                subtitle="Alternative modern method"
                color="#8b5cf6"
              />
              <ResultCard
                title="Devine Formula (1974)"
                value={results.devine ? `${Math.round(results.devine)} ${unit === 'us' ? 'lb' : 'kg'}` : 'N/A'}
                percentage=""
                subtitle="Widely used in medicine"
                color="#10b981"
              />
              <ResultCard
                title="Hamwi Formula (1964)"
                value={results.hamwi ? `${Math.round(results.hamwi)} ${unit === 'us' ? 'lb' : 'kg'}` : 'N/A'}
                percentage=""
                subtitle="Clinical standard"
                color="#f59e0b"
              />
            </ResultsGrid>

            {/* Average and Range */}
            {results.average && (
              <div style={{ marginTop: '2rem' }}>
                <div style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      Average Ideal Weight
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                      {Math.round(results.average)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {unit === 'us' ? 'pounds' : 'kilograms'}
                    </div>
                  </div>

                  {formData.frame !== 'medium' && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                        {formData.frame === 'small' ? 'Small' : 'Large'} Frame Adjustment
                      </div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                        {Math.round(results.frameAdjusted || results.average)}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {unit === 'us' ? 'pounds' : 'kilograms'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BMI Healthy Range Context */}
            {results.bmiRange && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  Healthy BMI Weight Range
                </h3>
                <div style={{
                  background: '#f3f4f6',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.25rem'
                }}>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>
                    For your height, a healthy BMI (18.5-24.9) corresponds to:
                  </p>
                  <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                    {results.bmiRange.min && results.bmiRange.max
                      ? `${Math.round(results.bmiRange.min)} - ${Math.round(results.bmiRange.max)} ${unit === 'us' ? 'lbs' : 'kg'}`
                      : 'N/A'}
                  </p>
                </div>
              </div>
            )}
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
              📖 About Ideal Weight Formulas
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Robinson Formula:</strong> Developed in 1983, widely used in modern nutrition
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Miller Formula:</strong> Another 1983 formula providing similar results
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Devine Formula:</strong> Created in 1974, commonly used for medication dosing
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Hamwi Formula:</strong> Developed in 1964, quick estimate for clinical use
              </p>
              <p style={{ margin: 0 }}>
                <strong>Note:</strong> These formulas provide estimates. Your ideal weight may vary based on muscle mass, bone density, and body composition. Consult a healthcare professional for personalized advice.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default IdealWeightCalculatorPage;
