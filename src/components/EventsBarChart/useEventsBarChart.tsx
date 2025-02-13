import { useEventsQuery } from '../../queries/useEventQueries';
import { useDateRangeStore } from '../../store';
import { AggregatedEventData } from '../../types/types';
import { aggregateEventsByDate, getDateRangeArray } from '../../utils/utils';

export const useEventsBarChart = () => {
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
  const { data: userEvents, error, isError, isLoading } = useEventsQuery();
  let chartData: AggregatedEventData[] = [];
  const filteredChartData: AggregatedEventData[] = [];

  chartData = aggregateEventsByDate(userEvents);

  selectedDates.forEach((date) => {
    const event = chartData.find((event) => event.date === date);
    if (event) {
      filteredChartData.push(event);
    }
  });

  chartData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return { data: filteredChartData, isLoading, isError, error };
};
