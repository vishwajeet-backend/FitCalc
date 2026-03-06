import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup, HeightInput } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, BodyFatChart } from '../components/ResultsContainer';
import { calculateArmyBodyFat } from '../utils/apiService';

function ArmyBodyFatCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    age: 25,
    gender: 'male',
    heightFeet: 5,
    heightInches: 10,
    heightCm: 178,
    weight: 180,
    weightKg: 82,
    neck: 15,
    neckCm: 38,
    waist: 32,
    waistCm: 81,
    hip: 38,
    hipCm: 97,
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
            age: formData.age,
            gender: formData.gender,
            height: (formData.heightFeet * 12) + formData.heightInches,
            weight: formData.weight,
            neck: formData.neck,
            waist: formData.waist,
            hip: formData.hip,
            unit: 'us',
          }
        : {
            age: formData.age,
            gender: formData.gender,
            height: formData.heightCm,
            weight: formData.weightKg,
            neck: formData.neckCm,
            waist: formData.waistCm,
            hip: formData.hipCm,
            unit: 'metric',
          };

      const result = await calculateArmyBodyFat(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getArmyStatus = (bodyFat, gender, age) => {
    if (!bodyFat) return { status: 'Unknown', color: '#6b7280' };
    
    // Army body fat standards vary by age and gender
    let maxAllowed;
    if (gender === 'male') {
      if (age <= 20) maxAllowed = 20;
      else if (age <= 27) maxAllowed = 22;
      else if (age <= 39) maxAllowed = 24;
      else maxAllowed = 26;
    } else {
      if (age <= 20) maxAllowed = 30;
      else if (age <= 27) maxAllowed = 32;
      else if (age <= 39) maxAllowed = 34;
      else maxAllowed = 36;
    }
    
    if (bodyFat <= maxAllowed - 5) {
      return { status: 'Excellent', color: '#10b981', message: `Well below Army standard (${maxAllowed}%)` };
    } else if (bodyFat <= maxAllowed - 2) {
      return { status: 'Pass', color: '#3b82f6', message: `Within Army standard (${maxAllowed}%)` };
    } else if (bodyFat <= maxAllowed) {
      return { status: 'Pass (Near Limit)', color: '#f59e0b', message: `Close to Army standard (${maxAllowed}%)` };
    } else {
      return { status: 'Fail', color: '#ef4444', message: `Exceeds Army standard (${maxAllowed}%)` };
    }
  };

  const armyStatus = results ? getArmyStatus(results.bodyFat, formData.gender, formData.age) : null;

  return (
    <CalculatorLayout
      title="Army Body Fat Calculator"
      description="Calculate body fat percentage using the U.S. Army formula and check compliance with Army Physical Fitness Test (APFT) standards. Age and gender-specific requirements included."
      breadcrumbPath="army body fat calculator"
    >
      <CalculatorForm
        unit={unit}
        onUnitChange={setUnit}
        onSubmit={handleSubmit}
        isCalculating={isCalculating}
      >
        <FormGroup label="Age">
          <Input
            value={formData.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
            min="17"
            max="65"
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

        <FormGroup label="Height">
          {unit === 'us' ? (
            <HeightInput
              feet={formData.heightFeet}
              inches={formData.heightInches}
              onFeetChange={(val) => handleInputChange('heightFeet', val)}
              onInchesChange={(val) => handleInputChange('heightInches', val)}
            />
          ) : (
            <Input
              value={formData.heightCm}
              onChange={(e) => handleInputChange('heightCm', parseInt(e.target.value))}
              min="120"
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
              min="80"
              max="400"
              step="0.1"
              unit="lbs"
            />
          ) : (
            <Input
              value={formData.weightKg}
              onChange={(e) => handleInputChange('weightKg', parseFloat(e.target.value))}
              min="40"
              max="200"
              step="0.1"
              unit="kg"
            />
          )}
        </FormGroup>

        <FormGroup label="Neck Circumference">
          {unit === 'us' ? (
            <Input
              value={formData.neck}
              onChange={(e) => handleInputChange('neck', parseFloat(e.target.value))}
              min="10"
              max="30"
              step="0.1"
              unit="in"
            />
          ) : (
            <Input
              value={formData.neckCm}
              onChange={(e) => handleInputChange('neckCm', parseFloat(e.target.value))}
              min="25"
              max="75"
              step="0.1"
              unit="cm"
            />
          )}
        </FormGroup>

        <FormGroup label="Waist Circumference">
          {unit === 'us' ? (
            <Input
              value={formData.waist}
              onChange={(e) => handleInputChange('waist', parseFloat(e.target.value))}
              min="20"
              max="60"
              step="0.1"
              unit="in"
            />
          ) : (
            <Input
              value={formData.waistCm}
              onChange={(e) => handleInputChange('waistCm', parseFloat(e.target.value))}
              min="50"
              max="150"
              step="0.1"
              unit="cm"
            />
          )}
        </FormGroup>

        {formData.gender === 'female' && (
          <FormGroup label="Hip Circumference">
            {unit === 'us' ? (
              <Input
                value={formData.hip}
                onChange={(e) => handleInputChange('hip', parseFloat(e.target.value))}
                min="20"
                max="60"
                step="0.1"
                unit="in"
              />
            ) : (
              <Input
                value={formData.hipCm}
                onChange={(e) => handleInputChange('hipCm', parseFloat(e.target.value))}
                min="50"
                max="150"
                step="0.1"
                unit="cm"
              />
            )}
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

      {results && armyStatus && (
        <>
          <ResultsContainer title="Your Army Body Fat Results" downloadable>
            {/* Army Standards Status */}
            <div style={{
              background: `linear-gradient(135deg, ${armyStatus.color} 0%, ${armyStatus.color}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Army Standards
              </h2>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {armyStatus.status}
              </div>
              <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                {armyStatus.message}
              </p>
            </div>

            {/* Body Fat Percentage */}
            <div style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Your Body Fat Percentage
              </div>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', color: armyStatus.color }}>
                {results.bodyFat ? results.bodyFat.toFixed(1) : 'N/A'}%
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                Calculated using Army formula
              </div>
            </div>

            {/* Body Composition Breakdown */}
            <ResultsGrid columns={3}>
              <ResultCard
                title="Body Fat %"
                value={`${results.bodyFat ? results.bodyFat.toFixed(1) : 0}%`}
                percentage=""
                subtitle="Percentage of body fat"
                color={armyStatus.color}
              />
              <ResultCard
                title="Fat Mass"
                value={`${results.fatMass ? results.fatMass.toFixed(1) : 0} ${unit === 'us' ? 'lbs' : 'kg'}`}
                percentage=""
                subtitle="Weight of body fat"
                color="#f59e0b"
              />
              <ResultCard
                title="Lean Mass"
                value={`${results.leanMass ? results.leanMass.toFixed(1) : 0} ${unit === 'us' ? 'lbs' : 'kg'}`}
                percentage=""
                subtitle="Muscle, organs, bone"
                color="#10b981"
              />
            </ResultsGrid>

            {/* Body Fat Chart */}
            {results.bodyFat && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  Body Fat Visualization
                </h3>
                <BodyFatChart bodyFat={results.bodyFat} gender={formData.gender} />
              </div>
            )}

            {/* Army Standards Table */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Army Body Fat Standards by Age
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
                        Age Group
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Male Max %
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>
                        Female Max %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={formData.age <= 20 ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>17-20 years</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>20%</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>30%</td>
                    </tr>
                    <tr style={formData.age >= 21 && formData.age <= 27 ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>21-27 years</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>22%</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>32%</td>
                    </tr>
                    <tr style={formData.age >= 28 && formData.age <= 39 ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>28-39 years</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>24%</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>34%</td>
                    </tr>
                    <tr style={formData.age >= 40 ? { background: '#f9fafb' } : {}}>
                      <td style={{ padding: '1rem' }}>40+ years</td>
                      <td style={{ padding: '1rem' }}>26%</td>
                      <td style={{ padding: '1rem' }}>36%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Measurement Protocol */}
            <div style={{
              background: '#eff6ff',
              border: '2px solid #dbeafe',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.75rem' }}>
                📏 Army Measurement Protocol
              </h4>
              <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '0.75rem' }}><strong>Height:</strong> Measure without shoes</p>
                <p style={{ marginBottom: '0.75rem' }}><strong>Neck:</strong> Measure at smallest circumference, just below larynx (Adam's apple)</p>
                <p style={{ marginBottom: '0.75rem' }}><strong>Waist (Male):</strong> Measure at navel level, horizontal to floor</p>
                <p style={{ marginBottom: '0.75rem' }}><strong>Waist (Female):</strong> Measure at smallest circumference, typically at or just above navel</p>
                <p style={{ margin: 0 }}><strong>Hip (Female only):</strong> Measure at largest circumference of buttocks</p>
              </div>
            </div>
          </ResultsContainer>

          {/* Info section */}
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '1.25rem',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.75rem' }}>
              ℹ️ About Army Body Fat Standards
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#15803d', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Army Formula:</strong> The U.S. Army uses circumference-based measurements developed by the Department of Defense. This method is used for APFT (Army Physical Fitness Test) body composition assessment.
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Standards:</strong> Army body fat standards vary by age and gender, with allowances increasing slightly with age to account for physiological changes.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Consequences:</strong> Exceeding body fat standards may result in enrollment in the Army Body Composition Program (ABCP) and can affect promotions and reenlistment.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default ArmyBodyFatCalculatorPage;
