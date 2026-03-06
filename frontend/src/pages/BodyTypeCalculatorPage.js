import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateBodyType } from '../utils/apiService';

function BodyTypeCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    gender: 'male',
    heightFeet: 5,
    heightInches: 10,
    heightCm: 178,
    weight: 180,
    weightKg: 82,
    wrist: 7,
    wristCm: 18,
    ankle: 9,
    ankleCm: 23,
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
            weight: formData.weight,
            wrist: formData.wrist,
            ankle: formData.ankle,
            unit: 'us',
          }
        : {
            gender: formData.gender,
            height: formData.heightCm,
            weight: formData.weightKg,
            wrist: formData.wristCm,
            ankle: formData.ankleCm,
            unit: 'metric',
          };

      const result = await calculateBodyType(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getSomatotypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'ectomorph':
        return '#3b82f6'; // Blue
      case 'mesomorph':
        return '#10b981'; // Green
      case 'endomorph':
        return '#f59e0b'; // Orange
      default:
        return '#8b5cf6'; // Purple
    }
  };

  return (
    <CalculatorLayout
      title="Body Type Calculator"
      description="Discover your body type (somatotype) based on your measurements. Learn whether you're an ectomorph, mesomorph, endomorph, or a combination, and get personalized training and nutrition advice."
      breadcrumbPath="body type calculator"
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
                min="3"
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
              min="100"
              max="250"
              unit="cm"
            />
          )}
        </FormGroup>

        <FormGroup label="Weight">
          {unit === 'us' ? (
            <Input
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              min="80"
              max="400"
              step="0.1"
              unit="lbs"
            />
          ) : (
            <Input
              value={formData.weightKg}
              onChange={(e) => handleInputChange('weightKg', parseFloat(e.target.value))}
              min="40"
              max="200"
              step="0.1"
              unit="kg"
            />
          )}
        </FormGroup>

        <FormGroup label="Wrist Circumference">
          {unit === 'us' ? (
            <Input
              value={formData.wrist}
              onChange={(e) => handleInputChange('wrist', parseFloat(e.target.value))}
              min="4"
              max="12"
              step="0.1"
              unit="in"
            />
          ) : (
            <Input
              value={formData.wristCm}
              onChange={(e) => handleInputChange('wristCm', parseFloat(e.target.value))}
              min="10"
              max="30"
              step="0.1"
              unit="cm"
            />
          )}
        </FormGroup>

        <FormGroup label="Ankle Circumference">
          {unit === 'us' ? (
            <Input
              value={formData.ankle}
              onChange={(e) => handleInputChange('ankle', parseFloat(e.target.value))}
              min="6"
              max="16"
              step="0.1"
              unit="in"
            />
          ) : (
            <Input
              value={formData.ankleCm}
              onChange={(e) => handleInputChange('ankleCm', parseFloat(e.target.value))}
              min="15"
              max="40"
              step="0.1"
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
          <ResultsContainer title="Your Body Type" downloadable>
            {/* Main Body Type Card */}
            <div style={{
              background: `linear-gradient(135deg, ${getSomatotypeColor(results.bodyType)} 0%, ${getSomatotypeColor(results.bodyType)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Your Body Type (Somatotype)
              </h2>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.bodyType || 'N/A'}
              </div>
              <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1rem' }}>
                {results.description || ''}
              </p>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Frame Size: {results.frameSize || 'Medium'}
              </div>
            </div>

            {/* Characteristics */}
            {results.characteristics && results.characteristics.length > 0 && (
              <div style={{
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  Key Characteristics
                </h3>
                <ul style={{ 
                  fontSize: '0.875rem', 
                  color: '#4b5563', 
                  lineHeight: '1.8',
                  margin: 0,
                  paddingLeft: '1.25rem'
                }}>
                  {results.characteristics.map((char, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{char}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Body Type Descriptions */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Body Type Comparison
              </h3>
              
              <ResultsGrid columns={3}>
                <div style={{
                  background: results.bodyType?.toLowerCase() === 'ectomorph' ? '#eff6ff' : 'white',
                  border: results.bodyType?.toLowerCase() === 'ectomorph' ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ 
                    color: '#3b82f6', 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    Ectomorph
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Naturally lean and thin with fast metabolism. Difficulty gaining weight and muscle.
                  </p>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    <strong>Traits:</strong> Long limbs, small joints, low body fat, narrow frame
                  </div>
                </div>

                <div style={{
                  background: results.bodyType?.toLowerCase() === 'mesomorph' ? '#f0fdf4' : 'white',
                  border: results.bodyType?.toLowerCase() === 'mesomorph' ? '2px solid #10b981' : '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ 
                    color: '#10b981', 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    Mesomorph
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Athletic and muscular build. Gains muscle easily and responds well to training.
                  </p>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    <strong>Traits:</strong> Broad shoulders, muscular, medium frame, efficient metabolism
                  </div>
                </div>

                <div style={{
                  background: results.bodyType?.toLowerCase() === 'endomorph' ? '#fff7ed' : 'white',
                  border: results.bodyType?.toLowerCase() === 'endomorph' ? '2px solid #f59e0b' : '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ 
                    color: '#f59e0b', 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    Endomorph
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Naturally higher body fat with slower metabolism. Stores fat more easily.
                  </p>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    <strong>Traits:</strong> Stockier build, wider hips, gains weight easily, larger frame
                  </div>
                </div>
              </ResultsGrid>
            </div>

            {/* Recommendations */}
            {results.recommendations && results.recommendations.length > 0 && (
              <div style={{
                background: '#f0fdf4',
                border: '2px solid #bbf7d0',
                borderRadius: '8px',
                padding: '1.5rem',
                marginTop: '2rem'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                  💪 Personalized Recommendations
                </h4>
                <ul style={{ 
                  fontSize: '0.875rem', 
                  color: '#15803d', 
                  lineHeight: '1.6',
                  margin: 0,
                  paddingLeft: '1.25rem'
                }}>
                  {results.recommendations.map((rec, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Training & Nutrition by Type */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Training & Nutrition Guide
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
                        Body Type
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Training Focus
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Nutrition Tips
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#3b82f6', marginRight: '0.5rem' }}></span>
                        <strong>Ectomorph</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Heavy compound lifts, limit cardio, focus on progressive overload
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        High calories, frequent meals, 25-30% protein, carbs around workouts
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#10b981', marginRight: '0.5rem' }}></span>
                        <strong>Mesomorph</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Mix of strength and cardio, variety works well, HIIT effective
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Moderate calories, balanced macros (30/40/30 P/C/F), flexible approach
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b', marginRight: '0.5rem' }}></span>
                        <strong>Endomorph</strong>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Frequent cardio, circuit training, active lifestyle, strength for metabolism
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Controlled calories, lower carbs (except around training), higher protein & healthy fats
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
              📊 About Somatotypes
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>What are Somatotypes?</strong> The somatotype theory classifies human body types into three categories based on skeletal structure and body composition tendencies.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Not Fixed:</strong> While genetics play a role, lifestyle, training, and nutrition significantly influence your body composition. Most people are combinations of types.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Use as a Guide:</strong> Understanding your body type helps optimize training and nutrition, but you're not limited by it. Consistency and proper programming matter most.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default BodyTypeCalculatorPage;
