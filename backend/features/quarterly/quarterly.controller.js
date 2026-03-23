import { QuarterlyService } from './quarterly.service.js';
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js';

export const QuarterlyController = {
  async getCurrentQuarter(req, res) {
    try {
      const data = await QuarterlyService.getCurrentQuarterData();
      sendSuccess(res, data);
    } catch (error) {
      sendError(res, error.message, 500);
    }
  },

  async getQuarterByTag(req, res) {
    try {
      const { tag } = req.params;
      const data = await QuarterlyService.getQuarterData(tag);
      sendSuccess(res, data);
    } catch (error) {
      if (error.message === 'Quarter not found') {
        sendError(res, error.message, 404);
      } else {
        sendError(res, error.message, 500);
      }
    }
  },

  async getAllQuarters(req, res) {
    try {
      const quarters = await QuarterlyService.getAllQuartersBreakdown();
      sendSuccess(res, quarters);
    } catch (error) {
      sendError(res, error.message, 500);
    }
  },

  async createGoal(req, res) {
    try {
      const goal = await QuarterlyService.createGoal(req.body);
      sendSuccess(res, goal, 201);
    } catch (error) {
      sendError(res, error.message, 500);
    }
  },

  async updateGoalAchieved(req, res) {
    try {
      const { id } = req.params;
      const { is_achieved } = req.body;
      
      const goal = await QuarterlyService.markGoalAchieved(parseInt(id), is_achieved);
      sendSuccess(res, goal);
    } catch (error) {
      if (error.message === 'Goal not found') {
        sendError(res, error.message, 404);
      } else {
        sendError(res, error.message, 500);
      }
    }
  },

  async deleteGoal(req, res) {
    try {
      const { id } = req.params;
      await QuarterlyService.deleteGoal(parseInt(id));
      sendSuccess(res, { message: 'Goal deleted successfully' });
    } catch (error) {
      if (error.message === 'Goal not found') {
        sendError(res, error.message, 404);
      } else {
        sendError(res, error.message, 500);
      }
    }
  }
};
