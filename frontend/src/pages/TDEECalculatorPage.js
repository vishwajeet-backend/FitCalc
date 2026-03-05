import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup, Select } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, CalorieChart } from '../components/ResultsContainer';
import { calculateTDEE } from '../utils/apiService';

function TDEECalculatorPage() {
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
            heightFeet: formData.heightFeet,
            heightInches: formData.heightInches,
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

      const result = await calculateTDEE(data);
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
    { value: 'very_active', label: 'Very Active (intense exercise 6-7 times/week)' },
    { value: 'extra_active', label: 'Extra Active (very intense daily exercise)' },
  ];

  return (
    <CalculatorLayout
      title="TDEE Calculator"
      description="Calculate your Total Daily Energy Expenditure (TDEE) - the total number of calories you burn per day based on your activity level. Get personalized calorie targets for weight loss, maintenance, and weight gain."
      breadcrumbPath="tdee calculator"
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
          <ResultsContainer title="Your Daily Energy Expenditure" downloadable>
            {/* BMR Section */}
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Basal Metabolic Rate (BMR)
              </h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                {results.bmr ? Math.round(results.bmr).toLocaleString() : 'N/A'}
              </div>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Calories/day at rest
              </p>
            </div>

            {/* TDEE Section */}
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Total Daily Energy Expenditure
              </h2>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.tdee ? Math.round(results.tdee).toLocaleString() : 'N/A'}
              </div>
              <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                Calories/day with activity
              </p>
            </div>

            {/* Weight Goal Cards */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Calorie Targets for Different Goals
            </h3>
            
            <ResultsGrid columns={3}>
              <ResultCard
                title="Extreme Weight Loss"
                value={results.extremeWeightLoss?.toLocaleString() || 'N/A'}
                percentage="-1000 cal/day"
                subtitle="1 kg / 2 lbs per week"
                color="#ef4444"
              />
              <ResultCard
                title="Weight Loss"
                value={results.weightLoss?.toLocaleString() || 'N/A'}
                percentage="-500 cal/day"
                subtitle="0.5 kg / 1 lb per week"
                color="#f97316"
              />
              <ResultCard
                title="Mild Weight Loss"
                value={results.mildWeightLoss?.toLocaleString() || 'N/A'}
                percentage="-250 cal/day"
                subtitle="0.25 kg / 0.5 lbs per week"
                color="#f59e0b"
              />
              <ResultCard
                title="Maintain Weight"
                value={results.maintain?.toLocaleString() || 'N/A'}
                percentage="100%"
                subtitle="Maintain current weight"
                color="#10b981"
              />
              <ResultCard
                title="Mild Weight Gain"
                value={results.mildWeightGain?.toLocaleString() || 'N/A'}
                percentage="+250 cal/day"
                subtitle="0.25 kg / 0.5 lbs per week"
                color="#3b82f6"
              />
              <ResultCard
                title="Weight Gain"
                value={results.weightGain?.toLocaleString() || 'N/A'}
                percentage="+500 cal/day"
                subtitle="0.5 kg / 1 lb per week"
                color="#8b5cf6"
              />
            </ResultsGrid>
          </ResultsContainer>

          {/* Calorie Chart */}
          {results.tdee && (
            <div style={{ marginTop: '2rem' }}>
              <CalorieChart
                maintain={results.maintain || results.tdee}
                mildLoss={results.mildWeightLoss || results.tdee - 250}
                weightLoss={results.weightLoss || results.tdee - 500}
                extremeLoss={results.extremeWeightLoss || results.tdee - 1000}
              />
            </div>
          )}

          {/* Info section */}
          <div style={{
            background: '#eff6ff',
            border: '1px solid #dbeafe',
            borderRadius: '8px',
            padding: '1.25rem',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.75rem' }}>
              📊 Understanding Your TDEE
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                Your TDEE is calculated by multiplying your BMR by an activity factor based on your exercise frequency.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>To lose weight:</strong> Eat fewer calories than your TDEE (calorie deficit)
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>To maintain weight:</strong> Eat calories equal to your TDEE
              </p>
              <p style={{ margin: 0 }}>
                <strong>To gain weight:</strong> Eat more calories than your TDEE (calorie surplus)
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default TDEECalculatorPage;
