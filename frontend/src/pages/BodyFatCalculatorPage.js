import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, BodyFatChart } from '../components/ResultsContainer';
import { calculateBodyFat } from '../utils/apiService';

function BodyFatCalculatorPage() {
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
            age: formData.age,
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
            age: formData.age,
            gender: formData.gender,
            height: formData.heightCm,
            weight: formData.weight,
            neck: formData.neck,
            waist: formData.waist,
            hip: formData.hip,
            unit: 'metric',
          };

      const result = await calculateBodyFat(data);
      setResults(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getColorForBodyFat = (bodyFat, gender) => {
    if (gender === 'male') {
      if (bodyFat < 6) return '#ef4444';
      if (bodyFat < 14) return '#3b82f6';
      if (bodyFat < 18) return '#10b981';
      if (bodyFat < 25) return '#f59e0b';
      return '#ef4444';
    } else {
      if (bodyFat < 14) return '#ef4444';
      if (bodyFat < 21) return '#3b82f6';
      if (bodyFat < 25) return '#10b981';
      if (bodyFat < 32) return '#f59e0b';
      return '#ef4444';
    }
  };

  return (
    <CalculatorLayout
      title="Body Fat Calculator"
      description="Calculate your body fat percentage using the U.S. Navy Method, which uses height, neck, waist, and hip measurements to estimate body composition."
      breadcrumbPath="body fat calculator"
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
            min="1"
            max="120"
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

        <FormGroup label="Waist Circumference">
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
          <ResultsContainer title="Your Body Composition" downloadable>
            {/* Main Body Fat Result */}
            <div style={{
              background: `linear-gradient(135deg, ${getColorForBodyFat(results.bodyFatPercentage, formData.gender)} 0%, ${getColorForBodyFat(results.bodyFatPercentage, formData.gender)}dd 100%)`,
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', opacity: 0.9 }}>
                Your Body Fat Percentage
              </h2>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {results.bodyFatPercentage ? results.bodyFatPercentage.toFixed(1) : 'N/A'}%
              </div>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', opacity: 0.95 }}>
                {results.category || 'N/A'}
              </p>
              <p style={{ 
                fontSize: '0.875rem', 
                marginTop: '1rem', 
                padding: '0.75rem', 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '6px' 
              }}>
                💡 Calculated using the U.S. Navy Method
              </p>
            </div>

            {/* Body Composition Breakdown */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Body Composition Breakdown
            </h3>
            
            <ResultsGrid columns={3}>
              <ResultCard
                title="Fat Mass"
                value={results.fatMass ? `${results.fatMass.toFixed(1)} ${unit === 'us' ? 'lb' : 'kg'}` : 'N/A'}
                percentage={results.bodyFatPercentage ? `${results.bodyFatPercentage.toFixed(1)}%` : 'N/A'}
                subtitle="Body fat weight"
                color="#ef4444"
              />
              <ResultCard
                title="Lean Mass"
                value={results.leanMass ? `${results.leanMass.toFixed(1)} ${unit === 'us' ? 'lb' : 'kg'}` : 'N/A'}
                percentage={results.leanMassPercentage ? `${results.leanMassPercentage.toFixed(1)}%` : 'N/A'}
                subtitle="Muscle, bone, organs"
                color="#10b981"
              />
              <ResultCard
                title="Total Weight"
                value={formData.weight ? `${formData.weight} ${unit === 'us' ? 'lb' : 'kg'}` : 'N/A'}
                percentage="100%"
                subtitle="Current weight"
                color="#3b82f6"
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

            {/* Category Descriptions */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Body Fat Categories for {formData.gender === 'male' ? 'Men' : 'Women'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {formData.gender === 'male' ? (
                  <>
                    <div style={{ padding: '0.75rem', background: '#fee2e2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                      <strong>Essential Fat (2-5%):</strong> Minimum for basic physiological functions
                    </div>
                    <div style={{ padding: '0.75rem', background: '#dbeafe', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                      <strong>Athletes (6-13%):</strong> Typical for elite athletes
                    </div>
                    <div style={{ padding: '0.75rem', background: '#d1fae5', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
                      <strong>Fitness (14-17%):</strong> Fit, defined appearance
                    </div>
                    <div style={{ padding: '0.75rem', background: '#fef3c7', borderRadius: '6px', border: '1px solid #fde68a' }}>
                      <strong>Average (18-24%):</strong> Acceptable fitness level
                    </div>
                    <div style={{ padding: '0.75rem', background: '#fee2e2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                      <strong>Obese (25%+):</strong> Increased health risks
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ padding: '0.75rem', background: '#fee2e2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                      <strong>Essential Fat (10-13%):</strong> Minimum for basic physiological functions
                    </div>
                    <div style={{ padding: '0.75rem', background: '#dbeafe', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                      <strong>Athletes (14-20%):</strong> Typical for elite athletes
                    </div>
                    <div style={{ padding: '0.75rem', background: '#d1fae5', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
                      <strong>Fitness (21-24%):</strong> Fit, toned appearance
                    </div>
                    <div style={{ padding: '0.75rem', background: '#fef3c7', borderRadius: '6px', border: '1px solid #fde68a' }}>
                      <strong>Average (25-31%):</strong> Acceptable fitness level
                    </div>
                    <div style={{ padding: '0.75rem', background: '#fee2e2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                      <strong>Obese (32%+):</strong> Increased health risks
                    </div>
                  </>
                )}
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
              📏 Measurement Tips
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Neck:</strong> Measure just below the larynx (Adam's apple), perpendicular to the long axis of the neck
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Waist (Men):</strong> Measure horizontally at the level of the navel
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Waist (Women):</strong> Measure at the narrowest point of the torso
              </p>
              <p style={{ margin: 0 }}>
                <strong>Hip (Women only):</strong> Measure at the widest point of the buttocks
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}

export default BodyFatCalculatorPage;
