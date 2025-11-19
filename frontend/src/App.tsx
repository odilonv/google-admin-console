import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import { useTheme } from './context/ThemeContext';
import { userApiService } from './api/userApi';
import { User } from './types';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './styles/App.css';
import './styles/Table.css';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="app">
      {/* Header with controls */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <img src="/assets/google-logo.svg" alt="Google" className="google-logo" />
            <h1>Admin Console</h1>
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

export default App;
