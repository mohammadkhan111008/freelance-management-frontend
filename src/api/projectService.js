import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/projects`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectService = {
  // GET /api/projects -> Maps to getAllProjects()
  getAll: () => apiClient.get(''),
  
  // GET /api/projects/{id} -> Maps to getProjectById(id)
  getById: (id) => apiClient.get(`/${id}`),
  
  // POST /api/projects -> Maps to createProject()
  create: (data) => apiClient.post('', data),
  
  // PUT /api/projects/{id} -> Maps to updateProject()
  update: (id, data) => apiClient.put(`/${id}`, data),
  
  // PATCH /api/projects/{id} -> Maps to updatePartialProject()
  partialUpdate: (id, field, value) => apiClient.patch(`/${id}`, { [field]: value }),
  
  // DELETE /api/projects/{id} -> Maps to deleteProject()
  delete: (id) => apiClient.delete(`/${id}`),
};