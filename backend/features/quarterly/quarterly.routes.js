import express from 'express';
import { QuarterlyController } from './quarterly.controller.js';
import { authenticate } from '../../shared/middleware/auth.middleware.js';
import { validate } from '../../shared/middleware/validate.middleware.js';
import { createGoalSchema, updateGoalAchievedSchema } from './quarterly.schema.js';

const router = express.Router();

router.use(authenticate);

router.get('/current', QuarterlyController.getCurrentQuarter);
router.get('/all', QuarterlyController.getAllQuarters);
router.get('/:tag', QuarterlyController.getQuarterByTag);
router.post('/goals', validate(createGoalSchema), QuarterlyController.createGoal);
router.patch('/goals/:id', validate(updateGoalAchievedSchema), QuarterlyController.updateGoalAchieved);
router.delete('/goals/:id', QuarterlyController.deleteGoal);

export default router;
