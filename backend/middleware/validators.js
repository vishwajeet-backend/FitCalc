const { body, validationResult } = require('express-validator');

// Validation error handler middleware
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

// BMI Calculator validation
exports.validateBMI = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('heightFeet').isFloat({ min: 0 }).withMessage('Height must be a positive number'),
  body('heightInches').optional().isFloat({ min: 0, max: 11.99 }).withMessage('Height inches must be between 0 and 11.99'),
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// BMR Calculator validation
exports.validateBMR = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Calorie Calculator validation
exports.validateCalorie = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('activityLevel').isIn(['sedentary', 'light', 'moderate', 'active', 'veryActive'])
    .withMessage('Activity level must be sedentary, light, moderate, active, or veryActive'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// TDEE Calculator validation
exports.validateTDEE = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('activityLevel').isIn(['sedentary', 'light', 'moderate', 'active', 'veryActive'])
    .withMessage('Activity level must be sedentary, light, moderate, active, or veryActive'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Body Fat Calculator validation
exports.validateBodyFat = [
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('neck').isFloat({ min: 1 }).withMessage('Neck measurement must be a positive number'),
  body('waist').isFloat({ min: 1 }).withMessage('Waist measurement must be a positive number'),
  body('hip').optional().isFloat({ min: 1 }).withMessage('Hip measurement must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Navy Body Fat Calculator validation
exports.validateNavyBodyFat = [
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('neck').isFloat({ min: 1 }).withMessage('Neck measurement must be a positive number'),
  body('waist').isFloat({ min: 1 }).withMessage('Waist measurement must be a positive number'),
  body('hip').optional().isFloat({ min: 1 }).withMessage('Hip measurement must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Army Body Fat Calculator validation
exports.validateArmyBodyFat = [
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('neck').isFloat({ min: 1 }).withMessage('Neck measurement must be a positive number'),
  body('waist').isFloat({ min: 1 }).withMessage('Waist measurement must be a positive number'),
  body('hip').optional().isFloat({ min: 1 }).withMessage('Hip measurement must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Lean Body Mass Calculator validation
exports.validateLeanBodyMass = [
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Ideal Weight Calculator validation
exports.validateIdealWeight = [
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Healthy Weight Calculator validation
exports.validateHealthyWeight = [
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Macro Calculator validation
exports.validateMacro = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('activityLevel').isIn(['sedentary', 'light', 'moderate', 'active', 'veryActive'])
    .withMessage('Activity level must be sedentary, light, moderate, active, or veryActive'),
  body('goal').isIn(['lose', 'maintain', 'gain']).withMessage('Goal must be lose, maintain, or gain'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Protein Calculator validation
exports.validateProtein = [
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('activityLevel').isIn(['sedentary', 'light', 'moderate', 'active', 'veryActive'])
    .withMessage('Activity level must be sedentary, light, moderate, active, or veryActive'),
  body('goal').isIn(['lose', 'maintain', 'gain']).withMessage('Goal must be lose, maintain, or gain'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Carbohydrate Calculator validation
exports.validateCarbohydrate = [
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('activityLevel').isIn(['sedentary', 'light', 'moderate', 'active', 'veryActive'])
    .withMessage('Activity level must be sedentary, light, moderate, active, or veryActive'),
  body('goal').isIn(['lose', 'maintain', 'gain']).withMessage('Goal must be lose, maintain, or gain'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Fat Intake Calculator validation
exports.validateFatIntake = [
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('goal').isIn(['lose', 'maintain', 'gain']).withMessage('Goal must be lose, maintain, or gain'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Calories Burned Calculator validation
exports.validateCaloriesBurned = [
  body('activity').isString().notEmpty().withMessage('Activity is required'),
  body('duration').isFloat({ min: 1 }).withMessage('Duration must be a positive number'),
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// One Rep Max Calculator validation
exports.validateOneRepMax = [
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('reps').isInt({ min: 1, max: 20 }).withMessage('Reps must be between 1 and 20'),
  body('unit').optional().isIn(['lbs', 'kg']).withMessage('Unit must be lbs or kg')
];

// Pace Calculator validation
exports.validatePace = [
  body('distance').isFloat({ min: 0.1 }).withMessage('Distance must be a positive number'),
  body('hours').optional().isInt({ min: 0 }).withMessage('Hours must be a non-negative integer'),
  body('minutes').optional().isInt({ min: 0, max: 59 }).withMessage('Minutes must be between 0 and 59'),
  body('seconds').optional().isInt({ min: 0, max: 59 }).withMessage('Seconds must be between 0 and 59'),
  body('unit').optional().isIn(['km', 'mi']).withMessage('Unit must be km or mi')
];

// Target Heart Rate Calculator validation
exports.validateTargetHeartRate = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('restingHeartRate').optional().isInt({ min: 30, max: 120 }).withMessage('Resting heart rate must be between 30 and 120')
];

// Body Type Calculator validation
exports.validateBodyType = [
  body('wrist').isFloat({ min: 1 }).withMessage('Wrist measurement must be a positive number'),
  body('ankle').isFloat({ min: 1 }).withMessage('Ankle measurement must be a positive number'),
  body('shoulder').isFloat({ min: 1 }).withMessage('Shoulder measurement must be a positive number'),
  body('waist').isFloat({ min: 1 }).withMessage('Waist measurement must be a positive number'),
  body('hip').isFloat({ min: 1 }).withMessage('Hip measurement must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Body Surface Area Calculator validation
exports.validateBodySurfaceArea = [
  body('weight').isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// GFR Calculator validation
exports.validateGFR = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('creatinine').isFloat({ min: 0.1 }).withMessage('Creatinine must be a positive number'),
  body('race').optional().isIn(['caucasian', 'african-american', 'other'])
    .withMessage('Race must be caucasian, african-american, or other')
];

// Pregnancy Due Date Calculator validation
exports.validatePregnancyDueDate = [
  body('lastPeriodDate').isISO8601().withMessage('Last period date must be a valid date')
];

// Pregnancy Weight Gain Calculator validation
exports.validatePregnancyWeightGain = [
  body('prePregnancyWeight').isFloat({ min: 1 }).withMessage('Pre-pregnancy weight must be a positive number'),
  body('height').isFloat({ min: 1 }).withMessage('Height must be a positive number'),
  body('currentWeight').isFloat({ min: 1 }).withMessage('Current weight must be a positive number'),
  body('weeksPregnant').isInt({ min: 0, max: 42 }).withMessage('Weeks pregnant must be between 0 and 42'),
  body('unit').isIn(['us', 'metric']).withMessage('Unit must be us or metric')
];

// Pregnancy Week Calculator validation
exports.validatePregnancyWeek = [
  body('lastPeriodDate').isISO8601().withMessage('Last period date must be a valid date')
];

// Conception Calculator validation
exports.validateConception = [
  body('dueDate').isISO8601().withMessage('Due date must be a valid date')
];

// Ovulation Calculator validation
exports.validateOvulation = [
  body('lastPeriodDate').isISO8601().withMessage('Last period date must be a valid date'),
  body('cycleLength').optional().isInt({ min: 21, max: 35 }).withMessage('Cycle length must be between 21 and 35 days')
];

// Period Calculator validation
exports.validatePeriod = [
  body('lastPeriodDate').isISO8601().withMessage('Last period date must be a valid date'),
  body('cycleLength').optional().isInt({ min: 21, max: 35 }).withMessage('Cycle length must be between 21 and 35 days'),
  body('periodLength').optional().isInt({ min: 2, max: 10 }).withMessage('Period length must be between 2 and 10 days')
];
