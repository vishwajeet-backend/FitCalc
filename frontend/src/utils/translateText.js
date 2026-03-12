export const textKeyMap = {
  // Common UI
  Home: 'home',
  Fitness: 'fitness',
  Pregnancy: 'pregnancy',
  Metabolism: 'metabolism',
  Blog: 'blog',
  Language: 'language',
  Result: 'result',
  'Your Results': 'results',
  Age: 'age',
  Gender: 'gender',
  Height: 'height',
  Weight: 'weight',
  'Activity Level': 'activityLevel',
  Activity: 'activityLevel',
  'US Units': 'usUnits',
  'Metric Units': 'metricUnits',
  'Start Calculating': 'calculate',
  'Calculating...': 'calculating',
  Male: 'male',
  Female: 'female',
  'Healthy BMI range': 'healthyBMIRange',
  'Healthy BMI Range': 'healthyBMIRange',
  'Healthy weight range': 'healthyWeightRange',
  'Healthy Weight Range': 'healthyWeightRange',
  'fitness & health': 'fitnessAndHealth',
  'All Calculators': 'allCalculators',
  'View More': 'allCalculators',
  'View more': 'allCalculators',
  'BMI Prime': 'bmiPrime',
  Protein: 'protein',
  Carbs: 'carbs',
  Fat: 'fat',
  Underweight: 'underweight',
  'Normal weight': 'normalWeight',
  Overweight: 'overweight',
  Obese: 'obese',
  Under: 'underweight',
  Normal: 'normalWeight',
  Over: 'overweight',

  // Calculator names
  'BMI Calculator': 'bmiCalculator',
  'BMR Calculator': 'bmrCalculator',
  'Calorie Calculator': 'calorieCalculator',
  'Body Fat Calculator': 'bodyFatCalculator',
  'Protein Calculator': 'proteinCalculator',
  'Protein Intake Calculator': 'proteinCalculator',
  'Lean Body Mass Calculator': 'leanBodyMassCalculator',
  'TDEE Calculator': 'tdeeCalculator',
  'Macro Calculator': 'macroCalculator',
  'Ideal Weight Calculator': 'idealWeightCalculator',
  'One Rep Max Calculator': 'oneRepMaxCalculator',
  'Pace Calculator': 'paceCalculator',
  'Target Heart Rate Calculator': 'targetHeartRateCalculator',
  'Calories Burned Calculator': 'caloriesBurnedCalculator',
  'Body Type Calculator': 'bodyTypeCalculator',
  'Body Surface Area Calculator': 'bodySurfaceAreaCalculator',
  'Army Body Fat Calculator': 'armyBodyFatCalculator',
  'Navy Body Fat Calculator': 'navyBodyFatCalculator',
  'Carbohydrate Calculator': 'carbohydrateCalculator',
  'Fat Intake Calculator': 'fatIntakeCalculator',
  'GFR Calculator': 'gfrCalculator',
  'Healthy Weight Calculator': 'healthyWeightCalculator',
  'Due Date Calculator': 'dueDateCalculator',
  'Ovulation Calculator': 'ovulationCalculator',
  'Conception Calculator': 'conceptionCalculator',
  'Period Calculator': 'periodCalculator',
  'Pregnancy Week Calculator': 'pregnancyWeekCalculator',
  'Pregnancy Weight Gain Calculator': 'pregnancyWeightGainCalculator',

  // Activity labels
  'Sedentary (little or no exercise)': 'sedentary',
  'Light (exercise 1-3 times/week)': 'lightActivity',
  'Moderate (exercise 4-5 times/week)': 'moderateActivity',
  'Active (daily exercise or intense 3-4 times/week)': 'activeActivity',
  'Very Active (intense exercise 6-7 times/week)': 'veryActiveActivity',
};

const toAutoKey = (text, prefix = 'auto') => {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  if (!slug) {
    return prefix;
  }

  return `${prefix}.${slug}`;
};

export const translateText = (text, t, options = {}) => {
  if (typeof text !== 'string') {
    return text;
  }

  const { prefix = 'auto' } = options;
  const key = textKeyMap[text] || toAutoKey(text, prefix);

  return t(key, { defaultValue: text });
};
