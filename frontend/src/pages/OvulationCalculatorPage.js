import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateOvulation } from '../utils/apiService';

function OvulationCalculatorPage() {
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

      const result = await calculateOvulation(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <CalculatorLayout
      title="Ovulation Calculator"
      description="Calculate your ovulation date and fertile window. Know the best days to conceive based on your menstrual cycle."
      breadcrumbPath="ovulation calculator"
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
          <ResultsContainer title="Your Ovulation & Fertile Window" downloadable>
            {/* Main Ovulation Card */}
            <div style={{
              background: 'linear-gradient(135deg, #f472b6 0%, #fb7185 100%)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Estimated Ovulation Date
              </h2>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.ovulationDay ? formatDate(results.ovulationDay) : 'N/A'}
              </div>
              {results.daysUntilOvulation !== undefined && (
                <div style={{ fontSize: '1.125rem', opacity: 0.95 }}>
                  {results.daysUntilOvulation > 0 
                    ? `${results.daysUntilOvulation} days until ovulation`
                    : results.daysUntilOvulation === 0
                    ? 'Today is your ovulation day!'
                    : 'Ovulation has passed'}
                </div>
              )}
            </div>

            {/* Fertile Window */}
            {results.fertileStart && results.fertileEnd && (
              <div style={{
                background: '#fce7f3',
                border: '2px solid #f9a8d4',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#be185d', marginBottom: '1rem', textAlign: 'center' }}>
                  Your Fertile Window
                </h3>
                <div style={{ textAlign: 'center', color: '#831843', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {formatDate(results.fertileStart)}
                  </div>
                  <div style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>to</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {formatDate(results.fertileEnd)}
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', textAlign: 'center', color: '#831843', margin: 0 }}>
                  These are your most fertile days for conception
                </p>
              </div>
            )}

            {/* Summary Cards */}
            <ResultsGrid columns={2}>
              <ResultCard
                color="#ec4899"
                title="Ovulation Day"
                value={results.ovulationDay ? formatShortDate(results.ovulationDay) : 'N/A'}
                subtitle="Peak fertility day"
              />
              <ResultCard
                color="#8b5cf6"
                title="Next Period"
                value={results.nextPeriod ? formatShortDate(results.nextPeriod) : 'N/A'}
                subtitle="Expected start date"
              />
            </ResultsGrid>

            {/* Fertile Days Calendar */}
            {results.fertileDays && results.fertileDays.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  7-Day Fertile Window
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {results.fertileDays.map((day, idx) => {
                    const date = new Date(day.date);
                    const isPeak = day.isPeak;
                    const isOvulation = day.isOvulation;
                    
                    return (
                      <div
                        key={idx}
                        style={{
                          background: isOvulation 
                            ? 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
                            : isPeak
                            ? 'linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)'
                            : '#fce7f3',
                          border: isPeak ? '2px solid #ec4899' : '2px solid #f9a8d4',
                          borderRadius: '8px',
                          padding: '1rem',
                          textAlign: 'center',
                          color: isOvulation || isPeak ? 'white' : '#831843'
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', marginBottom: '0.25rem', opacity: 0.9 }}>
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                          {date.getDate()}
                        </div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        {isOvulation && (
                          <div style={{ fontSize: '0.625rem', marginTop: '0.5rem', fontWeight: '600' }}>
                            OVULATION
                          </div>
                        )}
                        {isPeak && !isOvulation && (
                          <div style={{ fontSize: '0.625rem', marginTop: '0.5rem', fontWeight: '600' }}>
                            PEAK
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fertility Tips */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                💡 Tips for Conception
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Have intercourse every 1-2 days during your fertile window
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Peak fertility is 2-3 days before ovulation
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Track cervical mucus - it becomes clear and stretchy during ovulation
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Use ovulation predictor kits (OPKs) for more accuracy
                </li>
                <li>
                  Maintain a healthy lifestyle - reduce stress, eat well, exercise moderately
                </li>
              </ul>
            </div>

            {/* Understanding Ovulation */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Understanding Your Cycle
              </h3>
              <div style={{
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                    What is Ovulation?
                  </h5>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    Ovulation is when a mature egg is released from the ovary and can be fertilized by sperm. It typically occurs about 14 days before your next period.
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Fertile Window
                  </h5>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    Sperm can survive up to 5 days inside the female body. Your fertile window includes the 5 days before ovulation, ovulation day, and 1 day after.
                  </p>
                </div>
                <div>
                  <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Best Time to Conceive
                  </h5>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    The highest chance of conception is during the 2-3 days before ovulation. Conception probability is about 20-30% per cycle for healthy couples.
                  </p>
                </div>
              </div>
            </div>
          </ResultsContainer>

          {/* Info Note */}
          <div style={{
            background: '#fef3c7',
            border: '2px solid #fde047',
            borderRadius: '8px',
            padding: '1.25rem',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
              ℹ️ Note About Accuracy
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: '1.6', margin: 0 }}>
              This calculator provides an estimate based on average cycle patterns. Ovulation timing can vary. For more precise tracking, consider using ovulation test strips, basal body temperature monitoring, or consulting your healthcare provider.
            </p>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default OvulationCalculatorPage;
