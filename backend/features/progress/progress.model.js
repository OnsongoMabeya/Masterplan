import db from '../../database/db.js';

export const getAllProgress = async () => {
  return await db('progress').select('*').orderBy('domain', 'asc');
};

export const getProgressByDomain = async (domain) => {
  return await db('progress').where({ domain }).first();
};

export const updateProgress = async (domain, doneCount, totalCount) => {
  const percentage = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const existing = await getProgressByDomain(domain);

  if (existing) {
    await db('progress')
      .where({ domain })
      .update({
        done_count: doneCount,
        total_count: totalCount,
        percentage,
        updated_at: db.fn.now()
      });
  } else {
    await db('progress').insert({
      domain,
      done_count: doneCount,
      total_count: totalCount,
      percentage
    });
  }

  return await getProgressByDomain(domain);
};

export const recalculateAllProgress = async () => {
  const taskCounts = await db('tasks')
    .select('domain')
    .count('* as total')
    .sum(db.raw('CASE WHEN is_done = 1 THEN 1 ELSE 0 END as done'))
    .groupBy('domain');

  for (const row of taskCounts) {
    await updateProgress(row.domain, parseInt(row.done), parseInt(row.total));
  }

  return await getAllProgress();
};
