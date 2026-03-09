import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, Select } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateCaloriesBurned } from '../utils/apiService';

function CaloriesBurnedCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    weight: 180,
    weightKg: 82,
    activity: 'running',
    duration: 30,
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
      if (!formData.duration || formData.duration <= 0) {
        throw new Error('Please enter a valid duration');
      }

      const data = {
        weight: weight,
        activity: formData.activity,
        duration: formData.duration,
        unit,
      };

      const result = await calculateCaloriesBurned(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getActivityColor = (activity) => {
    const metValues = {
      walking: 3.5,
      running: 9.8,
      cycling: 7.5,
      swimming: 8.0,
      yoga: 3.0,
      hiit: 12.0,
      weightlifting: 6.0,
      dancing: 5.0,
      basketball: 8.0,
      soccer: 10.0,
      tennis: 7.3,
      hiking: 6.0,
      rowing: 7.0,
      jumping: 12.3
    };
    
    const met = metValues[activity] || 5.0;
    
    if (met >= 10) return '#ef4444'; // Red - High intensity
    if (met >= 7) return '#f59e0b'; // Orange - Moderate-high
    if (met >= 5) return '#10b981'; // Green - Moderate
    return '#3b82f6'; // Blue - Low intensity
  };

  const getIntensityLabel = (met) => {
    if (met >= 10) return 'High Intensity';
    if (met >= 7) return 'Moderate-High';
    if (met >= 5) return 'Moderate';
    return 'Low Intensity';
  };

  return (
    <CalculatorLayout
      title="Calories Burned Calculator"
      description="Calculate how many calories you burn during different activities based on your weight, exercise type, and duration. Get estimates for various popular activities and durations."
      breadcrumbPath="calories burned calculator"
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

        <FormGroup label="Activity">
          <Select
            value={formData.activity}
            onChange={(e) => handleInputChange('activity', e.target.value)}
          >
            <option value="walking">Walking (3.5 mph)</option>
            <option value="running">Running (6 mph)</option>
            <option value="cycling">Cycling (moderate)</option>
            <option value="swimming">Swimming (moderate)</option>
            <option value="yoga">Yoga</option>
            <option value="hiit">HIIT / CrossFit</option>
            <option value="weightlifting">Weight Lifting</option>
            <option value="dancing">Dancing</option>
            <option value="basketball">Basketball</option>
            <option value="soccer">Soccer</option>
            <option value="tennis">Tennis</option>
            <option value="hiking">Hiking</option>
            <option value="rowing">Rowing Machine</option>
            <option value="jumping">Jump Rope</option>
          </Select>
        </FormGroup>

        <FormGroup label="Duration (minutes)">
          <Input
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
            min="1"
            max="300"
            unit="min"
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
          <ResultsContainer title="Calories Burned" downloadable>
            {/* Main Calories Card */}
            <div style={{
              background: `linear-gradient(135deg, ${getActivityColor(formData.activity)} 0%, ${getActivityColor(formData.activity)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Calories Burned in {formData.duration} Minutes
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.caloriesBurned ? Math.round(results.caloriesBurned) : 'N/A'}
              </div>
              <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '1rem' }}>
                calories
              </p>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {results.met ? `MET ${results.met} • ${getIntensityLabel(results.met)}` : ''}
              </div>
            </div>

            {/* Key Metrics */}
            <ResultsGrid columns={3}>
              <ResultCard
                title="Calories Burned"
                value={`${results.caloriesBurned ? Math.round(results.caloriesBurned) : 0}`}
                percentage={`${formData.duration} minutes`}
                subtitle="For this duration"
                color={getActivityColor(formData.activity)}
              />
              <ResultCard
                title="Per Hour"
                value={`${results.caloriesPerHour ? Math.round(results.caloriesPerHour) : 0}`}
                percentage="kcal/hour"
                subtitle="If sustained"
                color="#3b82f6"
              />
              <ResultCard
                title="MET Value"
                value={results.met ? results.met.toFixed(1) : '0'}
                percentage={getIntensityLabel(results.met)}
                subtitle="Metabolic equivalent"
                color="#8b5cf6"
              />
            </ResultsGrid>

            {/* Calories by Duration */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Calories by Duration
              </h3>
              
              <ResultsGrid columns={3}>
                {results.durations && Object.entries(results.durations).map(([duration, calories]) => (
                  <ResultCard
                    key={duration}
                    title={duration.replace('min', ' Minutes')}
                    value={`${calories} cal`}
                    percentage=""
                    subtitle={duration === `${formData.duration}min` ? 'Selected duration' : ''}
                    color={duration === `${formData.duration}min` ? getActivityColor(formData.activity) : '#6b7280'}
                  />
                ))}
              </ResultsGrid>
            </div>

            {/* Activity Comparison Table */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Activity Intensity Comparison
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
                        Activity
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        MET Value
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Intensity
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        30 Min Cal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#3b82f6', marginRight: '0.5rem' }}></span>
                        Yoga
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>3.0</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Low</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>~120 cal</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#3b82f6', marginRight: '0.5rem' }}></span>
                        Walking
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>3.5</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Low</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>~140 cal</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#10b981', marginRight: '0.5rem' }}></span>
                        Dancing
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>5.0</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Moderate</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>~200 cal</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#10b981', marginRight: '0.5rem' }}></span>
                        Weight Lifting
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>6.0</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Moderate</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>~240 cal</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b', marginRight: '0.5rem' }}></span>
                        Cycling
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>7.5</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Moderate-High</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>~300 cal</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b', marginRight: '0.5rem' }}></span>
                        Swimming
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>8.0</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Moderate-High</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>~320 cal</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#ef4444', marginRight: '0.5rem' }}></span>
                        Running
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>9.8</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>High</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>~390 cal</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#ef4444', marginRight: '0.5rem' }}></span>
                        HIIT / Jump Rope
                      </td>
                      <td style={{ padding: '1rem' }}>12.0+</td>
                      <td style={{ padding: '1rem' }}>High</td>
                      <td style={{ padding: '1rem' }}>~480 cal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                💡 Maximize Your Calorie Burn
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Increase Intensity:</strong> Higher intensity activities burn more calories in less time
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Add Intervals:</strong> Mix high and low intensity for greater calorie burn and fitness gains
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Build Muscle:</strong> Weight training increases metabolic rate even at rest
                </li>
                <li>
                  <strong>Stay Consistent:</strong> Regular activity is more important than occasional intense workouts
                </li>
              </ul>
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
              📊 About MET Values
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>What is MET?</strong> Metabolic Equivalent of Task (MET) measures exercise intensity. 1 MET = resting metabolic rate.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Calculation:</strong> Calories Burned = MET × Weight (kg) × Duration (hours). Heavier people burn more calories doing the same activity.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Individual Variation:</strong> Actual calories burned can vary based on fitness level, efficiency, and effort intensity.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default CaloriesBurnedCalculatorPage;
