const { validationResult, body } = require('express-validator');
const { logAdblock } = require('../services/adblockService');

/**
 * Validation rules for POST /api/log/adblock
 */
const validateAdblockLog = [
  body('location')
    .trim()
    .notEmpty().withMessage('location is required')
    .isLength({ max: 200 }).withMessage('location too long'),
  body('url')
    .trim()
    .notEmpty().withMessage('url is required')
    .isLength({ max: 2048 }).withMessage('url too long'),
  body('detected')
    .isBoolean().withMessage('detected must be a boolean'),
  body('userAgent')
    .optional()
    .trim()
    .isLength({ max: 512 }),
  body('details')
    .optional()
    .isObject().withMessage('details must be an object'),
  body('ts')
    .optional()
    .isISO8601().withMessage('ts must be a valid ISO date'),
];

/**
 * POST /api/log/adblock
 * Receives an adblock detection event and persists it.
 * Returns 204 (no content) for sendBeacon compatibility.
 */
const handleAdblockLog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { location, url, detected, details, ts } = req.body;
    const userAgent = (req.body.userAgent || req.get('user-agent') || '').slice(0, 512);

    await logAdblock({ location, url, userAgent, detected, details, ts });

    // 204 No Content — ideal for sendBeacon (no body needed)
    return res.status(204).end();
  } catch (error) {
    console.error('Adblock log error:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { validateAdblockLog, handleAdblockLog };
