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
    
    const multiplier = activityMultipliers[activityLevel] || 1.2;
    const tdee = bmr * multiplier;
    
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
      }
    };
    
    await saveCalculation('tdee', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const { age, gender, weight, height, activityLevel, goal, unit } = req.body;
    
    let weightInKg, heightInCm;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
      heightInCm = parseFloat(height) * 2.54;
    } else {
      weightInKg = parseFloat(weight);
      heightInCm = parseFloat(height);
    }
    
    // Calculate BMR
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
    if (goal === 'lose') targetCalories = tdee - 500;
    else if (goal === 'gain') targetCalories = tdee + 500;
    
    // Macro split (can be customized)
    const proteinPercentage = 0.30;
    const carbPercentage = 0.40;
    const fatPercentage = 0.30;
    
    const result = {
      calories: Math.round(targetCalories),
      protein: Math.round((targetCalories * proteinPercentage) / 4), // 4 cal per gram
      carbs: Math.round((targetCalories * carbPercentage) / 4), // 4 cal per gram
      fat: Math.round((targetCalories * fatPercentage) / 9), // 9 cal per gram
      proteinPercentage: proteinPercentage * 100,
      carbPercentage: carbPercentage * 100,
      fatPercentage: fatPercentage * 100
    };
    
    await saveCalculation('macro', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Protein Calculator
exports.calculateProtein = async (req, res) => {
  try {
    const { weight, activityLevel, goal, unit } = req.body;
    
    let weightInKg;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
    } else {
      weightInKg = parseFloat(weight);
    }
    
    // Protein requirements in grams per kg body weight
    let proteinMultiplier = 0.8; // RDA baseline
    
    if (activityLevel === 'sedentary') proteinMultiplier = 0.8;
    else if (activityLevel === 'light') proteinMultiplier = 1.0;
    else if (activityLevel === 'moderate') proteinMultiplier = 1.2;
    else if (activityLevel === 'active') proteinMultiplier = 1.4;
    else if (activityLevel === 'veryActive') proteinMultiplier = 1.6;
    
    // Adjust for goal
    if (goal === 'lose') proteinMultiplier *= 1.2; // Higher protein for weight loss
    else if (goal === 'gain') proteinMultiplier *= 1.3; // Higher protein for muscle gain
    
    const proteinGrams = weightInKg * proteinMultiplier;
    
    const result = {
      proteinGrams: Math.round(proteinGrams),
      proteinCalories: Math.round(proteinGrams * 4),
      perMeal: Math.round(proteinGrams / 3), // Assuming 3 meals
      recommendations: {
        minimum: Math.round(weightInKg * 0.8),
        moderate: Math.round(weightInKg * 1.2),
        high: Math.round(weightInKg * 1.6)
      }
    };
    
    await saveCalculation('protein', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Carbohydrate Calculator
exports.calculateCarbohydrate = async (req, res) => {
  try {
    const { weight, activityLevel, goal, unit } = req.body;
    
    let weightInKg;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
    } else {
      weightInKg = parseFloat(weight);
    }
    
    // Carb requirements in grams per kg body weight
    let carbMultiplier = 3; // Baseline
    
    if (activityLevel === 'sedentary') carbMultiplier = 3;
    else if (activityLevel === 'light') carbMultiplier = 4;
    else if (activityLevel === 'moderate') carbMultiplier = 5;
    else if (activityLevel === 'active') carbMultiplier = 6;
    else if (activityLevel === 'veryActive') carbMultiplier = 7;
    
    // Adjust for goal
    if (goal === 'lose') carbMultiplier *= 0.8;
    else if (goal === 'gain') carbMultiplier *= 1.2;
    
    const carbGrams = weightInKg * carbMultiplier;
    
    const result = {
      carbGrams: Math.round(carbGrams),
      carbCalories: Math.round(carbGrams * 4),
      perMeal: Math.round(carbGrams / 3),
      recommendations: {
        low: Math.round(weightInKg * 2),
        moderate: Math.round(weightInKg * 4),
        high: Math.round(weightInKg * 6)
      }
    };
    
    await saveCalculation('carbohydrate', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fat Intake Calculator
exports.calculateFatIntake = async (req, res) => {
  try {
    const { weight, goal, unit } = req.body;
    
    let weightInKg;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
    } else {
      weightInKg = parseFloat(weight);
    }
    
    // Fat requirements in grams per kg body weight
    let fatMultiplier = 1.0; // Baseline
    
    if (goal === 'lose') fatMultiplier = 0.8;
    else if (goal === 'gain') fatMultiplier = 1.2;
    
    const fatGrams = weightInKg * fatMultiplier;
    
    const result = {
      fatGrams: Math.round(fatGrams),
      fatCalories: Math.round(fatGrams * 9),
      perMeal: Math.round(fatGrams / 3),
      recommendations: {
        minimum: Math.round(weightInKg * 0.5),
        moderate: Math.round(weightInKg * 1.0),
        high: Math.round(weightInKg * 1.5)
      }
    };
    
    await saveCalculation('fat-intake', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    
    // MET values for common activities
    const metValues = {
      walking: 3.5,
      running: 8.0,
      cycling: 6.0,
      swimming: 7.0,
      yoga: 3.0,
      weightlifting: 5.0,
      basketball: 6.5,
      soccer: 7.0,
      tennis: 7.0,
      dancing: 4.5
    };
    
    const met = metValues[activity] || 5.0;
    const durationInHours = parseFloat(duration) / 60;
    const caloriesBurned = met * weightInKg * durationInHours;
    
    const result = {
      caloriesBurned: Math.round(caloriesBurned),
      activity,
      duration: parseFloat(duration),
      met
    };
    
    await saveCalculation('calories-burned', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const zones = {
      veryLight: {
        min: Math.round(restingHR + heartRateReserve * 0.50),
        max: Math.round(restingHR + heartRateReserve * 0.60),
        name: 'Very Light (50-60%)'
      },
      light: {
        min: Math.round(restingHR + heartRateReserve * 0.60),
        max: Math.round(restingHR + heartRateReserve * 0.70),
        name: 'Light (60-70%)'
      },
      moderate: {
        min: Math.round(restingHR + heartRateReserve * 0.70),
        max: Math.round(restingHR + heartRateReserve * 0.80),
        name: 'Moderate (70-80%)'
      },
      hard: {
        min: Math.round(restingHR + heartRateReserve * 0.80),
        max: Math.round(restingHR + heartRateReserve * 0.90),
        name: 'Hard (80-90%)'
      },
      maximum: {
        min: Math.round(restingHR + heartRateReserve * 0.90),
        max: maxHeartRate,
        name: 'Maximum (90-100%)'
      }
    };
    
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
    const { wrist, ankle, shoulder, waist, hip, unit } = req.body;
    
    // Convert to cm if needed
    let wristCm = unit === 'us' ? parseFloat(wrist) * 2.54 : parseFloat(wrist);
    let ankleCm = unit === 'us' ? parseFloat(ankle) * 2.54 : parseFloat(ankle);
    let shoulderCm = unit === 'us' ? parseFloat(shoulder) * 2.54 : parseFloat(shoulder);
    let waistCm = unit === 'us' ? parseFloat(waist) * 2.54 : parseFloat(waist);
    let hipCm = unit === 'us' ? parseFloat(hip) * 2.54 : parseFloat(hip);
    
    // Calculate body frame
    let frameSize = 'Medium';
    if (wristCm < 16) frameSize = 'Small';
    else if (wristCm > 18) frameSize = 'Large';
    
    // Calculate body shape (simplified)
    const shoulderToHipRatio = shoulderCm / hipCm;
    const waistToHipRatio = waistCm / hipCm;
    
    let bodyShape = 'Rectangle';
    if (shoulderToHipRatio > 1.05) bodyShape = 'Inverted Triangle';
    else if (waistToHipRatio < 0.75) bodyShape = 'Hourglass';
    else if (hipCm > shoulderCm && waistCm < hipCm) bodyShape = 'Pear';
    else if (waistCm > hipCm && waistCm > shoulderCm) bodyShape = 'Apple';
    
    const result = {
      bodyShape,
      frameSize,
      measurements: {
        wrist: wristCm,
        ankle: ankleCm,
        shoulder: shoulderCm,
        waist: waistCm,
        hip: hipCm
      },
      ratios: {
        shoulderToHip: parseFloat(shoulderToHipRatio.toFixed(2)),
        waistToHip: parseFloat(waistToHipRatio.toFixed(2))
      }
    };
    
    await saveCalculation('body-type', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Body Surface Area Calculator
exports.calculateBodySurfaceArea = async (req, res) => {
  try {
    const { weight, height, unit } = req.body;
    
    let weightInKg, heightInCm;
    
    if (unit === 'us') {
      weightInKg = parseFloat(weight) * 0.453592;
      heightInCm = parseFloat(height) * 2.54;
    } else {
      weightInKg = parseFloat(weight);
      heightInCm = parseFloat(height);
    }
    
    // Du Bois Formula
    const bsaDuBois = 0.007184 * Math.pow(weightInKg, 0.425) * Math.pow(heightInCm, 0.725);
    
    // Mosteller Formula
    const bsaMosteller = Math.sqrt((weightInKg * heightInCm) / 3600);
    
    // Haycock Formula
    const bsaHaycock = 0.024265 * Math.pow(weightInKg, 0.5378) * Math.pow(heightInCm, 0.3964);
    
    const result = {
      bsa: parseFloat(bsaDuBois.toFixed(2)),
      bsaDuBois: parseFloat(bsaDuBois.toFixed(2)),
      bsaMosteller: parseFloat(bsaMosteller.toFixed(2)),
      bsaHaycock: parseFloat(bsaHaycock.toFixed(2)),
      unit: 'm²'
    };
    
    await saveCalculation('body-surface-area', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GFR Calculator (Glomerular Filtration Rate)
exports.calculateGFR = async (req, res) => {
  try {
    const { age, gender, creatinine, race } = req.body;
    
    const ageValue = parseInt(age);
    const creatinineValue = parseFloat(creatinine);
    
    // MDRD Formula
    let gfr = 175 * Math.pow(creatinineValue, -1.154) * Math.pow(ageValue, -0.203);
    
    if (gender === 'female') gfr *= 0.742;
    if (race === 'african-american') gfr *= 1.212;
    
    let stage = '';
    let description = '';
    
    if (gfr >= 90) {
      stage = 'Stage 1';
      description = 'Normal kidney function';
    } else if (gfr >= 60) {
      stage = 'Stage 2';
      description = 'Mild loss of kidney function';
    } else if (gfr >= 45) {
      stage = 'Stage 3a';
      description = 'Mild to moderate loss of kidney function';
    } else if (gfr >= 30) {
      stage = 'Stage 3b';
      description = 'Moderate to severe loss of kidney function';
    } else if (gfr >= 15) {
      stage = 'Stage 4';
      description = 'Severe loss of kidney function';
    } else {
      stage = 'Stage 5';
      description = 'Kidney failure';
    }
    
    const result = {
      gfr: parseFloat(gfr.toFixed(1)),
      stage,
      description,
      unit: 'mL/min/1.73m²'
    };
    
    await saveCalculation('gfr', req.body, result, req);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
