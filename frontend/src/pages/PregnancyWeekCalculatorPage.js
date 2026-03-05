import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculatePregnancyWeek } from '../utils/apiService';

function PregnancyWeekCalculatorPage() {
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

      const result = await calculatePregnancyWeek(data);
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
      title="Pregnancy Week Calculator"
      description="Find out exactly how far along you are in your pregnancy. Track your progress week by week with developmental milestones."
      breadcrumbPath="pregnancy week calculator"
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
          <ResultsContainer title="Your Pregnancy Week" downloadable>
            {/* Main Pregnancy Week Card */}
            <div style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                You are currently
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {results.weeks}w {results.days}d
              </div>
              <div style={{ fontSize: '1.25rem', marginBottom: '1rem', opacity: 0.95 }}>
                {results.weeks} weeks and {results.days} days pregnant
              </div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {results.trimester} Trimester
                </div>
                {results.progressPercent && (
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {results.progressPercent}% Complete
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {results.progressPercent && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  background: '#e5e7eb',
                  borderRadius: '12px',
                  height: '24px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    background: 'linear-gradient(90deg, #ec4899 0%, #a78bfa 100%)',
                    height: '100%',
                    width: `${results.progressPercent}%`,
                    transition: 'width 0.5s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '0.5rem'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'white' }}>
                      {results.progressPercent}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Cards */}
            <ResultsGrid columns={3}>
              <ResultCard
                color="#ec4899"
                title="Total Days"
                value={results.totalDays || 0}
                subtitle="Days since LMP"
              />
              <ResultCard
                color="#8b5cf6"
                title="Days Remaining"
                value={results.daysRemaining || 0}
                subtitle="Until due date"
              />
              <ResultCard
                color="#a78bfa"
                title={`Week ${results.trimesterWeek || 0}`}
                value={results.trimester}
                subtitle="Trimester progress"
              />
            </ResultsGrid>

            {/* Milestone */}
            {results.milestone && (
              <div style={{
                background: '#fce7f3',
                border: '2px solid #f9a8d4',
                borderRadius: '8px',
                padding: '1.5rem',
                marginTop: '2rem'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#be185d', marginBottom: '0.5rem' }}>
                  🎯 This Week's Milestone
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#831843', margin: 0 }}>
                  {results.milestone}
                </p>
              </div>
            )}

            {/* Week-by-Week Development */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Key Development Milestones
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
                        Week
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Baby Development
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>4-5</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Embryo implants, heart begins forming, neural tube develops
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>8-9</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        All organs forming, limbs visible, baby size of a raspberry
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>12-13</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Baby can make movements, reflexes developing, vocal cords form
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>16-17</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Baby can hear, gender visible on ultrasound, eyebrows growing
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>20-21</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Halfway mark! Very active, developing sleep patterns, taste buds form
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>24-25</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Lungs developing surfactant, viable with intensive care
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>28-29</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Eyes can open/close, baby dreams, rapid brain development
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>32-33</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Gaining weight rapidly, practicing breathing movements
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>36-37</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Early term - baby ready if born, getting into position
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <strong>40</strong>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Full term! Baby ready for the outside world
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Health Tips */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                💚 Healthy Pregnancy Tips
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Take prenatal vitamins daily (especially folic acid)
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Attend all scheduled prenatal appointments
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Stay hydrated - drink 8-10 glasses of water daily
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Exercise moderately (consult your doctor)
                </li>
                <li>
                  Avoid alcohol, smoking, and raw/undercooked foods
                </li>
              </ul>
            </div>
          </ResultsContainer>

          {/* Due Date Info */}
          {results.dueDate && (
            <div style={{
              background: '#fef3c7',
              border: '2px solid #fde047',
              borderRadius: '8px',
              padding: '1.25rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
                📅 Your Estimated Due Date
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#92400e', margin: 0 }}>
                {formatDate(results.dueDate)}
              </p>
            </div>
          )}
        </>
      )}
    </CalculatorLayout>
  );
}

export default PregnancyWeekCalculatorPage;
