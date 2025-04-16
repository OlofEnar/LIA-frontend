import { useQuery } from '@tanstack/react-query';
import {
  AggregatedEventDetail,
  AggregatedResponse,
  UserEvent,
} from '../types/types';
import {
  getAggregatedEventByNameAndDate,
  getAggregatedEventsByDate,
  getAggregatedEventsByNamesAndDate,
  getAggregatedTimestampsByHour,
  getEvents,
  getEventsByName,
} from '../api/eventApi';

export const useEventsQuery = () =>
  useQuery<UserEvent[]>({
    queryKey: ['userEvents'],
    queryFn: () => getEvents(),
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

export const useAggregatedEventsByDate = (startDate: string, endDate: string) =>
  useQuery<AggregatedResponse>({
    queryKey: ['aggregatedEvents', startDate, endDate],
    queryFn: () => getAggregatedEventsByDate(startDate, endDate),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useAggregatedEventsByNameAndDate = (
  startDate: string,
  endDate: string
) =>
  useQuery<AggregatedResponse>({
    queryKey: ['aggregatedEvents:Name', startDate, endDate],
    queryFn: () => getAggregatedEventsByNamesAndDate(startDate, endDate),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useAggregatedEventByNameAndDate = (
  startDate: string,
  endDate: string,
  eventName: string
) =>
  useQuery<AggregatedResponse>({
    queryKey: [eventName, startDate, endDate],
    queryFn: () =>
      getAggregatedEventByNameAndDate(startDate, endDate, eventName),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useAggregatedTimestampsByHour = (
  startDate: string,
  endDate: string,
  eventName: string
) =>
  useQuery<AggregatedEventDetail>({
    queryKey: [`EventDetails:${eventName}`, startDate, endDate],
    queryFn: () => getAggregatedTimestampsByHour(startDate, endDate, eventName),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
