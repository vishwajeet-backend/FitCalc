import React from 'react';

const AdsSupportSection = () => {
  const iconAds = "https://www.figma.com/api/mcp/asset/7c254d1f-1c44-43c9-9899-510de154bc21";
  const iconAdsWhite = "https://www.figma.com/api/mcp/asset/0ba2e5d0-5b1d-46e2-937c-1b87e7641ce8";

  return (
    <section className="ads-support-section">
      <div className="ads-support-container">
        <div className="ads-support-header">
          <h2 className="ads-support-title">Make Better Fitness Decisions Without Guessing</h2>
          <p className="ads-support-description">
            Fitness progress becomes difficult when you rely on assumptions instead of real numbers. Many people train consistently but still struggle because they are unsure about calories, body fat levels, ideal weight range, or whether their nutrition plan matches their goals. FitCalc removes the confusion by giving you clear, accurate, and instant calculations that help you make smarter decisions. Instead of following random advice from the internet, FitCalc provides real data that supports your fitness journey — whether you want to lose weight, gain muscle, maintain your health, or track pregnancy and wellness metrics. With FitCalc, you stop guessing and start planning with confidence.
          </p>
        </div>

        <div className="ads-support-cards">
          {/* Card 1: Ads Help Us Keep FitCalc Free */}
          <div className="ads-support-card card-beige">
            <img src={iconAds} alt="" className="ads-support-icon" />
            <h3 className="ads-support-card-title">Ads Help Us Keep FitCalc Free</h3>
            <p className="ads-support-card-description">
              Advertisements allow FitCalc to remain completely free for all users, including beginners, students, gym enthusiasts, and health-conscious individuals. Instead of forcing people to pay monthly subscriptions or purchase premium plans just to calculate BMI, calories, macros, or pregnancy-related metrics, FitCalc stays open and accessible for everyone. This means users can calculate their fitness numbers anytime without worrying about hidden costs, locked features, or limited usage. Ads support our mission of providing free and reliable fitness tools that help people make better decisions without financial barriers.
            </p>
          </div>

          {/* Card 2: Helps Us Build New Tools */}
          <div className="ads-support-card card-blue">
            <img src={iconAdsWhite} alt="" className="ads-support-icon" />
            <h3 className="ads-support-card-title card-blue-title">Helps Us Build New Tools</h3>
            <p className="ads-support-card-description card-blue-text">
              FitCalc is not a one-time calculator website — it is a growing platform that continuously expands with new calculators and improved features. Advertisements directly support the development of new tools such as advanced nutrition calculators, strength estimation calculators, wellness tracking tools, and more specialized fitness metrics. This helps us improve the overall value of the platform so users can find everything in one place instead of searching across multiple websites. With ad support, FitCalc can grow faster and provide more accurate and helpful calculators for every type of fitness goal.
            </p>
          </div>

          {/* Card 3: Supports Platform Maintenance */}
          <div className="ads-support-card card-beige">
            <img src={iconAds} alt="" className="ads-support-icon" />
            <h3 className="ads-support-card-title">Supports Platform Maintenance</h3>
            <p className="ads-support-card-description">
              Running a fast and reliable calculator platform requires continuous maintenance, updates, and improvements. Ads help FitCalc maintain stable performance, improve loading speed, optimize mobile usability, and ensure calculators work correctly across all devices. They also support regular updates to formulas, design improvements, bug fixes, and new feature releases. This allows FitCalc to remain smooth, secure, and dependable for daily users who rely on accurate results. With ad support, we can keep FitCalc professional, modern, and trustworthy without compromising user experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsSupportSection;
