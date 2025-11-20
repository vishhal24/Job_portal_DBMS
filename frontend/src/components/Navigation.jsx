import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth/AuthContext';
import '../components/styles/Navigation.css';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">JobPortal</Link>
      </div>
      <div className="navbar-center">
        {user && (
          <>
            {user.role === 'student' && (
              <>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Link to="/jobs" className="nav-link">Jobs</Link>
                <Link to="/my-applications" className="nav-link">My Applications</Link>
              </>
            )}
            {user.role === 'recruiter' && (
              <>
                {/* Corrected the dashboard link to match App.jsx route */}
                <Link to="/recruiter/dashboard" className="nav-link">Dashboard</Link> 
                <Link to="/post-job" className="nav-link">Post Job</Link>
                {/* Updated route and added an emoji for visual interest */}
                <Link to="/company/register" className="nav-link">🏢 Register Company</Link> 
              </>
            )}
            {/* Keeping profile link available for both roles */}
            {(user.role !== 'student' && user.role !== 'recruiter') && (
               <Link to="/profile" className="nav-link">Profile</Link>
            )}
          </>
        )}
      </div>
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/register" className="btn register-btn">Register</Link>
          </>
        ) : (
          <>
            <span className="welcome-text">Welcome, {user.fullname}</span>
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;