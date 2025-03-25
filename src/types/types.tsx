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
}

export interface AggregatedEventDetails {
  hour: string;
  count: number;
}

export interface UserEventTable extends AggregatedEventData {
  eventDistribution?: string;
  avgUserDistribution?: string;
  avgUserEventCount?: number;
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

export type TableData = User | UserEventTable;
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
