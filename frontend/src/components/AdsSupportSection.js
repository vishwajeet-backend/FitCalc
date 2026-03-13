import React from 'react';
import { useTranslation } from 'react-i18next';

const AdsSupportSection = () => {
  const { t } = useTranslation();
  const iconAdsLight = 'https://www.figma.com/api/mcp/asset/fd8e4fb2-4106-4a15-a82d-59da6e733189';
  const iconAdsDark = 'https://www.figma.com/api/mcp/asset/c8a9d49a-83f3-4447-bcac-6ff25deb5f4e';

  const cards = [
    {
      id: 'free',
      tone: 'light',
      icon: iconAdsLight,
      title: t('adsSupport.card1.title', { defaultValue: 'Keeps Everything Free' }),
      description: t('adsSupport.card1.description', {
        defaultValue:
          'All calculators remain completely free for everyone. Ads help us maintain the platform without charging users or requiring subscriptions.'
      })
    },
    {
      id: 'new-tools',
      tone: 'dark',
      icon: iconAdsDark,
      title: t('adsSupport.card2.title', { defaultValue: 'Helps Us Build New Tools' }),
      description: t('adsSupport.card2.description', {
        defaultValue:
          'FitCalc is not a one-time calculator website - it is a growing platform that continuously expands with new calculators and improved features.'
      })
    },
    {
      id: 'maintenance',
      tone: 'light',
      icon: iconAdsLight,
      title: t('adsSupport.card3.title', { defaultValue: 'Supports Platform Maintenance' }),
      description: t('adsSupport.card3.description', {
        defaultValue:
          'Running a fast and reliable calculator platform requires continuous maintenance, updates, and improvements.'
      })
    }
  ];

  return (
    <section className="ads-support-section">
      <div className="ads-support-container">
        <h2 className="ads-support-title">{t('adsSupport.title', { defaultValue: 'Why We Use Ads' })}</h2>

        <div className="ads-support-cards">
          {cards.map((card) => (
            <article
              key={card.id}
              className={`ads-support-card ${card.tone === 'dark' ? 'card-blue' : 'card-beige'}`}
            >
              <img src={card.icon} alt="" className="ads-support-icon" />
              <h3 className={`ads-support-card-title ${card.tone === 'dark' ? 'card-blue-title' : ''}`}>
                {card.title}
              </h3>
              <p className={`ads-support-card-description ${card.tone === 'dark' ? 'card-blue-text' : ''}`}>
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdsSupportSection;
