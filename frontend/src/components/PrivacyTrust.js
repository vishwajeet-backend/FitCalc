import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyTrust = () => {
  const { t } = useTranslation();

  return (
    <section className="privacy-trust">
      <div className="privacy-trust-container">
        <div className="privacy-trust-left">
          <h2 className="privacy-trust-main-title">{t('privacyTrust.title', { defaultValue: 'PRIVACY & TRUST' })}</h2>
          <div className="privacy-trust-intro">
            <p>{t('privacyTrust.intro1', { defaultValue: 'At FitCalc, we understand that fitness and health information is personal. Whether you are calculating your BMI, checking your daily calorie intake, tracking body fat percentage, planning your macros, or using our pregnancy-related tools, you deserve a platform that respects your privacy and gives you accurate results without making you feel unsafe. That is why FitCalc is designed with privacy-first principles, ensuring that every user can calculate fitness metrics confidently without worrying about how their information is used.' })}</p>
            <p>{t('privacyTrust.intro2', { defaultValue: 'Unlike many websites that collect unnecessary personal details, FitCalc keeps everything simple and secure. We do not require users to create an account, sign in, or provide personal identity details just to access calculators. You can use our tools instantly without registration, which makes FitCalc faster and more comfortable for users who want quick results. Our goal is to provide the best fitness calculators online without forcing people to share data they do not want to share.' })}</p>
          </div>
        </div>
        
        <div className="privacy-trust-right">
          <div className="privacy-trust-row">
            <div className="privacy-trust-card">
              <h3 className="privacy-card-title">{t('privacyTrust.card1.title', { defaultValue: 'Choose a Calculator' })}</h3>
              <p className="privacy-card-description">
                {t('privacyTrust.card1.description', { defaultValue: 'FitCalc works instantly without forcing users to register or create profiles. This makes the platform faster and easier for daily use, especially for people who want quick answers. You can calculate calories, BMI, macros, and other metrics without sharing personal identity. This reduces friction and improves user trust. Our goal is to keep everything accessible and simple.' })}
              </p>
            </div>
            
            <div className="privacy-trust-card">
              <h3 className="privacy-card-title">{t('privacyTrust.card2.title', { defaultValue: 'No Personal Data Stored' })}</h3>
              <p className="privacy-card-description">
                {t('privacyTrust.card2.description', { defaultValue: 'Your health details such as height, weight, age, activity level, or pregnancy information are never stored on our servers. Once you calculate and leave the page, your data is not saved or tracked. FitCalc is built as a utility-first tool, not a data collection platform. We believe user privacy is more important than analytics. This ensures you can use calculators without worry.' })}
              </p>
            </div>
          </div>
          
          <div className="privacy-trust-row">
            <div className="privacy-trust-card">
              <h3 className="privacy-card-title">{t('privacyTrust.card3.title', { defaultValue: 'Clean & Secure Platform' })}</h3>
              <p className="privacy-card-description">
                {t('privacyTrust.card3.description', { defaultValue: 'We maintain a professional UI that stays clean, simple, and distraction-free. The platform avoids clutter and does not overload users with confusing content. Even with ads, we ensure they are placed in a structured way that does not interrupt the calculation process. Everything is designed for clarity and smooth usability. This makes FitCalc feel like a trusted fitness tool.' })}
              </p>
            </div>
            
            <div className="privacy-trust-card">
              <h3 className="privacy-card-title">{t('privacyTrust.card4.title', { defaultValue: 'Safe Environment' })}</h3>
              <p className="privacy-card-description">
                {t('privacyTrust.card4.description', { defaultValue: 'FitCalc is built with a secure structure so calculations remain safe and stable. We focus on providing a clean environment where users can enter personal fitness data without fear of misuse. The platform avoids unsafe redirects, suspicious popups, and unnecessary tracking scripts. We keep the user experience minimal and protected. This makes FitCalc reliable for daily usage.' })}
              </p>
            </div>
          </div>
          
          <div className="privacy-trust-row">
            <div className="privacy-trust-card">
              <h3 className="privacy-card-title">{t('privacyTrust.card5.title', { defaultValue: 'Regular Updates' })}</h3>
              <p className="privacy-card-description">
                {t('privacyTrust.card5.description', { defaultValue: 'FitCalc is built with a secure structure so calculations remain safe and stable. We focus on providing a clean environment where users can enter personal fitness data without fear of misuse. The platform avoids unsafe redirects, suspicious popups, and unnecessary tracking scripts. We keep the user experience minimal and protected. This makes FitCalc reliable for daily usage.' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyTrust;