import { useDateRangeStore } from '../../store';
import { eventColumns } from './columns';
import DataTable from './DataTable/DataTable';
import { useEventTableData } from './useEventTableData';

export const DisplayEventsTable = () => {
  const { selectedRange } = useDateRangeStore();
  const { data: chartData = [], totalEvents } =
    useEventTableData(selectedRange);

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
