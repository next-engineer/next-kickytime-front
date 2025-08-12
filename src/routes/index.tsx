import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import MatchesPage from '../pages/MatchesPage';
import MyMatchesPage from '../pages/MyMatchesPage';
import CreateMatchPage from '../pages/CreateMatchPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'login', element: <LoginPage /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'matches',
        element: (
          <ProtectedRoute>
            <MatchesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'matches/mine',
        element: (
          <ProtectedRoute>
            <MyMatchesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/matches/new',
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <CreateMatchPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
