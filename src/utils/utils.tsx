import { DownloadJSONProps, UserEvent } from "../types/types";
import dayjs from "dayjs";
    
export const downloadJSON = ({ data, fileName }: DownloadJSONProps) => {
    const structuredData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        recordCount: data.length,
      },
      records: data,
    };
  
    const jsonData = new Blob([JSON.stringify(structuredData, null, 2)], { type: 'application/json' });
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
  
export function getDateRangeArray(startDate: Date, endDate: Date): string[] {
  const datesArray: string[] = [];
  let currentDate = dayjs(startDate);

  while (currentDate.toDate() <= endDate) {
      datesArray.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
  }
  return datesArray;
};  

export const getLatestUserActivity = (events: UserEvent[] = []): string | null => {
  if (events.length === 0) return null;

  const latestEvent = events.reduce((latest, current) => {
    const latestDate = new Date(latest.date);
    const currentDate = new Date(current.date);

    return currentDate > latestDate ? current : latest;
  });

  return `${latestEvent.date} (${latestEvent.eventName})`;
};

export const getLatestEventActivity = (events: UserEvent[] = [], eventName: string): string | null => {
  if (events.length === 0) return null;

  const filteredEvents = events.filter(event => event.eventName === eventName);

  if (filteredEvents.length === 0) return null;

  const latestEvent = filteredEvents.reduce((latest, current) => {
    const latestDate = new Date(latest.date);
    const currentDate = new Date(current.date);

    return currentDate > latestDate ? current : latest;
  });

  return `${latestEvent.date}`;
};