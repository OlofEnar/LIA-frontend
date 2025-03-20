import dayjs from 'dayjs';
import { AggregatedEventDetails, UserEvent } from '../../../types/types';

export const useEventDetailsChart = (userEvents: UserEvent[]) => {
  const hourEvent: Record<string, number> = {};

  for (let i = 0; i < 24; i++) {
    const hour = dayjs().hour(i).format('HH');
    hourEvent[hour] = 0;
  }

  userEvents?.forEach((userEvent) => {
    userEvent.eventDetails?.forEach((detail) => {
      const hour = dayjs(detail.timestamp).format('HH');
      hourEvent[hour] += 1;
    });
  });

  const sortedHours = Object.keys(hourEvent).sort();
  const chartData: AggregatedEventDetails[] = sortedHours.map((hour) => ({
    hour,
    count: hourEvent[hour],
  }));

  return chartData;
};
