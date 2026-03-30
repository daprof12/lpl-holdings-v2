import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireUser?: boolean; // Only regular users allowed, not admins
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requireAdmin = false,
  requireUser = false,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { currentUser, isAdmin, isHydrated } = useAuth();

  // Wait for localStorage hydration before making any redirect decisions
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not logged in, redirect
  if (requireAuth && !currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  // If admin access is required but user is not admin, redirect to user dashboard
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If regular user access is required but user is admin, redirect to admin panel
  if (requireUser && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // If user is already logged in and tries to access login/register pages
  if (!requireAuth && currentUser) {
    // Redirect based on user role
    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}