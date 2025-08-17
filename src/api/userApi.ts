import { api } from './axiosInstance';
import type { User } from '../types';

export async function postUserMe(): Promise<void> {
  await api.post('users/signin-up', null);
}

// GET /api/users/me - 내 프로필 조회
export async function fetchUserProfile(): Promise<User> {
  const { data } = await api.get<User>('users/me');
  return data;
}

// PUT /api/users/me - 프로필 수정
export async function updateUserProfile(profileData: Partial<User>): Promise<User> {
  const { data } = await api.put<User>('users/me', profileData);
  return data;
}

// POST /api/uploads/profile-image - 프로필 이미지 업로드
export async function uploadProfileImage(formData: FormData): Promise<{ url: string }> {
  const { data } = await api.post<{ url: string }>('uploads/profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

// PUT /api/users/me - 랭크 업데이트 (별도 함수로 분리)
export async function updateUserRank(rank: string): Promise<User> {
  const { data } = await api.put<User>('users/me', { rank });
  return data;
}
