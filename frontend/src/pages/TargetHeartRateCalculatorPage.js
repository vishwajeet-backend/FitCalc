import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, InfoRow } from '../components/ResultsContainer';
import { calculateTargetHeartRate } from '../utils/apiService';

function TargetHeartRateCalculatorPage() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    age: 30,
    restingHeartRate: 70,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);

    try {
      const result = await calculateTargetHeartRate(formData);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getZoneColor = (index) => {
    const colors = ['#3b82f6', '#10b981', '#fbbf24', '#f59e0b', '#ef4444'];
    return colors[index] || '#6b7280';
  };

  return (
    <CalculatorLayout
      title="Target Heart Rate Calculator"
      description="Calculate your target heart rate zones for effective cardiovascular training based on age and resting heart rate."
      breadcrumbPath="target heart rate calculator"
    >
      <CalculatorForm
        showUnitToggle={false}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
      >
        <FormGroup label="Age">
          <Input
            value={formData.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
            min="1"
            max="120"
            placeholder="Enter your age"
          />
        </FormGroup>

        <FormGroup label="Resting Heart Rate (bpm)">
          <Input
            value={formData.restingHeartRate}
            onChange={(e) => handleInputChange('restingHeartRate', parseInt(e.target.value))}
            min="30"
            max="120"
            placeholder="Enter your resting heart rate"
          />
        </FormGroup>

        <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '6px', fontSize: '0.875rem', color: '#1e40af' }}>
          💡 Measure your resting heart rate first thing in the morning before getting out of bed for the most accurate reading.
        </div>
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
          <ResultsContainer title="Your Heart Rate Zones" downloadable>
            <div style={{ marginBottom: '2rem' }}>
              <ResultsGrid columns={2}>
                <ResultCard
                  title="Maximum Heart Rate"
                  value={`${results.maxHeartRate} bpm`}
                  subtitle="220 - age"
                  color="#ef4444"
                />
                <ResultCard
                  title="Heart Rate Reserve"
                  value={`${results.heartRateReserve} bpm`}
                  subtitle="Max HR - Resting HR"
                  color="#3b82f6"
                />
              </ResultsGrid>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Training Zones (Karvonen Method)
            </h3>

            {results.zones && results.zones.map((zone, index) => (
              <div 
                key={index}
                style={{ 
                  background: 'white',
                  border: `2px solid ${getZoneColor(index)}`,
                  borderRadius: '8px',
                  padding: '1.25rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                      {zone.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      {zone.intensity}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: getZoneColor(index) 
                  }}>
                    {zone.min}-{zone.max} bpm
                  </div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.5' }}>
                  {zone.description}
                </div>
              </div>
            ))}
          </ResultsContainer>

          <div style={{ 
            background: 'white', 
            borderRadius: '8px', 
            padding: '2rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Understanding Heart Rate Zones
            </h3>
            <div style={{ display: 'grid', gap: '1rem', fontSize: '0.9375rem', lineHeight: '1.6', color: '#374151' }}>
              <p>
                <strong>Zone 1 (50-60%):</strong> Light activity - Great for warm-up, cool-down, and recovery. You should be able to hold a conversation easily.
              </p>
              <p>
                <strong>Zone 2 (60-70%):</strong> Moderate activity - Improves basic endurance and fat burning. Comfortable pace for long workouts.
              </p>
              <p>
                <strong>Zone 3 (70-80%):</strong> Hard activity - Improves aerobic fitness and muscle strength. Breathing becomes harder.
              </p>
              <p>
                <strong>Zone 4 (80-90%):</strong> Very hard - Improves speed and power. Can only maintain for short periods.
              </p>
              <p>
                <strong>Zone 5 (90-100%):</strong> Maximum effort - Develops maximum performance. Only sustainable for very short bursts.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default TargetHeartRateCalculatorPage;
