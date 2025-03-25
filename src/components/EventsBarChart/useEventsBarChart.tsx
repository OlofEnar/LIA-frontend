import { useEventsQuery } from '../../queries/useEventQueries';
import { useDateRangeStore } from '../../store';
import { AggregatedEventData } from '../../types/types';
import { aggregateEventsByDate, getDateRangeArray } from '../../utils/utils';

export const useEventsBarChart = () => {
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(
    selectedRange?.from,
    selectedRange?.to
  );
  const { data: userEvents, error, isError, isLoading } = useEventsQuery();
  let chartData: AggregatedEventData[] = [];
  const filteredChartData: AggregatedEventData[] = [];

  chartData = aggregateEventsByDate(userEvents);

  selectedDates.forEach((date) => {
    const event = chartData.find((event) => event.eventDate === date);
    if (event) {
      filteredChartData.push(event);
    }
  });

  const sortedData = filteredChartData.sort((a, b) => {
    if (!a.eventDate) return 1;
    if (!b.eventDate) return -1;

    return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
  });

  return { data: sortedData, isLoading, isError, error };
};
