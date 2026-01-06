import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * useAdminAuth Hook
 * 
 * Manages admin authentication state and navigation
 * 
 * @returns {Object} Authentication state and functions
 */
const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('admin_token');
      const email = localStorage.getItem('admin_email');
      
      if (token) {
        setIsAuthenticated(true);
        setAdminEmail(email || '');
      } else {
        setIsAuthenticated(false);
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token, email) => {
    try {
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_email', email);
      setIsAuthenticated(true);
      setAdminEmail(email);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_email');
      setIsAuthenticated(false);
      setAdminEmail('');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getToken = () => {
    return localStorage.getItem('admin_token');
  };

  const getAuthHeaders = () => {
    const token = getToken();
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    } : {
      'Content-Type': 'application/json',
    };
  };

  return {
    isAuthenticated,
    isLoading,
    adminEmail,
    login,
    logout,
    checkAuth,
    getToken,
    getAuthHeaders,
  };
};

export default useAdminAuth;
