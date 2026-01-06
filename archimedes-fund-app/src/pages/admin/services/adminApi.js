/**
 * Admin API Service Layer
 * 
 * Centralized API calls for admin dashboard
 * Handles authentication headers and error handling
 */

const API_BASE = '/.netlify/functions';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Generic API call handler
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      headers: getAuthHeaders(),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

// ============================================
// SUBMISSIONS API
// ============================================

export const submissionsApi = {
  getAll: () => apiCall('admin-get-submissions'),
  
  updateStatus: (type, id, status) => 
    apiCall(`admin-update-${type}-status`, {
      method: 'POST',
      body: JSON.stringify({ id, status }),
    }),
};

// ============================================
// BOOKS API
// ============================================

export const booksApi = {
  getAll: () => apiCall('admin-books-get-all'),
  
  create: (book) => 
    apiCall('admin-books-create', {
      method: 'POST',
      body: JSON.stringify(book),
    }),
  
  update: (book) => 
    apiCall('admin-books-update', {
      method: 'PUT',
      body: JSON.stringify(book),
    }),
  
  delete: (id) => 
    apiCall('admin-books-delete', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    }),
};

// ============================================
// PROJECTS API
// ============================================

export const projectsApi = {
  getAll: () => apiCall('admin-projects-get-all'),
  
  create: (project) => 
    apiCall('admin-projects-create', {
      method: 'POST',
      body: JSON.stringify(project),
    }),
  
  update: (project) => 
    apiCall('admin-projects-update', {
      method: 'PUT',
      body: JSON.stringify(project),
    }),
  
  delete: (id) => 
    apiCall('admin-projects-delete', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    }),
};

// ============================================
// PASSIONS API
// ============================================

export const passionsApi = {
  getAll: () => apiCall('admin-passions-get-all'),
  
  create: (passion) => 
    apiCall('admin-passions-create', {
      method: 'POST',
      body: JSON.stringify(passion),
    }),
  
  update: (passion) => 
    apiCall('admin-passions-update', {
      method: 'PUT',
      body: JSON.stringify(passion),
    }),
  
  delete: (id) => 
    apiCall('admin-passions-delete', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    }),
};

// ============================================
// THERAPIST API
// ============================================

export const therapistApi = {
  getSessions: () => apiCall('admin-therapist-get-sessions'),
  
  getMessages: (sessionId) => 
    apiCall(`admin-therapist-get-messages?sessionId=${sessionId}`),
};

// ============================================
// STATS API
// ============================================

export const statsApi = {
  getBookStats: async () => {
    const data = await booksApi.getAll();
    return {
      published: data.books?.filter(b => b.status === 'published').length || 0,
      draft: data.books?.filter(b => b.status === 'draft').length || 0,
    };
  },
  
  getProjectStats: async () => {
    const data = await projectsApi.getAll();
    return {
      published: data.projects?.filter(p => p.visibility === 'published').length || 0,
      draft: data.projects?.filter(p => p.visibility === 'draft').length || 0,
    };
  },
  
  getPassionStats: async () => {
    const data = await passionsApi.getAll();
    return {
      published: data.passions?.filter(p => p.status === 'published').length || 0,
      draft: data.passions?.filter(p => p.status === 'draft').length || 0,
    };
  },
  
  getTherapistStats: async () => {
    const sessions = await therapistApi.getSessions();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return {
      total_sessions: sessions.length,
      active_sessions: sessions.filter(s => s.status === 'active').length,
      sessions_this_week: sessions.filter(s => 
        new Date(s.session_start) > weekAgo
      ).length,
      total_messages: sessions.reduce((sum, s) => sum + (s.message_count || 0), 0),
    };
  },
};

// Default export with all APIs
const adminApi = {
  submissions: submissionsApi,
  books: booksApi,
  projects: projectsApi,
  passions: passionsApi,
  therapist: therapistApi,
  stats: statsApi,
};

export default adminApi;
