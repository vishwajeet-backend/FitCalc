const express = require('express');
const router = express.Router();
const { sendFeedback, getAllFeedback } = require('../controllers/feedbackController');

// POST /api/feedback - Submit feedback
router.post('/', sendFeedback);

// GET /api/feedback - Get all feedback (for admin)
router.get('/', getAllFeedback);

module.exports = router;
