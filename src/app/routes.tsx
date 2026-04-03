import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { Dashboard } from './components/Dashboard';
import { MyLeagues } from './components/MyLeagues';
import { LeagueDetail } from './components/LeagueDetail';
import { Invitations } from './components/Invitations';
import { Predictions } from './components/Predictions';
import { Rankings } from './components/Rankings';
import { Matches } from './components/Matches';

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
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
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
    path: '/invitations',
    element: (
      <ProtectedRoute>
        <Invitations />
      </ProtectedRoute>
    ),
  },
  {
    path: '/predictions',
    element: (
      <ProtectedRoute>
        <Predictions />
      </ProtectedRoute>
    ),
  },
  {
    path: '/rankings',
    element: (
      <ProtectedRoute>
        <Rankings />
      </ProtectedRoute>
    ),
  },
  {
    path: '/matches',
    element: (
      <ProtectedRoute>
        <Matches />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);