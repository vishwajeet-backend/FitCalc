import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const [hoveredStar, setHoveredStar] = useState(0);

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

  const getStarIcon = (index) => {
    const filled = hoveredStar > 0 ? index <= hoveredStar : index <= formData.rating;
    return filled ? '★' : '☆';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    // Handle form submission here
  };

  return (
    <section className="feedback-section">
      <div className="feedback-container">
        <div className="feedback-header">
          <h2 className="feedback-title">Help Us Improve FitCalc</h2>
          <p className="feedback-description">
            Your feedback helps us improve calculator accuracy, user experience, and add more health & fitness tools. Share your suggestions anytime — it only takes a few seconds.
          </p>
        </div>
        
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Carter"
                  className="form-input"
                />
                <span className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="#6F6C8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.0834 17.5C17.0834 14.2783 13.9051 11.6666 10.0001 11.6666C6.09506 11.6666 2.91675 14.2783 2.91675 17.5" stroke="#6F6C8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email address"
                  className="form-input"
                />
                <span className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1667 17.0833H5.83341C3.33341 17.0833 1.66675 15.8333 1.66675 12.9167V7.08329C1.66675 4.16663 3.33341 2.91663 5.83341 2.91663H14.1667C16.6667 2.91663 18.3334 4.16663 18.3334 7.08329V12.9167C18.3334 15.8333 16.6667 17.0833 14.1667 17.0833Z" stroke="#6F6C8F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.1667 7.5L11.5584 9.58333C10.7001 10.2667 9.29175 10.2667 8.43341 9.58333L5.83341 7.5" stroke="#6F6C8F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(123) 456-7890"
                  className="form-input"
                />
                <span className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.1916 2.5H6.80825C4.87492 2.5 3.74158 3.63333 3.74158 5.56667V14.4333C3.74158 16.3667 4.87492 17.5 6.80825 17.5H13.1916C15.1249 17.5 16.2583 16.3667 16.2583 14.4333V5.56667C16.2583 3.63333 15.1249 2.5 13.1916 2.5Z" stroke="#6F6C8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.6667 4.58337H8.33341" stroke="#6F6C8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 15.2084C10.5753 15.2084 11.0417 14.742 11.0417 14.1667C11.0417 13.5914 10.5753 13.125 10 13.125C9.42469 13.125 8.95833 13.5914 8.95833 14.1667C8.95833 14.742 9.42469 15.2084 10 15.2084Z" stroke="#6F6C8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your company name"
                  className="form-input"
                />
                <span className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50825 17.0833V13.75C7.50825 12.8833 8.20825 12.1833 9.07492 12.1833H10.9249C11.7916 12.1833 12.4916 12.8833 12.4916 13.75V17.0833" stroke="#6F6C8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.33325 7.70004L9.17492 2.86671C9.64159 2.54171 10.3583 2.54171 10.8249 2.86671L17.6666 7.70004" stroke="#6F6C8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.33325 6.66663V14.1666C3.33325 15.9416 4.77492 17.3833 6.54992 17.3833H13.4499C15.2249 17.3833 16.6666 15.9416 16.6666 14.1666V6.66663" stroke="#6F6C8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          <div className="form-group rating-group">
            <label>Your service rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${(hoveredStar > 0 ? star <= hoveredStar : star <= formData.rating) ? 'filled' : ''}`}
                  onClick={() => handleStarRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                >
                  {getStarIcon(star)}
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
              placeholder="If you have more to add, please type it here..."
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
              <span>
                I have read and accept the <Link to="/privacy" className="checkbox-link">Privacy Policy</Link>.
              </span>
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