import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    rating: 0,
    feedback: '',
    acceptPrivacy: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStarRating = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    // Handle form submission here
  };

  return (
    <section className="feedback-section">
      <div className="feedback-container">
        <h2 className="feedback-title">Help Us Improve FitCalc</h2>
        <p className="feedback-description">
          We value your feedback! Whether it's a bug report, service suggestion, or just
          more health & fitness tools. Share your suggestions & wishes — it helps
          a lot in new seconds.
        </p>
        
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Carter"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email address"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 555-7890"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your company name"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Your service rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${formData.rating >= star ? 'filled' : ''}`}
                  onClick={() => handleStarRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="feedback">Additional feedback</label>
            <textarea
              id="feedback"
              value={formData.feedback}
              onChange={(e) => handleInputChange('feedback', e.target.value)}
              placeholder="If you have ideas to add, please type it here..."
              className="form-textarea"
              rows="4"
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.acceptPrivacy}
                onChange={(e) => handleInputChange('acceptPrivacy', e.target.checked)}
                className="form-checkbox"
              />
              I have read and accept the Privacy Policy
            </label>
          </div>
          
          <button type="submit" className="feedback-submit-btn">
            Send Feedback
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;