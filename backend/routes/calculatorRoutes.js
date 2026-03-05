const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');
const validators = require('../middleware/validators');

// Fitness Calculators
router.post('/bmi', 
  validators.validateBMI, 
  validators.handleValidationErrors, 
  calculatorController.calculateBMI
);

router.post('/bmr', 
  validators.validateBMR, 
  validators.handleValidationErrors, 
  calculatorController.calculateBMR
);

router.post('/calorie', 
  validators.validateCalorie, 
  validators.handleValidationErrors, 
  calculatorController.calculateCalorie
);

router.post('/tdee', 
  validators.validateTDEE, 
  validators.handleValidationErrors, 
  calculatorController.calculateTDEE
);

router.post('/body-fat', 
  validators.validateBodyFat, 
  validators.handleValidationErrors, 
  calculatorController.calculateBodyFat
);

router.post('/navy-body-fat', 
  validators.validateNavyBodyFat, 
  validators.handleValidationErrors, 
  calculatorController.calculateNavyBodyFat
);

router.post('/army-body-fat', 
  validators.validateArmyBodyFat, 
  validators.handleValidationErrors, 
  calculatorController.calculateArmyBodyFat
);

router.post('/lean-body-mass', 
  validators.validateLeanBodyMass, 
  validators.handleValidationErrors, 
  calculatorController.calculateLeanBodyMass
);

router.post('/ideal-weight', 
  validators.validateIdealWeight, 
  validators.handleValidationErrors, 
  calculatorController.calculateIdealWeight
);

router.post('/healthy-weight', 
  validators.validateHealthyWeight, 
  validators.handleValidationErrors, 
  calculatorController.calculateHealthyWeight
);

// Nutrition Calculators
router.post('/macro', 
  validators.validateMacro, 
  validators.handleValidationErrors, 
  calculatorController.calculateMacro
);

router.post('/protein', 
  validators.validateProtein, 
  validators.handleValidationErrors, 
  calculatorController.calculateProtein
);

router.post('/carbohydrate', 
  validators.validateCarbohydrate, 
  validators.handleValidationErrors, 
  calculatorController.calculateCarbohydrate
);

router.post('/fat-intake', 
  validators.validateFatIntake, 
  validators.handleValidationErrors, 
  calculatorController.calculateFatIntake
);

router.post('/calories-burned', 
  validators.validateCaloriesBurned, 
  validators.handleValidationErrors, 
  calculatorController.calculateCaloriesBurned
);

// Fitness Activity Calculators
router.post('/one-rep-max', 
  validators.validateOneRepMax, 
  validators.handleValidationErrors, 
  calculatorController.calculateOneRepMax
);

router.post('/pace', 
  validators.validatePace, 
  validators.handleValidationErrors, 
  calculatorController.calculatePace
);

router.post('/target-heart-rate', 
  validators.validateTargetHeartRate, 
  validators.handleValidationErrors, 
  calculatorController.calculateTargetHeartRate
);

// Body Composition Calculators
router.post('/body-type', 
  validators.validateBodyType, 
  validators.handleValidationErrors, 
  calculatorController.calculateBodyType
);

router.post('/body-surface-area', 
  validators.validateBodySurfaceArea, 
  validators.handleValidationErrors, 
  calculatorController.calculateBodySurfaceArea
);

// Medical Calculators
router.post('/gfr', 
  validators.validateGFR, 
  validators.handleValidationErrors, 
  calculatorController.calculateGFR
);

// Pregnancy Calculators
router.post('/pregnancy-due-date', 
  validators.validatePregnancyDueDate, 
  validators.handleValidationErrors, 
  calculatorController.calculatePregnancyDueDate
);

router.post('/pregnancy-weight-gain', 
  validators.validatePregnancyWeightGain, 
  validators.handleValidationErrors, 
  calculatorController.calculatePregnancyWeightGain
);

router.post('/pregnancy-week', 
  validators.validatePregnancyWeek, 
  validators.handleValidationErrors, 
  calculatorController.calculatePregnancyWeek
);

router.post('/conception', 
  validators.validateConception, 
  validators.handleValidationErrors, 
  calculatorController.calculateConception
);

router.post('/ovulation', 
  validators.validateOvulation, 
  validators.handleValidationErrors, 
  calculatorController.calculateOvulation
);

router.post('/period', 
  validators.validatePeriod, 
  validators.handleValidationErrors, 
  calculatorController.calculatePeriod
);

// History and Statistics
router.get('/history', calculatorController.getCalculationHistory);
router.get('/stats', calculatorController.getCalculationStats);

module.exports = router;
