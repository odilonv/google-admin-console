import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { usersData, UserCredentials } from '../data/usersData';

/**
 * Type definitions for authentication context
 */
type UserRole = 'admin' | 'user' | 'guest' | null;

interface AuthContextValue {
  isAuthenticated: boolean;
  userRole: UserRole;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Context
 * Provides authentication state and methods throughout the application
 * Following Single Responsibility Principle (SRP) - handles only authentication logic
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider Component
 * Manages authentication state using useState hook
 * Implements secure login logic and state management
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [username, setUsername] = useState<string | null>(null);

  /**
   * Login function
   * Validates credentials against mock data
   * Returns true if login successful, false otherwise
   * Following DRY principle with reusable authentication logic
   */
  const login = useCallback((inputUsername: string, inputPassword: string): boolean => {
    // Find user in mock data
    const user: UserCredentials | undefined = usersData.find(
      (u) => u.username === inputUsername && u.password === inputPassword
    );

    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      setUsername(user.username);
      return true;
    }

    return false;
  }, []);

  /**
   * Logout function
   * Resets authentication state to initial values
   */
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername(null);
  }, []);

  const contextValue: AuthContextValue = {
    isAuthenticated,
    userRole,
    username,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context
 * Ensures context is used within AuthProvider
 * Follows Interface Segregation Principle (ISP) - provides only what's needed
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
