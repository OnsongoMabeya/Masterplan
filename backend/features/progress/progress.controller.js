import * as progressService from './progress.service.js';
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js';

export const getAllProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getAllProgress();
    sendSuccess(res, progress);
  } catch (error) {
    next(error);
  }
};

export const getProgressByDomain = async (req, res, next) => {
  try {
    const { domain } = req.params;
    const progress = await progressService.getProgressByDomain(domain);
    sendSuccess(res, progress);
  } catch (error) {
    if (error.message === 'Progress not found for domain') {
      return sendError(res, 'Progress not found for domain', 404);
    }
    next(error);
  }
};

export const recalculateProgress = async (req, res, next) => {
  try {
    const progress = await progressService.recalculateAllProgress();
    sendSuccess(res, progress, 'Progress recalculated successfully');
  } catch (error) {
    next(error);
  }
};
