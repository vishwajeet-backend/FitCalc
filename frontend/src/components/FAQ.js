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
      question: t('faq.q2', { defaultValue: 'Do I need to create an account?' }),
      answer: t('faq.a2', { defaultValue: 'No, you do not need to create an account to use our calculators. All calculations are performed in real-time and your information is not saved or shared.' })
    },
    {
      question: t('faq.q3', { defaultValue: 'How accurate are the results?' }),
      answer: t('faq.a3', { defaultValue: 'Our calculators use industry-standard formulas and widely accepted health guidelines to provide accurate results. However, always consult with healthcare professionals for medical advice.' })
    },
    {
      question: t('faq.q4', { defaultValue: 'Can I use this on mobile?' }),
      answer: t('faq.a4', { defaultValue: 'Yes, FitCalc is fully responsive and can be used on any device with a web browser, including smartphones and tablets.' })
    },
    {
      question: t('faq.q5', { defaultValue: 'Is my data secure?' }),
      answer: t('faq.a5', { defaultValue: 'Yes, your data is secure with us. We do not store any personal information you enter into our calculators. All calculations are performed in real-time and your information is not saved or shared.' })
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