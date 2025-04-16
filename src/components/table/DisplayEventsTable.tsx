import { useAggregatedEventsByNameAndDate } from '../../queries/useEventQueries';
import { useDateRangeStore } from '../../store';
import { AggregatedEventData } from '../../types/types';
import { formatDateRange } from '../../utils/utils';
import { eventColumns } from './columns';
import DataTable from './DataTable/DataTable';

export const DisplayEventsTable = () => {
  const { selectedRange } = useDateRangeStore();
  const { startDate, endDate } = formatDateRange(selectedRange);
  const {
    data: aggregatedResponse,
    error,
    isError,
    isLoading,
  } = useAggregatedEventsByNameAndDate(startDate, endDate);

  const totalEvents: number = aggregatedResponse?.totalEvents || 0;
  const tableData: AggregatedEventData[] =
    aggregatedResponse?.aggregatedEvents || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error instanceof Error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <DataTable
      columns={eventColumns(totalEvents)}
      data={tableData}
      showTotalFooter={true}
      tableType="event"
    />
  );
};
