export interface User {
  id: string;
  clientVersion: string;
  userCountry: string;
  totalEvents: number;
  events?: UserEvent[];
}

export interface UserEvent {
  eventId?: number;
  eventDate: string;
  eventName: string;
  eventCount: number;
  userId?: string;
  eventDetails?: EventDetails[];
}

export interface EventDetails {
  fromView: string;
  timestamp: Date;
}

export interface AggregatedEventData {
  eventName?: string;
  eventDate?: string;
  eventTotal: number;
  events?: UserEvent[];
  movingAverage?: number;
  eventDistribution?: string;
}

export interface AggregatedUserData {
  user: User;
  eventTotal: number;
  eventDistribution?: string;
}

export interface AggregatedResponse {
  totalEvents?: number;
  aggregatedEvents?: AggregatedEventData[];
  aggregatedUsers?: AggregatedUserData[];
}

export interface AggregatedEventDetail {
  hour: string;
  eventCount: number;
}

export interface HubspotExport {
  unityId: string;
  email?: string;
  totalSumma: number;
  eventsWithCount: Record<string, number>;
}

export interface DownloadJSONProps {
  data: Array<Record<string, any>>;
  fileName: string;
}

export type TableData = User | AggregatedEventData;
export type TableType = 'user' | 'event';

export type DateRangePreset =
  | 'Last 7 days'
  | 'Last 14 days'
  | 'Last 30 days'
  | 'Last 6 months'
  | 'Custom';

export type InputChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;
