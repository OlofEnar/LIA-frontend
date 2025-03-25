import { useEventsByUserIdQuery } from '../../../queries/useEventQueries';
import { useDateRangeStore } from '../../../store';
import { AggregatedEventData, UserEvent } from '../../../types/types';
import {
  getDateRangeArray,
  calcMovingAverage,
  aggregateEventsByDate,
  filterEvents,
} from '../../../utils/utils';

export const useUserActivityLineChart = (
  userId: string,
  windowSize: number
) => {
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(
    selectedRange?.from,
    selectedRange?.to
  );
  const {
    data: userEvents,
    error,
    isError,
    isLoading,
  } = useEventsByUserIdQuery(userId);
  let chartData: AggregatedEventData[] = [];
  let filteredChartData: UserEvent[] = [];

  filteredChartData = filterEvents(userEvents, selectedDates);
  chartData = aggregateEventsByDate(filteredChartData);

  chartData.sort(
    (a, b) =>
      new Date(a.eventDate ?? '').getTime() -
      new Date(b.eventDate ?? '').getTime()
  );

  const movingAverageData = calcMovingAverage(chartData, windowSize);

  // Merge MA & ChartData
  const mergedChartData: AggregatedEventData[] = chartData.map(
    (dataPoint, index) => ({
      ...dataPoint,
      movingAverage: movingAverageData[index]?.movingAverage,
    })
  );

  return { data: mergedChartData, isLoading, isError, error };
};
