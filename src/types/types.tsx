export interface User {
  id: string;
  clientVersion: string[];
  userCountry: string[];
  totalEvents: number;
  events?: UserEvent[];
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

export type TableUrlPath = {
  userPath: string;
  eventPath: string;
};

export type InputChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;
