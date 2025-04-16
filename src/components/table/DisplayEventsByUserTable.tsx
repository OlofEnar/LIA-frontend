import { useAggregatedEventsByUserIdAndName } from '../../queries/useUserQueries';
import { useDateRangeStore } from '../../store';
import { AggregatedEventData } from '../../types/types';
import { formatDateRange } from '../../utils/utils';
import DataTable from './DataTable/DataTable';
import { eventColumns } from './columns';

export const DisplayEventsByUserTable = ({ userId }: { userId: string }) => {
  const { selectedRange } = useDateRangeStore();
  const { startDate, endDate } = formatDateRange(selectedRange);
  const {
    data: aggregatedResponse,
    error,
    isError,
    isLoading,
  } = useAggregatedEventsByUserIdAndName(startDate, endDate, userId);

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
    <>
      <DataTable
        columns={eventColumns(totalEvents)}
        data={tableData}
        showTotalFooter={true}
        tableType="event"
      />
    </>
  );
};
