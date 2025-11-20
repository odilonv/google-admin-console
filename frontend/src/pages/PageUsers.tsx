import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../context/RouterContext';
import { useTheme } from '../context/ThemeContext';
import { userApiService } from '../api/userApi';
import { User } from '../types';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../styles/App.css';
import '../styles/Table.css';

/**
 * PageUsers Component
 * Protected page that displays the user management table
 * 
 * Following SOLID principles:
 * - SRP: Handles only user list display logic
 * - DIP: Depends on abstractions (hooks and services)
 */
const PageUsers: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { username, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch users data from API
   * Following separation of concerns - API logic is in a separate service
   */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await userApiService.getUsers();
        setUsers(data);
      } catch (err) {
        setError('Unable to load data. Please verify that the backend server is running.');
        console.error('Loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /**
   * Handle logout action
   * Clears authentication state and redirects to login
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app">
      {/* Header with controls */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <img src="/assets/google-logo.svg" alt="Google" className="google-logo" />
            <h1>Admin Console</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="username">{username}</span>
              <span className="user-role">{userRole}</span>
            </div>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? (
                <Brightness4Icon fontSize="small" />
              ) : (
                <Brightness7Icon fontSize="small" />
              )}
            </button>
            <button 
              onClick={handleLogout} 
              className="logout-button"
              aria-label="Logout"
              title="Logout"
            >
              <LogoutIcon fontSize="small" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        {error ? (
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : (
          <Table data={users} loading={loading} />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Google Admin Console - User Management System</p>
        <p>Built with <FavoriteIcon fontSize="small" className="footer-icon" /> using React + TypeScript + Node.js + MongoDB</p>
      </footer>
    </div>
  );
};

export default PageUsers;
