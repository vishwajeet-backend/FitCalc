// API Service for FitCalc Backend Integration
// Handles all calculator API calls with consistent error handling and session management

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Generate or retrieve session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('fitcalc_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('fitcalc_session_id', sessionId);
  }
  return sessionId;
};

// Generic API call function
export const calculateAPI = async (calculatorType, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculators/${calculatorType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': getSessionId(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Calculation failed');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error calculating ${calculatorType}:`, error);
    throw error;
  }
};

// Specific calculator functions
export const calculateBMI = (data) => calculateAPI('bmi', data);
export const calculateBMR = (data) => calculateAPI('bmr', data);
export const calculateTDEE = (data) => calculateAPI('tdee', data);
export const calculateCalorie = (data) => calculateAPI('calorie', data);
export const calculateBodyFat = (data) => calculateAPI('body-fat', data);
export const calculateNavyBodyFat = (data) => calculateAPI('navy-body-fat', data);
export const calculateArmyBodyFat = (data) => calculateAPI('army-body-fat', data);
export const calculateLeanBodyMass = (data) => calculateAPI('lean-body-mass', data);
export const calculateIdealWeight = (data) => calculateAPI('ideal-weight', data);
export const calculateHealthyWeight = (data) => calculateAPI('healthy-weight', data);
export const calculateMacro = (data) => calculateAPI('macro', data);
export const calculateProtein = (data) => calculateAPI('protein', data);
export const calculateCarbs = (data) => calculateAPI('carbohydrate', data);
export const calculateFatIntake = (data) => calculateAPI('fat-intake', data);
export const calculateCaloriesBurned = (data) => calculateAPI('calories-burned', data);
export const calculateOneRepMax = (data) => calculateAPI('one-rep-max', data);
export const calculatePace = (data) => calculateAPI('pace', data);
export const calculateTargetHeartRate = (data) => calculateAPI('target-heart-rate', data);
export const calculateBodyType = (data) => calculateAPI('body-type', data);
export const calculateBodySurfaceArea = (data) => calculateAPI('body-surface-area', data);
export const calculateGFR = (data) => calculateAPI('gfr', data);
export const calculatePregnancyDueDate = (data) => calculateAPI('pregnancy-due-date', data);
export const calculatePregnancyWeightGain = (data) => calculateAPI('pregnancy-weight-gain', data);
export const calculatePregnancyWeek = (data) => calculateAPI('pregnancy-week', data);
export const calculateConception = (data) => calculateAPI('conception', data);
export const calculateOvulation = (data) => calculateAPI('ovulation', data);
export const calculatePeriod = (data) => calculateAPI('period', data);

// Get calculation history
export const getCalculationHistory = async (limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculators/history?limit=${limit}`, {
      headers: {
        'X-Session-ID': getSessionId(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

// Get calculation statistics
export const getCalculationStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculators/stats`, {
      headers: {
        'X-Session-ID': getSessionId(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};
