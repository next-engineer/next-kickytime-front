import { api } from './axiosInstance';
import type { User } from '../types';

// API: GET /api/users/me
// (Authorization: Bearer <access_token>)
export async function fetchMyProfile(): Promise<User> {
  const { data } = await api.get<User>('/api/users/me');
  return data;
}
