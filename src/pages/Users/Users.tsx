import './Users.scss';
import DataTable from '../../components/table/DataTable/DataTable';
import { userColumns } from '../../components/table/columns';
import { useUsersQuery } from '../../queries/useUserQueries';
import { useDateRangeStore } from '../../store';
import {
  filterEvents,
  getDateRangeArray,
  getEventsTotal,
} from '../../utils/utils';

const Users = () => {
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);
  const { data: users = [], error, isError, isLoading } = useUsersQuery();

  const updatedUsers = users.map((user) => {
    const filteredEvents = filterEvents(user.events, selectedDates);
    const totalEvents = getEventsTotal(filteredEvents);
    return { ...user, totalEvents };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occured {error.message}</div>;
  }

  return (
    <>
      <DataTable
        columns={userColumns}
        data={updatedUsers}
        tableType="user"
        showTotalFooter={true}
      />
    </>
  );
};
export default Users;
