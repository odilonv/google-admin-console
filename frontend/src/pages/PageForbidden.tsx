import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlockIcon from '@mui/icons-material/Block';
import HomeIcon from '@mui/icons-material/Home';
import '../styles/Forbidden.css';

const PageForbidden: React.FC = () => {
  const { username, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/users');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="forbidden-container">
      <div className="forbidden-card">
        <div className="forbidden-icon">
          <BlockIcon style={{ fontSize: 100 }} />
        </div>
        
        <h1>Access Denied</h1>
        <p className="forbidden-message">
          You don't have permission to access this page.
        </p>

        {userRole && (
          <div className="user-info-box">
            <p><strong>Current User:</strong> {username}</p>
            <p><strong>Your Role:</strong> <span className="role-badge">{userRole}</span></p>
          </div>
        )}

        <div className="forbidden-description">
          <p>This page requires elevated permissions that your current role doesn't have.</p>
          <p>Please contact your administrator if you believe you should have access.</p>
        </div>

        <div className="forbidden-actions">
          <button onClick={handleGoBack} className="back-button">
            <HomeIcon fontSize="small" />
            Go to Users Page
          </button>
          <button onClick={handleLogout} className="logout-link">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageForbidden;
