import * as progressModel from './progress.model.js';

export const getAllProgress = async () => {
  return await progressModel.getAllProgress();
};

export const getProgressByDomain = async (domain) => {
  const progress = await progressModel.getProgressByDomain(domain);
  
  if (!progress) {
    throw new Error('Progress not found for domain');
  }
  
  return progress;
};

export const recalculateAllProgress = async () => {
  return await progressModel.recalculateAllProgress();
};
