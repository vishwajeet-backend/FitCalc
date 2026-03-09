import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, Select, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, InfoRow } from '../components/ResultsContainer';
import { calculateProtein } from '../utils/apiService';

function ProteinCalculatorPage() {
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
    weight: 180,
    activityLevel: 'moderate',
    goal: 'maintain',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);

    try {
      // Validate inputs
      if (!formData.age || formData.age <= 0 || formData.age > 120) {
        throw new Error('Please enter a valid age between 1 and 120');
      }
      if (!formData.weight || formData.weight <= 0) {
        throw new Error('Please enter a valid weight');
      }
      if (unit === 'us' && (!formData.heightFeet || formData.heightFeet <= 0)) {
        throw new Error('Please enter a valid height');
      }
      if (unit === 'metric' && (!formData.heightCm || formData.heightCm <= 0)) {
        throw new Error('Please enter a valid height');
      }

      const data = unit === 'us' 
        ? {
            age: formData.age,
            gender: formData.gender,
            height: (formData.heightFeet * 12) + formData.heightInches,
            weight: formData.weight,
            activityLevel: formData.activityLevel,
            goal: formData.goal,
            unit: 'us',
          }
        : {
            age: formData.age,
            gender: formData.gender,
            height: formData.heightCm,
            weight: formData.weight,
            activityLevel: formData.activityLevel,
            goal: formData.goal,
            unit: 'metric',
          };

      const result = await calculateProtein(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const activityOptions = [
    { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
    { value: 'light', label: 'Light (exercise 1-3 times/week)' },
    { value: 'moderate', label: 'Moderate (exercise 4-5 times/week)' },
    { value: 'active', label: 'Active (daily exercise)' },
    { value: 'veryActive', label: 'Very Active (intense exercise daily)' },
  ];

  const goalOptions = [
    { value: 'lose', label: 'Lose Weight' },
    { value: 'maintain', label: 'Maintain Weight' },
    { value: 'gain', label: 'Build Muscle' },
  ];

  return (
    <CalculatorLayout
      title="Protein Calculator"
      description="Calculate your daily protein requirements based on your age, weight, activity level, and fitness goals."
      breadcrumbPath="protein calculator"
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

        <FormGroup label="Activity Level">
          <Select
            value={formData.activityLevel}
            onChange={(e) => handleInputChange('activityLevel', e.target.value)}
            options={activityOptions}
          />
        </FormGroup>

        <FormGroup label="Goal">
          <Select
            value={formData.goal}
            onChange={(e) => handleInputChange('goal', e.target.value)}
            options={goalOptions}
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
        <ResultsContainer title="Your Protein Requirements" downloadable>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              fontSize: '3.5rem', 
              fontWeight: '700', 
              color: '#10b981',
              marginBottom: '0.5rem' 
            }}>
              {results.dailyProtein}g
            </div>
            <div style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              Recommended Daily Protein
            </div>
          </div>

          <ResultsGrid columns={4}>
            <ResultCard
              title="Per Meal"
              value={`${Math.round(results.dailyProtein / 3)}g`}
              subtitle="Based on 3 meals/day"
              color="#3b82f6"
            />
            <ResultCard
              title="Minimum"
              value={`${results.minProtein}g`}
              subtitle="For basic needs"
              color="#10b981"
            />
            <ResultCard
              title="Maximum"
              value={`${results.maxProtein}g`}
              subtitle="Upper safe limit"
              color="#f59e0b"
            />
            <ResultCard
              title="Calories"
              value={`${results.proteinCalories}`}
              subtitle="From protein"
              color="#8b5cf6"
            />
          </ResultsGrid>

          {results.recommendations && (
            <div style={{ marginTop: '2rem', background: '#f0fdf4', padding: '1.5rem', borderRadius: '8px', border: '1px solid #86efac' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#166534', marginBottom: '0.75rem' }}>
                💡 Protein Intake Recommendations
              </h3>
              <div style={{ color: '#15803d', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Minimum:</strong> {results.recommendations.minimum}g per day (basic needs)
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Moderate:</strong> {results.recommendations.moderate}g per day (active lifestyle)
                </div>
                <div>
                  <strong>High:</strong> {results.recommendations.high}g per day (athletes & muscle building)
                </div>
              </div>
            </div>
          )}
        </ResultsContainer>
      )}
    </CalculatorLayout>
  );
}

export default ProteinCalculatorPage;

