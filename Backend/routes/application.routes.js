import express from 'express';
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateApplicationStatus,
} from '../controllers/application.controller.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const applicationRoutes = express.Router();

applicationRoutes.post('/apply', authenticateToken, applyJob);
applicationRoutes.get('/get', authenticateToken, getAppliedJobs);
applicationRoutes.get('/:id/applicants', authenticateToken, getApplicants);
applicationRoutes.put('/:id/status', authenticateToken, updateApplicationStatus);

export default applicationRoutes;