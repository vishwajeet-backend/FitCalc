import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculatePregnancyDueDate } from '../utils/apiService';

function DueDateCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    lastPeriod: '',
    cycleLength: 28,
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
      };

      const result = await calculatePregnancyDueDate(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <CalculatorLayout
      title="Due Date Calculator"
      description="Calculate your pregnancy due date using your last menstrual period (LMP). Track your pregnancy week by week and see important milestone dates."
      breadcrumbPath="due date calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
        showUnitToggle={false}
      >
        <FormGroup label="Last Menstrual Period (LMP)">
          <Input
            type="date"
            value={formData.lastPeriod}
            onChange={(e) => handleInputChange('lastPeriod', e.target.value)}
            style={{ width: '100%' }}
          />
        </FormGroup>

        <FormGroup label="Cycle Length">
          <Input
            value={formData.cycleLength}
            onChange={(e) => handleInputChange('cycleLength', parseInt(e.target.value))}
            min="21"
            max="35"
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
          <ResultsContainer title="Your Due Date" downloadable>
            {/* Main Due Date Card */}
            <div style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Estimated Due Date
              </h2>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.dueDate ? formatDate(results.dueDate) : 'N/A'}
              </div>
              {results.currentWeek && (
                <div style={{ fontSize: '1.25rem', marginBottom: '1rem', opacity: 0.95 }}>
                  You are {results.currentWeek.weeks} weeks and {results.currentWeek.days} days pregnant
                </div>
              )}
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {results.daysRemaining} days remaining
              </div>
            </div>

            {/* Current Trimester */}
            {results.trimester && (
              <div style={{
                background: '#fce7f3',
                border: '2px solid #f9a8d4',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#be185d', marginBottom: '0.5rem' }}>
                  Current Trimester: {results.trimester}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#831843', margin: 0 }}>
                  {results.trimester === 'First' && 'Weeks 1-13: Your baby\'s organs are forming'}
                  {results.trimester === 'Second' && 'Weeks 14-27: Your baby is growing and moving'}
                  {results.trimester === 'Third' && 'Weeks 28-40: Final preparations for birth'}
                </p>
              </div>
            )}

            {/* Key Dates */}
            {results.conceptionDate && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  Important Dates
                </h3>
                <ResultsGrid columns={2}>
                  <ResultCard
                    color="#ec4899"
                    title="Estimated Conception"
                    value={formatDate(results.conceptionDate)}
                    subtitle="Approximate date of conception"
                  />
                  <ResultCard
                    color="#8b5cf6"
                    title="Due Date"
                    value={formatDate(results.dueDate)}
                    subtitle="Estimated delivery date (40 weeks)"
                  />
                  {results.firstTrimesterEnd && (
                    <ResultCard
                      color="#a78bfa"
                      title="First Trimester Ends"
                      value={formatDate(results.firstTrimesterEnd)}
                      subtitle="Week 13 - end of first trimester"
                    />
                  )}
                  {results.secondTrimesterEnd && (
                    <ResultCard
                      color="#f472b6"
                      title="Second Trimester Ends"
                      value={formatDate(results.secondTrimesterEnd)}
                      subtitle="Week 27 - entering third trimester"
                    />
                  )}
                </ResultsGrid>
              </div>
            )}

            {/* Pregnancy Timeline */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Pregnancy Timeline
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
                        Trimester
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Weeks
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Key Developments
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#ec4899', marginRight: '0.5rem' }}></span>
                        <strong>First</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        1-13
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Organs form, heart beats, limbs develop. Morning sickness common.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#8b5cf6', marginRight: '0.5rem' }}></span>
                        <strong>Second</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        14-27
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Baby moves, gender visible, hearing develops. Energy returns.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#a78bfa', marginRight: '0.5rem' }}></span>
                        <strong>Third</strong>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        28-40
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Rapid weight gain, lungs mature, baby positions for birth.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Prenatal Checkup Schedule */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                📅 Typical Prenatal Visit Schedule
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Weeks 4-28:</strong> Every 4 weeks
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Weeks 28-36:</strong> Every 2-3 weeks
                </li>
                <li>
                  <strong>Weeks 36-40:</strong> Weekly until delivery
                </li>
              </ul>
            </div>
          </ResultsContainer>

          {/* Info section */}
          <div style={{
            background: '#fef3c7',
            border: '2px solid #fde047',
            borderRadius: '8px',
            padding: '1.25rem',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e', marginBottom: '0.75rem' }}>
              ℹ️ About Due Date Calculation
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Naegele's Rule:</strong> This calculator uses the standard method of adding 280 days (40 weeks) to your last menstrual period.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Accuracy:</strong> Only about 5% of babies arrive exactly on their due date. Most are born within 2 weeks before or after.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Ultrasound Dating:</strong> Your healthcare provider may adjust your due date based on early ultrasound measurements, which can be more accurate.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default DueDateCalculatorPage;
