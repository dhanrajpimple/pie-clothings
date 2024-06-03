// ~/controllers/reviewController.js
import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";

export const submitReview = async (reviewData) => {
  const response = await fetch(`${domain}/api/review/reviews` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit review');
  }

  return await response.json();
};

// controllers/reviewController.js
export const getReviews = async (productId) => {
  try {
    const response = await fetch(`${domain}/api/review/getreviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productId),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const reviews = await response.json();
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

