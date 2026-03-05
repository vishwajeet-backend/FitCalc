import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateConception } from '../utils/apiService';

function ConceptionCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [calculationMode, setCalculationMode] = useState('fromDueDate');
  const [formData, setFormData] = useState({
    dueDate: '',
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
      const data = calculationMode === 'fromDueDate'
        ? { dueDate: formData.dueDate, method: 'dueDate' }
        : { lastPeriod: formData.lastPeriod, cycleLength: formData.cycleLength, method: 'lmp' };

      const result = await calculateConception(data);
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
      title="Conception Calculator"
      description="Calculate your estimated conception date based on your due date or last menstrual period. Find out when you likely conceived."
      breadcrumbPath="conception calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
        showUnitToggle={false}
      >
        <FormGroup label="Calculate From">
          <RadioGroup
            value={calculationMode}
            onChange={setCalculationMode}
            options={[
              { value: 'fromDueDate', label: 'Due Date' },
              { value: 'fromLastPeriod', label: 'Last Period' },
            ]}
          />
        </FormGroup>

        {calculationMode === 'fromDueDate' ? (
          <FormGroup label="Due Date">
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              style={{ width: '100%' }}
            />
          </FormGroup>
        ) : (
          <>
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
          </>
        )}
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
          <ResultsContainer title="Conception Date Results" downloadable>
            {/* Main Conception Card */}
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Estimated Conception Date
              </h2>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {results.conceptionDate ? formatDate(results.conceptionDate) : 'N/A'}
              </div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                This is your most likely conception date
              </div>
            </div>

            {/* Conception Window */}
            {results.conceptionStart && results.conceptionEnd && (
              <div style={{
                background: '#fce7f3',
                border: '2px solid #f9a8d4',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#be185d', marginBottom: '1rem', textAlign: 'center' }}>
                  Possible Conception Window
                </h3>
                <div style={{ textAlign: 'center', color: '#831843', marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {formatDate(results.conceptionStart)}
                  </div>
                  <div style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>to</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {formatDate(results.conceptionEnd)}
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', textAlign: 'center', color: '#831843', margin: 0 }}>
                  Conception could have occurred anytime in this 7-day window
                </p>
              </div>
            )}

            {/* Key Dates */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Important Dates
              </h3>
              <ResultsGrid columns={2}>
                {results.lmp && (
                  <ResultCard
                    color="#8b5cf6"
                    title="Last Menstrual Period"
                    value={formatDate(results.lmp)}
                    subtitle="First day of LMP"
                  />
                )}
                <ResultCard
                  color="#ec4899"
                  title="Conception Date"
                  value={formatDate(results.conceptionDate)}
                  subtitle="Estimated date of conception"
                />
                {results.dueDate && (
                  <ResultCard
                    color="#a78bfa"
                    title="Due Date"
                    value={formatDate(results.dueDate)}
                    subtitle="Expected delivery date"
                  />
                )}
              </ResultsGrid>
            </div>

            {/* How Conception Works */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Understanding Conception
              </h3>
              <div style={{
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                    What is Conception?
                  </h5>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    Conception occurs when a sperm fertilizes an egg, typically in the fallopian tube. This usually happens within 24 hours after ovulation.
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Timing of Conception
                  </h5>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    Ovulation typically occurs about 14 days before your next period. Since sperm can survive up to 5 days in the female reproductive tract, conception can occur from intercourse 5 days before ovulation through 1 day after.
                  </p>
                </div>
                <div>
                  <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                    From Conception to Pregnancy
                  </h5>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    After fertilization, the embryo travels down the fallopian tube and implants in the uterine wall about 6-10 days later. Pregnancy officially begins at implantation.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Conception & Early Pregnancy Timeline
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
                        Days from LMP
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Event
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>Day 0</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        First day of last menstrual period
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>Day 14</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Ovulation and conception (typically)
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>Day 20-24</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Implantation occurs - embryo attaches to uterus
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>Day 28</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Missed period - pregnancy tests become positive
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <strong>Day 280</strong>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Due date (40 weeks after LMP)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info Tips */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                💡 Good to Know
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Conception date is different from the date of intercourse - sperm can survive up to 5 days
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Medical dating uses LMP, not conception date, to calculate gestational age
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Early ultrasound (6-8 weeks) provides the most accurate dating
                </li>
                <li>
                  Exact conception date is difficult to pinpoint - this is an estimate
                </li>
              </ul>
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
              ℹ️ About This Calculation
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: '1.6', margin: 0 }}>
              This calculator provides an estimate based on average cycle patterns and pregnancy duration. Actual conception dates can vary. For accurate dating and pregnancy care, consult your healthcare provider and consider early ultrasound dating.
            </p>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default ConceptionCalculatorPage;
