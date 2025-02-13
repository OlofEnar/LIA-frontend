export type SignalColours = 'green' | 'yellow' | 'red';

export interface User {
  id: string;
  score: number;
  totalEvents: number;
  flag?: SignalColours;
  trend?: SignalColours;
  events: [];
}

export interface UserEvent {
  id?: number;
  date: string;
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
  date?: string;
  eventTotal: number;
  events?: UserEvent[];
}

export interface UserEventTable extends AggregatedEventData {
  eventDistribution?: string;
  avgUserDistribution?: string;
  avgUserEventCount?: number;
}

export interface EventDataForExport {
  userId: string;
  email: string;
  totalEvents: number;
  events?: UserEvent[];
}

export interface DownloadJSONProps {
  data: Array<Record<string, any>>;
  fileName: string;
}

export type DateRange = {
  from: Date | null;
  to: Date | null;
};
