import {
  AggregatedEventData,
  DownloadJSONProps,
  User,
  UserEvent,
  UserEventTable,
} from '../types/types';
import dayjs from 'dayjs';

export const downloadJSON = ({ data, fileName }: DownloadJSONProps) => {
  const structuredData = {
    metadata: {
      exportedAt: new Date().toISOString(),
      recordCount: data.length,
    },
    records: data,
  };

  const jsonData = new Blob([JSON.stringify(structuredData, null, 2)], {
    type: 'application/json',
  });
  const jsonURL = URL.createObjectURL(jsonData);
  const link = document.createElement('a');
  link.href = jsonURL;
  link.download = `${fileName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportJsonToBrowser = (data: User[]): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  window.open(url);
};

export function getDateRangeArray(
  startDate: Date | undefined,
  endDate: Date | undefined
): string[] {
  if (!startDate || !endDate) {
    return [];
  }
  const datesArray: string[] = [];
  let currentDate = dayjs(startDate);

  while (currentDate.toDate() <= endDate) {
    datesArray.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }
  return datesArray;
}

export const getLatestUserActivity = (
  events: UserEvent[] = []
): string | null => {
  if (events.length === 0) return null;

  const latestEvent = events.reduce((latest, current) => {
    if (!latest.eventDate || !current.eventDate) return latest;

    const latestDate = new Date(latest.eventDate);
    const currentDate = new Date(current.eventDate);

    return currentDate > latestDate ? current : latest;
  });

  return `${latestEvent.eventDate} (${latestEvent.eventName})`;
};

export const getLatestEventActivity = (
  events: UserEvent[] = [],
  eventName: string
): UserEvent | null => {
  if (events.length === 0) return null;

  const filteredEvents = events.filter(
    (event) => event.eventName === eventName
  );

  if (filteredEvents.length === 0) return null;

  const latestEvent = events.reduce((latest, current) => {
    if (!latest.eventDate || !current.eventDate) return latest;

    const latestDate = new Date(latest.eventDate);
    const currentDate = new Date(current.eventDate);

    return currentDate > latestDate ? current : latest;
  });

  return latestEvent;
};

export function calcMovingAverage(
  data: { date?: string; eventTotal: number }[],
  windowSize: number
) {
  const movingAverages: { date: string; movingAverage: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const windowData = data.slice(start, i + 1);
    const sum = windowData.reduce((acc, point) => acc + point.eventTotal, 0);
    const avg = sum / windowData.length;

    movingAverages.push({ date: data[i].date ?? '', movingAverage: avg });
  }
  return movingAverages;
}

export const aggregateEventsByDate = (userEvents: UserEvent[] = []) => {
  const dateMap = new Map<string, AggregatedEventData>();

  userEvents.forEach((event) => {
    const { eventDate, eventCount } = event;

    if (dateMap.has(eventDate)) {
      const aggregated = dateMap.get(eventDate)!;
      aggregated.eventTotal += eventCount;

      aggregated.events ||= [];
      aggregated.events.push(event);
    } else {
      dateMap.set(eventDate, {
        eventDate,
        eventTotal: eventCount,
        events: [event],
      });
    }
  });
  return Array.from(dateMap.values());
};

export const aggregateEventsByName = (userEvents: UserEvent[] = []) => {
  const nameMap = new Map<string, AggregatedEventData>();

  userEvents.forEach((event) => {
    const name = event.eventName;

    if (nameMap.has(name)) {
      const aggregated = nameMap.get(name)!;
      aggregated.eventTotal += event.eventCount;
      aggregated.events!.push(event);
    } else {
      nameMap.set(name, {
        eventName: name,
        eventDate: event.eventDate,
        eventTotal: event.eventCount,
        events: [event],
      });
    }
  });
  return Array.from(nameMap.values());
};

export const filterEvents = (
  userEvents: UserEvent[] = [],
  selectedDates: string[] = [],
  eventNames: string[] = []
) => {
  return userEvents.filter(
    (event) =>
      (selectedDates.length === 0 || selectedDates.includes(event.eventDate)) &&
      (eventNames.length === 0 || eventNames.includes(event.eventName))
  );
};

export const filterUsers = (
  selectedUsers: string[] = [],
  users: User[] = []
) => {
  return users.filter(
    (user) => selectedUsers.length === 0 || selectedUsers.includes(user.id)
  );
};

export function convertToUserEventTable(
  totalEvents: number,
  data: AggregatedEventData[]
): UserEventTable[] {
  return data.map((event) => ({
    ...event,
    eventDistribution:
      ((event.eventTotal / totalEvents) * 100).toFixed(1) + '%',
  }));
}

export function getEventsTotal<
  T extends { eventCount?: number; eventTotal?: number }
>(events: T[]): number {
  return events.reduce(
    (total, event) => total + (event.eventTotal ?? event.eventCount ?? 0),
    0
  );
}

export const getUserCount = (events: UserEvent[] = []): number => {
  const uniqueIds = new Set<string>();
  events.forEach((event) => uniqueIds.add(event.userId!));
  return uniqueIds.size;
};

export const isValidGuid = (guid: string): boolean => {
  const guidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return guidRegex.test(guid);
};
