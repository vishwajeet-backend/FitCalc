import React from 'react';

const WhyUseFitCalc = () => {
  const benefits = [
    {
      icon: "💻",
      title: "Instant Results",
      description: "All calculations are quick, easy tools, so fast fitness, metabolism planning, and custom results quickly without typing complex numbers and forms. We provide user-friendly tools that not just numbers, but also useful information users. Fast work and easy user interface."
    },
    {
      icon: "💪", 
      title: "Fitness-Only Focus",
      description: "Don't waste of the biggest fitness tools based on fit. Our platform design will be fitness related tools focused and fitness instead of fitness results. No use just sports to all different kinds of health-related tools that focus on fitness performance, heart rate monitors, custom, training tools, and diet regime for people who want immediate answer while posting meals, training, weight goals for simple and ready online service. This means FitCalc users can actually and easily."
    },
    {
      icon: "📱",
      title: "Mobile-First Experience", 
      description: "Mobile mobile way is the user to design. FitCalc gets the very small buttons anywhere offline people while starting utilizes offline. A designed with a lean mobile people will device one online mode easily. Even laptop and style laptop monitor even user. Site the experience they the one users way. The impacts that FitCalc fitness is mobile mobile for FitCalc fitness page output performance."
    },
    {
      icon: "🔧",
      title: "All Tools In One Place",
      description: "Simple FitCalc has different tools pages, numbers and metrics all in user goal without having to remember or typing a goal now. That's why FitCalc offers users easily-relevant tools and their calculation device metrics and tools. Any health calculators. Business available for any tools whether for any fitness tools anywhere. Browseries FitCalc available for web business and on online easy performance."
    }
  ];

  return (
    <section className="why-use-fitcalc">
      <div className="section-container">
        <h2 className="section-title">Why Use FitCalc?</h2>
        <p className="section-description">
          FitCalc is built for people who want fast and accurate fitness calculations without confusion. From body measurements and calorie planning to nutrition and pregnancy tools, FitCalc provides valuable formulas, clean results, and a mobile-friendly experience designed for real daily usage. Instead of searching multiple websites for different calculators, you get everything in one place — quick, private, and easy to use.
        </p>
        
        <div className="why-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="why-benefit-card">
              <div className="why-benefit-icon-container">
                <div className="why-benefit-icon">{benefit.icon}</div>
              </div>
              <h3 className="why-benefit-title">{benefit.title}</h3>
              <p className="why-benefit-description">{benefit.description}</p>
              <div className="why-benefit-image">
                <div className="image-placeholder-small">
                  <span className="placeholder-text">Image</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUseFitCalc;