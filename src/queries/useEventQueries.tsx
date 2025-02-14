import { useQuery } from 'react-query';
import { UserEvent } from '../types/types';
import { getEvents, getEventsByName, getEventsByUserId } from '../api/eventApi';

export const useEventsQuery = () =>
  useQuery<UserEvent[]>({
    queryKey: ['userEvents'],
    queryFn: () => getEvents(),
  });

export const useEventsByIdQuery = (userId: string) =>
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

// Behövs unik query för EventsTable?
// useQuery<UserEvent[]>({
//         queryKey: ['eventsTable'],
//         queryFn: getEvents
//     });

// Behövs unik query för UserEventsTable?
// useQuery<UserEvent[]>({
//     queryKey: ['userEventTable', userId],
//     queryFn: () => getEventsByUserId(userId),
//     enabled: !!userId,
//   });
