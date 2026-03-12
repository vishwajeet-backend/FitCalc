import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: t('faq.q1', { defaultValue: 'Are calculators free?' }),
      answer: t('faq.a1', { defaultValue: 'Yes! All calculators on FitCalc are completely free to use. There are no hidden fees or premium features.' })
    },
    {
      question: t('faq.q2', { defaultValue: 'Are results accurate?' }),
      answer: t('faq.a2', { defaultValue: 'Our calculators use industry-standard formulas and widely accepted health guidelines to provide accurate results. However, always consult with healthcare professionals for medical advice.' })
    },
    {
      question: t('faq.q3', { defaultValue: 'Is my data saved?' }),
      answer: t('faq.a3', { defaultValue: 'No, we do not store any personal data you enter. All calculations are performed in real-time and your information is not saved or shared.' })
    },
    {
      question: t('faq.q4', { defaultValue: 'Is this medical advice?' }),
      answer: t('faq.a4', { defaultValue: 'FitCalc provides educational calculations only. Our tools are not intended to replace professional medical advice, diagnosis, or treatment.' })
    },
    {
      question: t('faq.q5', { defaultValue: 'Is this medical advice?' }),
      answer: t('faq.a5', { defaultValue: 'FitCalc provides educational calculations only. Our tools are not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers.' })
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <h2 className="faq-title">{t('faq.title', { defaultValue: 'Frequently Asked Questions' })}</h2>
        <p className="faq-subtitle">{t('faq.subtitle', { defaultValue: 'Everything you need to know about FitCalc' })}</p>
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