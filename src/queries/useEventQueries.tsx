import { useQuery } from 'react-query';
import { UserEvent } from '../types/types';
import { getEvents, getEventsByName, getEventsByUserId } from '../api/eventApi';

export const useEventsQuery = () =>
  useQuery<UserEvent[]>({
    queryKey: ['userEvents'],
    queryFn: () => getEvents(),
  });

export const useEventsByUserIdQuery = (userId: string) =>
  useQuery<UserEvent[]>({
    queryKey: ['userEvents', userId],
    queryFn: () => getEventsByUserId(userId),
    enabled: !!userId,
  });

export const useEventsByName = (eventName: string) =>
  useQuery<UserEvent[]>({
    queryKey: ['userEvents', eventName],
    queryFn: () => getEventsByName(eventName),
    enabled: !!eventName,
  });
