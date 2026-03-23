import { MetricsService } from './metrics.service.js';
import { sendSuccess, sendError } from '../../shared/utils/response.utils.js';

export const MetricsController = {
  async getAllMetrics(req, res) {
    try {
      const { category } = req.query;
      
      let metrics;
      if (category) {
        metrics = await MetricsService.getMetricsByCategory(category);
      } else {
        metrics = await MetricsService.getAllMetrics();
      }
      
      sendSuccess(res, metrics);
    } catch (error) {
      sendError(res, error.message, 500);
    }
  },

  async getMetricByKey(req, res) {
    try {
      const { key } = req.params;
      const metric = await MetricsService.getMetricByKey(key);
      sendSuccess(res, metric);
    } catch (error) {
      if (error.message === 'Metric not found') {
        sendError(res, error.message, 404);
      } else {
        sendError(res, error.message, 500);
      }
    }
  },

  async updateMetricValue(req, res) {
    try {
      const { key } = req.params;
      const { value, note } = req.body;
      
      const metric = await MetricsService.updateMetricValue(key, value, note);
      sendSuccess(res, metric);
    } catch (error) {
      if (error.message === 'Metric not found') {
        sendError(res, error.message, 404);
      } else {
        sendError(res, error.message, 500);
      }
    }
  },

  async getMetricHistory(req, res) {
    try {
      const { key } = req.params;
      const data = await MetricsService.getMetricHistory(key);
      sendSuccess(res, data);
    } catch (error) {
      if (error.message === 'Metric not found') {
        sendError(res, error.message, 404);
      } else {
        sendError(res, error.message, 500);
      }
    }
  },

  async createMetric(req, res) {
    try {
      const metric = await MetricsService.createMetric(req.body);
      sendSuccess(res, metric, 201);
    } catch (error) {
      if (error.message === 'Metric with this key already exists') {
        sendError(res, error.message, 409);
      } else {
        sendError(res, error.message, 500);
      }
    }
  },

  async deleteMetric(req, res) {
    try {
      const { key } = req.params;
      await MetricsService.deleteMetric(key);
      sendSuccess(res, { message: 'Metric deleted successfully' });
    } catch (error) {
      if (error.message === 'Metric not found') {
        sendError(res, error.message, 404);
      } else {
        sendError(res, error.message, 500);
      }
    }
  }
};
