import { useAggregatedTimestampsByHour } from '../../../queries/useEventQueries';
import { useDateRangeStore } from '../../../store';
import { formatDateRange } from '../../../utils/utils';

export const useEventDetailsChart = (eventName: string) => {
  const { selectedRange } = useDateRangeStore();
  const { startDate, endDate } = formatDateRange(selectedRange);

  const { data, error, isError, isLoading } = useAggregatedTimestampsByHour(
    startDate,
    endDate,
    eventName
  );

  return { data, isLoading, isError, error };
};
