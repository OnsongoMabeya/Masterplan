import db from '../../database/db.js';

export const QuarterlyGoalsModel = {
  async findByQuarter(quarterKey) {
    return db('quarterly_goals')
      .where({ quarter_key: quarterKey })
      .orderBy('created_at', 'asc');
  },

  async findById(id) {
    return db('quarterly_goals').where({ id }).first();
  },

  async create(goalData) {
    const [id] = await db('quarterly_goals').insert(goalData);
    return this.findById(id);
  },

  async update(id, updates) {
    await db('quarterly_goals')
      .where({ id })
      .update({
        ...updates,
        updated_at: db.fn.now()
      });
    return this.findById(id);
  },

  async delete(id) {
    return db('quarterly_goals').where({ id }).del();
  },

  async markAchieved(id, isAchieved) {
    const updates = {
      is_achieved: isAchieved,
      achieved_at: isAchieved ? db.fn.now() : null,
      updated_at: db.fn.now()
    };
    
    await db('quarterly_goals').where({ id }).update(updates);
    return this.findById(id);
  }
};

export const TasksModel = {
  async findByQuarter(quarterTag) {
    return db('tasks')
      .where({ quarter_tag: quarterTag })
      .orderBy('domain', 'asc')
      .orderBy('id', 'asc');
  },

  async getQuarterStats(quarterTag) {
    const stats = await db('tasks')
      .where({ quarter_tag: quarterTag })
      .select('domain')
      .count('* as total')
      .sum(db.raw('CASE WHEN is_done = 1 THEN 1 ELSE 0 END as done'))
      .groupBy('domain');
    
    return stats.map(s => ({
      domain: s.domain,
      total: parseInt(s.total),
      done: parseInt(s.done || 0),
      percentage: s.total > 0 ? Math.round((s.done / s.total) * 100) : 0
    }));
  },

  async getAllQuartersSummary() {
    const allTasks = await db('tasks')
      .select('quarter_tag')
      .count('* as total')
      .sum(db.raw('CASE WHEN is_done = 1 THEN 1 ELSE 0 END as done'))
      .groupBy('quarter_tag');
    
    return allTasks.map(q => ({
      quarterTag: q.quarter_tag,
      total: parseInt(q.total),
      done: parseInt(q.done || 0),
      percentage: q.total > 0 ? Math.round((q.done / q.total) * 100) : 0
    }));
  }
};
