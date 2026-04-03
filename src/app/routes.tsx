import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { MyLeagues } from './components/MyLeagues';
import { LeagueDetail } from './components/LeagueDetail';

// Simple auth check
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/leagues',
    element: (
      <ProtectedRoute>
        <MyLeagues />
      </ProtectedRoute>
    ),
  },
  {
    path: '/leagues/:id',
    element: (
      <ProtectedRoute>
        <LeagueDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);