import {
  AggregatedEventData,
  DownloadJSONProps,
  EventDataForExport,
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

export const exportJsonToBrowser = (data: any): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  window.open(url);
};

export function getDateRangeArray(
  startDate: Date | null,
  endDate: Date | null
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
    if (!latest.date || !current.date) return latest;

    const latestDate = new Date(latest.date);
    const currentDate = new Date(current.date);

    return currentDate > latestDate ? current : latest;
  });

  return `${latestEvent.date} (${latestEvent.eventName})`;
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
    if (!latest.date || !current.date) return latest;

    const latestDate = new Date(latest.date);
    const currentDate = new Date(current.date);

    return currentDate > latestDate ? current : latest;
  });

  return latestEvent;
};

export function calcMovingAverage(
  data: { date: string; eventTotal: number }[],
  windowSize: number
) {
  const movingAverages: { date: string; movingAverage: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const windowData = data.slice(start, i + 1);
    const sum = windowData.reduce((acc, point) => acc + point.eventTotal, 0);
    const avg = sum / windowData.length;

    movingAverages.push({ date: data[i].date, movingAverage: avg });
  }

  return movingAverages;
}

export const aggregateEventsByDate = (userEvents: UserEvent[] = []) => {
  const dateMap = new Map<string, AggregatedEventData>();

  userEvents.forEach((userEvent) => {
    const { date, eventCount } = userEvent;

    if (dateMap.has(date)) {
      const aggregated = dateMap.get(date)!;
      aggregated.eventTotal += eventCount;
      aggregated.events.push(userEvent);
    } else {
      dateMap.set(date, {
        date,
        eventTotal: eventCount,
        events: [userEvent],
      });
    }
  });
  return Array.from(dateMap.values());
};

export const aggregateEventsByName = (userEvents: UserEvent[] = []) => {
  const aggregatedEvents = Array.from(
    userEvents
      .reduce((map, cur) => {
        const name = cur.eventName;

        if (map.has(name)) {
          const existingEvent = map.get(name);
          existingEvent.eventCount += cur.eventCount;
        } else {
          map.set(name, { ...cur });
        }
        return map;
      }, new Map())
      .values()
  );
  return aggregatedEvents;
};

export const filterEvents = (
  userEvents: UserEvent[] = [],
  selectedDates: string[] = [],
  eventNames: string[] = []
) => {
  return userEvents.filter(
    (event) =>
      (selectedDates.length === 0 || selectedDates.includes(event.date)) &&
      (eventNames.length === 0 || eventNames.includes(event.eventName))
  );
};

export function convertToUserEventTable(
  totalEvents: number,
  data: UserEvent[]
): UserEventTable[] {
  return data.map((event) => ({
    ...event,
    eventDistribution:
      ((event.eventCount / totalEvents) * 100).toFixed(1) + '%',
  }));
}

export function getEventsTotal(userEvents: UserEvent[]): number {
  return userEvents.reduce((total, event) => total + event.eventCount, 0);
}

export function packageforHubspotCsv(user: EventDataForExport) {
  const { userId, email, totalEvents, events } = user;
  const convertedUser: Record<string, any> = { userId, email, totalEvents };

  if (events) {
    events.forEach((event) => {
      convertedUser[event.eventName] = event.eventCount;
    });
  }
  console.log(convertedUser);
  return convertedUser;
}
