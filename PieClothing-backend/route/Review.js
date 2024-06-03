// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { createReview, getProductReviews } = require('../controllers/ReviewController');


router.post('/reviews', createReview);


router.post('/getreviews', getProductReviews);

module.exports = router;
