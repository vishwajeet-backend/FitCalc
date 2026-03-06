import React, { useState } from 'react';

const BMICalculator = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    age: 25,
    gender: 'male',
    heightFeet: 5,
    heightInches: 11,
    weight: 65,
    activity: 65,
    unit: 'us'
  });

  const handleInputChange = (field, value) => {
    // Handle NaN values by converting to empty string or keeping the raw value
    const parsedValue = typeof value === 'string' ? value : value;
    setFormData(prev => ({
      ...prev,
      [field]: parsedValue
    }));
  };

  const calculateBMI = () => {
    const { heightFeet, heightInches, weight, unit } = formData;
    
    // Parse values for calculation
    const parsedHeightFeet = parseFloat(heightFeet) || 0;
    const parsedHeightInches = parseFloat(heightInches) || 0;
    const parsedWeight = parseFloat(weight) || 0;
    
    let heightInMeters, weightInKg;
    
    if (unit === 'us') {
      // Convert feet/inches to meters
      const totalInches = (parsedHeightFeet * 12) + parsedHeightInches;
      heightInMeters = totalInches * 0.0254;
      // Convert pounds to kg
      weightInKg = parsedWeight * 0.453592;
    } else {
      // Metric units - assuming height is in cm and weight in kg
      heightInMeters = parsedHeightFeet / 100; // Convert cm to meters
      weightInKg = parsedWeight;
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category = '';
    let categoryColor = '';
    
    if (bmi < 18.5) {
      category = 'Under';
      categoryColor = '#ff8c42';
    } else if (bmi < 25) {
      category = 'Normal';
      categoryColor = '#10b981';
    } else if (bmi < 30) {
      category = 'Over';
      categoryColor = '#f59e0b';
    } else {
      category = 'Obese';
      categoryColor = '#ef4444';
    }
    
    const healthyWeightRange = {
      min: 18.5 * (heightInMeters * heightInMeters),
      max: 24.9 * (heightInMeters * heightInMeters)
    };
    
    const bmiPrime = bmi / 25;
    
    const result = {
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      categoryColor,
      healthyBMIRange: '18.5',
      bmiPrime: parseFloat(bmiPrime.toFixed(2)),
      healthyWeightRange: unit === 'us' 
        ? `${Math.round(healthyWeightRange.min * 2.20462)} - ${Math.round(healthyWeightRange.max * 2.20462)} lbs`
        : `${Math.round(healthyWeightRange.min)} - ${Math.round(healthyWeightRange.max)} kg`
    };
    
    onCalculate(result);
  };

  return (
    <div className="bmi-calculator-v2">
      <div className="calculator-header-v2">
        <h2 className="calculator-title-v2">BMI Calculator</h2>
        <p className="calculator-subtitle-v2">Estimate your Body Mass Index using height and weight.</p>
      </div>

      <div className="unit-toggle-v2">
        <button 
          className={`unit-button-v2 ${formData.unit === 'us' ? 'active-v2' : 'inactive-v2'}`}
          onClick={() => handleInputChange('unit', 'us')}
        >
          US Units
        </button>
        <button 
          className={`unit-button-v2 ${formData.unit === 'metric' ? 'active-v2' : 'inactive-v2'}`}
          onClick={() => handleInputChange('unit', 'metric')}
        >
          Metric Units
        </button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); calculateBMI(); }} className="calculator-form-v2">
        <div className="form-group-v2">
          <label className="form-label-v2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className="form-input-v2"
            min="1"
            max="120"
          />
        </div>

        <div className="form-group-v2">
          <label className="form-label-v2">Gender</label>
          <div className="gender-options-v2">
            <div className="gender-option-v2" onClick={() => handleInputChange('gender', 'male')}>
              <div className={`gender-radio-v2 ${formData.gender === 'male' ? 'selected-v2' : ''}`}>
                {formData.gender === 'male' && <div className="radio-inner-v2"></div>}
              </div>
              <span className={`gender-label-v2 ${formData.gender === 'male' ? '' : 'inactive-text'}`}>Male</span>
            </div>
            <div className="gender-option-v2" onClick={() => handleInputChange('gender', 'female')}>
              <div className={`gender-radio-v2 ${formData.gender === 'female' ? 'selected-v2' : ''}`}>
                {formData.gender === 'female' && <div className="radio-inner-v2"></div>}
              </div>
              <span className={`gender-label-v2 ${formData.gender === 'female' ? '' : 'inactive-text'}`}>Female</span>
            </div>
          </div>
        </div>

        <div className="form-group-v2">
          <label className="form-label-v2">Height</label>
          <div className="height-inputs-v2">
            <input
              type="number"
              value={formData.heightFeet}
              onChange={(e) => handleInputChange('heightFeet', e.target.value)}
              className="form-input-v2 height-input-v2"
              min="1"
              max={formData.unit === 'us' ? '8' : '250'}
            />
            <span className="unit-label-v2">{formData.unit === 'us' ? 'ft' : 'cm'}</span>
            {formData.unit === 'us' && (
              <>
                <input
                  type="number"
                  value={formData.heightInches}
                  onChange={(e) => handleInputChange('heightInches', e.target.value)}
                  className="form-input-v2 height-input-v2"
                  min="0"
                  max="11"
                />
                <span className="unit-label-v2">in</span>
              </>
            )}
          </div>
        </div>

        <div className="form-group-v2">
          <label className="form-label-v2">Weight</label>
          <div className="weight-row-v2">
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className="form-input-v2 weight-input-v2"
              min="1"
              max="1000"
            />
            <span className="unit-label-v2">{formData.unit === 'us' ? 'lb' : 'kg'}</span>
          </div>
        </div>

        <div className="form-group-v2">
          <label className="form-label-v2">Activity</label>
          <input
            type="number"
            value={formData.activity}
            onChange={(e) => handleInputChange('activity', e.target.value)}
            className="form-input-v2 activity-input-v2"
            min="1"
            max="100"
          />
        </div>

        <button type="submit" className="calculate-button-v2">
          Start Calculating
        </button>
      </form>
    </div>
  );
};

export default BMICalculator;