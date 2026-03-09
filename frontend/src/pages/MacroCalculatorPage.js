import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup, Select } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, MacroChart } from '../components/ResultsContainer';
import { calculateMacro } from '../utils/apiService';

function MacroCalculatorPage() {
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

      const result = await calculateMacro(data);
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

  const goalOptions = [
    { value: 'lose', label: 'Lose Weight' },
    { value: 'maintain', label: 'Maintain Weight' },
    { value: 'gain', label: 'Gain Muscle' },
  ];

  return (
    <CalculatorLayout
      title="Macro Calculator"
      description="Calculate your optimal macronutrient distribution (protein, carbs, and fats) based on your goals, activity level, and body composition. Get personalized recommendations for weight loss, maintenance, or muscle gain."
      breadcrumbPath="macro calculator"
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
        <>
          <ResultsContainer title="Your Macronutrient Targets" downloadable>
            {/* Daily Calories */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Daily Calorie Target
              </h2>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.calories ? Math.round(results.calories).toLocaleString() : 'N/A'}
              </div>
              <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                Calories per day
              </p>
            </div>

            {/* Macronutrient Breakdown */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Macronutrient Breakdown
            </h3>
            
            <ResultsGrid columns={3}>
              <ResultCard
                title="Protein"
                value={`${results.protein ? Math.round(results.protein) : 'N/A'}g`}
                percentage={results.proteinPercentage ? `${results.proteinPercentage}%` : 'N/A'}
                subtitle={results.proteinCalories ? `${Math.round(results.proteinCalories)} calories` : ''}
                color="#ef4444"
              />
              <ResultCard
                title="Carbohydrates"
                value={`${results.carbs ? Math.round(results.carbs) : 'N/A'}g`}
                percentage={results.carbsPercentage ? `${results.carbsPercentage}%` : 'N/A'}
                subtitle={results.carbsCalories ? `${Math.round(results.carbsCalories)} calories` : ''}
                color="#3b82f6"
              />
              <ResultCard
                title="Fats"
                value={`${results.fats ? Math.round(results.fats) : 'N/A'}g`}
                percentage={results.fatsPercentage ? `${results.fatsPercentage}%` : 'N/A'}
                subtitle={results.fatsCalories ? `${Math.round(results.fatsCalories)} calories` : ''}
                color="#f59e0b"
              />
            </ResultsGrid>

            {/* Macro Chart */}
            {results.protein && results.carbs && results.fats && (
              <div style={{ marginTop: '2rem' }}>
                <MacroChart
                  protein={results.protein}
                  carbs={results.carbs}
                  fats={results.fats}
                />
              </div>
            )}

            {/* Per Meal Breakdown */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Per Meal (3 meals/day)
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  background: 'white',
                  border: '2px solid #fee2e2',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Protein
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                    {results.proteinPerMeal ? Math.round(results.proteinPerMeal) : Math.round(results.protein / 3)}g
                  </div>
                </div>
                
                <div style={{
                  background: 'white',
                  border: '2px solid #dbeafe',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Carbs
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                    {results.carbsPerMeal ? Math.round(results.carbsPerMeal) : Math.round(results.carbs / 3)}g
                  </div>
                </div>
                
                <div style={{
                  background: 'white',
                  border: '2px solid #fef3c7',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Fats
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                    {results.fatsPerMeal ? Math.round(results.fatsPerMeal) : Math.round(results.fats / 3)}g
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Calories
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6b7280' }}>
                    {results.calories ? Math.round(results.calories / 3) : 'N/A'}
                  </div>
                </div>
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
              📊 Understanding Macronutrients
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Protein (4 cal/g):</strong> Essential for muscle repair, growth, and maintenance. Higher protein helps with satiety and preserving muscle during weight loss.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Carbohydrates (4 cal/g):</strong> Your body's primary energy source, especially important for high-intensity exercise and brain function.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Fats (9 cal/g):</strong> Necessary for hormone production, nutrient absorption, and cell function. Include healthy sources like nuts, avocados, and olive oil.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default MacroCalculatorPage;
