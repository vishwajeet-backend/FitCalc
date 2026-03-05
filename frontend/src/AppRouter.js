import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AllCalculators from './pages/AllCalculators';
import BMICalculatorPage from './pages/BMICalculatorPage';
import CalorieCalculatorPage from './pages/CalorieCalculatorPage';
import BodyFatCalculatorPage from './pages/BodyFatCalculatorPage';
import IdealWeightCalculatorPage from './pages/IdealWeightCalculatorPage';
import PaceCalculatorPage from './pages/PaceCalculatorPage';
import MacroCalculatorPage from './pages/MacroCalculatorPage';
import BMRCalculatorPage from './pages/BMRCalculatorPage';
import ProteinCalculatorPage from './pages/ProteinCalculatorPage';
import OneRepMaxCalculatorPage from './pages/OneRepMaxCalculatorPage';
import TDEECalculatorPage from './pages/TDEECalculatorPage';
import LeanBodyMassCalculatorPage from './pages/LeanBodyMassCalculatorPage';
import TargetHeartRateCalculatorPage from './pages/TargetHeartRateCalculatorPage';
import DueDateCalculatorPage from './pages/DueDateCalculatorPage';
import OvulationCalculatorPage from './pages/OvulationCalculatorPage';
import PregnancyWeightGainCalculatorPage from './pages/PregnancyWeightGainCalculatorPage';
import ConceptionCalculatorPage from './pages/ConceptionCalculatorPage';
import PeriodCalculatorPage from './pages/PeriodCalculatorPage';
import PregnancyWeekCalculatorPage from './pages/PregnancyWeekCalculatorPage';
import CaloriesBurnedCalculatorPage from './pages/CaloriesBurnedCalculatorPage';
import BodyTypeCalculatorPage from './pages/BodyTypeCalculatorPage';
import ArmyBodyFatCalculatorPage from './pages/ArmyBodyFatCalculatorPage';
import BodySurfaceAreaCalculatorPage from './pages/BodySurfaceAreaCalculatorPage';
import HealthyWeightCalculatorPage from './pages/HealthyWeightCalculatorPage';
import GFRCalculatorPage from './pages/GFRCalculatorPage';
import NavyBodyFatCalculatorPage from './pages/NavyBodyFatCalculatorPage';
import CarbohydrateCalculatorPage from './pages/CarbohydrateCalculatorPage';
import FatIntakeCalculatorPage from './pages/FatIntakeCalculatorPage';
import GenericCalculatorPage from './pages/GenericCalculatorPage';
import './pages/AllCalculators.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          
          {/* All Calculators Page */}
          <Route path="/calculators" element={<AllCalculators />} />
          
          {/* Specific Calculator Pages */}
          <Route path="/calculator/bmi" element={<BMICalculatorPage />} />
          <Route path="/calculator/calorie" element={<CalorieCalculatorPage />} />
          <Route path="/calculator/body-fat" element={<BodyFatCalculatorPage />} />
          <Route path="/calculator/lean-body-mass" element={<LeanBodyMassCalculatorPage />} />
          <Route path="/calculator/ideal-weight" element={<IdealWeightCalculatorPage />} />
          <Route path="/calculator/pace" element={<PaceCalculatorPage />} />
          <Route path="/calculator/army-body-fat" element={<ArmyBodyFatCalculatorPage />} />
          <Route path="/calculator/navy-body-fat" element={<NavyBodyFatCalculatorPage />} />
          <Route path="/calculator/bmr" element={<BMRCalculatorPage />} />
          <Route path="/calculator/macro" element={<MacroCalculatorPage />} />
          <Route path="/calculator/protein" element={<ProteinCalculatorPage />} />
          <Route path="/calculator/one-rep-max" element={<OneRepMaxCalculatorPage />} />
          <Route path="/calculator/carbohydrate" element={<CarbohydrateCalculatorPage />} />
          <Route path="/calculator/fat-intake" element={<FatIntakeCalculatorPage />} />
          <Route path="/calculator/tdee" element={<TDEECalculatorPage />} />
          <Route path="/calculator/gfr" element={<GFRCalculatorPage />} />
          <Route path="/calculator/body-type" element={<BodyTypeCalculatorPage />} />
          <Route path="/calculator/body-surface-area" element={<BodySurfaceAreaCalculatorPage />} />
          <Route path="/calculator/healthy-weight" element={<HealthyWeightCalculatorPage />} />
          <Route path="/calculator/calories-burned" element={<CaloriesBurnedCalculatorPage />} />
          <Route path="/calculator/target-heart-rate" element={<TargetHeartRateCalculatorPage />} />
          
          {/* Pregnancy Calculators */}
          <Route path="/calculator/pregnancy" element={<GenericCalculatorPage />} />
          <Route path="/calculator/pregnancy-weight-gain" element={<PregnancyWeightGainCalculatorPage />} />
          <Route path="/calculator/pregnancy-due-date" element={<DueDateCalculatorPage />} />
          <Route path="/calculator/ovulation" element={<OvulationCalculatorPage />} />
          <Route path="/calculator/conception" element={<ConceptionCalculatorPage />} />
          <Route path="/calculator/period" element={<PeriodCalculatorPage />} />
          <Route path="/calculator/pregnancy-week" element={<PregnancyWeekCalculatorPage />} />
          
          {/* Generic route for any other calculator */}
          <Route path="/calculator/:type" element={<GenericCalculatorPage />} />
          
          {/* Category Pages */}
          <Route path="/fitness" element={<AllCalculators />} />
          <Route path="/pregnancy" element={<AllCalculators />} />
          <Route path="/metabolism" element={<AllCalculators />} />
          
          {/* Other Pages */}
          <Route path="/blog" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/privacy" element={<HomePage />} />
          <Route path="/terms" element={<HomePage />} />
          <Route path="/contact" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
