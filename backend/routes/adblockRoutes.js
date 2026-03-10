const express = require('express');
const router = express.Router();
const { validateAdblockLog, handleAdblockLog } = require('../controllers/adblockController');

/**
 * Basic in-memory rate limiter for the adblock log endpoint.
 * Allows max 30 requests per IP per minute to prevent abuse.
 */
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30;

const adblockRateLimiter = (req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap.get(ip).filter(t => t > windowStart);
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  if (timestamps.length > RATE_LIMIT_MAX) {
    return res.status(429).json({ success: false, message: 'Too many requests' });
  }

  next();
};

// Periodic cleanup of rate limit map (every 5 minutes)
setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const filtered = timestamps.filter(t => t > cutoff);
    if (filtered.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, filtered);
    }
  }
}, 5 * 60 * 1000);

// POST /api/log/adblock
router.post('/', adblockRateLimiter, validateAdblockLog, handleAdblockLog);

module.exports = router;
