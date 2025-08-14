import type { ReactNode } from 'react';
import type { UserRole } from '../types/index';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

// 공통 Props 타입
interface RouteGuardProps {
  children: ReactNode;
}

// 로그인이 필요한 페이지를 보호하는 컴포넌트
export const ProtectedRoute = ({ children }: RouteGuardProps) => {
  const { isAuthenticated, tokens } = useAuthStore();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 토큰이 있는지 확인하고 로딩 상태 해제
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // 짧은 지연으로 비동기 처리 대기

    return () => clearTimeout(timer);
  }, [tokens]);

  // 아직 인증 상태를 확인 중이면 로딩 표시
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 로그인하지 않았다면 로그인 페이지로 리다이렉트
  // state에 현재 위치를 저장해서 로그인 후 다시 돌아올 수 있게 함
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 로그인했다면 원래 보려던 페이지 표시
  return <>{children}</>;
};

// 특정 권한이 필요한 페이지를 보호하는 컴포넌트
interface RoleGuardProps extends RouteGuardProps {
  requiredRole: UserRole;
  fallbackPath?: string; // 권한이 없을 때 이동할 경로
}

export const RoleGuard = ({ children, requiredRole, fallbackPath = '/' }: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  // if (isLoading) {
  //   return <div>로딩 중...</div>;
  // }

  // 로그인하지 않았다면 로그인 페이지로
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 로그인했지만 권한이 없다면 fallback 경로로
  if (user?.role !== requiredRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  // 모든 조건을 만족하면 원래 페이지 표시
  return <>{children}</>;
};

// 관리자 전용 페이지를 보호하는 컴포넌트 (RoleGuard의 특화 버전)
export const AdminRoute = ({ children }: RouteGuardProps) => {
  return (
    <RoleGuard requiredRole="ADMIN" fallbackPath="/unauthorized">
      {children}
    </RoleGuard>
  );
};

// 이미 로그인한 사용자가 접근하면 안 되는 페이지 (로그인, 회원가입 등)
export const PublicOnlyRoute = ({ children }: RouteGuardProps) => {
  const { isAuthenticated } = useAuthStore();

  // if (isLoading) {
  //   return <div>로딩 중...</div>;
  // }

  // 이미 로그인했다면 홈으로 리다이렉트
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
