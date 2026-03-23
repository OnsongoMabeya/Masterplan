import db from '../../database/db.js';

export const getAllTasks = async () => {
  return await db('tasks').select('*').orderBy('id', 'asc');
};

export const getTasksByDomain = async (domain) => {
  return await db('tasks').where({ domain }).orderBy('id', 'asc');
};

export const getTaskByKey = async (taskKey) => {
  return await db('tasks').where({ task_key: taskKey }).first();
};

export const searchTasks = async (filters) => {
  let query = db('tasks');

  if (filters.domain) {
    query = query.where({ domain: filters.domain });
  }

  if (filters.is_done !== undefined) {
    query = query.where({ is_done: filters.is_done });
  }

  if (filters.query) {
    const searchTerm = `%${filters.query}%`;
    query = query.where(function() {
      this.where('title', 'like', searchTerm)
        .orWhere('detail', 'like', searchTerm)
        .orWhere('tags', 'like', searchTerm)
        .orWhere('phase', 'like', searchTerm);
    });
  }

  return await query.orderBy('id', 'asc');
};

export const toggleTask = async (taskKey) => {
  const task = await getTaskByKey(taskKey);
  
  if (!task) {
    return null;
  }

  const newIsDone = !task.is_done;
  const doneAt = newIsDone ? db.fn.now() : null;

  await db('tasks')
    .where({ task_key: taskKey })
    .update({
      is_done: newIsDone,
      done_at: doneAt,
      updated_at: db.fn.now()
    });

  return await getTaskByKey(taskKey);
};

export const getTaskCountsByDomain = async () => {
  const counts = await db('tasks')
    .select('domain')
    .count('* as total')
    .sum(db.raw('CASE WHEN is_done = 1 THEN 1 ELSE 0 END as done'))
    .groupBy('domain');

  return counts.map(row => ({
    domain: row.domain,
    total: parseInt(row.total),
    done: parseInt(row.done)
  }));
};
