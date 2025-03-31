import { useQuery } from '@tanstack/react-query';
import { UserEvent } from '../types/types';
import { getEvents, getEventsByName, getEventsByUserId } from '../api/eventApi';

export const useEventsQuery = () =>
  useQuery<UserEvent[]>({
    queryKey: ['userEvents'],
    queryFn: () => getEvents(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useEventsByUserIdQuery = (userId: string) =>
  useQuery<UserEvent[]>({
    queryKey: ['userEvents', userId],
    queryFn: () => getEventsByUserId(userId),
    enabled: !!userId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useEventsByName = (eventName: string) =>
  useQuery<UserEvent[]>({
    queryKey: ['userEvents', eventName],
    queryFn: () => getEventsByName(eventName),
    enabled: !!eventName,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
