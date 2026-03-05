import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculatePeriod } from '../utils/apiService';

function PeriodCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    lastPeriod: '',
    cycleLength: 28,
    periodLength: 5,
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
        lastPeriod: formData.lastPeriod,
        cycleLength: formData.cycleLength,
        periodLength: formData.periodLength,
      };

      const result = await calculatePeriod(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <CalculatorLayout
      title="Period Calculator"
      description="Track your menstrual cycle and predict your next periods, ovulation, and fertile windows for the next 6 months."
      breadcrumbPath="period calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
        showUnitToggle={false}
      >
        <FormGroup label="Last Period Start Date">
          <Input
            type="date"
            value={formData.lastPeriod}
            onChange={(e) => handleInputChange('lastPeriod', e.target.value)}
            style={{ width: '100%' }}
          />
        </FormGroup>

        <FormGroup label="Average Cycle Length">
          <Input
            value={formData.cycleLength}
            onChange={(e) => handleInputChange('cycleLength', parseInt(e.target.value))}
            min="21"
            max="35"
            unit="days"
          />
        </FormGroup>

        <FormGroup label="Period Duration">
          <Input
            value={formData.periodLength}
            onChange={(e) => handleInputChange('periodLength', parseInt(e.target.value))}
            min="2"
            max="10"
            unit="days"
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
          <ResultsContainer title="Your Period Predictions" downloadable>
            {/* Next Period Card */}
            <div style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Your Next Period
              </h2>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.nextPeriod ? formatDate(results.nextPeriod) : 'N/A'}
              </div>
              {results.daysUntilPeriod !== undefined && (
                <div style={{ fontSize: '1.125rem', opacity: 0.95 }}>
                  {results.daysUntilPeriod > 0 
                    ? `${results.daysUntilPeriod} days until your next period`
                    : 'Your period may be starting soon'}
                </div>
              )}
            </div>

            {/* Next 6 Periods */}
            {results.periods && results.periods.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  Next 6 Menstrual Cycles
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
                          Cycle
                        </th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                          Period Dates
                        </th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                          Ovulation
                        </th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                          Fertile Window
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.periods.map((period, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '1rem', borderBottom: idx < results.periods.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                            <span style={{ 
                              display: 'inline-block', 
                              width: '24px', 
                              height: '24px', 
                              borderRadius: '50%', 
                              background: '#ec4899', 
                              color: 'white', 
                              textAlign: 'center', 
                              lineHeight: '24px', 
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              {period.cycleNumber}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', borderBottom: idx < results.periods.length - 1 ? '1px solid #e5e7eb' : 'none', fontSize: '0.875rem' }}>
                            {formatDate(period.periodStart)} - {formatDate(period.periodEnd)}
                          </td>
                          <td style={{ padding: '1rem', borderBottom: idx < results.periods.length - 1 ? '1px solid #e5e7eb' : 'none', fontSize: '0.875rem' }}>
                            {formatDate(period.ovulation)}
                          </td>
                          <td style={{ padding: '1rem', borderBottom: idx < results.periods.length - 1 ? '1px solid #e5e7eb' : 'none', fontSize: '0.875rem' }}>
                            {formatDate(period.fertileStart)} - {formatDate(period.fertileEnd)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Cycle Length Info */}
            <div style={{
              background: '#fce7f3',
              border: '2px solid #f9a8d4',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#be185d', marginBottom: '0.75rem' }}>
                💫 Your Cycle Information
              </h4>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#831843', 
                lineHeight: '1.6'
              }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Average Cycle Length:</strong> {formData.cycleLength} days
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Period Duration:</strong> {formData.periodLength} days
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Ovulation Day:</strong> Approximately day 14 before next period
                </p>
              </div>
            </div>

            {/* Period Tracking Tips */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                📝 Period Tracking Tips
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Mark the first day of your period on a calendar each month
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Track symptoms like cramps, mood changes, and flow intensity
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Note any irregularities - cycles can vary by a few days
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Use apps or journals to identify patterns over time
                </li>
                <li>
                  Consult a doctor if cycles are consistently irregular or painful
                </li>
              </ul>
            </div>

            {/* Cycle Phase Descriptions */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Understanding Your Menstrual Cycle
              </h3>
              <ResultsGrid columns={2}>
                <div style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ color: '#ec4899', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Menstrual Phase
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                    Days 1-5: Period bleeding occurs as the uterine lining sheds.
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                    Energy may be lower. Stay hydrated and rest as needed.
                  </p>
                </div>

                <div style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ color: '#8b5cf6', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Follicular Phase
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                    Days 6-13: Egg follicles mature. Estrogen rises.
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                    Energy increases. Good time for challenging workouts.
                  </p>
                </div>

                <div style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ color: '#f472b6', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Ovulation Phase
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                    Day 14: Egg released. Peak fertility window.
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                    Highest energy. Best time to conceive if planning pregnancy.
                  </p>
                </div>

                <div style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ color: '#a78bfa', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Luteal Phase
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                    Days 15-28: Progesterone rises. PMS may occur.
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                    May feel bloated or moody. Prioritize self-care.
                  </p>
                </div>
              </ResultsGrid>
            </div>
          </ResultsContainer>

          {/* Disclaimer */}
          <div style={{
            background: '#fef3c7',
            border: '2px solid #fde047',
            borderRadius: '8px',
            padding: '1.25rem',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
              ℹ️ Important Note
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: '1.6', margin: 0 }}>
              Period predictions are estimates based on your average cycle length. Actual dates may vary due to stress, health, hormones, and lifestyle factors. If you experience irregular cycles or concerning symptoms, consult your healthcare provider.
            </p>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default PeriodCalculatorPage;
