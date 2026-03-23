import db from '../../database/db.js';

export const getAllReviews = async () => {
  return await db('reviews').select('*').orderBy('created_at', 'desc');
};

export const getReviewsByType = async (reviewType) => {
  return await db('reviews').where({ review_type: reviewType }).orderBy('created_at', 'desc');
};

export const getReviewById = async (id) => {
  return await db('reviews').where({ id }).first();
};

export const createReview = async (reviewData) => {
  const [id] = await db('reviews').insert(reviewData);
  return await getReviewById(id);
};

export const deleteReview = async (id) => {
  return await db('reviews').where({ id }).del();
};
