import db from '../../database/db.js';

export const MetricsModel = {
  async findAll() {
    return db('metrics').select('*').orderBy('category', 'asc').orderBy('label', 'asc');
  },

  async findByKey(metricKey) {
    return db('metrics').where({ metric_key: metricKey }).first();
  },

  async findByCategory(category) {
    return db('metrics').where({ category }).orderBy('label', 'asc');
  },

  async create(metricData) {
    const [id] = await db('metrics').insert(metricData);
    return this.findById(id);
  },

  async findById(id) {
    return db('metrics').where({ id }).first();
  },

  async updateValue(metricKey, currentValue) {
    await db('metrics')
      .where({ metric_key: metricKey })
      .update({
        current_value: currentValue,
        updated_at: db.fn.now()
      });
    return this.findByKey(metricKey);
  },

  async delete(metricKey) {
    return db('metrics').where({ metric_key: metricKey }).del();
  }
};

export const MetricHistoryModel = {
  async findByMetricKey(metricKey, limit = null) {
    let query = db('metric_history')
      .where({ metric_key: metricKey })
      .orderBy('recorded_at', 'desc');
    
    if (limit) {
      query = query.limit(limit);
    }
    
    return query;
  },

  async create(historyData) {
    const [id] = await db('metric_history').insert(historyData);
    return db('metric_history').where({ id }).first();
  },

  async deleteByMetricKey(metricKey) {
    return db('metric_history').where({ metric_key: metricKey }).del();
  }
};
