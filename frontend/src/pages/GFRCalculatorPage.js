import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, Select, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid } from '../components/ResultsContainer';
import { calculateGFR } from '../utils/apiService';

function GFRCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    age: 45,
    gender: 'male',
    creatinine: 1.2,
    creatinineUnit: 'mg/dL',
    race: 'other',
    formula: 'ckd-epi',
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
        age: formData.age,
        gender: formData.gender,
        creatinine: formData.creatinine,
        creatinineUnit: formData.creatinineUnit,
        race: formData.race,
        formula: formData.formula,
      };

      const result = await calculateGFR(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getStageColor = (stage) => {
    if (stage?.includes('G1')) return '#10b981'; // Green - Normal
    if (stage?.includes('G2')) return '#3b82f6'; // Blue - Mild
    if (stage?.includes('G3a')) return '#f59e0b'; // Orange - Moderate
    if (stage?.includes('G3b')) return '#f59e0b'; // Orange - Moderate
    if (stage?.includes('G4')) return '#ef4444'; // Red - Severe
    if (stage?.includes('G5')) return '#991b1b'; // Dark Red - Kidney Failure
    return '#8b5cf6'; // Purple - Default
  };

  return (
    <CalculatorLayout
      title="GFR Calculator"
      description="Calculate your Glomerular Filtration Rate (GFR) to assess kidney function. GFR is the best overall indicator of kidney health and helps detect chronic kidney disease (CKD)."
      breadcrumbPath="gfr calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
        showUnitToggle={false}
      >
        <FormGroup label="Age">
          <Input
            value={formData.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
            min="18"
            max="120"
            unit="years"
          />
        </FormGroup>

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

        <FormGroup label="Serum Creatinine">
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Input
              value={formData.creatinine}
              onChange={(e) => handleInputChange('creatinine', parseFloat(e.target.value))}
              min="0.1"
              max="15"
              step="0.1"
              unit={formData.creatinineUnit}
            />
            <Select
              value={formData.creatinineUnit}
              onChange={(e) => handleInputChange('creatinineUnit', e.target.value)}
              style={{ width: '140px' }}
            >
              <option value="mg/dL">mg/dL</option>
              <option value="umol/L">μmol/L</option>
            </Select>
          </div>
        </FormGroup>

        <FormGroup label="Race/Ethnicity">
          <Select
            value={formData.race}
            onChange={(e) => handleInputChange('race', e.target.value)}
          >
            <option value="other">Other</option>
            <option value="black">Black/African American</option>
          </Select>
        </FormGroup>

        <FormGroup label="Formula">
          <Select
            value={formData.formula}
            onChange={(e) => handleInputChange('formula', e.target.value)}
          >
            <option value="ckd-epi">CKD-EPI (Recommended)</option>
            <option value="mdrd">MDRD (Simplified)</option>
            <option value="cockcroft-gault">Cockcroft-Gault</option>
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
          <ResultsContainer title="GFR Results" downloadable>
            {/* Main GFR Card */}
            <div style={{
              background: `linear-gradient(135deg, ${getStageColor(results.stage)} 0%, ${getStageColor(results.stage)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Estimated Glomerular Filtration Rate
              </h2>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {results.gfr || 'N/A'}
              </div>
              <div style={{ fontSize: '1.25rem', marginBottom: '1rem', opacity: 0.9 }}>
                mL/min/1.73m²
              </div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                {results.stage || 'CKD Stage'}
              </div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                {results.description || ''}
              </div>
            </div>

            {/* Formula Info */}
            {results.formulaName && (
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
                <strong>Formula Used:</strong> {results.formulaName}
              </div>
            )}

            {/* Recommendation */}
            {results.recommendation && (
              <div style={{
                background: '#fffbeb',
                border: '2px solid #fde047',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
                  📋 Recommendation
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: '1.6', margin: 0 }}>
                  {results.recommendation}
                </p>
              </div>
            )}

            {/* CKD Stages Reference */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Chronic Kidney Disease (CKD) Stages
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
                        Stage
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        GFR Range
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Description
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Action Required
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#10b981', marginRight: '0.5rem' }}></span>
                        <strong>G1</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        ≥ 90
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Normal or high
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Monitor regularly, maintain healthy lifestyle
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#3b82f6', marginRight: '0.5rem' }}></span>
                        <strong>G2</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        60-89
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Mildly decreased
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Annual monitoring, control BP and blood sugar
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b', marginRight: '0.5rem' }}></span>
                        <strong>G3a</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        45-59
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Mild to moderately decreased
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Nephrologist evaluation, treat complications
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b', marginRight: '0.5rem' }}></span>
                        <strong>G3b</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        30-44
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Moderately to severely decreased
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Regular nephrology follow-up, manage complications
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#ef4444', marginRight: '0.5rem' }}></span>
                        <strong>G4</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        15-29
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Severely decreased
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem' }}>
                        Prepare for renal replacement therapy
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '2px', background: '#991b1b', marginRight: '0.5rem' }}></span>
                        <strong>G5</strong>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        &lt; 15
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Kidney failure
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        Dialysis or kidney transplant required
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Factors */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Risk Factors for Kidney Disease
              </h3>
              <ResultsGrid columns={3}>
                <div style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Diabetes
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    High blood sugar damages kidney filtering units over time. Control your blood glucose levels.
                  </p>
                </div>

                <div style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Hypertension
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    High blood pressure can damage blood vessels in kidneys. Keep BP below 140/90 mmHg.
                  </p>
                </div>

                <div style={{
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}>
                  <div style={{ color: '#8b5cf6', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Family History
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    CKD often runs in families. Regular screening important if family history exists.
                  </p>
                </div>
              </ResultsGrid>
            </div>

            {/* Kidney Health Tips */}
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
                💚 Protecting Your Kidney Health
              </h4>
              <ul style={{ 
                fontSize: '0.875rem', 
                color: '#15803d', 
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '1.25rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Stay Hydrated:</strong> Drink adequate water daily (8-10 glasses)
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Control Blood Pressure:</strong> Keep BP below 140/90 mmHg (&lt;130/80 if diabetic)
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Manage Blood Sugar:</strong> Maintain HbA1c below 7% if diabetic
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Limit NSAIDs:</strong> Avoid overuse of ibuprofen and similar medications
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Healthy Diet:</strong> Low sodium, limited protein if CKD present
                </li>
                <li>
                  <strong>Regular Checkups:</strong> Annual GFR and creatinine testing if at risk
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
              ⚕️ Important Medical Information
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#dc2626', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Clinical Use:</strong> GFR estimation requires laboratory-measured serum creatinine. This calculator is for healthcare professionals and educational purposes.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>See Your Doctor:</strong> Abnormal results require medical evaluation. Do not use this calculator for self-diagnosis or treatment decisions.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Limitations:</strong> GFR estimates may be less accurate in extreme body sizes, amputees, and certain muscle conditions. Cystatin C-based equations may be more accurate in some cases.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default GFRCalculatorPage;
