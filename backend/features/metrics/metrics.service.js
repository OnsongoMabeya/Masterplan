import { MetricsModel, MetricHistoryModel } from './metrics.model.js';

export const MetricsService = {
  async getAllMetrics() {
    return MetricsModel.findAll();
  },

  async getMetricByKey(metricKey) {
    const metric = await MetricsModel.findByKey(metricKey);
    if (!metric) {
      throw new Error('Metric not found');
    }

    const recentHistory = await MetricHistoryModel.findByMetricKey(metricKey, 5);
    
    return {
      ...metric,
      recentHistory
    };
  },

  async getMetricsByCategory(category) {
    return MetricsModel.findByCategory(category);
  },

  async updateMetricValue(metricKey, value, note = null) {
    const metric = await MetricsModel.findByKey(metricKey);
    if (!metric) {
      throw new Error('Metric not found');
    }

    await MetricHistoryModel.create({
      metric_key: metricKey,
      value,
      note,
      recorded_at: new Date()
    });

    const updatedMetric = await MetricsModel.updateValue(metricKey, value);
    
    return updatedMetric;
  },

  async getMetricHistory(metricKey) {
    const metric = await MetricsModel.findByKey(metricKey);
    if (!metric) {
      throw new Error('Metric not found');
    }

    const history = await MetricHistoryModel.findByMetricKey(metricKey);
    
    return {
      metric,
      history
    };
  },

  async createMetric(metricData) {
    const existing = await MetricsModel.findByKey(metricData.metric_key);
    if (existing) {
      throw new Error('Metric with this key already exists');
    }

    return MetricsModel.create(metricData);
  },

  async deleteMetric(metricKey) {
    const metric = await MetricsModel.findByKey(metricKey);
    if (!metric) {
      throw new Error('Metric not found');
    }

    await MetricHistoryModel.deleteByMetricKey(metricKey);
    await MetricsModel.delete(metricKey);
    
    return { success: true };
  }
};
