const AdblockLog = require('../models/AdblockLog');

/**
 * Persist an adblock detection event.
 * Uses an upsert pattern: if the same (url, location, detected) combination
 * was logged in the current hour, increment the counter instead of creating
 * a new document. This keeps volume low under repeated page-loads.
 *
 * @param {Object} payload
 * @param {string} payload.location  - Page key, e.g. "bmi-calculator"
 * @param {string} payload.url       - Full page URL
 * @param {string} payload.userAgent - Browser UA string
 * @param {boolean} payload.detected - Was adblock detected?
 * @param {Object}  payload.details  - Heuristic breakdown
 * @param {Date}   [payload.ts]      - Client timestamp (defaults to now)
 * @returns {Promise<Object>} The upserted document
 */
const logAdblock = async (payload) => {
  const { location, url, userAgent, detected, details, ts } = payload;

  // Round timestamp to the current hour for dedup window
  const now = ts ? new Date(ts) : new Date();
  const hourStart = new Date(now);
  hourStart.setMinutes(0, 0, 0);

  const hourEnd = new Date(hourStart);
  hourEnd.setHours(hourEnd.getHours() + 1);

  // Try upsert: increment count if same event exists within the hour
  const result = await AdblockLog.findOneAndUpdate(
    {
      url,
      location,
      detected,
      ts: { $gte: hourStart, $lt: hourEnd },
    },
    {
      $inc: { count: 1 },
      $set: { userAgent, details },
      $setOnInsert: { ts: now },
    },
    { upsert: true, new: true }
  );

  return result;
};

/**
 * Aggregation: daily adblock detection rate per URL.
 * Useful for admin analytics dashboards.
 *
 * @param {number} [days=30] - Number of past days to aggregate
 * @returns {Promise<Array>} Aggregated results
 */
const getDailyDetectionRate = async (days = 30) => {
  const since = new Date();
  since.setDate(since.getDate() - days);

  return AdblockLog.aggregate([
    { $match: { ts: { $gte: since } } },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$ts' } },
          url: '$url',
        },
        totalHits: { $sum: '$count' },
        detectedHits: {
          $sum: { $cond: ['$detected', '$count', 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        url: '$_id.url',
        totalHits: 1,
        detectedHits: 1,
        detectionRate: {
          $round: [{ $multiply: [{ $divide: ['$detectedHits', '$totalHits'] }, 100] }, 2],
        },
      },
    },
    { $sort: { date: -1, url: 1 } },
  ]);
};

module.exports = { logAdblock, getDailyDetectionRate };
