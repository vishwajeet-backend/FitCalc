import React from 'react';

const WhatToExpect = () => {
  const expectations = [
    {
      icon: "🎯",
      title: "Accurate & Reliable Calculations",
      description: "Built using proven formulas and widely accepted health standards. Our calculators deliver consistent, precise results to help inform your fitness decisions. We use standard BMI formulas, evidence-based calorie calculation methods, and recognized body composition metrics to ensure accuracy. This means you can confidently use our tool for personal health tracking. All our calculators undergo regular accuracy checks to maintain the highest reliability standards."
    },
    {
      icon: "🔧", 
      title: "Simple Tools That Anyone Can Use",
      description: "Anyone should access calculating formulas with and guidance calculation free. We've cut the complexity, removing expert analytics. Calculator and not and designed with a clear interface or layout like and analytics with help building experience gets right tracking without training, and you able need a medical recording, Our design making fitness. Whether you're using fitness as feedback results are the designed. Others can receive you immediate a complete with confidence."
    },
    {
      icon: "📚",
      title: "All Calculators in One Place", 
      description: "Everything dedicated to fitness/healthcare: pregnancy, calorie tracking, and psychology. Use guidance on BMI calculation results, pregnancy calculators, and nutrition FitCalc tools to identify who you are and what fitness calculators interest through key feedback other with different metrics, fitness calculations. Boost workout, you keep close calculations. FitCalc contains all the essential steps focused guidance content to help to help users also user interface calculations, content building, data management efficiently, actually understanding your calculations: FitCalc provides everything to be for fitness guidance calculator."
    },
    {
      icon: "📊",
      title: "All Calculators in One Place",
      description: "Testing gathered for fitness/health-care: pregnancy, body tracking, and get-going. Use guidance in BMI research calculations BMI calculators, instead through key recommendations with calculators. FitCalc is built to identify who you are and fitness calculations interest through key feedback other with different metrics. fitness calculations. Boost workout, you keep and calculations. FitCalc contains essentials help focused guidance content to help to help users also user interface calculations, content building, data management efficiently, actually understanding your calculations: FitCalc provides everything designed for those going fitness guidance system."
    }
  ];

  return (
    <section className="what-to-expect">
      <h2 className="section-title">What You Can Expect From Us</h2>
      <p className="section-description">
        At FitCalc, we believe that everyone deserves access to a straightforward fitness calculation platform to give you a reliable way to calculate your body stats, health goals, and fitness progress using easy tools that anyone can understand. Whether you are a beginner who is just starting your journey, or someone who has been training for years, our calculators are designed to help provide clearer decision-making without needing prior fitness or nutritional knowledge.
      </p>
      
      <div className="expectations-grid">
        {expectations.map((expectation, index) => (
          <div key={index} className="expectation-card">
            <div className="expectation-icon">{expectation.icon}</div>
            <h3 className="expectation-title">{expectation.title}</h3>
            <p className="expectation-description">{expectation.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatToExpect;