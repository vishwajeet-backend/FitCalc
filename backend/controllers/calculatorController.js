const CalculationHistory = require('../models/CalculationHistory');

// Helper function to save calculation history
const saveCalculation = async (calculatorType, inputData, results, req) => {
  try {
    const calculation = new CalculationHistory({
      calculatorType,
      inputData,
      results,
      sessionId: req.headers['x-session-id'] || req.sessionID,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });
    
    await calculation.save();
    return calculation;
  } catch (error) {
    console.error('Error saving calculation:', error);
    // Don't throw error - we still want to return results even if save fails
  }
};

// BMI Calculator
exports.calculateBMI = async (req, res) => {
  try {
    const { age, gender, heightFeet, heightInches, weight, unit } = req.body;
    
    let heightInMeters, weightInKg;
    
    if (unit === 'us') {
      const totalInches = (parseFloat(heightFeet) * 12) + parseFloat(heightInches);
      heightInMeters = totalInches * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    } else {
      heightInMeters = parseFloat(heightFeet) / 100;
      weightInKg = parseFloat(weight);
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category = '';
    let categoryColor = '';
    
    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = '#ff8c42';
    } else if (bmi < 25) {
      category = 'Normal';
      categoryColor = '#10b981';
    } else if (bmi < 30) {
      category = 'Overweight';
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
      healthyBMIRange: '18.5 - 24.9',
      bmiPrime: parseFloat(bmiPrime.toFixed(2)),
      healthyWeightRange: unit === 'us' 
        ? `${Math.round(healthyWeightRange.min * 2.20462)} - ${Math.round(healthyWeightRange.max * 2.20462)} lbs`
        : `${Math.round(healthyWeightRange.min)} - ${Math.round(healthyWeightRange.max)} kg`
    };
    
    // Save to database
    await saveCalculation('bmi', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// BMR Calculator
exports.calculateBMR = async (req, res) => {
  try {
    const { age, gender, weight, height, unit } = req.body;
    
    let weightInKg, heightInCm;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
      heightInCm = parseFloat(height) * 2.54;
    } else {
      weightInKg = parseFloat(weight);
      heightInCm = parseFloat(height);
    }
    
    // Mifflin-St Jeor Equation
    let bmrMifflin;
    if (gender === 'male') {
      bmrMifflin = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseFloat(age)) + 5;
    } else {
      bmrMifflin = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseFloat(age)) - 161;
    }
    
    // Harris-Benedict Equation
    let bmrHarris;
    if (gender === 'male') {
      bmrHarris = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * parseFloat(age));
    } else {
      bmrHarris = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * parseFloat(age));
    }
    
    const result = {
      bmr: Math.round(bmrMifflin),
      bmrMifflin: Math.round(bmrMifflin),
      bmrHarris: Math.round(bmrHarris),
      formula: 'Mifflin-St Jeor & Harris-Benedict Equations'
    };
    
    await saveCalculation('bmr', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Calorie Calculator
exports.calculateCalorie = async (req, res) => {
  try {
    const { age, gender, weight, height, activityLevel, unit } = req.body;
    
    let weightInKg, heightInCm;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
      heightInCm = parseFloat(height) * 2.54;
    } else {
      weightInKg = parseFloat(weight);
      heightInCm = parseFloat(height);
    }
    
    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseFloat(age)) + 5;
    } else {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseFloat(age)) - 161;
    }
    
    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    const tdee = bmr * (activityMultipliers[activityLevel] || 1.2);
    
    const result = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      maintain: Math.round(tdee),
      mildLoss: Math.round(tdee - 250),
      weightLoss: Math.round(tdee - 500),
      extremeLoss: Math.round(tdee - 1000),
      mildGain: Math.round(tdee + 250),
      weightGain: Math.round(tdee + 500),
      fastGain: Math.round(tdee + 1000)
    };
    
    await saveCalculation('calorie', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// TDEE Calculator
exports.calculateTDEE = async (req, res) => {
  try {
    const { age, gender, weight, height, activityLevel, unit } = req.body;
    
    let weightInKg, heightInCm;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
      heightInCm = parseFloat(height) * 2.54;
    } else {
      weightInKg = parseFloat(weight);
      heightInCm = parseFloat(height);
    }
    
    // Mifflin-St Jeor Equation (most accurate for modern populations)
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseFloat(age)) + 5;
    } else {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseFloat(age)) - 161;
    }
    
    // Activity multipliers (based on research)
    const activityMultipliers = {
      sedentary: 1.2, // Little or no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Hard exercise 6-7 days/week
      veryActive: 1.9 // Very hard exercise, physical job
    };
    
    const multiplier = activityMultipliers[activityLevel] || 1.2;
    const tdee = bmr * multiplier;
    
    // Calculate calorie targets for different goals
    const mildWeightLoss = tdee - 250; // 0.5 lb/week
    const weightLoss = tdee - 500; // 1 lb/week
    const extremeWeightLoss = tdee - 1000; // 2 lb/week (not recommended without supervision)
    const mildWeightGain = tdee + 250; // 0.5 lb/week
    const weightGain = tdee + 500; // 1 lb/week
    
    const result = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      activityLevel,
      activityMultiplier: multiplier,
      calorieBreakdown: {
        sedentary: Math.round(bmr * 1.2),
        light: Math.round(bmr * 1.375),
        moderate: Math.round(bmr * 1.55),
        active: Math.round(bmr * 1.725),
        veryActive: Math.round(bmr * 1.9)
      },
      goalCalories: {
        extremeLoss: Math.max(1200, Math.round(extremeWeightLoss)), // Minimum 1200 cal
        weightLoss: Math.max(1200, Math.round(weightLoss)),
        mildLoss: Math.round(mildWeightLoss),
        maintain: Math.round(tdee),
        mildGain: Math.round(mildWeightGain),
        weightGain: Math.round(weightGain)
      },
      macroSuggestions: {
        // Balanced macro split
        protein: {
          grams: Math.round((tdee * 0.30) / 4),
          percentage: 30
        },
        carbs: {
          grams: Math.round((tdee * 0.40) / 4),
          percentage: 40
        },
        fat: {
          grams: Math.round((tdee * 0.30) / 9),
          percentage: 30
        }
      }
    };
    
    await saveCalculation('tdee', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    console.error('TDEE calculation error:', error);
    res.status(400).json({ error: error.message || 'Failed to calculate TDEE' });
  }
};

