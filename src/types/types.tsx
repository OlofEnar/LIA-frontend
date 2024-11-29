
export interface User {
    id: number;
    score: number;
    dailyEvents: number;
    mostUsedDailyEvent: string;
    totalEvents: number;
    events: [];
}

export interface UserEvent {
    id: number;
    date: string;
    eventName: string;
    eventCount: number;
}

export interface AggregatedEventData {
        date: string;
        eventTotal: number;
        events: Array<EventNames>;
}

export interface EventNames {
    eventName: string;
    eventCount: number;
    date: string;
}

export interface DownloadJSONProps {
    data: Array<Record<string, any>>;
    fileName: string;
  }
