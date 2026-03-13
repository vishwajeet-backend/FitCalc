import React from 'react';
import { useTranslation } from 'react-i18next';
import ExpandableText from './ExpandableText';

const HowItWorks = () => {
  const { t } = useTranslation();

  const iconChoose = 'https://www.figma.com/api/mcp/asset/070ce5a9-ba56-468b-b44f-90e4dbe853e7';
  const iconEnter = 'https://www.figma.com/api/mcp/asset/7ec72b48-a63b-4714-a07f-ea78807d8041';
  const iconResult = 'https://www.figma.com/api/mcp/asset/ff8a9949-4bde-4abb-bd7a-2e585a9d1219';

  const steps = [
    {
      number: "01",
      icon: iconChoose,
      title: t('howItWorks.step1.title', { defaultValue: 'Choose a Calculator' }),
      description: t('howItWorks.step1.description', { defaultValue: 'FitCalc is designed to make fitness calculations easy by providing all essential tools in one place. Instead of searching multiple websites for BMI, calorie intake, body fat percentage, pregnancy tracking, or nutrition planning calculators, you can simply choose the exact calculator you need from our organized categories. Every calculator is clearly labeled and built for real fitness goals, so users can instantly find the right tool without wasting time. Whether you are a beginner starting your fitness journey or a gym-experienced user tracking performance, FitCalc helps you choose the correct calculation tool in seconds.' }),
      mobileDescription: t('howItWorks.mobile.step1.description', { defaultValue: 'Choose the right tool for BMI, calories, body fat, macros, and other health goals from one organized place.' })
    },
    {
      number: "02", 
      icon: iconEnter,
      title: t('howItWorks.step2.title', { defaultValue: 'Enter Your Details' }),
      description: t('howItWorks.step2.description', { defaultValue: 'Once you select a calculator, FitCalc asks only the necessary information required to generate accurate results. You can enter details such as height, weight, age, gender, activity level, or health-related inputs depending on the calculator you are using. Our input forms are simple, clean, and mobile-friendly, so you can easily enter numbers without confusion. FitCalc is built to support real users, meaning we avoid complex steps and unnecessary data collection. Everything is designed to feel smooth and fast, allowing you to calculate instantly without creating an account or providing personal identity information.' }),
      mobileDescription: t('howItWorks.mobile.step2.description', { defaultValue: 'Enter your age, height, weight, and activity details in simple fields so FitCalc can calculate accurate results for you.' })
    },
    {
      number: "03",
      icon: iconResult,
      title: t('howItWorks.step3.title', { defaultValue: 'Get Instant Results' }),
      description: t('howItWorks.step3.description', { defaultValue: 'After entering your details, FitCalc instantly calculates your results using trusted and widely accepted fitness formulas. The output is shown immediately on your screen in a clear and easy-to-understand format, so you can quickly interpret your numbers and take action. Whether you are calculating calories, macros, BMI, pregnancy due dates, or wellness metrics, FitCalc provides accurate results with realistic ranges that support better decision-making. Instead of guessing what to eat or how to train, you get clear data in seconds - helping you plan workouts, nutrition, and health goals with confidence.' }),
      mobileDescription: t('howItWorks.mobile.step3.description', { defaultValue: 'Get clear results instantly with practical ranges that help you plan workouts, nutrition, and daily progress with confidence.' })
    }
  ];

  return (
    <section className="how-it-works">
      <h2 className="section-title">{t('howItWorks.title', { defaultValue: 'How It Works' })}</h2>
      <p className="section-description how-it-works-intro how-it-works-intro-desktop">
        {t('howItWorks.intro', { defaultValue: 'FitCalc is designed to make fitness calculations simple, fast, and useful for everyone. Whether you are a beginner who has just started working out, someone trying to lose weight, or an experienced gym person tracking calories and strength progress, the process of using FitCalc is always the same: choose a calculator, enter your details, and instantly get accurate results. We built this platform with one goal in mind - to remove confusion from fitness planning and give users quick answers without wasting time.' })}
      </p>
      <p className="section-description how-it-works-intro how-it-works-intro-mobile">
        {t('howItWorks.mobile.intro', { defaultValue: 'FitCalc is designed to make fitness calculations simple, fast, and useful for everyone. Whether you are a beginner who has just started working out, someone trying to lose weight, or an experienced gym person tracking calories and strength progress, the process of using FitCalc is always the same: choose a calculator, enter your details, and instantly get accurate results.' })}
      </p>
      
      <div className="how-it-works-grid">
        {steps.map((step, index) => (
          <div key={index} className={`how-it-works-card how-it-works-card-${index + 1}`}>
            <div className="how-it-works-header">
              <div className="how-it-works-icon" aria-hidden="true">
                <img src={step.icon} alt="" className="how-it-works-icon-img" />
              </div>
              <div className="how-it-works-number">{step.number}</div>
            </div>
            <h3 className="how-it-works-title">{step.title}</h3>
            <ExpandableText className="how-it-works-description how-it-works-description-desktop">{step.description}</ExpandableText>
            <p className="how-it-works-description how-it-works-description-mobile">{step.mobileDescription}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;