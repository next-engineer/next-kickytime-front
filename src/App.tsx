import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ProtectedRoute, AdminRoute, PublicOnlyRoute } from './components/RouteGuards';

// common page
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MatchesPage from './pages/MatchesPage';

// public only page
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

// protected page
import ProfilePage from './pages/ProfilePage';
import MyMatchesPage from './pages/MyMatchesPage';

// admin page
import CreateMatchPage from './pages/CreateMatchPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 누구나 접근 가능한 페이지 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="/matches" element={<MatchesPage />} />

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
          path="/mymatches"
          element={
            <ProtectedRoute>
              <MyMatchesPage />
            </ProtectedRoute>
          }
        />

        {/* 관리자만 접근 가능 */}
        <Route
          path="/createMatch"
          element={
            <AdminRoute>
              <CreateMatchPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
