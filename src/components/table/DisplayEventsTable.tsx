import { useDateRangeStore } from '../../store';
import { eventColumns } from './columns';
import DataTable from './DataTable/DataTable';
import { useEventTableData } from './useEventTableData';

export const DisplayEventsTable = () => {
  const { selectedRange } = useDateRangeStore();
  const { data: userEvents = [], totalEvents } =
    useEventTableData(selectedRange);

  return (
    <>
      <DataTable
        columns={eventColumns(totalEvents)}
        data={userEvents}
        showTotalFooter={true}
        tableType="event"
      />
    </>
  );
};
