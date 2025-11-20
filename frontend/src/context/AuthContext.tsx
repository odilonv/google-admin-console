import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { usersData, UserCredentials } from '../data/usersData';

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

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [username, setUsername] = useState<string | null>(null);

  const login = useCallback((inputUsername: string, inputPassword: string): boolean => {
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

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
