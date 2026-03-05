import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, Select, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateBodySurfaceArea } from '../utils/apiService';

function BodySurfaceAreaCalculatorPage() {
  const [unit, setUnit] = useState('metric');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    heightFeet: 5,
    heightInches: 10,
    heightCm: 178,
    weight: 180,
    weightKg: 82,
    formula: 'mosteller',
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
            weight: formData.weight,
            formula: formData.formula,
            unit: 'us',
          }
        : {
            height: formData.heightCm,
            weight: formData.weightKg,
            formula: formData.formula,
            unit: 'metric',
          };

      const result = await calculateBodySurfaceArea(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getCategoryColor = (category) => {
    if (category?.includes('Average')) return '#10b981';
    if (category?.includes('Above average')) return '#3b82f6';
    if (category?.includes('Below average')) return '#f59e0b';
    return '#8b5cf6';
  };

  return (
    <CalculatorLayout
      title="Body Surface Area Calculator"
      description="Calculate your body surface area (BSA) using scientifically validated medical formulas. BSA is used in medical dosing, burn assessment, and physiological studies."
      breadcrumbPath="body surface area calculator"
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

        <FormGroup label="Weight">
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

        <FormGroup label="Formula">
          <Select
            value={formData.formula}
            onChange={(e) => handleInputChange('formula', e.target.value)}
          >
            <option value="mosteller">Mosteller (Most commonly used)</option>
            <option value="dubois">DuBois (Traditional method)</option>
            <option value="haycock">Haycock (Alternative)</option>
            <option value="gehan">Gehan & George (Pediatrics)</option>
          </Select>
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
          <ResultsContainer title="Body Surface Area Results" downloadable>
            {/* Main BSA Card */}
            <div style={{
              background: `linear-gradient(135deg, ${getCategoryColor(results.category)} 0%, ${getCategoryColor(results.category)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Your Body Surface Area
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {results.bsa || 'N/A'}
              </div>
              <div style={{ fontSize: '1.25rem', marginBottom: '1rem', opacity: 0.9 }}>
                square meters (m²)
              </div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {results.category || 'Average adult BSA'}
              </div>
            </div>

            {/* Formula Info */}
            {results.formulaDescription && (
              <div style={{
                background: '#f0f9ff',
                border: '2px solid #bfdbfe',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '2rem',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: '#1e40af'
              }}>
                <strong>Formula Used:</strong> {results.formulaDescription}
              </div>
            )}

            {/* All Formulas Comparison */}
            {results.allFormulas && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  Formula Comparison
                </h3>
                <ResultsGrid columns={2}>
                  <ResultCard
                    color="#3b82f6"
                    title="Mosteller Formula"
                    value={`${results.allFormulas.mosteller} m²`}
                    subtitle="Most commonly used in clinical settings"
                  />
                  <ResultCard
                    color="#10b981"
                    title="DuBois Formula"
                    value={`${results.allFormulas.dubois} m²`}
                    subtitle="Traditional method, widely validated"
                  />
                  <ResultCard
                    color="#f59e0b"
                    title="Haycock Formula"
                    value={`${results.allFormulas.haycock} m²`}
                    subtitle="Alternative calculation method"
                  />
                  <ResultCard
                    color="#8b5cf6"
                    title="Gehan & George"
                    value={`${results.allFormulas.gehan} m²`}
                    subtitle="Preferred for pediatric patients"
                  />
                </ResultsGrid>
              </div>
            )}

            {/* BSA Categories Reference */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                BSA Categories Reference
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
                        BSA Range (m²)
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Category
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Typical Population
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>&lt; 1.5</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Low BSA
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Pediatric patients, very small adults
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>1.5 - 1.7</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Below Average
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Small-framed adults, shorter individuals
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>1.7 - 2.0</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Average Adult
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Typical adult population
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>2.0 - 2.5</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Above Average
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Larger-framed adults, taller individuals
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <strong>&gt; 2.5</strong>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Very Large
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Very tall or large-framed adults
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Clinical Applications */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                🏥 Clinical Applications of BSA
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Medication Dosing:</strong> Chemotherapy, immunosuppressants, and other critical medications
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Cardiac Index:</strong> Normalizing cardiac output measurements
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Renal Function:</strong> GFR calculations and dialysis dosing
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Burn Assessment:</strong> Calculating extent of burn injuries
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Metabolic Studies:</strong> Energy expenditure and fluid requirements
                </li>
              </ul>
            </div>
          </ResultsContainer>

          {/* Medical Disclaimer */}
          <div style={{
            background: '#fef2f2',
            border: '2px solid #fecaca',
            borderRadius: '8px',
            padding: '1.25rem',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.75rem' }}>
              ⚕️ Medical Disclaimer
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#dc2626', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>For Healthcare Professionals:</strong> BSA calculations are used in clinical settings for medication dosing and medical assessments. Always verify calculations and consult appropriate medical protocols.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Not for Self-Diagnosis:</strong> This calculator is for informational and educational purposes only. Medical decisions should only be made by qualified healthcare providers.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default BodySurfaceAreaCalculatorPage;
