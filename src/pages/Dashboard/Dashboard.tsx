import './Dashboard.scss';
import { ArrowDown, ArrowUp, Activity } from 'lucide-react';
import EventsBarChart from '../../components/EventsBarChart/EventsBarChart';
import { useUsersQuery } from '../../queries/useUserQueries';
import DataTable from '../../components/table/DataTable/DataTable';
import { userColumns } from '../../components/table/columns';
import {
  filterEvents,
  getDateRangeArray,
  getEventsTotal,
} from '../../utils/utils';
import { useDateRangeStore } from '../../store';
import { format } from 'd3-format';

const Dashboard = () => {
  const { data: users = [], error, isError, isLoading } = useUsersQuery();
  const { selectedRange } = useDateRangeStore();
  const selectedDates = getDateRangeArray(selectedRange.from, selectedRange.to);

  const usersOnDateChange = users.map((user) => {
    const filteredEvents = filterEvents(user.events, selectedDates);
    const totalEvents = getEventsTotal(filteredEvents);
    return { ...user, totalEvents };
  });

  const total = usersOnDateChange.reduce(
    (sum, { totalEvents }) => sum + totalEvents,
    0
  );
  const allEventsTotal =
    total < 10000 ? total.toString() : format('.3s')(total).toLocaleUpperCase();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error instanceof Error && isError) {
    return <div>An error occured {error.message}</div>;
  }

  return (
    <div className="dashboard">
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">Total events</div>
          <Activity size={18} />
        </div>
        <span className="summary">{allEventsTotal}</span>
      </div>
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">Some data</div>
        </div>
        <span className="summary">32</span>
      </div>
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">Users yesterday</div>
          <ArrowUp color="green" size={18} />
        </div>
        <span className="summary">54</span>
      </div>
      <div className="grid-item box shadow">
        <div className="cardHeader">
          <div className="label">Active users</div>
          <ArrowDown color="red" size={18} />
        </div>
        <span className="summary">34</span>
      </div>
      <div className="grid-item box-landscape shadow">
        <EventsBarChart />
      </div>
      <div className="grid-item box-landscape shadow">
        <DataTable
          customPageSize={5}
          columns={userColumns}
          data={usersOnDateChange}
          tableType="user"
          showTotalFooter={false}
          showSearch={false}
          showTableFooter={false}
        />
      </div>
    </div>
  );
};
export default Dashboard;
