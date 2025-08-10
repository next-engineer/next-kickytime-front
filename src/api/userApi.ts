import { api } from './axiosInstance';

export type User = {
  id: number;
  nickname: string;
};

export async function fetchMe() {
  const { data } = await api.get<User>('/users/me');
  return data;
}
