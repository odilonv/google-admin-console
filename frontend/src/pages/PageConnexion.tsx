import React, { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../context/RouterContext';
import '../styles/Login.css';

/**
 * PageConnexion Component
 * Login page with form validation and authentication
 * 
 * Following SOLID principles:
 * - SRP: Handles only login UI and form submission logic
 * - DIP: Depends on useAuth and useNavigate abstractions
 */
const PageConnexion: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Handle form submission
   * Validates credentials and redirects on success
   * Following DRY principle - single source of truth for login logic
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Attempt login
    const isSuccess = login(username, password);

    if (isSuccess) {
      // Redirect to users page on successful login
      navigate('/users');
    } else {
      // Show error message
      setError('Invalid username or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/assets/google-logo.svg" alt="Google" className="login-logo" />
          <h1>Google Admin Console</h1>
          <p>Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              autoComplete="current-password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-help">
          <h3>Test Credentials:</h3>
          <ul>
            <li><strong>Admin:</strong> username: admin, password: admin123</li>
            <li><strong>User:</strong> username: john.doe, password: user123</li>
            <li><strong>Guest:</strong> username: guest, password: guest123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageConnexion;
