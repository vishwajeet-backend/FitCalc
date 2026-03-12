import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
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
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DisableAdblockPage from './pages/help/DisableAdblockPage';
import NotFoundPage from './pages/NotFoundPage';
import RouteMetaTracker from './components/RouteMetaTracker';
import GlobalScrollReveal from './components/GlobalScrollReveal';
import './pages/AllCalculators.css';

const withMeta = (element, noIndex = false) => (
  <>
    <RouteMetaTracker noIndex={noIndex} />
    {element}
  </>
);

function App() {
  return (
    <Router>
      <GlobalScrollReveal />
      <div className="App">
        <Routes>
          {/* Home */}
          <Route path="/" element={withMeta(<HomePage />)} />

          {/* All Calculators Page */}
          <Route path="/calculators" element={withMeta(<AllCalculators />)} />

          {/* Specific Calculator Pages (Clean SEO URLs) */}
          <Route path="/bmi-calculator" element={withMeta(<BMICalculatorPage />)} />
          <Route path="/calorie-calculator" element={withMeta(<CalorieCalculatorPage />)} />
          <Route path="/body-fat-calculator" element={withMeta(<BodyFatCalculatorPage />)} />
          <Route path="/lean-body-mass-calculator" element={withMeta(<LeanBodyMassCalculatorPage />)} />
          <Route path="/ideal-weight-calculator" element={withMeta(<IdealWeightCalculatorPage />)} />
          <Route path="/pace-calculator" element={withMeta(<PaceCalculatorPage />)} />
          <Route path="/army-body-fat-calculator" element={withMeta(<ArmyBodyFatCalculatorPage />)} />
          <Route path="/navy-body-fat-calculator" element={withMeta(<NavyBodyFatCalculatorPage />)} />
          <Route path="/bmr-calculator" element={withMeta(<BMRCalculatorPage />)} />
          <Route path="/macro-calculator" element={withMeta(<MacroCalculatorPage />)} />
          <Route path="/protein-intake-calculator" element={withMeta(<ProteinCalculatorPage />)} />
          <Route path="/one-rep-max-calculator" element={withMeta(<OneRepMaxCalculatorPage />)} />
          <Route path="/carbohydrate-calculator" element={withMeta(<CarbohydrateCalculatorPage />)} />
          <Route path="/fat-intake-calculator" element={withMeta(<FatIntakeCalculatorPage />)} />
          <Route path="/tdee-calculator" element={withMeta(<TDEECalculatorPage />)} />
          <Route path="/gfr-calculator" element={withMeta(<GFRCalculatorPage />)} />
          <Route path="/body-type-calculator" element={withMeta(<BodyTypeCalculatorPage />)} />
          <Route path="/body-surface-area-calculator" element={withMeta(<BodySurfaceAreaCalculatorPage />)} />
          <Route path="/healthy-weight-calculator" element={withMeta(<HealthyWeightCalculatorPage />)} />
          <Route path="/calories-burned-calculator" element={withMeta(<CaloriesBurnedCalculatorPage />)} />
          <Route path="/target-heart-rate-calculator" element={withMeta(<TargetHeartRateCalculatorPage />)} />

          {/* Pregnancy Calculators */}
          <Route path="/pregnancy-weight-gain-calculator" element={withMeta(<PregnancyWeightGainCalculatorPage />)} />
          <Route path="/due-date-calculator" element={withMeta(<DueDateCalculatorPage />)} />
          <Route path="/ovulation-calculator" element={withMeta(<OvulationCalculatorPage />)} />
          <Route path="/conception-calculator" element={withMeta(<ConceptionCalculatorPage />)} />
          <Route path="/period-calculator" element={withMeta(<PeriodCalculatorPage />)} />
          <Route path="/pregnancy-week-calculator" element={withMeta(<PregnancyWeekCalculatorPage />)} />

          {/* Legacy URL redirects */}
          <Route path="/calculator/bmi" element={<Navigate to="/bmi-calculator" replace />} />
          <Route path="/calculator/calorie" element={<Navigate to="/calorie-calculator" replace />} />
          <Route path="/calculator/body-fat" element={<Navigate to="/body-fat-calculator" replace />} />
          <Route path="/calculator/lean-body-mass" element={<Navigate to="/lean-body-mass-calculator" replace />} />
          <Route path="/calculator/ideal-weight" element={<Navigate to="/ideal-weight-calculator" replace />} />
          <Route path="/calculator/pace" element={<Navigate to="/pace-calculator" replace />} />
          <Route path="/calculator/army-body-fat" element={<Navigate to="/army-body-fat-calculator" replace />} />
          <Route path="/calculator/navy-body-fat" element={<Navigate to="/navy-body-fat-calculator" replace />} />
          <Route path="/calculator/bmr" element={<Navigate to="/bmr-calculator" replace />} />
          <Route path="/calculator/macro" element={<Navigate to="/macro-calculator" replace />} />
          <Route path="/calculator/protein" element={<Navigate to="/protein-intake-calculator" replace />} />
          <Route path="/calculator/one-rep-max" element={<Navigate to="/one-rep-max-calculator" replace />} />
          <Route path="/calculator/carbohydrate" element={<Navigate to="/carbohydrate-calculator" replace />} />
          <Route path="/calculator/fat-intake" element={<Navigate to="/fat-intake-calculator" replace />} />
          <Route path="/calculator/tdee" element={<Navigate to="/tdee-calculator" replace />} />
          <Route path="/calculator/gfr" element={<Navigate to="/gfr-calculator" replace />} />
          <Route path="/calculator/body-type" element={<Navigate to="/body-type-calculator" replace />} />
          <Route path="/calculator/body-surface-area" element={<Navigate to="/body-surface-area-calculator" replace />} />
          <Route path="/calculator/healthy-weight" element={<Navigate to="/healthy-weight-calculator" replace />} />
          <Route path="/calculator/calories-burned" element={<Navigate to="/calories-burned-calculator" replace />} />
          <Route path="/calculator/target-heart-rate" element={<Navigate to="/target-heart-rate-calculator" replace />} />
          <Route path="/calculator/pregnancy-weight-gain" element={<Navigate to="/pregnancy-weight-gain-calculator" replace />} />
          <Route path="/calculator/pregnancy-due-date" element={<Navigate to="/due-date-calculator" replace />} />
          <Route path="/calculator/ovulation" element={<Navigate to="/ovulation-calculator" replace />} />
          <Route path="/calculator/conception" element={<Navigate to="/conception-calculator" replace />} />
          <Route path="/calculator/period" element={<Navigate to="/period-calculator" replace />} />
          <Route path="/calculator/pregnancy-week" element={<Navigate to="/pregnancy-week-calculator" replace />} />

          {/* Category Pages */}
          <Route path="/fitness" element={withMeta(<AllCalculators />)} />
          <Route path="/pregnancy" element={withMeta(<AllCalculators />)} />
          <Route path="/metabolism" element={withMeta(<AllCalculators />)} />

          {/* Other Pages */}
          <Route path="/blog" element={withMeta(<BlogPage />)} />
          <Route path="/blog/:slug" element={withMeta(<BlogArticlePage />)} />
          <Route path="/about" element={withMeta(<HomePage />)} />
          <Route path="/privacy" element={withMeta(<PrivacyPage />)} />
          <Route path="/terms" element={withMeta(<TermsPage />)} />
          <Route path="/contact" element={withMeta(<HomePage />)} />
          <Route path="/help/disable-adblock" element={withMeta(<DisableAdblockPage />, true)} />

          {/* 404 */}
          <Route path="*" element={withMeta(<NotFoundPage />, true)} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
