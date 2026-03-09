import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, Select } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateFatIntake } from '../utils/apiService';

function FatIntakeCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    calories: 2000,
    dietType: 'balanced',
    goal: 'maintain',
    cholesterol: 'normal',
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
      if (!formData.calories || formData.calories < 1000 || formData.calories > 5000) {
        throw new Error('Please enter a valid daily calorie amount (1000-5000)');
      }

      const data = {
        calories: formData.calories,
        dietType: formData.dietType,
        goal: formData.goal,
        cholesterol: formData.cholesterol,
        unit,
      };

      const result = await calculateFatIntake(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getDietColor = (dietType) => {
    switch (dietType) {
      case 'keto':
        return '#8b5cf6'; // Purple
      case 'lowfat':
        return '#3b82f6'; // Blue
      case 'mediterranean':
        return '#10b981'; // Green
      case 'balanced':
      default:
        return '#f59e0b'; // Orange
    }
  };

  return (
    <CalculatorLayout
      title="Fat Intake Calculator"
      description="Calculate your optimal daily fat intake based on your calorie needs, diet type, and health goals. Get personalized recommendations for total fat, saturated fat, and omega-3 fatty acids."
      breadcrumbPath="fat intake calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
        showUnitToggle={false}
      >
        <FormGroup label="Daily Calories">
          <Input
            value={formData.calories}
            onChange={(e) => handleInputChange('calories', parseInt(e.target.value))}
            min="1000"
            max="5000"
            step="50"
            unit="kcal"
          />
        </FormGroup>

        <FormGroup label="Diet Type">
          <Select
            value={formData.dietType}
            onChange={(e) => handleInputChange('dietType', e.target.value)}
          >
            <option value="balanced">Balanced (25-35% fat)</option>
            <option value="keto">Keto (70-80% fat)</option>
            <option value="lowfat">Low Fat (20-25% fat)</option>
            <option value="mediterranean">Mediterranean (35-40% fat)</option>
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

        <FormGroup label="Cholesterol Level">
          <Select
            value={formData.cholesterol}
            onChange={(e) => handleInputChange('cholesterol', e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="high">High (reduce saturated fat)</option>
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
          <ResultsContainer title="Your Fat Intake Recommendations" downloadable>
            {/* Main Fat Card */}
            <div style={{
              background: `linear-gradient(135deg, ${getDietColor(formData.dietType)} 0%, ${getDietColor(formData.dietType)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Daily Total Fat
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.totalFat ? Math.round(results.totalFat) : 'N/A'}
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
                {results.fatCalories ? `${Math.round(results.fatCalories)} calories from fat` : ''}
              </div>
            </div>

            {/* Fat Breakdown */}
            <ResultsGrid columns={3}>
              <ResultCard
                title="Total Fat"
                value={`${results.totalFat ? Math.round(results.totalFat) : 0} g`}
                percentage={results.totalFatPercent ? `${Math.round(results.totalFatPercent)}% of calories` : ''}
                subtitle="Daily fat intake"
                color={getDietColor(formData.dietType)}
              />
              <ResultCard
                title="Saturated Fat"
                value={`${results.saturatedFat ? Math.round(results.saturatedFat) : 0} g`}
                percentage="Max recommended"
                subtitle="Limit for heart health"
                color="#ef4444"
              />
              <ResultCard
                title="Unsaturated Fat"
                value={`${results.unsaturatedFat ? Math.round(results.unsaturatedFat) : 0} g`}
                percentage="Healthy fats"
                subtitle="Mono + Polyunsaturated"
                color="#10b981"
              />
            </ResultsGrid>

            {/* Detailed Fat Types */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Detailed Fat Breakdown
              </h3>
              
              <ResultsGrid columns={4}>
                <ResultCard
                  title="Monounsaturated"
                  value={`${results.monounsaturated ? Math.round(results.monounsaturated) : 0} g`}
                  percentage=""
                  subtitle="Heart-healthy"
                  color="#3b82f6"
                />
                <ResultCard
                  title="Polyunsaturated"
                  value={`${results.polyunsaturated ? Math.round(results.polyunsaturated) : 0} g`}
                  percentage=""
                  subtitle="Essential fats"
                  color="#8b5cf6"
                />
                <ResultCard
                  title="Omega-3"
                  value={`${results.omega3 ? results.omega3 : 0} g`}
                  percentage="Minimum"
                  subtitle="Anti-inflammatory"
                  color="#10b981"
                />
                <ResultCard
                  title="Trans Fat"
                  value="0 g"
                  percentage="Avoid"
                  subtitle="Eliminate completely"
                  color="#ef4444"
                />
              </ResultsGrid>
            </div>

            {/* Diet Type Comparison */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Fat Intake by Diet Type
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
                        Fat %
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={formData.dietType === 'lowfat' ? { background: '#eff6ff' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#3b82f6', marginRight: '0.5rem' }}></span>
                        <strong>Low Fat</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>20-25%</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Traditional low-fat approach
                      </td>
                    </tr>
                    <tr style={formData.dietType === 'balanced' ? { background: '#fff7ed' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b', marginRight: '0.5rem' }}></span>
                        <strong>Balanced</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>25-35%</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Standard dietary guidelines
                      </td>
                    </tr>
                    <tr style={formData.dietType === 'mediterranean' ? { background: '#f0fdf4' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#10b981', marginRight: '0.5rem' }}></span>
                        <strong>Mediterranean</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>35-40%</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Olive oil, nuts, fish
                      </td>
                    </tr>
                    <tr style={formData.dietType === 'keto' ? { background: '#f5f3ff' } : {}}>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#8b5cf6', marginRight: '0.5rem' }}></span>
                        <strong>Keto</strong>
                      </td>
                      <td style={{ padding: '1rem' }}>70-80%</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Very high fat, ketogenic
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Healthy Fat Sources */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                🥑 Healthy Fat Sources
              </h4>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '1rem',
                fontSize: '0.875rem', 
                color: '#15803d',
              }}>
                <div>
                  <strong>Monounsaturated:</strong>
                  <ul style={{ margin: '0.5rem 0 0 1.25rem', lineHeight: '1.6' }}>
                    <li>Olive oil & avocados</li>
                    <li>Nuts (almonds, cashews)</li>
                    <li>Peanut butter</li>
                  </ul>
                </div>
                <div>
                  <strong>Polyunsaturated:</strong>
                  <ul style={{ margin: '0.5rem 0 0 1.25rem', lineHeight: '1.6' }}>
                    <li>Fatty fish (salmon, mackerel)</li>
                    <li>Walnuts & flaxseeds</li>
                    <li>Chia seeds & hemp seeds</li>
                  </ul>
                </div>
                <div>
                  <strong>Limit Saturated:</strong>
                  <ul style={{ margin: '0.5rem 0 0 1.25rem', lineHeight: '1.6' }}>
                    <li>Red meat & butter</li>
                    <li>Coconut & palm oil</li>
                    <li>Full-fat dairy</li>
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
              📊 Understanding Dietary Fats
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Not All Fats Are Equal:</strong> Unsaturated fats (mono and poly) support heart health, while saturated and trans fats should be limited.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Omega-3 Benefits:</strong> These essential fatty acids reduce inflammation, support brain health, and protect heart function.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Cholesterol Concerns:</strong> If you have high cholesterol, prioritize unsaturated fats and keep saturated fat below 7% of total calories.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default FatIntakeCalculatorPage;
