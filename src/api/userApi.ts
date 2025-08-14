import { api } from './axiosInstance';
import type { User } from '../types';

export async function postUserMe(): Promise<void> {
  await api.post('users/signin-up', null);
}

export async function getMyProfile(): Promise<User> {
  const { data } = await api.get<User>('users/me');
  return data;
}
