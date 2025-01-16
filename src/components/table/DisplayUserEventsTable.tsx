import { GetUserEventTableData } from './getUserEventTableData';
import { useDateRangeStore } from '../../store';
import { userEventColumns } from './columns';
import DataTable from './DataTable/DataTable';

export const DisplayUserEventTable = ({ userId }: { userId: string }) => {
  const { selectedRange } = useDateRangeStore();
  const { data: chartData = [], totalEvents } = GetUserEventTableData(
    userId,
    selectedRange
  );

  return (
    <>
      <DataTable
        columns={userEventColumns(totalEvents)}
        data={chartData}
        showTotalFooter={true}
      />
    </>
  );
};
