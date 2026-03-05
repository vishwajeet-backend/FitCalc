import React, { useState } from 'react';

const CalorieCalculator = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    age: 25,
    gender: 'male',
    weight: 70,
    height: 170,
    activityLevel: 'moderate',
    unit: 'metric'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateCalories = async () => {
    try {
      const response = await fetch('/api/calculators/calorie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (onCalculate) {
        onCalculate(data);
      }
    } catch (error) {
      console.error('Error calculating calories:', error);
    }
  };

  return (
    <div className="bmi-calculator-container">
      <div className="calculator-card">
        <div className="calculator-inputs">
          {/* Age */}
          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
              className="input-field"
            />
          </div>

          {/* Gender */}
          <div className="input-group">
            <label>Gender</label>
            <div className="gender-selector">
              <button
                className={formData.gender === 'male' ? 'active' : ''}
                onClick={() => handleInputChange('gender', 'male')}
              >
                Male
              </button>
              <button
                className={formData.gender === 'female' ? 'active' : ''}
                onClick={() => handleInputChange('gender', 'female')}
              >
                Female
              </button>
            </div>
          </div>

          {/* Height */}
          <div className="input-group">
            <label>Height ({formData.unit === 'us' ? 'inches' : 'cm'})</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
              className="input-field"
            />
          </div>

          {/* Weight */}
          <div className="input-group">
            <label>Weight ({formData.unit === 'us' ? 'lbs' : 'kg'})</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              className="input-field"
            />
          </div>

          {/* Activity Level */}
          <div className="input-group">
            <label>Activity Level</label>
            <select
              value={formData.activityLevel}
              onChange={(e) => handleInputChange('activityLevel', e.target.value)}
              className="input-field"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (exercise 3-5 days/week)</option>
              <option value="active">Active (exercise 6-7 days/week)</option>
              <option value="veryActive">Very Active (intense exercise daily)</option>
            </select>
          </div>

          {/* Unit Toggle */}
          <div className="input-group">
            <div className="unit-toggle">
              <button
                className={formData.unit === 'us' ? 'active' : ''}
                onClick={() => handleInputChange('unit', 'us')}
              >
                US Units
              </button>
              <button
                className={formData.unit === 'metric' ? 'active' : ''}
                onClick={() => handleInputChange('unit', 'metric')}
              >
                Metric
              </button>
            </div>
          </div>

          <button 
            className="calculate-btn"
            onClick={calculateCalories}
          >
            Calculate Calories
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
