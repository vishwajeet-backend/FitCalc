import React from 'react';

const FitnessCalculatorsGrid = () => {
  const calculatorCategories = [
    {
      title: 'Fitness Calculators',
      calculators: [
        'BMI Calculator',
        'Calorie Calculator', 
        'Body Fat Calculator',
        'TDEE Calculator',
        'Ideal Weight Calculator'
      ]
    },
    {
      title: 'Pregnancy',
      calculators: [
        'Pregnancy Calculator',
        'Pregnancy Weight Gain Calculator',
        'Pregnancy Conception Calculator',
        'Due Date Calculator',
        'Ovulation Calculator'
      ]
    },
    {
      title: 'Other',
      calculators: [
        'Macro Calculator',
        'Carbohydrate Calculator',
        'TDEE Calculator',
        'GFR Calculator',
        'Body Surface Area Calculator'
      ]
    }
  ];

  return (
    <section className="fitness-calculators-grid">
      <h2 className="calculators-title">Fitness Calculators</h2>
      <div className="calculators-container">
        {calculatorCategories.map((category, index) => (
          <div key={index} className="calculator-category">
            <h3 className="category-title">{category.title}</h3>
            <ul className="calculators-list">
              {category.calculators.map((calculator, calcIndex) => (
                <li key={calcIndex} className={`calculator-item ${calcIndex < 4 ? 'visible' : 'more-items'}`}>
                  <a href={`#${calculator.toLowerCase().replace(/\s+/g, '-')}`}>
                    {calculator}
                  </a>
                </li>
              ))}
              {category.calculators.length > 4 && (
                <li className="view-more">
                  <a href="#view-more">View More</a>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FitnessCalculatorsGrid;