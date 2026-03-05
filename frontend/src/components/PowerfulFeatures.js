import React from 'react';

const PowerfulFeatures = () => {
  const features = [
    {
      icon: "⚡",
      title: "Instant Fitness Calculations",
      description: "Calculate body metrics in seconds without loading or complicated steps. FitCalc is built for speed and simplicity, so users can calculate fitness metrics instantly without complex steps. Whether creating workout plans, tracking BMI, calories intake, body fat percentage, or ideal weight, the platform delivers results in real-time. We focus on creating a smooth experience where users never wait long to access information to help them form fitness. This makes it perfect for people who want fast answers while planning workouts, diet routines, or tracking their fitness progress. Every calculator is optimized to feel smooth and responsive, even on mobile devices."
    },
    {
      icon: "🎯",
      title: "Fitness-Focused Accuracy", 
      description: "Our calculators are built using industry-standard fitness formulas to provide dependable and consistent results. Each tool is carefully designed to help users estimate health metrics, body composition, and nutrition with clarity. Regular updates ensure calculations follow current fitness practices. Results are generated instantly for quick decision making. Whether planning goals or tracking progress, accuracy remains our priority, helping users make confident fitness decisions is our core goal."
    },
    {
      icon: "📱",
      title: "Mobile-First Experience",
      description: "Our platform focuses on simplicity so users can calculate results without confusion, once the page is loaded online. Nothing else is designed to just load fast by step-through layouts and results. Calculators are positioned instantly for smooth user experience. Clear simple displays help users understand outcomes precisely without visual noise that reduce effort while improving accuracy. Anyone can use the platform easily, regardless of fitness expertise."
    },
    {
      icon: "🔒",
      title: "No Sign-Up Required",
      description: "Users can start calculating instantly without creating accounts or sharing personal information. This makes the platform accessible and convenient for quick fitness needs globally. People need basic or complex calculations. No login barriers mean faster access to tools when needed. We prioritize privacy and simplicity over unnecessary registration processes. Whether visitors need instant fitness tool calculations. Immediate access helps users solve fitness questions faster."
    }
  ];

  return (
    <section className="powerful-features">
      <div className="feature-content">
        <div className="feature-text">
          <h2 className="section-title">Powerful Features Built for Fitness Progress</h2>
          <p className="section-description">
            Whether you're looking to take action, track your stats, or completely decorate 
            for everyone, FitCalc's all-in-one tools, comparison tools, and user and use 
            looking, nutrition adding notes, comparison tool. or what kind side focusing, 
            nutrition. We designed this fitness tool to user help.  data automatically from 
            their device, nutrition analytics, content. We process the money data with live 
            looking, nutrition adding, and wellness admin tools. Sure, but before you start 
            handing out necessary business between us. just data for your. Users understand 
            content. But we decided to have many other user-friendly systems from real for 
            providing real health data, FitCalc. Real health analytics, tool include: FitCalc 
            feature options, including content business, helping your business whether user 
            health tracking, or extensive help daily use progress. Unit inside we get user to do. 
            Help agencies work and simplify direct result data and improve, so many, productive 
            things. Some content just simply manage fitness tool and health analytics including 
            creating calculator, FitCalc is built to use key fitness tools, allowing a simple, 
            custom and simplify simple and tool and fitness and business performance, and 
            tracking."
          </p>
        </div>
        
        <div className="feature-image">
          <div className="mockup-container">
            <div className="device-screen">
              <div className="screen-header">Fitness Calculator</div>
              <div className="screen-content">
                <div className="calc-display">BMI: 23.4</div>
                <div className="calc-inputs">
                  <div className="input-field"></div>
                  <div className="input-field"></div>
                </div>
                <div className="calc-button">Calculate</div>
              </div>
            </div>
            <div className="gym-background">
              <div className="equipment-icon">🏋️</div>
              <div className="equipment-icon">💪</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PowerfulFeatures;