// Body Fat Calculator
exports.calculateBodyFat = async (req, res) => {
  try {
    const { gender, age, weight, height, neck, waist, hip, unit } = req.body;
    
    let heightInCm, neckInCm, waistInCm, hipInCm, weightInKg;
    
    if (unit === 'us') {
      heightInCm = parseFloat(height) * 2.54;
      neckInCm = parseFloat(neck) * 2.54;
      waistInCm = parseFloat(waist) * 2.54;
      hipInCm = hip ? parseFloat(hip) * 2.54 : 0;
      weightInKg = parseFloat(weight) * 0.453592;
    } else {
      heightInCm = parseFloat(height);
      neckInCm = parseFloat(neck);
      waistInCm = parseFloat(waist);
      hipInCm = hip ? parseFloat(hip) : 0;
      weightInKg = parseFloat(weight);
    }
    
    let bodyFatPercentage;
    
    // US Navy Method
    if (gender === 'male') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistInCm - neckInCm) + 0.15456 * Math.log10(heightInCm)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistInCm + hipInCm - neckInCm) + 0.22100 * Math.log10(heightInCm)) - 450;
    }
    
    const bodyFatMass = (bodyFatPercentage / 100) * weightInKg;
    const leanBodyMass = weightInKg - bodyFatMass;
    
    let category = '';
    if (gender === 'male') {
      if (bodyFatPercentage < 6) category = 'Essential Fat';
      else if (bodyFatPercentage < 14) category = 'Athletes';
      else if (bodyFatPercentage < 18) category = 'Fitness';
      else if (bodyFatPercentage < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bodyFatPercentage < 14) category = 'Essential Fat';
      else if (bodyFatPercentage < 21) category = 'Athletes';
      else if (bodyFatPercentage < 25) category = 'Fitness';
      else if (bodyFatPercentage < 32) category = 'Average';
      else category = 'Obese';
    }
    
    const result = {
      bodyFatPercentage: parseFloat(bodyFatPercentage.toFixed(1)),
      bodyFatMass: parseFloat(bodyFatMass.toFixed(1)),
      leanBodyMass: parseFloat(leanBodyMass.toFixed(1)),
      category,
      method: 'US Navy Method'
    };
    
    await saveCalculation('body-fat', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Navy Body Fat Calculator
exports.calculateNavyBodyFat = async (req, res) => {
  try {
    const { gender, height, neck, waist, hip, unit } = req.body;
    
    let heightInCm, neckInCm, waistInCm, hipInCm;
    
    if (unit === 'us') {
      heightInCm = parseFloat(height) * 2.54;
      neckInCm = parseFloat(neck) * 2.54;
      waistInCm = parseFloat(waist) * 2.54;
      hipInCm = hip ? parseFloat(hip) * 2.54 : 0;
    } else {
      heightInCm = parseFloat(height);
      neckInCm = parseFloat(neck);
      waistInCm = parseFloat(waist);
      hipInCm = hip ? parseFloat(hip) : 0;
    }
    
    let bodyFatPercentage;
    
    if (gender === 'male') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistInCm - neckInCm) + 0.15456 * Math.log10(heightInCm)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistInCm + hipInCm - neckInCm) + 0.22100 * Math.log10(heightInCm)) - 450;
    }
    
    const result = {
      bodyFatPercentage: parseFloat(bodyFatPercentage.toFixed(1)),
      method: 'US Navy Method'
    };
    
    await saveCalculation('navy-body-fat', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Army Body Fat Calculator
exports.calculateArmyBodyFat = async (req, res) => {
  try {
    const { gender, height, neck, waist, hip, unit } = req.body;
    
    let heightInInches, neckInInches, waistInInches, hipInInches;
    
    if (unit === 'us') {
      heightInInches = parseFloat(height);
      neckInInches = parseFloat(neck);
      waistInInches = parseFloat(waist);
      hipInInches = hip ? parseFloat(hip) : 0;
    } else {
      heightInInches = parseFloat(height) / 2.54;
      neckInInches = parseFloat(neck) / 2.54;
      waistInInches = parseFloat(waist) / 2.54;
      hipInInches = hip ? parseFloat(hip) / 2.54 : 0;
    }
    
    let bodyFatPercentage;
    
    // Army formula (similar to Navy but with slight differences)
    if (gender === 'male') {
      bodyFatPercentage = 86.010 * Math.log10(waistInInches - neckInInches) - 70.041 * Math.log10(heightInInches) + 36.76;
    } else {
      bodyFatPercentage = 163.205 * Math.log10(waistInInches + hipInInches - neckInInches) - 97.684 * Math.log10(heightInInches) - 78.387;
    }
    
    const result = {
      bodyFatPercentage: parseFloat(bodyFatPercentage.toFixed(1)),
      method: 'US Army Method'
    };
    
    await saveCalculation('army-body-fat', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lean Body Mass Calculator
exports.calculateLeanBodyMass = async (req, res) => {
  try {
    const { gender, weight, height, unit } = req.body;
    
    let weightInKg, heightInCm;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
      heightInCm = parseFloat(height) * 2.54;
    } else {
      weightInKg = parseFloat(weight);
      heightInCm = parseFloat(height);
    }
    
    // Boer Formula
    let leanBodyMassBoer;
    if (gender === 'male') {
      leanBodyMassBoer = (0.407 * weightInKg) + (0.267 * heightInCm) - 19.2;
    } else {
      leanBodyMassBoer = (0.252 * weightInKg) + (0.473 * heightInCm) - 48.3;
    }
    
    // James Formula
    let leanBodyMassJames;
    if (gender === 'male') {
      leanBodyMassJames = (1.10 * weightInKg) - 128 * Math.pow(weightInKg / heightInCm, 2);
    } else {
      leanBodyMassJames = (1.07 * weightInKg) - 148 * Math.pow(weightInKg / heightInCm, 2);
    }
    
    const result = {
      leanBodyMass: parseFloat(leanBodyMassBoer.toFixed(1)),
      leanBodyMassBoer: parseFloat(leanBodyMassBoer.toFixed(1)),
      leanBodyMassJames: parseFloat(leanBodyMassJames.toFixed(1)),
      fatMass: parseFloat((weightInKg - leanBodyMassBoer).toFixed(1)),
      unit: unit === 'us' ? 'lbs' : 'kg'
    };
    
    await saveCalculation('lean-body-mass', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ideal Weight Calculator
exports.calculateIdealWeight = async (req, res) => {
  try {
    const { gender, height, unit } = req.body;
    
    let heightInCm, heightInInches;
    
    if (unit === 'us') {
      heightInInches = parseFloat(height);
      heightInCm = heightInInches * 2.54;
    } else {
      heightInCm = parseFloat(height);
      heightInInches = heightInCm / 2.54;
    }
    
    // Robinson Formula (1983)
    let robinsonWeight;
    if (gender === 'male') {
      robinsonWeight = 52 + 1.9 * (heightInInches - 60);
    } else {
      robinsonWeight = 49 + 1.7 * (heightInInches - 60);
    }
    
    // Miller Formula (1983)
    let millerWeight;
    if (gender === 'male') {
      millerWeight = 56.2 + 1.41 * (heightInInches - 60);
    } else {
      millerWeight = 53.1 + 1.36 * (heightInInches - 60);
    }
    
    // Devine Formula (1974)
    let devineWeight;
    if (gender === 'male') {
      devineWeight = 50 + 2.3 * (heightInInches - 60);
    } else {
      devineWeight = 45.5 + 2.3 * (heightInInches - 60);
    }
    
    // Hamwi Formula (1964)
    let hamwiWeight;
    if (gender === 'male') {
      hamwiWeight = 48 + 2.7 * (heightInInches - 60);
    } else {
      hamwiWeight = 45.5 + 2.2 * (heightInInches - 60);
    }
    
    const average = (robinsonWeight + millerWeight + devineWeight + hamwiWeight) / 4;
    
    const result = {
      idealWeight: parseFloat(average.toFixed(1)),
      robinsonWeight: parseFloat(robinsonWeight.toFixed(1)),
      millerWeight: parseFloat(millerWeight.toFixed(1)),
      devineWeight: parseFloat(devineWeight.toFixed(1)),
      hamwiWeight: parseFloat(hamwiWeight.toFixed(1)),
      unit: 'kg',
      range: {
        min: parseFloat((average * 0.9).toFixed(1)),
        max: parseFloat((average * 1.1).toFixed(1))
      }
    };
    
    await saveCalculation('ideal-weight', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Healthy Weight Calculator
exports.calculateHealthyWeight = async (req, res) => {
  try {
    const { height, unit } = req.body;
    
    let heightInMeters;
    
    if (unit === 'us') {
      heightInMeters = parseFloat(height) * 0.0254;
    } else {
      heightInMeters = parseFloat(height) / 100;
    }
    
    // BMI range 18.5 - 24.9 is considered healthy
    const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyWeight = 24.9 * (heightInMeters * heightInMeters);
    const idealWeight = 22 * (heightInMeters * heightInMeters);
    
    const result = {
      minHealthyWeight: parseFloat(minHealthyWeight.toFixed(1)),
      maxHealthyWeight: parseFloat(maxHealthyWeight.toFixed(1)),
      idealWeight: parseFloat(idealWeight.toFixed(1)),
      unit: 'kg',
      range: `${minHealthyWeight.toFixed(1)} - ${maxHealthyWeight.toFixed(1)} kg`
    };
    
    if (unit === 'us') {
      result.minHealthyWeight = parseFloat((minHealthyWeight * 2.20462).toFixed(1));
      result.maxHealthyWeight = parseFloat((maxHealthyWeight * 2.20462).toFixed(1));
      result.idealWeight = parseFloat((idealWeight * 2.20462).toFixed(1));
      result.unit = 'lbs';
      result.range = `${result.minHealthyWeight} - ${result.maxHealthyWeight} lbs`;
    }
    
    await saveCalculation('healthy-weight', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Macro Calculator
exports.calculateMacro = async (req, res) => {
  try {
    const { age, gender, weight, height, activityLevel, goal, dietType, unit } = req.body;
    
    let weightInKg, heightInCm;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
      heightInCm = parseFloat(height) * 2.54;
    } else {
      weightInKg = parseFloat(weight);
      heightInCm = parseFloat(height);
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation (most accurate)
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseFloat(age)) + 5;
    } else {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseFloat(age)) - 161;
    }
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    let tdee = bmr * (activityMultipliers[activityLevel] || 1.2);
    
    // Adjust for goal
    let targetCalories = tdee;
    if (goal === 'lose') targetCalories = tdee - 500; // 500 cal deficit for ~1 lb/week loss
    else if (goal === 'gain') targetCalories = tdee + 500; // 500 cal surplus for ~1 lb/week gain
    
    // Macro split based on diet type and goal
    let proteinPercentage, carbPercentage, fatPercentage;
    
    // Higher protein for weight loss to preserve muscle
    if (goal === 'lose') {
      proteinPercentage = 0.35; // 35%
      carbPercentage = 0.35; // 35%
      fatPercentage = 0.30; // 30%
    } else if (goal === 'gain') {
      proteinPercentage = 0.30; // 30%
      carbPercentage = 0.40; // 40%
      fatPercentage = 0.30; // 30%
    } else {
      proteinPercentage = 0.30; // 30%
      carbPercentage = 0.40; // 40%
      fatPercentage = 0.30; // 30%
    }
    
    // Adjust for diet type if provided
    if (dietType === 'keto') {
      proteinPercentage = 0.25;
      carbPercentage = 0.05;
      fatPercentage = 0.70;
    } else if (dietType === 'lowcarb') {
      proteinPercentage = 0.30;
      carbPercentage = 0.20;
      fatPercentage = 0.50;
    } else if (dietType === 'highcarb') {
      proteinPercentage = 0.20;
      carbPercentage = 0.60;
      fatPercentage = 0.20;
    }
    
    const proteinGrams = Math.round((targetCalories * proteinPercentage) / 4); // 4 cal/g
    const carbGrams = Math.round((targetCalories * carbPercentage) / 4); // 4 cal/g
    const fatGrams = Math.round((targetCalories * fatPercentage) / 9); // 9 cal/g
    
    const result = {
      calories: Math.round(targetCalories),
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams,
      proteinPercentage: Math.round(proteinPercentage * 100),
      carbPercentage: Math.round(carbPercentage * 100),
      fatPercentage: Math.round(fatPercentage * 100),
      proteinCalories: proteinGrams * 4,
      carbCalories: carbGrams * 4,
      fatCalories: fatGrams * 9,
      mealsBreakdown: {
        perMeal3: {
          protein: Math.round(proteinGrams / 3),
          carbs: Math.round(carbGrams / 3),
          fat: Math.round(fatGrams / 3)
        },
        perMeal4: {
          protein: Math.round(proteinGrams / 4),
          carbs: Math.round(carbGrams / 4),
          fat: Math.round(fatGrams / 4)
        }
      }
    };
    
    await saveCalculation('macro', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    console.error('Macro calculation error:', error);
    res.status(400).json({ error: error.message || 'Failed to calculate macros' });
  }
};

// Protein Calculator
exports.calculateProtein = async (req, res) => {
  try {
    const { age, gender, height, weight, activityLevel, goal, unit } = req.body;
    
    let weightInKg;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
    } else {
      weightInKg = parseFloat(weight);
    }
    
    // Protein requirements in grams per kg body weight (based on research)
    let proteinMultiplier = 0.8; // RDA baseline for sedentary adults
    
    // Adjust based on activity level
    if (activityLevel === 'sedentary') {
      proteinMultiplier = 0.8; // RDA minimum
    } else if (activityLevel === 'light') {
      proteinMultiplier = 1.0; // Light activity
    } else if (activityLevel === 'moderate') {
      proteinMultiplier = 1.3; // Regular exercise
    } else if (activityLevel === 'active') {
      proteinMultiplier = 1.6; // Heavy training
    } else if (activityLevel === 'veryActive') {
      proteinMultiplier = 1.8; // Athlete level
    }
    
    // Adjust for goal
    if (goal === 'lose') {
      proteinMultiplier = Math.max(proteinMultiplier, 1.6); // Higher protein prevents muscle loss
    } else if (goal === 'gain') {
      proteinMultiplier = Math.max(proteinMultiplier, 1.6); // Higher protein supports muscle growth
    }
    
    const proteinGrams = weightInKg * proteinMultiplier;
    const minProtein = weightInKg * 0.8; // RDA minimum
    const maxProtein = weightInKg * 2.2; // Upper safe limit for active individuals
    
    // Calculate protein distribution
    const protein3Meals = Math.round(proteinGrams / 3);
    const protein4Meals = Math.round(proteinGrams / 4);
    const protein5Meals = Math.round(proteinGrams / 5);
    
    const result = {
      dailyProtein: Math.round(proteinGrams),
      proteinCalories: Math.round(proteinGrams * 4),
      proteinPerKg: proteinMultiplier.toFixed(1),
      minProtein: Math.round(minProtein),
      maxProtein: Math.round(maxProtein),
      mealDistribution: {
        threeMeals: protein3Meals,
        fourMeals: protein4Meals,
        fiveMeals: protein5Meals,
        perSnack: Math.round(proteinGrams * 0.15) // 15% for snacks
      },
      recommendations: {
        minimum: Math.round(weightInKg * 0.8),
        moderate: Math.round(weightInKg * 1.2),
        high: Math.round(weightInKg * 1.6),
        athlete: Math.round(weightInKg * 2.0)
      },
      timing: {
        postWorkout: Math.round(weightInKg * 0.25), // 0.25g/kg within 2 hours
        preBed: Math.round(weightInKg * 0.25), // Casein before bed for muscle preservation
        breakfast: protein3Meals // Important for muscle protein synthesis
      },
      sources: [
        `Chicken breast: ${Math.round(proteinGrams / 0.31)}g (31g protein/100g)`,
        `Greek yogurt: ${Math.round(proteinGrams / 0.10)}g (10g protein/100g)`,
        `Eggs: ${Math.round(proteinGrams / 6)} eggs (6g protein/egg)`,
        `Whey protein: ${Math.round(proteinGrams / 25)} scoops (25g protein/scoop)`
      ]
    };
    
    await saveCalculation('protein', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    console.error('Protein calculation error:', error);
    res.status(400).json({ error: error.message || 'Failed to calculate protein' });
  }
};

// Carbohydrate Calculator
exports.calculateCarbohydrate = async (req, res) => {
  try {
    const { weight, activityLevel, goal, dietType, unit } = req.body;
    
    let weightInKg;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
    } else {
      weightInKg = parseFloat(weight);
    }
    
    // Base carb requirements in grams per kg body weight
    let carbMultiplier = 3; // Baseline for sedentary
    
    // Adjust based on activity level (primary factor)
    if (activityLevel === 'sedentary') {
      carbMultiplier = 3; // Low activity
    } else if (activityLevel === 'light') {
      carbMultiplier = 4; // Light exercise
    } else if (activityLevel === 'moderate') {
      carbMultiplier = 5; // Moderate exercise
    } else if (activityLevel === 'active') {
      carbMultiplier = 6; // Active training
    } else if (activityLevel === 'veryactive' || activityLevel === 'veryActive') {
      carbMultiplier = 7; // Heavy training
    } else if (activityLevel === 'athlete') {
      carbMultiplier = 8; // Athlete level
    }
    
    // Adjust for goal
    if (goal === 'weightloss' || goal === 'lose') {
      carbMultiplier *= 0.7; // Reduce carbs for fat loss
    } else if (goal === 'musclegain' || goal === 'gain') {
      carbMultiplier *= 1.2; // Increase carbs for muscle gain
    }
    
    // Adjust for diet type (overrides previous adjustments)
    if (dietType === 'keto') {
      carbMultiplier = 0.5; // Very low carb: 20-50g total
    } else if (dietType === 'lowcarb') {
      carbMultiplier = 1.5; // Low carb: 50-150g
    } else if (dietType === 'highcarb') {
      carbMultiplier = Math.max(carbMultiplier * 1.4, 6); // High carb for athletes
    } else if (dietType === 'balanced') {
      // Use calculated value based on activity/goal
    }
    
    const carbGrams = weightInKg * carbMultiplier;
    
    // Calculate carb distribution
    const preworkoutCarbs = Math.round(carbGrams * 0.25); // 25% pre-workout
    const postworkoutCarbs = Math.round(carbGrams * 0.35); // 35% post-workout
    const otherMealsCarbs = Math.round(carbGrams * 0.40); // 40% other meals
    
    let dietTypeDescription = 'Balanced';
    let percentOfCalories = '45-65%';
    
    if (dietType === 'keto') {
      dietTypeDescription = 'Ketogenic (Very Low Carb)';
      percentOfCalories = '5-10%';
    } else if (dietType === 'lowcarb') {
      dietTypeDescription = 'Low Carb';
      percentOfCalories = '10-25%';
    } else if (dietType === 'highcarb') {
      dietTypeDescription = 'High Carb';
      percentOfCalories = '55-70%';
    }
    
    const result = {
      dailyCarbs: Math.round(carbGrams),
      carbCalories: Math.round(carbGrams * 4),
      carbsPerKg: carbMultiplier.toFixed(1),
      dietType: dietTypeDescription,
      percentOfCalories,
      mealDistribution: {
        perMeal3: Math.round(carbGrams / 3),
        perMeal4: Math.round(carbGrams / 4),
        preworkout: preworkoutCarbs,
        postworkout: postworkoutCarbs,
        otherMeals: otherMealsCarbs
      },
      recommendations: {
        veryLow: Math.round(weightInKg * 0.5), // Keto
        low: Math.round(weightInKg * 2), // Low carb
        moderate: Math.round(weightInKg * 4), // Moderate
        high: Math.round(weightInKg * 6), // Active
        veryHigh: Math.round(weightInKg * 8) // Athlete
      },
      timing: {
        preWorkout: `${preworkoutCarbs}g 1-2 hours before exercise`,
        postWorkout: `${postworkoutCarbs}g within 30-60 minutes after exercise`,
        beforeBed: 'Avoid high-carb meals to optimize fat burning during sleep'
      },
      sources: [
        `White rice: ${Math.round(carbGrams / 0.28)}g (28g carbs/100g)`,
        `Sweet potato: ${Math.round(carbGrams / 0.20)}g (20g carbs/100g)`,
        `Oats: ${Math.round(carbGrams / 0.66)}g (66g carbs/100g)`,
        `Banana: ${Math.round(carbGrams / 23)} bananas (23g carbs each)`
      ]
    };
    
    await saveCalculation('carbohydrate', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    console.error('Carbohydrate calculation error:', error);
    res.status(400).json({ error: error.message || 'Failed to calculate carbohydrates' });
  }
};

// Fat Intake Calculator
exports.calculateFatIntake = async (req, res) => {
  try {
    const { calories, dietType, goal, cholesterol, unit } = req.body;
    
    console.log('Fat Intake Calculator - Request body:', req.body);
    
    // Validate required fields
    if (!calories || isNaN(parseFloat(calories))) {
      throw new Error('Valid calories value is required');
    }
    
    const dailyCalories = parseFloat(calories);
    
    // Fat percentage based on diet type (evidence-based ranges)
    let fatPercentage = 0.30; // Default 30%
    
    if (dietType === 'keto') {
      fatPercentage = 0.70; // 70-75% for ketosis
    } else if (dietType === 'lowfat') {
      fatPercentage = 0.20; // 20% low-fat diet
    } else if (dietType === 'mediterranean') {
      fatPercentage = 0.35; // 35% Mediterranean diet
    } else if (dietType === 'balanced') {
      fatPercentage = 0.30; // 25-35% balanced
    }
    
    // Adjust for goal
    if (goal === 'weightloss' || goal === 'lose') {
      fatPercentage = Math.max(fatPercentage * 0.85, 0.20); // Reduce but keep minimum
    } else if (goal === 'musclegain' || goal === 'gain') {
      fatPercentage = Math.min(fatPercentage * 1.1, 0.40); // Increase but cap at 40%
    }
    
    const fatCalories = dailyCalories * fatPercentage;
    const fatGrams = fatCalories / 9; // 9 calories per gram of fat
    
    // Calculate saturated fat limit (AHA recommends <10% of calories, <7% if high cholesterol)
    const saturatedFatLimit = cholesterol === 'high' || cholesterol === 'veryhigh'
      ? (dailyCalories * 0.06) / 9 // 6% for high cholesterol
      : (dailyCalories * 0.10) / 9; // 10% for normal
    
    // Calculate unsaturated fat (the healthy fats)
    const unsaturatedFat = fatGrams - saturatedFatLimit;
    
    // Monounsaturated (should be majority of unsaturated)
    const monounsaturated = unsaturatedFat * 0.60; // 60% of unsaturated
    
    // Polyunsaturated (includes omega-3 and omega-6)
    const polyunsaturated = unsaturatedFat * 0.40; // 40% of unsaturated
    
    // Omega-3 recommendation (AHA: at least 500mg EPA+DHA daily = ~1.5-2g total omega-3)
    const omega3 = 2; // grams per day minimum
    
    // Trans fat should be 0 (mention in recommendations)
    
    let dietTypeDescription = 'Balanced';
    if (dietType === 'keto') dietTypeDescription = 'Ketogenic (Very High Fat)';
    else if (dietType === 'lowfat') dietTypeDescription = 'Low Fat';
    else if (dietType === 'mediterranean') dietTypeDescription = 'Mediterranean';
    
    const result = {
      totalFat: Math.round(fatGrams),
      fatCalories: Math.round(fatCalories),
      fatPercentage: Math.round(fatPercentage * 100),
      dietType: dietTypeDescription,
      fatTypes: {
        saturated: Math.round(saturatedFatLimit),
        saturatedMax: Math.round(saturatedFatLimit),
        unsaturated: Math.round(unsaturatedFat),
        monounsaturated: Math.round(monounsaturated),
        polyunsaturated: Math.round(polyunsaturated),
        omega3: omega3,
        omega6: Math.round(polyunsaturated - omega3),
        transFat: 0 // Should be avoided
      },
      mealDistribution: {
        perMeal3: Math.round(fatGrams / 3),
        perMeal4: Math.round(fatGrams / 4),
        snacks: Math.round(fatGrams * 0.15) // 15% for snacks
      },
      recommendations: {
        minimum: Math.round(dailyCalories * 0.20 / 9), // 20% minimum for hormone health
        moderate: Math.round(dailyCalories * 0.30 / 9), // 30% balanced
        high: Math.round(dailyCalories * 0.40 / 9), // 40% higher fat diets
        keto: Math.round(dailyCalories * 0.70 / 9) // 70% ketogenic
      },
      healthyFatSources: [
        `Avocado: ${Math.round(monounsaturated / 15)} medium (15g fat each)`,
        `Olive oil: ${Math.round(fatGrams / 14)} tbsp (14g fat/tbsp)`,
        `Almonds: ${Math.round(fatGrams / 14)} oz (14g fat/oz)`,
        `Salmon: ${Math.round(omega3 / 1.5)} servings (1.5g omega-3/serving)`
      ],
      warnings: cholesterol === 'high' || cholesterol === 'veryhigh' ? [
        'Limit saturated fat to <6% of calories',
        'Avoid trans fats completely',
        'Focus on omega-3 rich foods',
        'Consult healthcare provider for personalized advice'
      ] : [
        'Avoid trans fats (partially hydrogenated oils)',
        'Prioritize monounsaturated and polyunsaturated fats',
        'Include omega-3 rich foods (fatty fish, walnuts, flaxseed)'
      ]
    };
    
    await saveCalculation('fat-intake', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    console.error('Fat intake calculation error:', error);
    res.status(400).json({ error: error.message || 'Failed to calculate fat intake' });
  }
};

// Calories Burned Calculator
exports.calculateCaloriesBurned = async (req, res) => {
  try {
    const { activity, duration, weight, unit } = req.body;
    
    let weightInKg;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
    } else {
      weightInKg = parseFloat(weight);
    }
    
    // MET values for common activities (updated to match frontend)
    const metValues = {
      walking: 3.5,
      running: 9.8, // 6 mph
      cycling: 7.5,
      swimming: 8.0,
      yoga: 3.0,
      hiit: 12.0,
      weightlifting: 6.0,
      dancing: 5.0,
      basketball: 8.0,
      soccer: 10.0,
      tennis: 7.3,
      hiking: 6.0,
      rowing: 7.0,
      jumping: 12.3
    };
    
    const met = metValues[activity] || 5.0;
    const durationInHours = parseFloat(duration) / 60;
    const caloriesBurned = met * weightInKg * durationInHours;
    
    const result = {
      caloriesBurned: Math.round(caloriesBurned),
      activity,
      duration: parseFloat(duration),
      met,
      caloriesPerMinute: Math.round((caloriesBurned / parseFloat(duration)) * 10) / 10,
      estimatedFor: {
        '15min': Math.round(met * weightInKg * 0.25),
        '30min': Math.round(met * weightInKg * 0.5),
        '60min': Math.round(met * weightInKg * 1.0)
      }
    };
    
    await saveCalculation('calories-burned', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    console.error('Calories burned calculation error:', error);
    res.status(400).json({ error: error.message || 'Failed to calculate calories burned' });
  }
};

// One Rep Max Calculator
exports.calculateOneRepMax = async (req, res) => {
  try {
    const { weight, reps, unit } = req.body;
    
    const weightValue = parseFloat(weight);
    const repsValue = parseInt(reps);
    
    // Epley Formula
    const epley = weightValue * (1 + repsValue / 30);
    
    // Brzycki Formula
    const brzycki = weightValue * (36 / (37 - repsValue));
    
    // Lander Formula
    const lander = (100 * weightValue) / (101.3 - 2.67123 * repsValue);
    
    // Lombardi Formula
    const lombardi = weightValue * Math.pow(repsValue, 0.10);
    
    const average = (epley + brzycki + lander + lombardi) / 4;
    
    const result = {
      oneRepMax: Math.round(average),
      epley: Math.round(epley),
      brzycki: Math.round(brzycki),
      lander: Math.round(lander),
      lombardi: Math.round(lombardi),
      unit: unit || 'lbs',
      percentages: {
        '95%': Math.round(average * 0.95),
        '90%': Math.round(average * 0.90),
        '85%': Math.round(average * 0.85),
        '80%': Math.round(average * 0.80),
        '75%': Math.round(average * 0.75),
        '70%': Math.round(average * 0.70)
      }
    };
    
    await saveCalculation('one-rep-max', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Pace Calculator
exports.calculatePace = async (req, res) => {
  try {
    const { distance, hours, minutes, seconds, unit } = req.body;
    
    const distanceValue = parseFloat(distance);
    const totalSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    
    // Calculate pace (time per unit distance)
    const paceSecondsPerUnit = totalSeconds / distanceValue;
    const paceMinutes = Math.floor(paceSecondsPerUnit / 60);
    const paceSeconds = Math.round(paceSecondsPerUnit % 60);
    
    // Calculate speed
    const hoursDecimal = totalSeconds / 3600;
    const speed = distanceValue / hoursDecimal;
    
    const result = {
      pace: `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`,
      paceMinutes,
      paceSeconds,
      speed: parseFloat(speed.toFixed(2)),
      unit: unit || 'km'
    };
    
    await saveCalculation('pace', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Target Heart Rate Calculator
exports.calculateTargetHeartRate = async (req, res) => {
  try {
    const { age, restingHeartRate } = req.body;
    
    const ageValue = parseInt(age);
    const restingHR = parseInt(restingHeartRate) || 70;
    
    // Maximum Heart Rate (220 - age)
    const maxHeartRate = 220 - ageValue;
    
    // Heart Rate Reserve (HRR) = Max HR - Resting HR
    const heartRateReserve = maxHeartRate - restingHR;
    
    // Calculate target zones using Karvonen Formula
    const zones = [
      {
        min: Math.round(restingHR + heartRateReserve * 0.50),
        max: Math.round(restingHR + heartRateReserve * 0.60),
        name: 'Zone 1: Very Light',
        intensity: '50-60% of Maximum',
        description: 'Warm-up and recovery. Very comfortable, able to hold a conversation easily. Good for beginners and recovery days.'
      },
      {
        min: Math.round(restingHR + heartRateReserve * 0.60),
        max: Math.round(restingHR + heartRateReserve * 0.70),
        name: 'Zone 2: Light',
        intensity: '60-70% of Maximum',
        description: 'Fat burning zone. Comfortable pace for longer duration. Improves basic endurance and fat metabolism.'
      },
      {
        min: Math.round(restingHR + heartRateReserve * 0.70),
        max: Math.round(restingHR + heartRateReserve * 0.80),
        name: 'Zone 3: Moderate',
        intensity: '70-80% of Maximum',
        description: 'Aerobic zone. Breathing becomes harder but still controlled. Improves cardiovascular efficiency.'
      },
      {
        min: Math.round(restingHR + heartRateReserve * 0.80),
        max: Math.round(restingHR + heartRateReserve * 0.90),
        name: 'Zone 4: Hard',
        intensity: '80-90% of Maximum',
        description: 'Anaerobic zone. Difficult to maintain conversation. Improves speed and power. Use for interval training.'
      },
      {
        min: Math.round(restingHR + heartRateReserve * 0.90),
        max: maxHeartRate,
        name: 'Zone 5: Maximum',
        intensity: '90-100% of Maximum',
        description: 'Maximum effort. Very hard to breathe. Only sustainable for short bursts. Use for high-intensity intervals.'
      }
    ];
    
    const result = {
      maxHeartRate,
      restingHeartRate: restingHR,
      heartRateReserve,
      zones
    };
    
    await saveCalculation('target-heart-rate', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Body Type Calculator
exports.calculateBodyType = async (req, res) => {
  try {
    const { gender, height, weight, wrist, ankle, unit } = req.body;
    
    console.log('Body Type Calculator - Request body:', req.body);
    
    // Validate required fields
    if (!gender || !height || !weight || !wrist || !ankle) {
      throw new Error('All measurements are required: gender, height, weight, wrist, ankle');
    }
    
    // Convert to metric if needed
    let heightCm, weightKg, wristCm, ankleCm;
    
    if (unit === 'us') {
      heightCm = parseFloat(height) * 2.54;
      weightKg = parseFloat(weight) * 0.453592;
      wristCm = parseFloat(wrist) * 2.54;
      ankleCm = parseFloat(ankle) * 2.54;
    } else {
      heightCm = parseFloat(height);
      weightKg = parseFloat(weight);
      wristCm = parseFloat(wrist);
      ankleCm = parseFloat(ankle);
    }
    
    // Calculate body frame based on wrist circumference and height
    let frameSize = 'Medium';
    const heightInInches = heightCm / 2.54;
    const wristInInches = wristCm / 2.54;
    
    if (gender === 'male') {
      if (heightInInches > 65) {
        if (wristInInches < 6.5) frameSize = 'Small';
        else if (wristInInches > 7.5) frameSize = 'Large';
      } else {
        if (wristInInches < 6) frameSize = 'Small';
        else if (wristInInches > 7) frameSize = 'Large';
      }
    } else {
      if (heightInInches > 65) {
        if (wristInInches < 6) frameSize = 'Small';
        else if (wristInInches > 6.5) frameSize = 'Large';
      } else {
        if (wristInInches < 5.5) frameSize = 'Small';
        else if (wristInInches > 6) frameSize = 'Large';
      }
    }
    
    // Determine somatotype based on measurements
    const bmi = weightKg / ((heightCm / 100) ** 2);
    const ankleCmNormalized = ankleCm / (heightCm / 100); // Ankle relative to height
    const wristCmNormalized = wristCm / (heightCm / 100);
    
    let somatotype = 'Balanced Mesomorph';
    let description = '';
    
    // Simple classification based on frame and BMI
    if (frameSize === 'Small' && bmi < 23) {
      somatotype = 'Ectomorph';
      description = 'Naturally lean with fast metabolism. Difficulty gaining weight and muscle.';
    } else if (frameSize === 'Large' && bmi > 25) {
      somatotype = 'Endomorph';
      description = 'Naturally broader build with slower metabolism. Tends to gain weight easily.';
    } else if (frameSize === 'Medium' || (bmi >= 23 && bmi <= 25)) {
      somatotype = 'Mesomorph';
      description = 'Athletic build with balanced metabolism. Gains muscle relatively easily.';
    } else if (frameSize === 'Small' && bmi >= 23) {
      somatotype = 'Ecto-Mesomorph';
      description = 'Lean frame with some muscle mass. Moderate metabolism.';
    } else {
      somatotype = 'Meso-Endomorph';
      description = 'Muscular build with tendency to store fat. Responds well to exercise.';
    }
    
    const result = {
      somatotype,
      frameSize,
      description,
      bmi: parseFloat(bmi.toFixed(1)),
      measurements: {
        wrist: parseFloat(wristCm.toFixed(1)),
        ankle: parseFloat(ankleCm.toFixed(1)),
        height: parseFloat(heightCm.toFixed(1)),
        weight: parseFloat(weightKg.toFixed(1))
      },
      characteristics: getSomatotypeCharacteristics(somatotype)
    };
    
    await saveCalculation('body-type', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    console.error('Body type calculation error:', error);
    res.status(400).json({ error: error.message || 'Failed to calculate body type' });
  }
};

// Helper function for somatotype characteristics
function getSomatotypeCharacteristics(type) {
  const characteristics = {
    'Ectomorph': {
      training: 'Focus on compound lifts, lower rep ranges (5-8), longer rest periods',
      nutrition: 'High calorie surplus, 3-4g carbs/kg, calorie-dense foods',
      cardio: 'Minimal - 1-2 sessions per week maximum'
    },
    'Mesomorph': {
      training: 'Balanced approach, moderate volume, mix of compound and isolation',
      nutrition: 'Moderate calories, balanced macros, 2-3g carbs/kg',
      cardio: 'Moderate - 2-3 sessions per week'
    },
    'Endomorph': {
      training: 'Higher volume, moderate weights, shorter rest periods',
      nutrition: 'Controlled calories, higher protein, 1-2g carbs/kg',
      cardio: 'Regular - 3-5 sessions per week'
    },
    'Ecto-Mesomorph': {
      training: 'Moderate volume with focus on progressive overload',
      nutrition: 'Slight calorie surplus, 2-3g carbs/kg',
      cardio: 'Light - 2-3 sessions per week'
    },
    'Meso-Endomorph': {
      training: 'Balanced volume with emphasis on compound movements',
      nutrition: 'Maintenance to slight deficit, 1.5-2.5g carbs/kg',
      cardio: 'Moderate - 3-4 sessions per week'
    },
    'Balanced Mesomorph': {
      training: 'Flexible approach based on goals',
      nutrition: 'Moderate calories, balanced macros',
      cardio: 'Moderate - 2-3 sessions per week'
    }
  };
  
  return characteristics[type] || characteristics['Balanced Mesomorph'];
}

// Body Surface Area Calculator
exports.calculateBodySurfaceArea = async (req, res) => {
  try {
    const { weight, height, formula, unit } = req.body;
    
    console.log('Body Surface Area Calculator - Request body:', req.body);
    
    let weightInKg, heightInCm;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
      heightInCm = parseFloat(height) * 2.54;
    } else {
      weightInKg = parseFloat(weight);
      heightInCm = parseFloat(height);
    }
    
    // Du Bois Formula (most commonly used)
    const bsaDuBois = 0.007184 * Math.pow(weightInKg, 0.425) * Math.pow(heightInCm, 0.725);
    
    // Mosteller Formula (simpler, widely accepted)
    const bsaMosteller = Math.sqrt((weightInKg * heightInCm) / 3600);
    
    // Haycock Formula (pediatric preference)
    const bsaHaycock = 0.024265 * Math.pow(weightInKg, 0.5378) * Math.pow(heightInCm, 0.3964);
    
    // Boyd Formula (older formula)
    const bsaBoyd = 0.0003207 * Math.pow(weightInKg * 1000, 0.7285 - 0.0188 * Math.log10(weightInKg * 1000)) * Math.pow(heightInCm, 0.3);
    
    // Determine which formula to use as primary
    let primaryBsa;
    let formulaName;
    
    switch (formula) {
      case 'mosteller':
        primaryBsa = bsaMosteller;
        formulaName = 'Mosteller';
        break;
      case 'haycock':
        primaryBsa = bsaHaycock;
        formulaName = 'Haycock';
        break;
      case 'boyd':
        primaryBsa = bsaBoyd;
        formulaName = 'Boyd';
        break;
      case 'dubois':
      default:
        primaryBsa = bsaDuBois;
        formulaName = 'Du Bois';
        break;
    }
    
    // BSA interpretation
    let interpretation = '';
    const averageBsa = 1.73; // Standard reference
    
    if (primaryBsa < 1.5) {
      interpretation = 'Below average - Typical for smaller individuals or children';
    } else if (primaryBsa < 1.9) {
      interpretation = 'Average - Within normal adult range';
    } else if (primaryBsa < 2.2) {
      interpretation = 'Above average - Typical for larger individuals';
    } else {
      interpretation = 'Significantly above average - Typical for very tall or heavy individuals';
    }
    
    const result = {
      bsa: parseFloat(primaryBsa.toFixed(2)),
      formula: formulaName,
      interpretation,
      unit: 'm²',
      allFormulas: {
        duBois: parseFloat(bsaDuBois.toFixed(2)),
        mosteller: parseFloat(bsaMosteller.toFixed(2)),
        haycock: parseFloat(bsaHaycock.toFixed(2)),
        boyd: parseFloat(bsaBoyd.toFixed(2))
      },
      medicalUses: [
        'Drug dosing calculations',
        'Chemotherapy dosing',
        'Burn assessment (Rule of Nines)',
        'Cardiac index determination',
        'Renal function normalization'
      ]
    };
    
    await saveCalculation('body-surface-area', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    console.error('Body Surface Area calculation error:', error);
    res.status(400).json({ error: error.message || 'Failed to calculate body surface area' });
  }
};

// GFR Calculator (Glomerular Filtration Rate)
exports.calculateGFR = async (req, res) => {
  try {
    const { age, gender, creatinine, creatinineUnit, race, formula } = req.body;
    
    console.log('GFR Calculator - Request body:', req.body);
    
    const ageValue = parseInt(age);
    let creatinineValue = parseFloat(creatinine);
    
    // Convert creatinine to mg/dL if needed
    if (creatinineUnit === 'umol/L') {
      creatinineValue = creatinineValue / 88.4; // Convert μmol/L to mg/dL
    }
    
    let gfr;
    
    // Use CKD-EPI formula (more accurate than MDRD)
    if (formula === 'ckd-epi' || !formula) {
      const kappa = gender === 'female' ? 0.7 : 0.9;
      const alpha = gender === 'female' ? -0.329 : -0.411;
      const genderMultiplier = gender === 'female' ? 1.018 : 1.0;
      const raceMultiplier = race === 'african-american' ? 1.159 : 1.0;
      
      const minValue = Math.min(creatinineValue / kappa, 1);
      const maxValue = Math.max(creatinineValue / kappa, 1);
      
      gfr = 141 * Math.pow(minValue, alpha) * Math.pow(maxValue, -1.209) * Math.pow(0.993, ageValue) * genderMultiplier * raceMultiplier;
    } else {
      // MDRD Formula (alternative)
      gfr = 175 * Math.pow(creatinineValue, -1.154) * Math.pow(ageValue, -0.203);
      
      if (gender === 'female') gfr *= 0.742;
      if (race === 'african-american') gfr *= 1.212;
    }
    
    let stage = '';
    let stageNumber = '';
    let description = '';
    let recommendation = '';
    
    if (gfr >= 90) {
      stage = 'G1';
      stageNumber = '1';
      description = 'Normal or high kidney function';
      recommendation = 'Maintain healthy lifestyle. Monitor kidney function annually.';
    } else if (gfr >= 60) {
      stage = 'G2';
      stageNumber = '2';
      description = 'Mild reduction in kidney function';
      recommendation = 'Monitor kidney function regularly. Control blood pressure and blood sugar.';
    } else if (gfr >= 45) {
      stage = 'G3a';
      stageNumber = '3a';
      description = 'Mild to moderate reduction in kidney function';
      recommendation = 'Consult a nephrologist. Monitor every 6 months. Review medications.';
    } else if (gfr >= 30) {
      stage = 'G3b';
      stageNumber = '3b';
      description = 'Moderate to severe reduction in kidney function';
      recommendation = 'Regular nephrology care. Monitor every 3-6 months. Diet modifications.';
    } else if (gfr >= 15) {
      stage = 'G4';
      stageNumber = '4';
      description = 'Severe reduction in kidney function';
      recommendation = 'Prepare for kidney replacement therapy. Nephrology care every 3 months.';
    } else {
      stage = 'G5';
      stageNumber = '5';
      description = 'Kidney failure (end-stage renal disease)';
      recommendation = 'Kidney replacement therapy (dialysis or transplant) needed.';
    }
    
    const result = {
      gfr: parseFloat(gfr.toFixed(1)),
      stage,
      stageNumber,
      description,
      recommendation,
      unit: 'mL/min/1.73m²',
      formula: formula || 'ckd-epi',
      creatinine: creatinineValue.toFixed(2),
      creatinineUnit: 'mg/dL'
    };
    
    await saveCalculation('gfr', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    console.error('GFR calculation error:', error);
    res.status(400).json({ error: error.message || 'Failed to calculate GFR' });
  }
};

// Pregnancy Due Date Calculator
exports.calculatePregnancyDueDate = async (req, res) => {
  try {
    const { lastPeriodDate } = req.body;
    
    const lmpDate = new Date(lastPeriodDate);
    
    // Add 280 days (40 weeks)
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    
    // Calculate current week
    const today = new Date();
    const daysSinceLMP = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysSinceLMP / 7);
    const currentDay = daysSinceLMP % 7;
    
    // Calculate trimesters
    const firstTrimesterEnd = new Date(lmpDate);
    firstTrimesterEnd.setDate(firstTrimesterEnd.getDate() + 91);
    
    const secondTrimesterEnd = new Date(lmpDate);
    secondTrimesterEnd.setDate(secondTrimesterEnd.getDate() + 182);
    
    const result = {
      dueDate: dueDate.toISOString().split('T')[0],
      currentWeek,
      currentDay,
      trimester: currentWeek < 13 ? 1 : currentWeek < 27 ? 2 : 3,
      firstTrimesterEnd: firstTrimesterEnd.toISOString().split('T')[0],
      secondTrimesterEnd: secondTrimesterEnd.toISOString().split('T')[0],
      daysRemaining: Math.floor((dueDate - today) / (1000 * 60 * 60 * 24))
    };
    
    await saveCalculation('pregnancy-due-date', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Pregnancy Weight Gain Calculator
exports.calculatePregnancyWeightGain = async (req, res) => {
  try {
    const { prePregnancyWeight, height, currentWeight, weeksPregnant, unit } = req.body;
    
    let weightInKg, heightInMeters;
    
    if (unit === 'us') {
      weightInKg = parseFloat(prePregnancyWeight) * 0.453592;
      heightInMeters = parseFloat(height) * 0.0254;
    } else {
      weightInKg = parseFloat(prePregnancyWeight);
      heightInMeters = parseFloat(height) / 100;
    }
    
    // Calculate pre-pregnancy BMI
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    // Determine weight gain recommendations based on BMI
    let minGain, maxGain, category;
    
    if (bmi < 18.5) {
      category = 'Underweight';
      minGain = 28;
      maxGain = 40;
    } else if (bmi < 25) {
      category = 'Normal';
      minGain = 25;
      maxGain = 35;
    } else if (bmi < 30) {
      category = 'Overweight';
      minGain = 15;
      maxGain = 25;
    } else {
      category = 'Obese';
      minGain = 11;
      maxGain = 20;
    }
    
    // Calculate current gain
    const currentGain = parseFloat(currentWeight) - parseFloat(prePregnancyWeight);
    
    // Calculate expected gain for current week
    const weeks = parseInt(weeksPregnant);
    const expectedMinGain = (minGain / 40) * weeks;
    const expectedMaxGain = (maxGain / 40) * weeks;
    
    const result = {
      prePregnancyBMI: parseFloat(bmi.toFixed(1)),
      category,
      recommendedGain: {
        min: minGain,
        max: maxGain,
        unit: 'lbs'
      },
      currentGain: parseFloat(currentGain.toFixed(1)),
      expectedGainForWeek: {
        min: parseFloat(expectedMinGain.toFixed(1)),
        max: parseFloat(expectedMaxGain.toFixed(1))
      },
      onTrack: currentGain >= expectedMinGain && currentGain <= expectedMaxGain
    };
    
    await saveCalculation('pregnancy-weight-gain', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Pregnancy Week Calculator
exports.calculatePregnancyWeek = async (req, res) => {
  try {
    const { lastPeriodDate } = req.body;
    
    const lmpDate = new Date(lastPeriodDate);
    const today = new Date();
    
    const daysSinceLMP = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysSinceLMP / 7);
    const currentDay = daysSinceLMP % 7;
    
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    
    const result = {
      weeksPregnant: currentWeek,
      daysIntoWeek: currentDay,
      totalDays: daysSinceLMP,
      trimester: currentWeek < 13 ? 1 : currentWeek < 27 ? 2 : 3,
      dueDate: dueDate.toISOString().split('T')[0]
    };
    
    await saveCalculation('pregnancy-week', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Conception Calculator
exports.calculateConception = async (req, res) => {
  try {
    const { dueDate } = req.body;
    
    const dueDateObj = new Date(dueDate);
    
    // Subtract 280 days to get LMP
    const lmpDate = new Date(dueDateObj);
    lmpDate.setDate(lmpDate.getDate() - 280);
    
    // Conception typically occurs 14 days after LMP
    const conceptionDate = new Date(lmpDate);
    conceptionDate.setDate(conceptionDate.getDate() + 14);
    
    // Conception window (typically 5 days before to 1 day after ovulation)
    const windowStart = new Date(conceptionDate);
    windowStart.setDate(windowStart.getDate() - 5);
    
    const windowEnd = new Date(conceptionDate);
    windowEnd.setDate(windowEnd.getDate() + 1);
    
    const result = {
      conceptionDate: conceptionDate.toISOString().split('T')[0],
      conceptionWindow: {
        start: windowStart.toISOString().split('T')[0],
        end: windowEnd.toISOString().split('T')[0]
      },
      lastPeriodDate: lmpDate.toISOString().split('T')[0]
    };
    
    await saveCalculation('conception', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ovulation Calculator
exports.calculateOvulation = async (req, res) => {
  try {
    const { lastPeriodDate, cycleLength } = req.body;
    
    const lmpDate = new Date(lastPeriodDate);
    const cycleLengthDays = parseInt(cycleLength) || 28;
    
    // Ovulation typically occurs 14 days before next period
    const ovulationDate = new Date(lmpDate);
    ovulationDate.setDate(ovulationDate.getDate() + cycleLengthDays - 14);
    
    // Fertile window (5 days before ovulation to 1 day after)
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);
    
    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);
    
    // Next period date
    const nextPeriodDate = new Date(lmpDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLengthDays);
    
    const result = {
      ovulationDate: ovulationDate.toISOString().split('T')[0],
      fertileWindow: {
        start: fertileWindowStart.toISOString().split('T')[0],
        end: fertileWindowEnd.toISOString().split('T')[0]
      },
      nextPeriodDate: nextPeriodDate.toISOString().split('T')[0],
      cycleLength: cycleLengthDays
    };
    
    await saveCalculation('ovulation', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Period Calculator
exports.calculatePeriod = async (req, res) => {
  try {
    const { lastPeriodDate, cycleLength, periodLength } = req.body;
    
    const lmpDate = new Date(lastPeriodDate);
    const cycleLengthDays = parseInt(cycleLength) || 28;
    const periodLengthDays = parseInt(periodLength) || 5;
    
    // Calculate next 3 periods
    const periods = [];
    
    for (let i = 1; i <= 3; i++) {
      const periodStartDate = new Date(lmpDate);
      periodStartDate.setDate(periodStartDate.getDate() + (cycleLengthDays * i));
      
      const periodEndDate = new Date(periodStartDate);
      periodEndDate.setDate(periodEndDate.getDate() + periodLengthDays);
      
      periods.push({
        startDate: periodStartDate.toISOString().split('T')[0],
        endDate: periodEndDate.toISOString().split('T')[0],
        cycle: i
      });
    }
    
    const result = {
      periods,
      cycleLength: cycleLengthDays,
      periodLength: periodLengthDays,
      lastPeriodDate: lmpDate.toISOString().split('T')[0]
    };
    
    await saveCalculation('period', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get calculation history
exports.getCalculationHistory = async (req, res) => {
  try {
    const { calculatorType, limit = 10 } = req.query;
    const sessionId = req.headers['x-session-id'];
    
    let query = {};
    
    if (calculatorType) {
      query.calculatorType = calculatorType;
    }
    
    if (sessionId) {
      query.sessionId = sessionId;
    }
    
    const history = await CalculationHistory.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get calculation statistics
exports.getCalculationStats = async (req, res) => {
  try {
    const stats = await CalculationHistory.aggregate([
      {
        $group: {
          _id: '$calculatorType',
          count: { $sum: 1 },
          lastUsed: { $max: '$createdAt' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    const totalCalculations = await CalculationHistory.countDocuments();
    
    res.json({
      totalCalculations,
      calculatorStats: stats
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
