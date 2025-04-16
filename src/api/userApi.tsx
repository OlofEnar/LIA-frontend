import { AggregatedResponse, User } from '../types/types';
import { api } from './axiosClient';

const ENDPOINT = '/users';

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(ENDPOINT);
  console.log(response);
  return response.data;
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`${ENDPOINT}/${userId}`);
  console.log(response);
  return response.data;
};

export const getAllUsersWithAggregatedEvents = async (
  startDate: string,
  endDate: string
): Promise<AggregatedResponse> => {
  const response = await api.get<AggregatedResponse>(
    `${ENDPOINT}/with-aggregated-events?startDate=${startDate}&endDate=${endDate}`
  );
  console.log(response);
  return response.data;
};

export const getAggregatedEventsByUserIdAndName = async (
  startDate: string,
  endDate: string,
  userId: string
): Promise<AggregatedResponse> => {
  const response = await api.get<AggregatedResponse>(
    `${ENDPOINT}/${userId}/aggregated-events-by-name?startDate=${startDate}&endDate=${endDate}&userId${userId}`
  );
  return response.data;
};

export const getAggregatedEventsByUserIdAndDate = async (
  startDate: string,
  endDate: string,
  userId: string
): Promise<AggregatedResponse> => {
  const response = await api.get<AggregatedResponse>(
    `${ENDPOINT}/${userId}/aggregated-events-by-date?startDate=${startDate}&endDate=${endDate}&userId${userId}`
  );
  return response.data;
};
