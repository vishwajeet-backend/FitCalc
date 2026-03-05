const mongoose = require('mongoose');

const CalculationHistorySchema = new mongoose.Schema({
  calculatorType: {
    type: String,
    required: true,
    enum: [
      'bmi', 'bmr', 'calorie', 'tdee', 'body-fat', 'navy-body-fat', 'army-body-fat',
      'lean-body-mass', 'ideal-weight', 'healthy-weight', 'macro', 'protein', 
      'carbohydrate', 'fat-intake', 'calories-burned', 'one-rep-max', 'pace',
      'target-heart-rate', 'body-type', 'body-surface-area', 'gfr',
      'pregnancy-due-date', 'pregnancy-weight-gain', 'pregnancy-week', 
      'conception', 'ovulation', 'period'
    ],
    index: true
  },
  
  // Input data (flexible for different calculator types)
  inputData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  
  // Calculated results (flexible for different calculator types)
  results: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  
  // Optional user tracking (for authenticated users later)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Session tracking for anonymous users
  sessionId: {
    type: String,
    index: true
  },
  
  // Metadata
  ipAddress: String,
  userAgent: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
CalculationHistorySchema.index({ calculatorType: 1, createdAt: -1 });
CalculationHistorySchema.index({ sessionId: 1, createdAt: -1 });
CalculationHistorySchema.index({ userId: 1, createdAt: -1 });

// Auto-delete old records after 90 days (optional - can be adjusted)
CalculationHistorySchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // 90 days

module.exports = mongoose.model('CalculationHistory', CalculationHistorySchema);
