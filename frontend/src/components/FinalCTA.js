import React from 'react';

const FinalCTA = () => {
  return (
    <div className="final-cta-wrapper">
      <section className="final-cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Start Calculating Your Fitness Goals Today</h2>
            <p className="cta-description">
              FitCalc helps you track your health, fitness, pregnancy, and nutrition calculations in seconds.
            </p>
            <button className="cta-button">
              Use calculators →
            </button>
          </div>
        </div>
      </section>
      
      <section className="feedback-cta">
        <div className="feedback-container">
          <h2 className="feedback-title">Help Us Improve FitCalc</h2>
          <p className="feedback-description">
            Your feedback helps us improve calculator accuracy, user experience, and add more health & fitness tools. Share your suggestions anytime — users help us build.
          </p>
          
          <form className="feedback-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="John Carter" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Email address" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input type="tel" id="phone" placeholder="(555) 456-7890" />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" placeholder="Your company name" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Your service rating</label>
              <div className="star-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="feedback">Additional feedback</label>
              <textarea id="feedback" placeholder="If you have more to add, please leave it here..."></textarea>
            </div>
            
            <div className="form-checkbox">
              <input type="checkbox" id="privacy" />
              <label htmlFor="privacy">I have read and accept the Privacy Policy</label>
            </div>
            
            <button type="submit" className="submit-btn">Send Feedback</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default FinalCTA;