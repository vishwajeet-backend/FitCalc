const mongoose = require('mongoose');

/**
 * AdblockLog Schema
 * Stores adblock detection events for analytics.
 * No raw PII is stored — userAgent and hashed IP only.
 */
const AdblockLogSchema = new mongoose.Schema({
  /** Page identifier, e.g. "bmi-calculator" */
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  /** Full URL where detection ran */
  url: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2048,
  },
  /** Browser user-agent string */
  userAgent: {
    type: String,
    trim: true,
    maxlength: 512,
  },
  /** Whether adblock was detected */
  detected: {
    type: Boolean,
    required: true,
  },
  /** Heuristic breakdown: { domBait, fetchBait, scriptLoad, weakSignals } */
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  /** Event timestamp (client-provided or server-generated) */
  ts: {
    type: Date,
    default: Date.now,
  },
  /** Hit counter — incremented on duplicate (url + location + detected) */
  count: {
    type: Number,
    default: 1,
  },
});

// Compound index for efficient querying & upsert deduplication
AdblockLogSchema.index({ url: 1, detected: 1, ts: -1 });
AdblockLogSchema.index({ location: 1, detected: 1 });

// TTL index: auto-delete logs older than 90 days
AdblockLogSchema.index({ ts: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

module.exports = mongoose.model('AdblockLog', AdblockLogSchema);
