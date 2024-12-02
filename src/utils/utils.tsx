import { DownloadJSONProps } from "../types/types";
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

export function getDateRangeArray(startDate: Date, endDate: Date): string[] {
    const datesArray: string[] = [];
    let currentDate = dayjs(startDate);

    while (currentDate.toDate() <= endDate) {
        datesArray.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
    }
    return datesArray;
};  