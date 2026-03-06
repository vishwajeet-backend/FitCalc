import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, Select, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, CalorieChart } from '../components/ResultsContainer';
import { calculateCalorie } from '../utils/apiService';

function CalorieCalculatorPage() {
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
    activityLevel: 'moderate',
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
            weight: formData.weight,
            activityLevel: formData.activityLevel,
            unit: 'us',
          }
        : {
            age: formData.age,
            gender: formData.gender,
            height: formData.heightCm,
            weight: formData.weight,
            activityLevel: formData.activityLevel,
            unit: 'metric',
          };

      const result = await calculateCalorie(data);
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
    { value: 'active', label: 'Active (daily exercise or intense 3-4 times/week)' },
    { value: 'veryActive', label: 'Very Active (intense exercise 6-7 times/week)' },
  ];

  return (
    <CalculatorLayout
      title="Calorie Calculator"
      description="The Calorie Calculator can be used to estimate the number of calories a person needs to consume each day. This calculator can also provide some simple guidelines for gaining or losing weight."
      breadcrumbPath="target heart rate calculator"
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

        <FormGroup label={`Weight`}>
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
          <ResultsContainer title="Your Results" downloadable>
            <ResultsGrid columns={4}>
              <ResultCard
                title="Maintain weight"
                value={results.maintain?.toLocaleString() || 'N/A'}
                percentage={results.maintain ? `${results.maintain.toLocaleString()} 100%` : 'N/A'}
                subtitle="Calories/day"
                color="#10b981"
              />
              <ResultCard
                title="Mild weight loss"
                value={results.mildWeightLoss?.toLocaleString() || 'N/A'}
                percentage={results.mildWeightLossPercentage || 'N/A'}
                subtitle="Calories/day"
                color="#3b82f6"
              />
              <ResultCard
                title="Weight loss"
                value={results.weightLoss?.toLocaleString() || 'N/A'}
                percentage={results.weightLossPercentage || 'N/A'}
                subtitle="Calories/day"
                color="#f59e0b"
              />
              <ResultCard
                title="Extreme weight loss"
                value={results.extremeWeightLoss?.toLocaleString() || 'N/A'}
                percentage={results.extremeWeightLossPercentage || 'N/A'}
                subtitle="Calories/day"
                color="#ef4444"
              />
            </ResultsGrid>

            {results.maintain && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  Daily Calorie Goals
                </h3>
                <CalorieChart
                  maintain={results.maintain}
                  mildLoss={results.mildWeightLoss}
                  moderateLoss={results.weightLoss}
                  extremeLoss={results.extremeWeightLoss}
                />
              </div>
            )}
          </ResultsContainer>
        </>
      )}
    </CalculatorLayout>
  );
}

export default CalorieCalculatorPage;
