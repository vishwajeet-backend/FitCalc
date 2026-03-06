import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, InfoRow, BMIChart } from '../components/ResultsContainer';

function BMICalculatorPage() {
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
      // Local BMI calculation
      let heightInMeters, weightInKg;
      
      if (unit === 'us') {
        const totalInches = (parseFloat(formData.heightFeet) || 0) * 12 + (parseFloat(formData.heightInches) || 0);
        heightInMeters = totalInches * 0.0254;
        weightInKg = (parseFloat(formData.weight) || 0) * 0.453592;
      } else {
        heightInMeters = (parseFloat(formData.heightCm) || 0) / 100;
        weightInKg = parseFloat(formData.weight) || 0;
      }

      if (heightInMeters === 0 || weightInKg === 0) {
        setError('Please enter valid height and weight values.');
        setIsCalculating(false);
        return;
      }

      const bmi = weightInKg / (heightInMeters * heightInMeters);
      
      let category = '';
      if (bmi < 18.5) {
        category = 'Underweight';
      } else if (bmi < 25) {
        category = 'Normal weight';
      } else if (bmi < 30) {
        category = 'Overweight';
      } else {
        category = 'Obese';
      }

      const healthyWeightRange = {
        min: 18.5 * (heightInMeters * heightInMeters),
        max: 24.9 * (heightInMeters * heightInMeters)
      };

      const bmiPrime = bmi / 25;

      const result = {
        bmi: parseFloat(bmi.toFixed(1)),
        category,
        healthyBMIRange: '18.5 - 24.9',
        bmiPrime: parseFloat(bmiPrime.toFixed(2)),
        healthyWeightRange: unit === 'us' 
          ? `${Math.round(healthyWeightRange.min * 2.20462)} - ${Math.round(healthyWeightRange.max * 2.20462)} lbs`
          : `${Math.round(healthyWeightRange.min)} - ${Math.round(healthyWeightRange.max)} kg`
      };

      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Underweight': '#fbbf24',
      'Normal weight': '#10b981',
      'Overweight': '#f59e0b',
      'Obese': '#ef4444',
    };
    return colors[category] || '#3b82f6';
  };

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to understand if you're at a healthy weight for your height."
      breadcrumbPath="bmi calculator"
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
        <>
          <ResultsContainer title="Your Results" downloadable>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                background: getCategoryColor(results.category),
                color: 'white',
                borderRadius: '8px',
                marginBottom: '1.5rem',
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {results.bmi}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {results.category}
                </div>
              </div>

              <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px' }}>
                <InfoRow label="Healthy BMI range" value={results.healthyBMIRange} highlight />
                <InfoRow label="Healthy weight range" value={results.healthyWeightRange} highlight />
                <InfoRow label="BMI Prime" value={results.bmiPrime} />
                <InfoRow 
                  label="Ponderal Index" 
                  value={results.ponderalIndex ? results.ponderalIndex.toFixed(2) : 'N/A'} 
                />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                BMI Categories
              </h3>
              <BMIChart bmi={results.bmi} category={results.category} />
            </div>
          </ResultsContainer>
        </>
      )}
    </CalculatorLayout>
  );
}

export default BMICalculatorPage;
