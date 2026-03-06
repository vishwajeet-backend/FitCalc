import React from 'react';

const WhyUseFitCalc = () => {
  const iconInstantResults = "https://www.figma.com/api/mcp/asset/49aaf586-ef4e-4f4b-9c82-877a60b67f4f";
  const iconFitnessFocus = "https://www.figma.com/api/mcp/asset/83c8acf0-9c46-4bd0-9157-7a6069aa6aeb";
  const iconAllTools = "https://www.figma.com/api/mcp/asset/101a5fa5-567a-4622-8ac6-156bb627dfc9";
  const imageInstantResults = "https://www.figma.com/api/mcp/asset/60e4267e-4536-4149-ae1d-0ad38ac4c863";
  const imageFitnessFocus = "https://www.figma.com/api/mcp/asset/ba84f400-535b-4e83-bb44-442c8cce3ca8";
  const imageMobileFirst = "https://www.figma.com/api/mcp/asset/72c22289-79ae-4469-967d-0d3f4a714d8b";
  const imageAllTools = "https://www.figma.com/api/mcp/asset/4e8a3d83-7060-4810-88ef-408e4ee180bb";

  return (
    <section className="why-use-fitcalc">
      <div className="why-use-fitcalc-container">
        <div className="why-use-fitcalc-header">
          <h2 className="why-use-fitcalc-title">Why Use FitCalc?</h2>
          <p className="why-use-fitcalc-description">
            FitCalc is built for people who want fast and accurate fitness calculations without confusion. From body measurements and calorie planning to nutrition and pregnancy tools, FitCalc provides reliable formulas, clean results, and a mobile-friendly experience designed for real daily usage. Instead of searching multiple websites for different calculators, you get everything in one place — quick, private, and easy to use.
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
              <h3 className="why-benefit-title">Instant Results</h3>
              <p className="why-benefit-description">
                FitCalc is built using reliable and widely accepted fitness calculation formulas that are commonly used by trainers, nutrition planners, and health professionals worldwide. Instead of showing random estimates, our calculators focus on providing accurate results based on real data standards. Whether you are calculating BMI, body fat percentage, calorie intake, or macro requirements, FitCalc ensures your output is consistent, trustworthy, and realistic. This helps users avoid confusion caused by different websites giving different results and makes fitness planning much more reliable.
              </p>
            </div>
            <img src={imageInstantResults} alt="" className="why-benefit-bg-image image-top-right-1" />
          </div>

          {/* Card 2: Fitness-Only Focus */}
          <div className="why-benefit-card card-light-beige card-large">
            <div className="card-content">
              <div className="why-benefit-icon-container icon-blue">
                <img src={iconFitnessFocus} alt="" className="why-benefit-icon-img" />
              </div>
              <h3 className="why-benefit-title">Fitness-Only Focus</h3>
              <p className="why-benefit-description">
                Speed is one of the biggest reasons users choose FitCalc. Our platform is designed for instant performance, meaning users can enter their details and get results within seconds. You do not need to scroll through long articles or wait for heavy pages to load. Everything is structured for quick use, making FitCalc perfect for people who want immediate answers while planning meals, tracking weight goals, or checking fitness progress during workouts. This makes FitCalc not just a website, but a daily-use fitness tool.
              </p>
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
              <h3 className="why-benefit-title">Mobile-First Experience</h3>
              <p className="why-benefit-description">
                Most users check fitness calculations on mobile phones, especially at the gym, while shopping, or while planning nutrition. FitCalc is designed with a clean, mobile-friendly layout so users can easily enter details, select options, and view results without zooming in or struggling with small buttons. The design is responsive, smooth, and optimized for all screen sizes. This ensures that FitCalc remains practical for real daily fitness usage, not just desktop users.
              </p>
            </div>
            <img src={imageMobileFirst} alt="" className="why-benefit-bg-image image-top-right-3" />
          </div>

          {/* Card 4: All Tools in One Place */}
          <div className="why-benefit-card card-light-blue card-small">
            <div className="card-content">
              <div className="why-benefit-icon-container icon-white">
                <img src={iconAllTools} alt="" className="why-benefit-icon-img" />
              </div>
              <h3 className="why-benefit-title">All Tools in One Place</h3>
              <p className="why-benefit-description">
                FitCalc is designed to be free and accessible for all users. Fitness tools should not be limited to premium memberships or paid subscriptions. That is why FitCalc provides essential calculators without hidden paywalls, allowing anyone to check their fitness metrics, nutrition plans, and wellness numbers anytime. This makes FitCalc a platform that supports healthy lifestyle decisions without cost barriers.
              </p>
            </div>
            <img src={imageAllTools} alt="" className="why-benefit-bg-image image-top-right-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUseFitCalc;