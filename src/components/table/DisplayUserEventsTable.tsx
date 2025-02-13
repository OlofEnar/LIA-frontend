import { useEventTableData } from './useEventTableData';
import { useDateRangeStore } from '../../store';
import DataTable from './DataTable/DataTable';
import { eventColumns } from './columns';

export const DisplayUserEventTable = ({ userId }: { userId: string }) => {
  const { selectedRange } = useDateRangeStore();
  const { data: chartData = [], totalEvents } = useEventTableData(
    selectedRange,
    userId
  );

  return (
    <>
      <DataTable
        columns={eventColumns(totalEvents)}
        data={chartData}
        showTotalFooter={true}
      />
    </>
  );
};
