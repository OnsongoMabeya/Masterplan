/**
 * In-memory store for offline data caching
 * Provides a simple reactive store for tasks, progress, and other data
 */

class Store {
  constructor() {
    this.data = {
      tasks: [],
      progress: [],
      metrics: [],
      quarterlyData: null,
      user: null,
      lastSync: null
    };
    
    this.listeners = new Map();
  }

  // Get data
  get(key) {
    return this.data[key];
  }

  // Set data and notify listeners
  set(key, value) {
    this.data[key] = value;
    this.data.lastSync = new Date().toISOString();
    this.notify(key, value);
  }

  // Update specific item in array
  updateItem(key, predicate, updates) {
    const items = this.data[key];
    if (!Array.isArray(items)) return;

    const index = items.findIndex(predicate);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      this.notify(key, items);
    }
  }

  // Subscribe to changes
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key).push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(key);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  // Notify listeners
  notify(key, value) {
    const callbacks = this.listeners.get(key) || [];
    callbacks.forEach(callback => callback(value));
  }

  // Clear all data
  clear() {
    this.data = {
      tasks: [],
      progress: [],
      metrics: [],
      quarterlyData: null,
      user: null,
      lastSync: null
    };
    this.listeners.clear();
  }

  // Get last sync time
  getLastSync() {
    return this.data.lastSync;
  }

  // Check if data is stale (older than 5 minutes)
  isStale(maxAge = 5 * 60 * 1000) {
    if (!this.data.lastSync) return true;
    const age = Date.now() - new Date(this.data.lastSync).getTime();
    return age > maxAge;
  }
}

// Create singleton instance
export const store = new Store();

// Helper functions for common operations
export const storeTasks = (tasks) => store.set('tasks', tasks);
export const storeProgress = (progress) => store.set('progress', progress);
export const storeMetrics = (metrics) => store.set('metrics', metrics);
export const storeQuarterlyData = (data) => store.set('quarterlyData', data);
export const storeUser = (user) => store.set('user', user);

export const getTasks = () => store.get('tasks');
export const getProgress = () => store.get('progress');
export const getMetrics = () => store.get('metrics');
export const getQuarterlyData = () => store.get('quarterlyData');
export const getUser = () => store.get('user');

// Update task completion status
export const updateTaskStatus = (taskKey, isDone) => {
  store.updateItem('tasks', t => t.task_key === taskKey, { is_done: isDone });
};

// Update progress for a domain
export const updateDomainProgress = (domain, updates) => {
  store.updateItem('progress', p => p.domain === domain, updates);
};
