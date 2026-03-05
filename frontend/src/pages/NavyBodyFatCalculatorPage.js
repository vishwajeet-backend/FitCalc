import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, BodyFatChart } from '../components/ResultsContainer';
import { calculateNavyBodyFat } from '../utils/apiService';

function NavyBodyFatCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    gender: 'male',
    heightFeet: 5,
    heightInches: 10,
    heightCm: 178,
    weight: 180,
    neck: 15,
    waist: 33,
    hip: 38,
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
            gender: formData.gender,
            heightFeet: formData.heightFeet,
            heightInches: formData.heightInches,
            weight: formData.weight,
            neck: formData.neck,
            waist: formData.waist,
            hip: formData.hip,
            unit: 'us',
          }
        : {
            gender: formData.gender,
            height: formData.heightCm,
            weight: formData.weight,
            neck: formData.neck,
            waist: formData.waist,
            hip: formData.hip,
            unit: 'metric',
          };

      const result = await calculateNavyBodyFat(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'pass') return '#10b981';
    if (status === 'warning') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <CalculatorLayout
      title="Navy Body Fat Calculator"
      description="Calculate your body fat percentage using the official U.S. Navy Method. Check if you meet Navy body composition standards for physical readiness."
      breadcrumbPath="navy body fat calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
      >
        <FormGroup label="Gender">
          <RadioGroup
            value={formData.gender}
            onChange={(val) => handleInputChange('gender', val)}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />
        </FormGroup>

        <FormGroup label="Height">
          {unit === 'us' ? (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Input
                value={formData.heightFeet}
                onChange={(e) => handleInputChange('heightFeet', parseInt(e.target.value))}
                min="1"
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
              min="50"
              max="250"
              unit="cm"
            />
          )}
        </FormGroup>

        <FormGroup label="Weight">
          <Input
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
            min="1"
            unit={unit === 'us' ? 'lb' : 'kg'}
          />
        </FormGroup>

        <FormGroup label="Neck Circumference">
          <Input
            value={formData.neck}
            onChange={(e) => handleInputChange('neck', parseFloat(e.target.value))}
            min="1"
            unit={unit === 'us' ? 'in' : 'cm'}
          />
        </FormGroup>

        <FormGroup label="Waist Circumference (at navel)">
          <Input
            value={formData.waist}
            onChange={(e) => handleInputChange('waist', parseFloat(e.target.value))}
            min="1"
            unit={unit === 'us' ? 'in' : 'cm'}
          />
        </FormGroup>

        {formData.gender === 'female' && (
          <FormGroup label="Hip Circumference">
            <Input
              value={formData.hip}
              onChange={(e) => handleInputChange('hip', parseFloat(e.target.value))}
              min="1"
              unit={unit === 'us' ? 'in' : 'cm'}
            />
          </FormGroup>
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
          <ResultsContainer title="Navy Body Fat Results" downloadable>
            {/* Navy Standards Status */}
            {results.navyStandard && (
              <div style={{
                background: `linear-gradient(135deg, ${getStatusColor(results.status)} 0%, ${getStatusColor(results.status)}dd 100%)`,
                borderRadius: '12px',
                padding: '2rem',
                marginBottom: '2rem',
                textAlign: 'center',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {results.navyStandard}
                </h2>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {results.bodyFatPercentage ? results.bodyFatPercentage.toFixed(1) : 'N/A'}%
                </div>
                <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                  Body Fat Percentage
                </p>
                <p style={{ 
                  fontSize: '0.875rem', 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  background: 'rgba(255,255,255,0.2)', 
                  borderRadius: '6px' 
                }}>
                  {formData.gender === 'male' 
                    ? '⚓ Navy Standard: Maximum 22% body fat for males'
                    : '⚓ Navy Standard: Maximum 33% body fat for females'}
                </p>
              </div>
            )}

            {/* Body Composition */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Body Composition
            </h3>
            
            <ResultsGrid columns={3}>
              <ResultCard
                title="Body Fat"
                value={results.bodyFatPercentage ? `${results.bodyFatPercentage.toFixed(1)}%` : 'N/A'}
                percentage={results.category || ''}
                subtitle="Body fat percentage"
                color="#ef4444"
              />
              <ResultCard
                title="Fat Mass"
                value={results.fatMass ? `${results.fatMass.toFixed(1)} ${unit === 'us' ? 'lb' : 'kg'}` : 'N/A'}
                percentage=""
                subtitle="Weight from fat"
                color="#f59e0b"
              />
              <ResultCard
                title="Lean Mass"
                value={results.leanMass ? `${results.leanMass.toFixed(1)} ${unit === 'us' ? 'lb' : 'kg'}` : 'N/A'}
                percentage=""
                subtitle="Muscle, bone, organs"
                color="#10b981"
              />
            </ResultsGrid>

            {/* Body Fat Chart */}
            {results.bodyFatPercentage && (
              <div style={{ marginTop: '2rem' }}>
                <BodyFatChart
                  bodyFatPercentage={results.bodyFatPercentage}
                  gender={formData.gender}
                />
              </div>
            )}

            {/* Navy Standards Table */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                U.S. Navy Body Composition Standards
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
                        Gender
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Maximum Allowed
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Your Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>Male</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>22%</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        {formData.gender === 'male' && results.bodyFatPercentage 
                          ? `${results.bodyFatPercentage.toFixed(1)}%`
                          : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>Female</td>
                      <td style={{ padding: '1rem' }}>33%</td>
                      <td style={{ padding: '1rem' }}>
                        {formData.gender === 'female' && results.bodyFatPercentage 
                          ? `${results.bodyFatPercentage.toFixed(1)}%`
                          : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
              ⚓ About the Navy Method
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                The U.S. Navy Method uses circumference measurements to estimate body fat percentage. This method is part of the Navy's Physical Readiness Program.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Measurement Tips:</strong>
              </p>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                <li>Measure neck just below the larynx, perpendicular to neck axis</li>
                <li>Measure waist horizontally at navel level (don't hold stomach in)</li>
                <li>For women: measure hip at widest point of buttocks</li>
              </ul>
              <p style={{ margin: 0 }}>
                Standards apply to active duty Navy personnel. Consult official Navy guidance for complete requirements.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default NavyBodyFatCalculatorPage;
