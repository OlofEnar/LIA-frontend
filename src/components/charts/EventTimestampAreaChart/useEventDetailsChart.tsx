import dayjs from 'dayjs';
import { useEventsByName } from '../../../queries/useEventQueries';

export interface AggregatedEventDetails {
  hour: string;
  count: number;
}

export const useEventDetailsChart = (eventName: string) => {
  const {
    data: userEvents,
    error,
    isError,
    isLoading,
  } = useEventsByName(eventName);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occured {error.message}</div>;
  }

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

  console.log(hourEvent);

  const sortedHours = Object.keys(hourEvent).sort();
  const chartData: AggregatedEventDetails[] = sortedHours.map((hour) => ({
    hour,
    count: hourEvent[hour],
  }));

  return chartData;
};
