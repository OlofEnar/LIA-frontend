
export type SignalColours = "green" | "yellow" | "red";

export interface User {
    id: number;
    score: number;
    totalEvents: number;
    flag?: SignalColours; 
    trend?: SignalColours;
    events: [];
}

export interface UserEvent {
    id?: number;
    date?: string;
    eventName: string;
    eventCount: number;
    userId?: string;
}

export interface AggregatedEventData {
        date: string;
        eventTotal: number;
        events?: UserEvent[];
}

export interface EventDataForExport {
    userId: string;
    email: string;
    totalEvents: number;
    events?: UserEvent[];
}

export interface UserEventTable extends UserEvent {
    eventDistribution?: string;
    avgUserDistribution?: string;
    avgUserEventCount?: number;
}

export interface DownloadJSONProps {
    data: Array<Record<string, any>>;
    fileName: string;
  }
