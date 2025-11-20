import express from 'express';
import {
  registerCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
} from '../controllers/company.controller.js';
import authenticateToken from '../middleware/isAuthenticated.js';
import upload from '../utils/multer.js';

const companyRoutes = express.Router();

companyRoutes.post('/register', authenticateToken, registerCompany);
companyRoutes.get('/get', authenticateToken, getAllCompanies);
companyRoutes.get('/get/:id', authenticateToken, getCompanyById);
companyRoutes.put('/update/:id', authenticateToken, upload.single('logo'), updateCompany);

export default companyRoutes;