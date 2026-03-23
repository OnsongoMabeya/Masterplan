import * as reviewModel from './review.model.js';

export const getAllReviews = async () => {
  return await reviewModel.getAllReviews();
};

export const getReviewsByType = async (reviewType) => {
  return await reviewModel.getReviewsByType(reviewType);
};

export const getReviewById = async (id) => {
  const review = await reviewModel.getReviewById(id);
  if (!review) {
    throw new Error('Review not found');
  }
  return review;
};

export const createReview = async (reviewData) => {
  return await reviewModel.createReview(reviewData);
};

export const deleteReview = async (id) => {
  const existing = await reviewModel.getReviewById(id);
  if (!existing) {
    throw new Error('Review not found');
  }
  return await reviewModel.deleteReview(id);
};
