import { useQuery } from '@tanstack/react-query';
import { User } from '../types/types';
import { getAllUsersWithEvents, getUser } from '../api/userApi';

export const useUsersQuery = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getAllUsersWithEvents,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useUserQuery = (userId: string) =>
  useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
