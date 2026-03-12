export const calculatorSeo = {
  '/bmi-calculator': {
    title: 'BMI Calculator - Calculate Body Mass Index Online | FitCalc',
    description: 'Free BMI calculator to instantly check your body mass index and health category.',
  },
  '/body-fat-calculator': {
    title: 'Body Fat Calculator - Estimate Body Fat Percentage | FitCalc',
    description: 'Use the FitCalc body fat calculator to estimate your body fat percentage quickly.',
  },
  '/bmr-calculator': {
    title: 'BMR Calculator - Basal Metabolic Rate Calculator | FitCalc',
    description: 'Calculate your BMR to estimate calories your body burns at rest.',
  },
  '/calorie-calculator': {
    title: 'Calorie Calculator - Daily Calorie Needs Estimator | FitCalc',
    description: 'Estimate daily calorie requirements for maintenance, loss, or gain goals.',
  },
  '/protein-intake-calculator': {
    title: 'Protein Intake Calculator - Daily Protein Needs | FitCalc',
    description: 'Find your recommended daily protein intake based on body stats and activity.',
  },
  '/lean-body-mass-calculator': {
    title: 'Lean Body Mass Calculator - Calculate Lean Mass | FitCalc',
    description: 'Calculate lean body mass and understand body composition better.',
  },
  '/ideal-weight-calculator': {
    title: 'Ideal Weight Calculator - Healthy Weight Range | FitCalc',
    description: 'Estimate your ideal and healthy body weight range with FitCalc.',
  },
  '/pace-calculator': {
    title: 'Pace Calculator - Running and Walking Pace | FitCalc',
    description: 'Calculate running or walking pace using distance and time.',
  },
  '/army-body-fat-calculator': {
    title: 'Army Body Fat Calculator - U.S. Army Method | FitCalc',
    description: 'Estimate body fat percentage using the U.S. Army body fat formula.',
  },
  '/navy-body-fat-calculator': {
    title: 'Navy Body Fat Calculator - U.S. Navy Method | FitCalc',
    description: 'Estimate body fat using the U.S. Navy circumference method.',
  },
  '/macro-calculator': {
    title: 'Macro Calculator - Protein, Carbs, and Fat Split | FitCalc',
    description: 'Calculate your ideal macronutrient split for your nutrition goals.',
  },
  '/one-rep-max-calculator': {
    title: 'One Rep Max Calculator - 1RM Estimator | FitCalc',
    description: 'Estimate your one-rep max for strength training plans.',
  },
  '/carbohydrate-calculator': {
    title: 'Carbohydrate Calculator - Daily Carb Intake | FitCalc',
    description: 'Estimate daily carbohydrate intake based on your activity and goals.',
  },
  '/fat-intake-calculator': {
    title: 'Fat Intake Calculator - Daily Fat Requirement | FitCalc',
    description: 'Calculate recommended daily fat intake for balanced nutrition.',
  },
  '/tdee-calculator': {
    title: 'TDEE Calculator - Total Daily Energy Expenditure | FitCalc',
    description: 'Calculate TDEE to estimate your total calories burned each day.',
  },
  '/gfr-calculator': {
    title: 'GFR Calculator - Kidney Function Estimator | FitCalc',
    description: 'Estimate glomerular filtration rate (GFR) with this simple tool.',
  },
  '/body-type-calculator': {
    title: 'Body Type Calculator - Determine Somatotype | FitCalc',
    description: 'Find your body type category and learn your body composition profile.',
  },
  '/body-surface-area-calculator': {
    title: 'Body Surface Area Calculator - BSA Estimator | FitCalc',
    description: 'Calculate body surface area quickly with accurate formulas.',
  },
  '/healthy-weight-calculator': {
    title: 'Healthy Weight Calculator - Target Weight Range | FitCalc',
    description: 'Check your healthy body weight range based on your height.',
  },
  '/calories-burned-calculator': {
    title: 'Calories Burned Calculator - Activity Calorie Burn | FitCalc',
    description: 'Estimate calories burned for workouts and daily activities.',
  },
  '/target-heart-rate-calculator': {
    title: 'Target Heart Rate Calculator - Heart Rate Zones | FitCalc',
    description: 'Calculate your ideal target heart rate zones for training.',
  },
  '/pregnancy-weight-gain-calculator': {
    title: 'Pregnancy Weight Gain Calculator | FitCalc',
    description: 'Track healthy weight gain goals throughout pregnancy.',
  },
  '/due-date-calculator': {
    title: 'Due Date Calculator - Pregnancy Due Date | FitCalc',
    description: 'Estimate your expected pregnancy due date using cycle details.',
  },
  '/ovulation-calculator': {
    title: 'Ovulation Calculator - Fertility Window Tracker | FitCalc',
    description: 'Predict ovulation and fertile days for family planning.',
  },
  '/conception-calculator': {
    title: 'Conception Calculator - Estimate Conception Date | FitCalc',
    description: 'Estimate possible conception date from pregnancy timeline data.',
  },
  '/period-calculator': {
    title: 'Period Calculator - Menstrual Cycle Tracker | FitCalc',
    description: 'Predict next period dates and cycle timelines with ease.',
  },
  '/pregnancy-week-calculator': {
    title: 'Pregnancy Week Calculator - Week-by-Week Pregnancy | FitCalc',
    description: 'Track pregnancy progress week-by-week and expected milestones.',
  },
};

export const pageSeo = {
  '/': {
    title: 'FitCalc - Free Fitness and Health Calculators Online',
    description: 'Use free online fitness calculators including BMI, BMR, calorie, protein intake, and more.',
  },
  '/calculators': {
    title: 'All Fitness Calculators | FitCalc',
    description: 'Browse all FitCalc fitness, nutrition, and pregnancy calculators in one place.',
  },
  '/blog': {
    title: 'Fitness and Health Blog | FitCalc',
    description: 'Read practical fitness, nutrition, and wellness articles from FitCalc.',
  },
  '/privacy': {
    title: 'Privacy Policy | FitCalc',
    description: 'Read FitCalc privacy policy and data handling details.',
  },
  '/terms': {
    title: 'Terms and Disclaimer | FitCalc',
    description: 'Review FitCalc terms of use and medical disclaimer information.',
  },
  '/help/disable-adblock': {
    title: 'Disable Adblock Help | FitCalc',
    description: 'Learn how to disable ad blockers on FitCalc pages that require script access.',
  },
};

export const getSeoForPath = (path) => {
  return calculatorSeo[path] || pageSeo[path] || pageSeo['/'];
};
