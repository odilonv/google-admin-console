import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider, Routes, Route, Navigate } from './context/RouterContext';
import { PrivateRoute } from './components/PrivateRoute';
import PageConnexion from './pages/PageConnexion';
import PageUsers from './pages/PageUsers';
import PageForbidden from './pages/PageForbidden';
import './styles/App.css';
import './styles/Table.css';

/**
 * Main App Component
 * 
 * Architecture suivant les principes SOLID:
 * - SRP: Gère uniquement la configuration des providers et du routing
 * - OCP: Ouvert à l'extension (nouvelles routes) sans modification
 * - LSP: Les composants enfants peuvent être substitués
 * - ISP: Chaque composant n'utilise que les interfaces dont il a besoin
 * - DIP: Dépend d'abstractions (contexts, hooks) et non d'implémentations concrètes
 * 
 * Structure de routing:
 * - / : Redirige vers /login
 * - /login : Page de connexion (publique)
 * - /users : Page avec tableau des utilisateurs (protégée, accessible aux admin et user)
 * - /forbidden : Page d'accès refusé
 * - * : Route 404 (redirige vers /login)
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Public route - Login page */}
          <Route path="/login" element={<PageConnexion />} />
          
          {/* Protected route - Users page (accessible by admin and user roles) */}
          <Route 
            path="/users" 
            element={
              <PrivateRoute rolesRequired={['admin', 'user']}>
                <PageUsers />
              </PrivateRoute>
            } 
          />
          
          {/* Public route - Forbidden page */}
          <Route path="/forbidden" element={<PageForbidden />} />
          
          {/* Fallback route - 404 */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </RouterProvider>
    </AuthProvider>
  );
};

export default App;
