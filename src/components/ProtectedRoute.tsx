import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false, 
  requireSuperAdmin = false 
}) => {
  const { user, loading: userLoading } = useAuth();
  const { adminUser, loading: adminLoading } = useAdminAuth();

  // Show loading spinner while auth contexts are loading
  if (userLoading || adminLoading) {
    return <LoadingSpinner />;
  }

  // For admin routes
  if (requireAdmin || requireSuperAdmin) {
    // If no admin user, redirect to login
    if (!adminUser) {
      return <Navigate to="/login" replace />;
    }

    // For superadmin routes, check if user is superadmin
    if (requireSuperAdmin && adminUser.role !== 'superadmin') {
      return <Navigate to="/admin/dashboard" replace />;
    }

    // For regular admin routes, check if user is admin or superadmin
    if (requireAdmin && adminUser.role !== 'admin' && adminUser.role !== 'superadmin') {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  }

  // For regular user routes
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
