
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
        eventName?: string;
}
