import { QuarterlyGoalsModel, TasksModel } from './quarterly.model.js';
import { getCurrentQuarter, getAllPlanQuarters, getQuarterByTag } from '../../shared/utils/quarter.utils.js';
import db from '../../database/db.js';

export const QuarterlyService = {
  async getCurrentQuarterData() {
    const user = await db('users').first();
    if (!user || !user.plan_start_date) {
      throw new Error('User plan start date not set');
    }

    const { calQuarter, planQuarter } = getCurrentQuarter(user.plan_start_date);
    
    const tasks = await TasksModel.findByQuarter(planQuarter.tag);
    const domainStats = await TasksModel.getQuarterStats(planQuarter.tag);
    const goals = await QuarterlyGoalsModel.findByQuarter(planQuarter.tag);
    
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter(t => t.is_done).length;
    const percentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    
    return {
      calQuarter,
      planQuarter,
      tasks,
      domainStats,
      goals,
      completion: {
        total: totalTasks,
        done: doneTasks,
        percentage
      }
    };
  },

  async getQuarterData(quarterTag) {
    const user = await db('users').first();
    if (!user || !user.plan_start_date) {
      throw new Error('User plan start date not set');
    }

    const quarterInfo = getQuarterByTag(user.plan_start_date, quarterTag);
    if (!quarterInfo) {
      throw new Error('Quarter not found');
    }
    
    const tasks = await TasksModel.findByQuarter(quarterTag);
    const domainStats = await TasksModel.getQuarterStats(quarterTag);
    const goals = await QuarterlyGoalsModel.findByQuarter(quarterTag);
    
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter(t => t.is_done).length;
    const percentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    
    return {
      quarter: quarterInfo,
      tasks,
      domainStats,
      goals,
      completion: {
        total: totalTasks,
        done: doneTasks,
        percentage
      }
    };
  },

  async getAllQuartersBreakdown() {
    const user = await db('users').first();
    if (!user || !user.plan_start_date) {
      throw new Error('User plan start date not set');
    }

    const allQuarters = getAllPlanQuarters(user.plan_start_date);
    const tasksSummary = await TasksModel.getAllQuartersSummary();
    
    const { planQuarter: currentQuarter } = getCurrentQuarter(user.plan_start_date);
    
    const quartersWithStats = allQuarters.map(quarter => {
      const stats = tasksSummary.find(s => s.quarterTag === quarter.tag) || {
        total: 0,
        done: 0,
        percentage: 0
      };
      
      return {
        ...quarter,
        ...stats,
        isCurrent: quarter.tag === currentQuarter.tag
      };
    });
    
    return quartersWithStats;
  },

  async createGoal(goalData) {
    return QuarterlyGoalsModel.create(goalData);
  },

  async markGoalAchieved(goalId, isAchieved) {
    const goal = await QuarterlyGoalsModel.findById(goalId);
    if (!goal) {
      throw new Error('Goal not found');
    }
    
    return QuarterlyGoalsModel.markAchieved(goalId, isAchieved);
  },

  async deleteGoal(goalId) {
    const goal = await QuarterlyGoalsModel.findById(goalId);
    if (!goal) {
      throw new Error('Goal not found');
    }
    
    await QuarterlyGoalsModel.delete(goalId);
    return { success: true };
  }
};
