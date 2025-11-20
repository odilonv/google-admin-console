import React, { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from '../context/RouterContext';

/**
 * Props for PrivateRoute component
 */
interface PrivateRouteProps {
  children: ReactNode;
  rolesRequired?: string[];
}

/**
 * PrivateRoute Component
 * Generic component for protecting routes based on authentication and authorization
 * 
 * Implements:
 * - Single Responsibility Principle (SRP): Handles only route protection logic
 * - Open/Closed Principle (OCP): Open for extension (any roles), closed for modification
 * - Liskov Substitution Principle (LSP): Can be used anywhere a route wrapper is needed
 * - Dependency Inversion Principle (DIP): Depends on abstractions (useAuth hook)
 * 
 * @param children - The component to render if access is granted
 * @param rolesRequired - Array of roles that have access to this route (e.g., ['admin', 'user'])
 *                        If not provided, only authentication is checked
 * 
 * Behavior:
 * 1. If user is not authenticated → Redirect to /login
 * 2. If user is authenticated BUT doesn't have required role → Redirect to /forbidden
 * 3. If user is authenticated AND has required role → Render children
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  rolesRequired = [] 
}) => {
  const { isAuthenticated, userRole } = useAuth();

  // Case 1: User is not authenticated
  // Redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Case 2: User is authenticated but roles are required
  // Check if user has one of the required roles
  if (rolesRequired.length > 0) {
    const hasRequiredRole = userRole && rolesRequired.includes(userRole);
    
    if (!hasRequiredRole) {
      // User doesn't have the required role → Redirect to forbidden page
      return <Navigate to="/forbidden" replace />;
    }
  }

  // Case 3: User is authenticated and has required role (or no role required)
  // Render the protected content
  return <>{children}</>;
};

/**
 * Higher-Order Component (HOC) version of PrivateRoute
 * Alternative pattern for route protection
 * Following DRY principle - reusable authentication wrapper
 */
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
