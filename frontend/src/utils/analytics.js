const getDataLayer = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
};

export const initAnalytics = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const measurementId = process.env.REACT_APP_GA4_MEASUREMENT_ID;

  if (!measurementId || window.gtag) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false,
  });
};

export const trackEvent = (eventName, params = {}) => {
  const dataLayer = getDataLayer();

  if (!dataLayer) {
    return;
  }

  const eventPayload = {
    event: eventName,
    ...params,
  };

  dataLayer.push(eventPayload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

export const trackPageView = (path, title) => {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
  });
};

export const trackCalculatorUsed = (calculatorName, calculatorPath) => {
  trackEvent('calculator_used', {
    calculator_name: calculatorName,
    calculator_path: calculatorPath,
  });
};

export const trackCalculationCompleted = (eventName, calculatorPath) => {
  trackEvent(eventName, {
    calculator_path: calculatorPath,
  });

  trackEvent('calculation_completed', {
    calculator_event: eventName,
    calculator_path: calculatorPath,
  });
};

const calculatorEventsByPath = {
  '/bmi-calculator': 'bmi_calculated',
  '/calorie-calculator': 'calorie_calculated',
  '/body-fat-calculator': 'body_fat_calculated',
  '/bmr-calculator': 'bmr_calculated',
  '/protein-intake-calculator': 'protein_calculated',
  '/lean-body-mass-calculator': 'lean_body_mass_calculated',
  '/tdee-calculator': 'tdee_calculated',
  '/macro-calculator': 'macro_calculated',
  '/ideal-weight-calculator': 'ideal_weight_calculated',
  '/one-rep-max-calculator': 'one_rep_max_calculated',
  '/pace-calculator': 'pace_calculated',
  '/target-heart-rate-calculator': 'target_heart_rate_calculated',
  '/calories-burned-calculator': 'calories_burned_calculated',
  '/body-type-calculator': 'body_type_calculated',
  '/body-surface-area-calculator': 'body_surface_area_calculated',
  '/army-body-fat-calculator': 'army_body_fat_calculated',
  '/navy-body-fat-calculator': 'navy_body_fat_calculated',
  '/carbohydrate-calculator': 'carbohydrate_calculated',
  '/fat-intake-calculator': 'fat_intake_calculated',
  '/gfr-calculator': 'gfr_calculated',
  '/healthy-weight-calculator': 'healthy_weight_calculated',
  '/due-date-calculator': 'due_date_calculated',
  '/ovulation-calculator': 'ovulation_calculated',
  '/conception-calculator': 'conception_calculated',
  '/period-calculator': 'period_calculated',
  '/pregnancy-week-calculator': 'pregnancy_week_calculated',
  '/pregnancy-weight-gain-calculator': 'pregnancy_weight_gain_calculated',
};

export const getCalculationEventByPath = (path) => {
  return calculatorEventsByPath[path] || null;
};
