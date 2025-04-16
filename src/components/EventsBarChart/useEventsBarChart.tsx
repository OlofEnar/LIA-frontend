import { useAggregatedEventsByDate } from '../../queries/useEventQueries';
import { useDateRangeStore } from '../../store';
import { formatDateRange } from '../../utils/utils';

export const useEventsBarChart = () => {
  const { selectedRange } = useDateRangeStore();
  const { startDate, endDate } = formatDateRange(selectedRange);

  const { data, error, isError, isLoading } = useAggregatedEventsByDate(
    startDate,
    endDate
  );

  return { data, isLoading, isError, error };
};
