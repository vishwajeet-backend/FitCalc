import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BodyFatCalculatorPage() {
  const [unit, setUnit] = useState('us');
  const [formData, setFormData] = useState({
    age: '25',
    gender: 'male',
    heightFeet: '5',
    heightInches: '10',
    heightCm: '178',
    weight: '65',
    neckFeet: '5',
    neckInches: '11',
    waistFeet: '5',
    waistInches: '11',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateBodyFat = () => {
    // Convert measurements to inches/pounds
    let height, weight, neck, waist;
    
    if (unit === 'us') {
      height = parseFloat(formData.heightFeet) * 12 + parseFloat(formData.heightInches);
      weight = parseFloat(formData.weight);
      neck = parseFloat(formData.neckFeet) * 12 + parseFloat(formData.neckInches);
      waist = parseFloat(formData.waistFeet) * 12 + parseFloat(formData.waistInches);
    } else {
      height = parseFloat(formData.heightCm) / 2.54;
      weight = parseFloat(formData.weight) * 2.205;
      neck = parseFloat(formData.neckCm) / 2.54;
      waist = parseFloat(formData.waistCm) / 2.54;
    }

    // U.S. Navy Method formula for males
    const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;

    // Calculate fat mass and lean mass
    const weightInKg = unit === 'us' ? parseFloat(formData.weight) * 0.453592 : parseFloat(formData.weight);
    const fatMass = weightInKg * (bodyFat / 100);
    const leanMass = weightInKg - fatMass;

    // Get category
    let category = '';
    if (bodyFat < 6) category = 'Essential';
    else if (bodyFat < 14) category = 'Athletes';
    else if (bodyFat < 18) category = 'Fitness';
    else if (bodyFat < 25) category = 'Average';
    else category = 'Obese';

    // Calculate ideal body fat based on age
    const age = parseInt(formData.age);
    let idealBodyFat;
    if (age < 20) idealBodyFat = 8.5;
    else if (age < 40) idealBodyFat = 11;
    else if (age < 60) idealBodyFat = 15;
    else idealBodyFat = 17;

    const bodyFatToLose = Math.max(0, bodyFat - idealBodyFat);

    // Calculate BMI body fat estimate
    const bmi = weightInKg / Math.pow(height * 0.0254, 2);
    const bmiFat = (1.20 * bmi) + (0.23 * age) - 16.2;

    setResult({
      bodyFat: bodyFat.toFixed(1),
      category,
      fatMass: fatMass.toFixed(1),
      leanMass: leanMass.toFixed(1),
      idealBodyFat: idealBodyFat.toFixed(1),
      bodyFatToLose: bodyFatToLose.toFixed(1),
      bmiFat: bmiFat.toFixed(1)
    });
  };

  const handleClear = () => {
    setFormData({
      age: '25',
      gender: 'male',
      heightFeet: '5',
      heightInches: '10',
      heightCm: '178',
      weight: '65',
      neckFeet: '5',
      neckInches: '11',
      waistFeet: '5',
      waistInches: '11',
    });
    setResult(null);
  };

  // Get position on the body fat bar (percentage)
  const getBarPosition = () => {
    if (!result) return 50;
    const bf = parseFloat(result.bodyFat);
    // Map body fat percentage to bar position (0-100%)
    if (bf < 6) return (bf / 6) * 12.5;
    if (bf < 14) return 12.5 + ((bf - 6) / 8) * 25;
    if (bf < 18) return 37.5 + ((bf - 14) / 4) * 12.5;
    if (bf < 25) return 50 + ((bf - 18) / 7) * 25;
    return Math.min(75 + ((bf - 25) / 10) * 25, 95);
  };

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    breadcrumb: {
      fontSize: '0.875rem',
      marginBottom: '1.5rem',
      color: '#6b7280',
    },
    breadcrumbLink: {
      color: '#3b82f6',
      textDecoration: 'none',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#111827',
    },
    description: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '2rem',
      lineHeight: '1.6',
      maxWidth: '900px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
    },
    formContainer: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem',
      height: 'fit-content',
    },
    toggleContainer: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1.5rem',
    },
    toggleButton: {
      flex: 1,
      padding: '0.625rem 1rem',
      border: '1px solid #d1d5db',
      background: 'white',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s',
      color: '#374151',
    },
    toggleButtonActive: {
      background: '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      marginBottom: '0.5rem',
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '0.625rem 2.5rem 0.625rem 0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '0.875rem',
      boxSizing: 'border-box',
      outline: 'none',
    },
    inputGroup: {
      display: 'flex',
      gap: '0.5rem',
    },
    inputWithUnit: {
      flex: 1,
      position: 'relative',
    },
    unit: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '0.875rem',
      color: '#6b7280',
      pointerEvents: 'none',
    },
    radioGroup: {
      display: 'flex',
      gap: '1.5rem',
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      color: '#374151',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      border: 'none',
      borderRadius: '4px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    calculateButton: {
      background: '#3b82f6',
      color: 'white',
      marginBottom: '0.5rem',
    },
    clearButton: {
      background: 'white',
      color: '#374151',
      border: '1px solid #d1d5db',
    },
    resultsContainer: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    resultsHeader: {
      background: '#10b981',
      color: 'white',
      padding: '1rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    resultsBody: {
      padding: '2rem',
    },
    mainResult: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    mainResultLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.5rem',
    },
    mainResultValue: {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem',
    },
    arrow: {
      fontSize: '1.5rem',
      color: '#374151',
      fontWeight: 'bold',
    },
    barContainer: {
      marginBottom: '0.5rem',
      position: 'relative',
      paddingTop: '1.5rem',
    },
    bar: {
      display: 'flex',
      height: '40px',
      borderRadius: '4px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    barSegment: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: '600',
      color: 'white',
      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    },
    pointer: {
      position: 'absolute',
      top: '0',
      transform: 'translateX(-50%)',
      fontSize: '1.5rem',
      zIndex: 10,
    },
    barLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.5rem',
      marginBottom: '2rem',
    },
    resultCard: {
      background: '#3b82f6',
      color: 'white',
      padding: '1rem 1.25rem',
      borderRadius: '6px',
      marginBottom: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    resultCardLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    resultCardValue: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
    },
  };

  const responsiveStyles = `
    @media (max-width: 768px) {
      .bodyfat-calculator-container {
        flex-direction: column !important;
      }
      .bodyfat-calculator-container > div {
        width: 100% !important;
        max-width: 100% !important;
      }
    }
  `;

  return (
    <div style={styles.container}>
      <style>{responsiveStyles}</style>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <Link to="/" style={styles.breadcrumbLink}>home</Link>
        {' / '}
        <Link to="/fitness" style={styles.breadcrumbLink}>fitness & health</Link>
        {' / '}
        <span>target heart rate calculator</span>
      </div>

      {/* Title */}
      <h1 style={styles.title}>Body Fat Calculator</h1>
      <p style={styles.description}>
        The Body Fat Calculator can be used to estimate your total body fat based on specific measurements. Use the "Metric Units" tab for the International System of Units or the "Other Units" tab to convert units into either US or metric units. Your ideal body fat percentage is determined by age and gender according to the International System of Units (SI).
      </p>

      {/* Main Grid */}
      <div style={styles.grid} className="calc-responsive-grid">
        {/* Form Section */}
        <div style={styles.formContainer}>
          {/* Unit Toggle */}
          <div style={styles.toggleContainer}>
            <button
              style={{
                ...styles.toggleButton,
                ...(unit === 'us' ? styles.toggleButtonActive : {}),
              }}
              onClick={() => setUnit('us')}
            >
              US Units
            </button>
            <button
              style={{
                ...styles.toggleButton,
                ...(unit === 'metric' ? styles.toggleButtonActive : {}),
              }}
              onClick={() => setUnit('metric')}
            >
              Metric Units
            </button>
          </div>

          {/* Gender */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender</label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* Age */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          {/* Weight */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Weight</label>
            <div style={styles.inputWithUnit}>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                style={styles.input}
              />
              <span style={styles.unit}>{unit === 'us' ? 'lb' : 'kg'}</span>
            </div>
          </div>

          {/* Height */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Height</label>
            {unit === 'us' ? (
              <div style={styles.inputGroup}>
                <div style={styles.inputWithUnit}>
                  <input
                    type="number"
                    name="heightFeet"
                    value={formData.heightFeet}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                  <span style={styles.unit}>ft</span>
                </div>
                <div style={styles.inputWithUnit}>
                  <input
                    type="number"
                    name="heightInches"
                    value={formData.heightInches}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                  <span style={styles.unit}>in</span>
                </div>
              </div>
            ) : (
              <div style={styles.inputWithUnit}>
                <input
                  type="number"
                  name="heightCm"
                  value={formData.heightCm}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                <span style={styles.unit}>cm</span>
              </div>
            )}
          </div>

          {/* Neck */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Neck</label>
            <div style={styles.inputGroup}>
              <div style={styles.inputWithUnit}>
                <input
                  type="number"
                  name="neckFeet"
                  value={formData.neckFeet}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                <span style={styles.unit}>{unit === 'us' ? 'ft' : 'cm'}</span>
              </div>
              <div style={styles.inputWithUnit}>
                <input
                  type="number"
                  name="neckInches"
                  value={formData.neckInches}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                <span style={styles.unit}>{unit === 'us' ? 'in' : 'cm'}</span>
              </div>
            </div>
          </div>

          {/* Waist */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Waist</label>
            <div style={styles.inputGroup}>
              <div style={styles.inputWithUnit}>
                <input
                  type="number"
                  name="waistFeet"
                  value={formData.waistFeet}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                <span style={styles.unit}>{unit === 'us' ? 'ft' : 'cm'}</span>
              </div>
              <div style={styles.inputWithUnit}>
                <input
                  type="number"
                  name="waistInches"
                  value={formData.waistInches}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                <span style={styles.unit}>{unit === 'us' ? 'in' : 'cm'}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <button
            style={{ ...styles.button, ...styles.calculateButton }}
            onClick={calculateBodyFat}
          >
            Start Calculating
          </button>
          <button
            style={{ ...styles.button, ...styles.clearButton }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div style={styles.resultsContainer}>
            <div style={styles.resultsHeader}>
              <span>Your Results</span>
              <span style={{ cursor: 'pointer' }}>📄</span>
            </div>
            <div style={styles.resultsBody}>
              {/* Main Result */}
              <div style={styles.mainResult}>
                <div style={styles.mainResultLabel}>Body Fat: {result.bodyFat}%</div>
                <div style={styles.mainResultValue}>{result.bodyFat}%</div>
                <div style={styles.arrow}>↓</div>
              </div>

              {/* Body Fat Range Bar */}
              <div style={styles.barContainer}>
                <div style={{ ...styles.pointer, left: `${getBarPosition()}%` }}>▼</div>
                <div style={styles.bar}>
                  <div style={{ ...styles.barSegment, background: '#991b1b', flex: 1 }}>
                    Essential
                  </div>
                  <div style={{ ...styles.barSegment, background: '#10b981', flex: 2 }}>
                    Athletes
                  </div>
                  <div style={{ ...styles.barSegment, background: '#10b981', flex: 1 }}>
                    Fitness
                  </div>
                  <div style={{ ...styles.barSegment, background: '#fbbf24', flex: 2 }}>
                    Average
                  </div>
                  <div style={{ ...styles.barSegment, background: '#dc2626', flex: 2 }}>
                    Obese
                  </div>
                </div>
              </div>
              <div style={styles.barLabels}>
                <span>Essential</span>
                <span>Athletes</span>
                <span>Fitness</span>
                <span>Average</span>
                <span>Obese</span>
              </div>

              {/* Result Cards */}
              <div style={styles.resultCard}>
                <span style={styles.resultCardLabel}>Body Fat (U.S. Navy Method)</span>
                <span style={styles.resultCardValue}>{result.bodyFat}%</span>
              </div>

              <div style={styles.resultCard}>
                <span style={styles.resultCardLabel}>Body Fat Category</span>
                <span style={styles.resultCardValue}>{result.category}</span>
              </div>

              <div style={styles.resultCard}>
                <span style={styles.resultCardLabel}>Body Fat Mass</span>
                <span style={styles.resultCardValue}>{result.fatMass} {unit === 'us' ? 'lb' : 'kg'}</span>
              </div>

              <div style={styles.resultCard}>
                <span style={styles.resultCardLabel}>Lean Body Mass</span>
                <span style={styles.resultCardValue}>{result.leanMass} {unit === 'us' ? 'lb' : 'kg'}</span>
              </div>

              <div style={styles.resultCard}>
                <span style={styles.resultCardLabel}>Ideal Body Fat for Given Age</span>
                <span style={styles.resultCardValue}>{result.idealBodyFat}%</span>
              </div>

              <div style={styles.resultCard}>
                <span style={styles.resultCardLabel}>Body Fat to Lose to Reach Ideal</span>
                <span style={styles.resultCardValue}>{result.bodyFatToLose}%</span>
              </div>

              <div style={styles.resultCard}>
                <span style={styles.resultCardLabel}>Body Fat (BMI method)</span>
                <span style={styles.resultCardValue}>{result.bmiFat}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BodyFatCalculatorPage;
