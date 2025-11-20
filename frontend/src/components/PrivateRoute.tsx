import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  rolesRequired?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  rolesRequired = [] 
}) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (rolesRequired.length > 0) {
    const hasRequiredRole = userRole && rolesRequired.includes(userRole);
    
    if (!hasRequiredRole) {
      return <Navigate to="/forbidden" replace />;
    }
  }

  return <>{children}</>;
};

export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  rolesRequired?: string[]
) => {
  return (props: P) => (
    <PrivateRoute rolesRequired={rolesRequired}>
      <Component {...props} />
    </PrivateRoute>
  );
};
