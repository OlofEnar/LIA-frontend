import { User } from '../types/types';
import { api } from './axiosClient';

const ENDPOINT = '/users';

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(ENDPOINT);
  console.log(response);
  return response.data;
};

export const getAllUsersWithEvents = async (): Promise<User[]> => {
  const response = await api.get<User[]>(`${ENDPOINT}/with-events`);
  console.log(response);
  return response.data;
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`${ENDPOINT}/${userId}`);
  console.log(response);
  return response.data;
};
