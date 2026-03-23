import express from 'express';
import * as reviewController from './review.controller.js';
import { authenticate } from '../../shared/middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', reviewController.getAllReviews);
router.get('/type/:type', reviewController.getReviewsByType);
router.get('/:id', reviewController.getReviewById);
router.post('/', reviewController.createReview);
router.delete('/:id', reviewController.deleteReview);

export default router;
