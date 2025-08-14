import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import ProtectedRoute from './components/ProtectedRoute';

// User Pages
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Battles from './pages/Battles';
import Friends from './pages/Friends';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import Problems from './pages/Problems';
import CodingProblem from './pages/CodingProblem';

// Admin Pages
import AdminSetup from './pages/AdminSetup';
import AdminDashboard from './pages/AdminDashboard';
import AdminQuestions from './pages/AdminQuestions';
import AdminEvents from './pages/AdminEvents';
import AdminRewards from './pages/AdminRewards';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminSettings from './pages/AdminSettings';
import AdminSeasons from './pages/AdminSeasons';

// ProtectedRoute component is now imported from components/ProtectedRoute.tsx

const UserApp: React.FC = () => {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black'
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'
    }`}>
      {user && <Navbar />}
      <main className={user ? 'pt-16' : ''}>
        <Routes>
          <Route path="/" element={
            user ? <Navigate to="/dashboard" /> : <Landing />
          } />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/battles" element={
            <ProtectedRoute>
              <Battles />
            </ProtectedRoute>
          } />
          <Route path="/friends" element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } />
          <Route path="/achievements" element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          } />
          <Route path="/problems" element={
            user ? (
              <Problems />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/problem/:problemId" element={
            <ProtectedRoute>
              <CodingProblem />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
};

const AdminApp: React.FC = () => {
  const { adminUser, loading } = useAdminAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black transition-colors duration-300">
      {adminUser && <AdminNavbar />}
      <main className="pt-16">
        <Routes>
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/questions" element={
            <ProtectedRoute requireAdmin>
              <AdminQuestions />
            </ProtectedRoute>
          } />
          <Route path="/admin/events" element={
            <ProtectedRoute requireAdmin>
              <AdminEvents />
            </ProtectedRoute>
          } />
          <Route path="/admin/rewards" element={
            <ProtectedRoute requireAdmin>
              <AdminRewards />
            </ProtectedRoute>
          } />
          <Route path="/admin/seasons" element={
            <ProtectedRoute requireAdmin>
              <AdminSeasons />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute requireAdmin>
              <AdminAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute requireAdmin>
              <AdminSettings />
            </ProtectedRoute>
          } />
          <Route path="/admin/profile" element={
            <ProtectedRoute requireAdmin>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, loading: userLoading } = useAuth();
  const { adminUser, loading: adminLoading } = useAdminAuth();

  // Small delay to ensure admin context has processed the auth state
  // This prevents the need for refresh when superadmin logs in
  const [hasProcessedAuth, setHasProcessedAuth] = useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasProcessedAuth(true);
    }, 100); // Small delay to ensure contexts are synchronized
    
    return () => clearTimeout(timer);
  }, [user, adminUser]);

  // Show loading while both contexts are loading
  if (userLoading || adminLoading) {
    return <LoadingSpinner />;
  }

  if (!hasProcessedAuth) {
    return <LoadingSpinner />;
  }

  // Check if we're on an admin route
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  // If admin user exists, they should always go to admin dashboard
  if (adminUser) {
    if (isAdminRoute) {
      return <AdminApp />;
    } else {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // If we're on an admin route but no admin user, redirect to login
  if (isAdminRoute) {
    return <Navigate to="/login" replace />;
  }

  // If regular user exists, show user app
  if (user) {
    return <UserApp />;
  }

  // If no user, show user app (for login)
  return <UserApp />;
};

const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <AppContent />
          </AdminAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App; 