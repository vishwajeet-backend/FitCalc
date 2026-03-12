import React from 'react';
import { useTranslation } from 'react-i18next';

const WhatIsFitCalc = () => {
  const { t } = useTranslation();

  return (
    <section className="what-is-fitcalc">
      <div className="what-is-container">
        <div className="what-is-content">
          <h2 className="section-title-small">{t('whatIsFitCalc.title', { defaultValue: 'What Is FitCalc' })}</h2>
          <div className="what-is-description">
            <p className="long-seo-paragraph">
              {t('whatIsFitCalc.paragraph', { defaultValue: 'FitCalc is a utility-first fitness calculator platform designed to help users understand their body metrics clearly and accurately. It is not a coaching website, not a blog-based fitness magazine, and not a medical tool. FitCalc focuses on providing fast and reliable fitness calculations such as BMI, body fat percentage, calorie intake, nutrition planning, pregnancy due date tracking, and additional wellness tools. Users can instantly calculate their results and make better fitness decisions without relying on guesswork or misinformation. Many people struggle with fitness planning because they do not know how many calories they should eat, what their healthy weight range is, or how much protein they require. FitCalc solves this problem.' })}
            </p>
          </div>
        </div>
        
        <div className="what-is-image">
          <div className="image-placeholder">
            <div className="placeholder-icon">📊</div>
            <p>{t('imagePlaceholder', { defaultValue: 'Image Placeholder' })}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsFitCalc;