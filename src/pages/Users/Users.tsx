import './Users.scss';
import DataTable from '../../components/table/DataTable/DataTable';
import { userColumns } from '../../components/table/columns';
import { useAllUsersWithAggregatedEvents } from '../../queries/useUserQueries';
import { useDateRangeStore } from '../../store';
import { formatDateRange } from '../../utils/utils';

const Users = () => {
  const { selectedRange } = useDateRangeStore();
  const { startDate, endDate } = formatDateRange(selectedRange);
  const { data, error, isError, isLoading } = useAllUsersWithAggregatedEvents(
    startDate,
    endDate
  );

  const totalEvents: number = data?.totalEvents || 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occured {error.message}</div>;
  }

  return (
    <>
      <DataTable
        columns={userColumns(totalEvents)}
        data={data?.aggregatedUsers || []}
        tableType="user"
        showTotalFooter={true}
      />
    </>
  );
};
export default Users;
