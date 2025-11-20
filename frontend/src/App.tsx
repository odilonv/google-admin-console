import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import PageConnexion from './pages/PageConnexion';
import PageUsers from './pages/PageUsers';
import PageForbidden from './pages/PageForbidden';
import './styles/App.css';
import './styles/Table.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<PageConnexion />} />
            <Route 
              path="/users" 
              element={
                <PrivateRoute rolesRequired={['admin', 'user']}>
                  <PageUsers />
                </PrivateRoute>
              } 
            />
            <Route path="/forbidden" element={<PageForbidden />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
