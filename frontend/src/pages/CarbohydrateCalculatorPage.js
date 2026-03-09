import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, Select } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateCarbs } from '../utils/apiService';

function CarbohydrateCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    weight: 180,
    weightKg: 82,
    activityLevel: 'moderate',
    goal: 'maintain',
    dietType: 'balanced',
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
      const weight = unit === 'us' ? formData.weight : formData.weightKg;
      if (!weight || weight <= 0) {
        throw new Error('Please enter a valid weight');
      }

      const data = {
        weight: weight,
        activityLevel: formData.activityLevel,
        goal: formData.goal,
        dietType: formData.dietType,
        unit,
      };

      const result = await calculateCarbs(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getDietTypeColor = (dietType) => {
    switch (dietType) {
      case 'keto':
        return '#ef4444'; // Red
      case 'lowcarb':
        return '#f59e0b'; // Orange
      case 'balanced':
        return '#10b981'; // Green
      case 'highcarb':
        return '#3b82f6'; // Blue
      default:
        return '#6b7280';
    }
  };

  const getGoalColor = (goal) => {
    switch (goal) {
      case 'weightloss':
        return '#ef4444';
      case 'musclegain':
        return '#8b5cf6';
      case 'maintain':
      default:
        return '#10b981';
    }
  };

  return (
    <CalculatorLayout
      title="Carbohydrate Calculator"
      description="Calculate your daily carbohydrate needs based on your weight, activity level, fitness goals, and diet preferences. Get personalized recommendations for optimal energy and performance."
      breadcrumbPath="carbohydrate calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
      >
        <FormGroup label="Body Weight">
          {unit === 'us' ? (
            <Input
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              min="50"
              max="500"
              step="0.1"
              unit="lbs"
            />
          ) : (
            <Input
              value={formData.weightKg}
              onChange={(e) => handleInputChange('weightKg', parseFloat(e.target.value))}
              min="20"
              max="250"
              step="0.1"
              unit="kg"
            />
          )}
        </FormGroup>

        <FormGroup label="Activity Level">
          <Select
            value={formData.activityLevel}
            onChange={(e) => handleInputChange('activityLevel', e.target.value)}
          >
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (exercise 6-7 days/week)</option>
            <option value="veryactive">Very Active (physical job + exercise)</option>
            <option value="athlete">Athlete (intense training 2x/day)</option>
          </Select>
        </FormGroup>

        <FormGroup label="Goal">
          <Select
            value={formData.goal}
            onChange={(e) => handleInputChange('goal', e.target.value)}
          >
            <option value="weightloss">Weight Loss</option>
            <option value="maintain">Maintain Weight</option>
            <option value="musclegain">Muscle Gain</option>
          </Select>
        </FormGroup>

        <FormGroup label="Diet Type">
          <Select
            value={formData.dietType}
            onChange={(e) => handleInputChange('dietType', e.target.value)}
          >
            <option value="keto">Keto (very low carb)</option>
            <option value="lowcarb">Low Carb</option>
            <option value="balanced">Balanced</option>
            <option value="highcarb">High Carb</option>
          </Select>
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
          <ResultsContainer title="Your Carbohydrate Recommendations" downloadable>
            {/* Main Carb Card */}
            <div style={{
              background: `linear-gradient(135deg, ${getDietTypeColor(formData.dietType)} 0%, ${getDietTypeColor(formData.dietType)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Daily Carbohydrate Target
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.dailyCarbs ? Math.round(results.dailyCarbs) : 'N/A'}
              </div>
              <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '1rem' }}>
                grams per day
              </p>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {results.carbsPerKg ? `${results.carbsPerKg} g/kg body weight` : ''}
              </div>
            </div>

            {/* Carb Breakdown */}
            <ResultsGrid columns={3}>
              <ResultCard
                title="Daily Carbs"
                value={`${results.dailyCarbs ? Math.round(results.dailyCarbs) : 0} g`}
                percentage=""
                subtitle="Total carbohydrates"
                color={getDietTypeColor(formData.dietType)}
              />
              <ResultCard
                title="Per Meal (3 meals)"
                value={`${results.perMeal ? Math.round(results.perMeal) : 0} g`}
                percentage=""
                subtitle="If eating 3x per day"
                color="#3b82f6"
              />
              <ResultCard
                title="Calories from Carbs"
                value={`${results.carbCalories ? Math.round(results.carbCalories) : 0}`}
                percentage=""
                subtitle="kcal (4 cal/gram)"
                color="#8b5cf6"
              />
            </ResultsGrid>

            {/* Diet Type Comparison */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Carb Intake by Diet Type
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
                        Diet Type
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Carb Range
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={formData.dietType === 'keto' ? { background: '#fef2f2' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#ef4444', marginRight: '0.5rem' }}></span>
                        <strong>Keto</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>0.5 g/kg</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Very low carb, high fat for ketosis
                      </td>
                    </tr>
                    <tr style={formData.dietType === 'lowcarb' ? { background: '#fff7ed' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b', marginRight: '0.5rem' }}></span>
                        <strong>Low Carb</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>1.5 g/kg</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Reduced carbs for weight loss
                      </td>
                    </tr>
                    <tr style={formData.dietType === 'balanced' ? { background: '#f0fdf4' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#10b981', marginRight: '0.5rem' }}></span>
                        <strong>Balanced</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>3-8 g/kg</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Varies by activity level
                      </td>
                    </tr>
                    <tr style={formData.dietType === 'highcarb' ? { background: '#eff6ff' } : {}}>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#3b82f6', marginRight: '0.5rem' }}></span>
                        <strong>High Carb</strong>
                      </td>
                      <td style={{ padding: '1rem' }}>8-10 g/kg</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        For endurance athletes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Level Impact */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Activity Level Recommendations
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
                        Activity Level
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Carbs (g/kg)
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Training Volume
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={formData.activityLevel === 'sedentary' ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Sedentary</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>3 g/kg</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Little to no exercise
                      </td>
                    </tr>
                    <tr style={formData.activityLevel === 'light' ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Light</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>4 g/kg</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        1-3 days/week
                      </td>
                    </tr>
                    <tr style={formData.activityLevel === 'moderate' ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Moderate</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>5 g/kg</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        3-5 days/week
                      </td>
                    </tr>
                    <tr style={formData.activityLevel === 'active' ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Active</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>6 g/kg</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        6-7 days/week
                      </td>
                    </tr>
                    <tr style={formData.activityLevel === 'veryactive' ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Very Active</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>7 g/kg</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Physical job + exercise
                      </td>
                    </tr>
                    <tr style={formData.activityLevel === 'athlete' ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem' }}>Athlete</td>
                      <td style={{ padding: '1rem' }}>8 g/kg</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Intense training 2x/day
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Carb Sources */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                🥗 Best Carbohydrate Sources
              </h4>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '1rem',
                fontSize: '0.875rem', 
                color: '#15803d',
              }}>
                <div>
                  <strong>Complex Carbs:</strong>
                  <ul style={{ margin: '0.5rem 0 0 1.25rem', lineHeight: '1.6' }}>
                    <li>Whole grains (oats, quinoa, brown rice)</li>
                    <li>Sweet potatoes & vegetables</li>
                    <li>Legumes & beans</li>
                  </ul>
                </div>
                <div>
                  <strong>Simple Carbs (timing matters):</strong>
                  <ul style={{ margin: '0.5rem 0 0 1.25rem', lineHeight: '1.6' }}>
                    <li>Fruits (pre/post workout)</li>
                    <li>Honey & maple syrup (moderation)</li>
                    <li>White rice (easy to digest)</li>
                  </ul>
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
              📊 Understanding Your Carb Needs
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Why Carbs Matter:</strong> Carbohydrates are your body's preferred energy source, especially for brain function and intense physical activity.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Adjust for Goals:</strong> Weight loss typically requires fewer carbs, while muscle gain and athletic performance need more.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Quality Over Quantity:</strong> Focus on complex carbs from whole foods rather than refined sugars for sustained energy and better health.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default CarbohydrateCalculatorPage;
