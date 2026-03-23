import express from 'express';
import * as tasksController from './tasks.controller.js';
import { authenticate } from '../../shared/middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', tasksController.getAllTasks);
router.get('/stats', tasksController.getTaskStats);
router.get('/search', tasksController.searchTasks);
router.get('/domain/:domain', tasksController.getTasksByDomain);
router.post('/toggle', tasksController.toggleTask);

export default router;
