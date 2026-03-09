const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    trim: true
  },
  acceptPrivacy: {
    type: Boolean,
    required: true,
    default: false
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
FeedbackSchema.index({ createdAt: -1 });
FeedbackSchema.index({ rating: -1 });
FeedbackSchema.index({ email: 1 });

module.exports = mongoose.model('Feedback', FeedbackSchema);
