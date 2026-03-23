const API_BASE = '/api/v1';

const getAuthToken = () => localStorage.getItem('auth_token');

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.hash = '#/login';
    }
    throw new Error(data.message || 'Request failed');
  }
  
  return data;
};

export const api = {
  async get(endpoint) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });
    return handleResponse(response);
  },

  async post(endpoint, body) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    });
    return handleResponse(response);
  },

  async put(endpoint, body) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    });
    return handleResponse(response);
  },

  async delete(endpoint) {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });
    return handleResponse(response);
  }
};

export const authAPI = {
  checkStatus: () => api.get('/auth/status'),
  setupPin: (pin) => api.post('/auth/setup', { pin }),
  login: (pin) => api.post('/auth/login', { pin }),
  verify: () => api.get('/auth/verify'),
  changePin: (currentPin, newPin) => api.post('/auth/change-pin', { currentPin, newPin })
};

export const tasksAPI = {
  getAll: () => api.get('/tasks'),
  getByDomain: (domain) => api.get(`/tasks/domain/${domain}`),
  search: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/tasks/search?${query}`);
  },
  toggle: (taskKey) => api.post('/tasks/toggle', { task_key: taskKey }),
  getStats: () => api.get('/tasks/stats')
};

export const progressAPI = {
  getAll: () => api.get('/progress'),
  getByDomain: (domain) => api.get(`/progress/${domain}`),
  recalculate: () => api.post('/progress/recalculate')
};

export const notesAPI = {
  getAll: () => api.get('/notes'),
  getByDomain: (domain) => api.get(`/notes/domain/${domain}`),
  getById: (id) => api.get(`/notes/${id}`),
  create: (data) => api.post('/notes', data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`)
};

export const reviewsAPI = {
  getAll: () => api.get('/reviews'),
  getByType: (type) => api.get(`/reviews/type/${type}`),
  getById: (id) => api.get(`/reviews/${id}`),
  create: (data) => api.post('/reviews', data),
  delete: (id) => api.delete(`/reviews/${id}`)
};

export const metricsAPI = {
  getAll: (category = null) => {
    const query = category ? `?category=${category}` : '';
    return api.get(`/metrics${query}`);
  },
  getByKey: (key) => api.get(`/metrics/${key}`),
  updateValue: (key, value, note = null) => api.post(`/metrics/${key}`, { value, note }),
  getHistory: (key) => api.get(`/metrics/history/${key}`),
  create: (data) => api.post('/metrics', data),
  delete: (key) => api.delete(`/metrics/${key}`)
};

export const quarterlyAPI = {
  getCurrent: () => api.get('/quarterly/current'),
  getByTag: (tag) => api.get(`/quarterly/${tag}`),
  getAll: () => api.get('/quarterly/all'),
  createGoal: (data) => api.post('/quarterly/goals', data),
  updateGoalAchieved: (id, isAchieved) => api.post(`/quarterly/goals/${id}`, { is_achieved: isAchieved }),
  deleteGoal: (id) => api.delete(`/quarterly/goals/${id}`)
};
