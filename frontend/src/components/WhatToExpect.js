import React from 'react';
import { useTranslation } from 'react-i18next';

const WhatToExpect = () => {
  const { t } = useTranslation();

  const expectations = [
    {
      title: t('whatToExpect.card1.title', { defaultValue: 'Accurate & Reliable Calculations' }),
      description: t('whatToExpect.card1.description', { defaultValue: 'Built using proven formulas and widely accepted health standards, our calculators deliver consistent, precise results to help inform your fitness decisions. We use standard BMI formulas, evidence-based calorie calculation methods, and recognized body composition metrics to ensure accuracy. This means you can confidently use our tool for personal health tracking with full trust. All our calculators undergo regular accuracy checks to maintain the highest reliability standards.' })
    },
    {
      title: t('whatToExpect.card2.title', { defaultValue: 'Simple Tools That Anyone Can Use' }),
      description: t('whatToExpect.card2.description', { defaultValue: 'Anyone should be able to access simple calculation tools without needing expert knowledge. We have cut the complexity, removing jargon and technical barriers. Our calculators are designed with a clear interface and layout that makes it easy to get accurate results without prior fitness training. Whether you are new to fitness or an advanced user, our design ensures you can track your health metrics and receive immediate feedback with confidence.' })
    },
    {
      title: t('whatToExpect.card3.title', { defaultValue: 'All Calculators in One Place' }),
      description: t('whatToExpect.card3.description', { defaultValue: 'Everything you need for fitness and health tracking: BMI, body fat percentage, calorie needs, pregnancy weight gain, and more. Use our comprehensive suite of calculators to understand your body metrics and track your progress. FitCalc brings together all the essential fitness calculations you need in one convenient platform, helping you make informed decisions about your health and wellness journey.' })
    },
    {
      title: t('whatToExpect.card4.title', { defaultValue: 'All Calculators in One Place' }),
      description: t('whatToExpect.card4.description', { defaultValue: 'Testing gathered for fitness and healthcare purposes: pregnancy tracking, body composition analysis, and goal setting. Use our guidance to understand BMI calculations, pregnancy milestones, and nutritional needs. FitCalc is built to help you identify your health status and fitness goals through key recommendations tailored to your metrics. Whether you are tracking workout progress or maintaining health records, FitCalc provides everything you need in one fitness guidance platform.' })
    }
  ];

  return (
    <section className="what-expect-section">
      <div className="what-expect-container">
        <h2 className="what-expect-title">{t('whatToExpect.title', { defaultValue: 'What You Can Expect From Us' })}</h2>
        <p className="what-expect-intro">
          {t('whatToExpect.intro', { defaultValue: 'At FitCalc, we believe that everyone deserves access to a straightforward fitness calculation platform to give you a reliable way to calculate your body stats, health goals, and fitness progress using easy tools that anyone can understand. Whether you are a beginner who is just starting your journey, or someone who has been training for years, our calculators are designed to help provide clearer decision-making without needing prior fitness or nutritional knowledge.' })}
        </p>
        
        <div className="what-expect-grid">
          {expectations.map((expectation, index) => (
            <div key={index} className="expect-card">
              <div className="expect-checkmark">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="expect-card-title">{expectation.title}</h3>
              <p className="expect-card-description">{expectation.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;