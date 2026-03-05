import React from 'react';

// Reusable calculator form component with consistent styling
const CalculatorForm = ({ 
  unit, 
  onUnitChange, 
  showUnitToggle = true,
  children, 
  onSubmit, 
  submitLabel = "Start Calculating",
  isCalculating = false 
}) => {
  const styles = {
    container: {
      background: 'white',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
    },
    unitToggle: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '2rem',
      background: '#f1f5f9',
      padding: '0.25rem',
      borderRadius: '6px',
      width: 'fit-content',
    },
    unitButton: (active) => ({
      padding: '0.5rem 1.5rem',
      border: 'none',
      borderRadius: '4px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      background: active ? '#3b82f6' : 'transparent',
      color: active ? 'white' : '#64748b',
    }),
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    submitButton: {
      background: '#1e40af',
      color: 'white',
      padding: '0.875rem 2rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: isCalculating ? 'not-allowed' : 'pointer',
      transition: 'background 0.2s',
      marginTop: '0.5rem',
      opacity: isCalculating ? 0.7 : 1,
    },
  };

  return (
    <div style={styles.container}>
      {showUnitToggle && (
        <div style={styles.unitToggle}>
          <button
            type="button"
            style={styles.unitButton(unit === 'us')}
            onClick={() => onUnitChange('us')}
          >
            US Units
          </button>
          <button
            type="button"
            style={styles.unitButton(unit === 'metric')}
            onClick={() => onUnitChange('metric')}
          >
            Metric Units
          </button>
        </div>
      )}
      
      <form onSubmit={onSubmit} style={styles.form}>
        {children}
        <button 
          type="submit" 
          style={styles.submitButton}
          disabled={isCalculating}
          onMouseOver={(e) => !isCalculating && (e.target.style.background = '#1e3a8a')}
          onMouseOut={(e) => !isCalculating && (e.target.style.background = '#1e40af')}
        >
          {isCalculating ? 'Calculating...' : submitLabel}
        </button>
      </form>
    </div>
  );
};

// Form field components
export const FormGroup = ({ label, children, fullWidth = false }) => {
  const styles = {
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      width: fullWidth ? '100%' : 'auto',
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
    },
  };

  return (
    <div style={styles.group}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
};

export const Input = ({ type = 'number', value, onChange, min, max, step, placeholder, unit }) => {
  const styles = {
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    input: {
      flex: 1,
      padding: '0.625rem 0.875rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.9375rem',
      color: '#1f2937',
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    unit: {
      fontSize: '0.875rem',
      color: '#6b7280',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.inputContainer}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        style={styles.input}
        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
      />
      {unit && <span style={styles.unit}>{unit}</span>}
    </div>
  );
};

export const Select = ({ value, onChange, options = [] }) => {
  const styles = {
    select: {
      padding: '0.625rem 0.875rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.9375rem',
      color: '#1f2937',
      outline: 'none',
      background: 'white',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
    },
  };

  return (
    <select
      value={value}
      onChange={onChange}
      style={styles.select}
      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export const RadioGroup = ({ value, onChange, options }) => {
  const styles = {
    container: {
      display: 'flex',
      gap: '1.5rem',
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
    },
    radio: (selected) => ({
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: `2px solid ${selected ? '#3b82f6' : '#d1d5db'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border-color 0.2s',
    }),
    radioInner: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: '#3b82f6',
    },
    label: (selected) => ({
      fontSize: '0.9375rem',
      color: selected ? '#1f2937' : '#6b7280',
      fontWeight: selected ? '500' : '400',
    }),
  };

  return (
    <div style={styles.container}>
      {options.map((opt) => (
        <div
          key={opt.value}
          style={styles.option}
          onClick={() => onChange(opt.value)}
        >
          <div style={styles.radio(value === opt.value)}>
            {value === opt.value && <div style={styles.radioInner} />}
          </div>
          <span style={styles.label(value === opt.value)}>{opt.label}</span>
        </div>
      ))}
    </div>
  );
};

export const HeightInput = ({ unit, feet, inches, cm, onFeetChange, onInchesChange, onCmChange }) => {
  const styles = {
    container: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    input: {
      width: '80px',
      padding: '0.625rem 0.875rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.9375rem',
      outline: 'none',
    },
    unit: {
      fontSize: '0.875rem',
      color: '#6b7280',
      fontWeight: '500',
    },
  };

  if (unit === 'us') {
    return (
      <div style={styles.container}>
        <div style={styles.inputGroup}>
          <input
            type="number"
            value={feet}
            onChange={onFeetChange}
            min="1"
            max="8"
            style={styles.input}
          />
          <span style={styles.unit}>ft</span>
        </div>
        <div style={styles.inputGroup}>
          <input
            type="number"
            value={inches}
            onChange={onInchesChange}
            min="0"
            max="11"
            style={styles.input}
          />
          <span style={styles.unit}>in</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.inputGroup}>
      <input
        type="number"
        value={cm}
        onChange={onCmChange}
        min="50"
        max="250"
        style={styles.input}
      />
      <span style={styles.unit}>cm</span>
    </div>
  );
};

export default CalculatorForm;
