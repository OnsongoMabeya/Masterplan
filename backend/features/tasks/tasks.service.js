import * as tasksModel from './tasks.model.js';
import * as progressModel from '../progress/progress.model.js';

export const getAllTasks = async () => {
  return await tasksModel.getAllTasks();
};

export const getTasksByDomain = async (domain) => {
  return await tasksModel.getTasksByDomain(domain);
};

export const searchTasks = async (filters) => {
  return await tasksModel.searchTasks(filters);
};

export const toggleTask = async (taskKey) => {
  const updatedTask = await tasksModel.toggleTask(taskKey);
  
  if (!updatedTask) {
    throw new Error('Task not found');
  }

  await progressModel.recalculateAllProgress();

  return updatedTask;
};

export const getTaskStats = async () => {
  const allTasks = await tasksModel.getAllTasks();
  const totalTasks = allTasks.length;
  const doneTasks = allTasks.filter(t => t.is_done).length;
  const percentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const domainCounts = await tasksModel.getTaskCountsByDomain();

  return {
    total: totalTasks,
    done: doneTasks,
    percentage,
    byDomain: domainCounts
  };
};
