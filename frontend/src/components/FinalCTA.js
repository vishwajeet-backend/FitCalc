import React from 'react';
import { useTranslation } from 'react-i18next';

const FinalCTA = () => {
  const { t } = useTranslation();

  return (
    <div className="final-cta-wrapper">
      <section className="final-cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">{t('finalCta.title', { defaultValue: 'Start Calculating Your Fitness Goals Today' })}</h2>
            <p className="cta-description">
              {t('finalCta.description', { defaultValue: 'FitCalc helps you track your health, fitness, pregnancy, and nutrition calculations in seconds.' })}
            </p>
            <button className="cta-button">
              {t('finalCta.button', { defaultValue: 'Use calculators ->' })}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinalCTA;