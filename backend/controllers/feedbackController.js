const Feedback = require('../models/Feedback');

const sendFeedback = async (req, res) => {
  try {
    console.log('=== Feedback submission received ===');
    console.log('Request body:', req.body);
    
    const { name, email, phone, company, rating, feedback, acceptPrivacy } = req.body;

    if (!name || !email || !rating) {
      console.log('Validation failed: missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and rating'
      });
    }

    if (!acceptPrivacy) {
      console.log('Validation failed: privacy policy not accepted');
      return res.status(400).json({
        success: false,
        message: 'Please accept the privacy policy'
      });
    }

    // Get IP address and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    console.log('Creating feedback document...');
    
    // Create new feedback document
    const newFeedback = new Feedback({
      name,
      email,
      phone,
      company,
      rating: Number(rating),
      feedback,
      acceptPrivacy,
      ipAddress,
      userAgent
    });

    console.log('Feedback document created:', newFeedback);

    // Save to database
    const savedFeedback = await newFeedback.save();
    console.log('Feedback saved successfully to database:', savedFeedback._id);

    res.status(200).json({
      success: true,
      message: 'Thank you for your feedback! We appreciate your input.',
      feedbackId: savedFeedback._id
    });

  } catch (error) {

    console.error('Error sending feedback:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to send feedback. Please try again later.',
      error: error.message
    });

  }

};

// Get all feedback (for admin purposes)
const getAllFeedback = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select('-ipAddress -userAgent'); // Hide sensitive data

    const total = await Feedback.countDocuments();

    res.status(200).json({
      success: true,
      data: feedbacks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error getting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve feedback',
      error: error.message
    });
  }
};

module.exports = {
  sendFeedback,
  getAllFeedback
};