import { useQuery } from '@tanstack/react-query';
import { AggregatedResponse, User } from '../types/types';
import {
  getAggregatedEventsByUserIdAndDate,
  getAggregatedEventsByUserIdAndName,
  getAllUsersWithAggregatedEvents,
  getUser,
} from '../api/userApi';

// export const useUsersQuery = () =>
//   useQuery<User[]>({
//     queryKey: ['users'],
//     queryFn: getAllUsersWithEvents,
//     staleTime: Infinity,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   });

export const useUserQuery = (userId: string) =>
  useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useAllUsersWithAggregatedEvents = (
  startDate: string,
  endDate: string
) =>
  useQuery<AggregatedResponse>({
    queryKey: ['users', startDate, endDate],
    queryFn: () => getAllUsersWithAggregatedEvents(startDate, endDate),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useAggregatedEventsByUserIdAndName = (
  startDate: string,
  endDate: string,
  userId: string
) =>
  useQuery<AggregatedResponse>({
    queryKey: ['user:eventsByName', startDate, endDate],
    queryFn: () =>
      getAggregatedEventsByUserIdAndName(startDate, endDate, userId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useAggregatedEventsByUserIdAndDate = (
  startDate: string,
  endDate: string,
  userId: string
) =>
  useQuery<AggregatedResponse>({
    queryKey: ['user:eventsByDate', startDate, endDate],
    queryFn: () =>
      getAggregatedEventsByUserIdAndDate(startDate, endDate, userId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
