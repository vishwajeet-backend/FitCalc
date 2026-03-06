import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: "Are calculators free?",
      answer: "Yes! All calculators on FitCalc are completely free to use. There are no hidden fees or premium features."
    },
    {
      question: "Are results accurate?",
      answer: "Our calculators use industry-standard formulas and widely accepted health guidelines to provide accurate results. However, always consult with healthcare professionals for medical advice."
    },
    {
      question: "Is my data saved?",
      answer: "No, we do not store any personal data you enter. All calculations are performed in real-time and your information is not saved or shared."
    },
    {
      question: "Is this medical advice?",
      answer: "FitCalc provides educational calculations only. Our tools are not intended to replace professional medical advice, diagnosis, or treatment."
    },
    {
      question: "Is this medical advice?",
      answer: "FitCalc provides educational calculations only. Our tools are not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">Everything you need to know about FitCalc</p>
      </div>
      
      <div className="faq-container">
        {faqItems.map((item, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>
              <svg 
                className={`faq-chevron ${openIndex === index ? 'rotated' : ''}`}
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
              >
                <path 
                  d="M5 7.5L10 12.5L15 7.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;