import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

/**
 * Type definitions for routing context
 */
interface RouteConfig {
  path: string;
  element: ReactNode;
}

interface RouterContextValue {
  currentPath: string;
  navigate: (path: string) => void;
}

interface RouterProviderProps {
  children: ReactNode;
}

interface RoutesProps {
  children: ReactNode;
}

interface RouteProps {
  path: string;
  element: ReactNode;
}

interface NavigateProps {
  to: string;
  replace?: boolean;
}

/**
 * Router Context
 * Custom routing implementation without react-router-dom
 * Following Single Responsibility Principle (SRP) - handles only routing logic
 */
const RouterContext = createContext<RouterContextValue | undefined>(undefined);

/**
 * RouterProvider Component
 * Manages current path state and provides navigation function
 * Listens to browser history changes (back/forward buttons)
 */
export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  /**
   * Navigate function
   * Updates URL and current path state
   * Following DRY principle - centralized navigation logic
   */
  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  }, []);

  /**
   * Handle browser back/forward buttons
   * Updates current path when user navigates with browser controls
   */
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const contextValue: RouterContextValue = {
    currentPath,
    navigate
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

/**
 * Custom hook to access router context
 * Ensures context is used within RouterProvider
 */
export const useRouter = (): RouterContextValue => {
  const context = useContext(RouterContext);
  
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  
  return context;
};

/**
 * Custom hook for navigation
 * Provides navigate function similar to useNavigate from react-router-dom
 * Following Interface Segregation Principle (ISP)
 */
export const useNavigate = () => {
  const { navigate } = useRouter();
  return navigate;
};

/**
 * Routes Component
 * Renders the matching route based on current path
 * Following Open/Closed Principle (OCP) - open for extension, closed for modification
 */
export const Routes: React.FC<RoutesProps> = ({ children }) => {
  const { currentPath } = useRouter();

  // Extract route configurations from children
  const routes: RouteConfig[] = React.Children.toArray(children)
    .filter((child): child is React.ReactElement<RouteProps> => 
      React.isValidElement(child) && typeof child.type !== 'string'
    )
    .map(child => ({
      path: child.props.path,
      element: child.props.element
    }));

  // Find matching route
  const matchedRoute = routes.find(route => {
    // Exact match
    if (route.path === currentPath) {
      return true;
    }
    
    // Handle root path
    if (route.path === '/' && currentPath === '/') {
      return true;
    }

    // Wildcard match for 404
    if (route.path === '*') {
      return true;
    }

    return false;
  });

  // Render matched route or nothing
  return <>{matchedRoute ? matchedRoute.element : null}</>;
};

/**
 * Route Component
 * Configuration component for defining routes
 * Does not render anything by itself
 */
export const Route: React.FC<RouteProps> = () => {
  return null;
};

/**
 * Navigate Component
 * Programmatic navigation component
 * Automatically navigates when rendered
 * Following Dependency Inversion Principle (DIP)
 */
export const Navigate: React.FC<NavigateProps> = ({ to, replace = false }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (replace) {
      window.history.replaceState({}, '', to);
      navigate(to);
    } else {
      navigate(to);
    }
  }, [to, replace, navigate]);

  return null;
};

/**
 * Link Component
 * Custom link component for navigation
 * Prevents default anchor behavior and uses custom navigation
 */
interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, className }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
