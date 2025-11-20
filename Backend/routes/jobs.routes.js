import express from 'express';
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJob
} from '../controllers/job.controller.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const jobRoutes = express.Router();

jobRoutes.post('/post', authenticateToken, postJob);
jobRoutes.get('/get', getAllJobs);
jobRoutes.get('/get/:id', getJobById);
jobRoutes.get('/admin/get', authenticateToken, getAdminJob);

export default jobRoutes;