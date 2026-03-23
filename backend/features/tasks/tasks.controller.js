import * as tasksService from './tasks.service.js';
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js';

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();
    sendSuccess(res, tasks);
  } catch (error) {
    next(error);
  }
};

export const getTasksByDomain = async (req, res, next) => {
  try {
    const { domain } = req.params;
    const tasks = await tasksService.getTasksByDomain(domain);
    sendSuccess(res, tasks);
  } catch (error) {
    next(error);
  }
};

export const searchTasks = async (req, res, next) => {
  try {
    const filters = {
      domain: req.query.domain,
      query: req.query.q,
      is_done: req.query.is_done === 'true' ? true : req.query.is_done === 'false' ? false : undefined
    };

    const tasks = await tasksService.searchTasks(filters);
    sendSuccess(res, tasks);
  } catch (error) {
    next(error);
  }
};

export const toggleTask = async (req, res, next) => {
  try {
    const { task_key } = req.body;
    
    if (!task_key) {
      return sendError(res, 'task_key is required', 400);
    }

    const task = await tasksService.toggleTask(task_key);
    sendSuccess(res, task, 'Task toggled successfully');
  } catch (error) {
    if (error.message === 'Task not found') {
      return sendError(res, 'Task not found', 404);
    }
    next(error);
  }
};

export const getTaskStats = async (req, res, next) => {
  try {
    const stats = await tasksService.getTaskStats();
    sendSuccess(res, stats);
  } catch (error) {
    next(error);
  }
};
