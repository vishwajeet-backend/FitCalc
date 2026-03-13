import React from 'react';
import { useTranslation } from 'react-i18next';
import ExpandableText from './ExpandableText';

const PowerfulFeatures = () => {
  const { t } = useTranslation();
  const featureImage = "https://www.figma.com/api/mcp/asset/15eacb49-d8f0-4e6e-9546-0453c42539e4";

  const feature1Kicker = t('powerfulFeatures.feature1.kicker', { defaultValue: 'Fast results in seconds without loading delays or complicated steps' });
  const feature1Description = t('powerfulFeatures.feature1.description', { defaultValue: 'FitCalc is built for speed and simplicity, so users can calculate fitness metrics instantly without waiting or dealing with confusing interfaces. Whether you are checking BMI, calorie needs, body fat percentage, or ideal weight, the platform delivers results in real-time. We focus on creating a smooth experience where users can quickly input their data and get meaningful outputs. This makes FitCalc perfect for people who want fast answers while planning workouts, diet routines, or tracking their fitness progress. Every calculator is optimized to feel lightweight and responsive, even on mobile devices.' });
  const feature2Description = t('powerfulFeatures.feature2.description', { defaultValue: 'Our calculators are built using trusted, fitness-focused formulas to provide dependable and consistent results. Each tool is carefully designed to help users estimate body metrics, calories, and health ranges with clarity. Regular updates ensure calculations follow current best practices. Results are generated instantly for quick decision making. Whether planning nutrition, workouts, or progress tracking, accuracy remains our priority.' });
  const feature3Description = t('powerfulFeatures.feature3.description', { defaultValue: 'Our platform focuses on simplicity so users can calculate results without confusion or technical knowledge. Interfaces are designed to guide users step by step through inputs and results. Calculations are processed instantly for a smooth user experience. Clear result displays help users understand outcomes quickly. Minimal input steps reduce effort while improving accuracy. Anyone can use the platform easily, regardless of experience.' });
  const feature4Description = t('powerfulFeatures.feature4.description', { defaultValue: 'Users can start calculating instantly without creating accounts or sharing personal information. This makes the platform accessible and convenient for quick fitness planning needs. No login barriers mean faster access to tools when needed. We prioritize privacy and simplicity over unnecessary registration processes. Users remain in full control of their data and calculations.' });
  const feature5Description = t('powerfulFeatures.feature5.description', { defaultValue: 'Our calculators work smoothly across desktops, tablets, and mobile devices. Responsive layouts ensure accurate calculations regardless of screen size. Users can plan their goals anytime and anywhere. Interfaces automatically adapt for smaller screens without losing functionality. Fast performance ensures tools run smoothly on mobile networks as well.' });

  const feature1MobileDescription = `${feature1Kicker}${/[.!?]$/.test(feature1Kicker.trim()) ? ' ' : '. '}${feature1Description}`;

  return (
    <section className="powerful-features">
      <div className="powerful-features-container">
        {/* Left Column - Title and Description */}
        <div className="powerful-features-left">
          <h2 className="powerful-features-title">{t('powerfulFeatures.title', { defaultValue: 'Powerful Features Built for Fitness Progress' })}</h2>
          <p className="powerful-features-description">
            {t('powerfulFeatures.description', { defaultValue: 'FitCalc is designed to make fitness and health calculations simple, fast, and highly accurate for everyone. Instead of confusing charts, complicated tools, or websites filled with unnecessary steps, FitCalc offers a clean platform where users can quickly access calculators like BMI, calorie intake, body fat percentage, ideal weight, pregnancy health tracking, nutrition planning, and wellness estimations. Every tool is built using trusted formulas and organized categories so users can find what they need instantly without wasting time. Whether you are a beginner starting your fitness journey, a student learning health metrics, or someone tracking daily progress, FitCalc helps you get clear results within seconds. With a mobile-friendly layout, fast performance, and easy-to-read output, our platform ensures that users can focus on improving their health instead of struggling to understand calculations. FitCalc is built for real-life fitness needs, offering a modern experience that works smoothly across devices while keeping the process private, safe, and accessible.' })}
          </p>
        </div>

        {/* Right Column - Timeline with Features */}
        <div className="powerful-features-right">
          <div className="features-timeline">
            <div className="timeline-line"></div>
          </div>

          <div className="features-list">
            {/* Feature 1 */}
            <div className="feature-item">
              <div className="feature-ellipse"></div>
              <div className="feature-content">
                <h3 className="feature-item-title">{t('powerfulFeatures.feature1.title', { defaultValue: 'Instant Fitness Calculations' })}</h3>
                <div className="feature-item-description feature-item-description-desktop">
                  <p>{feature1Kicker}</p>
                  <p>{feature1Description}</p>
                </div>
                <ExpandableText className="feature-item-description feature-item-description-mobile">{feature1MobileDescription}</ExpandableText>
              </div>
            </div>

            {/* Feature Image */}
            <div className="feature-image-container">
              <img src={featureImage} alt="FitCalc Dashboard" className="feature-image" />
            </div>

            {/* Feature 2 */}
            <div className="feature-item">
              <div className="feature-ellipse"></div>
              <div className="feature-content">
                <h3 className="feature-item-title">{t('powerfulFeatures.feature2.title', { defaultValue: 'Fitness-Focused Accuracy' })}</h3>
                <p className="feature-item-description feature-item-description-desktop">{feature2Description}</p>
                <ExpandableText className="feature-item-description feature-item-description-mobile">{feature2Description}</ExpandableText>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-item">
              <div className="feature-ellipse"></div>
              <div className="feature-content">
                <h3 className="feature-item-title">{t('powerfulFeatures.feature3.title', { defaultValue: 'Mobile-First Experience' })}</h3>
                <p className="feature-item-description feature-item-description-desktop">{feature3Description}</p>
                <ExpandableText className="feature-item-description feature-item-description-mobile">{feature3Description}</ExpandableText>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="feature-item">
              <div className="feature-ellipse"></div>
              <div className="feature-content">
                <h3 className="feature-item-title">{t('powerfulFeatures.feature4.title', { defaultValue: 'No Sign-Up Required' })}</h3>
                <p className="feature-item-description feature-item-description-desktop">{feature4Description}</p>
                <ExpandableText className="feature-item-description feature-item-description-mobile">{feature4Description}</ExpandableText>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="feature-item">
              <div className="feature-ellipse"></div>
              <div className="feature-content">
                <h3 className="feature-item-title">{t('powerfulFeatures.feature5.title', { defaultValue: 'Ad-Supported Free Platform' })}</h3>
                <p className="feature-item-description feature-item-description-desktop">{feature5Description}</p>
                <ExpandableText className="feature-item-description feature-item-description-mobile">{feature5Description}</ExpandableText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerfulFeatures;