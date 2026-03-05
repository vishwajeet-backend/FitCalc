# Frontend Calculator Update Script

This document provides code templates for updating all calculator pages to use the new components,
API integration, and consistent styling.

## Template Pattern

All calculator pages follow this pattern:

1. Import new components (CalculatorLayout, CalculatorForm, ResultsContainer, API functions)
2. Use useState for form data, results, error, and loading states
3. Create handleSubmit function that calls the API
4. Render form with consistent styling
5. Display results with charts where appropriate

## Quick Update for All Calculators

### Import Pattern (Replace old imports)
```javascript
import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CalculatorForm, { FormGroup, Input, RadioGroup, Select } from '../components/CalculatorForm';
import ResultsContainer, { ResultCard, ResultsGrid, InfoRow } from '../components/ResultsContainer';
import { calculate[CalculatorName] } from '../utils/apiService';
```

### State Pattern
```javascript
const [unit, setUnit] = useState('us');
const [isCalculating, setIsCalculating] = useState(false);
const [results, setResults] = useState(null);
const [error, setError] = useState(null);
const [formData, setFormData] = useState({ /* calculator-specific fields */ });
```

### Handler Pattern
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsCalculating(true);
  setError(null);

  try {
    const data = { /* prepare data based on unit */ };
    const result = await calculate[CalculatorName](data);
    setResults(result);
  } catch (err) {
    setError(err.message || 'Failed to calculate. Please try again.');
  } finally {
    setIsCalculating(false);
  }
};
```

### Render Pattern
```javascript
return (
  <CalculatorLayout
    title="[Calculator Name]"
    description="[Description]"
    breadcrumbPath="[path]"
  >
    <CalculatorForm
      unit={unit}
      onUnitChange={setUnit}
      onSubmit={handleSubmit}
      isCalculating={isCalculating}
      showUnitToggle={true/false}
    >
      {/* Form fields using FormGroup, Input, RadioGroup, Select */}
    </CalculatorForm>

    {error && <ErrorDisplay />}
    
    {results && (
      <ResultsContainer title="Your Results" downloadable>
        {/* Results display with cards, charts, etc. */}
      </ResultsContainer>
    )}
  </CalculatorLayout>
);
```

## Calculator-Specific Configurations

### 1. BMI Calculator ✅ (Already updated)
- Fields: age, gender, height, weight
- Chart: BMIChart
- Colors: Category-based (Underweight: yellow, Normal: green, Overweight: orange, Obese: red)

### 2. Calorie Calculator ✅ (Already updated)
- Fields: age, gender, height, weight, activityLevel
- Chart: CalorieChart (bar chart)
- Shows: maintain, mild loss, weight loss, extreme loss

### 3. BMR Calculator (Needs update)
- Fields: age, gender, height, weight
- No unit toggle needed
- Display: BMR value, TDEE for different activity levels

### 4. TDEE Calculator (Needs update)
- Fields: age, gender, height, weight, activityLevel
- Chart: CalorieChart
- Shows: BMR, TDEE, weight goals

### 5. Macro Calculator (Needs update)
- Fields: age, gender, height, weight, activityLevel, goal
- Chart: MacroChart (pie chart)
- Shows: protein, carbs, fat (grams and percentages)

### 6. Body Fat Calculator (Needs update)
- Fields: gender, height, weight, neck, waist, hip (female only)
- Chart: BodyFatChart
- Shows: body fat %, category, body fat mass, lean mass

### 7. Navy/Army Body Fat Calculators
- Similar to Body Fat Calculator
- Military-specific calculations

### 8. Protein/Carbs/Fat Intake Calculators
- Fields: age, gender, height, weight, activityLevel, goal
- Shows specific macro recommendations

### 9. One Rep Max Calculator
- Fields: weight, reps
- No unit toggle
- Shows: 1RM estimates for different rep ranges

### 10. Pace Calculator
- Fields: distance, time
- Shows: pace per mile/km, speed

### 11. Target Heart Rate Calculator
- Fields: age, restingHR
- Shows: max HR, target zones

### 12. Pregnancy Calculators (Due Date, Week, Weight Gain, Conception, Ovulation, Period)
- Date inputs
- Specialized displays
- Timeline charts

## Common Form Fields

### Gender Radio
```javascript
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
```

### Height Input (US/Metric)
```javascript
<FormGroup label="Height">
  {unit === 'us' ? (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Input value={formData.heightFeet} onChange={...} min="1" max="8" unit="ft" />
      <Input value={formData.heightInches} onChange={...} min="0" max="11" unit="in" />
    </div>
  ) : (
    <Input value={formData.heightCm} onChange={...} min="50" max="250" unit="cm" />
  )}
</FormGroup>
```

### Activity Level Select
```javascript
<FormGroup label="Activity Level">
  <Select
    value={formData.activityLevel}
    onChange={(e) => handleInputChange('activityLevel', e.target.value)}
    options={[
      { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
      { value: 'light', label: 'Light (exercise 1-3 times/week)' },
      { value: 'moderate', label: 'Moderate (exercise 4-5 times/week)' },
      { value: 'active', label: 'Active (daily exercise)' },
      { value: 'very_active', label: 'Very Active (intense exercise daily)' },
    ]}
  />
</FormGroup>
```

## Color Schemes

### Primary Colors
- Green (#10b981): Maintain, Normal, Success
- Blue (#3b82f6): Mild loss, Information
- Orange (#f59e0b): Weight loss, Warning
- Red (#ef4444): Extreme loss, Danger
- Yellow (#fbbf24): Caution

### Background Colors
- Page: #f8fafc
- Card: white
- Input border: #d1d5db
- Input focus: #3b82f6

## Next Steps

1. Update remaining calculator pages following this pattern
2. Ensure all calculators call the backend API
3. Add appropriate charts to each calculator
4. Test all calculators with various inputs
5. Verify responsive design on mobile devices
