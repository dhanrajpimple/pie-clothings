// controllers/reviewController.js
const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  const { productId, userId, rating, comment } = req.body;

  try {
    // Check if a review already exists for this user and product
    const existingReview = await Review.findOne({ productId, userId });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product.' });
    }

    // If no existing review, create a new review
    const newReview = new Review({
      productId,
      userId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews for a product
// Function to get product reviews
// Function to get product reviews
exports.getProductReviews = async (req, res) => {
  // Get productId from request body
  const { productId } = req.body;

  try {
    // Find reviews by productId and populate the user information
    const reviews = await Review.find({ productId }).populate('userId', ['firstName', 'lastName']); // Populate both firstName and lastName fields

    // Respond with the reviews
    res.status(200).json({ message: "this is me", reviews });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};
