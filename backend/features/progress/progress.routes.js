import express from 'express';
import * as progressController from './progress.controller.js';
import { authenticate } from '../../shared/middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', progressController.getAllProgress);
router.get('/:domain', progressController.getProgressByDomain);
router.post('/recalculate', progressController.recalculateProgress);

export default router;
