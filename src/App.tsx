import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ProtectedRoute, AdminRoute, PublicOnlyRoute } from './components/RouteGuards';
import { useAuthStore } from './store/useAuthStore';

// common page
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MatchesPage from './pages/MatchesPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

// public only page
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

// protected page
import ProfilePage from './pages/ProfilePage';
import MyMatchesPage from './pages/MyMatchesPage';

// admin page
import CreateMatchPage from './pages/CreateMatchPage';

export default function App() {
  const { syncFromStorage } = useAuthStore();

  useEffect(() => {
    syncFromStorage();
  }, [syncFromStorage]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* AppLayout을 적용하는 페이지 */}
        <Route path="/" element={<AppLayout />}>
          {/* 누구나 접근 가능한 페이지 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/unauthorized" element={<NotFoundPage />} />

          {/* 로그인하지 않은 사용자만 접근 가능 */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <SignupPage />
              </PublicOnlyRoute>
            }
          />

          {/* 로그인한 사용자만 접근 가능 */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matches/me"
            element={
              <ProtectedRoute>
                <MyMatchesPage />
              </ProtectedRoute>
            }
          />

          {/* 관리자만 접근 가능 */}
          <Route
            path="/admin/matches/new"
            element={
              <AdminRoute>
                <CreateMatchPage />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
