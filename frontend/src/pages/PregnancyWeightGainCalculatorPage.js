import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculatePregnancyWeightGain } from '../utils/apiService';

function PregnancyWeightGainCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    heightFeet: 5,
    heightInches: 5,
    heightCm: 165,
    prePregnancyWeight: 140,
    prePregnancyWeightKg: 64,
    currentWeight: 150,
    currentWeightKg: 68,
    weeksPregnant: 20,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);

    try {
      const data = unit === 'us' 
        ? {
            heightFeet: formData.heightFeet,
            heightInches: formData.heightInches,
            prePregnancyWeight: formData.prePregnancyWeight,
            currentWeight: formData.currentWeight,
            weeksPregnant: formData.weeksPregnant,
            unit: 'us',
          }
        : {
            height: formData.heightCm,
            prePregnancyWeight: formData.prePregnancyWeightKg,
            currentWeight: formData.currentWeightKg,
            weeksPregnant: formData.weeksPregnant,
            unit: 'metric',
          };

      const result = await calculatePregnancyWeightGain(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getStatusColor = (status) => {
    if (status?.toLowerCase().includes('within')) return '#10b981';
    if (status?.toLowerCase().includes('below')) return '#f59e0b';
    if (status?.toLowerCase().includes('above')) return '#ef4444';
    return '#8b5cf6';
  };

  return (
    <CalculatorLayout
      title="Pregnancy Weight Gain Calculator"
      description="Track your pregnancy weight gain and compare it to IOM (Institute of Medicine) recommendations based on your pre-pregnancy BMI."
      breadcrumbPath="pregnancy weight gain calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
      >
        <FormGroup label="Height">
          {unit === 'us' ? (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Input
                value={formData.heightFeet}
                onChange={(e) => handleInputChange('heightFeet', parseInt(e.target.value))}
                min="3"
                max="8"
                unit="ft"
              />
              <Input
                value={formData.heightInches}
                onChange={(e) => handleInputChange('heightInches', parseInt(e.target.value))}
                min="0"
                max="11"
                unit="in"
              />
            </div>
          ) : (
            <Input
              value={formData.heightCm}
              onChange={(e) => handleInputChange('heightCm', parseInt(e.target.value))}
              min="100"
              max="250"
              unit="cm"
            />
          )}
        </FormGroup>

        <FormGroup label="Pre-Pregnancy Weight">
          {unit === 'us' ? (
            <Input
              value={formData.prePregnancyWeight}
              onChange={(e) => handleInputChange('prePregnancyWeight', parseFloat(e.target.value))}
              min="80"
              max="400"
              step="0.1"
              unit="lbs"
            />
          ) : (
            <Input
              value={formData.prePregnancyWeightKg}
              onChange={(e) => handleInputChange('prePregnancyWeightKg', parseFloat(e.target.value))}
              min="40"
              max="200"
              step="0.1"
              unit="kg"
            />
          )}
        </FormGroup>

        <FormGroup label="Current Weight">
          {unit === 'us' ? (
            <Input
              value={formData.currentWeight}
              onChange={(e) => handleInputChange('currentWeight', parseFloat(e.target.value))}
              min="80"
              max="400"
              step="0.1"
              unit="lbs"
            />
          ) : (
            <Input
              value={formData.currentWeightKg}
              onChange={(e) => handleInputChange('currentWeightKg', parseFloat(e.target.value))}
              min="40"
              max="200"
              step="0.1"
              unit="kg"
            />
          )}
        </FormGroup>

        <FormGroup label="Weeks Pregnant">
          <Input
            value={formData.weeksPregnant}
            onChange={(e) => handleInputChange('weeksPregnant', parseInt(e.target.value))}
            min="1"
            max="42"
            unit="weeks"
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
          <ResultsContainer title="Pregnancy Weight Gain Results" downloadable>
            {/* Current Status Card */}
            <div style={{
              background: `linear-gradient(135deg, ${getStatusColor(results.status)} 0%, ${getStatusColor(results.status)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Current Weight Gain
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {results.currentGain || 'N/A'}
              </div>
              <div style={{ fontSize: '1.25rem', marginBottom: '1rem', opacity: 0.95 }}>
                {unit === 'us' ? 'pounds' : 'kilograms'} gained at week {formData.weeksPregnant}
              </div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {results.status || 'N/A'}
              </div>
            </div>

            {/* BMI Category */}
            {results.bmiCategory && (
              <div style={{
                background: '#fce7f3',
                border: '2px solid #f9a8d4',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#be185d', fontWeight: '600' }}>
                  Pre-Pregnancy BMI Category: {results.bmiCategory}
                </div>
                {results.bmi && (
                  <div style={{ fontSize: '0.75rem', color: '#831843', marginTop: '0.25rem' }}>
                    BMI: {results.bmi}
                  </div>
                )}
              </div>
            )}

            {/* Weight Gain Summary */}
            <ResultsGrid columns={3}>
              <ResultCard
                color="#ec4899"
                title="Current Gain"
                value={results.currentGain || 'N/A'}
                subtitle={`${unit === 'us' ? 'lbs' : 'kg'} so far`}
              />
              <ResultCard
                color="#8b5cf6"
                title="Expected Gain"
                value={results.expectedGain || 'N/A'}
                subtitle={`${unit === 'us' ? 'lbs' : 'kg'} at this week`}
              />
              <ResultCard
                color="#a78bfa"
                title="Recommended Total"
                value={results.recommendedTotal || 'N/A'}
                subtitle={`${unit === 'us' ? 'lbs' : 'kg'} for full pregnancy`}
              />
            </ResultsGrid>

            {/* Recommended Range */}
            {results.recommendedRange && (
              <div style={{
                background: '#f0fdf4',
                border: '2px solid #bbf7d0',
                borderRadius: '8px',
                padding: '1.5rem',
                marginTop: '2rem'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.5rem', textAlign: 'center' }}>
                  📊 Your Recommended Weight Gain Range
                </h4>
                <div style={{ textAlign: 'center', color: '#15803d', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '0.75rem' }}>
                  {results.recommendedRange}
                </div>
                <p style={{ fontSize: '0.875rem', textAlign: 'center', color: '#15803d', marginTop: '0.5rem', marginBottom: 0 }}>
                  Total recommended gain for your pre-pregnancy BMI
                </p>
              </div>
            )}

            {/* IOM Guidelines by BMI */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                IOM Weight Gain Guidelines
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
                        Pre-Pregnancy BMI
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Category
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Total Gain (lbs)
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        2nd/3rd Trimester (lbs/week)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>&lt; 18.5</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Underweight
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        28-40 lbs
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        1-1.3 lbs
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>18.5-24.9</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Normal Weight
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        25-35 lbs
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        0.8-1 lbs
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>25-29.9</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Overweight
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        15-25 lbs
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        0.5-0.7 lbs
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <strong>≥ 30</strong>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Obese
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        11-20 lbs
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        0.4-0.6 lbs
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Healthy Weight Gain Tips */}
            <div style={{
              background: '#eff6ff',
              border: '2px solid #bfdbfe',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.75rem' }}>
                💪 Healthy Weight Gain Tips
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#1e40af', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Focus on nutrient-dense foods rather than "eating for two"
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Aim for 300-500 extra calories per day in 2nd and 3rd trimesters
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Stay active with pregnancy-safe exercises (walking, swimming, prenatal yoga)
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Eat regular balanced meals with protein, whole grains, fruits, and vegetables
                </li>
                <li>
                  Discuss your weight gain goals with your healthcare provider
                </li>
              </ul>
            </div>

            {/* Where Does the Weight Go? */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Where Does Pregnancy Weight Go?
              </h3>
              <div style={{
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem' }}>
                  For a 30-lb (13.6 kg) weight gain during pregnancy:
                </p>
                <ResultsGrid columns={2}>
                  <div style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    • Baby: <strong>7-8 lbs</strong> (3.2-3.6 kg)
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    • Placenta: <strong>1.5 lbs</strong> (0.7 kg)
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    • Amniotic fluid: <strong>2 lbs</strong> (0.9 kg)
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    • Uterus: <strong>2 lbs</strong> (0.9 kg)
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    • Breasts: <strong>2 lbs</strong> (0.9 kg)
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    • Blood volume: <strong>3-4 lbs</strong> (1.4-1.8 kg)
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    • Maternal stores: <strong>6-8 lbs</strong> (2.7-3.6 kg)
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                    • Other fluids: <strong>3-4 lbs</strong> (1.4-1.8 kg)
                  </div>
                </ResultsGrid>
              </div>
            </div>
          </ResultsContainer>

          {/* Important Note */}
          <div style={{
            background: '#fef3c7',
            border: '2px solid #fde047',
            borderRadius: '8px',
            padding: '1.25rem',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
              ⚕️ Important Medical Advice
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: '1.6', margin: 0 }}>
              These are general guidelines. Your healthcare provider may recommend different weight gain targets based on your individual health, pregnancy complications (like twins), or other factors. Always discuss your weight gain with your doctor or midwife.
            </p>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default PregnancyWeightGainCalculatorPage;
