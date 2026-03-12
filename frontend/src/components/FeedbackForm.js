import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const FeedbackForm = () => {
  const { t } = useTranslation();
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    rating: 0,
    feedback: "",
    acceptPrivacy: false
  });

  // UI state
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Debug logging on mount
  useEffect(() => {
    console.log("🔵 [FeedbackForm] Component mounted");
    console.log("🔵 [FeedbackForm] API URL:", process.env.REACT_APP_API_URL || "http://localhost:5000/api");
    return () => {
      console.log("🔵 [FeedbackForm] Component unmounting");
    };
  }, []);

  // Log form data changes
  useEffect(() => {
    console.log("📝 [FeedbackForm] Form data updated:", formData);
  }, [formData]);

  // Handle input changes with logging
  const handleInputChange = (field, value) => {
    console.log(`✏️ [FeedbackForm] Input change - ${field}:`, value);
    
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    // Clear submit status when user starts editing
    if (submitStatus.message) {
      setSubmitStatus({ type: "", message: "" });
    }
  };

  // Handle star rating with logging
  const handleStarRating = (rating) => {
    console.log(`⭐ [FeedbackForm] Star rating selected:`, rating);
    
    setFormData((prev) => ({
      ...prev,
      rating
    }));

    // Clear rating validation error
    if (validationErrors.rating) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated.rating;
        return updated;
      });
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Comprehensive form validation
  const validateForm = () => {
    console.log("🔍 [FeedbackForm] Starting form validation...");
    const errors = {};

    // Name validation
    if (!formData.name || formData.name.trim() === "") {
      errors.name = t('feedback.errors.nameRequired', { defaultValue: 'Name is required' });
      console.log("❌ [FeedbackForm] Validation failed: Name is empty");
    }

    // Email validation
    if (!formData.email || formData.email.trim() === "") {
      errors.email = t('feedback.errors.emailRequired', { defaultValue: 'Email is required' });
      console.log("❌ [FeedbackForm] Validation failed: Email is empty");
    } else if (!isValidEmail(formData.email)) {
      errors.email = t('feedback.errors.emailInvalid', { defaultValue: 'Please enter a valid email address' });
      console.log("❌ [FeedbackForm] Validation failed: Invalid email format");
    }

    // Rating validation
    if (!formData.rating || formData.rating === 0) {
      errors.rating = t('feedback.errors.ratingRequired', { defaultValue: 'Please select a star rating' });
      console.log("❌ [FeedbackForm] Validation failed: No rating selected");
    }

    // Privacy policy validation
    if (!formData.acceptPrivacy) {
      errors.acceptPrivacy = t('feedback.errors.privacyRequired', { defaultValue: 'You must accept the privacy policy' });
      console.log("❌ [FeedbackForm] Validation failed: Privacy policy not accepted");
    }

    setValidationErrors(errors);

    const isValid = Object.keys(errors).length === 0;
    console.log(isValid ? "✅ [FeedbackForm] Validation passed" : "❌ [FeedbackForm] Validation failed with errors:", errors);
    
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 [FeedbackForm] Form submission initiated");
    console.log("📋 [FeedbackForm] Current form data:", formData);

    // Clear previous status
    setSubmitStatus({ type: "", message: "" });

    // Validate form
    if (!validateForm()) {
      console.log("⛔ [FeedbackForm] Submission aborted due to validation errors");
      setSubmitStatus({
        type: "error",
        message: t('feedback.errors.fixForm', { defaultValue: 'Please fix the errors in the form' })
      });
      return;
    }

    setIsSubmitting(true);
    console.log("⏳ [FeedbackForm] Submitting to backend...");

    try {
      // Determine API URL
      const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
      const apiUrl = `${apiBaseUrl}/feedback`;
      
      console.log("🌐 [FeedbackForm] API URL:", apiUrl);

      // Prepare payload
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        rating: Number(formData.rating),
        feedback: formData.feedback.trim() || undefined,
        acceptPrivacy: formData.acceptPrivacy
      };

      console.log("📦 [FeedbackForm] Request payload:", payload);

      // Make API request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      console.log("📡 [FeedbackForm] Response status:", response.status, response.statusText);

      // Parse response
      let result;
      try {
        result = await response.json();
        console.log("📥 [FeedbackForm] Response data:", result);
      } catch (parseError) {
        console.error("❌ [FeedbackForm] Failed to parse response JSON:", parseError);
        throw new Error("Invalid response from server");
      }

      // Handle success
      if (response.ok && result.success) {
        console.log("✅ [FeedbackForm] Feedback submitted successfully!");
        console.log("🆔 [FeedbackForm] Feedback ID:", result.feedbackId);
        
        setShowSuccessPopup(true);
        setSubmitStatus({
          type: "success",
          message: result.message || t('feedback.success.thanks', { defaultValue: 'Thank you for your feedback!' })
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          rating: 0,
          feedback: "",
          acceptPrivacy: false
        });
        setHoveredStar(0);
        setValidationErrors({});

        console.log("🔄 [FeedbackForm] Form reset complete");

        // Auto-close popup after 5 seconds
        setTimeout(() => {
          console.log("⏱️ [FeedbackForm] Auto-closing success popup");
          setShowSuccessPopup(false);
        }, 5000);
      } 
      // Handle error response
      else {
        console.error("❌ [FeedbackForm] Backend returned error:", result);
        setSubmitStatus({
          type: "error",
          message: result.message || t('feedback.errors.submitFailed', { defaultValue: 'Failed to send feedback. Please try again.' })
        });
      }
    } catch (error) {
      console.error("💥 [FeedbackForm] Network or system error:", error);
      console.error("💥 [FeedbackForm] Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });

      setSubmitStatus({
        type: "error",
        message: t('feedback.errors.network', { defaultValue: 'Network error. Please check your connection and try again.' })
      });
    } finally {
      setIsSubmitting(false);
      console.log("🏁 [FeedbackForm] Submission process completed");
    }
  };

  return (
    <>
      <section className="feedback-section">
        <div className="feedback-container">

          <div className="feedback-header">
            <h2 className="feedback-title">{t('feedback.title', { defaultValue: 'Help Us Improve FitCalc' })}</h2>
            <p className="feedback-description">
              {t('feedback.description', { defaultValue: 'Your feedback helps us improve calculator accuracy, user experience, and add more health and fitness tools. Share your suggestions anytime - users help us build.' })}
            </p>
          </div>

          <form className="feedback-form" onSubmit={handleSubmit}>

            {/* Name + Email */}
            <div className="form-row">
              <div className="form-group">
                <label>{t('feedback.fields.name', { defaultValue: 'Name' })} *</label>
                <input
                  type="text"
                  value={formData.name}
                  placeholder={t('feedback.placeholders.name', { defaultValue: 'John Carter' })}
                  className={`form-input ${validationErrors.name ? "error" : ""}`}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={isSubmitting}
                />
                {validationErrors.name && (
                  <span className="error-message">{validationErrors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label>{t('feedback.fields.email', { defaultValue: 'Email' })} *</label>
                <input
                  type="email"
                  value={formData.email}
                  placeholder={t('feedback.placeholders.email', { defaultValue: 'Email address' })}
                  className={`form-input ${validationErrors.email ? "error" : ""}`}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isSubmitting}
                />
                {validationErrors.email && (
                  <span className="error-message">{validationErrors.email}</span>
                )}
              </div>
            </div>

            {/* Phone + Company */}
            <div className="form-row">
              <div className="form-group">
                <label>{t('feedback.fields.phone', { defaultValue: 'Phone number' })}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  placeholder={t('feedback.placeholders.phone', { defaultValue: '(555) 456-7890' })}
                  className="form-input"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label>{t('feedback.fields.company', { defaultValue: 'Company' })}</label>
                <input
                  type="text"
                  value={formData.company}
                  placeholder={t('feedback.placeholders.company', { defaultValue: 'Your company name' })}
                  className="form-input"
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Star Rating */}
            <div className="form-group rating-group">
              <label>{t('feedback.fields.rating', { defaultValue: 'Your service rating' })} *</label>

              <div
                className="star-rating"
                onMouseLeave={() => !isSubmitting && setHoveredStar(0)}
              >
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const displayRating = hoveredStar || formData.rating;
                  const isFilled = starValue <= displayRating;

                  return (
                    <button
                      type="button"
                      key={starValue}
                      className={`star ${isFilled ? "filled" : ""}`}
                      onClick={() => !isSubmitting && handleStarRating(starValue)}
                      onMouseEnter={() => !isSubmitting && setHoveredStar(starValue)}
                      disabled={isSubmitting}
                      aria-label={t('feedback.ratingAria', { defaultValue: 'Rate {{value}} out of 5 stars', value: starValue })}
                    >
                      ★
                    </button>
                  );
                })}

                {formData.rating > 0 && (
                  <span className="rating-text">
                    {t('feedback.ratingValue', { defaultValue: '{{value}} out of 5', value: formData.rating })}
                  </span>
                )}
              </div>
              
              {validationErrors.rating && (
                <span className="error-message">{validationErrors.rating}</span>
              )}
            </div>

            {/* Additional Feedback */}
            <div className="form-group">
              <label>{t('feedback.fields.additional', { defaultValue: 'Additional feedback' })}</label>
              <textarea
                value={formData.feedback}
                placeholder={t('feedback.placeholders.additional', { defaultValue: 'If you have more to add, please leave it here...' })}
                className="form-textarea"
                rows="5"
                onChange={(e) => handleInputChange("feedback", e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.acceptPrivacy}
                  onChange={(e) => handleInputChange("acceptPrivacy", e.target.checked)}
                  disabled={isSubmitting}
                  className={validationErrors.acceptPrivacy ? "error" : ""}
                />
                <span>
                  {t('feedback.privacyPrefix', { defaultValue: 'I have read and accept the' })}{" "}
                  <Link to="/privacy" className="checkbox-link">
                    {t('privacyPolicy')}
                  </Link>
                </span>
              </label>
              {validationErrors.acceptPrivacy && (
                <span className="error-message">{validationErrors.acceptPrivacy}</span>
              )}
            </div>

            {/* Status Message */}
            {submitStatus.message && (
              <div className={`feedback-status ${submitStatus.type}`}>
                {submitStatus.type === "error" && "⚠️ "}
                {submitStatus.type === "success" && "✅ "}
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="feedback-submit-btn"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> {t('feedback.sending', { defaultValue: 'Sending...' })}
                </>
              ) : (
                t('feedback.send', { defaultValue: 'Send Feedback' })
              )}
            </button>

          </form>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div
          className="success-popup-overlay"
          onClick={() => setShowSuccessPopup(false)}
          role="dialog"
          aria-labelledby="success-title"
        >
          <div
            className="success-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="success-icon">✓</div>
            <h3 id="success-title">{t('feedback.success.title', { defaultValue: 'Message Sent Successfully!' })}</h3>
            <p>
              {t('feedback.success.message', { defaultValue: 'Thank you for your feedback. We appreciate your input and will use it to improve FitCalc.' })}
            </p>

            <button
              className="popup-close-btn"
              onClick={() => setShowSuccessPopup(false)}
              aria-label={t('feedback.success.closeAria', { defaultValue: 'Close success message' })}
            >
              {t('feedback.success.close', { defaultValue: 'Close' })}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;