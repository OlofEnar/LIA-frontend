import { useAggregatedEventsByUserIdAndDate } from '../../../queries/useUserQueries';
import { useDateRangeStore } from '../../../store';
import { AggregatedEventData } from '../../../types/types';
import { calcMovingAverage, formatDateRange } from '../../../utils/utils';

export const useUserActivityLineChart = (
  userId: string,
  windowSize: number
) => {
  const { selectedRange } = useDateRangeStore();
  const { startDate, endDate } = formatDateRange(selectedRange);

  const { data, error, isError, isLoading } =
    useAggregatedEventsByUserIdAndDate(startDate, endDate, userId);

  const movingAverageData = calcMovingAverage(
    data?.aggregatedEvents ?? [],
    windowSize
  );

  // Merge the moving average values with the original aggregated events data.
  const mergedChartData: AggregatedEventData[] =
    data?.aggregatedEvents.map((dataPoint, index) => ({
      ...dataPoint,
      movingAverage: movingAverageData[index]?.movingAverage,
    })) || [];

  return { data: mergedChartData, isLoading, isError, error };
};
