import React from 'react';

// Reusable calculator form component with Figma design
const CalculatorForm = ({ 
  unit, 
  onUnitChange, 
  showUnitToggle = true,
  children, 
  onSubmit, 
  submitLabel = "Start Calculating",
  isCalculating = false 
}) => {
  return (
    <>
      {showUnitToggle && (
        <div className="calculator-unit-toggle">
          <button
            type="button"
            className={`calculator-unit-button ${unit === 'us' ? 'active' : ''}`}
            onClick={() => onUnitChange('us')}
          >
            US Units
          </button>
          <button
            type="button"
            className={`calculator-unit-button ${unit === 'metric' ? 'active' : ''}`}
            onClick={() => onUnitChange('metric')}
          >
            Metric Units
          </button>
        </div>
      )}
      
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {children}
        <button 
          type="submit" 
          className="calculator-submit-button"
          disabled={isCalculating}
        >
          {isCalculating ? 'Calculating...' : submitLabel}
        </button>
      </form>
    </>
  );
};

// Form field components
export const FormGroup = ({ label, children, fullWidth = false }) => {
  return (
    <div className="calculator-form-group">
      <label className="calculator-label">{label}</label>
      {children}
    </div>
  );
};

export const Input = ({ type = 'number', value, onChange, min, max, step, placeholder, unit }) => {
  return (
    <div className="calculator-input-group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="calculator-input"
      />
      {unit && <span className="calculator-input-unit">{unit}</span>}
    </div>
  );
};

export const Select = ({ value, onChange, options = [], children, style }) => {
  // Support both patterns: options prop or children
  return (
    <select
      value={value}
      onChange={onChange}
      className="calculator-select"
      style={style}
    >
      {children || options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export const RadioGroup = ({ value, onChange, options }) => {
  return (
    <div className="calculator-radio-group">
      {options.map((opt) => (
        <div
          key={opt.value}
          className="calculator-radio-option"
          onClick={() => onChange(opt.value)}
        >
          <div className={`calculator-radio-circle ${value === opt.value ? 'selected' : ''}`} />
          <span className={`calculator-radio-label ${value === opt.value ? 'selected' : ''}`}>{opt.label}</span>
        </div>
      ))}
    </div>
  );
};

export const HeightInput = ({ unit, feet, inches, cm, onFeetChange, onInchesChange, onCmChange }) => {
  if (unit === 'us') {
    return (
      <div className="calculator-height-container">
        <div className="calculator-input-group">
          <input
            type="number"
            value={feet}
            onChange={onFeetChange}
            min="1"
            max="8"
            className="calculator-input calculator-height-input"
          />
          <span className="calculator-input-unit">ft</span>
        </div>
        <div className="calculator-input-group">
          <input
            type="number"
            value={inches}
            onChange={onInchesChange}
            min="0"
            max="11"
            className="calculator-input calculator-height-input"
          />
          <span className="calculator-input-unit">in</span>
        </div>
      </div>
    );
  }

  return (
    <div className="calculator-input-group">
      <input
        type="number"
        value={cm}
        onChange={onCmChange}
        min="50"
        max="250"
        className="calculator-input"
      />
      <span className="calculator-input-unit">cm</span>
    </div>
  );
};

export default CalculatorForm;
