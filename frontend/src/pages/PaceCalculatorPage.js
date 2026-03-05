import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, Select } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculatePace } from '../utils/apiService';

function PaceCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    distance: 3.1,
    distanceKm: 5,
    distanceUnit: 'miles',
    hours: 0,
    minutes: 25,
    seconds: 0,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);

    try {
      const data = {
        distance: unit === 'us' ? formData.distance : formData.distanceKm,
        distanceUnit: unit === 'us' ? 'miles' : 'km',
        hours: formData.hours,
        minutes: formData.minutes,
        seconds: formData.seconds,
        unit,
      };

      const result = await calculatePace(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getPaceColor = (speedKmh) => {
    if (!speedKmh) return '#6b7280';
    const speed = parseFloat(speedKmh);
    
    if (speed >= 15) return '#ef4444'; // Elite runner
    if (speed >= 12) return '#f59e0b'; // Advanced
    if (speed >= 10) return '#10b981'; // Intermediate
    if (speed >= 8) return '#3b82f6'; // Beginner
    return '#6b7280'; // Walking
  };

  const getSpeedLabel = (speedKmh) => {
    if (!speedKmh) return 'Unknown';
    const speed = parseFloat(speedKmh);
    
    if (speed >= 15) return 'Elite Runner';
    if (speed >= 12) return 'Advanced';
    if (speed >= 10) return 'Intermediate';
    if (speed >= 8) return 'Beginner Runner';
    if (speed >= 5) return 'Jogger';
    return 'Walker';
  };

  return (
    <CalculatorLayout
      title="Pace Calculator"
      description="Calculate your running or walking pace, convert between pace per mile/km, and determine your speed. Perfect for runners, joggers, and walkers tracking their performance."
      breadcrumbPath="pace calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
      >
        <FormGroup label="Distance">
          {unit === 'us' ? (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Input
                value={formData.distance}
                onChange={(e) => handleInputChange('distance', parseFloat(e.target.value))}
                min="0.1"
                max="200"
                step="0.1"
                unit="miles"
              />
              <Select
                value={formData.distanceUnit}
                onChange={(e) => handleInputChange('distanceUnit', e.target.value)}
                style={{ width: '120px' }}
              >
                <option value="miles">Miles</option>
                <option value="km">Kilometers</option>
              </Select>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Input
                value={formData.distanceKm}
                onChange={(e) => handleInputChange('distanceKm', parseFloat(e.target.value))}
                min="0.1"
                max="200"
                step="0.1"
                unit="km"
              />
              <Select
                value={formData.distanceUnit}
                onChange={(e) => handleInputChange('distanceUnit', e.target.value)}
                style={{ width: '120px' }}
              >
                <option value="km">Kilometers</option>
                <option value="miles">Miles</option>
              </Select>
            </div>
          )}
        </FormGroup>

        <FormGroup label="Time (Hours)">
          <Input
            value={formData.hours}
            onChange={(e) => handleInputChange('hours', parseInt(e.target.value))}
            min="0"
            max="24"
            unit="hr"
          />
        </FormGroup>

        <FormGroup label="Time (Minutes)">
          <Input
            value={formData.minutes}
            onChange={(e) => handleInputChange('minutes', parseInt(e.target.value))}
            min="0"
            max="59"
            unit="min"
          />
        </FormGroup>

        <FormGroup label="Time (Seconds)">
          <Input
            value={formData.seconds}
            onChange={(e) => handleInputChange('seconds', parseInt(e.target.value))}
            min="0"
            max="59"
            unit="sec"
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
          <ResultsContainer title="Your Pace & Speed" downloadable>
            {/* Main Speed Card */}
            <div style={{
              background: `linear-gradient(135deg, ${getPaceColor(results.speedKmh)} 0%, ${getPaceColor(results.speedKmh)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Average Speed
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.speedKmh ? parseFloat(results.speedKmh).toFixed(2) : 'N/A'}
              </div>
              <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '1rem' }}>
                km/h
              </p>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {getSpeedLabel(results.speedKmh)}
              </div>
            </div>

            {/* Pace & Speed Breakdown */}
            <ResultsGrid columns={2}>
              <ResultCard
                title="Pace per Mile"
                value={results.pacePerMile || 'N/A'}
                percentage="min/mile"
                subtitle="Time per mile"
                color="#ef4444"
              />
              <ResultCard
                title="Pace per Kilometer"
                value={results.pacePerKm || 'N/A'}
                percentage="min/km"
                subtitle="Time per kilometer"
                color="#f59e0b"
              />
              <ResultCard
                title="Speed (mph)"
                value={results.speedMph ? parseFloat(results.speedMph).toFixed(2) : '0'}
                percentage="miles per hour"
                subtitle="Imperial speed"
                color="#3b82f6"
              />
              <ResultCard
                title="Speed (km/h)"
                value={results.speedKmh ? parseFloat(results.speedKmh).toFixed(2) : '0'}
                percentage="kilometers per hour"
                subtitle="Metric speed"
                color="#10b981"
              />
            </ResultsGrid>

            {/* Common Race Distances */}
            {results.raceTimes && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  Projected Race Times at This Pace
                </h3>
                
                <ResultsGrid columns={3}>
                  {Object.entries(results.raceTimes).map(([race, time]) => (
                    <ResultCard
                      key={race}
                      title={race.replace('_', ' ').toUpperCase()}
                      value={time}
                      percentage=""
                      subtitle={
                        race === '5k' ? '3.1 miles' :
                        race === '10k' ? '6.2 miles' :
                        race === 'half_marathon' ? '13.1 miles' :
                        race === 'marathon' ? '26.2 miles' :
                        ''
                      }
                      color="#8b5cf6"
                    />
                  ))}
                </ResultsGrid>
              </div>
            )}

            {/* Pace Comparison Table */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Pace Standards by Level
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
                        Level
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Pace (min/mile)
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Pace (min/km)
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Speed (km/h)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#6b7280', marginRight: '0.5rem' }}></span>
                        Walking
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>15:00+</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>9:20+</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>&lt; 6.4 km/h</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#3b82f6', marginRight: '0.5rem' }}></span>
                        Beginner Runner
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>10:00 - 12:00</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>6:13 - 7:28</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>8-9.6 km/h</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#10b981', marginRight: '0.5rem' }}></span>
                        Intermediate
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>8:00 - 10:00</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>5:00 - 6:13</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>9.6-12 km/h</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b', marginRight: '0.5rem' }}></span>
                        Advanced
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>6:30 - 8:00</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>4:02 - 5:00</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>12-15 km/h</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#ef4444', marginRight: '0.5rem' }}></span>
                        Elite
                      </td>
                      <td style={{ padding: '1rem' }}>&lt; 6:30</td>
                      <td style={{ padding: '1rem' }}>&lt; 4:02</td>
                      <td style={{ padding: '1rem' }}>&gt; 15 km/h</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Training Tips */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                🏃 Improve Your Pace
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Interval Training:</strong> Alternate fast and slow segments to build speed
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Tempo Runs:</strong> Sustained efforts at challenging but controlled pace
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Strength Training:</strong> Build leg strength for more powerful strides
                </li>
                <li>
                  <strong>Consistency:</strong> Regular running improves efficiency and speed over time
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
              📊 Understanding Pace
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Pace vs Speed:</strong> Pace is time per distance (e.g., 8:00 per mile), while speed is distance per time (e.g., 7.5 mph).
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Conversion:</strong> To convert pace to speed: Speed (mph) = 60 / Pace (min/mile). Faster pace = lower time.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Race Strategy:</strong> Most runners should aim for negative splits (second half faster than first) for optimal performance.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default PaceCalculatorPage;
