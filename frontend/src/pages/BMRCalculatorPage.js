import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, InfoRow } from '../components/ResultsContainer';
import { calculateBMR } from '../utils/apiService';

function BMRCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    age: 25,
    gender: 'male',
    heightFeet: 5,
    heightInches: 10,
    heightCm: 178,
    weight: 180,
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
            heightFeet: formData.heightFeet,
            heightInches: formData.heightInches,
            weight: formData.weight,
            unit: 'us',
          }
        : {
            age: formData.age,
            gender: formData.gender,
            height: formData.heightCm,
            weight: formData.weight,
            unit: 'metric',
          };

      const result = await calculateBMR(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const activityLevels = [
    { key: 'sedentary', label: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
    { key: 'light', label: 'Lightly Active', multiplier: 1.375, description: 'Exercise 1-3 times/week' },
    { key: 'moderate', label: 'Moderately Active', multiplier: 1.55, description: 'Exercise 4-5 times/week' },
    { key: 'active', label: 'Very Active', multiplier: 1.725, description: 'Daily exercise or intense 3-4 times/week' },
    { key: 'veryActive', label: 'Extra Active', multiplier: 1.9, description: 'Intense daily exercise or physical job' },
  ];

  return (
    <CalculatorLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) - the number of calories your body burns at rest - and see your Total Daily Energy Expenditure (TDEE) based on different activity levels."
      breadcrumbPath="bmr calculator"
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

        <FormGroup label="Weight">
          <Input
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
            min="1"
            unit={unit === 'us' ? 'lb' : 'kg'}
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
        <ResultsContainer title="Your Basal Metabolic Rate" downloadable>
          {/* Main BMR Result */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
              Your Basal Metabolic Rate
            </h2>
            <div style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {results.bmr ? Math.round(results.bmr).toLocaleString() : 'N/A'}
            </div>
            <p style={{ fontSize: '1rem', opacity: 0.9 }}>
              Calories/day at rest
            </p>
            <p style={{ 
              fontSize: '0.875rem', 
              marginTop: '1rem', 
              padding: '0.75rem', 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: '6px' 
            }}>
              💡 This is the number of calories your body burns at complete rest
            </p>
          </div>

          {/* TDEE for different activity levels */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Total Daily Energy Expenditure (TDEE)
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
              Based on your activity level, here's how many calories you burn per day:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activityLevels.map((level) => {
              const tdeeValue = results.bmr ? Math.round(results.bmr * level.multiplier) : 0;
              return (
                <div
                  key={level.key}
                  style={{
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                      {level.label}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {level.description}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: '#667eea',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.25rem'
                  }}>
                    {tdeeValue.toLocaleString()}
                    <span style={{ fontSize: '1rem', fontWeight: '500', color: '#6b7280' }}>
                      cal/day
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info section */}
          <div style={{
            background: '#eff6ff',
            border: '1px solid #dbeafe',
            borderRadius: '8px',
            padding: '1.25rem',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.75rem' }}>
              📊 Understanding Your Results
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>BMR (Basal Metabolic Rate):</strong> The number of calories your body needs to maintain basic physiological functions while at rest (breathing, circulation, cell production, etc.).
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>TDEE (Total Daily Energy Expenditure):</strong> Your BMR multiplied by an activity factor to estimate total daily calorie burn including exercise and daily activities.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Formula:</strong> We use the Mifflin-St Jeor equation, which is considered one of the most accurate BMR calculations.
              </p>
            </div>
          </div>
        </ResultsContainer>
      )}
    </CalculatorLayout>
  );
}

export default BMRCalculatorPage;
