import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import Navigation from './components/Navigation';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/User/Profile';
import JobList from './components/Job/JobList';
import PostJob from './components/Job/PostJob';
import RegisterCompany from './components/Company/RegisterCompany';
import MyApplications from './components/MyApplications';
import RecruiterDashboard from './components/RecruiterDashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Applicants from './components/Applicants';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Student routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute requiredRole="student">
                <JobList />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-applications"
            element={
              <PrivateRoute requiredRole="student">
                <MyApplications />
              </PrivateRoute>
            }
          />

          {/* Recruiter routes */}
          <Route
            path="/post-job"
            element={
              <PrivateRoute requiredRole="recruiter">
                <PostJob />
              </PrivateRoute>
            }
          />
          {/* Changed /register-company to /company/register for consistency with the new Navigation link */}
          <Route
            path="/company/register"
            element={
              <PrivateRoute requiredRole="recruiter">
                <RegisterCompany />
              </PrivateRoute>
            }
          />
          <Route
            path="/recruiter/dashboard"
            element={
              <PrivateRoute requiredRole="recruiter">
                <RecruiterDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/recruiter/job/:jobId/applicants"
            element={
              <PrivateRoute requiredRole="recruiter">
                <Applicants />
              </PrivateRoute>
            }
          />
          
          {/* Default route */}
          <Route path="/" element={<Navigate to="/jobs" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;