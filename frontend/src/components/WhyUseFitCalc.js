import React from 'react';
import { useTranslation } from 'react-i18next';
import ExpandableText from './ExpandableText';

const WhyUseFitCalc = () => {
  const { t } = useTranslation();

  const mobileIconWave = 'https://www.figma.com/api/mcp/asset/67c69463-7dee-4978-9803-121698d27b44';
  const mobileIconCore = 'https://www.figma.com/api/mcp/asset/f3c1cd08-92e7-483c-9777-ea8c25579e0f';
  const mobileImageInstant = 'https://www.figma.com/api/mcp/asset/916e4bef-ecde-460b-9095-074f3af297d0';
  const mobileImageFocus = 'https://www.figma.com/api/mcp/asset/c7681a08-8a5d-46f6-a7f3-3066ae90898c';
  const mobileImageExperience = 'https://www.figma.com/api/mcp/asset/6d199000-895f-4889-aabe-e0475a247f7f';
  const mobileImagePrivacy = 'https://www.figma.com/api/mcp/asset/c0e47494-ceea-4b10-882f-1fe4f840907a';

  const iconInstantResults = mobileIconWave;
  const iconFitnessFocus = mobileIconCore;
  const iconAllTools = mobileIconCore;
  const imageInstantResults = "https://www.figma.com/api/mcp/asset/60e4267e-4536-4149-ae1d-0ad38ac4c863";
  const imageFitnessFocus = "https://www.figma.com/api/mcp/asset/ba84f400-535b-4e83-bb44-442c8cce3ca8";
  const imageMobileFirst = "https://www.figma.com/api/mcp/asset/72c22289-79ae-4469-967d-0d3f4a714d8b";
  const imageAllTools = "https://www.figma.com/api/mcp/asset/4e8a3d83-7060-4810-88ef-408e4ee180bb";

  const mobileCards = [
    {
      id: 'instant',
      title: t('whyUseFitCalc.mobile.card1.title', { defaultValue: 'Instant Results' }),
      description: t('whyUseFitCalc.mobile.card1.description', {
        defaultValue:
          'FitCalc is built using reliable and widely accepted fitness calculation formulas that are commonly used by trainers, nutrition planners, and health professionals worldwide.'
      }),
      icon: mobileIconWave,
      image: mobileImageInstant,
      tone: 'blue',
      iconTone: 'light',
      imageSize: 'compact'
    },
    {
      id: 'focus',
      title: t('whyUseFitCalc.mobile.card2.title', { defaultValue: 'Fitness-Only Focus' }),
      description: t('whyUseFitCalc.mobile.card2.description', {
        defaultValue: 'Speed is one of the biggest reasons users choose FitCalc. Our platform is designed for instant performance.'
      }),
      icon: mobileIconCore,
      image: mobileImageFocus,
      tone: 'beige',
      iconTone: 'dark',
      imageSize: 'tall'
    },
    {
      id: 'experience',
      title: t('whyUseFitCalc.mobile.card3.title', { defaultValue: 'Mobile-First Experience' }),
      description: t('whyUseFitCalc.mobile.card3.description', {
        defaultValue: 'Most users check fitness calculations on mobile phones. FitCalc is designed with a clean, mobile-friendly layout.'
      }),
      icon: mobileIconCore,
      image: mobileImageExperience,
      tone: 'blue',
      iconTone: 'dark',
      imageSize: 'compact'
    },
    {
      id: 'privacy',
      title: t('whyUseFitCalc.mobile.card4.title', { defaultValue: 'Privacy Focused' }),
      description: t('whyUseFitCalc.mobile.card4.description', {
        defaultValue: 'We prioritize user privacy. No login required, no data tracking, just simple calculations.'
      }),
      icon: mobileIconWave,
      image: mobileImagePrivacy,
      tone: 'beige',
      iconTone: 'light',
      imageSize: 'compact'
    }
  ];

  return (
    <section className="why-use-fitcalc">
      <div className="why-use-fitcalc-desktop">
        <div className="why-use-fitcalc-container">
        <div className="why-use-fitcalc-header">
          <h2 className="why-use-fitcalc-title">{t('whyUseFitCalc.title', { defaultValue: 'Why Use FitCalc?' })}</h2>
          <p className="why-use-fitcalc-description">
            {t('whyUseFitCalc.description', { defaultValue: 'FitCalc is built for people who want fast and accurate fitness calculations without confusion. From body measurements and calorie planning to nutrition and pregnancy tools, FitCalc provides reliable formulas, clean results, and a mobile-friendly experience designed for real daily usage. Instead of searching multiple websites for different calculators, you get everything in one place - quick, private, and easy to use.' })}
          </p>
        </div>
        
        {/* First Row */}
        <div className="why-benefits-row">
          {/* Card 1: Instant Results */}
          <div className="why-benefit-card card-light-blue card-small">
            <div className="card-content">
              <div className="why-benefit-icon-container icon-white">
                <img src={iconInstantResults} alt="" className="why-benefit-icon-img" />
              </div>
              <h3 className="why-benefit-title">{t('whyUseFitCalc.card1.title', { defaultValue: 'Instant Results' })}</h3>
              <ExpandableText className="why-benefit-description">
                {t('whyUseFitCalc.card1.description', { defaultValue: 'FitCalc is built using reliable and widely accepted fitness calculation formulas that are commonly used by trainers, nutrition planners, and health professionals worldwide. Instead of showing random estimates, our calculators focus on providing accurate results based on real data standards. Whether you are calculating BMI, body fat percentage, calorie intake, or macro requirements, FitCalc ensures your output is consistent, trustworthy, and realistic. This helps users avoid confusion caused by different websites giving different results and makes fitness planning much more reliable.' })}
              </ExpandableText>
            </div>
            <img src={imageInstantResults} alt="" className="why-benefit-bg-image image-top-right-1" />
          </div>

          {/* Card 2: Fitness-Only Focus */}
          <div className="why-benefit-card card-light-beige card-large">
            <div className="card-content">
              <div className="why-benefit-icon-container icon-blue">
                <img src={iconFitnessFocus} alt="" className="why-benefit-icon-img" />
              </div>
              <h3 className="why-benefit-title">{t('whyUseFitCalc.card2.title', { defaultValue: 'Fitness-Only Focus' })}</h3>
              <ExpandableText className="why-benefit-description">
                {t('whyUseFitCalc.card2.description', { defaultValue: 'Speed is one of the biggest reasons users choose FitCalc. Our platform is designed for instant performance, meaning users can enter their details and get results within seconds. You do not need to scroll through long articles or wait for heavy pages to load. Everything is structured for quick use, making FitCalc perfect for people who want immediate answers while planning meals, tracking weight goals, or checking fitness progress during workouts. This makes FitCalc not just a website, but a daily-use fitness tool.' })}
              </ExpandableText>
            </div>
            <img src={imageFitnessFocus} alt="" className="why-benefit-bg-image image-top-right-2" />
          </div>
        </div>

        {/* Second Row */}
        <div className="why-benefits-row">
          {/* Card 3: Mobile-First Experience */}
          <div className="why-benefit-card card-light-beige card-large">
            <div className="card-content">
              <div className="why-benefit-icon-container icon-blue">
                <img src={iconFitnessFocus} alt="" className="why-benefit-icon-img" />
              </div>
              <h3 className="why-benefit-title">{t('whyUseFitCalc.card3.title', { defaultValue: 'Mobile-First Experience' })}</h3>
              <ExpandableText className="why-benefit-description">
                {t('whyUseFitCalc.card3.description', { defaultValue: 'Most users check fitness calculations on mobile phones, especially at the gym, while shopping, or while planning nutrition. FitCalc is designed with a clean, mobile-friendly layout so users can easily enter details, select options, and view results without zooming in or struggling with small buttons. The design is responsive, smooth, and optimized for all screen sizes. This ensures that FitCalc remains practical for real daily fitness usage, not just desktop users.' })}
              </ExpandableText>
            </div>
            <img src={imageMobileFirst} alt="" className="why-benefit-bg-image image-top-right-3" />
          </div>

          {/* Card 4: All Tools in One Place */}
          <div className="why-benefit-card card-light-blue card-small">
            <div className="card-content">
              <div className="why-benefit-icon-container icon-white">
                <img src={iconInstantResults} alt="" className="why-benefit-icon-img" />
              </div>
              <h3 className="why-benefit-title">{t('whyUseFitCalc.card4.title', { defaultValue: 'All Tools in One Place' })}</h3>
              <ExpandableText className="why-benefit-description">
                {t('whyUseFitCalc.card4.description', { defaultValue: 'FitCalc is designed to be free and accessible for all users. Fitness tools should not be limited to premium memberships or paid subscriptions. That is why FitCalc provides essential calculators without hidden paywalls, allowing anyone to check their fitness metrics, nutrition plans, and wellness numbers anytime. This makes FitCalc a platform that supports healthy lifestyle decisions without cost barriers.' })}
              </ExpandableText>
            </div>
            <img src={imageAllTools} alt="" className="why-benefit-bg-image image-top-right-4" />
          </div>
        </div>
        </div>
      </div>

      <div className="why-use-fitcalc-mobile">
        <h2 className="why-mobile-title">{t('whyUseFitCalc.title', { defaultValue: 'Why Use FitCalc?' })}</h2>
        <p className="why-mobile-intro">
          {t('whyUseFitCalc.mobileIntro', {
            defaultValue:
              'FitCalc is built for people who want fast and accurate fitness calculations without confusion. From body measurements and calorie planning to nutrition and pregnancy tools, FitCalc provides reliable formulas, clean results, and a mobile-friendly experience.'
          })}
        </p>

        <div className="why-mobile-cards">
          {mobileCards.map((card) => (
            <article
              key={card.id}
              className={`why-mobile-card ${card.tone === 'blue' ? 'why-mobile-card-blue' : 'why-mobile-card-beige'}`}
            >
              <div className="why-mobile-card-head">
                <div
                  className={`why-mobile-icon-wrap ${card.iconTone === 'light' ? 'icon-wrap-light' : 'icon-wrap-dark'}`}
                >
                  <img src={card.icon} alt="" className="why-mobile-icon" />
                </div>
                <div className="why-mobile-copy-wrap">
                  <h3 className="why-mobile-card-title">{card.title}</h3>
                  <p className="why-mobile-card-description">{card.description}</p>
                </div>
              </div>

              <img
                src={card.image}
                alt=""
                className={`why-mobile-card-image ${card.imageSize === 'tall' ? 'why-mobile-card-image-tall' : 'why-mobile-card-image-compact'}`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUseFitCalc;