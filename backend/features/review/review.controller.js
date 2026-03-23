import * as reviewService from './review.service.js';
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js';

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAllReviews();
    sendSuccess(res, reviews);
  } catch (error) {
    next(error);
  }
};

export const getReviewsByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const reviews = await reviewService.getReviewsByType(type);
    sendSuccess(res, reviews);
  } catch (error) {
    next(error);
  }
};

export const getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await reviewService.getReviewById(parseInt(id));
    sendSuccess(res, review);
  } catch (error) {
    if (error.message === 'Review not found') {
      return sendError(res, 'Review not found', 404);
    }
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const reviewData = req.body;
    const review = await reviewService.createReview(reviewData);
    sendSuccess(res, review, 'Review created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    await reviewService.deleteReview(parseInt(id));
    sendSuccess(res, null, 'Review deleted successfully');
  } catch (error) {
    if (error.message === 'Review not found') {
      return sendError(res, 'Review not found', 404);
    }
    next(error);
  }
};
