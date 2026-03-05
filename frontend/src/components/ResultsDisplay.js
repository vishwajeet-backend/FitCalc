import React from 'react';

const BMIGauge = ({ bmi, category, categoryColor }) => {
  // Calculate the angle for the needle based on BMI value
  const calculateNeedleAngle = (bmiValue) => {
    if (bmiValue < 15) return -80;
    if (bmiValue > 40) return 80;
    
    // Map BMI value to angle (-80 to 80 degrees)
    // BMI ranges: 15 (left) to 40 (right)
    const normalizedBmi = Math.max(15, Math.min(40, bmiValue));
    return ((normalizedBmi - 15) / 25) * 160 - 80;
  };

  const needleAngle = calculateNeedleAngle(bmi);

  return (
    <div className="bmi-gauge-v2">
      <svg width="384" height="250" viewBox="0 0 384 250">
        {/* Background segments */}
        <defs>
          <linearGradient id="underweight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff8c42" />
            <stop offset="100%" stopColor="#ff8c42" />
          </linearGradient>
          <linearGradient id="normal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="overweight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="obese" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Underweight segment */}
        <path
          d="M 48 202 A 144 144 0 0 1 134 111"
          fill="none"
          stroke="url(#underweight)"
          strokeWidth="30"
        />
        
        {/* Normal segment */}
        <path
          d="M 134 111 A 144 144 0 0 1 250 111"
          fill="none"
          stroke="url(#normal)"
          strokeWidth="30"
        />
        
        {/* Overweight segment */}
        <path
          d="M 250 111 A 144 144 0 0 1 336 202"
          fill="none"
          stroke="url(#overweight)"
          strokeWidth="30"
        />

        {/* Needle */}
        <g transform={`translate(192, 190) rotate(${needleAngle})`}>
          <line x1="0" y1="-60" x2="0" y2="0" stroke="#3d568f" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="0" r="8" fill="#3d568f" />
        </g>

        {/* Labels positioned around the gauge */}
        <text x="68" y="240" textAnchor="middle" className="gauge-label-v2 under" fill="#ff8c42">Under</text>
        <text x="44" y="40" textAnchor="middle" className="gauge-label-v2 normal" fill="#10b981">Normal</text>
        <text x="241" y="46" textAnchor="middle" className="gauge-label-v2 over" fill="#f59e0b">Over</text>
        <text x="316" y="240" textAnchor="middle" className="gauge-label-v2 obese" fill="#ef4444">Obese</text>
        
        {/* Number labels */}
        <text x="68" y="155" textAnchor="middle" fill="#6b7280" fontSize="18" fontWeight="400">15</text>
        <text x="123" y="84" textAnchor="middle" fill="#6b7280" fontSize="18" fontWeight="400">18.5</text>
        <text x="261" y="84" textAnchor="middle" fill="#6b7280" fontSize="18" fontWeight="400">30</text>
        <text x="316" y="155" textAnchor="middle" fill="#6b7280" fontSize="18" fontWeight="400">40</text>
      </svg>
    </div>
  );
};

const ResultsDisplay = ({ bmiData }) => {
  if (!bmiData) {
    return (
      <div className="results-section-v2">
        <div className="results-header-v2">
          <h2 className="results-title-v2">Your Results</h2>
          <div className="save-icon-v2">💾</div>
        </div>
        <div className="results-placeholder">
          Calculate your BMI to see results
        </div>
      </div>
    );
  }

  const getCategoryBgColor = (category) => {
    switch(category) {
      case 'Normal': return '#dcfce7';
      case 'Under': return '#fed7aa';
      case 'Over': return '#fef3c7';
      case 'Obese': return '#fecaca';
      default: return '#dcfce7';
    }
  };

  const getCategoryTextColor = (category) => {
    switch(category) {
      case 'Normal': return '#008236';
      case 'Under': return '#ff8c42';
      case 'Over': return '#f59e0b';
      case 'Obese': return '#ef4444';
      default: return '#008236';
    }
  };

  return (
    <div className="results-section-v2">
      <div className="results-header-v2">
        <h2 className="results-title-v2">Your Results</h2>
        <div className="save-icon-v2">💾</div>
      </div>

      <div className="bmi-display-v2">
        <div className="bmi-value-row-v2">
          <span className="bmi-value-v2">{bmiData.bmi}</span>
          <span className="bmi-unit-v2">kg/m²</span>
          <div 
            className="bmi-category-badge-v2" 
            style={{ 
              backgroundColor: getCategoryBgColor(bmiData.category),
              color: getCategoryTextColor(bmiData.category)
            }}
          >
            {bmiData.category}
          </div>
        </div>
        
        <BMIGauge bmi={bmiData.bmi} category={bmiData.category} categoryColor={bmiData.categoryColor} />
        
        <div className="stats-grid-v2">
          <div className="stat-card-v2">
            <div className="stat-label-v2">Healthy BMI Range</div>
            <div className="stat-value-v2">
              18.5 <span className="stat-unit-v2">kg/m²</span>
            </div>
          </div>
          
          <div className="stat-card-v2 primary-v2">
            <div className="stat-label-v2">BMI Prime</div>
            <div className="stat-value-v2">
              {bmiData.bmiPrime} <span className="stat-unit-v2">kg/m²</span>
            </div>
          </div>
          
          <div className="stat-card-v2">
            <div className="stat-label-v2">Healthy Weight Range</div>
            <div className="stat-value-v2">{bmiData.healthyWeightRange}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;