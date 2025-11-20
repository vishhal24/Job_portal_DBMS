import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// User APIs
export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);
export const logoutUser = () => api.post('/users/logout');
export const updateProfile = (data) => api.put('/users/profile/update', data);

// Company APIs
export const registerCompany = (data) => api.post('/company/register', data);
export const getAllCompanies = () => api.get('/company/get');
export const getCompanyById = (id) => api.get(`/company/get/${id}`);
export const updateCompany = (id, data) => api.put(`/company/update/${id}`, data);

// Job APIs
export const postJob = (data) => api.post('/jobs/post', data);
export const getAllJobs = (keyword = '') => api.get('/jobs/get', { params: { keyword } });
export const getJobById = (id) => api.get(`/jobs/get/${id}`);
export const getAdminJobs = () => api.get('/jobs/admin/get');

// Application APIs
export const applyJob = (jobId) => api.post('/applications/apply', { jobId });
export const getAppliedJobs = () => api.get('/applications/get');
export const getApplicants = (jobId) => api.get(`/applications/${jobId}/applicants`);
export const updateApplicationStatus = (applicationId, status) =>
  api.put(`/applications/${applicationId}/status`, { status });

export default api;