import {
  AggregatedEventDetail,
  AggregatedResponse,
  UserEvent,
} from '../types/types';
import { api } from './axiosClient';

export const getEvents = async (): Promise<UserEvent[]> => {
  const response = await api.get<UserEvent[]>('/events');
  return response.data;
};

export const getEventsByName = async (
  eventName: string
): Promise<UserEvent[]> => {
  const response = await api.get<UserEvent[]>(`/events/${eventName}`);
  return response.data;
};

export const getAggregatedEventsByDate = async (
  startDate: string,
  endDate: string
): Promise<AggregatedResponse> => {
  const response = await api.get<AggregatedResponse>(
    `/events/events-by-date?startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
};

export const getAggregatedEventsByNamesAndDate = async (
  startDate: string,
  endDate: string
): Promise<AggregatedResponse> => {
  const response = await api.get<AggregatedResponse>(
    `/events/aggregate-events-by-names?startDate=${startDate}&endDate=${endDate}`
  );
  console.log(response);
  return response.data;
};

export const getAggregatedEventByNameAndDate = async (
  startDate: string,
  endDate: string,
  eventName: string
): Promise<AggregatedResponse> => {
  const response = await api.get<AggregatedResponse>(
    `/events/aggregate-events-by-name?startDate=${startDate}&endDate=${endDate}&eventName=${eventName}`
  );
  console.log(response);
  return response.data;
};

export const getAggregatedTimestampsByHour = async (
  startDate: string,
  endDate: string,
  eventName: string
): Promise<AggregatedEventDetail> => {
  const response = await api.get<AggregatedEventDetail>(
    `/events/aggregate-timestamps-by-hour?startDate=${startDate}&endDate=${endDate}&eventName=${eventName}`
  );
  console.log(response);
  return response.data;
};
