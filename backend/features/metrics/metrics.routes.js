import express from 'express';
import { MetricsController } from './metrics.controller.js';
import { authenticate } from '../../shared/middleware/auth.middleware.js';
import { validate } from '../../shared/middleware/validate.middleware.js';
import { createMetricSchema, updateMetricValueSchema } from './metrics.schema.js';

const router = express.Router();

router.use(authenticate);

router.get('/', MetricsController.getAllMetrics);
router.get('/:key', MetricsController.getMetricByKey);
router.post('/', validate(createMetricSchema), MetricsController.createMetric);
router.post('/:key', validate(updateMetricValueSchema), MetricsController.updateMetricValue);
router.get('/history/:key', MetricsController.getMetricHistory);
router.delete('/:key', MetricsController.deleteMetric);

export default router;
